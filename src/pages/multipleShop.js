import React from 'react';
import Coursecarousel from '../components/courseDetails/courseCarousel';
import Multiplerecommend from '../components/multipleShop/multipleRecommend';
import Multiplelist from '../components/multipleShop/multipleList';
import Multipleextra from '../components/multipleShop/multipleExtra';
import Multipleschool from '../components/multipleShop/multipleSchool';
import Multipleteacher from '../components/multipleShop/multipleTeacher';
import ajax from '../utils/fetch';
class multipleShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      courseList: [],
      tabList: [],
      lessonList: [],
      schoolList: [],
      teacherList: []
    };
  }

  componentDidMount() {
    const self = this;
    ajax('/bannerPictureShow', { imgType: '1' }).then(({ list }) => {
      self.setState({ bannerList: list });
      return ajax('/flagDetails');
    }).then(({ courseDetailList, levelDetailList, recommrndMeList, schoolDetailList, teacherDetailList }) => {
      self.setState({
        courseList: courseDetailList || [],
        tabList: levelDetailList || [],
        lessonList: recommrndMeList || [],
        schoolList: schoolDetailList || [],
        teacherList: teacherDetailList || []
      });
    }).catch((e) => { console.log(e); });
  }
  render() {
    const state = this.state;

    return (
      <div id='multipleShop'>
        <Coursecarousel bannerList={state.bannerList} />
        <Multiplelist tabList={state.tabList} />
        <div className='multiple-flag'>
          <div className='multiple-kind'>休闲娱乐</div>
          <div className='multiple-more'>More ></div>
        </div>
        <Multipleextra lessonList={state.lessonList} />
        <div className='multiple-flag'>
          <div className='multiple-kind'>推荐课程</div>
          <div className='multiple-more'>More ></div>
        </div>
        <Multiplerecommend courseList={state.courseList} />
        <div className='multiple-flag'>
          <div className='multiple-kind'>推荐学校</div>
          <div className='multiple-more'>More ></div>
        </div>
        <Multipleschool schoolList={state.schoolList} />
        <div className='multiple-flag'>
          <div className='multiple-kind'>推荐教师</div>
          <div className='multiple-more'>More ></div>
        </div>
        <Multipleteacher teacherList={state.teacherList} />
      </div>
    );
  }
}

export default multipleShop;