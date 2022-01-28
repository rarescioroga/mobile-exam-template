import React, {useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getQuestion} from "../api/item-service";

const ItemCard = ({ item }) => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { questions } = stateContext;
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }

  const styles = (option) => option === selectedOption ? {
    border: '2px solid black',
    backgroundColor: '#5d58e0',
    cursor: 'pointer',
    color: 'red',
  } : { cursor: 'pointer' };

  const handleNext = () => {
    const nextQuestionIndex = item.index + 1;

    mutationContext.setPrevSelectedOption(selectedOption);

    if(nextQuestionIndex === questions.length){
      return;
    }

    const questionToFetch = questions[nextQuestionIndex];

    getQuestion(questionToFetch, mutationContext.setProgress)
      .then(response => {
        if(response.data){
          mutationContext.setCurrentQuestion({
            ...response.data,
            index: nextQuestionIndex,
          });
        } else {
          console.log('response ------------------->> ', response);
        }

        setSelectedOption('');

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 200);
      });
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{item.text}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {
          item.options.map(option => (
            <IonCard
              key={option}
              style={styles(option)}
              onClick={() => handleOptionClick(option)}
            >
              <IonCardTitle>
                {option}
              </IonCardTitle>
            </IonCard>
          ))
        }
        <IonButton color={'tertiary'} onClick={handleNext}>
          Next
        </IonButton>
      </IonCardContent>
    </IonCard>
  )
}

export default ItemCard;
