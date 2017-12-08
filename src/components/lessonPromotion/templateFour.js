import React from 'react';
import ClampLines from '../common/clamp';
import imgUrl from '../../images/四月是你的谎言.jpg';

class TemplateFour extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const text_to_clamp = '来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷，来上课你就是我大爷';

    return (
      <section className='Template-four-container'>
        <img src={imgUrl} alt='xxx' />
        <header>JS从入门到崩溃</header>
        <div className='Template-four-lesson-teacher'>讲师：你大爷</div>
        <div className='Template-four-lesson-description'>
          <ClampLines
            text={text_to_clamp}
            lines="3"
            ellipsis="..."
            buttons={false} />
        </div>
        <div>
          <span className='Template-four-lesson-new-price'><span>￥</span>5555</span>
          <span className='Template-four-lesson-old-price'>￥8888.00</span>
        </div>
      </section>
    );
  }
}

export default TemplateFour;