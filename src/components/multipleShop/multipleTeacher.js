import React from 'react';

class multipleteacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { teacherList } = this.props, list = teacherList.map((item, index) => {
      return (
        <div className='Multiple-teacher-box' key={`Multiple-teacher${index}`}>
          <img className='Multiple-teacher-img' alt='pic' src={item.img} />
          <div className='Multiple-teacher-name'>{item.name}</div>
          <div className='Multiple-teacher-school'>{item.schoolName}</div>
          <div className='Multiple-teacher-clear'>
            <div className='Multiple-teacher-float'>{item.professional_title}</div>
            <div className='Multiple-teacher-float'>{item.year}</div>
          </div>
        </div>
      );
    });

    return (
      <div className='Multiple-teacher'>
        {list}
      </div>
    );
  }
}

export default multipleteacher;