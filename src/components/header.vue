<template>
  <div>
    <div class="page-cover" v-show="menuShow" @click="isShow" @touchmove.prevent></div>
    <div class="bar-nav">
      <!--<div  v-if="userImg&&login" class="user-avatar btn left"><img @click="isShow" v-if="memerList.avatar!=''" :src="memerList.avatar"  alt=""><img  v-else-if="memerList.avatar==''" @click="isShow" src="../../static/images/tx_pic.jpg"   alt=""></div>-->
      <!--<div  v-else-if="userImg" class="user-avatar btn left"><img @click="isLink" src="../../static/images/tx_pic.jpg"  alt=""></div>-->
      <a href="javascript:;" class="btn left go_back " v-show="goBack && this.showBack" @click="pathNameBtn">
        <i class="iconfont">&#xe600;</i>
      </a>
      <div class="title" v-show="headTitle">{{headTitle}}</div>
      <a href="javascript:;" class="btn right" @click="roomBtn(isHideFull)" v-show="comIcon">
        <p class="hide_full active">{{isFull}}</p>
        <!--<i class="iconfont filter_icon" :class="{color_blue:comColor == true }">&#xe616;</i>-->
      </a>
      <a href="javascript:;" class="btn right" v-show="remove">
        <span class="head_romove">撤销阵容</span>
      </a>
      <div @click="myRecordLink()" class="btn right" v-show="myRecord">
        <i class="iconfont icon-icon_zhanji" style="font-size: 30px;"></i>
        <span class="head_romove">战绩</span>
      </div>
      <div @click="recordLink()" class="btn right" v-show="record">
        <i class="iconfont icon-record" style="font-size: 35px;"></i>
        <span class="head_romove"></span>
      </div>
      <div @click="addAddressLink()" class="btn right" v-show="addAddress">
        <span class="head_romove">保存</span>
      </div>
      <div @click="linkHome()" class="btn left go_back" v-show="finkRoom">
        <i class="iconfont icon-back"></i>
        <span class="">返回</span>
      </div>
      <div @click="shareZM('url')" class="btn right" v-show="isShare && this.shareShow">
        <i class="iconfont icon-share" style="font-size: 32px;margin-right: 20px;"></i>
      </div>
      <a href="javascript:;" class="btn right" v-show="mapList">
        <p class="head_btn_tab" v-if="headBtnTab == 0" @click="headBtn(true)">
          <i style="font-size:34px;" class="iconfont">&#xe630;</i>
        </p>
        <p class="head_btn_tab " v-if="headBtnTab == 1" @click="headBtn(false)">
          <i style="font-size:34px;" class="iconfont">&#xe656;</i>
        </p>
      </a>
      <a href="javascript:;" class="btn right" @click="headShare(true)" v-show="isShowBtn && isStatus == 0">
        <p class="head_btn_share">邀请<img src="static/images/icon_share_black.png" alt=""></p>
      </a>
      <a href="javascript:;" class="btn right" v-show="mallShowType">
        <p class="head_btn_tab" v-if="!isMallList" @click="changeMallType('list')"><i style="font-size:34px;" class="iconfont">&#xe623;</i></p>
        <p class="head_btn_tab " v-if="isMallList" @click="changeMallType('card')"><i style="font-size:34px;" class="iconfont">&#xe656;</i></p>
      </a>
    </div>
    <!--<v-Menu v-if="userImg&&login" @newNodeEvent="parentLisen" @newNodeEvent1="parentLisen1" :menuShow="menuShow" :memerList="memerList"></v-Menu>-->
  </div>

