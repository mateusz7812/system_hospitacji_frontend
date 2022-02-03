export const hospitalizationCommitteeReducer = (state, action) => {
    switch (action.type) {
      case 'HOSPITALIZATIONCOMMITTEE_ITEMS':
        return {
          ...state,
          hospitalizationCommitteeItems: action.hospitalizationCommitteeItems
        }
      default:
        throw new Error('Unexpected action');
    }
  };
    