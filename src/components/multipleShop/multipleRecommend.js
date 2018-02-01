import React from 'react';
import person from '../../images/home_renshu.png';

class multiplerecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { courseList } = this.props, courserecommend = courseList.map((item, index) => {
      return (
        <div className='courserecommend-box' key={index}>
          <div className='Course-recommend-course-root'>
            <img className='courserecommend-img' alt='pic' src={item.img} />
            <div className='Course-recommend-course-cover'></div>
            <div className='courserecommend-person'>
              <img src={person} alt="" />
              <span>{item.applyCount}/{item.sumCount}</span>
            </div>
          </div>
          <div className='courserecommend-name'>{item.NAME}</div>
          <div className='courserecommend-price'>￥{item.price}</div>
        </div>
      );
    });

    return (
      <div className='Course-recommend'>
        {courserecommend}
        <div className='end'>没有更多啦 ~ ~</div>
      </div>
    );
  }
}

export default multiplerecommend;