import React from 'react';
import imgUrl from '../../images/shuxian_moban.png';

class TemplateTwo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let dom = document.getElementsByClassName('Template-two-lesson-item-image'), len = dom.length, width = dom[0].width + 'px';
    for (let i = 0; i < len; i++) {
      dom[i].style.height = width;
      dom[i].nextSibling.style.width = width;
    }
  }

  render() {
    const { data, tempIndex } = this.props, lessonList = data.map((item, index) => {
      return (
        <div className='Template-two-lesson-item' key={index}>
          <img className='Template-two-lesson-item-image' src={item.img} alt='' />
          <span className='Template-two-lesson-item-name'>{item.name}</span>
          <span className='Template-two-lesson-item-price'><span>￥</span>{item.editPrice || item.zeroPrice}</span>
        </div>
      );
    });

    return (
      <section className='Template-two-container' style={{ backgroundColor: tempIndex % 2 ? '#e5e5e5' : '#f5f5f5' }}>
        <div className='Template-two-header'>
          <img src={imgUrl} alt='' />
          热门课程</div>
        <div className='Template-two-body'>
          {lessonList}
        </div>
      </section>
    );
  }
}

export default TemplateTwo;