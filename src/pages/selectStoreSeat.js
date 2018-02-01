import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CompetitionTemp1 from '../components/selectStoreSeat/CompetitionTemp1';
import MovieTemplate from '../components/selectStoreSeat/MovieSeatTemp';
import Footer from '../components/selectStoreSeat/seatDetails';
import * as actions from '../actions/storeSeat';
import movieActived from '../images/seat_grey.png';
import movieSelected from '../images/seat_green.png';
import movieDeactived from '../images/seat_red.png';
import competitioActived from '../images/kx_ts.png';
import competitioSelected from '../images/yx.png';
import competitionDeactive from '../images/bkx_ts.png'
import ajax from '../utils/fetch';

class StoreSeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      tempType: '1'
    };
  }

  componentDidMount() {
    // tempType  123赛事模板  4电影模板
    const self = this, { saveQuantumId, saveCurrentUserId, changeStoreSeat, addMovieSeatPrice, addStoreSeatPriceMap, saveStoreSeatTemplateType } = self.props,
      params = self.props.match.params, tournamentId = params.tournamentId, quantumId = params.quantumId, userId = params.userId,
      type = params.type, data = { tournamentId: tournamentId, quantumId: quantumId };
    saveQuantumId(quantumId);
    saveCurrentUserId(userId);
    // type 1 电影  2 赛事
    // 测试数据{  'userId' : 'bad994c7802f4b38b6b4c370a184c6bc' 'tournamentId': 'b65160c233be40d7ba74b3330cd3da12', 'quantumId': '19f2b89b42554f57b00bc4ceebf6170a' }
    if (type === '1') {
      ajax('http://192.168.51.79:8088/app/movieChooseSeat', data).then(({ seatList, map, tempType }) => {
        const seats = self.formatSeats(seatList, true);
        self.setState({ name: map.name, date: map.date, tempType: tempType });
        changeStoreSeat(seats);
        addMovieSeatPrice(map.price);
        saveStoreSeatTemplateType(tempType);
      }).catch((e) => { console.log(e); });
    } else if (type === '2') {
      ajax('http://192.168.51.79:8088/app/tournamentZone', data).then(({ district, listSeat, map, tempType }) => {
        const seats = self.formatSeats(listSeat, false);
        self.setState({ name: map.name, date: map.date, tempType: tempType });
        changeStoreSeat(seats);
        addStoreSeatPriceMap(self.formatSeatPriceMap(district));
        saveStoreSeatTemplateType(tempType);
      }).catch((e) => { console.log(e); });
    }
  }

  formatSeatPriceMap(district) {
    const len = district.length;
    let map = {};
    for (let i = 0; i < len; i++) {
      // item格式  A区:1.00  拆分key=A  value=价格
      const item = district[i].district, itemArr = item.split(':'), key = itemArr[0][0], value = itemArr[1];
      map[key] = value;
    }
    return map;
  }

  formatSeats(listSeat, isMovie) {
    const len = listSeat.length;
    let seatList = {};
    // 格式化座位
    for (let i = 0; i < len; i++) {
      const item = listSeat[i], coordinate = item.coordinate, coordinateArr = coordinate.split('-'),
        row = +coordinateArr[0], column = +coordinateArr[1];
      let data = { type: item.status, column: column, seatId: item.seatId };
      if (!isMovie) {
        data.zone = item.zone;
      }
      if (seatList[row]) {
        seatList[row].push(data);
      } else {
        seatList[row] = [data]
      }
    }
    // 将列按顺序排序
    for (const key in seatList) {
      if (seatList.hasOwnProperty(key)) {
        let seatColumnList = seatList[key];
        seatColumnList = seatColumnList.sort((a, b) => {
          return a.column - b.column;
        });
      }
    }
    return seatList;
  }

  render() {
    const state = this.state, { priceMap, seatColorMap } = this.props;
    let seatList = null, seatPriceTemplate = [];
    for (const key in priceMap) {
      if (priceMap.hasOwnProperty(key)) {
        const price = priceMap[key];
        seatPriceTemplate.push(
          <span style={{ backgroundColor: seatColorMap[key] }} key={key}>{key + '区:' + price}</span>
        );
      }
    }
    switch (state.tempType) {
      case '1':
        seatList = (<CompetitionTemp1 />);
        break;
        case '2':
        seatList = (<CompetitionTemp1 />);
        break;
        case '3':
        seatList = (<CompetitionTemp1 />);
        break;
      case '4':
        seatList = (<MovieTemplate />);
        break;
      default:
        break;
    }

    return (
      <div className='Store-seat-container'>
        <header>
          <div>{state.name}</div>
          <div className='Store-seat-header-date'>{state.date}</div>
        </header>
        {
          // 电影院tempType=4  不显示分区价格
          state.tempType !== '4' &&
          <section className='Competition-zone-template'>
            {seatPriceTemplate}
          </section>
        }
        <section className='Select-seat-description'>
          <div className='Select-seat-description-item'><img src={state.tempType === '4' ? movieActived : competitioActived} alt='' />可选</div>
          <div className='Select-seat-description-item'><img src={state.tempType === '4' ? movieDeactived : competitionDeactive} alt='' />不可选</div>
          <div className='Select-seat-description-item'><img src={state.tempType === '4' ? movieSelected : competitioSelected} alt='' />已选</div>
        </section>
        {seatList}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.storeSeatPage;
  return {
    priceMap: stateData.priceMap,
    seatColorMap: stateData.seatColorMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveQuantumId: actions.saveQuantumId,
    changeStoreSeat: actions.changeStoreSeat,
    addMovieSeatPrice: actions.addMovieSeatPrice,
    saveCurrentUserId: actions.saveCurrentUserId,
    addStoreSeatPriceMap: actions.addStoreSeatPriceMap,
    saveStoreSeatTemplateType: actions.saveStoreSeatTemplateType
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSeat);