export default [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */'../page/login.vue'),
    meta: { title: '登录', isSkip: true }
  },
  // 首页
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */'../page/home.vue'),
    meta: { title: '首页' }
  },
  // 课程中心
  {
    name: 'courseCenter',
    path: '/courseCenter',
    component: () => import(/* webpackChunkName: "courseCenter" */'../page/courseCenter.vue'),
    meta: { title: '课程中心' }
  },
  // 课程搜索
  {
    name: 'courseSearch',
    path: '/courseSearch',
    component: () => import(/* webpackChunkName: "courseSearch" */'../page/courseSearch.vue'),
    meta: { title: '课程搜索' }
  },
  // 考试中心
  {
    name: 'examCenter',
    path: '/examCenter',
    component: () => import(/* webpackChunkName: "examCenter" */'../page/examCenter.vue'),
    meta: { title: '考试中心' }
  },
  // 考试
  {
    name: 'exam',
    path: '/exam',
    component: () => import(/* webpackChunkName: "exam" */'../page/exam.vue'),
    meta: { title: '考试' }
  },
  // 考试结果
  {
    name: 'examResult',
    path: '/examResult',
    component: () => import(/* webpackChunkName: "examResult" */'../page/examResult.vue'),
    meta: { title: '考试结果' }
  },
  // 查看错题
  {
    name: 'examReview',
    path: '/examReview',
    component: () => import(/* webpackChunkName: "examReview" */'../page/examReview.vue'),
    meta: { title: '查看错题' }
  },
  // 搜索考试
  {
    name: 'examSearch',
    path: '/examSearch',
    component: () => import(/* webpackChunkName: "examSearch" */'../page/examSearch.vue'),
    meta: { title: '搜索考试' }
  },
  // 个人中心
  {
    name: 'personalCenter',
    path: '/personalCenter',
    component: () => import(/* webpackChunkName: "personalCenter" */'../page/personalCenter.vue'),
    meta: { title: '个人中心' }
  },
  // 消息中心
  {
    name: 'message',
    path: '/message',
    component: () => import(/* webpackChunkName: "message" */'../page/message.vue'),
    meta: { title: '消息中心' }
  },
  // 通知内容
  {
    name: 'messageDetail',
    path: '/messageDetail',
    component: () => import(/* webpackChunkName: "messageDetail" */'../page/messageDetail.vue'),
    meta: { title: '通知内容' }
  },
  // 历史记录
  {
    name: 'history',
    path: '/history',
    component: () => import(/* webpackChunkName: "history" */'../page/history.vue'),
    meta: { title: '历史记录' }
  },
  // 我的课程
  {
    name: 'myCourse',
    path: '/myCourse',
    component: () => import(/* webpackChunkName: "myCourse" */'../page/myCourse.vue'),
    meta: { title: '我的课程' }
  },
  // 新闻中心
  {
    name: 'newsCenter',
    path: '/newsCenter',
    component: () => import(/* webpackChunkName: "newsCenter" */'../page/newsCenter.vue'),
    meta: { title: '资讯中心' }
  },
  // 新闻搜索
  {
    name: 'newsSearch',
    path: '/newsSearch',
    component: () => import(/* webpackChunkName: "newsSearch" */'../page/newsSearch.vue'),
    meta: { title: '新闻搜索' }
  },
  // 新闻详情
  {
    name: 'newsDetails',
    path: '/newsDetails',
    component: () => import(/* webpackChunkName: "newsDetails" */'../page/newsDetails.vue'),
    meta: { title: '新闻详情' }
  },
  // 站内信
  {
    name: 'notice',
    path: '/notice',
    component: () => import(/* webpackChunkName: "notice" */'../page/notice.vue'),
    meta: { title: '站内信' }
  },
  // 排行榜
  {
    name: 'rankList',
    path: '/rankList',
    component: () => import(/* webpackChunkName: "rankList" */'../page/rankList.vue'),
    meta: { title: '排行榜' }
  },
  // 班级园地
  {
    name: 'classGarden',
    path: '/classGarden',
    component: () => import(/* webpackChunkName: "classGarden" */'../page/classGarden.vue'),
    meta: { title: '班级园地' }
  },
  // 班级搜索
  {
    name: 'classSearch',
    path: '/classSearch',
    component: () => import(/* webpackChunkName: "classSearch" */'../page/classSearch.vue'),
    meta: { title: '班级搜索' }
  },
  // 班级详情
  {
    name: 'classDetail',
    path: '/classDetail',
    component: () => import(/* webpackChunkName: "classDetail" */'../page/classDetail.vue'),
    meta: { title: '班级详情' }
  },
  // 签到详情
  {
    name: 'signDetail',
    path: '/signDetail',
    component: () => import(/* webpackChunkName: "signDetail" */'../page/signDetail.vue'),
    meta: { title: '签到详情' }
  },
  // 电子书
  {
    name: 'ebook',
    path: '/ebook',
    component: () => import(/* webpackChunkName: "ebook" */'../page/ebook.vue'),
    meta: { title: '电子书' }
  },
  // 电子书搜索
  {
    name: 'ebookSearch',
    path: '/ebookSearch',
    component: () => import(/* webpackChunkName: "ebookSearch" */'../page/ebookSearch.vue'),
    meta: { title: '电子书搜索' }
  },
  // 电子书章节
  {
    name: 'ebookChapterList',
    path: '/ebookChapterList',
    component: () => import(/* webpackChunkName: "ebookChapterList" */'../page/ebookChapterList.vue'),
    meta: { title: '电子书章节' }
  },
  // 电子书章节内容
  {
    name: 'ebookDetail',
    path: '/ebookDetail',
    component: () => import(/* webpackChunkName: "ebookDetail" */'../page/ebookDetail.vue'),
    meta: { title: '内容' }
  },
  // 我的学时
  {
    name: 'myCredit',
    path: '/myCredit',
    component: () => import(/* webpackChunkName: "myCredit" */'../page/myCredit.vue'),
    meta: { title: '我的学时' }
  },
  // 反馈中心
  {
    name: 'advise',
    path: '/advise',
    component: () => import(/* webpackChunkName: "advise" */'../page/advise.vue'),
    meta: { title: '反馈中心' }
  },
  // 设置中心
  {
    name: 'setting',
    path: '/setting',
    component: () => import(/* webpackChunkName: "setting" */'../page/setting.vue'),
    meta: { title: '设置' }
  },
  // 个人信息修改
  {
    name: 'userInfoEdit',
    path: '/userInfoEdit',
    component: () => import(/* webpackChunkName: "userInfoEdit" */'../page/userInfoEdit.vue'),
    meta: { title: '个人信息修改' }
  },
  // 修改手机号码
  {
    name: 'changeMobile',
    path: '/changeMobile',
    component: () => import(/* webpackChunkName: "changeMobile" */'../page/changeMobile.vue'),
    meta: { title: '修改手机号码' }
  },
  // 修改密码
  {
    name: 'changePwd',
    path: '/changePwd',
    component: () => import(/* webpackChunkName: "changePwd" */'../page/changePwd.vue'),
    meta: { title: '修改密码' }
  },
  // 注册
  {
    name: 'register',
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */'../page/register.vue'),
    meta: { title: '注册' }
  },
  // 交流评论
  {
    name: 'addCommunication',
    path: '/addCommunication',
    component: () => import(/* webpackChunkName: "addCommunication" */'../page/addCommunication.vue'),
    meta: { title: '交流评论' }
  },
  // 添加评论
  {
    name: 'communication',
    path: '/communication',
    component: () => import(/* webpackChunkName: "communication" */'../page/communication.vue'),
    meta: { title: '添加评论' }
  },
  // mp4播放
  {
    name: 'playMp4',
    path: '/playMp4',
    component: () => import(/* webpackChunkName: "playMp4" */'../page/playMp4.vue'),
    meta: { title: '课程播放' }
  },
  // JYAicc播放页
  {
    name: 'playJYAicc',
    path: '/playJYAicc',
    component: () => import(/* webpackChunkName: "playJYAicc" */'../page/playJYAicc.vue'),
    meta: { title: '精英课程播放' }
  },
  // h5播放
  {
    name: 'playH5',
    path: '/playH5',
    component: () => import(/* webpackChunkName: "playH5" */'../page/playH5.vue'),
    meta: { title: 'h5课程播放' }
  },
  // 打开app
  {
    name: 'openApp',
    path: '/openApp',
    component: () => import(/* webpackChunkName: "openApp" */'../page/openApp.vue'),
    meta: { title: '打开App' }
  },
  // 我的收藏
  {
    name: 'myCollect',
    path: '/myCollect',
    component: () => import(/* webpackChunkName: "myCollect" */'../page/myCollect.vue'),
    meta: { title: '我的收藏' }
  },
  // 学习档案
  {
    name: 'learningPortfolio',
    path: '/learningPortfolio',
    component: () => import(/* webpackChunkName: "learningPortfolio" */'../page/learningPortfolio.vue'),
    meta: { title: '学习档案' }
  },
  // 考试记录
  {
    name: 'examHistory',
    path: '/examHistory',
    component: () => import(/* webpackChunkName: "examHistory" */'../page/examHistory.vue'),
    meta: { title: '考试记录' }
  },
  // 成果展示
  {
    name: 'resultShow',
    path: '/resultShow',
    component: () => import(/* webpackChunkName: "resultShow" */'../page/resultShow.vue'),
    meta: { title: '成果展示' }
  },
  // 成果展示详情
  {
    name: 'resultShowDetail',
    path: '/resultShowDetail',
    component: () => import(/* webpackChunkName: "resultShowDetail" */'../page/resultShowDetail.vue'),
    meta: { title: '成果展示详情' }
  },
  // 成果展示搜索
  {
    name: 'resultShowSearch',
    path: '/resultShowSearch',
    component: () => import(/* webpackChunkName: "resultShowSearch" */'../page/resultShowSearch.vue'),
    meta: { title: '成果展示搜索' }
  },
  // 笔记详情
  {
    name: 'notesDetail',
    path: '/notesDetail',
    component: () => import(/* webpackChunkName: "notesDetail" */'../page/notesDetail.vue'),
    meta: { title: '笔记详情' }
  },
  // 通知详情
  {
    name: 'noticeList',
    path: '/noticeList',
    component: () => import(/* webpackChunkName: "noticeListPage" */'../page/noticeListPage.vue'),
    meta: { title: '通知公告' }
  },
  // 通知详情
  {
    name: 'noticeDetail',
    path: '/noticeDetail',
    component: () => import(/* webpackChunkName: "noticeDetail" */'../page/noticeDetail.vue'),
    meta: { title: '通知详情' }
  },
  // error
  {
    name: 'error',
    path: '/error',
    component: () => import(/* webpackChunkName: "error" */'../page/error.vue'),
    meta: { title: 'error' }
  },
  { path: '*', redirect: '/error' }
]
