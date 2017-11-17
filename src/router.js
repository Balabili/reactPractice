import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewSeat from './pages/viewSeat';
import SelectSeat from './pages/selectSeat';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SelectSeat} />
      <Route path="/ViewSeat" component={ViewSeat} />
    </Switch>
  </BrowserRouter>
)

export default routes;