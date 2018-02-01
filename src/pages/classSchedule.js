import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterContent from '../components/classSchedule/filterCondition';
import ScheduleHeader from '../components/classSchedule/header';
import SchedeleBody from '../components/classSchedule/schedule';
import * as actions from '../actions/classSchedule';
import ajax from '../utils/fetch';
import { formatScheduleList, formatTeacher, calculateMonday } from '../api/commonApi';
import { formatMonth } from '../utils/util';

//教师课程表与学校课程表通用一个页面
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //从教师详情页分享页当做子页面引入时match为undefined，此处做额外处理
    const match = this.props.match, params = match ? match.params : null,
      schoolId = params ? params.schoolId : this.props.schoolId,
      teacherId = params ? params.teacherId : this.props.teacher;
    if (teacherId) {
      // 教师课程表
      this.initTeacherScheduleData(teacherId);
    } else {
      // 学校课程表
      this.initSchoolScheduleData(schoolId);
    }
  }

  // 座位子组件时用于接收上层props参数的改变
  componentWillReceiveProps(newProps) {
    if (this.props.teacher !== newProps.teacher) {
      this.initTeacherScheduleData(newProps.teacher);
    }
  }

  initTeacherScheduleData(teacherId) {
    const self = this;
    ajax('http://192.168.51.98:8088/app/teacherTimeTable', { teacherId: teacherId }).then(({ resultList, timeList, courseIdList }) => {
      // resultList课程数据   timelist时间数据  courseidllist所有课程id list
      const { changeScheduleViewStatus, changeCurrentTeacher, changeCurrentTeacherSchedule, getClassValidMonthList, changeValidTimeline,
        changeLessonColorMap, changeCurrentMonday, colorList } = self.props,
        //   //格式化课程表所需的数据结构
        teacherData = self.formatTeacherData(resultList),
        //   //格式化日期为年月
        validDuration = self.getDurationStartEndDate(timeList[0]),
        //   //根据起止时间计算出有效的时间段
        validMonthList = self.getClassMonthList(...validDuration),
        //   //将有效的课程id和色板想对应，用于课程表不同课程不同的背景色
        lessonColorMap = self.formatLessonColor(courseIdList, colorList);
      //是否是教师身份
      changeScheduleViewStatus(true);
      //色板与课程的对应关系
      changeLessonColorMap(lessonColorMap);
      //保存当前教师id
      changeCurrentTeacher(teacherId);
      //保存起止时间，用于左滑右划改变周时的边界值
      changeValidTimeline(timeList[0]);
      //改变教师课程表的数据
      changeCurrentTeacherSchedule(teacherData);
      //保存所有的月份集合
      getClassValidMonthList(validMonthList);
      //计算当前显示课程表中的周一是哪天，并存state
      changeCurrentMonday(calculateMonday(new Date()));
    }).catch((e) => { console.log(e); });
  }

  formatTeacherData(fetchData) {
    //格式化教师数据
    let fornoonList = [], afternoonList = [], nightList = [];
    const len = fetchData.length;
    for (let i = 0; i < len; i++) {
      const data = formatScheduleList(fetchData[i].course), place = fetchData[i].address;
      fornoonList.push({ place: place, lessons: data.fornoon });
      afternoonList.push({ place: place, lessons: data.afternoon });
      nightList.push({ place: place, lessons: data.night });
    }
    return { fornoon: fornoonList, afternoon: afternoonList, night: nightList };
  }

  initSchoolScheduleData(schoolId) {
    //解决教师详情页用作子模板，若是初始化时没有teacherid导致取无效数据，浪费效率
    const self = this, { isChildComponent, saveSchedulePageSchoolId } = this.props;
    if (isChildComponent) {
      return;
    }
    saveSchedulePageSchoolId(schoolId);
    ajax('/schoolTimeTable', { schoolId: schoolId })
      .then(({ teacherList, timeList, levelList, resultList, address }) => {
        // resultList课程数据   timelist时间数据  teacherList所有老师  levellist所有科目 address地址
        const { changeLessonList, getCurrentTeacherList, changeCurrentSchedule, getClassValidMonthList,
          changeCurrentMonday, changeCurrentClassPlace, changeValidTimeline, colorList } = self.props,
          // 格式化日期
          validDuration = self.getDurationStartEndDate(timeList[0]),
          // 生成所有有效的日月
          validMonthList = self.getClassMonthList(...validDuration),
          // 格式化课程表数据
          scheduleList = formatScheduleList(resultList);
        levelList.unshift({ level_id: '', name: '全部', selected: true });
        // 所有课程首项插入全部
        changeLessonList(levelList);
        // 生成教师与色板的对应关系
        getCurrentTeacherList(formatTeacher(teacherList, colorList));
        // 保存课程表数据
        changeCurrentSchedule(scheduleList);
        // 保存所有有效月份list
        getClassValidMonthList(validMonthList);
        // 保存起止时间，用于左滑右划改变周时用于判断的边界值
        changeValidTimeline(timeList[0]);
        // 计算当前显示课程表中的周一是哪天，并存state
        changeCurrentMonday(calculateMonday(new Date()));
        // 保存学校地址
        changeCurrentClassPlace(address);
      });
  }

  getDurationStartEndDate(duration) {
    //改变时间为1111/11，使用/替换-解决ios不识别问题  ios new Date()中的格式必须是xxxx/x/x,不能缺少日期
    const startMonth = duration.beginTime, endMonth = duration.endTime;
    return [startMonth.replace(/-/g, '/'), endMonth.replace(/-/g, '/')];
  }

  getClassMonthList(start, end) {
    const startTime = new Date(start), endTime = new Date(end), endYear = endTime.getFullYear(), endMonth = endTime.getMonth() + 1;
    //currentMonth变成长度为3的年月日数组，list用于返回所有有效的月份
    let currentMonth = start.split('/'), list = [];
    // i设置1000防止死循环
    for (let i = 1; i < 1000; i++) {
      let data = { key: currentMonth[0] + '-' + (currentMonth[1] >= 10 ? currentMonth[1] : ('0' + currentMonth[1])) };
      if (i === 1) {
        //首月填入
        data.value = formatMonth(startTime);
        list.push(data);
      } else {
        const currentTime = currentMonth.join('/'), date = new Date(currentTime);
        data.value = formatMonth(date)
        list.push(data);
      }
      if (+currentMonth[0] === endYear && +currentMonth[1] === endMonth) {
        //是否是最后一个月  如果是  返回数据
        return list;
      }
      //月份大于12  年+1   月份变为1   否则月份+1
      let month = +currentMonth[1];
      if (month === 12) {
        currentMonth[0] = +currentMonth[0] + 1;
        currentMonth[1] = 1;
      } else {
        currentMonth[1] = +currentMonth[1] + 1;
      }
    }
  }

  formatLessonColor(lessonIdList, colorList) {
    //生成课程id与色板映射关系
    let mapData = {};
    const len = lessonIdList.length;
    for (let i = 0; i < len; i++) {
      mapData[lessonIdList[i]] = colorList[i];
    }
    return mapData;
  }

  render() {
    // 判断是否是老师课程表   教师课程表没有删选老师和课程的头部
    const { isTeacherView } = this.props;

    return (
      <div>
        {!isTeacherView &&
          <FilterContent></FilterContent>
        }
        <div className='Schedule-grid-container'>
          <ScheduleHeader></ScheduleHeader>
          <SchedeleBody></SchedeleBody>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const stateData = state.schedulePage;
  return {
    colorList: stateData.colorList,
    lessonId: stateData.lessonId,
    teacherId: stateData.teacherId,
    isTeacherView: stateData.isTeacherView
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeScheduleViewStatus: actions.changeScheduleViewStatus,
    changeLessonList: actions.changeLessonList,
    getCurrentTeacherList: actions.getCurrentTeacherList,
    getClassValidMonthList: actions.getClassValidMonthList,
    changeCurrentMonday: actions.changeCurrentMonday,
    changeCurrentClassPlace: actions.changeCurrentClassPlace,
    changeCurrentSchedule: actions.changeCurrentSchedule,
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeCurrentTeacherSchedule: actions.changeCurrentTeacherSchedule,
    changeLessonColorMap: actions.changeLessonColorMap,
    changeValidTimeline: actions.changeValidTimeline,
    saveSchedulePageSchoolId: actions.saveSchedulePageSchoolId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);