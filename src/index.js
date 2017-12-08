import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import './styles/common.css';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log(store.getState());
});

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();