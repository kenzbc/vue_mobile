<template>
  <div id="app" :class="tutorialClass">
    <div class="new_pop" v-if="new_player" @touchmove.prevent>
      <div v-for="(item,index) in new_player_img" :key="index" v-if="item.path == $route.path">
        <div v-for="(partItem,partItemIndex) in item.parts" :key="partItemIndex" v-show="partItem.part == new_player_part">
          <div class="part-item" v-for="(part,partIndex) in partItem.pathGo" :key="partIndex" @click="new_player_go(partItem.path,partItem.part,partItem.pathGo[partIndex])">
            <div class="new_pop_bg" v-if="new_player_bg"></div>
            <div class="new_pop_bg_2" v-else>
              <div class="new_pop_bg_top"></div>
              <div class="new_pop_bg_bottom"></div>
            </div>
            <img :src="new_player_image + partItem.imgUrl[partIndex]" :class="partItem.imgClass[partIndex]">
          </div>
        </div>
      </div>
    </div>

    <input type="hidden" id="refreshed" value="no">
    <router-view @up="change" :msg="msg"></router-view>

    <div v-show="$route.meta.navShow" class="nav-bar">
      <a v-for="item in nav" :key="item.name" @click="tabLink(item.link)" keep-alive>
        <div>
          <icon :icon="navIcon(item)"></icon>
        </div>
        <div :class="{'active':$route.name === item.name}">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "store";
export default {
  name: "app",
  data() {
    return {
      tutorialClass: "",
      nav: [
        { name: "home", link: "/home", icon: "home", title: "大厅", active: true },
        { name: "my", link: "/my", icon: "mine", title: "我的", active: false },
        { name: "mall", link: "/mall", icon: "shop", title: "商城", active: false },
        { name: "rank", link: "/rank", icon: "ranking", title: "排行榜", active: false },
        // { name: "myRecord", link: "/MyRecord2", icon: "myrecord", title: "战绩", active: false }
      ],
      title: "幻联赛",
      inMove: 0,
      msg: "",
      get_new_player: "",
      new_player_part: "1",
      new_player_next: "1",
      new_player: false,
      new_player_bg: true,
      new_player_image: "../static/images/",
      new_player_img: [
        {
          path: "/",
          parts: [
            {
              part: "1",
              pathGo: ["home_button"],
              imgUrl: ["new_player_home_1.png"],
              imgClass: ["new_player_home_1"]
            },
            {
              part: "1",
              pathGo: ["home_button"],
              imgUrl: ["new_player_home_3.png"],
              imgClass: ["new_player_home_3"]
            },
            {
              part: "2",
              pathGo: ["/my"],
              imgUrl: ["new_player_home_2.png"],
              imgClass: ["new_player_home_2"]
            },
            {
              part: "3",
              pathGo: ["new_player_hide"],
              imgUrl: ["new_player_home_1.png"],
              imgClass: ["new_player_home_1"]
            },
            {
              part: "4",
              pathGo: ["home_button"],
              imgUrl: ["new_player_home_4.png"],
              imgClass: ["new_player_home_4"]
            },
            {
              part: "5",
              pathGo: ["home_button"],
              imgUrl: ["new_player_home_4.png"],
              imgClass: ["new_player_home_5"]
            },
          ]
        },
        {
          path: "/my",
          parts: [
            {
              part: "1",
              pathGo: ["my_end"],
              imgUrl: ["new_player_my_1.png"],
              imgClass: ["new_player_my_1"]
            },
            {
              part: "2",
              pathGo: ["/mall"],
              imgUrl: ["new_player_my_2.png"],
              imgClass: ["new_player_my_2"]
            },
            {
              part: "3",
              pathGo: ["new_player_hide"],
              imgUrl: ["new_player_my_3.png"],
              imgClass: ["new_player_my_3"]
            }
          ]
        },
        {
          path: "/match",
          parts: [
            {
              part: "1",
              pathGo: ["new_player_hide"],
              imgUrl: ["new_player_match.png"],
              imgClass: ["new_player_match"]
            }
          ]
        },
        {
          path: "/selected",
          parts: [
            {
              part: "1",
              pathGo: ["selected_button", "selected_button"],
//              imgUrl: ["new_player_selected_1.png"],
//              imgClass: ["new_player_selected_1"]
              imgUrl: ["new_player_selected_0.png", "new_player_selected_1.png"],
              imgClass: ["new_player_selected_0", "new_player_selected_1"]
            },
            {
              part: "2",
              pathGo: ["selected_submit", "selected_submit"],
              imgUrl: [
                "new_player_selected_2.png",
                "new_player_selected_3.png"
              ],
              imgClass: ["new_player_selected_2", "new_player_selected_3"]
            },
            {
              part: "3",
              pathGo: ["new_player_hide", "new_player_hide"],
              imgUrl: [
                "new_player_selected_4.png",
                "new_player_selected_5.png"
              ],
              imgClass: ["new_player_selected_4", "new_player_selected_5"]
            },
            {
              part: "4",
              pathGo: ["new_player_hide"],
              imgUrl: ["new_player_selected_6.png"],
              imgClass: ["new_player_selected_6"]
            },
            {
              part: "5",
              pathGo: ["selected_submit_order"],
              imgUrl: ["new_player_selected_7.png"],
              imgClass: ["new_player_selected_7"]
            },
            {
              part: "6",
              pathGo: ["/home"],
              imgUrl: ["new_player_selected_8.png"],
              imgClass: ["new_player_selected_8"]
            },
          ]
        },
        {
          path: "/choosePlayer",
          parts: [
            {
              part: "1",
              pathGo: ["new_player_hide", "new_player_hide"],
              imgUrl: ["new_player_choose_1.png", "new_player_choose_3.png"],
              imgClass: ["new_player_choose_1", "new_player_choose_3"]
            }
          ]
        },
        {
          path: "/matchRoom",
          parts: [
            {
              part: "1",
              pathGo: ["new_player_hide", "new_player_hide"],
              imgUrl: [
                "new_player_matchRoom_1.png",
                "new_player_matchRoom_2.png"
              ],
              imgClass: ["new_player_matchRoom_1", "new_player_matchRoom_2"]
            }
          ]
        },
        {
          path: "/Roominfo",
          parts: [
            {
              part: "1",
              pathGo: ["new_player_hide"],
              imgUrl: ["new_player_roominfo.png"],
              imgClass: ["new_player_roominfo"]
            }
          ]
        },
        {
          path: "/mall",
          parts: [
            {
              part: "1",
              pathGo: ["mall_end"],
              imgUrl: ["new_player_mall_1.png"],
              imgClass: ["new_player_mall_1"]
            },
            {
              part: "2",
              pathGo: ["mall_btn"],
              imgUrl: ["new_player_mall_2.png"],
              imgClass: ["new_player_mall_2"]
            }
          ]
        },
      ],
      // mallListLight:false
    };
  },
  watch: {
    $route(to, from) {
      this.new_player = false;
      this.noRefresh();

      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  created() {
    let loading = document.getElementById("loading");
      loading.setAttribute("class", "hide");
      setTimeout(_ => {
        loading.style.display = "none";
      }, 600);
    //页面存储type,uuid,key
    if (this.$route.query.open_uuid && this.$route.query.open_token) {
    	if (store.get('loginInfo') && store.get('loginInfo').open_uuid != this.$route.query.open_uuid) {
    	  //替换
        store.remove('IS_SIGN');
        store.remove('orderInfo');
        store.remove('member_info');
        store.remove('roomList');
        var loginInfo = {
          type: 4,
          open_uuid: this.$route.query.open_uuid,
          open_token: this.$route.query.open_token
        };
      }else{
    	  //继承
        var loginInfo = {
          type: 4,
          open_uuid: this.$route.query.open_uuid ? this.$route.query.open_uuid : store.get('loginInfo').open_uuid,
          open_token: this.$route.query.open_token ? this.$route.query.open_token : store.get('loginInfo').open_token
        };
      }
      store.set("loginInfo", loginInfo);
      this.$store.commit('set', {key: 'auth', loginInfo})
    }

    // 去掉url中的參數
    // this.$router.replace(this.$route.path)

    //弹窗管理
    let oldData = store.get("pop_up_data");
    if (oldData != undefined) {
      oldData.once = false;
      store.set("pop_up_data", oldData);
    }
  },
  methods: {
    newPlayer(part) {
      if (part == 0) {
        this.new_player = false;
      } else {
        this.new_player_part = part;
        this.new_player = true;
      }
    },
    new_player_go(path, showPart, pathGo) {
      this.tutorialClass = pathGo + "_" + showPart;
      this.new_player_bg = true;
      if (pathGo == "new_player_hide") {
        this.new_player = false;
      } else if (pathGo == "home_button") {
        //执行立即加入
        this.$root.hub.$emit("joinRoomSuccess");
      } else if (pathGo == "selected_button") {
        this.new_player_bg = false;
        this.new_player_part = "2";
        //执行快速布阵
        this.$root.hub.$emit("recommendButtonSuccess");
        this.pushEvent(store.get('loginInfo').type, 'xinshou', '3');
      } else if (pathGo == "selected_submit") {
        this.new_player = false;
        //提交阵容
        this.$root.hub.$emit("submitButton");
      } else if(pathGo == "selected_submit_order"){
        this.new_player = false;
        this.$root.hub.$emit("selected_submit_order");
      } else if(pathGo == "my_end"){
        this.mallListLight = false;
        //“我的”恭喜中奖
        this.new_player_part = "2";
      } else if(pathGo == "mall_end"){
        this.$store.commit('set', {
          key: 'mallListLight',
          val: false
        });
        //“商城”领取奖励
        this.new_player_part = "2";
        this.pushEvent(store.get('loginInfo').type, 'xinshou', '10');
      } else if(pathGo == "mall_btn"){
        //“商城”开启幻联赛
        this.new_player = false;
        this.$root.hub.$emit("awardsBtn");
        this.pushEvent(store.get('loginInfo').type, 'xinshou', '11');
      } else {
        if(pathGo == "/mall"){
          this.pushEvent(store.get('loginInfo').type, 'xinshou', '8');
        }
        this.$router.push({ path: pathGo });
      }
      for (var i = 0; i < this.new_player_img.length; i++) {
        if (
          path == this.new_player_img[i].path &&
          showPart == this.new_player_img[i].showPart
        ) {
          this.new_player_img[i].path = "";
        }
      }
    },
    noRefresh() {
      if (/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)) {
        window.onpageshow = function(event) {
          if (event.persisted) {
            window.location.reload();
          }
        };
      } else {
        onload = function() {
          var refreshedId = document.getElementById("refreshed");
          if (refreshedId.value == "no") {
            refreshedId.value = "yes";
          } else {
            refreshedId.value = "no";
            location.reload();
          }
        };
      }
    },
    tabLink(link) {
      if(link == '/my'){
        store.set('my_status',0);//点击我的ICON时，默认显示未开始
      }
      this.$router.push({ path: link });
    },
    change(msg) {
      //this.inMove = msg
    },
    navIcon(item) {
      return item.icon + (this.$route.name === item.name ? "_fill" : "");
    }
  },
  mounted() {
    // if (!store.get("new_player")) {
    //   store.set("new_player", this.$route.path);
    //   this.newPlayer(1);
    // }
    this.$root.hub.$on("new_player_go_Success", part => {
      this.newPlayer(part);
    });
  }
};
</script>

<style>

@keyframes opacity1 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes opacity1 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes opacity1 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes opacity2 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes opacity2 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes opacity2 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/*#app{*/
/*position: relative;*/
/*}*/
#app .page-cover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98px;
  background-color: #fff;
  z-index: 10;
  border-top: 1px solid #ddd;

}
.nav-bar a{
  color:#A29FD9;
}
.nav-bar .active{
  color:#5348FF;
}

