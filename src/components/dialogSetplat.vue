<template>
  <div class="dialog" title="选择设备类型">
    <div class="dialog_bj" @click="SetPlatBtn('3')" @touchmove.prevent></div>
    <div class="dialog_container dialog_setplat">
      <div class="dialog_header">
        <p v-if="setPlatStep == '0'">幻联赛门票区分平台通知</p>
        <p v-else-if="setPlatStep == '1'">选择平台</p>
        <p v-else-if="setPlatStep == '2'">绑定成功</p>
      </div>
      <div class="dialog_content dialog_setplat_content">
        <section v-if="setPlatStep == '0'" class="dialog_setplat_step1">
            <p class="ios_p" v-show="SetPlat == 'ios'"><b>同一账户下的门票不互通</b></p>
            <p v-show="SetPlat == 'ios'">亲爱的召唤师，幻联赛即将上线充值功能，开启充值后，门票账户将不互通。针对老玩家，我们将在充值上线前为玩家提供平台选择，<b>一旦绑定,立即生效,门票不再互通。</b>感谢您的理解。</p>
            <p v-show="SetPlat == 'android'"><b>同一账户下iOS和Android的门票单独使用</b></p>
            <p v-show="SetPlat == 'android'">亲爱的召唤师，幻联赛即将上线充值功能，开启充值后，iOS与Android用户的门票账户将不互通。针对老玩家，我们将在充值上线前为玩家提供平台选择，<b>一旦绑定,立即生效,门票不再互通。</b>感谢您的理解。</p>
        </section>
        <section v-else-if="setPlatStep == '1'" class="dialog_setplat_step2">
            <div class="set_img cl" v-show="SetPlat == 'ios'">
                <img src="static/images/set_ios.png" class="" @click="set_plat('ios')" v-show="SetPlat == 'ios'">
            </div>
            <div class="set_img cl" v-show="SetPlat == 'android'">
                <img src="static/images/unset_ios.png" class="fll" @click="set_plat('ios')">
                <div class="skew fll"></div>
                <img src="static/images/set_android.png" class="flr" @click="set_plat('android')">
            </div>
            <p class="tips"><span class="red">*</span>绑定后，门票不再互通，请谨慎选择。</p>
        </section>
        <section v-else-if="setPlatStep == '2'" class="dialog_setplat_step3">
          <img src="static/images/success_ios.png" v-if="SetPlat == 'ios'">
          <img src="static/images/success_android.png" v-else>
          <p>您的门票绑定 <span v-html="SetPlat == 'android' ? '安卓' : SetPlat"></span> 平台 成功</p>
          <p class="tips">当前门票余额：<span>{{PlatTicket}} </span>张</p>
        </section>
      </div>
      <div class="dialog_footer">
        <p @click="SetPlatBtn('1')" class="mpm_btn active dialog_btn_full" v-if="setPlatStep == '0'">选择平台</p>
        <p @click="SetPlatBtn('2')" class="mpm_btn active dialog_btn_full" v-else-if="setPlatStep == '1'">确定</p>
        <p @click="SetPlatBtn('3')" class="mpm_btn active dialog_btn_full" v-else-if="setPlatStep == '2'">关闭</p>
      </div>
    </div>
  </div>
</template>
<script>
  import store from "store";
  export default {
    name: 'dialog-setplat',
    data () {
      return {
        setPlatStep: '0',  //设置设备  0: 文字描述  1: 选择设备  2: 成功返回门票数
        SetPlat:'ios',   //ios android
        PlatTicket:''   //门票数
      }
    },
    created(){
      this.inquiryPlat();
    },
    methods: {
      inquiryPlat(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
          this.SetPlat = 'ios';
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          this.SetPlat= 'android';
        }
      },
      SetPlatBtn (step){
        if(step == '1'){
          this.setPlatStep = step;
        }else if(step == '2'){
          var _this = this;
          let plat = _this.SetPlat == 'ios' ? '1' : '2';
          _this.pushEvent(store.get('loginInfo').type, 'setplat', _this.SetPlat);
          this.$api('/services/qw/set_plat.php', {
            plat:plat,
          }).then(response => {
            if (response.code == 200) {
              let member_info = store.get('member_info');
              member_info.ticket_type = plat;
              store.set('member_info',member_info);
              _this.PlatTicket = response.data.ticketCount;
              _this.setPlatStep = step;
              _this.pushEvent(store.get('loginInfo').type, 'setplat', 'success');
            }else{
              _this.setPlatStep = step;
              _this.pushEvent(store.get('loginInfo').type, 'setplat', response.code);
              layer.open({
                content: response.message
                , btn: '关闭'
              });
              this.$emit('dialogHide', false);
            }
          })
        }else if(step == '3'){
          console.log('close');
          this.$emit('dialogHide', false);

        }
      },
      set_plat(type){
        this.SetPlat = type;
      }
    }
  }
</script>
<style scoped>
  .dialog_bj {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .dialog_container{
    z-index:51;
  }
    .dialog_setplat{
        width: 620px;
    }
    .dialog_setplat .dialog_header p{
        font-size: 40px;
        color: #FFFFFF;
    }
    .dialog .dialog_setplat_content{
        padding: 0 46px;
    }
    .dialog_setplat_content p{
        line-height: 40px;
        font-size: 28px;
        color: #A8ABB3;
        text-align: justify;
        margin-bottom: 20px;
    }
    .dialog_setplat_content p b{
        font-size: 28px;
        color: #656973;
        text-align: justify;
    }
    .dialog_setplat_content p.ios_p{
        text-align: center;
    }
    .dialog_setplat_content .dialog_setplat_step2 p.tips{
        text-align: center;
        font-size: 24px;
        color: #656973;
    }
    .dialog_setplat_content .dialog_setplat_step2 p.tips span.red{
        color: red;
    }
    .dialog_setplat_content .dialog_setplat_step2 .set_img{
        width: 412px;
        margin: 12px auto 32px auto;
    }
    .dialog_setplat_content .dialog_setplat_step2 .set_img img{
        width: 148px;
        height: 188px;
    }
    .dialog_setplat_content .dialog_setplat_step2 .skew{
        width: 12px;
        height: 48px;
        background: #D7D1DF;
        transform: skew(-23deg);
        margin: 68px 0 0 56px;
        float: left;
    }
    .dialog_setplat_content .dialog_setplat_step3 img{
        width: 116px;
        margin: 8px 0 36px 0;
    }
    .dialog_setplat_content .dialog_setplat_step3 p{
        text-align: center;
        font-size: 28px;
        color: #656973;
        margin-bottom: 12px;
    }
    .dialog_setplat_content .dialog_setplat_step3 p.tips{
        font-size: 28px;
        color: #A8ABB3;
    }
    .dialog_setplat_content .dialog_setplat_step3 p span{
        font-size: 28px;
        color: #000000;
    }
</style>
