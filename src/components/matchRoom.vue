<template>
  <div class="matchRoom">
    <div class="matchRoom-head">
      <head-top
        head-title="阵容匹配房间"
        go-back="true"
        fink-room="true"
      ></head-top>
    </div>
    <div v-show="startedList!=''" class="matchRoom-cont">
      <div class="title-box">
        <span>已选中 <span class="c-rose-red">{{totalRoom}}</span> 个房间</span>
        <span>我的门票: {{ticket}}
        <svg aria-hidden="true" class="icon-size icon_guozi">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use>
            </svg>
        </span>
      </div>


      <div class="room-list-box" v-for="(items,index) in startedList">
        <div class="head" style="background-size:cover;" @click="checkRoom(index,items.roomID)">
          <room-type-icon :type="items.type"></room-type-icon>
          <div class="title">
            <span>{{items.name}}</span>
            <span>{{items.room_desc}}</span>
          </div>
          <div class="subtitle">
            <p v-if="checkArray[index] !== items.roomID">
              <svg style="width:48px;height:48px;" aria-hidden="true" class="icon-size icon_guozi">
                <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-unselected"></use>
              </svg>
            </p>
            <p v-else>
              <svg style="width:48px;height:48px;" aria-hidden="true" class="icon-size icon_guozi">
                <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-selected"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="content" @click="linkMatch(items.roomID,index)" >
          <div class="item">
            <span>{{items.price}}</span>
            <span>入场费
            <svg aria-hidden="true" class="icon-size icon_guozi">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
            </svg>
            </span>
          </div>
          <div class="item"><span>{{items.prize_num}}</span><span>中奖范围</span></div>
          <div class="item"><span><span class="join-text">{{items.member_at_times}}</span>/{{items.times}}</span><span>已参与</span></div>
          <div class="item">
            <span>{{items.prize_amount}}</span>
            <span>奖励
            <svg aria-hidden="true" class="icon-size icon_guozi">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-JFx"></use>
            </svg>
            </span>
          </div>
        </div>
        <div class="date">
          <div class="time">
            <i class="iconfont">&#xe657;</i> {{ items.at_end_time | formatDate }}
            <span class="rmk" v-if="items.is_must_open==0">满{{items.num}}人开</span>
            <span class="bk" v-else-if="items.is_must_open==1">必开</span>
          </div>
          <div>
            人数：{{items.at_times}}/{{items.num}}
          </div>
        </div>
      </div>

      <div class="started-no-data">{{message}}</div>
    </div>



    <!--未开始底部-->
    <div class="footer-button">
      <div class="count">
        <span class="text">我的门票：{{ticket}} <svg aria-hidden="true" class="icon-size icon_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use></svg></span>
        <span class="text">本次消耗：
              <span><span class="c-rose-red">¥{{totalTicket}}</span> <svg aria-hidden="true" class="icon-size icon_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use></svg></span>
          </span>

      </div>
      <button class="button" v-if="totalRoom==0">快速加入</button>
      <button class="button active" v-else @click="pushSquad()">快速加入</button>
    </div>





    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&startedList==''">
      <img src="../../static/images/nothing_icon.png" alt="">
      <p>暂时没有可以匹配的房间</p>
      <p class="mpm_btn" @click="linkRoom">返回大厅</p>
    </div>



    <div v-show="maskShow" class="matchRoom-mask" @touchmove.prevent>
      <div  class="matchRoom-success">
        <div class="matchRoom-success-title" v-if="order_ED == false">提示</div>
        <div class="matchRoom-success-title" v-else>{{topTitle[flag]}}</div>
        <div v-show="flag==0">
          <div v-if="falseList[0]" class="matchRoom-success-message"><i class="iconfont xuanzhong-icon2">&#xe60f;</i> {{falseList[0].title}}</div>
          <div v-if="falseList[0]" class="matchRoom-success-room">
            <div class="matchRoom-room-first" v-for="item in falseList[0].list">
              <div class="matchRoom-room-first-title">{{item.name}}</div>
              <!--<div class="matchRoom-room-first-desc">我是标题</div>-->
            </div>
          </div>
          <div v-if="falseList[1]" class="matchRoom-success-message"><i class="iconfont xuanzhong-icon2">&#xe60f;</i> {{falseList[1].title}}</div>
          <div v-if="falseList[1]&&falseList[1].list!=''" class="matchRoom-success-room">
            <div class="matchRoom-room-first" v-for="item in falseList[1].list">
              <div class="matchRoom-room-first-title">{{item.name}}</div>
              <!--<div class="matchRoom-room-first-desc">我是标题</div>-->
            </div>

          </div>
        </div>
        <div v-show="flag==1">
          <div class="matchRoom-success-message"><i class="iconfont xuanzhong-icon2">&#xe60e;</i>  {{title}}</div>
          <div class="matchRoom-success-room">
            <div class="matchRoom-room-first" v-for="items in successList">
              <div class="matchRoom-room-first-title">{{items.name}}</div>
              <!--<div class="matchRoom-room-first-desc">我是标题</div>-->
            </div>

          </div>
        </div>
        <div v-show="flag==2" class="matchRoom-room-first-dia">
          您的钻石不足
        </div>
        <div v-show="flag==1" class="matchRoom-success-button">
          <div @click="linkRoom" class="matchRoom-success-button-left ">
            <p class="mpm_btn">返回大厅</p>
          </div>
          <div @click="resetRoom()" class="matchRoom-success-button-right">
            <p class="mpm_btn active">再次匹配</p>
          </div>
        </div>
        <div v-show="flag==0" class="matchRoom-success-button" @click="resetRoom()">
          <p class="reset-choice mpm_btn active">重新选择</p>
        </div>
        <div v-show="flag==2" class="matchRoom-success-button">
          <div class="matchRoom-success-button-left">
            <p>稍后再说</p>
          </div>
          <!--<div class="matchRoom-success-button-right">-->
          <!--<p>购买钻石</p>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>
  </div>
