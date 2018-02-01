import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScheduleHeader from '../components/userSchedule/scheduleHeader';
import MySchudeleHeader from '../components/userSchedule/header';
import UserScheduleContent from '../components/userSchedule/schedule';
import UserScheduleFooter from '../components/userSchedule/footer';
import * as actions from '../actions/userSchedule';
import { calculateMonday } from '../api/commonApi';
import { formatDate } from '../utils/util';
import ajax from '../utils/fetch';
import { formatMyScheduleResultList } from '../api/commonApi';

class UserSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '' };
  }

  componentDidMount() {
    const self = this, params = this.props.match.params, userId = params.userId;
    this.setState({ userId: userId });
    ajax('http://192.168.51.98:8088/app/userTimeTable', { userId: userId }).then(({ resultList, noTimeList }) => {
      // resultList 有日期的课表    noTimeList 为安排时间的
      const { changeCurrentMonth, changeCurrentMonday, changePlannedSchedule, changeUnPlannedSchedule } = self.props,
        date = new Date(), currentDate = formatDate(date), currentMonday = calculateMonday(date);
      // 保存当前月份
      changeCurrentMonth(currentDate);
      // 保存当前周的周一
      changeCurrentMonday(currentMonday);
      // 格式化表格中的数据并保存到state
      changePlannedSchedule(formatMyScheduleResultList(resultList));
      // 保存未安排时间的
      changeUnPlannedSchedule(noTimeList);
    }).catch((e) => { console.log(e); });
  }

  render() {
    const state = this.state;

    return (
      <div className='User-schedule-root'>
        <div className='User-schedule-bg-red'></div>
        <div className='User-schedule-container'>
          <MySchudeleHeader userId={state.userId} />
          <div className='User-schedule-table'>
            <ScheduleHeader />
            <UserScheduleContent userId={state.userId} />
          </div>
          <UserScheduleFooter />
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
    changeUnPlannedSchedule: actions.changeUnPlannedSchedule,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserSchedule);