import {Storage} from "@capacitor/storage";

const defaultState = {
  items: [],
  progress: 0,
  questions: [],
  currentQuestion: {},
  prevSelectedOption: [],
  reachedEnd: false,
  errorMessage: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      return { ...state, items: action.payload }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    case 'questions': {
      Storage.set({ key: 'questions', value: JSON.stringify(action.payload)});

      return { ...state, questions: action.payload }
    }

    case 'currentQuestion':{
      Storage.set({ key: 'currentQuestion', value: JSON.stringify(action.payload)});

      return { ...state, currentQuestion: action.payload }
    }

    case 'prevSelectedOption': {
      if(Array.isArray(action.payload)){
        return { ...state, prevSelectedOption: action.payload }
      }

      const newOptions = [...state.prevSelectedOption];
      newOptions.push(action.payload);

      Storage.set({ key: 'prevSelectedOption', value: JSON.stringify(newOptions)});

      return { ...state, prevSelectedOption: newOptions }
    }

    case 'reachedEnd': {
      return { ...state, reachedEnd: action.payload }
    }

    case 'errorMessage': {
      return { ...state, errorMessage: action.payload }
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
