import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import './styles/common.css';

const store = createStore(
  reducer
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