<template>
<div class="dialog exchange_dialog">
  <div class="dialog_bj" @click="dialogClose()" @touchmove.prevent :class="is_mengbi ? 'active' : ''"></div>
  <div class="dialog_exchange_sign dialog_container">
    <div class="dialog_header">兑换</div>
    <div class="dialog_content">
      <section v-if="exchangeList.status == 1">
        <p>活动期间，每天可使用</p>
        <p class="dialog_content_p">2萌币兑换2门票</p>
        <p class="dialog_content_tips">*当前门票数：<span>{{exchangeList.tickets}}</span>张</p>
      </section>
      <section v-else-if="exchangeList.status == 2">
        <p>您要用{{exchangeList.price}}积分</p>
        <p>兑换{{exchangeList.goods_name}}</p>
      </section>
      <section v-else-if="exchangeList.status == 3">
        <img src="static/images/dialog_ticket.png" class="dialog_ticket_pic">
        <p class="dialog_result_p">- {{exchangeInfo}} -</p>
        <p class="dialog_result_num">当前门票数：<span>{{exchangeList.tickets}}</span>张</p>
      </section>
    </div>
    <div class="dialog_footer">
      <section class="cl footer-btn" v-if="exchangeList.status == 1">
        <p @click="submitExchangeData(exchange_text.id)"
           class="mpm_btn active fll" v-if="exchange_text.id == 1">{{exchange_text.value}}</p>
        <p class="mpm_btn fll" @click="actionBet(exchangeList.mengbi_count)" v-else>{{exchange_text.value}}</p>

        <p @click="actionBet()" class="mpm_btn flr" v-if="exchange_text.id == 1">暂不兑换</p>
        <p @click="actionBet()" class="mpm_btn flr" v-else>暂不兑换</p>
      </section>
      <section class="cl" v-if="exchangeList.status == 2">
        <p @click="submitExchange(exchangeList.action_id)" class="mpm_btn active action_bet fll">兑换</p>
        <p @click="dialogClose()" class="mpm_btn action_exchange flr">暂时不要</p>
      </section>
      <section class="cl" v-else-if="exchangeList.status == 3">
        <p @click="dialogClose()" class="mpm_btn active dialog_btn_full">知道了</p>
      </section>
    </div>
  </div>
</div>
</template>
<script>
  import store from "store";
  export default {
    name: 'dialog-exchange',
    data () {
      return {
        exchange_text:{
        	id:1, // 0.萌币不足   1:未兑换   2.已兑换
        	value:'兑换',
        },
        exchangeInfo:'',
        is_exchange:0, // 0：未兑换  1：已兑换
        is_mengbi:false,
        mengbi_img:['static/images/mengbi_img.png'],
        isStartLoading: true   //是否可以点击兑换
      }
    },
    props: {
      exchangeList: {
        type: Object
      },
    },
    created(){
      if ( this.exchangeList.lastExchangeDate == this.getTodayDate() ) {
        this.exchange_text.id = 2;
        this.exchange_text.value = '已兑换';
        this.is_exchange = 1;
      } else if (parseInt(this.exchangeList.mengbi_count) < 2) {
        this.exchange_text.id = 0;
        this.exchange_text.value = '萌币不足，获得更多';
      }
    },
    methods: {
      dialogClose(){
      	if ( this.is_exchange == 1 ){
          this.$emit('dialogHide', 1);
        }else {
          this.$emit('dialogHide', false);
        }
        this.is_mengbi = false;
      },
      actionBet(mengbi_count) {
        if (parseInt(mengbi_count) < 2) {
          this.dialogClose();
          window.location.href = 'qtpage://daily_task';
        } else {
          this.dialogClose();
        }
      },
      actionExchange() {
        this.exchangeList.status = 3;
        if (parseInt(this.exchangeList.mengbi_count) < 2) {
          this.exchange_text.id = 0;
          this.exchange_text.value = '萌币不足，获得更多';
        } else {
          if ( this.exchangeList.lastExchangeDate == this.getTodayDate() ) {
            this.exchange_text.id = 2;
            this.exchange_text.value = '已兑换';
          }
        }
      },
      submitExchange (action_id){
//        this.$emit('dialogHide', false);
//        this.$router.push({path: '/goodsDetail',query:{
//          actionId: '81',
//          order_sn: '152603519325644468016',
//          status:2
//        }});
        if ( this.isStartLoading == true) {
          this.isStartLoading = false;
          var _this = this;
          this.$api('/services/exchangeGoods/member_exchange.php', {
            action_id: action_id
          }).then(response => {
            _this.$emit('dialogHide', false);
            if (response.code == 200) {
              layer.open({
                content: '兑换成功' ,
                btn: '关闭'
              });
              if (response.data.sn) {
                _this.$router.push({path: '/goodsDetail',query:{
                  actionId: action_id,
                  order_sn: response.data.sn,
                  status:2
                }})
              }
              //兑换成功
              _this.pushEvent(store.get('loginInfo').type, 'mall', action_id);
//            _this.$router.push({path: '/record'})
            } else if(response.code == 40303){
              layer.open({
                content: '您的积分不够'
                , btn: '关闭'
              });
            } else {
              _this.$emit('dialogHide', false);
              layer.open({
                content: response.message
                , btn: '关闭'
              });
            }
            _this.isStartLoading = true;
          })
        } else {
          layer.open({
            content: '你的手速太快，请勿多次兑换。',
            btn: '关闭'
          });
        }

      },
      submitExchangeData () {
      	if (this.exchangeList.mengbi_count <= 0 ) {
          window.location.href = 'qtpage://daily_task';
        } else {
          var _this = this;
          this.$api('/services/qw/exchange_ticket.php', store.get('loginInfo')).then(response => {
            // _this.dialogClose();
          	if (response.code == 200){
              var member_info = store.get('member_info');
              member_info.lastExchangeDate = response.data.lastExchangeDate;
              member_info.mengbi_count = response.data.mengbi_count;
              member_info.ticketCount = response.data.ticketCount;
              store.set('member_info',member_info);
              _this.is_exchange = 1;
              // layer.open({
              //   content: '成功兑换'
              //   , btn: '关闭'
              // });
              _this.exchangeInfo = '兑换成功！';
              _this.exchangeList.status = 3;
              _this.exchangeList.tickets = store.get("member_info").ticketCount;
              _this.exchangeList.mengbi_count = store.get("member_info").mengbi_count;
              // _this.exchangeList.lastExchangeDate = store.get("member_info").lastExchangeDate;
              _this.exchangeShow = true;
            } else {
              // layer.open({
              //   content: response.message
              //   , btn: '关闭'
              // });
              _this.exchangeInfo = response.message;
              _this.exchangeList.status = 3;
              _this.exchangeList.tickets = store.get("member_info").ticketCount;
              _this.exchangeList.mengbi_count = store.get("member_info").mengbi_count;
              // this.exchangeList.lastExchangeDate = store.get("member_info").lastExchangeDate;
              _this.exchangeShow = true;
            }
          });
        }
//
      },

    }
  }
</script>

<style scoped>
  .exchange_dialog .footer section {
    display: flex;
    justify-content: space-between;
  }
  .exchange_dialog .dialog_bj {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .dialog_container{
    z-index: 51;
  }
  .exchange_dialog .dialog_bj.active {
    background: rgba(0, 0, 0, 0.9);
  }
  .dialog_exchange_sign {
    width: 640px;
    /*height: 400px;*/
    position: fixed;
  }
  .dialog_exchange_sign .footer-btn{
    /*display: flex;*/
  }
  .dialog_exchange_sign .footer-btn .mpm_btn{
    width: calc((100% - 32px)/2);
  }


  .dialog_exchange_sign .dialog_content p {
    line-height: 44px;
    font-size: 28px;
    color: #A8ABB3;
  }
  .dialog_exchange_sign .dialog_content p.dialog_content_p{
    line-height: 56px;
    font-size: 40px;
    font-weight: 700;
    color: #5348FF;
  }
  .dialog_exchange_sign .dialog_content p.dialog_content_tips{
    line-height: 34px;
    font-size: 24px;
    padding-top: 14px;
  }
  .dialog_exchange_sign .dialog_content p.dialog_content_tips span{
    color: #5348FF;
  }
  .dialog_exchange_sign .dialog_content .dialog_ticket_pic{
    display: block;
    width: 192px;
    margin: 0 auto;
  }
  .dialog_exchange_sign .dialog_content .dialog_result_p{
    line-height: 56px;
    font-size: 40px;
    color: #5348FF;
    margin-bottom: 20px;
  }
  .dialog_exchange_sign .dialog_content .dialog_result_num{
    font-size: 32px;
  }
  .dialog_exchange_sign .dialog_content .dialog_result_num span{
    font-size: 32px;
    color: #5348FF;
  }
  .mengbi_dialog_img {
    position: absolute;
    width: 750px;
    height: 1334px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
