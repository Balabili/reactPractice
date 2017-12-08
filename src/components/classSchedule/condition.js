import React from 'react';

class Condition extends React.Component {
  constructor() {
    super();
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab({ target }) {
    const isSelected = target.className, id = target.dataset.id;
    //如果当前点击的是已选中的直接返回  防止重新取数据
    if (isSelected) {
      return;
    }
    //点击的是全部按钮时 id===''  id为undefined时未点中按钮
    if (typeof (id) !== 'undefined') {
      this.props.onChangeTab(id);
    }
  }

  render() {
    const lessonList = this.props.itemList,
      tabList = lessonList.map((item, index) => {
        return (
          <li className={item.selected ? 'Condition-tab-active' : ''} key={index} data-id={item.level_id || item.teacher_id || ''} > {item.name}</ li>
        );
      });

    return (
      <div className='Schedule-filter-condition-item'>
        <div className='Schedule-filter-condition-item-title'>{this.props.title}:</div>
        <ul className='Schedule-filter-condition-item-list' onClick={this.changeTab}>
          {tabList}
        </ul>
      </div>
    );
  }
}

export default Condition;