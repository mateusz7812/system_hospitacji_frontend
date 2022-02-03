export const academicReducer = (state, action) => {
    switch (action.type) {
      case 'ACADEMIC_ITEMS':
        return {
          ...state,
          academicItems: action.academicItems
        }
      default:
        throw new Error('Unexpected action');
    }
  };
    