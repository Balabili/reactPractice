import React from 'react';
import star from '../../images/star.png';
import starEmpty from '../../images/icon_star_kong.png';
import good from '../../images/good_grey.png';
import ajax from '../../utils/fetch';

class CourseComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    };
  }

  componentDidMount() {
    const self = this;
    ajax('/evaluateDetails', { courseId: '0f19e3b67f6147ca9fc6c98762bbd6b0', total: '0', count: '2' }).then(({ list }) => {
      self.setState({ commentList: list });
    }).catch((e) => { console.log(e); });
  }

  commentimgs(imgList) {
    const len = imgList.length;
    let dom = [];
    for (let i = 0; i < len; i++) {
      let child = (
        <img key={i} src={imgList[i]} alt='' className='showcomment-img' />
      );
      dom.push(child);
    }
    return dom;
  }

  getStars(starsCount) {
    let starList = [];
    for (let i = 0; i < 5; i++) {
      const starDom = (<img src={i < starsCount ? star : starEmpty} alt="" key={i} />);
      starList.push(starDom);
    }
    return starList;
  }

  render() {
    const self = this, { schoolData } = self.props, commentList = self.state.commentList, commentdetails = commentList.map((item, index) => {
      return (
        <ul className='Course-comment-ul' key={index}>
          <li className='Course-comment-li'>
            <img className='Course-comment-img' alt='person' src={item.userImg} />
            <div className='Course-comment-name'>
              <div className='Course-comment-name-name'>
                <span>{item.userName}</span>
                {self.getStars(+item.classAScore)}
              </div>
              <div className='Course-comment-name-data'>{item.agoDate}</div>
            </div>
            <div className='Course-comment-praise'>
              <img src={good} alt='' />
              <span>{item.likeCounts}</span>
            </div>
          </li>
          <li className='Course-comment-li Course-comment-li-main'>
            {item.evaluateContent}
          </li>
          <li className='Course-comment-li'>
            {self.commentimgs(item.imgList || [])}
          </li>
        </ul>
      );
    });

    return (
      <div className='Course-comment' >
        {commentdetails}
        <div className='checkcomment'>查看全部评论 ></div>
        <div className='school-details-box'>
          <img className='school-logo' alt='school-logo' src={schoolData.schoolImg} />
          <div className='school-details'>
            <div className='school-details-name'>
              <span>
                {schoolData.schoolName}
              </span>
              <div className='school-details-pass'></div></div>
            <div className='school-details-introduce'>{schoolData.schoolIntroduce}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseComment;