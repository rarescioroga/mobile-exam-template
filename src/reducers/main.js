const defaultState = {
  items: [],
  progress: 0,
  users: [],
  messages: [],
  selectedMessages: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'items': {
      return { ...state, items: action.payload }
    }

    case 'progress': {
      return { ...state, progress: action.payload }
    }

    case 'users': {
      return { ...state, users: action.payload }
    }

    case 'messages': {
      return { ...state, messages: action.payload }
    }

    case 'selectedMessages': {
      return { ...state, selectedMessages: action.payload }
    }

    case 'removeMessage': {
      const id = action.payload;

      const indexInMessagesArray = state.messages.findIndex(message => message.id === id);
      const indexInSelectedMessagesArray = state.selectedMessages.findIndex(message => message.id === id);

      const newMessages = [...state.messages];
      const newSelectedMessages = [...state.selectedMessages];

      if(indexInMessagesArray > -1){
        newMessages.splice(indexInMessagesArray, 1);
      }

      if(indexInSelectedMessagesArray > -1){
        newSelectedMessages.splice(indexInSelectedMessagesArray, 1);
      }

      return { ...state, selectedMessages: newSelectedMessages, messages: newMessages };
    }

    default:
      throw new Error('mutation type not defined');
  }
}

export { reducer, defaultState };
