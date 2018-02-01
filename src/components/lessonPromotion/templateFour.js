import React from 'react';
import ClampLines from '../common/clamp';

class TemplateFour extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, tempIndex } = this.props;
    
    return (
      <section className='Template-four-container' style={{ backgroundColor: tempIndex % 2 ? '#e5e5e5' : '#f5f5f5' }}>
        <img src={data.img} alt='' />
        <header>{data.name}</header>
        <div className='Template-four-lesson-teacher'>讲师：{data.teacher}</div>
        <div className='Template-four-lesson-description'>
          <ClampLines
            text={data.remark}
            lines="3"
            ellipsis="..."
            buttons={false} />
        </div>
        <div>
          <span className='Template-four-lesson-new-price'><span>￥</span>{data.editPrice}</span>
          <span className='Template-four-lesson-old-price'>￥{data.zeroPrice}</span>
        </div>
      </section>
    );
  }
}

export default TemplateFour;