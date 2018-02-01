import React from 'react';

class Courseteacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (
      <div className='Course-teacher'>
        <div className='teacherdetail-box'>
          <img className='teacherdetail-img' alt='teacher' src={data.img}></img>
          <ul className='teacherdetail-main'>
            <li className='teacherdetail-main-li'>
              <div className='teacher-name'>{data.name}</div>
              <div className='teacher-feature' >{data.professionalTitle}</div>
              <div className='teacher-feature' >{data.teacherYear}</div>
            </li>
            <li className='teacherdetail-main-li teacherwork'>{data.schoolName}</li>
            <li className='teacherdetail-main-li teacherdetail'>{data.taecherIntroduce}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Courseteacher;