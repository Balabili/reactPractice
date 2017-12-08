import React from 'react';
import ClampLines from '../common/clamp';
import imgUrl from '../../images/四月是你的谎言.jpg';

class TemplateThree extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const text_to_clamp = `爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你`;

    return (
      <section className='Template-three-container'>
        <div className='Template-three-image-container'>
          <img className='Template-three-image-main' src={imgUrl} alt='xxx'></img>
          <div className='Template-three-image-side'>
            <img src={imgUrl} alt='xxx'></img>
            <img src={imgUrl} alt='xxx'></img>
          </div>
        </div>
        <div className='Template-three-description'>
          <ClampLines
            text={text_to_clamp}
            lines="3"
            ellipsis="..."
            buttons={false} />
        </div>
      </section>
    );
  }
}

export default TemplateThree;