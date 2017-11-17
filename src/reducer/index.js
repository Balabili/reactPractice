import { addTodo } from '../actions';

const initState = {
  test: 'DEMO',
  todos: []
};

function toDoApp(state = initState, action) {
  return state;
}

export default toDoApp;