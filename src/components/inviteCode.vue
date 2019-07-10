<template>
  <div class="inviteCode anim-opacity2">
    <div class="inviteCode-head">
      <head-top
        head-title="邀请码"
        go-back="true"
      ></head-top>
    </div>
    <div class="inviteCode-cont">
      <div class="inviteCode-cont-tab">
        <div class="inviteCode-tab-left" @click="tabLink(1)">
          <p v-bind:class="{'nav-color':tabList==1}">邀请好友</p>
          <span v-bind:class="{'nav-active':tabList==1}" ></span>
          </div>
        <div class="inviteCode-tab-right" @click="tabLink(2)">
          <p v-bind:class="{'nav-color':tabList==2}">输入邀请码</p>
          <span v-bind:class="{'nav-active':tabList==2}"></span>
          </div>
      </div>
      <div v-show="tabList==1" class="inviteCode-cont-first">
        <div class="inviteCode-first-img">
          <img  src="../../static/images/invite_bg.png" alt="">
          <p>分享邀请码给好友，好用使用后两人各获得5<svg aria-hidden="true" class="icon_menpiao"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></p>
        </div>
        <div class="inviteCode-first-code">
          <div class="inviteCode-first-title">我的邀请码</div>
          <ul class="inviteCode-first-myCode">
            <li><p>{{userCode}}</p></li>
            <li><p>{{userCode1}}</p></li>
            <li><p>{{userCode2}}</p></li>
            <li><p>{{userCode3}}</p></li>
            <li><p>{{userCode4}}</p></li>
            <li><p>{{userCode5}}</p></li>
          </ul>
          <div class="inviteCode-first-times">本月还能使用<span>{{myCode.invite_code_surplus_times}}</span>次</div>
          <div v-if="myCode.invite_code_surplus_times==0" @click="warnMess()" class="inviteCode-first-share1" >复制邀请码</div>
          <div v-else @click="copyCode" class="inviteCode-first-share" id="copyRooms">复制邀请码</div>
          <div class="inviteCode-first-times">已成功邀请{{myCode.success_invite_number}}位好友，得到{{myCode.success_invite_key_number}}<svg aria-hidden="true" class="icon_menpiao"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></div>
          <div @click="linkSuccess()" class="inviteCode-first-link">(<span>看看他们是谁</span>)</div>
        </div>
      </div>
      <div v-show="tabList==2" class="inviteCode-cont-second">
        <div class="inviteCode-second-title">输入六位邀请码</div>
        <div v-bind:class="{'inviteCode-first-myCode1':myCode.invitation_code=='','inviteCode-first-myCode2':myCode.invitation_code!=''}" class="" >
          <li><p>{{username1}}</p></li>
          <li><p>{{username2}}</p></li>
          <li><p>{{username3}}</p></li>
          <li><p>{{username4}}</p></li>
          <li><p>{{username5}}</p></li>
          <li v-if="myCode.invitation_code!=''"><p>{{username6}}</p></li>
          <li v-else><p></p></li>
          <li v-show="myCode.invitation_code==''" id="inputButton6"><p><input @keyup="inputFocus()"  v-model="username" type="text" name="" maxlength="1"  autocomplete="off"></p></li>
        </div>
        <div v-if="myCode.invitation_code!=''" class="inviteCode-second-button1">已接受邀请</div>
        <div v-else-if="username6==''" class="inviteCode-second-button1" >接受邀请</div>
        <div v-else class="inviteCode-second-button" @click="shareCode">接受邀请</div>
        <div v-show="myCode.invitation_code!=''" class="inviteCode-yes">已接受来自“<span>{{myCode.member_id_invitation_code_nickname}}</span>”的邀请</div>
      </div>
    </div>
    <div v-show="invite" class="maskInvite">
      <div class="maskInvite-cont">
        <div class="maskInvite-cont-title">提示</div>
        <div class="maskInvite-cont-message">{{message}}</div>
        <div @click="inviteHide()" class="maskInvite-cont-button">确定</div>
      </div>
    </div>
    <div v-show="invite1" class="maskInvite" @click="hideInvite()">
      <div class="maskInvite-cont">
        <div class="maskInvite-cont-title"></div>
        <div class="maskInvite-cont-message">成功接受邀请</div>
        <div  class="maskInvite-cont-button1">5 <svg aria-hidden="true" class="icon_menpiao"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></div>
      </div>
    </div>
    <div v-show="invite2" class="maskInvite" @click="hideInvite1()">
      <div class="maskInvite-cont1">
        <div class="maskInvite-cont-title"></div>
        <div class="maskInvite-cont-message2">本月邀请次数已用完每个月1号重置</div>
      </div>
    </div>
  </div>


