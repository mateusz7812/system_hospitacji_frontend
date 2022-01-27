  
 export const protocolReducer = (state, action) => {
    switch (action.type) {
      case 'PROTOCOL_ITEMS':
        return {
          ...state,
          protocolItems: action.protocolItems
        }
      case 'PROTOCOL_DETAILS':
        return {
          ...state,
          protocolDetails: {
            ...state.protocolDetails, [action.protocolId]: action.protocolDetails
          }
        }
      case 'PROTOCOL_QUESTIONS':
        return {
          ...state,
          protocolQuestions: action.protocolQuestions
        }
      case 'PROTOCOL_ANSWERS':
        return {
          ...state,
          protocolAnswers: {
            ...state.protocolAnswers, [action.protocolId]: action.protocolAnswers
          }
        }
      default:
        throw new Error('Unexpected action');
    }
  };
  