import React from 'react';
import imgUrl from '../../images/四月是你的谎言.jpg';

class TemplateFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className='Template-five-container'>
        <div className='Template-five-container-section'>
          <div className='Template-five-container-item'>
            <img src={imgUrl} alt='' />
            <div>从删库到跑路</div>
          </div>
          <div className='Template-five-container-item'>
            <img src={imgUrl} alt='' />
            <div>从删库到跑路</div>
          </div>
        </div>
        <div className='Template-five-container-section'>
          <div className='Template-five-container-item'>
            <img src={imgUrl} alt='' />
            <div>从删库到跑路</div>
          </div>
          <div className='Template-five-container-item'>
            <img src={imgUrl} alt='' />
            <div>从删库到跑路</div>
          </div>
        </div>
      </section>
    );
  }
}

export default TemplateFive;