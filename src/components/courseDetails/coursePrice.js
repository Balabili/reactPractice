import React from 'react';

class CoursePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, courseIntroduce = (data.courseIntroduce ? data.courseIntroduce : []).map((item, index) => {
      return (
        <div className='Education-feature' key={`featuresfeature${index}`}>{item}</div>
      );
    });

    return (
      <div className='Course-features'>
        <ul className='Education-price'>
          <li className='Education-price-li'>
            {
              data.isBargin &&
              <div className='Education-price-float Education-price-sale'>特惠</div>
            }
            <div className='Education-price-float Education-price-coursename'>{data.courseName}</div>
          </li>
          <li className='Education-price-li'>
            <div className='Education-price-float Education-price-presentprice'>￥ {data.firstBarginPrice || data.firstOldPrice}~{data.lastBarginPrice || data.lastOldPrice}</div>
            {
              data.isBargin &&
              <div className='Education-price-float Education-price-originalprice'>￥ {data.firstOldPrice}~{data.lastOldPrice}</div>
            }
          </li>
          <li className='Education-price-li'>
            <div className='Education-price-float Education-price-graduate'>{data.historyCount}人学过</div>
            <div className='Education-price-float Education-price-person'>已报名： {data.applyCount}/{data.sumCount}</div>
          </li>
        </ul>
        {courseIntroduce}
      </div>
    );
  }
}

export default CoursePrice;