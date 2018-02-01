import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { formatDate, addDate, defineMomentLocalLanguage, loadURL } from '../../utils/util';
import { calculateMonday, formatMyScheduleResultList } from '../../api/commonApi';
import * as actions from '../../actions/userSchedule';
import ajax from '../../utils/fetch';
const { MonthPicker } = DatePicker;

class MySchudeleHeader extends React.Component {
  constructor(props) {
    super(props);
    this.changeMonth = this.changeMonth.bind(this);
    this.backToBeforePage = this.backToBeforePage.bind(this);
  }

  changeMonth(value) {
    const { changeCurrentMonth, changeCurrentMonday, changePlannedSchedule, userId } = this.props, monday = calculateMonday(value._d),
      mondayFormat = formatDate(monday), sundayFormat = formatDate(addDate(monday, 6));
    ajax('http://192.168.51.98:8088/app/userTimeTable', { userId: userId, beginTime: mondayFormat, endTime: sundayFormat }).then(({ resultList }) => {
      // 修改月份时修改当前月份和当前周的周一  保存当前周的表格数据
      changeCurrentMonth(formatDate(value._d));
      changeCurrentMonday(monday);
      changePlannedSchedule(formatMyScheduleResultList(resultList));
    }).catch((e) => { console.log(e); });
  }

  backToBeforePage() {
    //通知安卓跳转
    loadURL('mySchedule://back');
  }

  render() {
    // 让MonthPicker显示中文，改变moment.js的语言设置使用
    defineMomentLocalLanguage(moment);
    const { currentMonth } = this.props;

    return (
      <header className='User-schedule-header'>
        <MonthPicker value={moment(currentMonth, 'YYYY-MM')} format='LL' onChange={this.changeMonth} />
        <div className='User-schedule-header-button' onClick={this.backToBeforePage}>农历宜忌</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.userSchedulePage;
  return {
    currentMonth: stateData.currentMonth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentMonday: actions.changeCurrentMonday,
    changePlannedSchedule: actions.changePlannedSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MySchudeleHeader);