import React from "react";
import siyue from '../../images/四月是你的谎言.jpg';

class TemplateOne extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className='Template-one-container'>
        <img className='Template-one-image' src={siyue} alt='xxx' />
        <div className='Template-one-text-container'>
          <div className='Template-one-title'>课程名称</div>
          <div className='Template-one-description'>你大爷</div>
          <div>
            <span className='Template-one-bargin-price'>4500</span>
            <span className='Template-one-old-price'>￥4500.00</span>
          </div>
        </div>
      </section>
    );
  }
}

export default TemplateOne;