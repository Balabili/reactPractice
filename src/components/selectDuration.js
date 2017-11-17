import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Duration from './Duration';
import '../styles/common.css';

class SelectDuration extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <Col offset={1} span={10}>
            <h2 className="Duration-header">选择时段</h2>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            <span></span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectDuration;
