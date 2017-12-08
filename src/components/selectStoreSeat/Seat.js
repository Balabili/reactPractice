import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/storeSeat';
import Modal from 'antd/lib/modal';
import imgActived from '../../images/seat_grey.png';
import imgSelected from '../../images/seat_green.png';
import imgDeactived from '../../images/seat_red.png';

class StoreSeat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectSeatList: []
    };
    this.selectSeat = this.selectSeat.bind(this);
  }

  selectSeat({ target }) {
    const dataset = target.dataset, { selectedSeats } = this.props;
    if (!dataset.type || dataset.type === '3') {
      return;
    } else if (dataset.type === '2') {
      const id = dataset.id;
      this.changeSeatType(id, false);
    } else if (dataset.type === '1') {
      if (selectedSeats.length === 4) {
        Modal.warning({
          content: '最多四个座位',
          maskClosable: true
        });
        return;
      }
      const id = dataset.id;
      this.changeSeatType(id, true);
    } else { alert('error'); }
  }

  changeSeatType(seatId, isSelectSeat) {
    let { seats, selectedSeats } = this.props;
    const { changeStoreSeat, changeSelectedSeat } = this.props, len = seats.length;
    for (let i = 0; i < len; i++) {
      if (seats[i].id === seatId) {
        if (isSelectSeat) {
          seats[i].type = '2';
          selectedSeats.push(seats[i]);
          changeSelectedSeat([...selectedSeats]);
        } else {
          const selectSeat = selectedSeats.filter((item) => {
            return item.id !== seatId;
          });
          seats[i].type = '1';
          changeSelectedSeat(selectSeat);
        }
        break;
      }
    }
    changeStoreSeat([...seats]);

  }

  getColumns(row) {
    const { column, seats } = this.props, seatList = [];
    for (let i = row * column; i < (row + 1) * column; i++) {
      const seat = seats[i];
      seatList.push(
        <span className='Store-seat-item' key={i} data-id={seat.id} data-type={seat.type}
          style={{ backgroundImage: this.getBgImage(seat.type) }}>
        </span>
      );
    }
    return seatList;
  }

  getBgImage(type) {
    if (type === '1') {
      return `url(${imgActived})`;
    } else if (type === '2') {
      return `url(${imgSelected})`;
    } else {
      return `url(${imgDeactived})`;
    }
  }

  render() {
    const self = this, { row } = self.props, seatList = [];
    for (let i = 0; i < row; i++) {
      seatList.push(
        <div className='Store-seat-row' key={i}>
          {self.getColumns(i)}
        </div>
      );
    }

    return (
      <section className='Store-Seat-container' onClick={this.selectSeat}>
        {seatList}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.storeSeatPage;
  return {
    seats: stateData.seats,
    selectedSeats: stateData.selectedSeats
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeStoreSeat: actions.changeStoreSeat,
    changeSelectedSeat: actions.changeSelectedSeat
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSeat);