<template>
  <div class="choose_player anim-opacity2" v-cloak>
    <div class="match_area-head">
      <head-top
        head-title="选择选手"
        go-back="true"
      ></head-top>
    </div>
    <div class="choose_nav">
      <ul>
        <li class="fll">
          <p class="choose_filter_tab" @click="worthBtn(2)">
            <label>身价</label>
            <label class="arrow">
              <i class="iconfont"
                 :class="{arrow_active:isArrow == 3}"
              >&#xe6d6;</i>
              <i class="iconfont bottom"
                 :class="{arrow_active:isArrow == 4}"
              >&#xe6e3;</i>
            </label>
          </p>
        </li>
        <li class="fll">
          <p class="choose_filter_tab" @click="worthBtn(1)">
            <label>表现</label>
            <label class="arrow">
              <i class="iconfont"
                 :class="{arrow_active:isArrow == 1}"
              >&#xe6d6;</i>
              <i class="iconfont bottom"
                 :class="{arrow_active:isArrow == 2}"
              >&#xe6e3;</i>
            </label>
          </p>
        </li>
      </ul>
    </div>
    <div class="choose_tabs">
      <ul>
        <li
          v-for="(item,index) in tabs_list"
          @click="tabs(index,item.positionID)"
          :class="{active:tabIndex == index}"
        >
          <p><img class="icon" :src="item.icon"></p>
          <p>{{item.role}} {{item.status}}/{{item.num}}</p>
        </li>
      </ul>
    </div>
    <div class="choose_contents" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
         infinite-scroll-distance="50" id="playerList" v-iscroll>
      <p class="no_data" v-if="all_room_player.count == 0">
        <img :src="pic_404">
        <!-- <p>暂无数据！</p> -->
      </p>
      <div class="table">
        <div class="table-tr" v-for="(item,key,index) in all_room_player.list">
          <router-link :to="{ path:'dataPlayer',query:{playerID:item.playerID} }" class="table-td" style="width:192px;">
            <div class="choose_team_avatar">
              <img class="choose_team_logo" :src="item.bg1 == '' ? pic_img[0] : item.bg1">
              <img class="avatar" :src="item.image == '' ? pic_img[1] : item.image">
            </div>
          </router-link>
          <router-link :to="{ path:'dataPlayer',query:{playerID:item.playerID} }" class="table-td" style="width:164px;">
            <div class="choose_team_dec">
              <p><strong>{{item.nickname}}</strong></p>
              <p><strong class="choose_color_orange">${{item.value}}</strong></p>
              <p v-for="(matchInfo,index) in item.match_info" v-if="index <= 1">vs <span>{{matchInfo.vs_team}}</span>
              </p>
            </div>
          </router-link>
          <div class="table-td" style="width:124px;">
            <div class="choose_sraw_line">
              <draw-line
                :score-list="item.score_list == '' ? score_list : item.score_list"
                :id="'chat-'+item.playerID"
                :socre-average="item.score"
              ></draw-line>
              <p>平均分：{{item.score}}</p>
            </div>
          </div>
          <div class="table-td" style="width:88px;" @click="onAdd(item,index)">
            <p class="choose_on_add"
            >
              <i v-if="item.flag == true"></i>
            </p>
          </div>
        </div>
      </div>
      <p class="no_data_end" v-if="all_room_player.count >  0 && all_room_player.list.length < all_room_player.count">
        加载中...</p>
      <p class="no_data_end" v-if="all_room_player.count >  0 && all_room_player.list.length == all_room_player.count">
        没有更多数据了！</p>
    </div>
    <div class="choose_footer">
      <div class="choose_footer_base fll">
        <p>阵容平均分:{{cur_avg_score}}</p>
        <p>阵容总身价:<span class="light_yellow">${{parseInt(cur_value)}}</span></p>
      </div>
      <p @click="addButton" class="add_button flr" v-if="choose_total < 5">已选 {{choose_total}}/5</p>
      <p @click="addButton" class="add_button flr" v-else>下一步</p>
      <!-- <p class="add_button flr" v-else @click="addButton">下一步</p> -->
      <p class="remove_button flr" @click="removeBtn">清空阵容</p>
    </div>

    <div class="dialog opacity" v-if="isRemove">
      <div class="dialog_container dialog_remove">
        <div class="dialog_remove_body">
          <p>是否清除阵容？</p>
        </div>
        <div class="dialog_remove_footer">
          <p class="fll" @click="removeCancel">取消</p>
          <p class="fll" @click="removeButton">确定</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VIscroll from 'viscroll'
  import axios from 'axios'
  import store from 'store'
  import LineDraw from '../components/line-draw.vue'
  import HeadTop from '../components/header.vue'
  // 可以在use的时候设置iscroll的参数
  Vue.use(VIscroll, {
    mouseWheel: true,
    click: false,
    preventDefault: true,
    tap: false,
    bounce: false,
    disableTouch: true
  });
  export default {
    name: 'choose',
    data () {
      return {
        iscrollConf: {
          mouseWheel: true,
          vScrollbar: true,
          click: true,
          preventDefault: true,
          tap: true,
          bounce: false,
          disableTouch: true
        },
        score_list: '',
        tabs_list: [
          {
            icon: 'static/images/icon_p3.png',
            role: '上单',
            status: 0,
            num: 1,
            positionID: 3
          },
          {
            icon: 'static/images/icon_p4.png',
            role: '打野',
            status: 0,
            num: 1,
            positionID: 4
          },
          {
            icon: 'static/images/icon_p2.png',
            role: '中单',
            status: 0,
            num: 1,
            positionID: 2
          },
          {
            icon: 'static/images/icon_p1.png',
            role: 'ADC',
            status: 0,
            num: 1,
            positionID: 1
          },
          {
            icon: 'static/images/icon_p5.png',
            role: '辅助',
            status: 0,
            num: 1,
            positionID: 5
          },
        ],
        tabIndex: 0,
        flag: false,
        choose_total: 0,
        msg: false,
        checked: '',

        isChecked: false,
        all_room_player: '',
        room_match: '',
        positionID: 1,
        cur_room_player: {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        cur_player: {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        cur_avg_score: 0,
        cur_value: 0,
        roomID: '',
        IsShow: '',
        isAll: true,
        matchIDs: '',
        matchID_length: '',
        pic_404: 'static/images/pic_404.png',
        pic_img: ['static/images/avater_default_1.png', 'static/images/avater_default_2.png', 'static/images/unknow_2.png'],
        isArrow: '',
        isRemove: false,
        orderby: 0,
        last_playerID: '',
        busy: false,
        isLoad: 0,
      }
    },
    mounted: function () {
      this.getTabs();
      this.allPlayerPlayer();
      this.loadMore()
    },

    methods: {
      // 排序
      worthBtn(index){
        this.last_playerID = '';
        this.busy = false
        if (index == 1) {
          if (this.isArrow == 2) {
            this.isArrow = 1;
            this.orderby = 2;
          } else {
            this.isArrow = 2;
            this.orderby = 3
          }
        } else {
          if (this.isArrow == 4) {
            this.isArrow = 3;
            this.orderby = 4
          } else {
            this.isArrow = 4;
            this.orderby = 5
          }
        }
        this.$nextTick(() => {
          var playerList = this.$el.querySelector("#playerList");
          playerList.scrollTop = 0;
          this.allPlayerPlayer()
        })

      },
      getTabs(){

        var positionID = this.$route.query.positionID;
        this.positionID = positionID;
        if (positionID == 1) {
          this.tabIndex = 3;
        } else if (positionID == 2) {
          this.tabIndex = 2;
        } else if (positionID == 3) {
          this.tabIndex = 0;
        } else if (positionID == 4) {
          this.tabIndex = 1;
        } else {
          this.tabIndex = 4;
        }
        var user = store.get('user');
        if (user == undefined) {
          this.last_playerID = '';
          this.removeButton()
        } else {
          this.cur_player = user.cur_player;
          if (this.cur_player.TOP != '') {
            this.tabs_list[0].status = 1;
          }
          if (this.cur_player.JUG != '') {
            this.tabs_list[1].status = 1;
          }
          if (this.cur_player.MID != '') {
            this.tabs_list[2].status = 1;
          }
          if (this.cur_player.ADC != '') {
            this.tabs_list[3].status = 1;
          }
          if (this.cur_player.SUP != '') {
            this.tabs_list[4].status = 1;
          }
        }
      },
      addButton(){
        this.$router.back(-1);
//        if (this.$route.query.name != '') {
//          this.$router.push({path: '/Create', query: {name: this.$route.query.name}})
//        } else {
//          this.$router.push({path: '/Create'})
//        }
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          var length = this.all_room_player.list.length;
          if (length < this.all_room_player.count && this.isLoad == 0) {
            this.allPlayerPlayer()
          }
        }, 800);
      },
      allPlayerPlayer(){
        var _this = this;
        this.$api('/services/fantasy/all_player_list.php', {
          positionID: this.positionID,
          last_playerID: this.last_playerID,
          orderby: this.orderby,
        }).then(response => {
          if (_this.last_playerID == '') {
            _this.all_room_player = response.data;
            var AllListLenth = _this.all_room_player.list.length;
            if (AllListLenth == 20) {
              _this.last_playerID = _this.all_room_player.list[AllListLenth - 1].playerID
            }
            var allList = _this.all_room_player.list
          } else {

            var resList = response.data.list;
            var ListLenth = resList.length;
            if (ListLenth == 20) {
              _this.last_playerID = resList[ListLenth - 1].playerID
            } else {
              _this.last_playerID = '';
              _this.isLoad = 1
            }
            var addList = _this.all_room_player.list;
            _this.all_room_player.list = addList.concat(resList);
            var allList = _this.all_room_player.list
          }
          if (_this.positionID == 3 && _this.cur_player.TOP != '') {
            allList.forEach(function (item) {
              if (item.playerID == _this.cur_player.TOP.playerID) {
                Vue.set(item, 'flag', true);
              } else {
                Vue.delete(item, 'flag', true);
              }
            })
          }
          if (_this.positionID == 4 && _this.cur_player.JUG != '') {
            allList.forEach(function (item) {
              if (item.playerID == _this.cur_player.JUG.playerID) {
                Vue.set(item, 'flag', true);
              } else {
                Vue.delete(item, 'flag', true);
              }
            })
          }
          if (_this.positionID == 2 && _this.cur_player.MID != '') {
            allList.forEach(function (item) {
              if (item.playerID == _this.cur_player.MID.playerID) {
                Vue.set(item, 'flag', true);
              } else {
                Vue.delete(item, 'flag', true);
              }
            })
          }
          if (_this.positionID == 1 && _this.cur_player.ADC != '') {
            allList.forEach(function (item) {
              if (item.playerID == _this.cur_player.ADC.playerID) {
                Vue.set(item, 'flag', true);
              } else {
                Vue.delete(item, 'flag', true);
              }
            })
          }
          if (_this.positionID == 5 && _this.cur_player.SUP != '') {
            allList.forEach(function (item) {
              if (item.playerID == _this.cur_player.SUP.playerID) {
                Vue.set(item, 'flag', true);
              } else {
                Vue.delete(item, 'flag', true);
              }
            })
          }
          _this.all_room_player.list = allList
        });
        var total = 0;
        this.tabs_list.forEach(function (item) {
          if (item.status > 0) {
            total++;
          }
        });
        this.choose_total = total;
        this.curPlayer();
        this.busy = false;
      },

      claerTabsList: function () {
        if (this.cur_player.TOP == '') {
          this.tabs_list[0].status = 0;
        }
        if (this.cur_player.JUG == '') {
          this.tabs_list[1].status = 0;
        }
        if (this.cur_player.MID == '') {
          this.tabs_list[2].status = 0;
        }
        if (this.cur_player.ADC == '') {
          this.tabs_list[3].status = 0;
        }
        if (this.cur_player.SUP == '') {
          this.tabs_list[4].status = 0;
        }
      },

      tabs: function (index, position) {
        this.tabIndex = index;
        this.positionID = position;
        this.last_playerID = '';
        this.isLoad = 0;
        this.$nextTick(() => {
          var playerList = this.$el.querySelector("#playerList");
          playerList.scrollTop = 0;
          this.busy = false;
          this.allPlayerPlayer()
        })
      },
      // addButton:function(){
      // 	window.location.href = '/Selected?roomID='+this.roomID;
      // },
      removeBtn(){
        this.isRemove = true
      },
      removeCancel(){
        this.isRemove = false
      },
      removeButton: function () {
        this.tabs_list.forEach(function (item) {
          Vue.set(item, 'status', 0)
        });
        store.remove('user');
        var cur_player = {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        };

        // 清除选中
        this.cur_player = cur_player;

        if (this.all_room_player != '') {
          var allList = this.all_room_player.list
          allList.forEach(function (item) {
            Vue.delete(item, 'flag', false);
          });
        }


        this.choose_total = 0;
        this.cur_avg_score = 0;
        this.cur_value = 0;
        this.isRemove = false
      },

      onAdd: function (item, index) {
        if (this.all_room_player != '') {
          var aList = this.all_room_player.list;
          aList.forEach(function (item) {
            Vue.delete(item, 'flag', true);
          });
          Vue.set(item, 'flag', true);
        }

        if (this.positionID == 3) {
          this.cur_player.TOP = item;
        } else if (this.positionID == 4) {
          this.cur_player.JUG = item;
        } else if (this.positionID == 2) {
          this.cur_player.MID = item;
        } else if (this.positionID == 1) {
          this.cur_player.ADC = item;
        } else if (this.positionID == 5) {
          this.cur_player.SUP = item;
        }


        this.curPlayer();
        this.tabs_list[this.tabIndex].status = 1;

        var total = '';
        this.tabs_list.forEach(function (item) {
          if (item.status > 0) {
            total++;
          }
        });
        this.choose_total = total;

        // 选中

        store.set('user', {cur_player: this.cur_player});
      },

      curPlayer: function () {
        if (this.cur_player.TOP != '') {
          var TOP_avg_score = this.cur_player.TOP.score;
          var TOP_value = this.cur_player.TOP.value;
          var TOP_value = this.cur_player.TOP.value;
        } else {
          var TOP_avg_score = 0;
          var TOP_value = 0;
        }
        if (this.cur_player.JUG != '') {
          var JUG_avg_score = this.cur_player.JUG.score;
          var JUG_value = this.cur_player.JUG.value;
        } else {
          var JUG_avg_score = 0;
          var JUG_value = 0;
        }
        if (this.cur_player.MID != '') {
          var MID_avg_score = this.cur_player.MID.score;
          var MID_value = this.cur_player.MID.value;
        } else {
          var MID_avg_score = 0;
          var MID_value = 0;
        }
        if (this.cur_player.ADC != '') {
          var ADC_avg_score = this.cur_player.ADC.score;
          var ADC_value = this.cur_player.ADC.value;
        } else {
          var ADC_avg_score = 0;
          var ADC_value = 0;
        }
        if (this.cur_player.SUP != '') {
          var SUP_avg_score = this.cur_player.SUP.score;
          var SUP_value = this.cur_player.SUP.value;
        } else {
          var SUP_avg_score = 0;
          var SUP_value = 0;
        }
        var cur_avg_score = parseFloat(TOP_avg_score) +
          parseFloat(JUG_avg_score) +
          parseFloat(MID_avg_score) +
          parseFloat(ADC_avg_score) +
          parseFloat(SUP_avg_score);
        this.cur_avg_score = parseFloat(cur_avg_score).toFixed(1);

        this.cur_value = parseInt(TOP_value) + parseInt(JUG_value) + parseInt(MID_value) + parseInt(ADC_value) + parseInt(SUP_value);
      },
    },
    watch: {
      '$route' () {
        this.getTabs();
        this.allPlayerPlayer()
        // this.loadMore();
      }
    },
    computed: {},
    components: {
      drawLine: LineDraw,
      headTop: HeadTop
    }
  }

</script>

<style>
  /*无数据*/
  .no_data {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .no_data_end {
    padding: 20px;
    text-align: center;
    color: #999;
  }

  .no_data img {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, 0);
  }


</style>
