import React from 'react';
import { connect } from 'react-redux';
import { changeViewSeatStatus } from '../../actions/classSeat';
import { Row, Col } from 'antd/lib/grid';
import Seats from './Seats';
import imgUrl from '../../images/四月是你的谎言.jpg';

class SelectSeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seatPosition: null,
      signIn: 0
    };
    this.changeViewStatus = this.changeViewStatus.bind(this);
    this.changeSeat = this.changeSeat.bind(this);
    this.saveSeat = this.saveSeat.bind(this);
  }

  calculateSignInUser() {
    let userCount = 0, seat = this.props.seats, len = seat.length;
    for (let i = 0; i < len; i++) {
      if (seat[i].status === 3) {
        userCount++;
      }
    }
    return userCount;
  }

  changeViewStatus() {
    this.props.dispatch(changeViewSeatStatus(!this.props.isView));
  }

  changeSeat(position) {
    this.setState({ seatPosition: position });
  }

  saveSeat() {
    const { courseId, seatId } = this.props, currentDurationId = this.state.seatPosition ? this.state.seatPosition.duration.id : '';
    if (!seatId || !currentDurationId) { alert('请选择座位'); return; }
    debugger;
  }

  render() {
    const selectCount = this.calculateSignInUser();
    return (
      <div className="Select-seat-container">
        <header className='Select-seat-title'>
          <div>黑板在座位中央</div>
          <div>
            已报名:
            <span className='Apply-user-count'><span>{selectCount}/{this.props.seats.length}</span></span>
          </div>
        </header>
        <section className='Select-seat-description'>
          <div className='Select-seat-description-item'><img src={imgUrl} alt=''></img>可选</div>
          <div className='Select-seat-description-item'><img src={imgUrl} alt=''></img>不可选</div>
          <div className='Select-seat-description-item'><img src={imgUrl} alt=''></img>已选</div>
        </section>
        <Seats seat={this.props.seats} isView={this.props.isView} calculatePosition={this.changeSeat} />
        <Row>
          <Col offset={1} span={17} className={this.state.seatPosition ? '' : 'hidden'}>
            <Row>
              已选座位：
            </Row>
            <Row>
              {this.state.seatPosition ? this.state.seatPosition.duration.name : ''}
            </Row>
            <Row>
              {this.state.seatPosition ? this.state.seatPosition.row : ''}排{this.state.seatPosition ? this.state.seatPosition.column : ''}座
            </Row>
          </Col>
          <Col span={6}>
            <span className="Ensure-seat" onClick={this.changeViewStatus}>确认座位</span>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courseId: state.seatPage.courseId,
    seatId: state.seatPage.seatId,
    isView: (typeof (state.seatPage.isView) === 'boolean') ? state.seatPage.isView : true
  }
};

export default connect(mapStateToProps)(SelectSeat);