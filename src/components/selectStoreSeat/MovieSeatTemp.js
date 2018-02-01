import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/storeSeat';
import Modal from 'antd/lib/modal';
import { getSeatColumns } from '../../api/commonApi';

class MovieSeat extends React.Component {
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

  // isSelectSeat  是否选座  true为选座   false取消选座
  changeSeatType(seatId, isSelectSeat) {
    let { seats, selectedSeats } = this.props;
    const { changeStoreSeat, changeSelectedSeat } = this.props;
    for (const key in seats) {
      if (seats.hasOwnProperty(key)) {
        let columnLists = seats[key];
        const len = columnLists.length;
        for (let i = 0; i < len; i++) {
          if (columnLists[i].seatId === seatId) {
            if (isSelectSeat) {
              columnLists[i].type = '2';
              selectedSeats.push(Object.assign({ row: key }, columnLists[i]));
              changeSelectedSeat([...selectedSeats]);
            } else {
              const selectSeat = selectedSeats.filter((item) => {
                return item.seatId !== seatId;
              });
              columnLists[i].type = '1';
              changeSelectedSeat(selectSeat);
            }
            break;
          }
        }
      }
    }
    changeStoreSeat(Object.assign({}, seats));
  }

  render() {
    const self = this, { seats } = self.props, seatList = [];
    for (const key in seats) {
      if (seats.hasOwnProperty(key)) {
        const element = seats[key];
        seatList.push(
          <div className='Store-seat-row' key={key}>
            {getSeatColumns(element, true)}
          </div>
        );
      }
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
    storeType: state.storeType,
    templateType: state.templateType,
    selectedSeats: stateData.selectedSeats
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeStoreSeat: actions.changeStoreSeat,
    changeSelectedSeat: actions.changeSelectedSeat
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSeat);