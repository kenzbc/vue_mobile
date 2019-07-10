<template>

  <div style="padding-bottom:80px;">
    <head-top
      :headTitle="title"
      go-back="true"
      :is-share="isShare"
      :is-show-btn = "isShowBtn"
      :is-status = "status"
      @getChange = "shareChange"
      :finkRoom = "status == 0 ? true : false"
      is-share="true"
    ></head-top>

    <div class="head-menu">
      <div class="tab-item" v-if="status==0" @click="toggleList(index ,tab.view)" v-for="(tab,index) in tabs" :class="{'active':list_num==index}">
        <span class="title">{{tab.type}}</span>
        <span class="dot"></span>
      </div>

      <div class="tab-item" v-if="status==1" @click="toggleList(index ,tab.view)" v-for="(tab,index) in tabs" :class="{'active':list_num==index}">
        <span class="title">{{tab.type}}</span>
        <span class="dot"></span>
      </div>

      <div class="tab-item" v-if="status==2" @click="toggleList(index ,tab2.view)" v-for="(tab2,index) in tabs2" :class="{'active':list_num==index}">
        <span class="title">{{tab2.type}}</span>
        <span class="dot"></span>
      </div>

    </div>



    <component @statusChange="titleStatus" :msg="msg" :is="currentView"></component>
    <share v-if="isShare" @dialogHide="change" :msg="isShare" :share-data="shareData"></share>

  </div>
</template>

<script>
  import Vue from 'vue'
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import GameDate from '../components/RoomInfo/GameData.vue' //阵容数据
  import MatchList from '../components/RoomInfo/MatchList.vue' //比赛列表
  import Message from '../components/message.vue'
  import Users from '../components/RoomInfo/UserList.vue' //参与玩家
  import Integral from '../components/RoomInfo/Integral.vue' //积分排名
  import Share from '../components/share.vue'

  export default {
    name: 'RommInfo2',
    data () {
      return {
        status: '',
        roomID: '',
        title: '',
        msg: {},
        list_num: 0,
        currentView: 'GameDate',
        tabs: [
          {
            type: '阵容数据',
            view: 'GameDate'
          },
          {
            type: '比赛列表',
            view: 'MatchList'
          },
          // {
          //   type: '小道消息',
          //   view: 'Message'
          // },
          {
            type: '参与玩家',
            view: 'Users'
          }
        ],
        tabs2: [
          {
            type: '阵容数据',
            view: 'GameDate'
          },
          {
            type: '比赛列表',
            view: 'MatchList'
          },
          {
            type: '积分排名',
            view: 'Integral'
          },
          {
            type: '参与玩家',
            view: 'Users'
          }
        ],

        isShare:'',
        isShowBtn:'',
        shareData:{
          secret_key:'',
          member_nickname:'',
          title:''
        }
      }
    },
    components: {
      GameDate,
      MatchList,
      // Message,
      Users,
      Integral,
      headTop: HeadTop,
      Share,
    },
    created(){
      let member_info = store.get('member_info');
      if(member_info == undefined){
        this.$router.push({path:'/home'});
      }
//      if (JSON.parse(sessionStorage.getItem('avatar')) == null) {
//        this.$router.push({path: '/room'});
//      } else {
//        if (JSON.parse(sessionStorage.getItem('avatar')) == '') {
//          this.$router.push({path: '/room'});
//        }
//      }
    },
    mounted: function () {
      this.getUrl()
    },
    watch: {
      '$route': 'getUrl'
    },
    methods: {
      shareChange(msg){
        this.isShare = msg;
      },
      toggleList(index) {
        this.list_num = index;
        if (this.list_num == 0) {
          this.currentView = "GameDate";
        } else if (this.list_num == 1) {
          this.currentView = "MatchList";
        } else if (this.list_num == 2) {
          if (this.status == 2) {
            this.currentView = "Integral";
          } else {
            this.currentView = "Users";
          }
        } else if (this.list_num == 3) {
          this.currentView = "Users";
        }
      },
      change(msg){
        this.isShare = msg
      },
      getUrl(){

        if(this.$route.query.secret_key){
          this.isShare = true;
          this.isShowBtn = true;
          this.shareData.secret_key = this.$route.query.secret_key;
        }
        this.list_num = 0;
        this.status = this.$route.query.status;
        if( this.$route.query.roomID){
          this.roomID = this.$route.query.roomID;
        }
        this.orderId = this.$route.query.orderId;
        this.title = this.$route.query.title;
        this.toggleList(0);
      },
      titleStatus(msg){
        this.title = msg.title;
        this.shareData.title = msg.title;
        this.status = msg.status;
        if(msg.secret_key && this.$route.query.secret_key == undefined){
          this.shareData.secret_key = msg.secret_key;
          this.isShare = false;
          this.isShowBtn = true;
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .c-blue{
    color:#5348FF;
  }
  .c-light-blue{
    color:#B2B0D2;
  }


  .head-menu{
    padding:0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height 84px;
    background #fff;

    .tab-item{
      flex-shrink:0;
      display:block;
      width:140px;
      /*height: 40px;*/
      line-height: 20px;
      text-align: center;
      color: #B2B0D2;
      position: relative;

      .title{
        font-size: 28px;
        font-family: "PingFang SC";
      }
    }
    .tab-item.active{
      .title{
        color: #5348FF;
        font-weight bold;
      }
    }
    .tab-item.active span.dot{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      background: #5348FF;
      position:absolute;
      bottom: -20px;
      left:63px;
    }

  }


  .date{
    padding:14px 28px 6px 28px;
    display flex;
    justify-content center;
    align-items center;
    color:#B2B0D2;
    font-size:28px;

    span{
      margin:10px;
      font-size:28px;
      font-weight bold;
    }
    span:first-child{
      font-size:22px;
    }


  }

  .head-title{
    display flex;
    align-items center;
    justify-content space-between;
    color:#B2B0D2;
    font-size:22px;
    margin-bottom:10px;


    span {
      span {
        color:#5348FF;
      }
    }

  }





</style>
