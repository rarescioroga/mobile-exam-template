import React, { createContext, useReducer, useMemo, useContext } from 'react';

import { reducer, defaultState } from '../reducers/main';

const StateContext = createContext({});
const MutationContext = createContext({});

export const ContainerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const methods = useMemo(() => {
    return {
      setItems(items) {
        dispatch({ type: 'items', payload: items });
      },
      setCurrentQuestion(question) {
        dispatch({ type: 'currentQuestion', payload: question });
      },
      addQuestion(question) {
        dispatch({ type: 'question', payload: question });
      },
      setIsAnswering(value) {
        dispatch({ type: 'isAnswering', payload: value });
      },
      setProgress(value) {
        dispatch({ type: 'progress', payload: value });
      },
      addAnswer(answer) {
        dispatch({ type: 'answer', payload: answer });
      },
      setAnswers(answers) {
        dispatch({ type: 'answers', payload: answers });
      }

    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <MutationContext.Provider value={methods}>
        {children}
      </MutationContext.Provider>
    </StateContext.Provider>
  )
}

export const useGlobalState = () => {
  return useContext(StateContext);
}

export const useGlobalMutation = () => {
  return useContext(MutationContext);
}
