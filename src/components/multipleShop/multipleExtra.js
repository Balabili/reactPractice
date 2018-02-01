import React from 'react';
import star from '../../images/star.png';
import starEmpty from '../../images/icon_star_kong.png';

class multipleextra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Multipleextra(list) {
    const len = list.length;
    let dom = [];
    for (let i = 0; i < len; i++) {
      let child = (
        <div className='Multiple-extra-clear' key={i}>
          <div className='Multiple-extra-left'>{list[i].commodityName}</div>
          <div className='Multiple-extra-right'>￥ {list[i].editPrice}</div>
        </div>
      );
      dom.push(child);
    }
    return dom;
  }

  initStar(starsCount) {
    let starList = [];
    for (let i = 0; i < 5; i++) {
      const starDom = (<img src={i < starsCount ? star : starEmpty} alt="" key={i} />);
      starList.push(starDom);
    }
    return starList;
  }

  render() {
    const { lessonList } = this.props, list = lessonList.map((item, index) => {
      return (
        <div className='Multiple-extra-box' key={index}>
          <img className='Multiple-extra-img' alt='pic' src={item.img} />
          <div className='Multiple-extra-name'>
            <div className='Multiple-extra-shop'>{item.name}</div>
            <div className='Multiple-extra-star-container'>{this.initStar(+item.scores)}</div>
            {this.Multipleextra(item.enterDetailList)}
          </div>
        </div>
      );
    });
    return (
      <div className='Multiple-extra'>
        {list}
      </div>
    );
  }
}

export default multipleextra;