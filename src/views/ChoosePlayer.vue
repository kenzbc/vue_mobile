<template>
  <div class="choose_player anim-opacity2" >
    <div class="match_area-head">
      <head-top
        head-title="选择选手"
        go-back="true"
      ></head-top>
    </div>

    <div class="head-tab">
      <div class="tab-item" v-for="(item,index) in tabs_list" @click="tabs(index,item.positionID)"
           :class="{active:tabIndex == index}">
        <position-icon :position="item.short_name" width="30"></position-icon>
        <span class="title"><span>{{item.short_name}}</span>
          <i class="iconfont active" v-if="cur_player.TOP != '' && index == 0">&#xe653;</i>
          <i class="iconfont active" v-else-if="cur_player.JUG != '' && index == 1">&#xe653;</i>
          <i class="iconfont active" v-else-if="cur_player.MID != '' && index == 2">&#xe653;</i>
          <i class="iconfont active" v-else-if="cur_player.ADC != '' && index == 3">&#xe653;</i>
          <i class="iconfont active" v-else-if="cur_player.SUP != '' && index == 4">&#xe653;</i>
          <i class="iconfont" v-else>&#xe655;</i>
        </span>
      </div>

    </div>


    <div class="sizer">
      <div class="item" :class="isArrow == 3 ?'ascending' : isArrow == 4 ? 'descending':''" @click="worthBtn(2)">身价
        <span class="caret-wrapper">
          <i class="sort-caret ascending"></i>
          <i class="sort-caret descending"></i>
        </span>
      </div>
      <div class="item" :class="isArrow == 1 ?'ascending' : isArrow == 2 ? 'descending':''" @click="worthBtn(1)">表现
        <span class="caret-wrapper" @click="worthBtn(1)">
          <i class="sort-caret ascending"></i>
          <i class="sort-caret descending"></i>
        </span>
      </div>
    </div>

    <div class="content-list" v-if="room_player != '' ">
      <div class="battle-array-list-box" :class="{'active':item.flag==true}" v-for="(item,index) in room_player[tabIndex].list" v-if="item.isSelected == true">
        <div class="icon-selected"><img src="../assets/image/icon_right_top_selected@2x.png"></div>
        <div class="content" @click="onAdd(item,index)">
          <router-link @click.stop="" class="item avatar" :to="{ path:'dataPlayer',query:{playerID:item.playerID} }">
          <div class="item avatar">
            <img class="bg" :src="item.bg1 == '' ? pic_img[0] : item.bg1" width="153" height="120">
            <img class="photo" :src="item.player_image == '' ? pic_img[1] : item.player_image" width="120" height="120">
          </div>
          </router-link>
          <div class="item team">
            <span>{{item.nickname}}</span>
            <span v-for="(matchInfo,index) in item.match_info" v-if="index <= 1">vs {{matchInfo.vs_team}}</span>
          </div>

          <div class="item score">
            <span class="chart">
              <draw-line
                :score-list="item.score_list == '' ? score_list : item.score_list"
                :id="'chat-'+item.playerID"
                :socre-average="item.score"
              ></draw-line>
            </span>
            <span>场均：{{item.score}}</span>
          </div>
          <div class="item money">
            <span>¥{{item.value}}</span>
            <player-status :status="item.player_status"></player-status>
          </div>
        </div>
      </div>
    </div>








    <div class="footer-button">
      <div class="count">
        <span class="text">阵容平均分：{{cur_avg_score}}</span>
        <span class="text" v-if="room_info != ''">可用工资：
          <span v-if="choose_total < 5"><span class="c-rose-red">¥{{parseInt(room_info.salary_cap - cur_value)}}</span> (<span class="c-rose-red">¥39</span>/人)</span>
          <span v-else><span class="c-rose-red">¥{{parseInt(room_info.salary_cap - cur_value)}}</span> (<span class="c-rose-red">¥39</span>/人)</span>
        </span>
        <span class="text" v-else>可用工资：
          <span v-if="choose_total < 5"><span class="c-rose-red">¥{{parseInt(group_salary_cap - cur_value)}}</span> (<span class="c-rose-red">¥39</span>/人)</span>
          <span v-else><span class="c-rose-red">¥{{parseInt(group_salary_cap - cur_value)}}</span> (<span class="c-rose-red">¥39</span>/人)</span>
        </span>

      </div>
      <button class="button" @click="isRemove = true">清除阵容</button>
      <button class="button active" @click="addButton" v-if="choose_total < 5">已选 {{choose_total}}/5</button>
      <button class="button active" @click="addButton" v-else>{{isSort.text}}</button>
    </div>





    <!-- 筛选弹出 -->
    <div class="dialog other" v-if="IsShow">
      <div class="dialog_bj" @click="closeDialog"></div>
      <div class="dialog_choose">
        <div class="dialog_choose_header">
          <p class="fll">筛选比赛场次</p>
          <div class="right flr">
            <p class="fll">
              全选
              <label class="dialog_checkbox flr "
                     :class="{light_blue_bj:isAll}"
                     @click="AllSelectBtn">
                <i class="iconfont" v-if="isAll">&#xe6bb;</i>
              </label>
            </p>
          </div>
        </div>
        <div class="dialog_choose_list" v-for="(item,index) in room_match">
          <div class="dialog_choose_match fll">
            <div class="team_a fll">
              <p><img :src="item.team_a_image_thumb"></p>
              <p>{{item.team_a_short_name}}</p>
            </div>
            <div class="team_vs fll">
              <p>VS</p>
              <P>{{item.start_time_string}}</P>
            </div>
            <div class="team_b fll">
              <p><img :src="item.team_b_image_thumb"></p>
              <p>{{item.team_b_short_name}}</p>
            </div>
          </div>
          <div class="right flr">
            <label class="dialog_checkbox " :class="item.checked == isChecked ? 'light_blue_bj' : ''"
                   @click="radioSelectBtn(item,index)">
              <i class="iconfont" v-if="!item.checked">&#xe6bb;</i>
            </label>
          </div>
        </div>
        <div class="dialog_choose_footer">
          <p class="flr" @click="filterBtn">完成</p>
        </div>
      </div>
    </div>


    <!--是否清除阵容？-->
    <dialog-confirm v-if="isRemove" @callbackAction="removeAction" text="是否清除阵容？"></dialog-confirm>


  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import store from 'store'
  import LineDraw from '../components/LineDraw.vue'
  import HeadTop from '../components/header.vue'
  import DialogConfirm from '../components/DialogConfirm.vue'

  export default {
    name: 'choose',
    data () {
      return {
        score_list: '',
        tabs_list: [
          {
            icon: 'static/images/icon_p3.png',
            role: '上单',
            short_name:'TOP',
            status: 0,
            num: 1,
            positionID: 3
          },
          {
            icon: 'static/images/icon_p4.png',
            role: '打野',
            short_name:'JUG',
            status: 0,
            num: 1,
            positionID: 4
          },
          {
            icon: 'static/images/icon_p2.png',
            role: '中单',
            short_name:'MID',
            status: 0,
            num: 1,
            positionID: 2
          },
          {
            icon: 'static/images/icon_p1.png',
            role: 'ADC',
            short_name:'ADC',
            status: 0,
            num: 1,
            positionID: 1
          },
          {
            icon: 'static/images/icon_p5.png',
            role: '辅助',
            short_name:'SUP',
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
        room_info: '',
        room_player: '',
        room_match: '',

        positionID: '',
        cur_player: {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        cur_avg_score: 0,
        cur_value: 0,
        roomIDs: '',
        IsShow: '',
        isAll: true,
        matchID: 0,
        matchIDs: [],
        matchID_length: '',
        pic_img: ['static/images/avater_default_1.png', 'static/images/avater_default_2.png', 'static/images/unknow_2.png'],
        isRemove: false,
        isArrow: '',
        teamIDs: [],
        argIndex: '',
        params:'',
        group_salary_cap:'',
        isSort:{ //身价是否超过工资帽
        	status:0,  //0:身价未超过   1：超过
          text:'下一步',
        }
      }
    },
    created(){
      let member_info = store.get('member_info');
      if(member_info == undefined){
        this.$router.push({path:'/home'});
      }
//      if (JSON.parse(sessionStorage.getItem('avatar')) == null) {
//        this.$router.push({path: '/home'});
//      } else {
//        if (JSON.parse(sessionStorage.getItem('avatar')) == '') {
//          this.$router.push({path: '/home'});
//        }
//      }
    },
    mounted: function () {
      this.getData();
      this.RoomPlayer();
    },
    methods: {

      // 排序
      worthBtn(index){
        this.argIndex = index;
        var aList = this.room_player[this.tabIndex].list;
        if (index == 1) {
          if (this.isArrow == 2) {
            this.isArrow = 1;
            aList.sort(this.comparedrop('score'));
          } else {
            this.isArrow = 2;
            aList.sort(this.compareRise('score'));
          }
        } else {
          if (this.isArrow == 4) {
            this.isArrow = 3;
            aList.sort(this.comparedrop('value'));
          } else {
            this.isArrow = 4;
            aList.sort(this.compareRise('value'));
          }
        }
      },
      // 降序
      comparedrop(propertyvalue){
        return function (object1, object2) {
          var value1 = object1[propertyvalue];
          var value2 = object2[propertyvalue];
          if (parseFloat(value2) > parseFloat(value1)) {
            return -1;
          } else if (parseFloat(value2) < parseFloat(value1)) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      // 升序
      compareRise(propertyvalue){
        return function (object1, object2) {
          var value1 = object1[propertyvalue];
          var value2 = object2[propertyvalue];
          if (parseFloat(value2) < parseFloat(value1)) {
            return -1;
          } else if (parseFloat(value2) > parseFloat(value1)) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      RoomPlayer(){
        var roomIDs = store.get('roomID');
        if(roomIDs != undefined){
          this.roomIDs = roomIDs;
          var roomID = roomIDs.roomID
        }else{
          var roomID = '';
        };
        var params = store.get('group');
        if(params != undefined){
        	this.params = params;
          var group_id = params.group_id;
          this.group_salary_cap = params.salary_cap;
        }else{
          var group_id = '';
        }

        var _this = this;
        this.$api('/services/fantasy/room_player.php', {
        	roomID: roomID,
          group_id: group_id,
        }).then(response => {
        	if(response.code == 200){
            _this.room_player = response.data;
            if(store.get('new_player') && store.get('new_player').indexOf('/choosePlayer') < 0){
              store.set('new_player',store.get('new_player')+'/choosePlayer');
              this.$root.hub.$emit('new_player_go_Success','1');
            }
            var TOP_List = _this.room_player[0].list;
            var JUG_List = _this.room_player[1].list;
            var MID_List = _this.room_player[2].list;
            var ADC_List = _this.room_player[3].list;
            var SUP_List = _this.room_player[4].list;

            if (_this.positionID == 3) {
              TOP_List.forEach(function (item) {
                Vue.set(item, 'isSelected', true);
                if (_this.cur_player.TOP != '') {
                  if (item.playerID == _this.cur_player.TOP.playerID) {
                    Vue.set(item, 'flag', true);
                  } else {
                    Vue.delete(item, 'flag', true);
                  }
                }
              })

            }
            if (_this.positionID == 4) {
              JUG_List.forEach(function (item) {
                Vue.set(item, 'isSelected', true);
                if (_this.cur_player.JUG != '') {
                  if (item.playerID == _this.cur_player.JUG.playerID) {
                    Vue.set(item, 'flag', true);
                  } else {
                    Vue.delete(item, 'flag', true);
                  }
                }
              })
            }
            if (_this.positionID == 2) {
              MID_List.forEach(function (item) {
                Vue.set(item, 'isSelected', true);
                if (_this.cur_player.MID != '') {
                  if (item.playerID == _this.cur_player.MID.playerID) {
                    Vue.set(item, 'flag', true);
                  } else {
                    Vue.delete(item, 'flag', true);
                  }
                }

              })
            }
            if (_this.positionID == 1) {
              ADC_List.forEach(function (item) {
                Vue.set(item, 'isSelected', true);
                if (_this.cur_player.ADC != '') {
                  if (item.playerID == _this.cur_player.ADC.playerID) {
                    Vue.set(item, 'flag', true);
                  } else {
                    Vue.delete(item, 'flag', true);
                  }
                }
              })
            }
            if (_this.positionID == 5) {
              SUP_List.forEach(function (item) {
                Vue.set(item, 'isSelected', true);
                if (_this.cur_player.SUP != '') {
                  if (item.playerID == _this.cur_player.SUP.playerID) {
                    Vue.set(item, 'flag', true);
                  } else {
                    Vue.delete(item, 'flag', true);
                  }
                }
              })
            }

            _this.tabLoad(_this.argIndex, _this.isArrow)
            _this.curPlayer()
          }
        })
      },
      tabLoad(argIndex, isArrow){
        var aList = this.room_player[this.tabIndex].list;
        if (argIndex == 1 && isArrow == 1) {
          aList.sort(this.comparedrop('score'));
        } else if (argIndex == 1 && isArrow == 2) {
          aList.sort(this.compareRise('score'));
        } else if (argIndex == 2 && isArrow == 3) {
          aList.sort(this.comparedrop('value'));
        } else if (argIndex == 2 && isArrow == 4) {
          aList.sort(this.compareRise('value'));
        }

      },
      getData: function () {

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
        };


        var room_info = store.get('room_info');
        if(room_info != undefined){
          this.room_info = room_info;
        }

        var group = store.get('group');
        if(group != undefined){
          this.group = group;
        }
        // console.log(this.room_info)

        var user = store.get('user');
        if (user == undefined) {
          this.claerTabsList();
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
          var total = '';
          this.tabs_list.forEach(function (item) {
            if (item.status > 0) {
              total++;
            }
          });
          this.choose_total = total;
          this.claerTabsList()
        }
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
        this.RoomPlayer()
      },
      addButton(){
      	if( this.isSort.status == 1 ){
          layer.open({
            content: '剩余工资不足，请调整您的阵容',
            btn: "关闭"
          });
        } else {
          this.$router.back(-1);
        }


//        if(this.roomIDs == ''){
//          this.$router.push({path: '/Selected', query: {
//            group_id: this.params.group_id,
//            salary_cap: this.params.salary_cap,
//            at_end_time:this.params.at_end_time,
//          }});
//        }else{
//          if (this.roomIDs.order_id == '') {
//            this.$router.push({path: '/Selected', query: {roomID: this.roomIDs.roomID}})
//          } else {
//            this.$router.push({path: '/Selected', query: {roomID: this.roomIDs.roomID, order_id: this.roomIDs.order_id}})
//          }
//        }
      },


      //是否取消阵容弹层确认
      removeAction(action){
        //alert('action='+action);
        if(!action){
          this.isRemove = false;
          return false;
        }

        //点击了确认"取消阵容"
        this.tabs_list.forEach(function (item) {
          Vue.set(item, 'status', 0);
        });
        this.RoomPlayer();
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
        this.isSort = {
          status:0,
          text:'下一步',
        };

        this.choose_total = 0;
        this.cur_avg_score = 0;
        this.cur_value = 0;
        this.isRemove = false


      },







      onAdd: function (item, index) {
        var aList = this.room_player[this.tabIndex].list;
        aList.forEach(function (item) {
          Vue.delete(item, 'flag', true);
        });
        Vue.set(item, 'flag', true);


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
        // console.log(this.tabs_list);
        var total = 0;
        this.tabs_list.forEach(function (item) {
          if (item.status > 0) {
            total++;
          }
        });
        this.choose_total = total;

        // 选中
        // console.log(this.room_player);
        store.set('room_player', this.room_player);
        store.set('user', {cur_player: this.cur_player});
        var cur_player = store.get('user').cur_player;
        // console.log(cur_player);
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

        if (parseInt(this.room_info.salary_cap) - this.cur_value < 0) {
          this.isSort.status = 1;
          this.isSort.text = '工资不足';
        } else {
          this.isSort.status = 0;
          this.isSort.text = '下一步';
        }

      },
      radioSelectBtn: function (item, index) {
        var matchID = item.matchID;
        var _this = this;
        this.$nextTick(function () {
          this.room_match.forEach(function (item) {
            if (item.matchID == matchID && item.checked == _this.isChecked) {
              Vue.set(item, 'checked', true);
              var matchIDs = [];
              for (var i in _this.matchIDs) {
                if (_this.matchIDs[i] != item.matchID) {
                  matchIDs.push(_this.matchIDs[i]);
                }
              }
              _this.matchIDs = matchIDs;
            } else if (item.matchID == matchID) {
              Vue.set(item, 'checked', false);
              _this.matchIDs.push(item.matchID)
            }

            if (_this.matchIDs.length != 0 && _this.matchIDs.length == _this.matchID_length) {
              _this.isAll = true
            } else {
              _this.isAll = false
            }
          })
        })

      },
      AllSelectBtn: function () {
        var _this = this;
        _this.matchIDs = [];
        if (this.isAll == true) {
          this.isAll = false;
          this.room_match.forEach(function (item) {
            Vue.set(item, 'checked', true);
          });
        } else {
          this.isAll = true;
          this.room_match.forEach(function (item) {
            Vue.set(item, 'checked', false);
            _this.matchIDs.push(item.matchID);
          });
        }
      },
      filterBtn: function () {
        this.IsShow = false
        // console.log(this.matchIDs);
        // console.log(this.room_player);
        // var _this = this

        // var aList = this.room_player[this.tabIndex].list;
// 			aList.forEach(function (item) {

// 　　　　　　});
        // this.room_player.forEach(function(item){
        // 	var list = item.list
        // 	list.forEach(function(item){
        // 		var match_info = item.match_info;
        // 		var aa = _this.isSelect(match_info)

        // 	})
        // })
      },
      // isSelect(match_info){
      // 	for(var i in match_info){
      // 		console.log(match_info[i].matchID)
      // 		for(var j in this.matchIDs){
      // 			console.log(this.matchIDs[j])
      // 		}
      // 	}
      // 	// return true
      // },
      closeDialog: function () {
        this.IsShow = false
      },
      // comIconChange:function(msg){
      // 	this.IsShow = msg
      // 	if(this.IsShow == true){
      // 		var _this = this
      // 		if(_this.room_match == ''){
      // 			this.ajax('/fantasy/room_match.php', {roomID:this.roomIDs.roomID}, function (response) {
      // 		        _this.room_match = response.data.data
      // 		        _this.isAll = true
      // 		        _this.room_match.forEach(function (item) {
      // 		    		Vue.set(item,'checked',false);
      // 		    		_this.matchIDs.push(item.matchID);
      // 		    		_this.teamIDs.push(item.teamID_a)
      // 		    		_this.teamIDs.push(item.teamID_b)
      // 		    	})
      // 		    	_this.matchID_length = _this.matchIDs.length
      // 		    })
      // 		}
      // 	}else{
      // 		this.matchIDs = []
      // 		this.teamIDs = []
      // 	}

      // }
    },
    watch: {
      //深度 watcher
      // 'checkboxModel': {
      // 	handler: function (val, oldVal) {
      // 		if (this.checkboxModel.length === this.checkboxData.length) {
      // 			this.checked=true;
      // 		}else{
      // 			this.checked=false;
      // 		}
      // 	},
      // 	deep: true
      // }
      // 'ischeckdate':function(){
      // 	console.log(this.ischeckdate.toString());
      // }

      '$route' () {
//        this.getData();
        this.curPlayer();
//        this.RoomPlayer();
        // this.comIconChange()
      }
    },
    components: {
      drawLine: LineDraw,
      headTop: HeadTop,
      DialogConfirm:DialogConfirm,
    },
    computed: {
      // filteredUsers: function () {
      //   var self = this
      //   return self.users.filter(function (user) {
      //     return user.name.indexOf(self.matchID) !== -1
      //   })
      // }
    }
  }

</script>

<style scoped lang="stylus">

  .match_area-head{
    position fixed;
    z-index:50;
    top:0;
    left:0;
    right:0;
  }

  .head-tab{
    width:100%;
    height:100px;
    padding:0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background #fff;
    position:fixed;
    z-index:50;
    top:90px;

    .tab-item{
      flex-shrink:0;
      display:block;
      width:50px;
      height: 100%;
      line-height: 20px;
      padding-top: 20px;
      text-align: center;
      color: #B2B0D2;
      position: relative;

      span{
        display block;
        text-align center;
        color:#5B579A;
      }

      .icon{
        width:40px;
        height:40px;
        color:#5B579A;
        font-weight bold;
      }

      .title{
        width 100%;
        font-size: 22px;
        color:#B2B0D2;
        display inline-flex;
        align-items center;
        justify-content center;

        span {
          padding-left:22px;
          color:#A192BD;
        }
        i {
          margin-left:6px;
          font-weight bold;
        }
        i.active {
          margin-left:6px;
          font-weight bold;
          color:#5348FF;
        }
      }


    }

    .tab-item.active{
      border-bottom:8px solid #5348FF;
    }
  }


  //筛选器
  .sizer{
    width:100%;
    padding:0 60px;
    height 80px;
    background:#f8f7fa;
    display flex;
    justify-content center;
    align-items center;
    font-size:28px;
    color:#B2B0D2;
    position:fixed;
    z-index:50;
    top:190px;


    .item.ascending{
      .sort-caret.ascending {
        border-bottom-color: #5348FF;
      }
    }
    .item.descending{
      .sort-caret.descending {
        border-top-color: #5348FF;
      }
    }
    .item{
      width 180px;
      text-align: center;

      .caret-wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 34px;
        width: 24px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: relative;
      }

      .sort-caret {
        width: 0;
        height: 0;
        border: 8px solid transparent;
        position: absolute;
        left: 7px;
      }

      .sort-caret.ascending {
        border-bottom-color: #c0c4cc;
        top: -2px;
      }
      .sort-caret.descending {
        border-top-color: #c0c4cc;
        bottom: 0px;
      }

    }
  }



  .content-list{
    margin-top:260px;
    padding-top: 10px;
    padding-bottom:300px;
  }
  .battle-array-list-box{
    min-height:120px;
    margin:28px;
    margin-top:0;
    border-radius:12px;
    overflow: hidden;
    background:#fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    position:relative;
    border:4px solid #f8f7fa;


    .icon-selected{
      position:absolute;
      top:-4px;right:-4px;
      display none;
    }
    .icon-selected:before{
      content '';
    }

    .content{
      height:120px;




      display flex;
      align-items center;
      justify-content flex-start;


      .item{
        display flex;
        align-items center;
        flex-wrap wrap;

        span{
          width 100%;
          display block;
        }
        .icon{
          width 34px;
          height 34px;
        }
        .plus{
          font-size:32px;
          color:#5451fb;
        }
      }

      .avatar{
        width 160px;
        height 100%;
        position relative;

        .bg{
          position absolute;
          z-index 1;
        }
        .photo{
          position absolute;
          z-index 2;
        }
        img {
          max-height 100%;
        }
      }



      .money{
        width 100px;
        padding-left:30px;
        font-weight bold;

        span:first-child{
          color:#EF1B5A;
          font-size:24px;
          margin-bottom:6px;
        }

        .icon-label{
          width:56px;
          height:28px;
          margin-top: 10px;
          background:#5348FF;
          border-radius:6px;
          font-size:16px;
          color:#fff;
          display inline-flex;
          justify-content center;
          align-items center;
        }
      }



      .team{
        width 200px;
        color:#B2B0D2;
        font-size:18px;
        font-weight bold;

        span:first-child{
          font-size:28px;
          color:#5B579A;
        }

      }


      .score{
        width 200px;
        text-align center;
        font-size:20px;

        .chart{
          width 90px;
          height:90px;
          margin:0 auto;
          margin-top:-20px;

          img {
            width 100%;
          }
        }


        span{
          font-size:24px;
          color:#5B579A;
          font-weight bold;
        }
      }


    }


  }

  .battle-array-list-box.active{
    border:4px solid #5451fb;

    .icon-selected{
      display inline-block;
    }
  }




  .footer-button{
    margin-top:30px;
    padding: 48px;
    display flex;
    justify-content space-between;
    align-items center;
    background #fff;
    position fixed;
    z-index: 50;
    bottom 0;
    width 100%;

    .count{
      width:300px;
      color:#5B579A;
      font-size:24px;
      font-weight bold;

      .text {
        display block;
        width 100%;
        font-size:24px;
        font-weight bold;

      }
    }

    .button{
      width:156px;
      height:72px
      border-radius:12px;
      background none;
      border:1px solid;
      font-size:24px;
      color:#5348FF;
    }
    .button.active{
      color:#fff;
      background:linear-gradient(137deg,#8B48FF 0%,#5348FF 100%);
      box-shadow:0px 16px 12x -12px #5348FF;
      border-radius:12px;
    }
  }


</style>