</template>

<script>
  import HeadTop from '@/components/header'
  import Clipboard from 'clipboard'
  import store from 'store'
export default {
  name: 'myRecord',
  data () {
    return {
        tabList:1,
      invite:false,
      invite1:false,
      invite2:false,
      userCode:'',
      userCode1:'',
      userCode2:'',
      userCode3:'',
      userCode4:'',
      userCode5:'',
      username:'',
      username1:'',
      username2:'',
      username3:'',
      username4:'',
      username5:'',
      username6:'',
      m:1,
      myCode:'',
      member_info:'',
      message:''
    }
  },
  created(){
    this.member_info = store.get('member_info');
    if(this.member_info == undefined){
      this.$router.push({path:'/home'});
    }
    this.loadTop()
  },
  mounted(){

  },
  methods:{
      loadTop(){
        var _this=this;
        this.$api('/services/userCenter/inviting_friends.php', {
          // pass:true
        }).then(response => {
          if(response.code==200){
            console.log(response)
            _this.userCode=response.data.my_invitation_code.substring(0,1);
            _this.userCode1=response.data.my_invitation_code.substring(1,2);
            _this.userCode2=response.data.my_invitation_code.substring(2,3);
            _this.userCode3=response.data.my_invitation_code.substring(3,4);
            _this.userCode4=response.data.my_invitation_code.substring(4,5);
            _this.userCode5=response.data.my_invitation_code.substring(5,6);
            _this.myCode=response.data;
            if(response.data.invitation_code!=''){
              _this.username1=response.data.invitation_code.substring(0,1);
              _this.username2=response.data.invitation_code.substring(1,2);
              _this.username3=response.data.invitation_code.substring(2,3);
              _this.username4=response.data.invitation_code.substring(3,4);
              _this.username5=response.data.invitation_code.substring(4,5);
              _this.username6=response.data.invitation_code.substring(5,6);
            }
          }

        })
      },
      copyCode(){
        var _this=this;
        console.log(this.myCode.my_invitation_code)
        var copyRooms = new Clipboard('#copyRooms',{
          text(){
            return  _this.member_info.nickname+'邀请你来幻联赛PK，成功注册并使用邀请码就可获得幻联赛门票礼包。邀请码：'+_this.myCode.my_invitation_code+'。前往下载伐木累幻联赛：http://t.cn/RpvmOpQ。';
          }
        });
        copyRooms.on('success', function(e) {
          e.clearSelection();
          _this.isSecretkey = 3;
//        alert('成功复制房间号：' + e.text);
          layer.open({
            content: '成功复制：'+e.text
            ,btn: '关闭'
          });
        });
      },
    warnMess(){
      this.invite2=true;
    },
    hideInvite(){
      this.loadTop()
      this.invite1=false;
    },
    hideInvite1(){
      this.loadTop()
      this.invite2=false;
    },
    inviteHide(){
      this.loadTop()
      this.invite=false;
    },
    shareCode(){
      var _this=this;
      this.$api('/services/userCenter/input_invitation_code.php', {
        invitation_code:_this.username1+_this.username2+_this.username3+_this.username4+_this.username5+_this.username
        // pass:true
      }).then(response => {
        if(response.code==200){
            _this.invite1=true;
        }else{
          _this.invite=true;
          _this.message=response.message
        }

      })
    },
    tabLink(obj){
        this.tabList=obj
    },
    linkSuccess(){
      this.$router.push({path:'/success', query: {}});
    },
    inputFocus(){
        if(this.username!=''){
            if(this.username1==''){
              this.username1=this.username;
              this.username=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 90)+'px';
            }else if(this.username2==''){
              this.username2=this.username;
              this.username=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 180)+'px';
            }else if(this.username3==''){
              this.username3=this.username;
              this.username=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 270)+'px';
            }else if(this.username4==''){
              this.username4=this.username;
              this.username=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 360)+'px';
            }else if(this.username5==''){
              this.username5=this.username;
              this.username=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 460)+'px';
            }else if(this.username6==''){
              this.username6=this.username;

            }
        }else{
            if(this.username6!=''){
              this.username6=this.username;
              this.username='';
              document.getElementById('inputButton6').style.marginLeft=(this.m * 460)+'px';
            }else if(this.username5!=''){
              this.username=this.username5;
              this.username5=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 360)+'px';
            }else if(this.username4!=''){
              this.username=this.username4;
              this.username4=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 270)+'px';
            }else if(this.username3!=''){
              this.username=this.username3;
              this.username3=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 180)+'px';
            }else if(this.username2!=''){
              this.username=this.username2;
              this.username2=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 90)+'px';
            }else if(this.username1!=''){
              this.username=this.username1;
              this.username1=''
              document.getElementById('inputButton6').style.marginLeft=(this.m * 0)+'px';
            }

        }
    }
  },
  components:{
    headTop:HeadTop
  }
}
</script>

