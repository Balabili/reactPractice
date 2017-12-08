import React from 'react';
import { connect } from 'react-redux';

class UserScheduleFooter extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { unusedScheduleList } = this.props, unUsedSchedule = unusedScheduleList.map((item, index) => {
      return (
        <span className='User-schedule-footer-item' key={index}>{item.name}</span>
      );
    });

    return (
      <footer>
        <div className='User-schedule-footer-title'>待消费</div>
        <div>{unUsedSchedule}</div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unusedScheduleList: state.userSchedulePage.unusedScheduleList
  }
}

export default connect(mapStateToProps)(UserScheduleFooter);