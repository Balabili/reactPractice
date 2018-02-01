import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/businessSeat';
import imgActived from '../../images/seat_grey.png';
import imgSelected from '../../images/seat_green.png';

class BusinessSeat extends React.Component {
  constructor(props) {
    super(props);
    this.selectSeat = this.selectSeat.bind(this);
  }

  selectSeat({ target }) {
    const dataset = target.dataset;
    //点击的元素不是座位直接return
    if (!dataset.id) {
      return;
    }
    const { seatList, changeSeatList } = this.props, id = dataset.id, index = seatList.indexOf(id);
    //每次点击将点击的座位左边保存在一个redux state的一个list中，用于发送给后台
    if (index !== -1) {
      //如果点击的是当前选中的座位，则移除选中座位list
      seatList.splice(index, 1);
    } else {
      // 如果点击的是未选中的   则加入到list中
      seatList.push(id);
    }
    //重新生成新的list，改变引用，用于触发redux的更新
    changeSeatList([...seatList]);
  }

  getSeatHeader() {
    //生成第一行的所有列
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(
        <span className='Business-seat-header-column' key={i}>{i + 1 + '座'}</span>
      );
    }
    return arr;
  }

  getSeatBody() {
    //生成其余所有行
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(
        <div className='Business-seat-row-container' key={i}>
          <div className='Business-seat-row-sider'>{i + 1 + '排'}</div>
          <div className='Business-seat-row'>{this.getRowSeat(i)}</div>
        </div>
      );
    }
    return arr;
  }

  getRowSeat(rowIndex) {
    //根据是否是redux state list中的座位更新span的背景图片，使用base64节省流量提高效率
    let arr = [];
    for (let i = 0; i < 10; i++) {
      const id = rowIndex + '' + i;
      arr.push(
        <span className='Business-seat-row-column' style={{ backgroundImage: this.getBGImage(id) }} data-id={id} key={i}></span>
      );
    }
    return arr;
  }

  getBGImage(id) {
    const { seatList } = this.props;
    return seatList.indexOf(id) !== -1 ? `url(${imgSelected})` : `url(${imgActived})`;
  }

  render() {
    const { seatList } = this.props, seatHeader = this.getSeatHeader(), tableHeader = (
      <div className='Business-seat-header-container'>
        <div className='Business-seat-header-sider'></div>
        <div className='Business-seat-header'>{seatHeader}</div>
      </div>
    ), tableBody = this.getSeatBody();

    return (
      <section className='Business-seat-container' onClick={this.selectSeat}>
        <header>座位示意图</header>
        <div className='Business-seat-select-count'>已选：{seatList.length}</div>
        <div className='Business-seat-table-container'>
          {tableHeader}
          {tableBody}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.businessSeatPage;
  return {
    seatList: stateData.seatList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSeatList: actions.changeSeatList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSeat);