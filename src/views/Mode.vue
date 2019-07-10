<template>
  <div class="mode_container anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="匹配模式"
        go-back="true"
      ></head-top>
    </div>
    <section v-if="mode_data != ''">
      <div class="mode_menu" v-if="mode_data.rule!= []">
        <p class="title">选择奖金池</p>
        <div class="mode_tabs">
          <ul>
            <li class="fll"
                :class="{active:isCur==index}"
                v-for="(item,index) in mode_data.rule"
                @click="tabsBtn(index,item.ticket)">
              <p class="test">奖励</p>
              <p class="guozi">{{item.guozi}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></p>
              <p class="price">花费<span>{{item.ticket}}</span><i class="iconfont oran">&#xe6c5;</i></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mode_compose" v-if="mode_data.list!= []">
        <P class="title">选择比赛组合</P>
        <section v-for="lists in mode_data.list">
          <div class="mode_lists">
            <div class="title">
              <p class="fll"><span>{{lists.at_times}}</span>人正在匹配</p>
              <p class="selected_btn flr" @click="selectedBtn(lists.roomID)">选择阵容</p>
            </div>
            <ul class="mode_lists_content">
              <li v-for="item in lists.room_matches">
                <div class="mode_team">
                  <label><img :src="item.team_a_image_thumb" alt=""></label>
                  <p>{{item.team_a_short_name}}</p>
                </div>
                <div class="mode_team_vs">
                  <p>{{item.start_time_string}}</p>
                  <p>VS</p>
                </div>
                <div class="mode_team">
                  <label><img :src="item.team_b_image_thumb" alt=""></label>
                  <p>{{item.team_b_short_name}}</p>
                </div>
              </li>
              <li class="mode_patch" v-if="lists.room_matches.length % 2 != 0"></li>
            </ul>
          </div>
        </section>
      </div>
    </section>

    <!-- 弹框 -->
    <dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>

  </div>



</template>

<script>
  import axios from 'axios'
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import DialogPay from '../components/dialogPay.vue'
  export default {
    name: 'mode_container',
    data () {
      return {
        isCur:0,
        mode_data:'',
        my_bank:'',
        vShow:false,
        payList:{
          status:'',
          isPrompt:false,
          msg_text:'',
          isTickts:'',

          group_ticket:'',
          my_ticket:'',
        },
      }
    },
    mounted(){
      this.getData(0);
    },
    methods:{
      getData(index,ticket){
        let _this = this;
        this.$api('/services/fantasy/room_8_list.php', {
          type:index
        }).then(response => {
          if(response.code == 200){
            _this.mode_data = response.data;
            if(!ticket){
              _this.payList.group_ticket = _this.mode_data.rule[0].ticket
            }
          }else{
            layer.open({
              content: response.data.message
              ,btn: '关闭'
            });
          }
        })

        //跨域
//      axios.get('http://staging-api-1.famulei.com/services/fantasy/room_8_list.php?sign=31F5B7EBF65ACFEE2D37AB7BF9E0D322&api_version=4.0.0&token=&type=1')
//        .then(function (response) {
//        	console.log(response)
//          _this.mode_data = response.data.data
//        })
//        .catch(function (error) {
//          alert(error.data.message)
//        })
      },
      myBank(){
        let _this = this;
        this.$api('/services/userCenter/my_bank.php', {
        }).then(response => {
          if(response.code == 200){
            _this.my_bank = response.data;
          }
        })
      },
      change(msg){
        this.vShow = msg
        // console.log(msg)
      },
      tabsBtn(index,ticket){
        this.isCur = index;
        this.getData(index,ticket);
        this.payList.group_ticket = ticket;
      },
      selectedBtn(roomID){
        this.myBank();
        setTimeout(() => {
          store.remove('user');
          let member_info = store.get('member_info');
          if(member_info == undefined){
            this.$router.push({path:'/login', query: { states: '7'}});
          }else{
          	console.log(this.my_bank.ticket)
          	console.log(this.payList.group_ticket)
            if(this.payList.group_ticket > this.my_bank.ticket){
              this.payList.my_ticket = this.my_bank.ticket;
              this.payList.status = 7;
              this.payList.msg_text = '您的门票不足';
              this.payList.isTickts = true;
              this.vShow = true;
            }else{
              this.$router.push({ path:'/Selected', query: { roomID: roomID} })
            }
          }
        }, 500);
      }
    },
    components: {
      headTop:HeadTop,
      dialogPay:DialogPay,
    }
  }
</script>

<style>
  .mode_menu{
    margin-top:90px;
    background: #fff;
  }
  .mode_menu .title,.mode_compose>.title{
    line-height:80px;
    padding:0 24px;
  }
  .mode_tabs{
    padding:0 24px 24px;

  }
  .mode_tabs ul{
    overflow: hidden;

  }
  .mode_tabs li{
    width: 170px;
    height:150px;
    margin:0 31px;
    background: url('../../static/images/bonus_bj_1.png')no-repeat;
  }
  .mode_tabs li.active{
    background: url('../../static/images/bonus_bj_2.png')no-repeat;
  }
  .mode_tabs li p{
    text-align: center;
    color:#373A41;
  }
  .mode_tabs li .test{
    margin:15px 0 0;
    font-size:20px;
    color:#373A41;
  }
  .mode_tabs li .guozi{
    font-size:36px;
    color:#373A41;
    font-weight: bold;
  }
  .mode_tabs li .guozi .icon{
    width: 30px;
    height:30px;
    margin-left:5px;
  }
  .mode_tabs li .price{
    margin-top:10px;
  }
  .mode_tabs li .price i{
    margin-left:5px;
    color:#fe892c;
    font-size:24px;
  }
  .mode_tabs li .price span{
    margin-left:5px;
    font-size:30px;
  }
  .mode_lists{
    margin:0 24px 24px;
    border-radius: 10px;
    background: #fff;
    padding:0 24px;
    box-shadow: -1px 0 2px #b7ced0, -1px 0 3px #b7ced0, 1px 0 3px #b7ced0, 2px 0 3px #b7ced0;
  }
  .mode_lists .title{
    line-height:80px;
    overflow: hidden;
  }
  .mode_lists .title p{
    font-size:30px;
  }
  .mode_lists .title p span{
    color:#0C9DFC;
    font-size:30px;
  }
  .mode_lists .title p.selected_btn{
    display: inline-block;
    padding:0 20px;
    background: #0C9DFC;
    color:#fff;
    line-height:50px;
    border-radius: 30px;
    margin-top:16px;
  }
  .mode_lists_content{
    overflow: hidden;
  }
  .mode_lists_content li{
    width: calc(50% - 12px);
    background: #f1f1f1;
    border-radius: 4px;
    margin-bottom:24px;
    float:left;
    padding:24px 5px;
    /*overflow: hidden;*/
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }
  .mode_lists_content li>div{
    -webkit-flex: auto;
    flex: auto;
  }
  .mode_lists_content li:nth-of-type(2n){
    float:right;
  }
  .mode_patch{
    height:134px;
  }
  .mode_team{
    width: 95px;
    position: relative;
  }
  .mode_team label{
    display: block;
    position: absolute;
    left:50%;
    width: 50px;
    height:50px;
    transform: translate(-50%, 0);
    overflow: hidden;
  }
  .mode_team label img{
    display: block;
    width: 100%;
  }
  .mode_team p{
    margin-top:55px;
    text-align: center;
  }
  .mode_team_vs{
    padding-top:17px;
    width: 130px;
  }
  .mode_team_vs p{
    text-align: center;
  }
  .mode_team_vs p:first-Child{
    font-size:20px;
  }
</style>
