import React from 'react';
import Carousel from 'antd/lib/carousel';
import headerIcon from '../../images/sanjia_moban.png';
import detailIcon from '../../images/icongo.jpg';
import introIcon from "../../images/xuexiao.png";
import positionIcon from "../../images/weizhi.png";

class SchoolHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      let schoolDom = document.getElementsByClassName('School-description-image-container')[0], imgWidth = document.body.clientWidth * 0.95,
        schoolDomHeight = Math.floor(imgWidth / 2);
      schoolDom.style.height = schoolDomHeight + 'px';
    }, false);
  }

  render() {
    const { data, subSchool } = this.props,
      imgDomList = (data.photos ? data.photos : []).map((item, index) => {
        return (<img key={index} alt='pic' src={item} />);
      }), subSchoolDomList = subSchool.map((item, index) => {
        return (
          <div className='School-subschool-detail' key={index}>
            <span>{item.schoolName}</span>
            <img src={detailIcon} alt="" />
          </div>
        );
      });

    return (
      <section className='School-detail-header-section'>
        <header className='School-detail-header'>
          <img src={data.img} alt='' />
          <div className='School-title'>
            <div className='School-name'>{data.name} <span>{data.scores}分</span></div>
            <div className='School-fans'>{data.fans || 0}粉丝</div>
          </div>
          <span className='School-add-attention'>+关注</span>
        </header>
        <div className='School-introduce'>
          <div className='School-introduce-detail'>
            <img src={introIcon} alt="" />
            <span>{data.introduce}</span>
          </div>
          <div className='School-address'>
            <img src={positionIcon} alt="" />
            <span>{data.address}</span>
          </div>
        </div>
        <div className='School-subschool'>
          {subSchoolDomList}
        </div>
        <div className='School-description'>
          <div>
            <div className='School-description-header'>
              <img className='School-detail-header-icon' src={headerIcon} alt='' />
              <span>学校简介</span>
            </div>
            <div className='School-description-image-container'>
              <Carousel autoplay='true'>{imgDomList}</Carousel>
            </div>
            <div className='School-description-detail'>
              {data.merchantBriefing}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SchoolHeader;