</template>
<script>
import store from "store";
import vMenu from "../components/menu.vue";
export default {
  data() {
    return {
      headBtnTab: 1, //UI显示状态
      showBack: false,
      flag: true,
      setIsShow: "",
      menuShow: false,
      menuShow1: false,
      memerList: {},
      login: false,
      refresh: {
        isFresh: true
      },
      isDisabled: 0,
      //        isHideFull:0
      isFull: "显示满人房",
      shareShow : false,
      isMallList:false,
    };
  },
  props: [
    "goBack",
    "headTitle",
    "comIcon",
    "remove",
    "mapList",
    "userImg",
    "isMember",
    "myRecord",
    "addAddress",
    "finkRoom",
    "record",
    "isList",
    "isShare",
    "isShowBtn",
    "isStatus",
    "isHideFull",
    "mallShowType"//商城列表卡片切换
  ],
  mounted(){
    //设置UI类型
    store.get('tabIndexValue') == 1 ? store.set('tabIndexValue', 1) : store.set('tabIndexValue', 0);
    this.headBtnTab = store.get('tabIndexValue');
  },
  methods: {
    headShare(arg) {
      this.$emit("getChange", arg);
    },
    parentLisen(evtValue) {
      //evtValue 是子组件传过来的值
      this.menuShow = false;
    },
    parentLisen1(evtValue) {
      this.login = false;
      //evtValue 是子组件传过来的值
      this.menuShow1 = evtValue;
      if (this.menuShow1) {
        store.remove("member_info");
      }
    },
    headBtn: function(tab) {
      if (tab == this.flag) {
        this.headBtnTab = 1;
      } else {
        this.headBtnTab = 0;
      }
      this.$emit("headTabIndex", this.headBtnTab);
    },
    roomBtn: function(arg) {
      if (arg == 0) {
        this.isFull = "显示满人房";
        this.$emit("getChange", 1);
      } else {
        this.isFull = "隐藏满人房";
        this.$emit("getChange", 0);
      }
    },
    isShow() {
      if (this.menuShow == false) {
        this.menuShow = true;
        this.$emit("getChange", false);
      } else {
        this.menuShow = false;
        this.$emit("getChange", false);
      }
    },
    isLink() {
      this.$router.push({ path: "/login", query: {} });
    },
    linkHome() {
      this.$router.push({ path: "/my", query: {} });
    },
    recordLink() {
      //商城兑换记录按钮添加统计
      this.pushEvent(store.get('loginInfo').type, 'mall_duihuan_list_btn', '');

//      let member_info = store.get("member_info");
//      if (member_info == undefined) {
//        this.$router.push({ path: "/login", query: {} });
//      } else {
        this.$router.push({ path: "/record" });
//      }
    },
    myRecordLink() {
      let member_info = store.get("member_info");
      if (member_info == undefined) {
        this.$router.push({
          path: "/login",
          query: { states: this.$route.query.states }
        });
      } else {
        this.$router.push({ path: "/record" });
      }
    },
    pathNameBtn() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else if (this.$route.name == "RoomInfo") {
        this.$router.push({ path: "/my" });
      } else {
        this.$router.back(-1);
      }
    },
    ismap() {
      if (this.$route.name == "create") {
        var editID = store.get("editID");
        if (editID != undefined) {
          this.headBtnTab = 0;
        } else {
          this.headBtnTab = 1;
        }
      }
    },
    addAddressLink() {
      this.$emit("saveChange", true);
    },
    showBackBtn() {
      if(store.get('showBack') == '1'){
        this.showBack = true;
      }
    },
    showShareBtn() {
      if(store.get("version") == 'new') {
        this.shareShow = true;
      }
    },
    shareZM(share_type){
        //唤起掌盟分享
        let shareArray = ['lolfriend','postlistcircle'];
        let jsondata = {
        sharetype:share_type,
        share : shareArray
        };
        //window.location.href = "qtconfig://config_info?share="+encodeURIComponent(JSON.stringify(jsondata))+"&from=funplay"
	    setTimeout(window.location.replace("qtconfig://config_info?share="+encodeURIComponent(JSON.stringify(jsondata))+"&from=funplay"),500);
        setTimeout(window.location.replace("qtshare://launch_share_window"),1000);

	    // location.href = "qtshare://launch_share_window";
        // this.pushEvent(store.get('loginInfo').type, 'share', '');
    },
    changeMallType(type){
      console.log(`changeMallType=${type}`);
      if (type === 'card') {
        this.isMallList = false;
      } else {
        this.isMallList = true;
      }
      this.$emit("changeMallList", this.isMallList);
    }
  },
  components: {
    vMenu
  },
  created() {
    this.showBackBtn();
    // this.showShareBtn();
    this.ismap();
  },
  watch: {
    isMember(value) {
      if (value == true) {
        let member_info = store.get("member_info");
        this.login = true;
        this.memerList = member_info;
      }
    },
    // $route() {
    //   this.showBack();
    //   //			this.RoomInfo()
    // }
  }
};
</script>
<style scoped>
  .iconfont{
    color:#514d8f;
    font-weight: bold;
  }
.bar-nav {
  position: relative;
  height: 90px;
  line-height: 90px;
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
  /*display: flex;*/
  /*display: -webkit-flex;*/
}
.show {
  -webkit-transform: translateX(650px);
  -moz-transform: translateX(650px);
  -ms-transform: translateX(650px);
  -o-transform: translateX(650px);
  transform: translateX(650px);
}

.bar-nav .title {
  width: calc(100% - 218px);
  text-align: center;
  font-size: 34px;
  color: #3a3d44;
  margin: 0 auto;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /*flex: 1;*/
}
.bar-nav .user-avatar img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 15px 0 0 20px;
}
.bar-nav .btn {
  position: absolute;
  height: 90px;

  top: 0;
  /*padding: 19px;*/
  display: block;
}
.bar-nav .btn.go_back{
  width: 150px;
}

.bar-nav .btn .icon {
  margin: 20px;
  width: 50px;
  height: 50px;
}
.bar-nav .left {
  left: 0;
}
.bar-nav .left .icon {
  fill: #444;
  color: #444;
}
.bar-nav .right {
  right: 0;
}
.bar-nav .btn .filter_icon {
  margin: 20px;
  width: 50px;
  height: 50px;
  font-size: 40px;
}
.color_blue {
  color: #0C9DFC;
}
.color_blue_deg {
  color: #0C9DFC;
  transform: rotate(180deg);
}
.head_romove {
  color: #3a3d44;
  font-size: 30px;
  margin-right: 25px;
}
.head_btn_tab {
  color: #3a3d44;
  font-size: 28px;
  margin-right: 25px;
}
.head_btn_tab label {
  display: inline-block;
  margin-bottom: -2px;
  width: 44px;
  height: 22px;
  border-radius: 35px;
  border: 2px solid #373a41;
  margin-left: 10px;
  position: relative;
}
.head_btn_tab label i {
  position: absolute;
  top: 2px;
  width: 14px;
  height: 14px;
  background: #373a41;
  border-radius: 50%;
}
.head_btn_tab label i.map {
  left: 4px;
}
.head_btn_tab label i.list {
  right: 4px;
}

.head_btn_share {
  color: #3a3d44;
  font-size: 28px;
  margin-right: 25px;
}

.head_btn_share img {
  margin-left: 10px;
  margin-bottom: -5px;
}

.go_back i {
  font-size: 30px;
  margin-left: 20px;
}
.go_back span{
  color:#514d8f;
  font-size: 30px;
}
.hide_full {
  margin-right: 24px;
  color: #999;
}
.hide_full.active {
  color: #1d2028;
}
</style>
