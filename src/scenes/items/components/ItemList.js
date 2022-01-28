import React, {useEffect, useState} from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInput,
  IonText,
  IonButton,
  IonAlert,
  IonProgressBar,
  IonCard
} from '@ionic/react';
import { Storage } from '@capacitor/storage';

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {answerQuestion, webSocketUrl} from "../api/item-service";
import ItemCard from "./ItemCard";

const isNumber = (val) => {
  return /^-?\d+$/.test(val);
}

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { questions, currentQuestion, isAnswering, progress, answers } = stateContext;
  const [questionIgnoredMessage, setQuestionIgnoredMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const buttonText = showAnswers ? 'Hide answers' : 'Show answers';
  const buttonColor = showAnswers ? 'danger' : 'primary';

  const onMessage = (data) => {
    mutationContext.addQuestion(data);

    if(!isAnswering){
      mutationContext.setCurrentQuestion(data);
      mutationContext.setIsAnswering(true);
    }

    if(isAnswering){
      setQuestionIgnoredMessage(`Question ${data.id} was ignored`);
    }
  };

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
  }, [isAnswering]);

  useEffect(() => {
    (async () => {
      const answers = (await Storage.get({ key: 'answers' })).value;
      mutationContext.setAnswers(JSON.parse(answers));
    })();
  }, []);

  const clearData = () => {
    setUserInput('');
    setQuestionIgnoredMessage('');
    setTimeout(() => {
      mutationContext.setProgress(0);
    }, 500);
  }

  const handleButtonClick = () => {
    if(!isNumber(userInput)){
      setShowAlert(true);
      return;
    }

    answerQuestion({
      questionId: currentQuestion.id,
      answer: userInput,
    }, mutationContext.setProgress).then(response => {
      const answer = response.data;
      const answerData = {
        questionText: currentQuestion.text,
        answerText: userInput,
        isCorrect: answer.isCorrect,
      };

      mutationContext.addAnswer(answerData);

      mutationContext.setIsAnswering(false);
      clearData();
    }).catch((err) => {
      console.log('err ------------------->> ', err);
      clearData();
    });
  };

  return (
    <IonPage style={{padding: 16}}>
      <IonHeader style={{ marginBottom: 16}}>
        Items
      </IonHeader>
      <IonText>{progress}</IonText>
      <IonProgressBar color={'success'} value={progress / 100} style={{ marginBottom: 16}}/>
      {
        questionIgnoredMessage && (
          <IonText style={{ marginBottom: 16}}>
            {questionIgnoredMessage}
          </IonText>
        )
      }
      <IonContent >
        {
          isAnswering ? (
            <IonText style={{ marginBottom: 16}}>Answer the following question: {currentQuestion.text}</IonText>
          ) : (
            <IonHeader>
              Waiting for next question
            </IonHeader>
          )
        }
        {
          isAnswering && (
            <>
              <IonInput
                style={{ marginBottom: 16}}
                value={userInput}
                onIonChange={(e) => setUserInput(e.target.value)}
                placeholder={'Type your answer'}
              />
              <IonButton color={'success'} onClick={handleButtonClick}>Answer</IonButton>
            </>
          )
        }
        <IonButton color={buttonColor} onClick={() => setShowAnswers(prevState => !prevState)}>{buttonText}</IonButton>
        {
          showAnswers && (
            answers.map(answer => (
              <ItemCard
                key={answer.questionText}
                title={answer.questionText}
                subtitle={answer.answerText}
                body={answer.isCorrect ? 'Correct' : 'Incorrect'}
              />
            ))
          )
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alert'}
        subHeader={'Invalid input'}
        message={'Input must be of type number.'}
        buttons={['OK']}
      />
    </IonPage>
  )
};

export default ItemList;
