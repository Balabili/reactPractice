import React from 'react';

class RecommendLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { positionTop: '0' };
  }

  componentDidMount() {
    const self = this;
    document.addEventListener('DOMContentLoaded', () => {
      let dom = document.getElementsByClassName('Recommend-lesson-item-image-container'), len = dom.length,
        img = document.querySelector('.Recommend-lesson-item-image-container img'), imgWidth = img.width,
        domHeight = Math.floor(imgWidth * 3 / 4);
      debugger;
      for (let i = 0; i < len; i++) {
        dom[i].style.height = domHeight + 'px';
      }
    }, false);
  }

  render() {
    const self = this, { lesson } = self.props, arr = [lesson[0] || [], lesson[0] || [], lesson[0] || [], lesson[0] || []],
      lessonList = arr.map((item, index) => {
        return (
          <div className='Recommend-lesson-item' key={index}>
            <div className='Recommend-lesson-item-image-container'>
              <img src={item.img} style={{ top: self.state.positionTop }} alt='' />
            </div>
            {item.NAME}
          </div>
        );
      });

    return (
      <section className='Recommend-lesson-section'>
        <header>推荐课程</header>
        <div className='Recommend-lesson-list-container'>
          {lessonList}
        </div>
      </section>
    );
  }
}

export default RecommendLesson;