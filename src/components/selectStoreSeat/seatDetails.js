import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

class StoreSeatDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false };
    this.saveSeat = this.saveSeat.bind(this);
  }

  saveSeat() {
    const { selectedSeats } = this.props;
    if (selectedSeats.length === 0) {
      Modal.warning({
        content: '请选择座位',
        maskClosable: true
      });
      return;
    }
    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 1000);
  }

  render() {
    const { selectedSeats } = this.props, len = selectedSeats.length, seatPosition = selectedSeats.map((item, index) => {
      const position = item.position.split('-');
      return (
        <span className='Store-select-seat-list' key={index}>{position[0] + '排' + position[1] + '座'}</span>
      );
    });

    return (
      <section>
        <div className='Store-seat-position-container'>
          已选座位：
            <div>{len ? seatPosition : '暂无'}</div>
        </div>
        <div className='Store-ensure-select-container'>
          <div className='Store-price'>
            <div className='store-total-price'>￥{len ? len * 38 : 0}</div>
            <div>{len ? '￥38x' + len : ''}</div>
          </div>
          <Button className='Store-ensure-btn' loading={this.state.loading} onClick={this.saveSeat}>确认座位</Button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.storeSeatPage;
  return {
    selectedSeats: stateData.selectedSeats
  }
}

export default connect(mapStateToProps)(StoreSeatDetail);