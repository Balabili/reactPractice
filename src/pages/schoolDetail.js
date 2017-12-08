import React from 'react';
import ajax from '../utils/fetch';
import Header from '../components/schoolDetail/header';
import RecommendLesson from '../components/schoolDetail/recommendLesson';

class SchoolDetail extends React.Component {
  constructor() {
    super();
    this.state = { schoolData: {}, lessonList: [] };
  }

  componentDidMount() {
    const self = this, params = this.props.match.params, schoolId = params.schoolId, data = {
      total: '0', count: '4', totaltwo: '0', counttwo: '4', recommendSchoolId: schoolId
    };
    ajax('/recommendSchoolDetails', data).then((result) => {
      const data = {
        img: result.img,
        name: result.name,
        fans: result.remark,
        address: result.address,
        photos: result.photoList,
        introduce: result.introduce,
        merchantBriefing: result.merchantBriefing
      };

      self.setState({ schoolData: data, lessonList: result.listSecond });
    }).catch((e) => { console.log(e); });
  }

  render() {
    return (
      <div className='School-root'>
        <Header data={this.state.schoolData}></Header>
        <RecommendLesson lesson={this.state.lessonList}></RecommendLesson>
      </div>
    );
  }
}

export default SchoolDetail;