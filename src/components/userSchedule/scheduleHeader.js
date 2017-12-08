import React from 'react';
import { connect } from 'react-redux';
import { getCurrentWeekDateList } from '../../api/classSchedule';

class ScheduleHeader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { currentMonday } = this.props, weekList = getCurrentWeekDateList(currentMonday),
      week = weekList.map((item, index) => {
        return (
          <div className={`User-schedule-body-header-item ${item.isToday ? 'Week-column-title-today' : (item.isSameMonth ? 'Week-column-title-active' : '')}
          ${index === 0 ? 'left-top-radius' : ''} ${index === 6 ? 'right-top-radius' : ''}`} key={index}>
            <div>{item.week}</div>
            <div>{item.date}</div>
          </div>
        );
      });

    return (
      <div className='User-schedule-body-header'>
        {week}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.userSchedulePage;
  return {
    currentMonday: stateData.currentMonday
  };
}

export default connect(mapStateToProps)(ScheduleHeader);