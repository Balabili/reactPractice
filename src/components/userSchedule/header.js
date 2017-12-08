import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { formatDate, defineMomentLocalLanguage } from '../../utils/util';
import { calculateMonday } from '../../api/classSchedule';
import * as actions from '../../actions/userSchedule';
const { MonthPicker } = DatePicker;

class MySchudeleHeader extends React.Component {
  constructor() {
    super();
    this.changeMonth = this.changeMonth.bind(this);
  }

  changeMonth(value) {
    const { changeCurrentMonth, changeCurrentMonday } = this.props;
    changeCurrentMonth(formatDate(value._d));
    changeCurrentMonday(calculateMonday(value._d));
  }

  render() {
    defineMomentLocalLanguage(moment);
    const { currentMonth } = this.props;

    return (
      <header className='User-schedule-header'>
        <MonthPicker value={moment(currentMonth, 'YYYY-MM')} format='LL' onChange={this.changeMonth} />
        <div className='User-schedule-header-button'>农历宜忌</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.userSchedulePage;
  return {
    currentMonth: stateData.currentMonth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentMonday: actions.changeCurrentMonday
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MySchudeleHeader);