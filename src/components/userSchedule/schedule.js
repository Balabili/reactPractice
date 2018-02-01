import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spin from 'antd/lib/spin';
import * as actions from '../../actions/userSchedule';
import { touchMove, addDate, formatDate, loadURL } from '../../utils/util';
import { formatMyScheduleResultList } from '../../api/commonApi';
import ajax from '../../utils/fetch';

class UserScheduleContent extends React.Component {
  constructor(props) {
    super(props);
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
    const self = this, { currentMonth, changeCurrentMonth, userId } = self.props,
      mondayFormat = formatDate(newMonday), sunday = addDate(newMonday, 6), sundayFormat = formatDate(sunday);
    // 看周末是不是到下一个月  如果是下一个月  将月份变为周末的月份
    if (+currentMonth.substr(5, 2) !== sunday.getMonth() + 1) {
      changeCurrentMonth(sundayFormat);
    }
    ajax('http://192.168.51.98:8088/app/userTimeTable', { userId: userId, beginTime: mondayFormat, endTime: sundayFormat }).then(({ resultList }) => {
      const { changePlannedSchedule } = self.props;
      // 格式化前台需要的数据结构并保存到state
      changePlannedSchedule(formatMyScheduleResultList(resultList));
      // 防止滑动跳跃多个周
      setTimeout(() => {
        self.setState({ touchMoveDisabled: false });
      }, 250);
    }).catch((e) => { console.log(e); });
  }

  getScheduleItems(schedules) {
    // 不同type对应的背景颜色不同  scheduleTypeColorMap为type与color之间的映射关系
    const self = this, { scheduleTypeColorMap } = this.props;
    return schedules.map((item, index) => {
      return (
        <div className={`User-schedule-body-item-details`} data-type={item.type} data-id={self.getItemId(item)}
          style={{ backgroundColor: scheduleTypeColorMap[item.type] }} key={index}>
          <div>{item.times}</div>
          <div>{item.name}</div>
        </div>
      );
    });
  }

  getItemId(item) {
    // 1 课程  2赛事之类的   3个人  每种type跳转需要的id都不同
    if (item.type === '1') {
      return item.commodityId;
    } else if (item.type === '2') {
      return item.id;
    } else if (item.type === '3') {
      return item.orderNum;
    } else {
      return '';
    }
  }

  viewLessonDetails({ target }) {
    // 通过事件委托减少页面监听  判断点击的元素或者父元素是否带有id的属性  如果不带  说明点击的元素不需要跳转
    const targetNode = target.dataset.id ? target : target.parentNode;
    let id = targetNode.dataset.id;
    if (id) {
      loadURL(`mySchedule://-${targetNode.dataset.type}-${targetNode.dataset.id}`);
    } else {
      return;
    }
  }

  render() {
    const self = this, { scheduleList } = this.props, gridScheduleList = scheduleList.map((item, index) => {
      // 取模做奇偶背景色分割
      return (
        <div className={`User-schedule-body-item ${index % 2 ? 'bg-grey' : ''} ${index === 0 ? 'left-bottom-radius' : ''} ${index === 6 ? 'right-bottom-radius' : ''}`}
          key={index}>{self.getScheduleItems(item)}</div>
      );
    });

    return (
      <Spin spinning={this.state.touchMoveDisabled}>
        <div className='User-schedule-body-content' onClick={this.viewLessonDetails} onTouchStart={this.getTouchStartPosition} onTouchMove={this.calculateMovePosition}>
          {gridScheduleList}
        </div>
      </Spin>
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
    changePlannedSchedule: actions.changePlannedSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScheduleContent);