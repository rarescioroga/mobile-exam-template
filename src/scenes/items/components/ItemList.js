import React, {useEffect, useState} from 'react';
import {IonPage, IonHeader, IonProgressBar, IonText, IonContent} from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getSpaces} from "../api/item-service";
import ItemCard from "./ItemCard";


const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { items, progress } = stateContext;

  useEffect(() => {
    getSpaces(mutationContext.setProgress)
      .then(response => {
        const spaces = response.data;

        mutationContext.setItems(spaces);

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      });

  }, []);

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader style={{marginBottom: 16 }}>
        Items
      </IonHeader>
      <IonText>{progress}</IonText>
      <IonProgressBar value={progress/100} style={{marginBottom: 16 }}/>
      <IonContent>
        {
          items.map(item => (
            <ItemCard key={item.id} title={`Number: ${item.number}`} subtitle={item.status} body={`Taken by: ${item.takenBy}`} item={item}/>
          ))
        }
      </IonContent>
    </IonPage>
  )
};

export default ItemList;
