import React from 'react';
import headerIcon from '../../images/sanjia_moban.png';

class RecommendLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { positionTop: '0' };
  }

  componentDidMount() {
    const doc = document;
    // 计算图片宽高比例
    doc.addEventListener('DOMContentLoaded', () => {
      let recommendLessonDom = doc.getElementsByClassName('Recommend-lesson-item-image-container'), len = recommendLessonDom.length,
        recommendLessonNameDom = doc.getElementsByClassName('Recommend-lesson-item-name'),
        recommendLessonImg = doc.querySelector('.Recommend-lesson-item-image-container img'), imgWidth = recommendLessonImg.width,
        recommendLessonDomHeight = Math.floor(imgWidth * 3 / 4), recommendLessonNameWidth = imgWidth - 16;
      for (let i = 0; i < len; i++) {
        recommendLessonDom[i].style.height = recommendLessonDomHeight + 'px';
        recommendLessonNameDom[i].style.width = recommendLessonNameWidth + 'px';
      }
    }, false);
  }

  render() {
    const self = this, { lesson } = self.props, arr = [lesson[0] || [], lesson[0] || [], lesson[0] || [], lesson[0] || []],
      lessonList = arr.map((item, index) => {
        return (
          <div className='Recommend-lesson-item' key={index}>
            <div className='Recommend-lesson-item-image-container'>
              <img src={item.img} alt='' />
              <div className='Recommend-lesson-item-coverage'></div>
              <div className='Recommend-lesson-item-people'>
                {item.apply_count}/{item.sum_count}
              </div>
            </div>
            <div className='Recommend-lesson-item-name'>{item.NAME}</div>
            <div className='Recommend-lesson-item-price'>￥{item.price}</div>
          </div>
        );
      });

    return (
      <section className='Recommend-lesson-section'>
        <header>
          <img className='School-detail-header-icon' src={headerIcon} alt='' />
          <span>推荐课程</span>
        </header>
        <div className='Recommend-lesson-list-container'>
          {lessonList}
        </div>
      </section>
    );
  }
}

export default RecommendLesson;