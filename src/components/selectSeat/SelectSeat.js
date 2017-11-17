import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Seats from './Seats';

class SelectSeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isView: true,
      seatPosition: { row: 1, column: 4 },
      signIn: 0
    };
    this.changeViewStatus = this.changeViewStatus.bind(this);
    this.changeSeat = this.changeSeat.bind(this);
  }

  componentWillMount() {
    this.setState({
      signIn: this.calculateSignInUser()
    });
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
    this.setState({ isView: !this.state.isView });
  }

  changeSeat(position) {
    this.setState({ seatPosition: position });
  }

  render() {
    return (
      <div className="Select-seat-container">
        <Row>
          <Col offset={1} span={16}><h3>黑板在座位中央</h3></Col>
          <Col span={3}>已报名:</Col>
          <Col span={3}><span>{this.state.signIn}/{this.props.seats.length}</span></Col>
        </Row>
        <Row>
          <Col offset={4} span={4}>可选</Col>
          <Col offset={4} span={4}>不可选</Col>
          <Col offset={4} span={4}>已选</Col>
        </Row>
        <Seats seat={this.props.seats} isView={this.state.isView} calculatePosision={this.changeSeat} />
        <Row>
          <Col offset={1} span={4}>
            已选座位：{this.state.seatPosition.row}排{this.state.seatPosition.column}座
          </Col>
          <Col offset={12} span={6}>
            <span className="Ensure-seat" onClick={this.changeViewStatus}>{this.state.isView ? '选座' : '确认座位'}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
export default SelectSeat;