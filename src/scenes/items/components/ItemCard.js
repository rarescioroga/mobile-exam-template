import React, {useEffect} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton} from '@ionic/react';
import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {Storage} from "@capacitor/storage";
import {getSpaces, updateItem} from "../api/item-service";

const ItemCard = ({ title, subtitle, body, item }) => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { selectedCard, currentUser } = stateContext;

  useEffect(() => {
    (async () => {
      const user = (await Storage.get({ key: 'user' })).value;
      mutationContext.setCurrentUser(user);
    })();
  }, []);

  const isSelected = selectedCard && selectedCard.id === item.id;

  const styles = isSelected ? {
    border: '2px solid black',
    backgroundColor: '#d7d8da',
    cursor: 'pointer',
  } : { cursor: 'pointer' };

  const handleButtonClick = () => {
    mutationContext.setSelectedCard(item);
  };

  const handleStatusChange = (status, takenBy) => {
    const updatedItem = {
      ...item,
      status,
      takenBy,
    };

    updateItem(updatedItem, mutationContext.setProgress)
      .then(response => {
        if(response.data) {
          mutationContext.setItem(item.id, response.data);
        } else {
          //refetching the items
          getSpaces(mutationContext.setProgress)
            .then(response => {
              const spaces = response.data;
              mutationContext.setItems(spaces);
            });
        }

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      });
  }

  return (
    <IonCard onClick={handleButtonClick} style={styles}>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{body}</IonCardContent>
      {
        isSelected && item.status === 'free' && (
          <IonButton color={'success'} onClick={() => handleStatusChange('taken', currentUser)}>Take</IonButton>
        )
      }
      {
        isSelected && item.takenBy === currentUser && (
          <IonButton color={'danger'} onClick={() => handleStatusChange('free', '')}>Release</IonButton>
        )
      }
    </IonCard>
  )
}

export default ItemCard;
