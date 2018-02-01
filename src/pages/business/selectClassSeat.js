import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/businessSeat';
import BusinessSeat from '../../components/businessClassSeat/classSeat';
import ajax from '../../utils/fetch';
import html2canvas from 'html2canvas';

class BusinessSelectClassSeat extends React.Component {
  constructor(props) {
    super(props);
    //classname 教室名字   teacherPosition教室位置
    this.state = { className: '', teacherPosition: '' };
    this.handleChange = this.handleChange.bind(this);
    this.saveSeatInfomation = this.saveSeatInfomation.bind(this);
  }

  componentDidMount() {
    const { changeSeatList, match } = this.props, params = match.params, className = params.className;
    this.setState({ className: className });
    // 为回显座位而使用
    // changeSeatList(['22', '33', '44']);
  }

  handleChange({ target }) {
    this.setState({ teacherPosition: target.value });
  }

  saveSeatInfomation() {
    const { seatList } = this.props, state = this.state, className = state.className, teacherPosition = state.teacherPosition;
    let data = { classRoom: className, teacherLocation: teacherPosition, seats: seatList };
    //html2canvas将Dom元素转变为图片
    html2canvas(document.querySelector('.Business-seat-table-container')).then(function (canvas) {
      //保存图片base64
      data.img = canvas.toDataURL("image/png");
      //保存座位到后台
      return ajax('/addCourseSeat', data);
    }).then(() => { }).catch((e) => { console.log(e); });
  }

  render() {
    return (
      <div className='Business-seat-root'>
        <section className='Business-seat-information'>
          <header>座位信息</header>
          <div className='Business-seat-information-textbox'>
            <span>教室名称：</span>
            <div>{this.state.className}</div>
          </div>
          <div className='Business-seat-information-textbox'>
            <span>教师位置：</span>
            <input type="text" name='teacherPosition' value={this.state.teacherPosition} placeholder='请输入教室授课位置' onChange={this.handleChange} />
          </div>
        </section>
        <BusinessSeat></BusinessSeat>
        <span className='Business-seat-save-btn' onClick={this.saveSeatInfomation}>保存</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.businessSeatPage;
  return {
    seatList: stateData.seatList
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     changeSeatList: actions.changeSeatList
//   }, dispatch);
// }

export default connect(mapStateToProps)(BusinessSelectClassSeat);