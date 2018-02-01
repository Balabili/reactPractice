import React from 'react';
import { connect } from 'react-redux';
import { loadURL } from '../../utils/util';

class UserScheduleFooter extends React.Component {
  constructor(props) {
    super(props);
    this.viewDetails = this.viewDetails.bind(this);
  }

  viewDetails({ target }) {
    // 只有type为2的才能在下边
    const id = target.dataset.id;
    if (id) {
      loadURL('mySchedule://-2-' + id);
    }
  }

  render() {
    const { unusedScheduleList } = this.props, unUsedSchedule = unusedScheduleList.map((item, index) => {
      return (
        <span className='User-schedule-footer-item' data-id={item.orderNum} key={index}>{item.name}</span>
      );
    });

    return (
      <footer>
        <div className='User-schedule-footer-title'>待消费</div>
        <div onClick={this.viewDetails}>{unUsedSchedule}</div>
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