import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { Storage } from '@capacitor/storage';

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
      setItem(id, item) {
        dispatch({ type: 'item', payload: { id, item } });
      },
      setProgress(value) {
        dispatch({ type: 'progress', payload: value });
      },
      setCurrentUser(value) {
        console.log('value ------------------->> ', value);
        Storage.set({ key: 'user', value });

        dispatch({ type: 'currentUser', payload: value });
      },
      setSelectedCard(value){
        dispatch({ type: 'selectedCard', payload: value });
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
