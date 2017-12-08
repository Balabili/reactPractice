import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/userSchedule';
import { touchMove, addDate, formatDate } from '../../utils/util';

class UserScheduleContent extends React.Component {
  constructor() {
    super();
    this.getTouchStartPosition = this.getTouchStartPosition.bind(this);
    this.calculateMovePosition = this.calculateMovePosition.bind(this);
    this.state = { startX: '', startY: '', touchMoveDisabled: false };
  }

  getTouchStartPosition({ targetTouches }) {
    this.setState({
      startX: targetTouches[0].pageX,
      startY: targetTouches[0].pageY
    });
  }

  calculateMovePosition({ targetTouches }) {
    const self = this, state = self.state, { currentMonday, changeCurrentMonday } = self.props,
      start = { X: state.startX, Y: state.startY },
      end = { X: targetTouches[0].pageX, Y: targetTouches[0].pageY },
      position = touchMove(start, end);
    if (state.touchMoveDisabled) {
      return;
    }
    self.setState({ touchMoveDisabled: true });
    let newMonday = '';
    if (position === 'left') {
      newMonday = addDate(currentMonday, 7);
    } else if (position === 'right') {
      newMonday = addDate(currentMonday, -7);
    } else {
      self.setState({ touchMoveDisabled: false });
      return;
    }
    changeCurrentMonday(newMonday);
    this.getScheduleList(newMonday);
  }

  getScheduleList(newMonday) {
    const { currentMonth, changeCurrentMonth } = this.props, mondayFormat = formatDate(newMonday), sunday = addDate(newMonday, 6), sundayFormat = formatDate(sunday);
    if (+currentMonth.substr(5, 2) !== sunday.getMonth() + 1) {
      changeCurrentMonth(sundayFormat);
    }
    this.setState({ touchMoveDisabled: false });
  }

  getScheduleItems(schedules) {
    const { scheduleTypeColorMap } = this.props;
    return schedules.map((item, index) => {
      return (
        <div className={`User-schedule-body-item-details`} data-id={item.id}
          style={{ backgroundColor: scheduleTypeColorMap[item.type] }} key={index}>
          <div>{item.time}</div>
          <div>{item.name}</div>
        </div>
      );
    });
  }

  render() {
    const self = this, { scheduleList } = this.props, gridScheduleList = scheduleList.map((item, index) => {
      const schedules = item.list;
      return (
        <div className={`User-schedule-body-item ${index % 2 ? 'bg-grey' : ''} ${index === 0 ? 'left-bottom-radius' : ''} ${index === 6 ? 'right-bottom-radius' : ''}`}
          key={index}>{self.getScheduleItems(schedules)}</div>
      );
    });

    return (
      <div className='User-schedule-body-content' onTouchStart={this.getTouchStartPosition} onTouchMove={this.calculateMovePosition}>
        {gridScheduleList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.userSchedulePage;
  return {
    scheduleList: stateData.scheduleList,
    scheduleTypeColorMap: stateData.scheduleTypeColorMap,
    currentMonday: stateData.currentMonday,
    currentMonth: stateData.currentMonth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentMonday: actions.changeCurrentMonday,
    changePlannedSchedule: actions.changePlannedSchedule,
    changeUnPlannedSchedule: actions.changeUnPlannedSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScheduleContent);