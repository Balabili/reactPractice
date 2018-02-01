import React from 'react';
import Coursecarousel from '../components/courseDetails/courseCarousel';
import Courseprice from '../components/courseDetails/coursePrice';
import Coursetimes from '../components/courseDetails/courseTimes';
import Coursecomment from '../components/courseDetails/courseComment';
import Coursetv from '../components/courseDetails/courseTv';
import Courseteacher from '../components/courseDetails/courseTeacher';
import Courseintroduce from '../components/courseDetails/courseIntroduce';
import Courserecommend from '../components/courseDetails/courseRecommend';
import ajax from '../utils/fetch';

class CourseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.changeactive = this.changeactive.bind(this);
    this.state = {
      flaga: true,
      flagb: false,
      flagc: false,
      bannerList: [],
      classMainData: {},
      classIntro: {},
      classDetails: '',
      teacherDetails: {},
      recommendLesson: [],
      schoolInfo: {},
      videoInfo: {},
      schoolBriefInto: {}
    };
  }

  componentDidMount() {
    const self = this;
    ajax('/coursedetails', { courseId: '0f19e3b67f6147ca9fc6c98762bbd6b0', userId: '' }).then((result) => {
      const classMainData = {
        courseName: result.courseName,
        firstBarginPrice: result.firstEditPrice,
        firstOldPrice: result.firstZeroPrice,
        lastBarginPrice: result.lastEditPrice,
        lastOldPrice: result.lastZeroPrice,
        applyCount: result.applyCount,
        sumCount: result.sumCount,
        historyCount: result.historyCount,
        isBargin: result.preferentialState === '0',
        courseIntroduce: result.courseIntroduce ? result.courseIntroduce.split(',') : []
      }, classIntro = {
        teacherName: result.teacherName,
        startTime: result.startTime,
        stopTime: result.stopTime,
        classHour: result.classHour,
        classAddress: result.classAddress
      }, teacherDetails = {
        img: result.teacherImg,
        name: result.teacherName,
        professionalTitle: result.professionalTitle,
        teacherYear: result.teacherYear,
        schoolName: result.schoolName,
        taecherIntroduce: result.taecherIntroduce
      }, schoolInfo = {
        schoolName: result.schoolName,
        schoolImg: result.schoolImg,
        schoolIntroduce: result.schoolIntroduce
      }, videoInfo = {
        videoImg: result.videoImg,
        videoName: result.viseoName
      }, schoolBriefInto = {
        imgList: result.imgMList,
        intro: result.schoolBriefing
      };
      self.setState({
        bannerList: result.courseImgList,
        classMainData: classMainData,
        classIntro: classIntro,
        classDetails: result.imageText,
        teacherDetails: teacherDetails,
        recommendLesson: result.elseCourseList,
        schoolInfo: schoolInfo,
        videoInfo: videoInfo,
        schoolBriefInto: schoolBriefInto
      });
    });
  }

  changeactive({ currentTarget }) {
    const step = currentTarget.dataset.step;
    if (step === '0') {
      this.setState({
        flaga: true,
        flagb: false,
        flagc: false
      });
    } else if (step === '1') {
      this.setState({
        flaga: false,
        flagb: true,
        flagc: false
      });
    } else if (step === '2') {
      this.setState({
        flaga: false,
        flagb: false,
        flagc: true
      });
    }
  }

  render() {
    const state = this.state;

    return (
      <div id='courseDetails'>
        <div className='course-step'>
          <div className='course-step-li'>
            <a href='#one' data-step='0' onClick={this.changeactive}>
              <div className='course-step-word'>课程</div>
              <div className={`course-step-flag ${this.state.flaga ? 'active' : ''}`}></div>
            </a>
          </div>
          <div className='course-step-li'>
            <a href='#two' data-step='1' onClick={this.changeactive}>
              <div className='course-step-word'>详情</div>
              <div className={`course-step-flag ${this.state.flagb ? 'active' : ''}`}></div>
            </a>
          </div>
          <div className='course-step-li'>
            <a href='#three' data-step='2' onClick={this.changeactive}>
              <div className='course-step-word'>评价</div>
              <div className={`course-step-flag ${this.state.flagc ? 'active' : ''}`}></div>
            </a>
          </div>
        </div>
        <div className='course-stance'></div>
        <Coursecarousel data={state.bannerList} />
        <Courseprice data={state.classMainData} />
        <Coursetimes data={state.classIntro} />
        <div className='iconback' id='three'>评价</div>
        <Coursecomment schoolData={state.schoolInfo} />
        <div className='iconback' id='two'>课程详情</div>
        <Coursetv data={state.classDetails} videoInfo={state.videoInfo} />
        <div className='iconback'>授课教师</div>
        <Courseteacher data={state.teacherDetails} />
        <div className='iconback'>学校简介</div>
        <Courseintroduce data={state.schoolBriefInto} />
        <div className='iconback'>课程推荐</div>
        <Courserecommend data={state.recommendLesson} />
      </div>
    );
  }
}

export default CourseDetails;