<template>
  <div class="anim-opacity2">
    <!--<div class="myRecord-head">-->
     <!--<head-top-->
        <!--head-title="我的战绩"-->
        <!--go-back="true"-->
      <!--&gt;</head-top>-->
    <!--</div>-->
    <div class="my-info">
      <router-link :to="{ path:'/ticket_log', query: { log_type: 0} }">
      <div class="my-info-ticket">
        <svg class="my-info-icon" aria-hidden="true">
          <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
        </svg>
        门票
        <span class="my-info-arrow num">{{myBank.ticket}}</span>
        <i class="iconfont my-info-arrow">&#xe6e4;</i>
      </div>
      </router-link>
      <router-link :to="{ path:'/ticket_log', query: { log_type: 2} }">
      <div class="my-info-guozi">
        <svg aria-hidden="true" class="my-info-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
        </svg>
        积分
        <span class="my-info-arrow num">{{myBank.guozi1}}</span>
        <i class="iconfont my-info-arrow">&#xe6e4;</i>
      </div>
      </router-link>
      <!--<div class="my-info-record">-->
        <!--<svg aria-hidden="true" class="my-info-icon">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zhanji"></use>-->
        <!--</svg>-->
        <!--战绩-->
      <!--</div>-->
    </div>
    <div v-show="data.length!=0" class="myRecord">
      <div class="myRecord-week">
        <div class="myRecord-week-time">
            <p><span class="title_icon font_blue"></span>本周战绩：{{weekList.period}}</p>
          <!--<p><span @click="shareDetail">分享</span></p>-->
        </div>
        <div class="myRecord-week-message">
          <div class="myRecord-week-message-left">
            <ul>
              <li>{{weekList.win_num}}</li>
              <li>中奖率</li>
              <li v-if="weekList.best_bet&&weekList.best_bet.length==0">0<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li v-else v-for="items in weekList.best_bet">{{items.prize_amount}}<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>单场最高</li>

            </ul>
          </div>
          <div class="myRecord-week-message-middle">
            <ul>
              <li><span>{{weekList.win_times}}</span>/{{weekList.total_times}}</li>
              <li>本周战绩</li>
              <li><span>{{weekList.amount}}</span><svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>本周收益</li>
            </ul>
          </div>
          <div class="myRecord-week-message-right">
            <ul>
              <li>{{weekList.position}}</li>
              <li>周排名</li>
            </ul>
          </div>
        </div>
        <!--<div v-if="weekList.best_bet&&weekList.best_bet.length>0"  class="myRecord-week-arrow" style="text-align: center;"><i style="font-size: 24px;color: #0C9DFC;" class="iconfont">&#xe6e3;</i></div>-->
        <div v-if="weekList.best_bet&&weekList.best_bet.length>0" class="myRecord-week-profit">单场最高收益</div>
        <div class="myRecord-week-room" v-for="items in weekList.best_bet">
          <div class="started-first">
            <div class="started-first-title">
              <div class="started-first-title-left" :class="'room_color_' + items.room_type">
                <p v-if="items.room_type < 9">{{room_type[items.room_type]}}</p>
                <img class="member-img" v-else-if="items.room_type == 9" :src="items.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
              </div>

              <div class="started-first-title-middle">
                <p>{{items.name}}</p>
                <p>{{items.desc}}</p>
              </div>
              <div class="started-first-title-right">
                <div class="started-first-title-right-earn">
                  <p><span>{{items.join_times}}</span>/{{items.single_times}}</p>
                  <p>参与次数</p>
                </div>
              </div>
            </div>
            <div class="started-first-cont">
              <ul>
                <li>
                  <p>{{items.rank}}</p>
                  <p>最终排名</p>
                </li>
                <li>
                  <p>{{items.total_score}}</p>
                  <p>阵容积分</p>
                </li>
                <li>
                  <p>{{items.prize_amount}}</p>
                  <p>获得奖金<svg aria-hidden="true" class="icon-week-guozi1 myRecord-week-message_guozi icon-week"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="started-first-message">
            <ul class="cl">
              <li class="tickets">门票花费：{{items.price}}</li>
              <li class="tickets">
                <svg class="icon icon-middle" aria-hidden="true">
                  <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                </svg>
              </li>
              <li>参与人数：{{items.join_people}}/{{items.times}}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="myRecord-week">
        <div class="myRecord-week-time">
          <p><span class="title_icon font_green"></span>本月战绩：{{monthList.period}}</p>
          <!--<p><span @click="shareDetail">分享</span></p>-->
        </div>
        <div class="myRecord-week-message">
          <div class="myRecord-week-message-left">
            <ul>
              <li>{{monthList.win_num}}</li>
              <li>中奖率</li>
              <li v-if="monthList.best_bet&&monthList.best_bet.length==0">0<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li v-else v-for="items in monthList.best_bet">{{items.prize_amount}}<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>单场最高</li>

            </ul>
          </div>
          <div class="myRecord-week-message-middle">
            <ul>
              <li><span>{{monthList.win_times}}</span>/{{monthList.total_times}}</li>
              <li>本月战绩</li>
              <li><span>{{monthList.amount}}</span><svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>本月收益</li>
            </ul>
          </div>
          <div class="myRecord-week-message-right">
            <ul>
              <li>{{monthList.position}}</li>
              <li>月排名</li>
            </ul>
          </div>
        </div>
        <div v-if="monthList.best_bet&&monthList.best_bet.length>0" class="myRecord-week-profit">单场最高收益</div>
        <div class="myRecord-week-room" v-for="items in monthList.best_bet">
          <div class="started-first">
            <div class="started-first-title">
              <div class="started-first-title-left" :class="'room_color_' + items.room_type">
                <p v-if="items.room_type < 9">{{room_type[items.room_type]}}</p>
                <img class="member-img" v-else-if="items.room_type == 9" :src="items.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
              </div>

              <div class="started-first-title-middle">
                <p>{{items.name}}</p>
                <p>{{items.desc}}</p>
              </div>
              <div class="started-first-title-right">
                <div class="started-first-title-right-earn">
                  <p><span>{{items.join_times}}</span>/{{items.single_times}}</p>
                  <p>参与次数</p>
                </div>
              </div>
            </div>
            <div class="started-first-cont">
              <ul>
                <li>
                  <p>{{items.rank}}</p>
                  <p>最终排名</p>
                </li>
                <li>
                  <p>{{items.total_score}}</p>
                  <p>阵容积分</p>
                </li>
                <li>
                  <p>{{items.prize_amount}}</p>
                  <p>获得奖金<svg aria-hidden="true" class="icon-week-guozi1 myRecord-week-message_guozi icon-week"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="started-first-message">
            <ul class="cl">
              <li class="tickets">门票花费：{{items.price}}</li>
              <li class="tickets">
                <svg class="icon icon-middle" aria-hidden="true">
                  <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                </svg>
              </li>
              <li>参与人数：{{items.join_people}}/{{items.times}}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="myRecord-week">
        <div class="myRecord-week-time">
          <p><span class="title_icon font_red"></span>总战绩：{{totalList.period}}</p>
          <!--<p><span @click="shareDetail">分享</span></p>-->
        </div>
        <div class="myRecord-week-message">
          <div class="myRecord-week-message-left">
            <ul>
              <li>{{totalList.win_num}}</li>
              <li>中奖率</li>
              <li v-if="totalList.best_bet&&totalList.best_bet.length==0">0<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li v-else v-for="items in totalList.best_bet">{{items.prize_amount}}<svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>单场最高</li>

            </ul>
          </div>
          <div class="myRecord-week-message-middle">
            <ul>
              <li><span>{{totalList.win_times}}</span>/{{totalList.total_times}}</li>
              <li>总战绩</li>
              <li><span>{{totalList.amount}}</span><svg aria-hidden="true" class="icon-week-guozi myRecord-week-message_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></li>
              <li>总收益</li>
            </ul>
          </div>
          <div class="myRecord-week-message-right">
            <ul>
              <li>{{totalList.position}}</li>
              <li>总排名</li>
            </ul>
          </div>
        </div>
        <div v-if="totalList.best_bet&&totalList.best_bet.length>0" class="myRecord-week-profit">单场最高收益</div>
        <div class="myRecord-week-room" v-for="items in totalList.best_bet">
          <div class="started-first">
            <div class="started-first-title">
              <div class="started-first-title-left" :class="'room_color_' + items.room_type">
                <p v-if="items.room_type < 9">{{room_type[items.room_type]}}</p>
                <img class="member-img" v-else-if="items.room_type == 9" :src="items.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
              </div>

              <div class="started-first-title-middle">
                <p>{{items.name}}</p>
                <p>{{items.desc}}</p>
              </div>
              <div class="started-first-title-right">
                <div class="started-first-title-right-earn">
                  <p><span>{{items.join_times}}</span>/{{items.single_times}}</p>
                  <p>参与次数</p>
                </div>
              </div>
            </div>
            <div class="started-first-cont">
              <ul>
                <li>
                  <p>{{items.rank}}</p>
                  <p>最终排名</p>
                </li>
                <li>
                  <p>{{items.total_score}}</p>
                  <p>阵容积分</p>
                </li>
                <li>
                  <p>{{items.prize_amount}}</p>
                  <p>获得奖金 <svg aria-hidden="true" class="icon-week-guozi1 myRecord-week-message_guozi icon-week"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="started-first-message">
            <ul class="cl">
              <li class="tickets">门票花费：{{items.price}}</li>
              <li class="tickets">
                <svg class="icon icon-middle" aria-hidden="true">
                  <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                </svg>
              </li>
              <li>参与人数：{{items.join_people}}/{{items.times}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import store from 'store'
  import HeadTop from '../header.vue'
export default {
  name: 'myRecord',
  data () {
    return {
      myBank: {},
      room_type:['','新手','活动','日赛','周赛','Solo','名人','毒奶','Solo'],
      shareShow: false,
      weekList:[],
      monthList:[],
      totalList:[],
      data:'',
      list:[],
      isWatchSuccess: true,
    }
  },
  created(){
    this.$repeatLogin();
    this.$root.hub.$on("loginSuccess", _ => {
    	if ( this.isWatchSuccess == true) {
        this.getData();
      }
    })
  },
  mounted () {
    if (this.member){
      this.getData();
    }
  },
  methods:{
  	getData(){
      let _this = this;
      this.$api('/services/fantasy/member_record.php', {
        qid:store.get('loginInfo').type,
      }).then(response => {
        if(response.code==200){
          _this.data=response.data;
          _this.weekList=response.data.week_record;
          _this.monthList=response.data.month_record;
          _this.totalList=response.data.total_record;

          _this.myBank = response.data.my_bank;
          _this.isWatchSuccess = false;
        }
      });
    },
    shareDetail() {
      this.shareShow = true
    },
    hideDetail() {
      this.shareShow = false
    },
  },
  components:{
    headTop:HeadTop
  },
  computed: {
    member () {
      return this.$store.state.member
    },
  }
}
</script>

<style>
  .myRecord-head {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 90px;
    z-index:2;
  }
.myRecord {
  margin:10px 0 118px 0;
}
.myRecord .myRecord-week{
  background: #fff;
  margin-bottom:20px;
}
.myRecord .myRecord-week-time{
  height:66px;
  line-height:66px;
  font-size: 14px;
  color: #363940;
  display: flex;
  display: -webkit-flex;
  box-shadow: 0 0 0 1px #F0F1F2;
}
.myRecord .myRecord-week-time p{
  -webkit-box-flex: 1;
  flex: 1;
  font-weight: bold;
}
  .myRecord .myRecord-week-time p .title_icon {
    display: block;
    width: 8px;
    height: 28px;
    float: left;
    margin:19px 12px 0 0;
  }
  .myRecord .myRecord-week-time p .font_blue {
    background: #0D8DFC;
  }
  .myRecord .myRecord-week-time p .font_green {
    background: #16DE9B;
  }
  .myRecord .myRecord-week-time p .font_red {
    background: #FF5C69;
  }
  .myRecord .icon-week-guozi{
    height:22px;
    width:22px;
    vertical-align: middle;
    margin-bottom:6px;
  }
  .myRecord .icon-week-guozi1{
    height:26px;
    width:26px;
    vertical-align: middle;
    margin-bottom:4px;
  }
  .my-info{
    background: #fff;
    margin-top:0px;
  }
  .my-info>a {
    display: block;
    border-bottom:1px solid #eee;
  }
  .my-info-ticket{
    height:80px;
    line-height:80px;
    font-size:28px;
    position: relative;
  }
  .my-info-record{
    background: #f1f1f1;
    height:80px;
    line-height:80px;
    font-size:28px;
  }
  .my-info-guozi{
    height:80px;
    line-height:80px;
    border-bottom:1px solid #f1f1f1;
    position: relative;
  }
  .my-info .my-info-guozi {
    font-size: 28px;
  }
  .my-info-icon{
    height:30px;
    width:30px;
    vertical-align: middle;
    margin-bottom:6px;
    margin-left:18px;
  }
  .my-info-arrow{
    text-align: right;
    font-size:26px;
    position: absolute;
    top:0px;
    right:20px;
  }
  .my-info-arrow.num{
    right:60px;
  }
  .myRecord .myRecord-week-time p:nth-of-type(1){
    margin-left:24px;
    font-size:22px;
    color: #373a41;
  }
.myRecord .myRecord-week-time p:nth-of-type(2){
  text-align: right;
  margin-right:20px;
  font-size:26px;
}
.myRecord  .myRecord-week-message{
  margin:20px 24px 0 24px;
  display: flex;
  display: -webkit-flex;
}
.myRecord  .myRecord-week-message div{
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .myRecord-week-message ul li:nth-of-type(1){
  height:42px;
  line-height:42px;
  font-size:34px;
  color: #373a41;
}
.myRecord .myRecord-week-message ul li:nth-of-type(1) span{
  font-size:34px;
  color: #0C9DFC;
}
.myRecord .myRecord-week-message ul li:nth-of-type(2){
  height:54px;
  line-height:54px;
  font-size:22px;
  color: #656973;
}

.myRecord .myRecord-week-message ul li:nth-of-type(3){
  margin-top:10px;
  height:70px;
  line-height:70px;
  font-size:34px;
  color: #373a41;
}
  .myRecord .myRecord-week-message ul li:nth-of-type(3) span{
    font-size:34px;
    color: #0C9DFC;
  }
.myRecord .myRecord-week-message ul li:nth-of-type(3)  .myRecord-week-message_guozi{
  font-size:34px;
  height: 26px;
  width: 26px;
  margin-left: 5px;
}
.myRecord .myRecord-week-message ul li:nth-of-type(4){
  padding-bottom:42px;
  font-size: 22px;
  color: #656973;
}

.myRecord .myRecord-week-profit{
  height:28px;
  line-height:28px;
  background: url("../../../static/images/record-line.png") no-repeat;
  background-size: 100% 100%;
  font-size:24px;
  font-weight: bold;
  text-align: center;
}
.myRecord .myRecord-week-room{
  padding: 18px 30px 30px;
}
.myRecord .myRecord-week-room .started-first{
  background: #F7F8FA;
  border-radius:8px 8px;
}
.myRecord .myRecord-week-room .started-first-title{
  height: 106px;
  border-bottom: 1px solid #fff;
}
.myRecord .myRecord-week-room .started-first-title-left{
  float: left;
  width: 65px;
  height: 65px;
  line-height:65px;
  font-size: 24px;
  color: #fff;
  text-align: center;
  font-weight:bold;
}
.myRecord .myRecord-week-room .started-first-title-middle{
  float: left;
  margin: 16px 0 0 16px;
  width: calc(100% - 190px);
}
.myRecord .myRecord-week-room .started-first-title-middle p:nth-of-type(1){
  font-size:30px;
  font-weight:bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.myRecord .myRecord-week-room .started-first-title-middle p:nth-of-type(2){
  margin-top:2px;
  font-size:20px;
  color: #B0B5BF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.myRecord .myRecord-week-room .started-first-title-right{
  float: right;
  margin: 16px 0 0 0;
}
.myRecord .myRecord-week-room .started-first-title-right .started-first-title-right-earn{
  float: left;
  margin-right: 15px;
}
.myRecord  .myRecord-week-room .started-first-title-right .started-first-title-right-arrow{
  float: left;
  margin: 15px 10px 0 0;
}
.myRecord .myRecord-week-room .started-first-title-right .started-first-title-right-earn p:nth-of-type(1){
  text-align: right;
  font-size: 30px;
}
.myRecord .myRecord-week-room .started-first-title-right .started-first-title-right-earn p:nth-of-type(1) span{
  color: #0C9DFC;
  font-size: 30px;
}
.myRecord .myRecord-week-room .started-first-title-right .started-first-title-right-earn p:nth-of-type(2){
  font-size:20px;
}
.myRecord .myRecord-week-room .started-first-message{
  height:62px;
  line-height:62px;
}
.myRecord .myRecord-week-room .started-first-message li{
  float: right;
  font-size: 20px;
  color: #B0B5BF;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(1){
  padding-right:12px;
  font-size:24px;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(1).tickets,
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(2).tickets {
  float: left;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(2){
  padding-right:8px;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(3){
  padding-right:20px;
  font-size:24px;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(4){
  padding-right:20px;
  font-size:24px;
}
.myRecord .myRecord-week-room .started-first-message li:nth-of-type(5){
  padding-right:8px;
  font-size:24px;
}
.myRecord .myRecord-week-room .started-first-cont{
  height:90px;
}
.myRecord .myRecord-week-room .started-first-cont ul{
  margin:0 20px;
  display: flex;
  display: -webkit-flex;
  width:100%;
}
.myRecord .myRecord-week-room .started-first-cont ul li{
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .myRecord-week-room .started-first-cont ul li p:nth-of-type(2){
  color: #999999;
  font-size:24px;
}
.myRecord .myRecord-week-room .started-first-cont ul li p:nth-of-type(1){
  color: #273B3E;
  font-size:30px;
  font-weight:bold;
}
.myRecord .myRecord-week-room .started-first-cont ul li:nth-of-type(3) p:nth-of-type(1){
  color: #B89868;
  font-size:30px;
  font-weight:bold;
}
.myRecord .share-mask{
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  z-index: 100;
  overflow: auto;
  background: rgba(7,17,27,0.8);
  opacity:1;
}
.myRecord .share-cont{
  margin:52px 38px;
  background: #282a39;
  border-radius:6px;
}
.myRecord .share-cont-top{
  padding-top:64px;
  background: url("../../../static/images/share_bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.myRecord .share-cont-top-title{
  height:106px;
  text-align: center;
}
.myRecord .share-cont-top-title p:nth-of-type(1){
  font-size:32px;
  color: #fff;
  padding-top:12px;
}
.myRecord .share-cont-top-title p:nth-of-type(2){
  font-size:24px;
  color: #fff;
  padding-top:14px;
}
.myRecord .share-cont-top-user{
  padding-top:34px;
}
.myRecord .share-cont-top-user ul{
  display: flex;
  display: -webkit-flex;
}
.myRecord .share-cont-top-user ul li{
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .share-cont-top-user ul li:nth-of-type(1){
  margin-top:53px;
}
.myRecord .share-cont-top-user ul li:nth-of-type(1) p:nth-of-type(1){
  font-size: 48px;
  color: #0C9DFC;
}
.myRecord .share-cont-top-user ul li:nth-of-type(1) p:nth-of-type(2){
  font-size: 24px;
  color: #9e9ca1;
}
.myRecord .share-cont-top-user ul li:nth-of-type(2) img{
  height: 120px;
  width: 120px;
  border-radius: 50%;
  border:4px solid #fff;
}
.myRecord .share-cont-top-user ul li:nth-of-type(2) p{
  font-size:26px;
  color: #fff;
  padding-top:13px;
}
.myRecord .share-cont-top-user ul li:nth-of-type(3){
  margin-top:53px;
}
.myRecord .share-cont-top-user ul li:nth-of-type(3) p:nth-of-type(1){
  font-size: 48px;
  color: #fff;
}
.myRecord .share-cont-top-user ul li:nth-of-type(3) p:nth-of-type(1) span{
  font-size: 48px;
  color: #0C9DFC;
}
.myRecord .share-cont-top-user ul li:nth-of-type(3) p:nth-of-type(2){
  font-size: 24px;
  color: #9e9ca1;
}
.myRecord .share-cont-top-profit{
  padding-top:42px;
}
.myRecord .share-cont-top-profit ul{
  display: flex;
  display: -webkit-flex;
}
.myRecord .share-cont-top-profit ul li{
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .share-cont-top-profit ul li p:nth-of-type(1){
  font-size:48px;
  color: #00cfd5;
  font-weight:bold;
}
.myRecord .share-cont-top-profit ul li p:nth-of-type(2){
  font-size:24px;
  color: #9e9ca1;
}
.myRecord .share-cont-top-profit ul li:nth-of-type(2){
  border-right: 6px solid #5b5c71;
  border-left: 6px solid #5b5c71;
}
.myRecord .share-cont-top-profit_guozi{
  font-size:40px;
}

.myRecord .share-cont-middle{
  padding-top:57px;
}
.myRecord .share-cont-middle-best{
  height:34px;
  line-height:34px;
  text-align: center;
  color: #fff;
}
.myRecord .share-cont-middle-room{
  padding:12px 30px 0;
}
.myRecord .started-first{
}
.myRecord .started-first-title{
  height: 106px;
  padding:0 30px;
  border-bottom:1px solid #fff;
}
.myRecord .started-first-title-left{
  float: left;
  margin:16px 0 0 0;
  width: 68px;
  height: 68px;
  font-size: 24px;
  text-align: center;
  font-weight:bold;
  color: #fff;
  border-radius:50%;
}
.myRecord .started-first-title-middle{
  float: left;
  margin: 16px 0 0 16px;
}
.myRecord .started-first-title-middle p:nth-of-type(1){
  font-size:28px;
}
.myRecord .started-first-title-middle p:nth-of-type(2){
  margin-top:5px;
  font-size:22px;
  color: #c5c5c5;
}
.myRecord .started-first-title-right{
  float: right;
  margin: 16px 0 0 0;
}
.myRecord .started-first-title-right .started-first-title-right-earn{
  float: left;
  margin-right: 15px;
}
.myRecord .started-first-title-right .started-first-title-right-arrow{
  float: left;
  margin: 15px 10px 0 0;
}
.myRecord .started-first-title-right .started-first-title-right-earn p:nth-of-type(1){
  text-align: center;
  font-size: 30px;
}
.myRecord .started-first-title-right .started-first-title-right-earn p:nth-of-type(2){
  font-size:24px;
  color: #c5c5c5;
}
.myRecord .started-first-message{
  height:62px;
  line-height:62px;
}
.myRecord .started-first-message li{
  float: right;
}
.myRecord .started-first-message li:nth-of-type(1){
  padding-right:24px;
  font-size:24px;
}
.myRecord .started-first-message li:nth-of-type(2){
  margin-right:10px;
}
  .myRecord .started-first-message li:nth-of-type(2) svg{
    padding-top: 4px;
    /*height: 45px;*/
    width: 30px;
    height:30px;
  }
.myRecord .started-first-message li:nth-of-type(3){
  padding-right:20px;
  font-size:24px;
}
.myRecord .started-first-message li:nth-of-type(4){
  padding-right:20px;
  font-size:24px;
}
.myRecord .started-first-message li:nth-of-type(5){
  padding-right:8px;
  font-size:24px;
}
  .myRecord .started-first-message li:nth-of-type(5) svg{
    height:22px;
    width:22px;
  }
.myRecord .started-first-cont{
  height:90px;
  margin:0 20px;
}
.myRecord .started-first-cont ul{
  display: flex;
  display: -webkit-flex;
}
.myRecord .started-first-cont .myRecord-week-message-left ul li{
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .started-first-cont .myRecord-week-message-left ul li p:nth-of-type(2){
  color: #999999;
  font-size:24px;
}
.myRecord .started-first-cont .myRecord-week-message-left ul li p:nth-of-type(1){
  color: #373a41;
  font-size:30px;
}
.myRecord .started-first-cont .myRecord-week-message-left ul li:nth-of-type(3) p:nth-of-type(1){
  color: #ccba87;
  font-size:30px;
  font-weight:bold;
}
.myRecord .share-cont-middle-logo{
  padding:44px 66px 70px;
}
.myRecord .share-cont-middle-logo ul{
  display: flex;
  display: -webkit-flex;
}
.myRecord .share-cont-middle-logo ul li:nth-of-type(1){
  -webkit-box-flex: 2;
  flex: 2;
}
.myRecord .share-cont-middle-logo ul li:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
}
.myRecord .share-cont-middle-logo ul li:nth-of-type(2) p{
  font-size: 20px;
  color: #fff;
}
.myRecord .detail-wrapper{
  width: 100%;
  min-height: 100%;
}
.myRecord .clearfix{
  display: inline-block;
}
.myRecord .fade-enter-active,.fade-leave-active{
  transition: all 0.5s
}
.myRecord .fade-enter, .fade-leave-active{
  background: rgba(7, 17, 27, 0)
}
</style>
