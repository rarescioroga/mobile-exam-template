import { Storage } from '@capacitor/storage';

const defaultState = {
  items: [],
  currentQuestion: {},
  questions: [],
  isAnswering: false,
  progress: 0,
  answers: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      return { ...state, items: action.payload }
    }

    case 'currentQuestion': {
      return { ...state, currentQuestion: action.payload }
    }

    case 'question': {
      const newQuestions = [...state.questions];
      newQuestions.push(action.payload);
      return { ...state, questions: newQuestions }
    }

    case 'isAnswering': {
      return { ...state, isAnswering: action.payload }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    case 'answer': {
      const newAnswers = [...state.answers];
      newAnswers.push(action.payload);

      Storage.set({key: 'answers', value: JSON.stringify(newAnswers)});

      return { ...state, answers: newAnswers }
    }

    case 'answers': {
      return { ...state, answers: action.payload }
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