<style>
  .inviteCode{
    background: #fff;
    height: 100vh;
  }
  .inviteCode .inviteCode-head {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 90px;
  }
  .inviteCode .inviteCode-cont {
   padding:90px 0 0px 0;
}
  .inviteCode .inviteCode-cont-tab{
    height: 84px;
    line-height: 74px;
    display: flex;
    display: -webkit-flex;
    background: #fff;
    border-bottom:1px solid #dfdfdf;
  }
  .inviteCode .inviteCode-tab-left,.inviteCode .inviteCode-tab-right{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;

  }
  .inviteCode .inviteCode-tab-left span,.inviteCode .inviteCode-tab-right span{
    display: block;
    height: 6px;
    width: 30px;
    margin: 0 auto;
  }
  .inviteCode .nav-active {
    background: #fe892c;
  }
  .inviteCode .nav-color{
    color: #fe892c;
  }

  .inviteCode .inviteCode-first-img{
    text-align: center;
    background: #f1f1f1;
  }
  .inviteCode .inviteCode-first-img img{
    width:701px;
    height:400px;
    vertical-align: middle;
    margin:23px 0;
  }
  .inviteCode .inviteCode-first-img p{
    font-size: 26px;
    padding-bottom: 30px;
    color: #999999;
  }
  .inviteCode .icon_menpiao{
    width:26px;
    height:26px;
    vertical-align: middle;
    margin-bottom:4px;
  }
  .inviteCode .inviteCode-first-title{
    text-align: center;
    margin-top:42px;
    font-size:32px;
  }
  .inviteCode .inviteCode-first-myCode{
       margin:40px 110px 0;
       display: flex;
       display: -webkit-flex;
       height: 72px;
       line-height: 72px;
     }
  .inviteCode .inviteCode-first-myCode1{
    margin:40px 110px 0;
    display: flex;
    display: -webkit-flex;
    height: 72px;
    line-height: 72px;
    position: relative;
    background: url("../../static/images/input.png");
    background-size:100% 100%;
  }
  .inviteCode .inviteCode-first-myCode2{
    margin:40px 110px 0;
    display: flex;
    display: -webkit-flex;
    height: 72px;
    line-height: 72px;
    position: relative;

  }
  .inviteCode .inviteCode-first-myCode li{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
  }
  .inviteCode .inviteCode-first-myCode2 li{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
  }
  .inviteCode .inviteCode-first-myCode1 li{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
  }
  .inviteCode .inviteCode-first-myCode1 li:nth-of-type(7){
    position: absolute;
    left:0;
    top:0;
  }
  .inviteCode .inviteCode-first-myCode li p{
    margin:0 auto;
    width:68px;
    height:68px;
    line-height: 64px;
    border:1px solid #bfbfbf;
    border-radius: 4px 3px;
    box-shadow: 0 4px 4px -2px #dedede inset;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 46px;
  }
  .inviteCode .inviteCode-first-myCode1 li p{
    margin:0 auto;
    width:68px;
    height:68px;
    line-height: 68px;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 40px;
  }
  .inviteCode .inviteCode-first-myCode2 li p{
    margin:0 auto;
    width:68px;
    height:68px;
    line-height: 68px;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 40px;
  }
  .inviteCode .inviteCode-first-myCode1 li:nth-of-type(7) p{
    border:none;
  }
  .inviteCode .inviteCode-first-myCode1 li p input{
    margin: 10px auto;
    width:48px;
    height:48px;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 40px;
    background: rgba(0,0,0,0);
    border:0;
  }
  .inviteCode .inviteCode-first-times{
    text-align: center;
    font-size: 26px;
    color: #999999;
    margin-top: 18px;
  }
  .inviteCode .inviteCode-first-times span{
    color: red;
    font-size:30px;
  }
  .inviteCode .inviteCode-first-share{
    color: #fff;
    width:420px;
    height:80px;
    line-height: 80px;
    background: #0C9DFC;
    text-align: center;
    margin:66px auto 0;
    font-size: 30px;
    border-radius: 40px 40px;
  }
  .inviteCode .inviteCode-first-share1{
    color: #999;
    width:420px;
    height:80px;
    line-height: 80px;
    background: #eee;
    text-align: center;
    margin:66px auto 0;
    font-size: 30px;
    border-radius: 40px 40px;
  }
  .inviteCode .inviteCode-first-link{
    line-height:60px;
    text-align: center;
    font-size: 28px;
  }
  .inviteCode .inviteCode-first-link span{
    color: #3289e6;
  }
  .inviteCode .inviteCode-second-title{
    text-align: center;
    font-size: 26px;
    margin-top: 140px;
  }
  .inviteCode .inviteCode-second-button{
    color: #fff;
    width: 420px;
    height: 80px;
    line-height: 80px;
    background: #0C9DFC;
    text-align: center;
    margin: 114px auto 0;
    font-size: 30px;
    border-radius: 40px 40px;
  }
  .inviteCode .inviteCode-second-button1{
    color: #999999;
    width: 420px;
    height: 80px;
    line-height: 80px;
    background: #eeeeee;
    text-align: center;
    margin: 114px auto 0;
    font-size: 30px;
    border-radius: 40px 40px;
  }
   .inviteCode .grayColor{
     background: #eee;
   }
  .inviteCode .maskInvite{
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
  .inviteCode .maskInvite-cont{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
    -webkit-justify-content: center;
    justify-content: center;
    background: #fff;
    width:522px;
    border-radius:22px 22px;
    padding-bottom: 44px;
  }
  .inviteCode .maskInvite-cont1{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
    -webkit-justify-content: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    width:522px;
    border-radius:22px 22px;
    padding-bottom: 44px;
  }
  .inviteCode .maskInvite-cont-title{
    padding-top: 46px;
    font-size: 32px;
    border-radius:22px 22px 0 0;
    text-align: center;
  }
  .inviteCode .maskInvite-cont-message{
    padding:50px;
    text-align: center;
    font-size: 30px;
  }
  .inviteCode .maskInvite-cont-message2{
    padding:50px 114px;
    text-align: center;
    color: #fff;
    font-size: 30px;
  }
  .inviteCode .maskInvite-cont-button{
    margin:0 auto;
    width:404px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: #0C9DFC;
    color: #fff;
    border-radius:35px 35px;
    font-size: 30px;
  }
  .inviteCode .maskInvite-cont-button1{
    margin:0 auto;
    width:404px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 30px;
  }
  .inviteCode .inviteCode-yes{
    text-align: center;
    font-size: 24px;
    line-height: 60px;
  }
  .inviteCode .inviteCode-yes span{
    color: #3289e6;
  }
</style>
