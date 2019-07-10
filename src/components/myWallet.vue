<template>
  <div class="myWallet anim-opacity2">
    <div class="myWallet-head">
      <head-top
        head-title="我的钱包"
        go-back="true"
      ></head-top>
    </div>
    <div class="myWallet-cont">
      <div class="myWallet-cont-top">
        <div class="myWallet-cont-top-title">
          <svg aria-hidden="true" class="my-wallet-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use>
          </svg>
          钻石: <span>{{myWallet.diamond}}</span></div>
        <ul class="myWallet-cont-top-list">
          <li>
            <router-link to="/diamondList">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use>
                </svg>
              </p>
              <p>购买</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/ticket_log', query: { log_type: 1} }">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_mingxi"></use>
                </svg>
              </p>
              <p>明细</p>
            </router-link>
          </li>
          <li>
          </li>
        </ul>
      </div>

      <div class="myWallet-cont-top">
        <div class="myWallet-cont-top-title">
          <svg aria-hidden="true" class="my-wallet-icon1">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
          </svg>
          果子: <span>{{myWallet.guozi1}}</span></div>
        <ul class="myWallet-cont-top-list">
          <li>
            <a href="javascript:;" @click="taskLink()">
              <p class="myWallet-key"><img src="static/images/wallet_icon_task.png" alt=""></p>
              <p>任务</p>
            </a>
          </li>
          <li>
            <router-link :to="{ path:'/ticket_log', query: { log_type: 2} }">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_mingxi"></use>
                </svg>
              </p>
              <p>明细</p>
            </router-link>
          <li>

          </li>
        </ul>
      </div>

      <div class="myWallet-cont-top">
        <div class="myWallet-cont-top-title">
          <svg aria-hidden="true" class="my-wallet-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use>
          </svg>
          门票: <span>{{myWallet.ticket}}</span></div>
        <ul class="myWallet-cont-top-list">
          <li>
            <router-link to="/Tickets">
              <p class="myWallet-key"><img src="static/images/ticket_o.png" alt=""></p>
              <p>购买</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/ticket_log', query: { log_type: 0} }">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_mingxi"></use>
                </svg>
              </p>
              <p>明细</p>
            </router-link>
          </li>
          <li>
            <router-link to="/home">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_LFL-"></use>
                </svg>
              </p>
              <p>幻联赛</p>
            </router-link>
          </li>

        </ul>
      </div>
      <div class="myWallet-cont-top">
        <div class="myWallet-cont-top-title"><img class="key_logo" src="static/images/key_logo_2.png" alt="">
          钥匙: <span>{{myWallet.fantasy_key}}</span></div>
        <ul class="myWallet-cont-top-list">
          <li>
            <router-link to="/Key">
              <p class="myWallet-key"><img src="static/images/key_logo_2.png" alt=""></p>
              <p>购买</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/ticket_log', query: { log_type: 3} }">
              <p>
                <svg aria-hidden="true" class="">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_mingxi"></use>
                </svg>
              </p>
              <p>明细</p>
            </router-link>
          </li>
          <li></li>
          <!--<li >-->
            <!--<div @click="createRoom">-->
              <!--<p class="myWallet-key"><img src="static/images/key_room.png" alt=""></p>-->
              <!--<p>创建房间</p>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>



      <!--<div class="myWallet-cont-top">
        <div class="myWallet-cont-top-title"><svg aria-hidden="true" class="icon match_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_yue-"></use></svg>  余额: <span>{{myWallet.balance/100}}</span></div>
        <ul class="myWallet-cont-top-list">
          <li @click="showAlert">
            <p><svg aria-hidden="true" class=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_yue-"></use></svg></p>
            <p>提现</p>
          </li>
          <li @click="showAlert">
            <p><svg aria-hidden="true" class=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_mingxi"></use></svg></p>
            <p>明细</p>
          </li>
          <li>

          </li>
        </ul>
      </div>-->
    </div>

    <!-- 弹框 -->
    <!--<dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>-->
  </div>
</template>

<script>

  import store from 'store'
  import HeadTop from '../components/header.vue'
//  import DialogPay from '../components/dialogPay.vue'

  export default {
    name: 'global',
    data () {
      return {
        myWallet: {},
//        vShow:false,
//        payList:{
//          sku_id:'',
//          status:'',
//          isPrompt:false,
//          index:'',  //1:钻石成功  2.钻石失败  3.门票成功  4.门票失败
//          diamond_number:'',
//          buy_number:'',
//          sku_diamond_number:'',
//          first_prize:'',
//          pmt_rule_diamond_number:''
//        },
      }
    },
    created(){
      let member_info = store.get('member_info');
      if (member_info == undefined) {
        this.$router.push({path: '/home'});
      }
      var _this = this;
      this.$api('/services/userCenter/my_bank.php', {

      }).then(response => {
        _this.myWallet = response.data;

      })
    },
    methods: {
      taskLink(){
        var href = window.location.href;
        var curHref = href.slice(0,href.indexOf('#'));

        let member_info = store.get('member_info');
        if(member_info != undefined){
          var url = this.domain() + '/task';
          window.location.href = this.domain() + '/services/web_redirect.php?member_id=' + member_info.member_id + '&token=' + member_info.w_token + '&url=' + encodeURI(url);
        }

      },
      showAlert(){
        layer.open({
          content: '暂未开放'
          ,btn: '关闭'
        });
      },
      change(msg){
        this.vShow = msg
        // console.log(msg)
      },
//      createRoom(){
//        this.payList.status = 2;
//        this.vShow = true
//      }
    },
    components: {
      headTop: HeadTop,
//      dialogPay:DialogPay,
    }
  }
</script>

<style>
  /*.myWallet .myWallet-head{
    position: fixed;
    top:0;
    left:0;
    width:100%;
  }*/
  /*.myWallet  .myWallet-cont{
    margin-top:90px;
  }*/
  .myWallet .myWallet-cont-top {
    background: #fff;
    margin-bottom: 12px;
  }

  .myWallet-key img {
    margin-top: 38px;
    width: 76px;
  }

  .myWallet .my-wallet-icon {
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-bottom: 4px;
  }

  .myWallet .my-wallet-icon1 {
    height: 22px;
    width: 22px;
    vertical-align: middle;
    margin-bottom: 6px;
  }

  .myWallet .myWallet-cont-top-title {
    height: 90px;
    line-height: 90px;
    font-size: 28px;
    margin-left: 24px;
  }

  .myWallet .myWallet-cont-top-title span {
    font-size: 28px;
    font-weight: bold;
  }

  .myWallet-cont-top-title .key_logo {
    width: 24px;
  }

  .myWallet .myWallet-cont-top-list {
    border-top: 1px solid #eeeeee;
    display: flex;
    display: -webkit-flex;
    height: 204px;
  }

  .myWallet .myWallet-cont-top-list li {
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
  }

  .myWallet .myWallet-cont-top-list li p:nth-of-type(1) svg {
    margin-top: 38px;
    height: 76px;
    width: 76px;
  }

  .myWallet .myWallet-cont-top-list li p:nth-of-type(2) {
    margin-top: 10px;
    font-size: 24px;
    /*font-weight:bold;*/
  }

  .myWallet .myWallet-cont-top-list li:nth-of-type(2) {
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
  }
</style>
