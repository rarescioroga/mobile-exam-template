import React, {useEffect, useState} from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonProgressBar,
  IonText, useIonToast,
} from '@ionic/react';
import { Storage } from "@capacitor/storage";

import {useGlobalMutation, useGlobalState} from "../../../containers/main";
import {getQuestion, getQuestions, sendAnswers} from "../api/item-service";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const mutationContext = useGlobalMutation();
  const stateContext = useGlobalState();
  const { progress, questions, currentQuestion, reachedEnd, prevSelectedOption, errorMessage } = stateContext;
  const [nrAnswers, setNrAnswers] = useState('');
  const [present, dismiss] = useIonToast();


  const checkStorage = async () => {
    const questionsFromStorage = (await Storage.get({key: 'questions'})).value;
    const currentQuestion = (await Storage.get({key: 'currentQuestion'})).value;
    const prevSelectedOption = (await Storage.get({key: 'prevSelectedOption'})).value;

    if(currentQuestion !== null && currentQuestion){
      mutationContext.setCurrentQuestion(JSON.parse(currentQuestion));
    }

    if(prevSelectedOption !== null && prevSelectedOption){
      mutationContext.setPrevSelectedOption(JSON.parse(prevSelectedOption));
    }

    if(questionsFromStorage !== null){
      mutationContext.setQuestions(JSON.parse(questionsFromStorage));
    }

    if(questionsFromStorage !== null && prevSelectedOption !== null){
      mutationContext.setReachedEnd(questionsFromStorage.length === prevSelectedOption.length);
    }

    return !(questionsFromStorage !== null && currentQuestion !== null);
  };

  const showToast = (message) => {
    present({
      buttons: [{ text: 'X', handler: () => dismiss() }],
      message,
      color: 'danger',
      duration: 3000
    });
  };

  const fetchQuestions = () => {
    getQuestions(mutationContext.setProgress)
      .then(response => {
        if(response.data){
          mutationContext.setQuestions(response.data);
        }

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 200);
      });
  };

  const fetchQuestion = (id, index) => {
    getQuestion(id, mutationContext.setProgress)
      .then(response => {
        if(response.data){
          mutationContext.setCurrentQuestion({
            ...response.data,
            index,
          });
        } else {
          showToast(`Error fetching question`);
        }

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 200);
      });
  }

  useEffect(() => {
    (async () => {
      const needsFetch = await checkStorage();

      if(needsFetch){
        fetchQuestions();
      }
    })();
  }, []);


  useEffect(() => {
    if(questions.length > 0 && !currentQuestion.text && !reachedEnd){
      fetchQuestion(-1, -1);
      fetchQuestion(questions[0], 0);
    }
  }, [questions, currentQuestion, reachedEnd]);

  const getAnswers = () => {
    const answersArray = [];

    questions.forEach((question, index) => {
      answersArray.push({
        questionId: question,
        option: prevSelectedOption[index],
      })
    });

    return answersArray;
  }

  const getResults = (answers) => {
    sendAnswers(answers, mutationContext.setProgress)
      .then(response => {
        if(response.data){
          setNrAnswers(response.data.correctAnswers);
        }

        setTimeout(() => {
          mutationContext.setProgress(0);
        }, 200);
      });
  }

  useEffect(() => {
    if(prevSelectedOption.length > 0 && questions.length > 0 &&
      prevSelectedOption.length === questions.length){
      const answers = getAnswers();

      getResults(answers);

      mutationContext.setReachedEnd(true);
      mutationContext.setCurrentQuestion({});
    }
  }, [prevSelectedOption]);


  return (
    <IonPage style={{padding: 16}}>
      <IonHeader>
        Items
      </IonHeader>
      {
        errorMessage && (
          <IonText color={'danger'}>{errorMessage}</IonText>
        )
      }
      <IonText>{progress}</IonText>
      <IonProgressBar value={progress/100}/>
      <IonContent>
        {
          currentQuestion.text && (
            <ItemCard item={currentQuestion}/>
          )
        }
        {
          nrAnswers && (
            <IonText>You have {nrAnswers} correct answers</IonText>
          )
        }
      </IonContent>
    </IonPage>
  )
};

export default ItemList;
