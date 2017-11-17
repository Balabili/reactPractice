import React from 'react';
import { Row, Col } from 'antd/lib/grid';

class Seats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seatList: [],
      row: [],
      column: [],
      //默认显示七列，每列宽度平均分配
      rowWidth: { width: '100%' },
      columnWidth: { width: '14.28%' }
    };
    this.changeSeat = this.changeSeat.bind(this);
  }

  componentWillMount() { 
    this.initSeats();
  }

  componentWillReceiveProps(nextprops) {
    this.initSeats(nextprops);
  }

  shouldComponentUpdate(nextprops) {
    return nextprops.isView;
  }

  initSeats() {
    let arr = [], seats = this.props.seat;
    //生成100个座位元素
    for (let i = 0; i < 100; i++) {
      arr.push({ id: i });
    }
    //为座位元素添加状态
    for (let index = 0; index < seats.length; index++) {
      arr[seats[index].id].status = seats[index].status;
    }
    seats = this.getValidSeats(arr);
    this.setState({ seatList: seats });
  }

  getValidSeats(arr) {
    let seats = [], validRows = this.getInvalidRows(arr, true), validColumn = this.getInvalidRows(arr, false),
      rowLen = validRows.length, colLen = validColumn.length;
    if (colLen > 7) {
      if (this.props.isView) {
        this.setState({
          rowWidth: { width: '100%' },
          columnWidth: { width: (100 / colLen).toFixed(2) + '%' },
        });
      } else {
        this.setState({
          rowWidth: { width: (14.28 * colLen).toFixed(2) + '%' },
          columnWidth: { width: (100 / colLen).toFixed(2) + '%' },
        });
      }
    }
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
    for (let i = 0; i < columnLength; i++) {
      let seatIndex = index * columnLength + i,
        childDom = (
          <span data-id={seats[seatIndex].id} key={i} style={this.state.columnWidth} className={`demo ${this.getSeatItemClassName(seats[seatIndex].status)}`}>{seats[seatIndex].id}</span>
        );
      dom.push(childDom);
    }
    return dom;
  }

  getSeatItemClassName(status) {
    switch (status) {
      case 1: return 'grey';
      case 2: return 'green';
      case 3: return 'red';
      default: return 'hidden';
    }
  }

  changeSeat(e) {
    if (this.props.isView) {
      return;
    }
    let id = +e.target.dataset.id;
    if (id) {
      let seats = this.state.seatList, len = seats.length;
      for (let i = 0; i < len; i++) {
        if (seats[i].id === id) {
          //获取到点击的座位对象
          if (seats[i].status === 1) {
            //如果是未选中的，已选座位解除选择，当前点击的设为已选
            this.emptyAllSelectSeat(seats);
            this.getSeatNumber(id, seats);
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
    let rows = this.state.row, column = this.state.column, columnLen = column.length, seatPosition = {}, rowSeats = null, columnNumber = 0;
    //获取座位第几排
    seatPosition.row = rows.indexOf(Math.floor(id / 10)) + 1;
    //计算第几个座位
    rowSeats = seats.slice((Math.floor(id / 10) - 1) * columnLen, (Math.floor(id / 10) - 1) * columnLen + columnLen);
    for (let i = 0; i < rowSeats.length; i++) {
      if (rowSeats[i].status) {
        columnNumber++;
      }
      if (rowSeats[i].id === id) {
        break;
      }
    }
    seatPosition.column = columnNumber;
   this.props.calculatePosision(seatPosition);
  }

  render() {
    let seats = this.state.seatList, rowLength = this.state.row.length, columnLength = this.state.column.length, seatList = [];
    for (let i = 0; i < rowLength; i++) {
      let col = (<div style={this.state.rowWidth} className="test" key={i}>{this.getColSeats(seats, i, columnLength)}</div>);
      seatList.push(col);
    }
    return (
      <div className="demo-container" onClick={this.changeSeat}>{seatList}</div>
    );
  }
}

export default Seats;