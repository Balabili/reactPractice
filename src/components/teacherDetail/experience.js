import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props, imgs = data.introduceImg || [], imgData = imgs.map((item, index) => {
      return (<img key={index} src={item} alt="" />);
    });

    return (
      <section className='Teacher-experience'>
        <header>教学经历</header>
        <div className='Teacher-experience-detail'>
          <span>{data.introduce}</span>
          {imgData}
        </div>
        <footer>查看更多></footer>
      </section>
    );
  }
}

export default Experience;