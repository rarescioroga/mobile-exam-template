import React, {useEffect, useState} from 'react';
import {IonPage, IonHeader, IonContent, IonItem, IonInput, IonLoading, IonProgressBar, IonText} from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getTasks} from "../api/item-service";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { items, versionConflict, progress } = stateContext;
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conflictText, setConflictText] = useState('');

  const fetchData = () => {
    if(userInput){
      setLoading(true);
      getTasks(userInput, mutationContext.setProgress).then(response => {
        const items = response.data;
        mutationContext.setItems(items);
        setLoading(false);
        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      });
    } else {
      mutationContext.setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userInput]);

  useEffect(() => {
    if(versionConflict){
      setConflictText('Version conflict! Refetching...');
      setTimeout(() => {
        fetchData();
      }, 500);
    } else {
      setConflictText('');
    }
  }, [versionConflict]);

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader>
        Items
      </IonHeader>
      <IonText>{progress}</IonText>
      <IonProgressBar color={'success'} value={progress / 100}/>
      {
        versionConflict && (
          <IonHeader color={'danger'}>
            {conflictText}
          </IonHeader>
        )
      }
      <IonContent>
        <IonItem style={{marginTop: 16, marginBottom: 16}}>
          <IonInput value={userInput} onIonChange={(e) => setUserInput(e.detail.value)} type={"text"} placeholder={'Search for tasks'}/>
        </IonItem>
        {
          items.length > 0 ? (
            items.map(item => (
              <ItemCard key={item.text} title={item.text} subtitle={item.status} body={item.version} item={item}/>
            ))
          ) : (
            <IonHeader>
              No items yet. Search for some
            </IonHeader>
          )
        }
      </IonContent>
      <IonLoading isOpen={loading}/>
    </IonPage>
  )
};

export default ItemList;
