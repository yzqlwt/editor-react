const path = function (state = {}, action = {}) {
  switch (action.type) {
    case 'workspace':
      return Object.assign({}, state, action);
    case 'topic':
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

export default path;
