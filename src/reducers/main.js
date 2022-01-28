const defaultState = {
  items: [],
  progress: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      return { ...state, items: action.payload }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
