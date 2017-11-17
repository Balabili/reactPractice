import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import { addTodo } from './actions'

const store = createStore(
  reducer
);

store.subscribe(() => {
  debugger;
  console.log(store.getState());
});

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();