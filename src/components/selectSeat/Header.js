import React from 'react';
import { Col, Row } from 'antd/lib/grid';

class SelectSeatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.changeDuration = this.changeDuration.bind(this);
    this.state = {

    }
  }

  changeDuration(e) {
    let durationId = e.currentTarget.dataset.id;
    this.props.onChangeDuration(durationId);
  }

  render() {
    const durationList = this.props.durationList.map((item, index) =>
      <Row key={index} data-id={item.id} onClick={this.changeDuration}>
        <Col offset={1} span={20} className={`Duration-container ${item.selected ? 'Duration-actived' : ''}`} >
          {item.name}
        </Col>
      </Row>
    );
    return (
      <div className="Select-duration-header">
        <div className="Select-duration-title">选择时段</div>
        {durationList}
      </div>
    );
  }
}

export default SelectSeatHeader;