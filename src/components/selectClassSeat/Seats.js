import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import imgActived from '../../images/seat_grey.png';
import imgSelected from '../../images/seat_green.png';
import imgDeactived from '../../images/seat_red.png';
import * as actions from '../../actions/classSeat';

class Seats extends React.Component {
  //_id:真正id,   id:坐标,   status:1未选中,2自己选的,3别人选的
  constructor(props) {
    super(props);
    this.state = {
      seatList: [],
      row: [],
      column: []
    };
    this.changeSeat = this.changeSeat.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.seat !== this.props.seat) {
      this.initSeats(nextprops);
    }
  }

  initSeats(nextprops) {
    let arr = [], seats = nextprops.seat;
    //生成100个座位元素
    for (let i = 0; i < 100; i++) {
      arr.push({ id: i });
    }
    //为座位元素添加状态
    for (let index = 0; index < seats.length; index++) {
      arr[seats[index].id]._id = seats[index]._id;
      arr[seats[index].id].status = seats[index].status;
    }
    // 获取所有有效的座位  Row x column矩形
    seats = this.getValidSeats(arr, nextprops);
    this.setState({ seatList: seats });
  }

  getValidSeats(arr) {
    let seats = [], validRows = this.getInvalidRows(arr, true), validColumn = this.getInvalidRows(arr, false),
      rowLen = validRows.length, colLen = validColumn.length;
    this.setState({ row: validRows, column: validColumn });
    //留下有效的rowLen x colLen矩形座位
    for (let i = 0; i < rowLen; i++) {
      let start = +(validRows[i] + '' + validColumn[0]), end = +(validRows[i] + '' + validColumn[colLen - 1]);
      seats = [...seats, ...(arr.slice(start, end + 1))];
    }
    return seats;
  }

  getInvalidRows(arr, isRow) {
    let validRows = [], len = 0, tableLen = 0;
    //计算选定座位的行或列，未选择的去除掉
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let index = isRow ? +(i + '' + j) : +(j + '' + i);
        if (arr[index].status) {
          validRows.push(i);
          break;
        }
      }
    }
    //如果选中的座位行活着了列中间有空行，加上中间的空行，重新生成新的数组
    len = validRows.length;
    tableLen = validRows[len - 1] - validRows[0] + 1;
    if (len !== tableLen) {
      let sequentialArr = [];
      for (let i = validRows[0]; i < validRows[0] + tableLen; i++) {
        sequentialArr.push(i);
      }
      validRows = sequentialArr;
    }
    return validRows;
  }

  getColSeats(seats, index, columnLength) {
    let dom = [];
    // 生成列
    for (let i = 0; i < columnLength; i++) {
      let seatIndex = index * columnLength + i,
        childDom = (
          <span data-id={seats[seatIndex]._id} data-position={seats[seatIndex].id} key={i} style={{ backgroundImage: this.getBGImage(seats[seatIndex].status) }}
            className={`Seat-item ${seats[seatIndex].status ? '' : 'hidden'}`}></span>
        );
      dom.push(childDom);
    }
    return dom;
  }

  getBGImage(status) {
    switch (status) {
      case 1: return `url(${imgActived})`;
      case 2: return `url(${imgSelected})`;
      case 3: return `url(${imgDeactived})`;
      default: return '';
    }
  }

  changeSeat(e) {
    const { changeSelectedSeat } = this.props;
    let dataset = e.target.dataset, id = +dataset.position, _id = dataset.id;
    if (id) {
      let seats = this.state.seatList, len = seats.length;
      for (let i = 0; i < len; i++) {
        if (seats[i].id === id) {
          //获取到点击的座位对象
          if (seats[i].status === 1) {
            //如果是未选中的，已选座位解除选择，当前点击的设为已选
            this.emptyAllSelectSeat(seats);
            this.getSeatNumber(id, seats);
            changeSelectedSeat(_id);
            seats[i].status = 2;
            this.setState({ seatList: seats });
            break;
          } else {
            return;
          }
        }
      }
    } else {
      return;
    }
  }

  emptyAllSelectSeat(seats) {
    let len = seats.length;
    for (let i = 0; i < len; i++) {
      if (seats[i].status === 2) {
        seats[i].status = 1;
      }
    }
  }

  getSeatNumber(id, seats) {
    if (!id) {
      return;
    }
    const { changeSeatPosition } = this.props, state = this.state;
    let rows = state.row, column = state.column, columnLen = column.length, seatPosition = {}, rowSeats = null, columnNumber = 0;
    //获取座位第几排
    seatPosition.row = rows.indexOf(Math.floor(id / 10)) + 1;
    //计算第几个座位
    rowSeats = seats.slice((seatPosition.row - 1) * columnLen, seatPosition.row * columnLen);
    for (let i = 0; i < rowSeats.length; i++) {
      if (rowSeats[i].status) {
        columnNumber++;
      }
      if (rowSeats[i].id === id) {
        break;
      }
    }
    seatPosition.column = columnNumber;
    changeSeatPosition(seatPosition);
  }


  culculatePosition() {
    const seat = this.state.seatList, len = seat.length;
    let position = '';
    for (let i = 0; i < len; i++) {
      if (seat[i].status === 2) {
        position = seat[i].id;
        break;
      }
    }
    this.getSeatNumber(position, seat);
  }

  render() {
    const { seatPosition } = this.props, state = this.state;
    let seats = state.seatList, rowLength = state.row.length, columnLength = state.column.length, seatList = [];

    // 当前user重新选择座位时  获取之前选择的座位坐标
    if (seatPosition === null) {
      this.culculatePosition();
    }

    // 生成行
    for (let i = 0; i < rowLength; i++) {
      let col = (
        <div style={Object.assign({}, state.rowWidth, state.rowHeight)} className="Row-height" key={i}>
          {this.getColSeats(seats, i, columnLength)}
        </div>
      );
      seatList.push(col);
    }

    return (
      <div className="Seat-container" onClick={this.changeSeat}>{seatList}</div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.seatPage;
  return {
    seatId: stateData.seatId,
    seats: stateData.seats,
    seatPosition: stateData.seatPosition
  }
};

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSelectedSeat: actions.changeSelectedSeat,
    changeSeatPosition: actions.changeSeatPosition
  }, dispatch);
}

export default connect(mapStateToProps, MapDispatchToProps)(Seats);