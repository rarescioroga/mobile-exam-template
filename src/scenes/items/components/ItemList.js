import React, {useEffect, useState} from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonProgressBar,
  IonSelect,
  IonSelectOption, IonLabel, IonButton, IonText
} from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {deleteMessage, getMessages, webSocketUrl} from "../api/item-service";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { progress, users, messages, selectedMessages } = stateContext;
  const [selectedUser, setSelectedUser] = useState();

  const onMessage = (data) => {
    if(data.users) {
      mutationContext.setUsers(data.users);
    }
  }

  useEffect(() => {
    const webSocket = new WebSocket(webSocketUrl)
    webSocket.onopen = () => {
      console.log('web socket onopen');
    };
    webSocket.onclose = () => {
      console.log('web socket onclose');
    };
    webSocket.onerror = error => {
      console.log('web socket onerror', error);
    };
    webSocket.onmessage = messageEvent => {
      console.log('web socket onmessage');
      onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
      webSocket.close();
    }
  }, []);

  useEffect(() => {
    if(users.length > 0){
      setSelectedUser(users[0]);
      fetchMessagesOfUser(users[0]);
    }
  }, [users]);

  const fetchMessagesOfUser = (user) => {
    getMessages(user, mutationContext.setProgress)
      .then(response => {
        if(response.data){
          mutationContext.setMessages(response.data);
        }
        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      });
  }

  const handleUserChange = async (user) => {
    setSelectedUser(user);
    fetchMessagesOfUser(user);
  }

  const handleDeleteSelected = () => {
    const messagesToDelete = [...selectedMessages];

    messagesToDelete.forEach(message => {
      deleteMessage(message, mutationContext.setProgress)
        .then((response) => {
          if(response.status && response.status === 200){
            mutationContext.removeMessage(message.id);
          }

          setTimeout(() => {
            mutationContext.setProgress(0);
          }, 200);
        });
    })
  };

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader>
        Items
      </IonHeader>
      <IonText>{progress}</IonText>
      <IonProgressBar value={progress/100}/>
      <IonItem>
        <IonLabel>User</IonLabel>
        <IonSelect value={selectedUser}  onIonChange={e => handleUserChange(e.detail.value)}>
          {
            users.map(user => (
              <IonSelectOption key={user} value={user}>{user}</IonSelectOption>
            ))
          }
        </IonSelect>
      </IonItem>
      <IonContent>
        {
          messages.map(message => (
            <ItemCard key={message.id} title={message.text} subtitle={message.sender} item={message}/>
          ))
        }
        {
          messages.length > 0 && (
            <IonButton
              color={'danger'}
              onClick={handleDeleteSelected}
              disabled={selectedMessages.length === 0}
            >
              DELETE
            </IonButton>
          )
        }
      </IonContent>
    </IonPage>
  )
};

export default ItemList;
