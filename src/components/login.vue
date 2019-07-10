<template>
  <div class="anim-opacity2">
    <div class="login">
      <div class="login_wrap">
        <img @click="linkRoom()" class="login_wrap-img" src="../../static/images/lfl_logo.png" />
        <!-- <h2>欢迎来到伐木累</h2>-->
        <div class="from cl">
          <form action="javascript:;" method="post" class="new_code">
            <div class="country-code" data-country="中国" data-area_code="86">
              <div class="input_wrap left" @click="countryCode">
                <i class="iconfont icon-earth"></i>
                <input type="text" name="country" readonly v-model="country_name" />
                <i class="iconfont icon-icon_jiantouxiangxia-"></i>
              </div>
              <div class="input_wrap right">
                <input type="text" name="code" v-model="area_input" readonly maxlength="30" />
              </div>
            </div>
            <div class="dialog" v-if="isCode">
              <div class="dialog_bj" @click="dialogClose"></div>
              <ul class="country-all" >
                <li
                  v-for="item in country_data"
                  :class="{active:item.area_code == area_code}"
                  @click="activeCountry(item.country,item.area_code)">{{item.country}} +{{item.area_code}}</li>
              </ul>
            </div>
            <div class="input_wrap input_first cl">
              <i class="iconfont">&#xe6f4;</i>
              <label><input id="username" v-model="username" type="text" name="" placeholder="输入账号" autocomplete="off" @keydown.enter="checkedLogin()"></label>
            </div>
            <div class="input_wrap cl">
              <i class="iconfont">&#xe6f5;</i>
              <label><input id="password" type="password" v-model="password" name="password" placeholder="输入密码" autocomplete="off" maxlength="20"  @keydown.enter="checkedLogin()"></label>
            </div>
            <!--<div class="input_wrap input_last cl">-->
              <!--<i class="iconfont">&#xe6f6;</i>-->
              <!--<input id="img_code" type="number" name="imgCode" v-model="imgCode" placeholder="输入验证码" class="input_short verify" autocomplete="off" maxlength="4">-->
              <!--&lt;!&ndash;<img src="/images/login/captcha.jpg" class="captcha">&ndash;&gt;-->
              <!--<img class="captcha" :src="imgSrc" @click="changeImg()"  align="absbottom" alt="CAPTCHA" border="1"  style="cursor:pointer;border:1px solid #eeeeee; background:#ffffff"  title="看不清？点击更换你一个验证码。">-->
            <!--</div>-->
            <p id="error_p" class="error_p">{{error}}</p>
            <input type="hidden" name="action" value="login"/>
            <input id="remember" type="hidden" name="remember" value="1" />
            <input type="hidden" name="back_url" id="back_url" value="<?php echo ND()->__p__['back_url'];?>">
            <button type="submit" class="login_button" @click="checkedLogin()" @keydown.enter="checkedLogin()">登录</button>
            <div class="login_else cl">

            </div>
            <div class="login_else-or"></div>
            <div class="login-qq" @click="linkQQ()" @keydown.enter="linkQQ()"><a href="javascript:;"><img class="login-qq-img" src="../../static/images/qq.png">   QQ登录</a></div>
            <div class="login-register" @click="linkRe()"><a href="javascript:;" >注册账号</a></div>
            <!--<div class="login-forgot"><a href="/password" >忘记密码了?</a></div>-->
            <!--<div class="else_login">
                <p class="title">社交账号登录</p>
                <a href="<?php echo ND()->__p__['qq_login_url']; ?>"><img src="/images/new_index/login-qq.png"></a>
                <a href="<?php echo ND()->__p__['weibo_login_url']; ?>"><img src="/images/new_index/login-weibo.png"></a>
                <a href="<?php echo ND()->__p__['weixin_login_url']; ?>"><img src="/images/new_index/login-weixin.png"></a>
            </div>
            <p class="login_none">还没有账号？</p>
            <div class="reg_btn">
                <a href="/register" class="fll">去注册</a>
                <a href="/index" class="flr">探一探</a>
            </div>-->
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue'
  import store from 'store'
  import HeadTop from '../components/header.vue'
  let Base64 = require('js-base64').Base64;
