import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import '../styles/common.css';

class Duration extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col offset={1} span={10}>
            <h2 className="Duration-header">nidaye</h2>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Duration;