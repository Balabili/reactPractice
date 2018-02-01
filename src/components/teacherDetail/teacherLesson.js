import React from 'react';
import invalid from '../../images/ysx.png';

class TeacherLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, lessonList = data.map((item, index) => {
      let style = {};
      //type   0失效   1有效
      if (item.type === '0') {
        style.backgroundImage = `url(${invalid})`;
        style.backgroundSize = '100% 100%';
      }
      // style={style}
      return (
        <section className='Teacher-lesson-item' key={index}>
          <div className='Teacher-lesson-item-container'>
            <img src={item.img} alt="" />
            <div className='Teacher-lesson-item-container-details'>
              <div className='Teacher-lesson-item-name'>{item.courseName}</div>
              <div className='Teacher-lesson-item-container-details-line'>
                <span>{item.classAddress}</span>
                <span>{item.classHour}课时</span>
                <span>{item.historyCount}人学过</span>
              </div>
              <div className='Teacher-lesson-item-container-details-line'>
                <span className='Teacher-lesson-item-font-red'>￥{item.editPrice}</span>
                <span>已报名：<span className='Teacher-lesson-item-font-red'>{item.applyCount}/{item.sumCount}</span></span>
              </div>
              <div>{item.schoolName}</div>
            </div>
          </div>
          <footer>开课时间：{item.startTime}至{item.stopTime}</footer>
          <div className='Teacher-lesson-item-invalid-container'>
            <img src={invalid} alt='' />
          </div>
        </section>
      );
    });

    return (
      <section className='Teacher-detail-lesson-container'>
        <header>教授课程</header>
        <div>
          {lessonList}
        </div>
      </section>
    );
  }
}

export default TeacherLesson;