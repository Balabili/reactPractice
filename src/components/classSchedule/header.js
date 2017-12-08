import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/classSchedule';
import Select from 'antd/lib/select';
import { addDate, formatDate } from '../../utils/util';
import ajax from '../../utils/fetch';
import { calculateMonday, formatScheduleList } from '../../api/classSchedule';
const Option = Select.Option;

class ScheduleHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangePlace = this.handleChangePlace.bind(this);
  }

  handleChangeMonth(value) {
    const self = this, { changeCurrentMonth, changeCurrentMonday, lessonId, teacherId } = self.props, monthData = self.getCurrentMonth(value),
      month = monthData.key.replace(/-/g, '/'), todayMonth = new Date();
    //修改state中的当前月
    changeCurrentMonth(monthData);
    //判断选中的月份是否是当前月份
    let currentMonth = new Date(month);
    if (currentMonth.getFullYear() === todayMonth.getFullYear() && currentMonth.getMonth() === todayMonth.getMonth()) {
      currentMonth = new Date();
    }
    //计算当前周的周一和周日的日期
    const currentMonday = calculateMonday(currentMonth), end = formatDate(addDate(currentMonday, 6));
    changeCurrentMonday(currentMonday);
    //生成ajax请求数据的data
    let data = { schoolId: '2af15be1620d45e2968b70b8bf56179f', beginTime: formatDate(currentMonday), endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    if (teacherId) {
      data.teacherId = teacherId;
    }
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList }) => {
      const { changeCurrentSchedule } = self.props;
      changeCurrentSchedule(formatScheduleList(resultList));
      debugger;
    }).catch((e) => { console.log(e); });
  }

  handleChangePlace(value) {
    const { changeCurrentClassPlace } = this.props;
    changeCurrentClassPlace(value);
  }

  getCurrentMonth(value) {
    const classValidMonthList = this.props.classValidMonthList, len = classValidMonthList.length;
    for (let i = 0; i < len; i++) {
      if (classValidMonthList[i].key === value) {
        return classValidMonthList[i];
      }
    }
  }

  render() {
    const { classValidMonthList, currentMonth, currentPlace, isTeacherView } = this.props,
      monthOptions = classValidMonthList.map((item, index) => {
        return <Option key={item.key}>{item.value}</Option>
      });
    return (
      <div className='Header-container'>
        <Select className='Selector-month-container' value={currentMonth.key} onChange={this.handleChangeMonth}>
          {monthOptions}
        </Select>
        {
          !isTeacherView &&
          <div>{currentPlace}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.schedulePage;
  return {
    classValidMonthList: currentState.classValidMonthList,
    currentMonth: currentState.currentMonth,
    currentPlace: currentState.currentPlace,
    isTeacherView: currentState.isTeacherView
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentClassPlace: actions.changeCurrentClassPlace,
    changeCurrentMonday: actions.changeCurrentMonday,
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentSchedule: actions.changeCurrentSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleHeader);