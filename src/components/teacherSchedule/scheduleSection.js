import React from 'react';

class ScheduleSetcion extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  formatLessonItemList() {
    const { lessonList } = this.props, len = lessonList.length;
    let lessonListItems = [];
    if (len) {
      for (let i = 0; i < len; i++) {
        lessonListItems.push(
          <div className='Teacher-schedule-section-lesson-item' key={i}>
            <div className='Teacher-schedule-section-lesson-time'>{lessonList[i].time}</div>
            <div className='Teacher-schedule-section-lesson-name'>{lessonList[i].name}</div>
          </div>
        );
      }
    } else {
      lessonListItems.push(
        <div className='Teacher-schedule-section-nolesson'>暂无课程</div>
      );
    }
    return lessonListItems;
  }

  render() {
    return (
      <section className='Teacher-schedule-section-item'>
        <div className='Teacher-schedule-section-duration'>{this.props.duration}</div>
        <div className='Teacher-schedule-section-lesson-container'>
          {this.formatLessonItemList()}
        </div>
      </section>
    );
  }
}

export default ScheduleSetcion;