import React from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton} from '@ionic/react';
import {updateTask} from "../api/item-service";
import {useGlobalMutation} from "../../../containers/main";

const ItemCard = ({ title, subtitle, body, item }) => {
  const mutationContext = useGlobalMutation();

  const buttonText = item.status === 'active' ? 'Close' : 'Reopen';
  const buttonColor= item.status === 'active' ? 'danger' : 'success';

  const handleButtonClick = () => {
    const updatedTask = item.status === 'active'
      ? {
        ...item,
        status: 'done',
      }
      : {
        ...item,
        status: 'active',
      };

    updateTask(updatedTask).then(response => {
      if(!response.status){
        mutationContext.setVersionConflict(true);
        return;
      }

      const newItem = response.data;
      mutationContext.setItem(item.id, newItem);
    });
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent style={{display: 'flex', justifyContent: 'space-between'}}>
        {body}
        <IonButton color={buttonColor} onClick={handleButtonClick}>
          {buttonText}
        </IonButton>
      </IonCardContent>
    </IonCard>
  )
}

export default ItemCard;
