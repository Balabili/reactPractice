import React from 'react';
import '../styles/common.css';
import SelectSeatHeader from '../components/selectSeat/Header';
import SelectSeat from '../components/selectSeat/SelectSeat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeDuration = this.changeDuration.bind(this);
    this.state = {
      durationList: [],
      seats: []
    };
  }

  componentWillMount() {
    this.setState({
      durationList: [
        { id: '1', name: '周一、周二、周三、周四、周五、周六、周日上午9:30 ~ 11.30', selected: true },
        { id: '2', name: '周一、周二、周三、周四、周五、周六、周日上午9:30 ~ 11.30', selected: false },
        { id: '3', name: '周一、周二、周三、周四、周五、周六、周日上午9:30 ~ 11.30', selected: false }
      ],
      //status 1 未选中 2 已选中 3 不能选
      seats: [{ id: 12, status: 1 }, { id: 13, status: 1 }, { id: 14, status: 1 }, { id: 15, status: 1 }, { id: 16, status: 1 },
      { id: 21, status: 1 }, { id: 27, status: 1 }, { id: 31, status: 1 }, { id: 37, status: 1 }, { id: 41, status: 1 }, { id: 47, status: 1 },
      { id: 51, status: 1 }, { id: 57, status: 3 }, { id: 62, status: 1 }, { id: 63, status: 1 }, { id: 64, status: 3 }, { id: 65, status: 3 },
      { id: 66, status: 1 }, { id: 67, status: 1 }, { id: 68, status: 1 }, { id: 69, status: 1 }, { id: 72, status: 1 }, { id: 73, status: 1 },
      { id: 84, status: 3 }, { id: 85, status: 1 }, { id: 86, status: 1 }]
    });
  }

  changeDuration(durationId) {
    let durations = this.state.durationList, len = durations.length;
    for (let i = 0; i < len; i++) {
      durations[i].selected = durationId === durations[i].id;
    }
    this.setState({
      durationList: durations,
      // seats: [{ id: 12, status: 1 }, { id: 13, status: 1 }, { id: 14, status: 1 }, { id: 15, status: 1 }, { id: 16, status: 1 },
      // { id: 21, status: 1 }, { id: 27, status: 1 }, { id: 31, status: 1 }, { id: 37, status: 1 }, { id: 41, status: 1 }, { id: 47, status: 1 },
      // { id: 51, status: 1 }, { id: 57, status: 3 }, { id: 62, status: 1 }, { id: 63, status: 1 }, { id: 64, status: 3 }, { id: 65, status: 3 },
      // { id: 66, status: 1 }, { id: 67, status: 1 }, { id: 68, status: 1 }]
    });
  }

  render() {
    return (
      <div>
        <SelectSeatHeader durationList={this.state.durationList} onChangeDuration={this.changeDuration} />
        <SelectSeat seats={this.state.seats} />
      </div>
    );
  }
}

export default App;
