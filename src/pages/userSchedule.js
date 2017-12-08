import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScheduleHeader from '../components/userSchedule/scheduleHeader';
import MySchudeleHeader from '../components/userSchedule/header';
import UserScheduleContent from '../components/userSchedule/schedule';
import UserScheduleFooter from '../components/userSchedule/footer';
import * as actions from '../actions/userSchedule';
import { calculateMonday } from '../api/classSchedule';
import { formatDate } from '../utils/util';

class UserSchedule extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { changeCurrentMonth, changeCurrentMonday, changePlannedSchedule, changeUnPlannedSchedule } = this.props,
      date = new Date(), currentDate = formatDate(date), currentMonday = calculateMonday(date),
      fetchData = [
        { week: 1, list: [{ id: '11', time: '09:00-11:00', name: '你大爷的你大爷的', type: 1 }] },
        { week: 2, list: [{ id: '22', time: '09:00-11:00', name: '你大爷的', type: 2 }] },
        { week: 3, list: [{ id: '33', time: '09:00-11:00', name: '你大爷的', type: 3 }] },
        { week: 4, list: [{ id: '44', time: '09:00-11:00', name: '你大爷的', type: 2 }] },
        { week: 5, list: [{ id: '55', time: '09:00-11:00', name: '你大爷的', type: 1 }] },
        { week: 6, list: [{ id: '66', time: '09:00-11:00', name: '你大爷的', type: 3 }] },
        { week: 7, list: [{ id: '77', time: '09:00-11:00', name: '你大爷的', type: 1 }, { id: '88', time: '09:00-11:00', name: '你大爷的', type: 2 }] },
      ], unPlanData = [{ id: '888', name: '你大爷的' }, { id: '999', name: '你二爷的' }];
    changeCurrentMonth(currentDate);
    changeCurrentMonday(currentMonday);
    changePlannedSchedule(fetchData);
    changeUnPlannedSchedule(unPlanData);
  }

  render() {
    return (
      <div className='User-schedule-root'>
        <div className='User-schedule-container'>
          <MySchudeleHeader></MySchudeleHeader>
          <div className='User-schedule-table'>
            <ScheduleHeader></ScheduleHeader>
            <UserScheduleContent></UserScheduleContent>
          </div>
          <UserScheduleFooter></UserScheduleFooter>
        </div>
      </div>
    );
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

export default connect(null, mapDispatchToProps)(UserSchedule)