</template>

<script>
  import loading from '@/components/loading'
  import HeadTop from '../components/header.vue'
  import store from 'store'
  import DialogPay from '../components/dialogPay.vue'
  var checkArray = new Array()
  var checkArray1 = new Array()
  export default {
    name: 'started',
    data () {
      return {
        startedList:[],
        room_type:['','新手','活动','日赛','周赛','Solo','名人','毒奶','Solo'],
//        room_bg:['','new-people-bg','active-bg','day-bg','week-bg','solo-bg','star-people-bg','dunai-bg','solo-bg1','diy-bg1'],
        payList:{
          status:'',
          isPrompt:false,
          msg_text:'',
          isTickts:'',

          group_ticket:'',
          key:'',
          my_key:'',
          my_ticket:'',
        },
        vShow:false,
        busy: false,
        loading:false,
        isAll:0,
        start_id:'',
        checkArray:[],
        checkArray1:[],
        totalTicket:0,
        totalRoom:0,
        roomIds:'',
        successList:'',
        falseList:'',
        falseList1:'',
        member_info:'',
        message:'暂无更多内容',
        maskShow:false,
        flag:1,
        ticket:0,
        title:'',
        topTitle:['提示','参与成功','提示','提示'],
        NewRoomId:'', //当前roomID
        order_ED:true, // 订单是否能开始提交
      }
    },
    created() {
      if(store.get('checkArray') != undefined){
        this.checkArray=store.get('checkArray');
      }else{
//            console.log(1)
      }
      this.member_info = store.get('member_info');
      if(this.member_info == undefined){
        this.$router.push({path:'/home'});
      }else{
//      console.log(this.member_info)
      }
      this.loadTop();
    },
    methods:{
      resetRoom(){
        store.remove('checkArray');
        this.totalRoom=0;
        this.maskShow=false;
        this.totalTicket=0;
        this.loadTop();
      },
      linkRoom(){
        this.$router.push({ path:'/home',query: {}});
      },
      linkMatch(obj,index){
        store.set('checkArray',this.checkArray);
        this.$router.push({ path:'/match',query: {roomID:obj,index:index,orderId:this.$route.query.orderId,homeId:this.$route.query.homeId}});
      },
      checkRoom(index,roomID){
        if(this.checkArray[index]==0){
          this.$set(this.checkArray, index, roomID);
          this.totalTicket=parseInt(this.totalTicket)+parseInt(this.checkArray1[index]);
          this.totalRoom=parseInt(this.totalRoom)+parseInt(1)
        }else{
          this.$set(this.checkArray, index, 0);
          this.totalTicket=parseInt(this.totalTicket)-parseInt(this.checkArray1[index]);
          this.totalRoom=parseInt(this.totalRoom)-parseInt(1)
        }
      },
      loadTop(){
        var _this = this;
        this.$api('/services/fantasy/room_lineup_list.php', {
          qid: store.get('loginInfo').type,
          order_id:this.$route.query.orderId,
        }).then(response => {
          // if(store.get('new_player').indexOf('squad') < 0){
          //   store.set('new_player',store.get('new_player')+'squad');
          //   this.$root.hub.$emit('new_player_go_Success','1');
          // }
          if(response.code==200){

            _this.loading=true;
            if(response.data.list.length==0){
            }else{
              if(response.data.list.length<10){
              }
            }
            _this.startedList=response.data.list;
            _this.ticket=response.data.ticket;
            if(store.get('checkArray')!=undefined){
              for(var i=0;i<_this.startedList.length;i++){
                _this.checkArray1[i]=response.data.list[i].price;
                if(_this.checkArray[i]!=0){
                  _this.totalTicket=parseInt(this.totalTicket)+parseInt(this.checkArray1[i]);
                  _this.totalRoom=parseInt(this.totalRoom)+parseInt(1)
                }
              }
            }else{
              //重新组合数组
              var repeatCheckArray = [];
              for(var i=0;i<_this.startedList.length;i++){
                repeatCheckArray[i] = _this.checkArray[i] = 0;
                _this.checkArray1[i]=response.data.list[i].price
              }
              //重新赋值给数组
              _this.checkArray = repeatCheckArray;
            }
          }
        })
      },
      savestatus(){
        sessionStorage.setItem('status','2')
      },
      pushSquad(){
        this.roomIds='';
        if(parseInt(this.ticket) >= parseInt(this.totalTicket)){
          if (this.order_ED == true) {
            this.order_ED = false;
            for (var i = 0; i < this.checkArray.length; i++) {
              if (this.checkArray[i] != 0) {
                if (this.roomIds == '') {
                  this.roomIds = this.checkArray[i];
                } else {
                  this.roomIds = this.roomIds + ',' + this.checkArray[i];
                }
              }
            }
            var _this = this;
            this.$api('/services/fantasy/create_lineup_order.php', {
              qid: store.get('loginInfo').type,
              order_id: this.$route.query.orderId,
              room_ids: this.roomIds,
              // pass:true
            }).then(response => {
              if (response.code == 200) {
                _this.maskShow = true;
                _this.title = response.data[0].title;
                _this.successList = response.data[0].list;

                _this.order_ED = true;
                _this.flag = 1;

                //处理快速匹配下单
                let roomIdsArray = [];
                roomIdsArray = _this.roomIds.split(",");

                for (var i in roomIdsArray) {
                  _this.NewRoomId = roomIdsArray[i];

                  let _orderInfo = {
                    member_at_times: '',
                    roomID: _this.NewRoomId,
                    type: '',
                  };
                  _this.startedList.forEach(function (item) {
                    if (item.roomID == _this.NewRoomId) {
                      _orderInfo.member_at_times = (parseInt(item.member_at_times) + 1).toString();
                      _orderInfo.type = item.type;

                      //member_info 减除消耗
                      var member_info = store.get('member_info');
                      member_info.ticketCount = parseInt(member_info.ticketCount) - parseInt(item.price);
                      store.set('member_info', member_info);
                    }
                  });

                  //更新首页列表个人参与次数
                  // let filed = 'member_at_times';
                  // let _roomInfo = this.roomInfo;
                  // if (!_roomInfo[filed] || (_roomInfo[filed] && _this.md5(_roomInfo[filed]) !== _this.md5(_orderInfo[filed]))) {
                  //   _roomInfo[filed] = _orderInfo[filed]
                  // }
                  // store.set('roomList', _this.roomData.listArray);
                }

              } else {
                _this.order_ED = true;
                _this.maskShow = true;
                _this.flag = 0;
                _this.falseList = response.data;
              }
            })
          } else {
            this.maskShow = true;
            this.title = '你的手速太快，请勿多次提交。';
          }
        }else{
          this.payList.group_ticket = this.totalTicket;
          this.payList.my_ticket = this.ticket;
          this.payList.status = 7;
          this.payList.msg_text = '您的门票不足';
          this.payList.isTickts = true;
          this.vShow = true;
        }
      },
      change(msg){
        this.totalRoom=0;
        this.totalTicket=0;
        this.loadTop();
        this.vShow = msg
        // console.log(msg)
      },
    },
    components: {
      loading,
      headTop:HeadTop,
      dialogPay:DialogPay,
    },
    computed: {
      member () {
        return this.$store.state.member
      },
      roomData () {
        return this.$store.state.roomData
      },
      roomList (){
        return this.roomData.listArray
      },
      cacheRoomInfo () {
        return this.roomData.roomDetailHashMap[this.NewRoomId]
      },
      roomInfo () {
        if (this.cacheRoomInfo) {
          return this.cacheRoomInfo
        } else {
          return this.roomData.listArray.find(room => this.NewRoomId == room.roomID)
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>


  .matchRoom .matchRoom-head{
    position: fixed;
    top:0;
    width:100%;
    height:90px;
  }
  .matchRoom .matchRoom-cont-num{
    height:80px;
    line-height:80px;
    margin-left:32px;
    font-size:24px;
  }
  .matchRoom .matchRoom-cont{
    margin: 90px 0 98px 0;
  }
  .matchRoom  .icon-size{
    vertical-align :middle;
    width: 22px;
    height: 22px;
    margin-bottom:6px;
  }
  .matchRoom .started-first{
    background: #fff;
    margin:0 20px 20px;
    border-radius: 8px 8px;
    box-shadow: 5px 5px 8px rgba(0,200,215,0.1);
  }
  .matchRoom .started-first-title{
    height: 106px;
    background-size: 100% 100%;
  }
  .matchRoom .started-first-title-left{
    float: left;
    margin:16px 0 0 30px;
    width: 68px;
    height: 68px;
    line-height: 68px;
    border-radius:50%;
    font-size: 24px;
    color: #fff;
    text-align: center;
    font-weight:bold;
  }
  .matchRoom .started-first-title-middle{
    float: left;
    margin: 16px 0 0 16px;
  }
  .matchRoom .started-first-title-middle p{
    width:400px;
    overflow: hidden;
    white-space :nowrap;
    text-overflow :ellipsis;
  }
  .matchRoom .started-first-title-middle p:nth-of-type(1){
    font-size:28px;
  }
  .matchRoom .started-first-title-middle p:nth-of-type(2){
    margin-top:5px;
    font-size:22px;
    color: #999;
  }
  .matchRoom .started-first-title-right{
    float: right;
    margin: 16px 0 0 0;
  }
  .matchRoom .started-first-title-right .started-first-title-right-earn{
    float: left;
    margin-right: 35px;
  }
  .matchRoom .started-first-title-right .started-first-title-right-arrow{
    float: left;
    margin: 15px 10px 0 0;
  }
  .matchRoom .started-first-title-right .started-first-title-right-earn p:nth-of-type(1){
    text-align: right;
    font-size: 30px;
    margin-top: 15px;
  }
  .matchRoom .started-first-title-right .started-first-title-right-earn p:nth-of-type(1) span{
    color: #0C9DFC;
    font-size: 30px;
  }
  .matchRoom .started-first-title-right .started-first-title-right-earn p:nth-of-type(2){
    font-size:20px;
    color: #999999;
  }

  .matchRoom .started-first-cont{
    margin:0 20px;
    padding-top:30px;
    border-top: 1px solid #F1F1F1;
    height:120px;
  }
  .matchRoom .started-first-cont ul{
    display: flex;
    display: -webkit-flex;
    width:100%;
  }
  .matchRoom .started-first-cont ul li{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
  }
  .matchRoom .started-first-cont ul li p:nth-of-type(2){
    color: #999999;
    font-size:24px;
  }
  .matchRoom .started-first-cont ul li p:nth-of-type(1){
    color: #373a41;
    font-size:30px;
    font-weight:bold;
  }
  .matchRoom .started-first-cont ul li:nth-of-type(4) p:nth-of-type(1){
    color: #ccba87;
    font-size:30px;
    font-weight:bold;
  }
  .matchRoom .started-first-time{
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
  }
  .matchRoom .start-time{
    -webkit-box-flex: 2;
    flex: 2;
    color: #c9c9c9;
    height:30px;
    line-height: 30px;
    margin-left: 22px;
    font-size: 24px;
  }
  .matchRoom .start-time-clock{
    font-size: 26px;

  }
  .matchRoom .must-open{
    font-size: 20px;
    display: inline-block;
    color: #fff;
    background: #0C9DFC;
    text-align: center;
    border-radius: 6px 6px;
    padding:0 10px;
  }
  .matchRoom  .must-open-people{
    font-size: 20px;
    display: inline-block;
    color: #fff;
    background: #0C9DFC;
    text-align: center;
    border-radius: 6px 6px;
    padding:0 10px;
  }
  .matchRoom .started-time-user{
    color: #c9c9c9;
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 24px;
    text-align: right;
    margin-right: 40px;
  }
  .matchRoom .started-time-user i{
    font-size: 22px;
  }
  .matchRoom .started-time-user{
    height:30px;
    line-height: 30px;
  }
  .matchRoom  .started-no-data{
    font-size:26px;
    text-align: center;
    height:60px;
    color:#B2B0D2;
  }

  .matchRoom .matchRoom-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: -webkit-flex;
    display: flex;
    flex-flow: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .matchRoom .matchRoom-success{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
    -webkit-justify-content: center;
    justify-content: center;
    background: #fff;
    width:522px;
    border-radius:8px;
    overflow: hidden;

  }
  .matchRoom .matchRoom-success-title{
    height:90px;
    line-height:90px;
    font-size: 32px;
    color: #fff;
    /*background: #d2be85;*/
    background-image: linear-gradient(39deg, #8040FF 0%, #4940FF 100%);
    /*border-radius:22px 22px 0 0;*/
    text-align: center;
  }
  .matchRoom .matchRoom-success-message{
    height:70px;
    line-height: 70px;
    color: #0C9DFC;
    font-size:28px;
    margin-left:30px;
    width: 440px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }

  .matchRoom  .matchRoom-success-room{
    max-height: 248px;
    overflow: scroll;
    margin:0 30px;
  }
  .matchRoom .matchRoom-room-first-title{
    font-size:28px;
    padding-bottom: 10px;
  }
  .matchRoom .matchRoom-room-first-desc{
    font-size:28px;
    margin:15px 0;
  }
  .matchRoom .matchRoom-success-button{
    margin:44px 20px 0;
    display: flex;
    display: -webkit-flex;
    padding-bottom: 25px;
  }
  .matchRoom  .matchRoom-success-button-left,.matchRoom  .matchRoom-success-button-right{
    -webkit-box-flex: 1;
    flex: 1;
  }
  .matchRoom  .matchRoom-success-button-left p,.matchRoom  .matchRoom-success-button-right p{
    width:230px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    /*border:1px solid black;*/
    /*border-radius: 35px 35px;*/
    font-size: 26px;
    background: #5348FF;
    color:#fff;
    box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
  }
  .matchRoom .matchRoom-success-button-right p{
    /*background: #0C9DFC;*/
    color: #fff;
    border:none;
  }
  .matchRoom .matchRoom-room-first-dia{
    text-align: center;
    color: black;
    font-size:27px;
    line-height:324px;
  }
  .matchRoom .reset-choice{
    width:484px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    /*background: #0C9DFC;*/
    color: #fff;
    /*border-radius:35px 35px;*/
  }

  .matchRoom .started-null p:nth-of-type(1){
    text-align: center;
    font-size:30px;
  }
  .matchRoom .started-null p:nth-of-type(2){
    margin-top: 80px;
    text-align: center;
    /*font-size:28px;*/
    color: #fff;
    height:60px;
    line-height 60px;
    background:linear-gradient(137deg,rgba(139,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 12px 8px -8px rgba(83,72,255,0.5);
    border-radius:12px;

  }
  .matchRoom .xuanzhong-icon{
    font-size: 44px;
    color: #bcbcbc;
  }
  .matchRoom .xuanzhong-icon1{
    font-size: 44px;
    color: #0C9DFC;
  }
  .matchRoom .xuanzhong-icon2{
    font-size: 30px;
    color: #0C9DFC;
  }




  .title-box{
    padding:24px;
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#5B579A;
    display flex;
    justify-content space-between;
    align-items center;
  }

  .room-list-box{
    /*height:268px;*/
    margin:0 20px 28px 20px;
    background:rgba(255,255,255,1);
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;
    overflow: hidden;

    .line{
      width 100%;
      border-bottom:1px solid #f4f3fc;
    }

    .head{
      height:96px;
      color:#fff;
      background:rgba(83,72,255,1);
      box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
      border-radius:12px 12px 0 0;
      /*margin:20px;*/
      padding:0 10px;
      display flex;
      align-items center;

      img {
        width 92px;
        height 92px;
      }

      .title{
        flex-wrap:wrap;
        flex-grow:1;
        margin-left:20px;

        span{
          display block;
          width 100%;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
          width 400px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;

        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }
      .subtitle{
        width 190px;
        padding-right:10px;
        display flex;
        flex-wrap:wrap;
        justify-content flex-end;

        span{
          display block;
          text-align right;
          width 100%;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }

    }


    .content{
      padding:0 60px;
      display flex;
      justify-content space-between;
      align-items center;

      .item{
        width 140px;
        padding-top:28px;
        flex-wrap wrap;


        span{
          display block;
          text-align center;
          width 100%;
          color:#5B579A;
          font-size:28px;
          margin-right:10px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          margin-top:4px;
          font-size:22px;
          color:#B2B0D2;
          margin-right:10px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          line-height:32px;
        }

        .join-text{
          width auto;
          display inline-block;
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#5348FF;
          margin-right 4px;
        }


      }

    }

    .date{
      padding:28px 28px 12px 28px;
      display flex;
      justify-content space-between;
      align-items center;
      color:#B2B0D2;

      .time{
        display: flex;
        align-items: center;
      }

      i {
        margin-right:10px;
        font-size: 24px;
      }
      i.control{
        font-size: 27px;
        color: #5451fb;
        transition: all 0.3s;
      }
      i.control.active{
        font-size: 27px;
        color: #5451fb;
        display: inline-block;
        transform: rotate(180deg);
      }

      span{
        margin-left:10px;
      }
      .bk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#B5B1FF;
        border-radius:4px;
      }
      .rmk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#F4A7BE;
        border-radius:4px;
      }


    }

  }

  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #ebe9ed;
    display: flex;
    justify-content center;
    align-items center;
    box-shadow:0px 0px 0px 1px rgba(0,0,0,0.06);

  }





  .footer-button{
    margin-top:30px;
    padding: 28px;
    display flex;
    justify-content space-between;
    align-items center;
    background #fff;
    position fixed;
    z-index: 50;
    bottom 0;
    width 100%;

    .count{
      width:300px;
      color:#5B579A;
      font-size:24px;
      font-weight bold;

      .text {
        display block;
        width 100%;
        font-size:24px;
        font-weight bold;

      }
    }

    .button{
      width:220px;
      height:72px
      border-radius:12px;
      background none;
      border:1px solid;
      font-size:24px;
      color:#5348FF;
    }
    .button.active{
      color:#fff;
      background:linear-gradient(137deg,#8B48FF 0%,#5348FF 100%);
      box-shadow:0px 16px 12x -12px #5348FF;
      border-radius:12px;
    }
  }




</style>
