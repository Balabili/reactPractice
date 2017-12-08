import React from 'react';
import { connect } from 'react-redux';
import Header from './scheduleHeader';
import ScheduleBody from './scheduleContainer';

class TeacherSchedule extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header></Header>
        <ScheduleBody></ScheduleBody>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(TeacherSchedule);