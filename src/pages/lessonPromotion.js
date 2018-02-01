import React from 'react';
import TemplateOne from '../components/lessonPromotion/templateOne';
import TemplateTwo from '../components/lessonPromotion/templateTwo';
import TemplateThree from '../components/lessonPromotion/templateThree';
import TemplateFour from '../components/lessonPromotion/templateFour';
import TemplateFive from '../components/lessonPromotion/templateFive';
import ajax from '../utils/fetch';
import siyue from '../images/四月是你的谎言.jpg';
import titleiIcon from '../images/sanjia_moban.png';

class LessonPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bannerModelList: [] };
  }

  componentDidMount() {
    const self = this;
    ajax('/bannerModel', { bannerId: '94c86d91da1847d09aad2a4993c687aa' }).then(({ bannerModelList }) => {
      self.setState({ bannerModelList: bannerModelList });
    }).catch((e) => { console.log(e); });
  }

  getTemplate(templates) {
    //tempIndex用于区分同一个区下的不同模板的边界 tempIndex单数时一个颜色 偶数一个颜色
    return templates.map((item, index) => {
      const type = item.type;
      switch (type) {
        case '1':
          return (<TemplateOne key={index} tempIndex={index} data={item.list3[0]}></TemplateOne>);
        case '2':
          return (<TemplateTwo key={index} tempIndex={index} data={item.list3}></TemplateTwo>);
        case '3':
          return (<TemplateThree key={index} tempIndex={index} data={item.list3} remark={item.remark}></TemplateThree>);
        case '4':
          return (<TemplateFour key={index} tempIndex={index} data={item.list3[0]}></TemplateFour>);
        case '5':
          return (<TemplateFive key={index} tempIndex={index} data={item.list3}></TemplateFive>);
        default:
          return (<div></div>);
      }
    });
  }

  render() {
    const self = this, state = self.state, bannerModelList = state.bannerModelList, zoneList = bannerModelList.map((item, index) => {
      return (
        <section className='Banner-area-container' key={index}>
          <header>
            <img className='Banner-area-icon' src={titleiIcon} alt='' />
            {item.zone}
            <span className='Banner-area-english-name'>{'· ' + item.englishName}</span></header>
          {self.getTemplate(item.list2)}
        </section>
      );
    });

    return (
      <div className='Banner-root'>
        <header>
          <img src={siyue} alt="" />
        </header>
        {zoneList}
      </div>
    );
  }
}

export default LessonPromotion;