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
      setProgress(value) {
        dispatch({ type: 'progress', payload: value });
      },
      setQuestions(questions) {
        dispatch({ type: 'questions', payload: questions });
      },
      setCurrentQuestion(currentQuestion) {
        dispatch({ type: 'currentQuestion', payload: currentQuestion });
      },
      setPrevSelectedOption(option) {
        dispatch({ type: 'prevSelectedOption', payload: option });
      },
      setReachedEnd(value) {
        dispatch({ type: 'reachedEnd', payload: value });
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
