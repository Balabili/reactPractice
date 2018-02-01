import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd/lib/grid';
import Modal from 'antd/lib/modal';
import Seats from './Seats';
import imgActived from '../../images/seat_grey.png';
import imgSelected from '../../images/seat_green.png';
import imgDeactived from '../../images/seat_red.png';
import { loadURL } from '../../utils/util';
import ajax from '../../utils/fetch';

class SelectSeat extends React.Component {
  constructor(props) {
    super(props);
    this.saveSeat = this.saveSeat.bind(this);
  }

  saveSeat() {
    const { seatId, idList, oldSeatId, oldSeatRequired } = this.props;
    // 保存时没有选座的提示
    if (!seatId) {
      Modal.warning({
        content: '请选择座位',
        maskClosable: true
      });
      return;
    }
    let data = { quantumId: idList.durationId, courseId: idList.courseId, userId: idList.userId, coordinateIdNew: seatId };
    if (oldSeatRequired && oldSeatId !== seatId) {
      data.coordinateIdOld = oldSeatId;
    }
    ajax('/updateSeatState', data).then(() => {
      // 通知安卓跳转
      loadURL('ClassSeat://success');
    }).catch((e) => { console.log(e); });
  }

  render() {
    const { location, seatPosition, seats } = this.props;
    return (
      <div className="Select-seat-container">
        <header className='Select-seat-title'>
          <div>{location}</div>
        </header>
        <section className='Select-seat-description'>
          <div className='Select-seat-description-item'><img src={imgActived} alt=''></img>可选</div>
          <div className='Select-seat-description-item'><img src={imgDeactived} alt=''></img>不可选</div>
          <div className='Select-seat-description-item'><img src={imgSelected} alt=''></img>已选</div>
        </section>
        <Seats seat={seats} />
        <Row >
          <Col offset={1} span={17} className={seatPosition ? '' : 'hidden'}>
            <Row className='Select-seat-selected-title'>
              已选座位：
            </Row>
            <Row className='Select-seat-selected-seat'>
              {seatPosition ? seatPosition.row : ''}排{seatPosition ? seatPosition.column : ''}座
            </Row>
          </Col>
          <Col span={6}>
            <span className="Ensure-seat" onClick={this.saveSeat}>确认座位</span>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.seatPage;
  return {
    seatId: stateData.seatId,
    idList: stateData.idList,
    seats: stateData.seats,
    oldSeatId: stateData.oldSeatId,
    seatPosition: stateData.seatPosition,
    oldSeatRequired: stateData.oldSeatRequired
  }
};

export default connect(mapStateToProps)(SelectSeat);