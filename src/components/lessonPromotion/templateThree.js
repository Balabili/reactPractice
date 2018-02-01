import React from 'react';
import ClampLines from '../common/clamp';

class TemplateThree extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, tempIndex, remark } = this.props;

    return (
      <section className='Template-three-container' style={{ backgroundColor: tempIndex % 2 ? '#e5e5e5' : '#f5f5f5' }}>
        <div className='Template-three-image-container'>
          <img className='Template-three-image-main' src={data[0].img} alt=''></img>
          <div className='Template-three-image-side'>
            <img src={data[1].img} alt=''></img>
            <img src={data[2].img} alt=''></img>
          </div>
        </div>
        <div className='Template-three-description'>
          <ClampLines
            text={remark}
            lines="3"
            ellipsis="..."
            buttons={false} />
        </div>
      </section>
    );
  }
}

export default TemplateThree;