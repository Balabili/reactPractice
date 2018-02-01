import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import ajax from '../../utils/fetch';
import { loadURL } from '../../utils/util';

class StoreSeatDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false };
    this.saveSeat = this.saveSeat.bind(this);
  }

  saveSeat() {
    const { selectedSeats, userId, quantumId, templateType, moviePrice, priceMap } = this.props;
    if (selectedSeats.length === 0) {
      Modal.warning({
        content: '请选择座位',
        maskClosable: true
      });
      return;
    }
    if (templateType) {
      const len = selectedSeats.length;
      let data = { userId: userId, quantumId: quantumId }, seatIdList = [], price = 0;
      for (let i = 0; i < len; i++) {
        seatIdList.push(selectedSeats[i].seatId);
        price += +priceMap[selectedSeats[i].zone];
      }
      // 区分电影和赛事选座  分两个接口
      if (templateType === '4') {
        data.allPrice = moviePrice * len + '';
        data.seatIds = seatIdList.join(',');
        ajax('http://192.168.51.79:8088/app/movieConfirmOrder', data).then(() => {
          loadURL('movieSeat://success');
        }).catch((e) => { console.log(e); });
      } else {
        debugger;
        data.ids = seatIdList.join(',');
        data.price = price + '';
        ajax('http://192.168.51.79:8088/app/tournamentOrder', data).then(() => {
          loadURL('competitionSeat://success');
        }).catch((e) => { console.log(e); });
      }
    }
  }

  getPriceList(priceList, currentSeat) {
    const len = priceList.length;
    let hasCurrentZone = false;
    for (let i = 0; i < len; i++) {
      let item = priceList[i];
      if (item.zone === currentSeat.zone) {
        priceList[i].count++;
        hasCurrentZone = true;
      }
    }
    if (!hasCurrentZone) {
      priceList.push({ zone: currentSeat.zone, count: 1 });
    }
  }

  render() {
    let seatPositionList = [], priceList = [], priceDomList = [], totalPrice = 0;
    const { priceMap, moviePrice, templateType, selectedSeats } = this.props, len = selectedSeats.length;
    for (let i = 0; i < len; i++) {
      const item = selectedSeats[i];
      seatPositionList.push(<span className='Store-select-seat-list' key={i}>{item.row + '排' + item.column + '座'}</span>);
      this.getPriceList(priceList, item);
    }
    if (templateType === '4') {
      priceDomList.push(<span className='Store-select-seat-list' key={0}>{`￥${+moviePrice}x${len}`}</span>);
      totalPrice = moviePrice * len;
    } else {
      for (let i = 0; i < priceList.length; i++) {
        const zoneItem = priceList[i], zonePrice = priceMap[zoneItem.zone], count = zoneItem.count;
        totalPrice = totalPrice + zonePrice * count;
        priceDomList.push(<span className='Store-select-seat-list' key={i}>{`￥${+zonePrice}x${count}`}</span>);
      }
    }

    return (
      <section>
        <div className='Store-seat-position-container'>
          已选座位：
            <div>{len ? seatPositionList : '暂无'}</div>
        </div>
        <div className='Store-ensure-select-container'>
          <div className='Store-price'>
            <div className='store-total-price'>{totalPrice ? ('￥' + totalPrice) : ''}</div>
            {
              !!totalPrice &&
              <div>{priceDomList}</div>
            }
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
    userId: stateData.userId,
    quantumId: stateData.quantumId,
    priceMap: stateData.priceMap,
    moviePrice: stateData.moviePrice,
    templateType: stateData.templateType,
    selectedSeats: stateData.selectedSeats
  }
}

export default connect(mapStateToProps)(StoreSeatDetail);