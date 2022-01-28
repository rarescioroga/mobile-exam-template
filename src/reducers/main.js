const defaultState = {
  items: [],
  progress: 0,
  currentUser: '',
  selectedCard: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      return { ...state, items: action.payload }
    }

    case 'item': {
      const id = action.payload.id;
      const item = action.payload.item;

      const itemIndex = state.items.findIndex(item => item.id === id);
      const newItems = [...state.items];
      newItems[itemIndex] = item;

      return { ...state, items: newItems }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    case 'currentUser': {
      return { ...state, currentUser: action.payload }
    }

    case 'selectedCard': {
      return { ...state, selectedCard: action.payload }
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
