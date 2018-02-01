import React from 'react';

class multiplelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tabList } = this.props, list = tabList.map((item, index) => {
      return (
        <div className='Multiple-box' key={index}>
          <img className='Multiple-img' alt='pic' src={item.img} />
          <div className='Multiple-name'>{item.NAME}</div>
        </div>
      );
    });
    return (
      <div className='Multiple-list' >
        {list}
        <div className='Multiple-tv'>
          <div className='Multiple-tv-btn'>观看比赛</div>
        </div>
      </div>
    );
  }
}

export default multiplelist;