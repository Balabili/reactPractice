import React from 'react';
import ajax from '../utils/fetch';
import Header from '../components/schoolDetail/header';
import RecommendLesson from '../components/schoolDetail/recommendLesson';
import TeacherList from '../components/schoolDetail/teacherList';
import TeacherSchedule from './teacherSchedule';
import headerIcon from '../images/sanjia_moban.png';

class SchoolDetail extends React.Component {
  constructor() {
    super();
    this.state = { schoolId: '', schoolData: {}, lessonList: [], teacherList: [], subSchool: [] };
  }

  componentDidMount() {
    const self = this, params = this.props.match.params, schoolId = params.schoolId, data = {
      total: '0', count: '4', totaltwo: '0', counttwo: '4', recommendSchoolId: schoolId
    };
    self.setState({ schoolId: schoolId });
    ajax('/recommendSchoolDetails', data).then((result) => {
      const data = {
        img: result.img,
        name: result.name,
        scores: result.scores,
        fans: result.remark,
        address: result.address,
        photos: result.photoList || [],
        introduce: result.introduce,
        merchantBriefing: result.merchantBriefing
      };
      self.setState({ schoolData: data, lessonList: result.courseDetailsList, teacherList: result.teacherDetailsList, subSchool: result.sonList });
    }).catch((e) => { console.log(e); });
  }

  render() {
    const state = this.state;

    return (
      <div className='School-root'>
        <Header data={state.schoolData} subSchool={state.subSchool}></Header>
        <RecommendLesson lesson={state.lessonList} />
        <TeacherList teachers={state.teacherList} />
        <section className='School-detail-schedule-container'>
          <header>
            <img className='School-detail-header-icon' src={headerIcon} alt='' />
            <span>学校课程表</span>
          </header>
          <TeacherSchedule schoolId={state.schoolId} />
        </section>
        <footer className='School-detail-footer'>
          <div>分类</div>
          <div>咨询</div>
        </footer>
      </div>
    );
  }
}

export default SchoolDetail;