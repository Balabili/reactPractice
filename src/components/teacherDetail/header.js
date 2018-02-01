import React from 'react';

class TeacherDetailHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, schools = data.schoolList || [], schoolList = schools.map((item, index) => {
      return (<span key={index}>{item}</span>);
    });

    return (
      <header className='Teacher-detail-header'>
        <img src={data.img} alt='' />
        <div className='Teacher-detail-header-content'>
          <div className='Teacher-detail-header-title'>
            <span>{data.name}</span>
            <span className='Teacher-detail-header-price'>{data.score}分</span>
          </div>
          <section className='Teacher-detail-description'>
            <div>
              <span className='Teacher-detail-key'>
                <span>毕</span><span>业</span><span>院</span><span>校</span>
              </span>:
              <span className='Teacher-detail-value'>{data.college}</span>
            </div>
            <div>
              <span className='Teacher-detail-key'>
                <span>教</span><span>师</span><span>任</span><span>职</span>
              </span>:
              <span className='Teacher-detail-value'>{data.title}</span>
            </div>
            <div>
              <span className='Teacher-detail-key'>
                <span>教</span><span>龄</span>
              </span>:
              <span className='Teacher-detail-value'>{data.year}</span>
            </div>
            <div>
              <span className='Teacher-detail-key'>
                <span>任</span><span>教</span><span>学</span><span>校</span>
              </span>:
              <span className='Teacher-detail-value'>
                {schoolList}
              </span>
            </div>
          </section>
        </div>
      </header>
    );
  }
}

export default TeacherDetailHeader;