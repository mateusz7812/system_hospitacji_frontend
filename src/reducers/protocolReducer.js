export const protocolReducer = (state, action) => {
  switch (action.type) {
    case 'PROTOCOL_ITEMS':
      return {
        ...state,
        protocolItems: action.protocolItems
      }
    default:
      throw new Error('Unexpected action');
  }
};
  