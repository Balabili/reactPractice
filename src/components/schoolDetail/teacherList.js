import React from 'react';
import ClampLines from '../common/clamp';
import headerIcon from '../../images/sanjia_moban.png';

class TeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //ClampLines  多余N行显示...
  render() {
    const { teachers } = this.props, aa = [...teachers, ...teachers], teacher = aa.map((item, index) => {
      return (
        <div className='School-detail-teacher-item' key={index}>
          <img src={item.img} alt='' />
          <div className='School-detail-teacher-details'>
            <div>{item.name}</div>
            <ClampLines
              className='School-detail-teacher-introduce'
              text={item.introduce}
              lines="3"
              ellipsis="..."
              buttons={false} />
          </div>
        </div>
      );
    });

    return (
      <section className='School-detail-teacher-container'>
        <header>
          <img className='School-detail-header-icon' src={headerIcon} alt='' />
          <span>师资队伍</span>
        </header>
        <div>
          {teacher}
        </div>
      </section>
    );
  }
}

export default TeacherList;