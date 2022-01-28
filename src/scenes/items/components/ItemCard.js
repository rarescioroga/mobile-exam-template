import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";

const ItemCard = ({ title, subtitle, body, item }) => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { selectedMessages } = stateContext;

  const isSelected = () => {
    const index = selectedMessages.findIndex(selectedCard => selectedCard.id === item.id);
    return index >= 0;
  };

  const styles = (isSelected) => isSelected ? {
    border: '2px solid black',
    backgroundColor: '#d7d8da',
    cursor: 'pointer',
  } : { cursor: 'pointer' };


  const handleSelectCard = () => {
    if(!isSelected()){
      const newMessages = [...selectedMessages];
      newMessages.push(item);
      mutationContext.setSelectedMessages(newMessages);
    } else {
      const index = selectedMessages.findIndex(selectedCard => selectedCard.id === item.id);
      const newMessages = [...selectedMessages];
      newMessages.splice(index, 1);
      mutationContext.setSelectedMessages(newMessages);
    }
  };

  return (
    <IonCard style={styles(isSelected())} onClick={handleSelectCard}>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{body}</IonCardContent>
    </IonCard>
  )
}

export default ItemCard;
