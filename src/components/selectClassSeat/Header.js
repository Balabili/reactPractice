import React from 'react';

class SelectSeatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.changeDuration = this.changeDuration.bind(this);
  }

  changeDuration(e) {
    let durationId = e.currentTarget.dataset.id;
    this.props.onChangeDuration(durationId);
  }

  render() {
    const durationList = this.props.durationList.map((item, index) =>
      <div key={index} data-id={item.id} onClick={this.changeDuration}
        className={`Duration-container ${item.selected ? 'Duration-actived' : ''}`} >
        {item.name}
      </div>
    );
    return (
      <div className="Select-duration-header">
        <div className="Select-duration-title">选择时段</div>
        <div className="Select-duration-content">
          {durationList}
        </div>
      </div>
    );
  }
}

export default SelectSeatHeader;