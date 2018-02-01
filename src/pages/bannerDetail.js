import React from 'react';
import ajax from '../utils/fetch';

class BannerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const params = this.props.match.params, bannerId = params.bannerId;
    ajax('http://192.168.51.188:8080/app/bannerCommodityDetail', { bannerId: bannerId }).then(({ list }) => {
      const htmlStr = list[0].detail;
      let htmlDomContainer = document.getElementById('banner-root');
      htmlDomContainer.innerHTML = htmlStr;
    }).catch((e) => { console.log(e); });
  }

  render() {
    return (
      <section id='banner-root'></section>
    );
  }
}

export default BannerDetail;