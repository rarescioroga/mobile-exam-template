import React, {useEffect, useState} from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonProgressBar,
  IonText,
  IonItem,
  IonInput,
  IonButton,
  IonAlert
} from '@ionic/react';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getItems, getProducts, updateItem} from "../api/item-service";
import ItemCard from "./ItemCard";

const isNumber = (val) => {
  return /^-?\d+$/.test(val);
}

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { items, products, progress, selectedCard, versionConflict } = stateContext;
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [conflictText, setConflictText] = useState('');

  const fetchData = () => {
    getProducts(mutationContext.setProgress)
      .then(response => {
        const products = response.data;
        mutationContext.setProducts(products);
        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      })

    getItems(mutationContext.setProgress)
      .then(response => {
        const items = response.data;
        mutationContext.setItems(items);
        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 500);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const productsWithQuantities = products.reduce((acc, product) => {
      const matchingItem = items.find(item => item.productId === product.id);

      acc.push({
        ...product,
        ...matchingItem,
      });

      return acc;
    }, []);

    setData(productsWithQuantities);

  }, [items, products]);

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

  const handleButtonClick = () => {
    if(!selectedCard.id && selectedCard.id !== 0){
      setShowAlert(true);
      return;
    }

    if(!isNumber(userInput)){
      setShowAlert2(true);
      return;
    }

    updateItem({
      productId: selectedCard.productId,
      quantity: selectedCard.quantity + Number(userInput),
      version: selectedCard.version,
    }, mutationContext.setProgress).then(response => {
      if(!response.status){
        mutationContext.setVersionConflict(true);
        return;
      }

      const newItem = response.data;
      mutationContext.setItem(selectedCard.productId, newItem);
      setTimeout(() => {
        mutationContext.setProgress(0);
      }, 500);
    });
  };

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader>
        Items
      </IonHeader>
      <IonText>{progress}</IonText>
      {
        versionConflict && (
          <IonHeader color={'danger'}>
            {conflictText}
          </IonHeader>
        )
      }
      <IonProgressBar color={'success'} value={progress / 100}/>
      <IonContent>
      <IonItem style={{marginTop: 16, marginBottom: 16}}>
        <IonInput value={userInput} onIonChange={(e) => setUserInput(e.detail.value)} type={"text"} placeholder={'Enter quantity'}/>
      </IonItem>
      <IonButton color={'tertiary'} onClick={handleButtonClick}>
        Add
      </IonButton>

        {
          data.length > 0 ? (
            data.map(item => (
              <ItemCard
                key={item.name}
                title={item.name}
                subtitle={`Quantity: ${item.quantity}`}
                body={item.version}
                item={item}
              />
            ))
          ) : (
            <IonHeader>
              No data yet.
            </IonHeader>
          )
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alert'}
        subHeader={'No selected card'}
        message={'Please select a card first.'}
        buttons={['OK']}
      />
      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        header={'Alert'}
        subHeader={'Inavlid input'}
        message={'Input must be of type number.'}
        buttons={['OK']}
      />
    </IonPage>
  )
};

export default ItemList;
