<template>
  <div title="签到">
    <div title="签到" class="dialog sign-dialog">
      <div class="dialog_bj" @click="dialogSignClose()" @touchmove.prevent></div>
      <div class="dialog_container dialog_7_sign">
        <div class="dialog_7_top"></div>
        <section class="dialog_home_content cl">
          <div class="dialog_7_item" :class="sign_data.number == 1 ? 'flipInY' : sign_data.number > 1 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第1天</p>
            <p class="dialog_7_item_prise">1张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item" :class="sign_data.number == 2 ? 'flipInY' : sign_data.number > 2 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第2天</p>
            <p class="dialog_7_item_prise">1张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item" :class="sign_data.number == 3 ? 'flipInY' : sign_data.number > 3 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket2.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第3天</p>
            <p class="dialog_7_item_prise">2张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item" :class="sign_data.number == 4 ? 'flipInY' : sign_data.number > 4 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第4天</p>
            <p class="dialog_7_item_prise">1张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item" :class="sign_data.number == 5 ? 'flipInY' : sign_data.number > 5 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第5天</p>
            <p class="dialog_7_item_prise">1张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item" :class="sign_data.number == 6 ? 'flipInY' : sign_data.number > 6 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第6天</p>
            <p class="dialog_7_item_prise">1张</p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
          <div class="dialog_7_item dialog_7_day7" :class="sign_data.number == 7 ? 'flipInY' : sign_data.number > 7 ? 'dialog_7_item_signed':''">
            <img src="static/images/ticket3.png" class="dialog_7_item_pic">
            <p class="dialog_7_item_day">第7天</p>
            <p class="dialog_7_item_prise dialog_7_item_prise7 cl"><span class="fll">3张</span><span class="flr">100积分</span></p>
            <div class="dialog_7_item_signed_pic"></div>
          </div>
        </section>
        <div class="footer">
          <p @click="roomExchangeBtn()" class="dialog_7_btn" v-if="DialogSignClose">赚取更多门票</p>
          <div class="dialog_sign_success" v-else>
            <div class="dialog_sign_success_bg">
              <img src="static/images/sign_success_gou.png" class="dialog_sign_success_gou">
              <!--<div class="dialog_sign_success_shadow"></div>-->
            </div>
            <img src="static/images/sign_success_bg.png" class="dialog_sign_success_hua">
            <p class="dialog_sign_success_p">签到成功</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dialogSign",
    data () {
      return {
        sign_data:{},
      }
    },
    mounted(){
      this.Sign7Data();
    },
    methods:{
      //关闭签到弹层
      dialogSignClose() {

      },
      //获取连续签到数据
      Sign7Data() {
        var _this = this;
        this.$api("/services/fantasy/get_sign_info.php", {}).then(response => {
          if (response.code == '200') {
            _this.sign_data = response.data;
            console.log(_this.sign_data);
          }
        })
      },
      //执行签到动作
      getSignData() {
        // this.is_sign.room_sign = 1;
        var _this = this;
        this.$api("/services/fantasy/room_sign.php", {}).then(response => {
          // _this.isDialogSign = true;
          if (response.code == 200) {
            _this.sign_data = response.data;
            var member_info = store.get('member_info');
            member_info.sign_date = this.getTodayDate();
            member_info.ticketCount = response.data.my_ticket;
            member_info.num_7 = response.data.num_7;
            member_info.sign_number = response.data.number;
            store.set('member_info',member_info);
            _this.is_sign = {
              status: 1,
              text:'已签到'
            };

          }
        })
      },
      roomExchangeBtn(){},



    }
  }
</script>

