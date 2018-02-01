import React from 'react';

class CourseIntroduce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, schoolintroducepic = (data.imgList ? data.imgList : []).map((item, index) => {
      return (
        <img alt='pic' src={item} key={index} />
      );
    });

    return (
      <section className='Course-introduce'>
        <div id='CourseIntroduce'>
          {data.intro}
        </div>
        {schoolintroducepic}
      </section>
    );
  }
}

export default CourseIntroduce;