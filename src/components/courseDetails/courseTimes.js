import React from 'react';

class courseTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (
      <div className='Course-times'>
        <div className='Education-times'>
          <ul className='Education-times-left'>
            <li className='Education-times-l-li Education-times-l-name'>
              {data.teacherName}
            </li>
            <li className='Education-times-l-li Education-times-l-date'>
              {data.startTime}至{data.stopTime}
            </li>
            <li className='Education-times-l-li Education-times-l-place'>
              {data.classAddress}
            </li>
          </ul>
          <ul className='Education-times-right'>
            <li className='Education-times-r-li Education-times-r-introduce'>
              <span>教师简介 ></span>
            </li>
            <li className='Education-times-r-li Education-times-r-total'>
              <span>共{data.classHour}课时</span>
            </li>
          </ul>
        </div>
        <div className='timeandseat'>
          <span>选择时段</span>
        </div>
        <div className='discounts'>
          <div className='discounts-left'>优惠券</div>
          <div className='discounts-right'>暂无优惠券</div>
        </div>
        <div className='integral'>
          <div className='integral-left'>购买获得积分</div>
          <div className='integral-right'>查看详情</div>
        </div>
        <div className='timeandseat'>
          <span>留言</span>
        </div>
      </div>
    );
  }
}

export default courseTimes;