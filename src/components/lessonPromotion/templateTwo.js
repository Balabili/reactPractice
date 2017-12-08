import React from 'react';
import siyue from '../../images/四月是你的谎言.jpg';

class TemplateTwo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      let dom = document.getElementsByClassName('Template-two-lesson-item-image'), len = dom.length, width = dom[0].width + 'px';
      for (let i = 0; i < len; i++) {
        dom[i].style.height = width;
        dom[i].nextSibling.style.width = width;
      }
    }, false);
  }

  render() {
    const arr = [1, 2, 3], lessonList = arr.map((item, index) => {
      return (
        <div className='Template-two-lesson-item' key={index}>
          <img className='Template-two-lesson-item-image' src={siyue} alt='xxx' />
          <span className='Template-two-lesson-item-name'>你大爷家牌高数课程</span>
          <span className='Template-two-lesson-item-price'><span>￥</span>2300</span>
        </div>
      );
    });

    return (
      <section className='Template-two-container'>
        <div className='Template-two-header'>热门课程</div>
        <div className='Template-two-body'>
          {lessonList}
        </div>
      </section>
    );
  }
}

export default TemplateTwo;