<style lang="stylus" scoped>

  //签到弹层
  .dialog_home_content {
    margin-top: 120px;
    text-align: center;
    padding: 0 30px;
  }
  .sign-dialog .dialog_bj {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .sign-dialog .dialog_container{
    z-index: 51;
  }
  /*7天连续签到*/
  .dialog_7_sign{
    width: 620px;
    height: 684px;
    background: url("../../static/images/popup_bg.png") no-repeat;
    background-size: cover;
    overflow: initial;
  }
  .dialog_7_sign .dialog_home_content{
    margin-top: 116px;
    padding: 0 28px;
  }
  .dialog_7_sign .dialog_7_item{
    width: 140px;
    height: 190px;
    position: relative;
    float: left;
  }
  .dialog_7_sign .dialog_7_item_pic{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .dialog_7_sign .dialog_7_item.dialog_7_day7{
    width: 284px;
  }
  .dialog_7_item .dialog_7_item_day{
    line-height: 42px;
    font-size: 20px;
    color: #fff;
    position: relative;
    z-index: 2;
    margin-bottom: 76px;
  }
  .dialog_7_item .dialog_7_item_prise{
    line-height: 44px;
    font-size: 22px;
    color: #fff;
    position: relative;
    z-index: 2;
  }
  .dialog_7_item .dialog_7_item_prise7{
    width: 220px;
    position: relative;
    padding-left: 20px;
    margin: 0 auto;
  }
  .dialog_7_item .dialog_7_item_prise7 span{
    line-height: 44px;
    font-size: 22px;
  }
  .dialog_7_sign .dialog_7_top{
    width: 512px;
    height: 226px;
    background: url("../../static/images/popup_top.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 54px;
    top: -164px;
  }
  .dialog_7_sign .footer{
    height: auto;
    padding-top: 40px;
  }
  .dialog_7_btn{
    display: block;
    width: 448px;
    height: 84px;
    line-height: 82px;
    text-align: center;
    color: #fff;
    font-size: 36px;
    background-image: linear-gradient(39deg, #FF8B5E 0%, #FFC124 100%);
    border-radius: 100px;
    margin: 0 auto;
  }
  .dialog_7_signed{
    width: 620px;
    height: 460px;
    background: url("../../static/images/popup_bg2.png") no-repeat;
    background-size: cover;
    overflow: initial;
  }
  .dialog_7_signed .dialog_7_top{
    width: 512px;
    height: 120px;
    background: url("../../static/images/popup_top2.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 54px;
    top: -64px;
  }
  .dialog_7_signed .dialog_home_content{
    margin-top: 68px;
    padding: 0 28px;
  }

  .dialog_7_signed .dialog_home_content .dialog_7_signed_status{
    font-size: 32px;
    font-weight: normal;
    color: #FFFFFF;
  }
  .dialog_7_signed .dialog_home_content .dialog_7_signed_info{
    line-height: 100px;
    font-size: 48px;
    color: #D73CFA;
    padding-top: 36px;
  }
  .dialog_7_signed .dialog_home_content .dialog_7_signed_tips{
    font-size: 24px;
    color: #A8ABB3;
  }
  .dialog_7_signed .footer{
    height: auto;
    padding-top: 46px;
  }
  .dialog_7_signed .dialog_7_btn{
    box-shadow: 0 10px 20px 2px rgba(255,166,36,0.50);
  }
  .dialog_7_item_signed .dialog_7_item_day,.dialog_7_item_signed .dialog_7_item_prise,.dialog_7_item_signed .dialog_7_item_pic{
    opacity: 0.3;
  }
  .dialog_7_item_signed_pic{
    width: 96px;
    height: 82px;
    background: url("../../static/images/signed.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 40px;
    margin-left: -48px;
    z-index: 2;
    opacity: 0;
  }
  .dialog_7_item_signed .dialog_7_item_signed_pic{
    opacity: 1;
  }

  .dialog_sign_success{
    text-align: center;
    position: relative;
  }
  .dialog_sign_success_bg{
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  .dialog_sign_success_hua{
    width: 80px;
    position: absolute;
    top: 25px;
    transform: translate(-50%, -50%);
  }
  .dialog_sign_success_gou{
    display: block;
    width: 55px;
    margin: 15px auto 0 auto;
  }
  .dialog_sign_success_p{
    line-height: 62px;
    font-size: 34px;
    font-weight: 700;
    color: #fff;
  }
  .dialog_sign_success_shadow{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left:0;
    background:#fff;
    animation: myfirst 3s;
    -moz-animation: myfirst 3s;  /* Firefox */
    -webkit-animation: myfirst 3s;  /* Safari 和 Chrome */
    -o-animation: myfirst 3s;
    animation-fill-mode:forwards;
  }
  @keyframes myfirst
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-o-keyframes myfirst /* Opera */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  .flipInY{
    backface-visibility: visible !important;
    /*animation-name: flipInY;*/
    animation: flipInY 1.5s;
    -moz-animation: flipInY 1.5s;  /* Firefox */
    -webkit-animation: flipInY 1.5s;  /* Safari 和 Chrome */
    -o-animation: flipInY 1.5s;
    animation-fill-mode:forwards;
  }
  .flipInY .dialog_7_item_day,.flipInY .dialog_7_item_prise,.flipInY .dialog_7_item_pic{
    animation: signed_item 1.5s;
    -moz-animation: signed_item 1.5s;  /* Firefox */
    -webkit-animation: signed_item 1.5s;  /* Safari 和 Chrome */
    -o-animation: signed_item 1.5s;
    animation-fill-mode:forwards;
  }
  .flipInY .dialog_7_item_signed_pic{
    animation: signed_pic 2s;
    -moz-animation: signed_pic 2s;  /* Firefox */
    -webkit-animation: signed_pic 2s;  /* Safari 和 Chrome */
    -o-animation: signed_pic 2s;
    animation-fill-mode:forwards;
  }
  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 0deg);
      animation-timing-function: ease-in;
      opacity: 1;
    }
    20% {
      transform: perspective(400px) rotate3d(0, 1, 0, -10deg);
      animation-timing-function: ease-in;
    }

    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 1;
    }

    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px);
    }
  }
  @keyframes signed_item {
    from { opacity: 1;}
    40% { opacity: 1;}
    80% { opacity: 0.6;}
    to { opacity: 0.3;}
  }
  @keyframes signed_pic {
    from { opacity: 0; transform: scale3d(1, 1, 1);}
    60% { opacity: 0; transform: scale3d(1.3, 1.3, 1.3);}
    80% { opacity: 1; transform: scale3d(1.3, 1.3, 1.3);}
    to { opacity: 1; transform: scale3d(1, 1, 1);}
  }

</style>
