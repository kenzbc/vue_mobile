import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Match from '../views/Match.vue'
// import My from '../views/My-old.vue'
// import Mall from '../views/Mall-old.vue'
// import Rank from '../views/Rank.vue'
import DataPlayer from '../views/DataPlayer.vue'
import ChoosePlayer from '../views/ChoosePlayer.vue'
import Create from '../views/Create.vue'
import CreatePlayer from '../views/createPlayer.vue'
import RoomInfo from '../views/RoomInfo.vue'
import Selected from '../views/Selected.vue'
//import MyRecord from '../components/my/record.vue'
import Message from '../components/message.vue'
import squad from '../components/my/squad.vue'
import Login from '../components/login.vue'
import mySquad from '../components/mySquad.vue'
import myWallet from '../components/myWallet.vue'
import DiamondList from '../views/DiamondList.vue'
import Tickets from '../views/Tickets.vue'
import Key from '../views/Key.vue'
import ticket_log from '../views/ticket_log.vue'
import Vs from '../views/Vs.vue'
import Mode from '../views/Mode.vue'
import Group from '../views/Group.vue'
import Setting from '../views/Setting.vue'
import GoodsDetail from '../components/goodsDetail.vue'
import Address from '../components/address.vue'
import AddAddress from '../components/addAddress.vue'
import EditorAddress from '../components/editorAddress.vue'
import ChoiceAddress from '../components/choiceAddress.vue'
import MatchRoom from '../components/matchRoom'
import InviteCode from '../components/inviteCode'
import Success from '../components/success'
import Goods from '../components/goods'
import Sign from '../views/sign.vue'
import Cheer from '../views/cheer.vue'


export default new Router({
  mode: 'history',
  routes: [
    // {path: '/', name: 'home', component: Home, meta: {navShow: true, auth: false}},
    // {path: '/home-old', redirect: '/', meta: {auth: false}},
    // {path: '/room-old', name: 'room', component: Room, children: [{ path: '/room/match',name: 'match', component: Match}]},
    // {path: '/my-old', name: 'my', component: My, meta: {navShow: true}},
    // {path: '/mall-old', name: 'mall', component: Mall, meta:{navShow:true}},

    {path: '/choosePlayer', name: 'choosePlayer', component: ChoosePlayer},
    {path: '/dataPlayer', name: 'dataPlayer', component: DataPlayer},
    {path: '/selected', name: 'selected', component: Selected},
    {path: '/match', name: 'match', component: Match},
    {path: '/create', name: 'create', component: Create},
    {path: '/createPlayer', name: 'createPlayer', component: CreatePlayer},
    {path: '/RoomInfo', name: 'RoomInfo', component: RoomInfo},
    //{path: '/myRecord', name: 'myRecord', component: MyRecord, meta: {navShow: true}},
    {path: '/message', name: 'message', component: Message},
    {path: '/squad', name: 'squad', component: squad},
    {path: '/mysquad', name: 'mysquad', component: mySquad},
    {path: '/myWallet', name: 'myWallet', component: myWallet},
    {path: '/diamondList', name: 'diamondList', component: DiamondList},
    {path: '/Tickets', name: 'Tickets', component: Tickets},
    {path: '/key', name: 'key', component: Key},
    {path: '/ticket_log', name: 'ticket_log', component: ticket_log},
    {path: '/vs', name: 'vs', component: Vs},
    {path: '/group', name: 'group', component: Group},
    {path: '/setting', name: 'setting', component: Setting},
    {path: '/mode', name: 'mode', component: Mode},
    {path: '/login', name: 'login', component: Login},
    {path: '/goodsDetail', name: 'goodsDetail', component: GoodsDetail},
    {path: '/address', name: 'address', component: Address},
    {path: '/addAddress', name: 'addAddress', component: AddAddress},

    {path: '/editorAddress', name: 'editorAddress', component: EditorAddress},
    {path: '/choiceAddress', name: 'choiceAddress', component: ChoiceAddress},
    //阵容匹配房间（阵容提交完成后，快速加入）
    {path: '/matchRoom', name: 'matchRoom', component: MatchRoom},


    {path: '/inviteCode', name: 'inviteCode', component: InviteCode},
    {path: '/success', name: 'success', component: Success},
    {path: '/goods', name: 'goods', component: Goods},
    {path: '/sign', name: 'sign', component: Sign},
    {path: '/cheer', name: 'cheer', component: Cheer},


    //峡谷时刻
    {path: '/Canyon', name:'Canyon',
      component: (resolve) => require(['@/views/Canyon'], resolve),
      meta:{title:'峡谷时刻'}},
    {path: '/CanyonList', name:'CanyonList',
      component: (resolve) => require(['@/views/CanyonList'], resolve),
      meta:{title:'游戏记录',keepAlive: true}},
    {path: '/CanyonListDetail', name:'CanyonListDetail',
      component: (resolve) => require(['@/views/CanyonListDetail'], resolve),
      meta:{title:'游戏记录详情'}},
    {path: '/CanyonRankingList', name:'CanyonRankingList',
      component: (resolve) => require(['@/views/CanyonRankingList'], resolve),
      meta:{title:'游戏排行榜'}},
    //峡谷时刻


    //Tabbar
    {path: '/', name:'home', component: Home, meta:{title:'首页',navShow: true}},
    {path: '/home', name:'home',component: Home, meta:{title:'首页',navShow: true}},

    {path: '/my', name:'my',
      component: (resolve) => require(['@/views/My'], resolve),
      meta:{title:'我的',navShow: true}},
    {path: '/mall', name:'mall',
      component: (resolve) => require(['@/views/Mall'], resolve),
      meta:{title:'商城',navShow: true}},
    {path: '/rank', name: 'rank',
      component: (resolve) => require(['@/views/Rank.vue'], resolve),
      meta: {navShow: true}},


    //房间列表
    {path: '/Room', name:'Room',
      component: (resolve) => require(['@/views/Room'], resolve),
      meta:{title:'房间列表'}},
    {path: '/RoomDetail', name:'RoomDetail',
      component: (resolve) => require(['@/views/RoomDetail'], resolve),
      meta:{title:'房间详情'}},
    {path: '/RoomInfo2', name:'RoomInfo2',
      component: (resolve) => require(['@/views/RoomInfo2'], resolve),
      meta:{title:'房间信息'}},

    //选手详情
    {path: '/PlayerDetail', name:'PlayerDetail',
      component: (resolve) => require(['@/views/PlayerDetail'], resolve),
      meta:{title:'选手详情'}},

    //战绩
    {path: '/MyRecord', name:'MyRecord',
      component: (resolve) => require(['@/views/MyRecord'], resolve),
      meta:{title:'战绩'}},

    //商城
    {path: '/MallGoodsDetail', name:'MallGoodsDetail',
      component: (resolve) => require(['@/views/MallGoodsDetail'], resolve),
      meta:{title:'商品详情'}},
    {path: '/record', name: 'record', component: (resolve) => require(['@/components/record.vue'], resolve),
      meta:{title:'兑换记录'}},


    {path: '/TicketDetail', name:'TicketDetail',
      component: (resolve) => require(['@/views/TicketDetail'], resolve),
      meta:{title:'战绩'}},




  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
