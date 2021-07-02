const init = {
  data: [],
  selected: [],
};

const tree = function (state = init, action = {}) {
  switch (action.type) {
    case 'tree':
      return Object.assign({}, state, action);
    case 'tree-selected':
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

export default tree;
