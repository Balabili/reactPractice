import React from 'react';
import personImg from '../../images/home_renshu.png';

class Courserecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, courserecommend = data.map((item, index) => {
      return (
        <div className='courserecommend-box' key={`courserecommend${index}`}>
          <div className='Course-recommend-img-container'>
            <img className='courserecommend-img' alt='pic' src={item.img} />
            <div className='Course-recommend-mengceng'></div>
            <div className='Course-recommend-person'>
              <img src={personImg} alt="" />
              <div>{item.applyCount}/{item.sumCount}</div>
            </div>
          </div>
          <div className='courserecommend-name'>{item.NAME}</div>
          <div className='courserecommend-price'>￥{item.price}</div>
        </div>
      );
    });

    return (
      <section>
        <div className='Course-recommend'>
          {courserecommend}
        </div>
        <div className='Course-recommend-nomore'>没有更多啦~~</div>
      </section>
    );
  }
}

export default Courserecommend;