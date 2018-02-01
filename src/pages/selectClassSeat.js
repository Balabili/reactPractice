import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/classSeat';
import SelectSeat from '../components/selectClassSeat/SelectSeat';
import ajax from '../utils/fetch';

class Seat extends React.Component {
  constructor(props) {
    super(props);
    // weeks周几  timeline 几点到几点  teacherLocation 教师位置
    this.state = { weeks: '', timeline: '', teacherLocation: '' };
  }

  componentDidMount() {
    const self = this, param = self.props.match.params, durationId = param.durationId, courseId = param.courseId, userId = param.userId;
    ajax('/seatDetail', { quantumId: durationId, courseId: courseId }).then(({ seatDetrailsList, teacherLocation, timeOne, timeTwo }) => {
      const { addIdList, changeSeats } = self.props;
      //后台数据格式化为前台需要的格式
      let seatList = self.formatSeatList(seatDetrailsList, userId);
      // weeks周几  timeline 几点到几点  teacherLocation 教师位置
      self.setState({ weeks: timeOne, timeline: timeTwo, teacherLocation: teacherLocation });
      // 将选座时需要使用的id存入redux state中
      addIdList({ userId: userId, durationId: durationId, courseId: courseId });
      //修改座位list
      changeSeats(seatList);
    }).catch((e) => { console.log(e); });
  }

  formatSeatList(seatTimeQuantumList, userId) {
    return seatTimeQuantumList.map((item) => {
      //status 1 未选中 2 已选中 3 不能选
      let status = 0;
      if (item.check_state === '1') {
        status = 1;
      } else if (item.check_state === '3') {
        //当座位是备选状态时  如果选择这个座位的user是当前user，需要将当前座位的type变为2  颜色为绿色
        if (item.user_id === userId) {
          const { changeSeatRequiredStatus, addOldSeatId } = this.props;
          status = 2;
          // changeSeatRequiredStatus修改座位保存时是否需要加上旧坐标的标识符
          changeSeatRequiredStatus(true);
          // 保存旧座位id
          addOldSeatId(item.id);
        } else {
          status = 3;
        }
      }
      return { _id: item.id, id: +item.coordinate, status: status };
    });
  }

  render() {
    const { seats } = this.props, state = this.state;

    return (
      <div id='selectSeatRoot'>
        <div className="Select-duration-header">
          <div className="Select-duration-title">选择时段</div>
          <div className="Select-duration-content">
            {state.weeks + state.timeline}
          </div>
        </div>
        <SelectSeat seats={seats} location={state.teacherLocation} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.seatPage;
  return {
    seats: stateData.seats,
    seatId: stateData.seatId
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addIdList: actions.addIdList,
    changeSeats: actions.changeSeats,
    addOldSeatId: actions.addOldSeatId,
    changeSeatRequiredStatus: actions.changeSeatRequiredStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
