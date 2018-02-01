import React from 'react';

class TeacherVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, videoList = data.map((item, index) => {
      return (
        <div className='Teacher-video-item' key={index}>
          <div>
            <img src={item.img} alt="" />
            <span className='Teacher-video-time'>{item.duration}</span>
          </div>
          <span>{item.name}</span>
        </div>
      );
    });

    return (
      <section className='Teacher-video-container'>
        <header>教学视频</header>
        <div className='Teacher-video-list'>
          {videoList}
        </div>
      </section>
    );
  }
}

export default TeacherVideo;