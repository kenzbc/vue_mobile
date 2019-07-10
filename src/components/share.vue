<template>
  <div class="anim-opacity2 dialog" @touchmove.prevent>
    <div class="dialog_bj" @click="dialogClose"></div>
    <div class="dialog_share ">
      <div class="dialog_share_top">
        <p>邀请好友</p>
        <p>房间号</p>
        <div class="ipt-box-nick">
          <input type="tel" maxlength="6" class="ipt-real-nick" v-model="inputNum" id="iptRealNick"/>
          <div class="ipts-box-nick">
            <div class="ipt-fake-box">
              <input type="text" maxlength="1" v-model="inputParams[0]" readonly>
              <input type="text" maxlength="1" v-model="inputParams[1]" readonly>
              <input type="text" maxlength="1" v-model="inputParams[2]" readonly>
              <input type="text" maxlength="1" v-model="inputParams[3]" readonly>
              <input type="text" maxlength="1" v-model="inputParams[4]" readonly>
              <input type="text" maxlength="1" v-model="inputParams[5]" readonly>
            </div>
          </div>
        </div>
        <div class="dialog_add_footer repeat_room_num copyRooms" :id="'copyRooms-' + roomID">
          <p>复制房间号</p>
        </div>
        <p class="dialog_remark">*好友只需填写房间号就能参与此房间。<br />温馨提示：若点击复制无效，请选择手动复制。</p>
        <div class="dialog_links">

          <ul>
            <li class="copyLink" :id="'copyLink-' + roomID" >
              <img src="static/images/share_copy.png" alt="">
              <p>复制链接</p>
            </li>
            <!--<li class="copyLink handCopyLink" data-clipboard-target="#foo" @click="isHandBtn">-->
            <li class="copyLink" @click="isHandBtn">
              <img src="static/images/share_copy.png" alt="">
              <p>手动复制</p>
            </li>
          </ul>
          <div class="handText" v-if="isHand">
            <span>{{handCopyText}}</span>
            <!--<textarea id="foo"  :value="handCopyText" readonly></textarea>-->
          </div>
        </div>
        <div class="dialog_share_cancel" @click="dialogClose">
          <p>取消</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Clipboard from 'clipboard'

  export default {
    name: 'share',
    data () {
      return {
        inputNum: '',
        inputParams: [],
        roomID:'',
        aaa:'',
        handCopyText:'',
        isHand:false
      }
    },
    props: {
      shareData: {
        type: Object
      }
    },
    components: {},
    created(){
      this.inputNum = this.shareData.secret_key;
      this.roomID = this.$route.query.roomID;
      var code = this.inputNum;
      var share_num = [];
      for (var i in code) {
        share_num.push(code[i]);
      }
      this.inputParams = share_num;
//      this.copyLink(this.inputNum);
    },
    mounted (){

      this.handCopyText = '你的好友喊你来幻联赛《' + this.shareData.title + '》PK，比拼LOL游戏理解，链接：' + this.lflmain() + '/match?roomID=' + this.roomID + ' 房间号：' + this.shareData.secret_key;

      var _this = this;
      var copyLink = new Clipboard('#copyLink-' + _this.roomID,{
        text(){

          return '你的好友喊你来幻联赛《' + _this.shareData.title + '》PK，比拼LOL游戏理解，链接：' + _this.lflmain() + '/match?roomID=' + _this.roomID + ' 房间号：' + _this.shareData.secret_key;
        }
      });

      var copyRooms = new Clipboard('#copyRooms-' + _this.roomID,{
        text(){
          return _this.inputNum;
        }
      });

      copyLink.on('success', function(e) {
        e.clearSelection();
        _this.isSecretkey = 3;
//        alert('成功复制：' + e.text);
        layer.open({
          content: '成功复制：' + e.text
          ,btn: '关闭'
        });
      });
      copyRooms.on('success', function(e) {
        e.clearSelection();
        _this.isSecretkey = 3;
//        alert('成功复制房间号：' + e.text);
        layer.open({
          content: '成功复制房间号：' + e.text
          ,btn: '关闭'
        });
      });


    },
    watch: {},
    methods: {
      dialogClose(){
        this.$emit('dialogHide', false);
      },
//      copyLink(secret_key){
//        var href = window.location.href;
//        var curHref = href.slice(0,href.indexOf('#'));
//        this.linkHref = curHref + '#/match?roomID=' + this.roomID;
//      },
      isHandBtn(){
      	this.isHand = true;
      }
    }
  }
</script>

<style>
  .dialog_share {
    width: 100%;
    transform: translate(-50%, 0);
    position: absolute;
    bottom: 0;
    left: 50%;
    /*height: 786px;*/
    background: #fff;
    overflow: hidden;
  }
  .dialog_share_top{
    padding:30px;
  }
  .dialog_share_top p {
    text-align: center;
    font-size:26px;
    color:#999999;
  }

  .dialog_share_top>p:first-child {
    font-size:30px;
    color:#373a41;
    margin-bottom:30px;
  }

  .dialog_share_top .ipt-box-nick {
    width: 480px;
    margin: 22px auto 50px;
  }
  .dialog_add_footer.repeat_room_num p{
    color:#fff;
  }

  .dialog_add_footer.copyRooms{
    z-index:99999;
  }
  .dialog_remark{
    margin-top:20px;
    line-height:35px;
    border-bottom:1px solid #eeeeee;
    padding-bottom:20px;
  }
  .dialog_links ul{
    display: flex;
    flex-direction: row;
    justify-content:center;
  }
  .dialog_links li{
    width: 130px;
    height:200px;
    padding-top:40px;
    position: relative;
    margin: 0 auto;
  }
  .dialog_links li img{
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
  }
  .dialog_links li p{
    position: absolute;
    top:140px;
    transform: translate(-50%, 0);
    width: 100%;
    left: 50%;
  }
  .dialog_links .copyLink{
    z-index:99999;
  }
  .dialog_share_cancel p{
    width: 100%;
    border:1px solid #d9d9d9;
    line-height:86px;
    text-align: center;
    font-size:30px;
    color:#373a41;
    border-radius: 50px;
  }
  .handText{
    width: 100%;
    margin-bottom:20px;
  }
  .handText textarea{
    border:0;
    outline: none;
    width: 100%;
    margin-bottom:20px;
    color:#999;
    font-size:20px;
  }
  .handText span{
    color:#999;
    font-size:20px;
    text-align: center;
  }
</style>
