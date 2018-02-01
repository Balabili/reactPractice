import React from 'react';

class TemplateFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, tempIndex } = this.props;

    return (
      <section className='Template-five-container' style={{ backgroundColor: tempIndex % 2 ? '#e5e5e5' : '#f5f5f5' }}>
        <div className='Template-five-container-section'>
          {
            data[0] &&
            <div className='Template-five-container-item'>
              <img src={data[0].img} alt='' />
              <div>{data[0].name}</div>
              <span className='Template-five-item-price'>￥<span>{data[0].editPrice || data[0].zeroPrice}</span></span>
            </div>
          }
          {
            data[1] &&
            <div className='Template-five-container-item'>
              <img src={data[1].img} alt='' />
              <div>{data[1].name}</div>
              <span className='Template-five-item-price'>￥<span>{data[1].editPrice || data[1].zeroPrice}</span></span>
            </div>
          }
        </div>
        <div className='Template-five-container-section'>
          {
            data[2] &&
            <div className='Template-five-container-item'>
              <img src={data[2].img} alt='' />
              <div>{data[2].name}</div>
              <span className='Template-five-item-price'>￥<span>{data[2].editPrice || data[2].zeroPrice}</span></span>
            </div>
          }
          {
            data[3] &&
            <div className='Template-five-container-item'>
              <img src={data[3].img} alt='' />
              <div>{data[3].name}</div>
              <span className='Template-five-item-price'>￥<span>{data[3].editPrice || data[3].zeroPrice}</span></span>
            </div>
          }
        </div>
      </section>
    );
  }
}

export default TemplateFive;