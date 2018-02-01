import React from 'react';
import Carousel from 'antd/lib/carousel';

class courseCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bannerList } = this.props, imgList = bannerList.map((item, index) => {
      return (<img key={index} alt='pic' src={item.img} />);
    });

    return (
      <div className='Course-carousel' id='one'>
        <Carousel autoplay='true'>
          {imgList}
        </Carousel>
      </div>
    );
  }
}

export default courseCarousel;