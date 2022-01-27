import React, {useEffect} from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";

const ItemCard = ({ title, subtitle, body, item }) => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { selectedCard } = stateContext;
  const isSelected = selectedCard && selectedCard.id === item.id;

  const styles = isSelected ? {
    border: '2px solid #5d58e0',
    backgroundColor: '#7974ff',
    cursor: 'pointer',
  } : { cursor: 'pointer' };

  const handleCardClick = () => {
    mutationContext.setSelectedCard(item);
  };

  return (
    <IonCard onClick={handleCardClick} style={styles}>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{body}</IonCardContent>
    </IonCard>
  )
}

export default ItemCard;
