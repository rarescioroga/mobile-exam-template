const defaultState = {
  items: [],
  products: [],
  progress: 0,
  selectedCard: {},
  versionConflict: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      const items = action.payload;
      if(!state.versionConflict && items.length > 0){
        items[0].version = 2;
      }

      if(state.versionConflict){
        return { ...state, items, versionConflict: false };
      }

      return { ...state, items: action.payload }
    }

    case 'item': {
      const id = action.payload.id;
      const item = action.payload.item;

      const itemIndex = state.items.findIndex(item => item.productId === id);
      const newItems = [...state.items];
      newItems[itemIndex] = item;

      return { ...state, items: newItems }
    }

    case 'products': {
      return { ...state, products: action.payload }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    case 'selectedCard': {
      return { ...state, selectedCard: action.payload }
    }

    case 'versionConflict': {
      return {...state, versionConflict: action.payload }
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