.in {
  animation: inmove 1s;
  -webkit-animation: inmove 1s; /*Safari and Chrome*/
}
.out {
  animation: outmove 1s;
  -webkit-animation: outmove 1s; /*Safari and Chrome*/
}

.nav-bar a {
  width: calc(100% / 4);
  text-align: center;
  display: inline-block;
  margin-top: 13px;
}

.nav-bar a svg {
  width: 36px;
  height: 38px;
}

@keyframes inmove {
  from {
    bottom: -98px;
    opacity: 0;
  }
  to {
    bottom: -0px;
    opacity: 1;
  }
}

@-webkit-keyframes inmove {
  from {
    bottom: -98px;
    opacity: 0;
  }
  to {
    bottom: -0px;
    opacity: 1;
  }
}
@keyframes outmove {
  from {
    bottom: 0px;
    opacity: 1;
  }
  to {
    bottom: -98px;
    opacity: 0;
  }
}

@-webkit-keyframes outmove {
  from {
    bottom: 0px;
    opacity: 1;
  }
  to {
    bottom: -98px;
    opacity: 0;
  }
}
/*新手引导*/
.new_pop {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  z-index: 111;
}
.part-item {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 102;
}
.new_pop_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.new_pop_bg_2 div {
  width: 100%;
  /*background: #000;*/
  /*opacity: 0.7;*/
  position: absolute;
  z-index: 1;
}
.new_pop_bg_2 div.new_pop_bg_top {
  height: 830px;
  left: 0;
  top: 0;
}
.new_pop_bg_2 div.new_pop_bg_bottom {
  height: 335px;
  left: 0;
  top: 998px;
}
.new_pop img {
  width: 100%;
  position: absolute;
  z-index: 2;
}
.new_pop .new_player_home_1 {
  width: 750px;
  top: 50%;
  left: 0px;
  margin-top: -565px;
}
.new_pop .new_player_home_2 {
  width: 750px;
  bottom: 0px;
  left: 0px;
}
.new_pop .new_player_home_3 {
  width: 750px;
  bottom: 50%;
  left: 0px;
  margin-bottom: -560px;
}
.new_pop .new_player_selected_0 {
  width: 420px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.new_pop .new_player_selected_1 {
  width: 420px;
  right: 150px;
  bottom: 24px;
}
.new_pop .new_player_match {
  top: 0px;
  width: 750px;
  left: 0px;
}
.new_pop .new_player_match_1 {
  top: 30px;
  width: 440px;
  left: 160px;
}
.new_pop .new_player_match_2 {
  width: 280px;
  top: 286px;
  right: 40px;
}
.new_pop .new_player_match_3 {
  top: 378px;
  width: 320px;
}
.new_pop .new_player_selected_2 {
  top: 175px;
  width: 500px;
  right: 40px;
}
.new_pop .new_player_selected_3 {
  top: 610px;
}
.new_pop .new_player_choose_1 {
  top: 90px;
  left: 0;
  width: 750px;
}
.new_pop .new_player_choose_3 {
  width: 420px;
  bottom: 24px;
  right: 28px;
}
.new_pop .new_player_matchRoom_1 {
  top: 120px;
  right: 45px;
  width: 440px;
}
.new_pop .new_player_matchRoom_2 {
  width: 640px;
  bottom: 0;
  right: 0;
}
.new_pop .new_player_my_1 {
  width: 750px;
  left: 0px;
  top: 0px;
}
.new_pop .new_player_my_2 {
  width: 480px;
  left: 120px;
  bottom: 0px;
}
.new_pop .new_player_my_3 {
  width: 750px;
  left: 0px;
  top: 0px;
}
.new_pop .new_player_selected_4 {
  top: 170px;
  width: 360px;
  left: 200px;
}
.new_pop .new_player_selected_5 {
  width: 750px;
  left: 0;
  top: 566px;
}
.new_pop .new_player_roominfo {
  width: 510px;
  bottom: 30px;
  right: 28px;
}
.new_pop .new_player_selected_6 {
  width: 700px;
  left: 24px;
  top: 490px;
}
.new_pop .new_player_selected_7 {
  width: 500px;
  left: 50%;
  top: 50%;
  margin-top: 330px;
  transform: translate(-50%, -50%);
}
.new_pop .new_player_selected_8 {
  width: 750px;
  left: 0px;
  top: 428px;
}

.new_pop .new_player_home_4{
  width: 720px;
  left: 15px;
  top: 165px;
}
.new_pop .new_player_home_5{
  width: 720px;
  left: 15px;
  top: 366px;
}
.new_pop .new_player_mall_1{
  width: 620px;
  right: 20px;
  top: 538px;
}
.new_pop .new_player_mall_2{
  width: 540px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
