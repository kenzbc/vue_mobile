// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './vuex'
import moment from 'moment'
import md5 from 'md5'

Vue.use(router);

import icon from './components/icon'
Vue.component('icon', icon);

//位置ICON
import PositionIcon from './components/PositionIcon.vue';
Vue.component('position-icon',PositionIcon);

//房间类型ICON
import RoomTypeIcon from './components/RoomTypeIcon.vue';
Vue.component('room-type-icon',RoomTypeIcon);

//选手组件（位置、得分、背景、头像、昵称、团队）
import PlayerItem from "./components/PlayerItem.vue";
Vue.component('player-item',PlayerItem);

//选手状态
import PlayerStatus from './components/PlayerStatus.vue';
Vue.component('player-status',PlayerStatus);

//下拉刷新
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);

import axios from 'axios'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import '../static/js/script'

import '../static/js/jquery-1.12.2.min.js'
import * as filters from './filters/'
import util from './util/index.js'
import qs from 'qs'
import store from 'store'

require('swiper/dist/css/swiper.css');
Vue.prototype.md5 = md5;

// // 引入mockjs
// import './mock.js'


//上拉加载下拉刷新插件
Vue.use(VueScroller);

//声明是否调用接口
Vue.prototype.isLoginApi = false;
//新手引导变量
// Vue.prototype.mallListLight = false;
Vue.use(util);
Vue.config.productionTip = false;
let hub = Vue.prototype.hub = Vue.prototype.hub || new Vue();


Object.keys(filters).forEach(k => Vue.filter(k, filters[k])); // 注册过滤器
FastClick.attach(document.body);

let root = process.env.API_ROOT;
let HOST = '/services/';
if (location.hostname === 'img1.famulei.com') {
  HOST = '//www.famulei.com' + HOST
}
Vue.filter('datetime', function (value, format) {
  return moment(value, 'X').format(format || 'YYYY-MM-DD HH:mm:ss')
});
let token = '';
Vue.prototype.ajax = function () {
  const HOST = '/services/fantasy/';
  let _params = {};
  let _method = 'get';
  let _then = null;
  let _catch = null;
  for (let i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      _method = arguments[i]
    } else if (typeof arguments[i] === 'object') {
      _params = arguments[i]
    } else if (typeof arguments[i] === 'function' && !_then) {
      _then = arguments[i]
    } else if (typeof arguments[i] === 'function' && !_catch) {
      _catch = arguments[i]
    }
  }
  let _host = HOST;
  let url = arguments[0];

  let aliApi = ['/player/', '/tournament/'];


  if (url.indexOf('/services/') == 0) {
    _host = ''
  } else {
    for (let i in aliApi) {
      if (url.indexOf(aliApi[i]) != -1) {
        _host = 'https://img1.famulei.com';
        if (location.hostname != 'www.famulei.com' && location.hostname != 'm.lfl.gg') {
          url = url.replace(aliApi[i], aliApi[i] + 'test/');
        }
        break;
      }
    }
  }

  let _config = {
    method: _method,
    url: url,
    baseURL: _host,
  };
  if (_method === 'get') {
    _config.params = _params
  } else {
    _config.data = qs.stringify(_params)
  }

  return axios(_config).then(_then).catch(_catch)

};

Vue.prototype.$http = axios;

// 获取当前年月日
Vue.prototype.getTodayDate = function (){
	var newDate = new Date();
	var year= newDate.getFullYear();
	var month= newDate.getMonth() +1;
	var date = newDate.getDate();
	var hours = newDate.getHours();
	var min = newDate.getMinutes();
	if (month < 10) month = '0' + month;
	if (date < 10) date = '0' + date;
	if (hours < 10) hours = '0' + hours;
	if (min < 10) min = '0' + min;
	var todayDate = year + '-' + month + '-' + date;
	// var todayDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min;//测试使用
    return todayDate;
};
// 获取登录信息
Vue.prototype.$repeatLogin = function () {

  let member = vuex.state.member;
  //兑换按钮 isLoginApi = true
  if (!member || this.isLoginApi ) {
    //处理ZM version
    // console.log(this.$route.query.v);
    if(this.$route.query.v){
      store.set('version',this.$route.query.v);
    }
    //处理loginInfo
    var loginInfo = store.get('loginInfo');
    if (loginInfo == undefined) {
      if (this.$route.query.open_uuid && this.$route.query.open_token ) {
        var loginInfo = {
          open_uuid: this.$route.query.open_uuid,
          open_token: this.$route.query.open_token,
          type: 4
        };
        store.set('loginInfo', loginInfo);
      }
    } else {
      if(this.$route.query.open_uuid && this.$route.query.open_uuid != loginInfo.open_uuid) {
        store.remove('IS_SIGN');
        store.remove('orderInfo');
        store.remove('member_info');
        store.remove('roomList');
      }
    }

    this.$api('/services/qw/get_user_info.php', loginInfo).then(response => {
      if (response.code == 200) {
        let member_info = response.data;
        let time = new Date();
        let endTime = time.getTime();
        Vue.set(member_info, 'endTime', endTime);
        store.set('member_info', member_info);
        this.$store.commit('set', {
          key: 'member',
          val: member_info
        });
        this.$store.commit('set', {
          key: 'token',
          val: member_info.w_token
        });
        this.$root.hub.$emit('loginSuccess');
      }
    });
  }
};

Vue.prototype.$refreshUserInfo = function(){
  //处理loginInfo
  var loginInfo = store.get('loginInfo');
  if (loginInfo == undefined) {
    if (this.$route.query.open_uuid && this.$route.query.open_token ) {
      var loginInfo = {
        open_uuid: this.$route.query.open_uuid,
        open_token: this.$route.query.open_token,
        type: 4
      };
      store.set('loginInfo', loginInfo);
    }
  } else {
    if(this.$route.query.open_uuid && this.$route.query.open_uuid != loginInfo.open_uuid) {
      store.remove('IS_SIGN');
      store.remove('orderInfo');
      store.remove('member_info');
      store.remove('roomList');
    }
  }

  this.$api('/services/qw/get_user_info.php', loginInfo).then(response => {
    if (response.code == 200) {
      let member_info = response.data;
      let time = new Date();
      let endTime = time.getTime();
      Vue.set(member_info, 'endTime', endTime);
      store.set('member_info', member_info);
      this.$store.commit('set', {
        key: 'member',
        val: member_info
      });
      this.$store.commit('set', {
        key: 'token',
        val: member_info.w_token
      });
      this.$root.hub.$emit('loginSuccess');
    }
  });

};

Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
};


// Vue.prototype.refreshLink = function () {
//   this.$router.push({
//     path: '/login'
//   });
// };
//json接口环境
Vue.prototype.EVN = function () {
  let evn = "";
  if (location.hostname == "dev-lfl.scoregg.net") {
    evn = "dev-lfl-api.scoregg.net/json/";
  }else if(location.hostname == "staging-lfl.famulei.com"){
    evn = "staging-lfl-api.famulei.com/json/";
  } else if(location.hostname == 'lfl.scoregg.net' ) {
    evn = 'lfl-api.scoregg.net/json/'
  }else if(location.hostname == 'localhost' ) {
    evn = 'staging-lfl-api.famulei.com/json/'
  }
  return '//' + evn;
};
//第三方登录接口判断
Vue.prototype.domain = function () {
  let url = '';
  let host = {
    'localhost': 'dev',
    'm.lfl.gg': 'www',
    'staging-1m.lfl.gg': 'staging-1',
    'staging-2m.lfl.gg': 'staging-2',
    'staging-3m.lfl.gg': 'staging-3',
    'dev-m.lfl.gg': 'dev',
  };
  let prefix = host[location.hostname] || 'staging-1';
  url = 'http://' + prefix + '.famulei.com';
  return url
};

Vue.prototype.lflmain = function () {
  let url = '';
  let host = {
    'localhost': 'dev-m',
    'm.lfl.gg': 'm',
    'staging-1m.lfl.gg': 'staging-1m',
    'staging-2m.lfl.gg': 'staging-2m',
    'staging-3m.lfl.gg': 'staging-3m',
    'dev-m.lfl.gg': 'dev-m',
  };
  let prefix = host[location.hostname] || 'staging-1m';
  url = 'http://' + prefix + '.lfl.gg';
  return url
};

let isActive = false;
let refresh_stop = true;
Vue.prototype.$api = function () {

  let member_info = store.get('member_info');
  // console.log(member_info);
  let loginInfo = store.get('loginInfo');
  let curTime = '';
  if (member_info != undefined) {
    token = member_info.w_token;
    let time = new Date();
    let nowTime = time.getTime();
    let endTime = member_info.endTime;
    let vsTime = parseInt((nowTime - endTime)) / 1000;
    curTime = vsTime / 60 % 60;
    Vue.set(member_info, 'curTime', curTime);
    store.set('member_info', member_info);
  }
  let Base64 = require('js-base64').Base64;

  const HOST = {
    'lfl.scoregg.net': 'lfl-api.scoregg.net', //生产环境
    'staging-lfl.famulei.com': 'staging-lfl-api.famulei.com',//测试环境
    'dev-lfl.scoregg.net': 'dev-lfl-api.scoregg.net',
    'localhost': 'staging-lfl-api.famulei.com',//测试环境
    //'localhost': 'lfl-api.scoregg.net',//生产环境
    '172.16.0.122': 'staging-lfl-api.famulei.com',//测试环境
    'lfl.cn': 'staging-lfl-api.famulei.com',//测试环境
    'lfl.ufu.auan.cn': 'staging-lfl-api.famulei.com'//测试环境
  };

  let prefix = HOST[location.hostname];
  const _HOST = 'https://' + prefix;
  const KEY = 'FWAPIKFML';
  let _params = {};
  let errorFunction = null;

  for (let i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] === 'object') {
      _params = arguments[i];
    } else if (typeof arguments[i] === 'function' && !errorFunction) {
      errorFunction = arguments[i];
    }
  }

  let urlPath = '/services/webAPI/';
  let url = 'handler.php';

  let config = {
    method: 'post',
    url: urlPath + url,
    baseURL: _HOST,
  };

  if (member_info && member_info.member_id) {
    _params.member_id = member_info.member_id;
  } else {
    delete _params.member_id;
  }

  if (location.hostname.indexOf('localhost') != -1 || location.hostname.indexOf('staging') != -1 || location.hostname.indexOf('dev') != -1) {
    // console.log('')
    // console.log("%c API  Path %c "+ arguments[0] +" %c", "background:#333 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#4CAF50 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff", "background:transparent")
    // console.log("%c API Param %c "+ JSON.stringify(_params) +" %c", "background:#333 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#607D8B ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff", "background:transparent")
  }

  //判断安卓或者IOS 在掌盟链接 platform:ios/android
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
      _params.platform = 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      _params.platform = 'android';
    }

  _params.api_version = '5.1.1';
  _params.ts = moment().unix();

  if (arguments[0].indexOf('/services/qw/get_user_info.php') != -1) {
    _params.token = token;
    _params.member_id = '';
    config.method = 'get';
    config.url = arguments[0] + '?' + qs.stringify(_params)
  } else if (arguments[0].indexOf('refresh_token.php') != -1) {
    _params.token = token;
    config.method = 'get';
    config.url = arguments[0] + '?' + qs.stringify(_params)
  } else if (arguments[0].indexOf('api.mch.weixin.qq.com/pay/unifiedorder') != -1) {
    _params.token = token;
    config.method = 'POST';
    config.url = arguments[0] + '?' + qs.stringify(_params)
  } else {
    if (arguments[0].indexOf('/services/fantasy/get_member_room.php') != -1){
      config.method = 'get';
    }


    //接口改为直接调用API，传uuid和open
    _params.token = token;
    _params.open_uuid = store.get('loginInfo').open_uuid;
    _params.open_token = store.get('loginInfo').open_token;
    config.url = arguments[0] + '?' + qs.stringify(_params);
  }

  let ajax = axios(config).then(req => {
    if (req.data.code != 200) {
      if (errorFunction) {
        errorFunction(req.data)
      } else {
        if (req.data.code == 40500) {

          // this.$repeatLogin();
          if(refresh_stop){
            refresh_stop = false;
            this.$store.commit('set', {
              key: 'member',
              val: ''
            });
            this.$store.commit('set', {
              key: 'token',
              val: ''
            });
            store.remove('member_info');
            this.$repeatLogin();
            // this.$Login();
            refresh_stop = true
          }
        }
      }
    }
    return req.data;
  }).catch(error => {
    if (error.code == 'ECONNABORTED') {
      layer.open({
        content: '请求超时',
        btn: '关闭'
      });
    }
    return error
  });
  return ajax
};

