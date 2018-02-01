import React from 'react';
import ajax from '../utils/fetch';
import Header from '../components/teacherDetail/header';
import Experience from '../components/teacherDetail/experience';
import TeacherVideo from '../components/teacherDetail/teacherVideo';
import Schedule from './classSchedule';
import Lesson from '../components/teacherDetail/teacherLesson';
import Footer from '../components/teacherDetail/footer';

class SchoolDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      teacherMainData: {},
      experience: {},
      vedioList: [],
      courseList: [],
      teacherId: ''
    };
  }

  componentDidMount() {
    const self = this, params = this.props.match.params, teacherId = params.teacherId;
    ajax('http://192.168.51.98:8088/app/teacherInfo', { teacherId: teacherId }).then((result) => {
      const teacherMainData = {
        img: result.img,
        name: result.teacherName,
        college: result.college,
        score: result.score,
        title: result.professional_title,
        year: result.year,
        schoolList: result.schoolNameList,
      }, experience = {
        introduce: result.introduce,
        introduceImg: result.introduceImg
      };
      self.setState({
        teacherMainData: teacherMainData,
        experience: experience,
        vedioList: result.videoList || [],
        courseList: result.courseList || [],
        teacherId: teacherId
      });
    }).catch((e) => { console.log(e); });
  }

  render() {
    const state = this.state;

    return (
      <div className='Teacher-detail-root'>
        <Header data={state.teacherMainData}></Header>
        <Experience data={state.experience}></Experience>
        <TeacherVideo data={state.vedioList}></TeacherVideo>
        <section className='Teacher-detail-schedule-container'>
          <header>教师课程表</header>
          <Schedule isChildComponent='true' teacher={state.teacherId}></Schedule>
        </section>
        <Lesson data={state.courseList}></Lesson>
        <Footer></Footer>
        <div className='Teacher-detail-button'>咨询</div>
      </div>
    );
  }
}

export default SchoolDetail;