  
 export const hospitationReducer = (state, action) => {
    switch (action.type) {
      case 'HOSPITATION_ITEMS':
        return {
          ...state,
          hospitationItems: action.hospitationItems
        }
      default:
        throw new Error('Unexpected action');
    }
  };
  