<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': menuShow}" @touchmove.prevent>
      <div class="menu-top">
        <div class="menu-top-setting"></div>
        <div class="menu-top-user">
          <ul>
            <li>
              <img v-if="memerList.avatar == ''"  src="../../static/images/tx_pic.jpg" alt="">
              <img v-else :src="memerList.avatar"  alt="">
              <span v-show="memerList.type == 1" class="bg-v"></span>
            </li>
            <li>
              <p>{{memerList.nickname}} <span class=" rank_lv " :class="'rank_lv_' + memerList.rank"></span><img v-show="memerList.badge_image!=''" :src="memerList.badge_image" alt=""> </p>
              <p>经验值: {{memerList.points}}</p>
              <p><span v-bind:style="'flex: 0 0 ' + parseInt(memerList.percent * 100) + '%'"></span></p>
            </li>
          </ul>
        </div>
        <div class="background-mask">
          <div class="background-bg" v-if="memerList.avatar != ''" :style="{'background':'url(' + memerList.avatar + ') center/cover no-repeat'}"></div>
          <div class="background-bg1" v-else ></div>
        </div>

      </div>
      <div class="menu-middle-position">
        <div class="menu-middle" >
          <div>

            <ul>
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_LFL-"></use></svg></li>
              <li @click="linkurl()">
                <p>幻联赛</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <ul>
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_shangcheng-"></use></svg></li>
              <li @click="linkBet">
                <p>商城</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <ul @click="linkSquat">
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_wodezhenrong-"></use></svg></li>
              <li>
                <p>我的阵容</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <ul @click="walletUrl()">
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_yue-"></use></svg></li>
              <li>
                <p>钱包</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <ul @click="addressUrl()">
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-address"></use></svg></li>
              <li>
                <p>收货地址</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <ul @click="linkInvite()">
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-invite-code"></use></svg></li>
              <li>
                <p>邀请码</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>
            <!--<ul>
              <li><svg aria-hidden="true" class=""><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_huizhang-"></use></svg></li>
              <li @click="showAlert()">
                <p>微章</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>-->
            <!--<ul>
              <li><i class="iconfont">&#xe6d0;</i></li>
              <li>
                <p>收藏</p>
                <p></p>
                <p><i class="iconfont">&#xe6e4;</i></p>
              </li>
            </ul>-->
          </div>
        </div>
      </div>

      <div class="menu-exit" @click="linkExit()"><i class="iconfont" style="font-size: 34px;">&#xe602;</i>  退出当前账号</div>
     <!-- <div class="menu-bottom">
        <ul>
          <li @click="showAlert()">
            <p><svg aria-hidden="true" class="icon"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-mall"></use></svg></p>
            <p>兑换商城</p>
          </li>
          <li @click="linkBet">
              <p><svg aria-hidden="true" class="icon"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_bocai-"></use></svg></p>
              <p>菠菜中心</p>
          </li>
          <li>
            <a href="/qa">
              <p><svg aria-hidden="true" class="icon"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_wenda-"></use></svg></p>
              <p>问答圈</p>
            </a>

          </li>
          <li @click="showAlert()">
            <p><svg aria-hidden="true" class="icon"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_qiehuan-"></use></svg></p>
            <p>切换游戏</p>
          </li>
          <li @click="linkSquat">
              <p><svg aria-hidden="true" class="icon"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_wodezhenrong-"></use></svg></p>
              <p>我的阵容</p>
          </li>
        </ul>
      </div>-->
    </div>
  </div>
</template>

<script>
  import store from 'store'
export default {
  name: 'menu',
  data () {
    return {
    }
  },
  props: {
    memerList:{
        type:Object
    },
    menuShow: {
      type: Boolean
    }
  },
  created(){
  },
  methods:{
    linkExit(){
      this.$api('/services/member/member_out.php',{
      }).then(response => {
        if(response.code == 200){
          store.remove('member_info');
          layer.open({
            content: response.message
            ,btn: '关闭'
          });

        }
      });
      var _this=this;
      setTimeout(function () {
        _this.$emit('newNodeEvent', 'false');
        _this.$emit('newNodeEvent1', 'true');
        window.location.href = _this.lflmain()
      }, 800);

    },
    getDomain() {
      var domain = document.domain;
      if (/^\w*(.famulei.com)$/.test(document.domain)) {
        domain = 'http://' + document.domain;
      }else{
        domain = 'http://' + document.domain;
      }
      return domain;
    },
    clearCookie(){
      var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
      }
    },
    showAlert(){
      layer.open({
        content: '暂未开放'
        ,btn: '关闭'
      });
    },
    walletUrl(){
      this.$router.push({path:'/myWallet'});
      this.$emit('newNodeEvent', 'false');
    },
    linkurl(){
      this.$router.push({path:'/home'});
      this.$emit('newNodeEvent', 'false');
    },
    linkBet(){
      this.$router.push({path:'/Mall'});
      this.$emit('newNodeEvent', 'false');
    },
    linkSquat(){
      this.$router.push({path:'/mySquad'});
      this.$emit('newNodeEvent', 'false');
    },
    linkMessage(){
      window.location.href='/message_reply';
      this.$emit('newNodeEvent', 'false');
    },
    linkFocus(){
      window.location.href='/attention';
      this.$emit('newNodeEvent', 'false');
    },
    addressUrl(){
      this.$router.push({path:'/address'});
      this.$emit('newNodeEvent', 'false');
    },
    linkInvite(){
      this.$router.push({path:'/inviteCode'});
      this.$emit('newNodeEvent', 'false');
    }
  }
}
</script>

<style>
  @import 'menu.styl';
</style>
