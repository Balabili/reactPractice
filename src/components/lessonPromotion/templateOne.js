import React from "react";

class TemplateOne extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, tempIndex } = this.props;
    
    return (
      <section className='Template-one-container' style={{ backgroundColor: tempIndex % 2 ? '#e5e5e5' : '#f5f5f5' }}>
        <img className='Template-one-image' src={data.img} alt='' />
        <div className='Template-one-text-container'>
          <div className='Template-one-title'>{data.name}</div>
          <div className='Template-one-description'>{data.introduce}</div>
          <div>
            <span className='Template-one-bargin-price'>{data.editPrice}</span>
            <span className='Template-one-old-price'>￥{data.zeroPrice}</span>
          </div>
        </div>
      </section>
    );
  }
}

export default TemplateOne;