Vue.prototype.pushEvent = function () {
  if (window._hmt) {
    let options = ['_trackEvent'];
    for (var i in arguments) {
      options.push(arguments[i])
    }
    window._hmt.push(options);
  }
};

// let roomCacheKey = 'roomData'
// Vue.prototype.ROOMCACHE = {
//   update(array) {
//     let cache = store.get(roomCacheKey)
//     cache.listArray = array
//     cache.hashMap = {}
//     for (let i in array) {
//       cache.hashMap[array[i].roomID] = array[i]
//     }
//     store.set(roomCacheKey, cache)
//     return cache
//   },
//   list() {
//     return store.get(roomCacheKey).listArray || []
//   },
//   hashMap() {
//     return store.get(roomCacheKey).hashMap || {}
//   },
//   getById(id) {
//     return store.get(roomCacheKey).hashMap[id] || undefined
//   },
//   setById(id, data) {
//     let cache = store.get(roomCacheKey)
//     cache.hashMap[id] = data
//     store.set(roomCacheKey, cache)
//   },
//   removeById(id) {
//     let cache = store.get(roomCacheKey)
//     delete cache.hashMap[id]
//     store.set(roomCacheKey, cache)
//   }
// }
// Vue.prototype.recommendButton=function(){
//   var _this = this;
//   if($route.query.roomID){
//     var roomID = store.get('roomID');
//     var room_id = roomID.roomID;
//   }else{
//     var room_id = ''
//   }
//   if(this.$route.query.group_id){
//     var groupID = this.$route.query.group_id
//   }else{
//     var groupID = '';
//   }
//   this.$api('/services/fantasy/recommend_lineup.php', {
//     roomID: room_id,
//     groupID:groupID,
//   }).then(response => {
//     if(response.code == 200){
//       if(response.data.list == ''){
//         layer.open({
//           content: '暂无灵活组排'
//           ,btn: '关闭'
//         });
//       }else{
//         _this.cur_player.TOP = response.data.list[0].top;
//         _this.cur_player.JUG = response.data.list[0].jun;
//         _this.cur_player.MID = response.data.list[0].mid;
//         _this.cur_player.ADC = response.data.list[0].adc;
//         _this.cur_player.SUP = response.data.list[0].sup;
//         store.set('user',{cur_player:_this.cur_player});
//         _this.curPlayer()
//       }
//     }else{
//       layer.open({
//         content: response.data.message
//         ,btn: '关闭'
//       });
//     }
//   })
// },
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
// router.beforeEach((to, from, next) => {
  //
  // let params = to.query
  // if (params.token != null && params.member_id != null) {
  //   store.commit('setMemberItem', {key: 'token', val: params.token})
  //   store.commit('setMemberItem', {key: 'member_id', val: params.member_id})
  // }

  // let {
  //   auth = true
  // } = to.meta;

  // if (to.query.uuid && to.query.key) {
  //   vuex.state.auth = to.query
  // }

  // let isLogin = Boolean(store.state.token);
  // if (auth && !isLogin) {
  //   hub.$emit('loginSuccess');
  //   console.log(from.path);
  //   return next({path: from.path})
  // }

//   next()
// });

router.afterEach( ( to, from, next ) => {
  setTimeout(()=>{
  var _hmt = _hmt || [];
  (function() {
    //每次执行前，先移除上次插入的代码
    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?1a660c478b94c2163d5386922f4d9000";
    hm.id = "baidu_tj"
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
},0)
} )

new Vue({
  el: '#app',
  store: vuex,
  router,
  render: h => h(App)
});
