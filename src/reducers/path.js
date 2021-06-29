export const dataWorkSpace = function (state = {}, action = {}) {
  switch (action.type) {
    case 'workspace':
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
