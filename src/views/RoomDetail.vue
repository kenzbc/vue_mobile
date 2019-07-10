<template>
  <div>
    <head-top :head-title="newRoomInfo.name" is-share="true"></head-top>

    <div class="head-date">
      <div class="date">
        <div class="text">-距离截止时间还剩-</div>
        <count-down @time-end="message = '倒计时结束'" :endTime='newRoomInfo.at_end_time'></count-down>
        <div class="text">{{newRoomInfo.room_desc}}</div>
      </div>

      <div class="head-subtitle">
        <div class="item">
          <span>{{newRoomInfo.at_times}}/{{newRoomInfo.num}}</span>
          <span>参与人数</span>
        </div>
        <div class="item">
          <span>{{newRoomInfo.price}}</span>
          <span>
            入场费
          </span>

        </div>

        <div class="item" v-if="checkShow" @click="checkRoom()"><div class="select-btn">选择房间</div></div>
        <div class="item" v-else-if="newRoomInfo.member_at_times>0" @click="matchBtn(newRoomInfo.ticket,newRoomInfo.price)"><div class="select-btn">已参与{{newRoomInfo.member_at_times}}/{{newRoomInfo.times}}</div></div>
        <div class="item" v-else @click="matchBtn(newRoomInfo.ticket,newRoomInfo.price)"><div class="select-btn">挑选阵容</div></div>
      </div>
    </div>


    <div class="head-menu">
      <div class="tab-item" @click="toggleList(index ,tab.view)" v-for="(tab,index) in tabs" :key="index" v-bind:class="{'active':status==index}">
        <span class="title">{{tab.type}}</span>
        <span class="dot"></span>
      </div>
    </div>

    <component :is="currentView"></component>



    <!--新手引导弹层-->
    <div style="display:none;" class="tutorial">
      <div class="content">

        <div class="head-subtitle">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"><div class="select-btn">挑选阵容</div></div>
        </div>
        <div class="desc-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text" style="text-align:left;">挑选选手完成 你的布阵。</div>
        </div>

        <div class="desc2">比赛列表</div>
        <div class="desc-text2">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text" style="text-align:left;">查看该房间关联的 真实比赛场次。</div>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
  import Vue from "vue";
  import store from "store";
  import HeadTop from "../components/header.vue";
  import Countdown from "../components/CountDown2.vue";
  import MatchList from "../views/RoomDetailList.vue";
  import Money from "../components/room/money.vue";
  import Users from "../components/RoomInfo/UserList.vue";
  import Rules from "../components/room/rules.vue";
  import DialogExchange from "../components/dialogExchange.vue";
  export default {
    name: "RoomDetail",
    data() {
      return {
        status: 0,
        currentView: "MatchList",
        tabs: [
          {
            type: "比赛列表",
            view: "MatchList"
          },
          {
            type: "奖金分配",
            view: "Money"
          },
          {
            type: "参与用户",
            view: "Users"
          },
          {
            type: "积分规则",
            view: "Rules"
          }
        ],
        room_info: {},
        shareType: "",
        shareType1: "",
        linkUrl: "",
        maskShow: false,
        checkShow: false,
        vShow: false,
        checkArray: [],
        my_bank: "",
        exchangeShow:false,
        exchangeData:{
          status:3, //来源   1：home/match  2.商城
          tickets:'',  //门票
          mengbi_count:'',
          lastExchangeDate:'',
          is_exchange:0,
          is_exchange_text:'兑换'
        },
        newRoomInfo:{
          at_times:'444'
        },
        //      isRoomInfoError:true,
        isWatchSuccess:true,
      };
    },
    components: {
      MatchList,
      Money,
      Users,
      Rules,
      headTop: HeadTop,
      countDown: Countdown,
      dialogExchange: DialogExchange
    },
    created() {
      this.$repeatLogin();
      // this.$Login();
      this.$root.hub.$on("loginSuccess", _ => {
        if (this.isWatchSuccess == true) {
          this.RoomInfoData();
        }
        if(store.get('member_info').is_new_user == '1'){
          var get_new_player = store.get("new_player") ? store.get("new_player") : "";
          if (
            this.$route.query.experience &&
            get_new_player.indexOf(this.$route.path) < 0
          ) {
            //store.get('new_player').indexOf('is_experience') < 0
            this.$router.push({
              path: "/selected",
              query: {
                roomID: this.$route.query.roomID,
                experience: this.$route.query.experience
              }
            });
          }
        }
      });
      if (this.$route.query.index != undefined) {
        this.checkShow = true;
      }
    },
    mounted () {
      if (this.member){
        this.RoomInfoData();
      }
    },
    computed: {
      member () {
        return this.$store.state.member
      },
      roomData () {
        return this.$store.state.roomData
      },
      cacheRoomInfo () {
        return this.roomData.roomDetailHashMap[this.$route.query.roomID]
      },
      roomInfo () {
        if (this.cacheRoomInfo) {
          return this.cacheRoomInfo
        } else {
          return this.roomData.listArray.find(room => this.$route.query.roomID == room.roomID)
        }
      },
    },
    methods: {
      checkRoom() {
        var index = this.$route.query.index;
        this.checkArray[index] = this.$route.query.roomID;
        store.set("checkArray", this.checkArray);
        this.$router.push({
          path: "/matchRoom",
          query: {
            orderId: this.$route.query.orderId,
            homeId: this.$route.query.homeId
          }
        });
      },
      change(msg) {
        if (msg == 1){
          this.exchangeShow = false;
        } else {
          this.exchangeShow = msg;
        }
      },
      hideMask() {
        this.maskShow = false;
      },
      getDomain() {
        var domain = document.domain;
        if (/^\w*(.famulei.com)$/.test(document.domain)) {
          domain = "http://" + document.domain;
        }
        return domain;
      },
      myBank() {
        let _this = this;
        this.$api("/services/userCenter/my_bank.php", {}).then(response => {
          if (response.code == 200) {
            _this.my_bank = response.data;
            this.$root.hub.$emit("myBankSuccess");
          }
        });
      },
      RoomInfoData() {

        var _this = this;
        this.$api("/services/fantasy/room_info.php", {
          roomID: _this.$route.query.roomID
        }).then(response => {
          if (response.code != 200) {
            _this.isRoomInfoError = false;

            if (response.code != 40304) {
              _this.payList.msg_text = response.message;
              _this.payList.isGoRoom = true;
            }
          } else {
            _this.isRoomInfoError = true;
            _this.newRoomInfo = response.data;

            //判断是否加载完成
            _this.$root.hub.$emit('roomInfoSuccess');

            _this.isWatchSuccess = false;

            if (_this.roomInfo) {
              //            let MatchList = this.roomInfo.MatchList || [];
              let _roomInfo = _this.roomInfo;
              let reqRoomInfo = response.data;

              let filedArr = ['member_at_times', 'at_times']
              for (let i in filedArr) {
                let filed = filedArr[i]
                if (!_roomInfo[filed] || (_roomInfo[filed] && _this.md5(_roomInfo[filed]) !== _this.md5(reqRoomInfo[filed]))) {
                  _roomInfo[filed] = reqRoomInfo[filed]
                }
              }
              _this.pushEvent(store.get("loginInfo").type, "match", "room_" + _this.$route.query.roomID);
              store.set('roomList', _this.roomData.listArray);

              //            this.$store.commit("putRoomDetail", _roomInfo);
            }

          }
        });
      },
      matchBtn(ticket,price) {
        //      this.myBank();
        //      this.$root.hub.$on("myBankSuccess", _ => {
        if (parseInt(this.newRoomInfo.at_times) == parseInt(this.newRoomInfo.num)) {
          layer.open({
            content: "房间已满，无法参与",
            btn: "关闭"
          });
        } else if (parseInt(this.newRoomInfo.member_at_times) == parseInt(this.newRoomInfo.times)) {
          layer.open({
            content: "已达到参与上限",
            btn: "关闭"
          });
        } else {
          store.remove("user");
          store.remove("matches");
          store.remove("group");



          if (store.get("member_info").ticketCount && store.get("member_info").ticketCount != ticket) {
            ticket = store.get("member_info").ticketCount;
          }
          if ((parseInt(ticket) - parseInt(price)) < 0) {
            if (store.get("member_info") && store.get("member_info").lastExchangeDate ) {
              if (store.get("member_info").lastExchangeDate == this.getTodayDate()){
                this.exchangeData.status = 1;
              }
            }
            this.exchangeData.status = 1;
            this.exchangeData.tickets = store.get("member_info").ticketCount;
            this.exchangeData.mengbi_count = store.get("member_info").mengbi_count;
            this.exchangeData.lastExchangeDate = store.get("member_info").lastExchangeDate;
            this.exchangeShow = true;
          } else {
            if (this.$route.query.experience) {
              this.$router.push({
                path: "/selected",
                query: {
                  roomID: this.$route.query.roomID,
                  experience: this.$route.query.experience
                }
              });
            } else {
              this.$router.push({
                path: "/selected",
                query: {
                  roomID: this.$route.query.roomID
                }
              });
            }
          }
        }
        //      });
      },
      toggleList(index) {
        this.status = index;
        if (this.status == 0) {
          this.currentView = "MatchList";
        } else if (this.status == 1) {
          this.currentView = "Money";
        } else if (this.status == 2) {
          this.currentView = "Users";
        } else if (this.status == 3) {
          this.currentView = "Rules";
        }
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" scoped>
  /* 新手引导 */
  .tutorial{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;

      .head-subtitle{
        margin-top:250px;
        padding:0 40px;
        display flex;
        justify-content space-between;
        align-items center;
        color:#fff;

        .item{
          width 200px;
          display flex;
          justify-content center;
          align-items center;
          flex-wrap:wrap;

          span{
            width 100%;
            display block;
            text-align center;
          }
          span:last-child{
            color:#B5B1FF;
            font-size:22px;
          }

          .select-btn{
            width:192px;
            height:72px;
            line-height @height;
            text-align center;
            font-family: 'Semibold';
            background:#fff;
            border-radius:12px;
            font-size:28px;
            color:#5F58F6;
          }
        }

      }


      .desc-text{
        padding:0px 28px 28px;
        width: 260px;
        right: 15px;
        position: absolute;

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }


      .desc2{
        width: 160px;
        height: 60px;
        background: #fff;
        margin-left: 28px;
        text-align: center;
        line-height: 60px;
        color: #5f58f6;
        font-size: 26px;
        margin-top: 24px;
        font-weight: bold;
      }
      .desc-text2{
        padding: 0px 28px 28px;
        width: 260px;
        left: 0px;
        position: absolute;

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align: left;
          padding-left: 70px;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }
    }


    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

  }





  @font-face {
    font-family: 'DIN-Condensed-Bold';
    src: url('../../static/css/DINCondensedBold.ttf'); /* IE9 Compat Modes */
    src: url('../../static/css/DINCondensedBold.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../../static/css/DINCondensedBold.ttf') format('woff'), /* Modern Browsers */
      url('../../static/css/DINCondensedBold.ttf')  format('truetype'), /* Safari, Android, iOS */
      url('../../static/css/DINCondensedBold.ttf') format('svg'); /* Legacy iOS */
  }
  @font-face {
    font-family: 'Semibold';
    src: url('../../static/css/Semibold.ttf'); /* IE9 Compat Modes */
    src: url('../../static/css/Semibold.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../../static/css/Semibold.ttf') format('woff'), /* Modern Browsers */
      url('../../static/css/Semibold.ttf')  format('truetype'), /* Safari, Android, iOS */
      url('../../static/css/Semibold.ttf') format('svg'); /* Legacy iOS */
  }

  .mt-10{margin-top:20px;}
  .pd-10{padding:20px;}
  .pd-14{padding:28px;}

  .head-date{
    height:346px;
    background:#5348FF;

    .date{
      padding-top:44px;
      text-align:center;

      .time{
        padding-top:12px;
        position:relative;
        color:#fff;
        font-family: 'DIN-Condensed-Bold';

        .colon{
          display inline-flex;
          align-items:flex-start;
          width 30px;
          height:50px;
          position relative;
          span{
            position: absolute;
            font-size: 84px;
            height: 40px;
            top: -33px;
            left: 7px;
          }
        }
        .hour,.minute,.second{
          padding:32px 10px 8px 10px;
          background: #fff;
          color: #5348ff;
          font-size: 84px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          line-height: 80px;
        }
      }

      .text{
        padding-top:12px;
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        line-height:32px;
        color:#fff;
      }
    }


    .head-subtitle{
      margin-top:30px;
      padding:0 40px;
      display flex;
      justify-content space-between;
      align-items center;
      color:#fff;

      .item{
        width 200px;
        display flex;
        justify-content center;
        align-items center;
        flex-wrap:wrap;

        span{
          width 100%;
          display block;
          text-align center;
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#fff;
          line-height:40px;
        }
        span:last-child{
          font-size:22px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#B5B1FF;
          line-height:32px;
        }

        .select-btn{
          width:192px;
          height:72px;
          line-height @height;
          text-align center;
          font-family: 'Semibold';
          background:#fff;
          border-radius:12px;
          font-size:28px;
          color:#5F58F6;
        }
      }

    }

  }


  .head-menu{
    padding:0 24px;
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
      top:30px;
      left:63px;
    }

  }


  .title{
    color:#B2B0D2;
  }



</style>
