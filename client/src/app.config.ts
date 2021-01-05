export default {
  pages: [
    'pages/my/index',
    'pages/cloud/list/index',
    
    'pages/index/index',
    'pages/login/index',
    'pages/agreement/user/index',
    'pages/agreement/privacy/index',
    'pages/comProblem/index'
  ],
  tabBar: {
    list: [{
      'iconPath': 'resource/group-chat-backup.png',
      'selectedIconPath': 'resource/group-chat-backup-on.png',
      pagePath: 'pages/index/index',
      text: '群聊备份'
    }, {
      'iconPath': 'resource/my.png',
      'selectedIconPath': 'resource/my-on.png',
      pagePath: 'pages/my/index',
      text: '我的'
    }],
    'color': '#CFD0D9',
    'selectedColor': '#FF6836',
    'backgroundColor': '#fff',
    'borderStyle': 'black'
  },
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#EDEDED',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  cloud: true
}
