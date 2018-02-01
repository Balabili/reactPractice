import React from 'react';
import { connect } from 'react-redux';
import ScheduleSection from './scheduleSection';

class ScheduleLessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lessonList } = this.props;
    
    return (
      <div className='Teacher-schedule-lesson-container'>
        <ScheduleSection duration='上午' lessonList={lessonList.forenoonList || []}></ScheduleSection>
        <ScheduleSection duration='下午' lessonList={lessonList.afternoonList || []}></ScheduleSection>
        <ScheduleSection duration='晚上' lessonList={lessonList.nightList || []}></ScheduleSection>
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