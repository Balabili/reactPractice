import React from 'react';
import TemplateOne from '../components/lessonPromotion/templateOne';
import TemplateTwo from '../components/lessonPromotion/templateTwo';
import TemplateThree from '../components/lessonPromotion/templateThree';
import TemplateFour from '../components/lessonPromotion/templateFour';
import TemplateFive from '../components/lessonPromotion/templateFive';

class LessonPromotion extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div >
        <TemplateOne></TemplateOne>
        <TemplateTwo></TemplateTwo>
        <TemplateThree></TemplateThree>
        <TemplateFour></TemplateFour>
        <TemplateFive></TemplateFive>
      </div>
    );
  }
}

export default LessonPromotion;