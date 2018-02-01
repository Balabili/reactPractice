import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SelectSeat from './pages/selectClassSeat';
import SelectStoreSeat from './pages/selectStoreSeat';
import ClassSchedule from './pages/classSchedule';
import TeacherSchedule from './pages/teacherSchedule';
import UserSchedule from './pages/userSchedule';
import LessonPromotion from './pages/lessonPromotion';
import BannerDetail from './pages/bannerDetail';
import SchoolDetail from './pages/schoolDetail';
import TeacherDetail from './pages/teacherDetail';
import CourseDetails from './pages/courseDetails';
import MultipleShop from './pages/multipleShop'
import B_SelectClassSeat from './pages/business/selectClassSeat';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/Seat/:userId/:courseId/:durationId" component={SelectSeat} />
      <Route path="/StoreSeat/:userId/:tournamentId/:quantumId/:type" component={SelectStoreSeat} />
      <Route path="/schedule/:schoolId/:teacherId?" component={ClassSchedule} />
      <Route path="/teacherSchedule/:schoolId" component={TeacherSchedule} />
      <Route path="/mySchedule/:userId" component={UserSchedule} />
      <Route path="/lessonPromotion" component={LessonPromotion} />
      <Route path="/bannerDetail/:bannerId" component={BannerDetail} />
      <Route path="/schoolDetail/:schoolId" component={SchoolDetail} />
      <Route path="/teacherDetail/:teacherId" component={TeacherDetail} />
      <Route path="/courseDetails" component={CourseDetails} />
      <Route path="/multipleShop" component={MultipleShop} />
      <Route path="/businessClassSeat/:className" component={B_SelectClassSeat} />
    </Switch>
  </BrowserRouter>
)

export default routes;