import React, {useEffect, useState} from 'react';
import {IonPage, IonHeader, IonContent, IonItem, IonInput, IonLoading} from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getTasks} from "../api/item-service";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { items } = stateContext;
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(userInput){
      setLoading(true);
      getTasks(userInput).then(response => {
        const items = response.data;
        mutationContext.setItems(items);
        setLoading(false);
      });
    } else {
      mutationContext.setItems([]);
    }

    setLoading(false);
  }, [userInput]);

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader>
        Items
      </IonHeader>
      <IonContent>
        <IonItem style={{marginTop: 16, marginBottom: 16}}>
          <IonInput value={userInput} onIonChange={(e) => setUserInput(e.detail.value)} type={"text"} placeholder={'Search for tasks'}/>
        </IonItem>
        {
          items.length > 0 ? (
            items.map(item => (
              <ItemCard key={item.text} title={item.text} subtitle={item.status} body={item.version}/>
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