export default {
  name: 'login',
  data () {
    return {
        imgSrc:'',
        username:'',
        password:'',
        imgCode:'',
         error:'',
         h:'',
      states:'1',
      member_info:'',
      isCode:false,
      country_data:'',
      country_name:'中国',
      area_input:'+86',
      area_code:'86'
    }
  },
  created(){
    var member_info = store.get('member_info');
    if(member_info != undefined){
      this.$router.push({path: '/home'});
    }
    this.states=this.$route.query.states;
//    this.imgSrc='/services/member/img_code.php';
//    store.remove('member_info');
  },
  mounted (){

  },
  methods:{

    linkQQ(){
      if (this.$route.query.roomID) {
        var url = this.lflmain() + '/match?roomID=' + this.$route.query.roomID;
        window.location.href = this.domain() + '/services/qq/login.php?go_url=' + Base64.encode(url);
      } else {
        var url = this.lflmain() + '/home';
        window.location.href = this.domain() + '/services/qq/login.php?go_url=' + Base64.encode(url);
      }
    },
    linkRe(){
        if(this.$route.query.roomID){
          var url = this.lflmain()+ '/match?roomID=' + this.$route.query.roomID;
          window.location.href = this.domain() + '/register?redirect_url=' + encodeURI(url);
        }else{
          var url = this.lflmain() + '/home';
          window.location.href = this.domain() + '/register?redirect_url=' + encodeURI(url);
        }

    },
    changeImg(){
      this.imgSrc = '/services/member/img_code.php?' + Math.random();
    },
    getDomain() {
      var domain = document.domain;
      if (/^\w*(.famulei.com)$/.test(document.domain)) {
        domain = 'http://' + document.domain;
      }
      return domain;
    },
    linkRoom(){
      this.$router.push({path:'/home'});
    },
    checkedLogin(){
        if(this.username==''){
          this.error='用户名不能为空!';
          return false;
        };
      if(this.password == ''){
        this.error='密码不能为空';
        return false;
      };

      var _this=this;
      this.$api('/services/webAPI/login.php', {
        area_code:this.area_code,
        uuid:this.username.trim(),
        key:this.password.trim(),
        code:this.imgCode.trim(),
        rememberMe:'1',
        type: '999',
      }).then(response => {
        if(response.code==200){
          let member_info = response.data;
        	let time = new Date();
          let endTime = time.getTime();
          Vue.set(member_info,'endTime',endTime);
          store.set('member_info',member_info);
          if(_this.states=='5'){
            _this.$router.push({path:'/home'});
          }else if(_this.$route.query.roomID){
            _this.$router.push({path:'/match', query: { roomID:_this.$route.query.roomID}});
          }else if(_this.states=='7'){
            _this.$router.push({path:'/mode'});
          }else if(_this.$route.query.actionId){
            _this.$router.push({path:'/goodsDetail', query: {actionId:_this.$route.query.actionId}});
          }else{
            _this.$router.push({path:'/home'});
          }
        }else{
          layer.open({
            content: response.message,
            btn: '关闭'
          });
        }
      });
    },
    countryCode(){
      this.$api('/services/member/country_code_list.php', {
      }).then(response => {
        if(response.code == 200){
        	this.country_data = response.data;
        	this.isCode = true;
        }
      })
    },
    activeCountry(country,code){
      this.country_name = country;
      this.area_input = '+' + code;
      this.area_code = code;
      this.isCode = false;
    },
    dialogClose(){
      this.isCode = false;
    },

  },
  components: {
    headTop:HeadTop
  }
}
</script>

<style>
.exchange-head{
  position: fixed;
  top:0;
  left:0;
  height:90px;
  width:100%;
  z-index: 20;
}
.login{
 background: url("../../static/images/background.png");
  background-size: 100% 100%;
  height:100vh;
}
.login .login_wrap-img{
  width:540px;
  margin:60px auto;
}
.login .login_wrap {
  text-align: center;
  width: 720px;
  border-radius: 5px;
  /*box-shadow: 0 0 15px #ddd;*/
  position: relative;
  margin:0 auto;
  min-height:100%;
}
.login .login-forgot{
  opacity: 0.5;
  font-size: 14px;
  color: #A5A8B2;
  height: 160px;
  line-height:160px;
}
.login .login-forgot a{
  color: #A5A8B2;
}
.login .subtitle {
  text-align: center;
  margin-top: -116px;
}
* {
  outline: none;
}
.login .login_wrap h2 {
  line-height: 68px;
  font-size: 18px;
  color: #999;
  font-weight: normal;
  text-align: center;
}

.login .login_wrap .from {
  width: 600px;
  margin: 0 auto;
}



