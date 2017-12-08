import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SelectSeat from './pages/selectClassSeat';
import SelectStoreSeat from './pages/selectStoreSeat';
import ClassSchedule from './pages/classSchedule';
import TeacherSchedule from './pages/teacherSchedule';
import UserSchedule from './pages/userSchedule';
import LessonPromotion from './pages/lessonPromotion';
import SchoolDetail from './pages/schoolDetail';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/Seat/:userId/:durationId" component={SelectSeat} />
      <Route exact path="/StoreSeat/:id" component={SelectStoreSeat} />
      <Route path="/schedule/:teacherId?" component={ClassSchedule} />
      <Route path="/teacherSchedule" component={TeacherSchedule} />
      <Route path="/mySchedule" component={UserSchedule} />
      <Route path="/lessonPromotion" component={LessonPromotion} />
      <Route path="/schoolDetail/:schoolId" component={SchoolDetail} />
    </Switch>
  </BrowserRouter>
)

export default routes;