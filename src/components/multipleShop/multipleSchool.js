import React from 'react';

class Multipleschool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { schoolList } = this.props, list = schoolList.map((item, index) => {
      return (
        <div className='school-details-box' key={index}>
          <img className='school-logo' alt='school-logo' src={item.img} />
          <div className='school-details'>
            <div className='school-details-name'>{item.NAME}<div className='school-details-pass'></div></div>
            <div className='school-details-introduce'>{item.introduce}</div>
          </div>
        </div>
      );
    });

    return (
      <div className='Multiple-school'>
        {list}
      </div>
    );
  }
}

export default Multipleschool;