import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/classSeat';
import SelectSeat from '../components/selectClassSeat/SelectSeat';
import ajax from '../utils/fetch';

class Seat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const self = this, param = self.props.match.params, durationId = param.durationId, userId = param.userId;
    ajax('/courseTimeQuantum', { courseId: durationId }).then(({ courseTimeQuantumList, seatTimeQuantumList }) => {
      const { addUserId, addCourseDuration, changeSeats } = self.props;
      //后台数据格式化为前台需要的格式
      let seatList = self.formatSeatList(seatTimeQuantumList);
      addUserId(userId);
      addCourseDuration({ id: durationId, name: 'xxxxx' });
      changeSeats(seatList);
    }).catch((e) => { console.log(e); });
  }

  formatSeatList(seatTimeQuantumList) {
    const seatId = this.props.seatId;
    return seatTimeQuantumList.map((item) => {
      //status 1 未选中 2 已选中 3 不能选
      let status = 0;
      if (seatId === item.id && item.check_state === '1') {
        status = 2;
      } else {
        status = item.check_state === '1' ? 1 : 3;
      }
      return { _id: item.id, id: +item.coordinate, status: status };
    });
  }

  render() {
    const { seats, duration } = this.props;

    return (
      <div id='selectSeatRoot'>
        <div className="Select-duration-header">
          <div className="Select-duration-title">选择时段</div>
          <div className="Select-duration-content">
            {duration.name}
          </div>
        </div>
        <SelectSeat seats={seats} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.seatPage;
  return {
    seats: stateData.seats,
    seatId: stateData.seatId,
    duration: stateData.duration
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addUserId: actions.addUserId,
    changeSeats: actions.changeSeats,
    addCourseDuration: actions.addCourseDuration
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