.login .login_wrap .from .input_wrap {
  height: 120px;
  line-height: 120px;
  border-bottom: 1px solid #E7EDF1;
  width: 100%;
  display: table;
  position: relative;
}
.login .login_wrap .from .input_wrap input {

  height: 50px;
  line-height: 50px;
  display: table-cell;
  width: 95%;
  font-size:26px;
  background: rgba(0,0,0,0);
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  color: #333;
}
input[placeholder], [placeholder], *[placeholder] {
  color:#A5A8B2;
}

.login_wrap .from .country-code{
  height:120px;
  cursor: pointer;
  position: relative;
}
.login_wrap .from .country-code .left{
  position: absolute;
  top:0;
  left:0;
  width: 65%;
  border-bottom: 1px solid #E7EDF1;
  clip:auto;
}
.login_wrap .from .country-code .left .icon-icon4{
  width:20px;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
.login_wrap .from .country-code .left input{
  cursor: pointer;
  background-color: transparent;
}
.login_wrap .from .country-code .right{
  position: absolute;
  top:0;
  right:0;
  width: 25%;
  border-bottom: 1px solid #E7EDF1;
  clip:auto;
}
.login_wrap .from .country-code .right input{
  text-align: right;
  background: transparent;
}

.login .login_wrap .from .input_wrap .iconfont {
  display: table-cell;
  color: #A5A8B2;
  font-size: 34px;
  font-weight: normal;
  vertical-align: middle;
  width: 50px;
  text-align: center;
}
.login .login_wrap .from .input_wrap .icon-icon_jiantouxiangxia-{
  font-size:20px;
}
.login .login_wrap .from .input_wrap .verify {
  /*width: calc(100% - 102px);*/
}

.login .captcha {
  display: table-cell;
  width: 150px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 11px;
  border-radius: 5px;
}

.login .error_p {
  line-height: 40px;
  font-size: 30px;
  color: #FF3333;
  padding: 0 16px 10px 16px;
}

.login .login_button {
  margin-top:10px;
  height: 100px;
  /*margin-top: 40px;*/
  width: 100%;
  font-size: 32px;
  display: block;
  text-align: center;
  border: none;
  outline: none;
  letter-spacing: 4px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -transition: all 0.3s;
  -ms-transition: all 0.3s;
  -moz-transition: all 0.3s;
  background-image: linear-gradient(-51deg, #1CCCFE 0%, #0C9DFC 100%);
  box-shadow: 0 3px 6px 0 rgba(17,173,252,0.30);
  border-radius: 4px;
  color: #fff;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.login .login-qq{
  height: 100px;
  /*margin-top: 40px;*/
  background: linear-gradient(-45deg, #47E7FF 0%, #22CAFF 100%);
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(17,173,252,0.30);
  line-height:100px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.login .login-qq a{
  font-size: 32px;
  color: #FFFFFF;
}
.login .login-qq-img{
  width:50px;
  vertical-align: middle;
}
.login .login-register{
  margin-top:30px;
  height: 100px;
  /*margin-top: 40px;*/
  background-image: linear-gradient(-45deg, #5EE19C 0%, #30BF63 100%);
  box-shadow: 0 2px 6px 0 rgba(94,225,156,0.30);
  width: 100%;
  border-radius: 5px;
  font-size: 32px;
  line-height:100px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.login .login-register a{
  color: #fff;
}
.login .login_else {
  position: absolute;
  top:60px;
  left:150px;
  z-index: -1;
}
.login .login_else-or{
  height:24px;
  background: url("../../static/images/or.png")  no-repeat;
  background-size:contain;
  margin:30px 0;
}
.login .login_else span,
.login .login_else input {
  vertical-align: middle;
}

.login .remind_me input {
  margin-right: 4px;
}

.login .login_else a {
  color: #fdd000;
}

.login .else_login {
  line-height: 32px;
  font-size: 14px;
  color: #999;
}

.login .else_login .title {
  font-size: 16px;
  margin-bottom: 20px;
}

.login .else_login a {
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-left: 26px;
}

.h5_dialog{
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height:100vh;
  background: rgba(0,0,0,.7);
  z-index:99;
}
.country-all{
  position: absolute;
  top:50%;
  left:50%;
  width: 70%;
  height:50%;
  transform: translate(-50%,-50%);
  background: #fff;
  border:1px solid #E6E6E6;
  z-index:9;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .175);
  transition-duration: .3s;
  border-radius: 2px;
  padding:10px 0;
  overflow-y: auto;
}
.country-all li{
  line-height:70px;
  padding:0 20px;
  font-size:24px;
  text-align: left;
  color:#333333;
}
.country-all li.active{
  background: #E6E6E6;
}
</style>
