import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterContent from '../components/classSchedule/filterCondition';
import ScheduleHeader from '../components/classSchedule/header';
import SchedeleBody from '../components/classSchedule/schedule';
import * as actions from '../actions/classSchedule';
import ajax from '../utils/fetch';
import { formatScheduleList, formatTeacher, calculateMonday } from '../api/classSchedule';
import { formatMonth } from '../utils/util';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const params = this.props.match.params, teacherId = params.teacherId;
    if (teacherId) {
      this.initTeacherScheduleData(teacherId);
    } else {
      this.initSchoolScheduleData();
    }
  }

  initTeacherScheduleData(teacherId) {
    const self = this;
    ajax('http://192.168.51.98:8088/app/teacherTimeTable', { teacherId: teacherId }).then(({ resultList, timeList, courseIdList }) => {
      const { changeScheduleViewStatus, changeCurrentTeacher, changeCurrentTeacherSchedule, getClassValidMonthList,
        changeLessonColorMap, changeCurrentMonday, colorList } = self.props,
        teacherData = self.formatTeacherData(resultList),
        validDuration = self.getDurationStartEndDate(timeList[0]),
        validMonthList = self.getClassMonthList(...validDuration),
        lessonColorMap = self.formatLessonColor(courseIdList, colorList);
      changeScheduleViewStatus(true);
      changeLessonColorMap(lessonColorMap);
      changeCurrentTeacher(teacherId);
      changeCurrentTeacherSchedule(teacherData);
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

  initSchoolScheduleData() {
    const self = this;
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', { schoolId: '2af15be1620d45e2968b70b8bf56179f' })
      .then(({ teacherList, timeList, levelList, resultList, address }) => {
        const { changeLessonList, getCurrentTeacherList, changeCurrentSchedule, getClassValidMonthList,
          changeCurrentMonday, changeCurrentClassPlace, changeValidTimeline, colorList } = self.props,
          //获取时间
          validDuration = self.getDurationStartEndDate(timeList[0]),
          validMonthList = self.getClassMonthList(...validDuration),
          scheduleList = formatScheduleList(resultList);
        let lessons = levelList;
        lessons.unshift({ level_id: '', name: '全部', selected: true });
        changeLessonList(lessons);
        getCurrentTeacherList(formatTeacher(teacherList, colorList));
        changeCurrentSchedule(scheduleList);
        getClassValidMonthList(validMonthList);
        changeValidTimeline(timeList[0]);
        //计算当前显示课程表中的周一是哪天，并存state
        changeCurrentMonday(calculateMonday(new Date()));
        changeCurrentClassPlace(address);
      });
  }

  getDurationStartEndDate(duration) {
    const startMonth = duration.beginTime.substring(0, 7), endMonth = duration.endTime.substring(0, 7);
    return [startMonth.replace(/-/g, '/'), endMonth.replace(/-/g, '/')];
  }

  getClassMonthList(start, end) {
    const startTime = new Date(start), endTime = new Date(end), endYear = endTime.getFullYear(), endMonth = endTime.getMonth() + 1;
    let currentMonth = start.split('/'), list = [];
    for (let i = 1; ; i++) {
      let data = { key: currentMonth[0] + '-' + (currentMonth[1] >= 10 ? currentMonth[1] : ('0' + currentMonth[1])) };
      if (i === 1) {
        data.value = formatMonth(startTime);
        list.push(data);
      } else {
        const currentTime = currentMonth.join('/'), date = new Date(currentTime);
        data.value = formatMonth(date)
        list.push(data);
      }
      if (+currentMonth[0] === endYear && +currentMonth[1] === endMonth) {
        return list;
      }
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
    let mapData = {};
    const len = lessonIdList.length;
    for (let i = 0; i < len; i++) {
      mapData[lessonIdList[i]] = colorList[i];
    }
    return mapData;
  }

  render() {
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
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentMonday: actions.changeCurrentMonday,
    changeCurrentClassPlace: actions.changeCurrentClassPlace,
    changeCurrentSchedule: actions.changeCurrentSchedule,
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeCurrentTeacherSchedule: actions.changeCurrentTeacherSchedule,
    changeLessonColorMap: actions.changeLessonColorMap,
    changeValidTimeline: actions.changeValidTimeline
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);