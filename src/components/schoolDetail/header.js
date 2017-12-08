import React from 'react';

class SchoolHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (
      <section className='School-detail-header-section'>
        <header className='School-detail-header'>
          <img src={data.img} alt='' />
          <div className='School-title'>
            <div className='School-name'>{data.name}</div>
            <div className='School-fans'>{data.fans || 0}粉丝</div>
          </div>
          <span className='School-add-attention'>+关注</span>
        </header>
        <div className='School-introduce'>
          <div>{data.introduce}</div>
          <div className='School-address'>{data.address}</div>
        </div>
        <div className='School-description'>
          <div className='School-description-image-container'>
            <img src={data.photos ? data.photos[0] : ''} alt='' />
          </div>
          <div>
            学校简介
            <div className='School-description-detail'>
              {data.merchantBriefing}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SchoolHeader;