import React from 'react';
import { connect } from 'react-redux';
import ScheduleSection from './scheduleSection';

class ScheduleLessonList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { lessonList } = this.props;
    
    return (
      <div className='Teacher-schedule-lesson-container'>
        <ScheduleSection duration='上午' lessonList={lessonList.fornoon || []}></ScheduleSection>
        <ScheduleSection duration='下午' lessonList={lessonList.afternoon || []}></ScheduleSection>
        <ScheduleSection duration='晚上' lessonList={lessonList.night || []}></ScheduleSection>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessonList: state.teacherSchedulePage.lessonList
  }
}

export default connect(mapStateToProps)(ScheduleLessonList);