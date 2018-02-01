import React from 'react';

class coursetv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const doc = document, rootDom = doc.getElementById('courseInnerDetails');
    rootDom.innerHTML = props.data;
  }

  render() {
    const { videoInfo } = this.props;

    return (
      <section className='Course-detail-root'>
        <div className='Course-detail-video'>
          <img src={videoInfo.videoImg} alt="" />
          <span>{videoInfo.videoName}</span>
        </div>
        <div id='courseInnerDetails' className='Course-tv'></div>
      </section>
    );
  }
}

export default coursetv;   