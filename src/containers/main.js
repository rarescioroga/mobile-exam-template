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

      setItem(id, item) {
        dispatch({ type: 'item', payload: { id, item } });
      },

      setProducts(products) {
        dispatch({ type: 'products', payload: products });
      },

      setProgress(value) {
        dispatch({ type: 'progress', payload: value });
      },

      setSelectedCard(card) {
        dispatch({ type: 'selectedCard', payload: card });
      },

      setVersionConflict(value) {
        dispatch({ type: 'versionConflict', payload: value });
      },
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
