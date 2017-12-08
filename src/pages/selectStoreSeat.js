import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Seat from '../components/selectStoreSeat/Seat';
import Footer from '../components/selectStoreSeat/seatDetails';
import * as actions from '../actions/storeSeat';
import imgActived from '../images/seat_grey.png';
import imgSelected from '../images/seat_green.png';
import imgDeactived from '../images/seat_red.png';

class StoreSeat extends React.Component {
  constructor() {
    super();
    this.state = { row: 0, column: 0 };
  }

  componentDidMount() {
    const { changeStoreSeat } = this.props, seats = this.getSeats();
    this.setState({ row: 8, column: 10 });
    changeStoreSeat(seats);
  }

  getSeats() {
    let seatList = [];
    for (let i = 0; i < 80; i++) {
      let type = parseInt(Math.random() * 10000, 10) % 3 + 1;
      seatList.push({ id: i.toString(), position: `${Math.floor(i / 10) + 1}-${i % 10 + 1}`, type: type === 2 ? '1' : type.toString() });
    }
    return seatList;
  }

  render() {
    return (
      <div className='Store-seat-container'>
        <header>
          <div>四月是你的谎言</div>
          <div className='Store-seat-header-date'>9月20日</div>
        </header>
        <section className='Select-seat-description'>
          <div className='Select-seat-description-item'><img src={imgActived} alt=''></img>可选</div>
          <div className='Select-seat-description-item'><img src={imgDeactived} alt=''></img>不可选</div>
          <div className='Select-seat-description-item'><img src={imgSelected} alt=''></img>已选</div>
        </section>
        <Seat row={this.state.row} column={this.state.column}></Seat>
        <Footer></Footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeStoreSeat: actions.changeStoreSeat
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoreSeat);