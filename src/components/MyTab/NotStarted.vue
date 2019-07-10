<template>
    <div title="未开始">

      <div class="nav-tab">
        <span class="switch-btn">
          <span @click="toggleButton(0)" :class="{'active':bgRed==0}">显示阵容</span>
          <span @click="toggleButton(1)" :class="{'active':bgRed==1}">显示房间</span>
        </span>

        <span class="show-all" v-show="bgRed==0" @click="showSquadList">
          <span>
            <b v-show="flag==0">全部展开</b>
            <b v-show="flag==1">全部收起</b>
            <i class="iconfont control" :class="{'active':flag==1}">&#xe673;</i>
          </span>
        </span>
        <span class="show-all" v-show="bgRed==1" @click="showRoomdList" >
          <span>
            <b v-show="flag1==0">全部展开</b>
            <b v-show="flag1==1">全部收起</b>
            <i class="iconfont control" :class="{'active':flag1==1}">&#xe673;</i>
          </span>
        </span>
      </div>

      <div style="padding:28px;">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy1" infinite-scroll-distance="100"
             v-show="aquadRoom!=''">
        <!--阵容-->
        <div v-if="bgRed==0">
          <div class="room-list-box" v-for="(items,index) in aquadRoom">
            <div class="battle-array">
              <div class="average-score" @click="showSquad(index)">
                <span class="title">参赛房间数：{{items.room_list.length}}</span>
                <span class="title">阵容平均分：{{items.avg_score}}</span>
                <i class="iconfont control" :class="{'active':arr1[index]==1}">&#xe673;</i>
              </div>
              <div class="team">
                <div class="item" title="TOP">
                  <player-item
                    :position="items.member_team[0].top.position_short_name"
                    :background-img="items.member_team[0].top.bg2"
                    :player-avatar="items.member_team[0].top.player_image"
                    :score="items.member_team[0].top.socre_average"
                    :nickname="items.member_team[0].top.player_nickname"
                    :team-name="items.member_team[0].top.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="JUG">
                  <player-item
                    :position="items.member_team[0].jun.position_short_name"
                    :background-img="items.member_team[0].jun.bg2"
                    :player-avatar="items.member_team[0].jun.player_image"
                    :score="items.member_team[0].jun.socre_average"
                    :nickname="items.member_team[0].jun.player_nickname"
                    :team-name="items.member_team[0].jun.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="MID">
                  <player-item
                    :position="items.member_team[0].mid.position_short_name"
                    :background-img="items.member_team[0].mid.bg2"
                    :player-avatar="items.member_team[0].mid.player_image"
                    :score="items.member_team[0].mid.socre_average"
                    :nickname="items.member_team[0].mid.player_nickname"
                    :team-name="items.member_team[0].mid.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="ADC">
                  <player-item
                    :position="items.member_team[0].adc.position_short_name"
                    :background-img="items.member_team[0].adc.bg2"
                    :player-avatar="items.member_team[0].adc.player_image"
                    :score="items.member_team[0].adc.socre_average"
                    :nickname="items.member_team[0].adc.player_nickname"
                    :team-name="items.member_team[0].adc.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="SUP">
                  <player-item
                    :position="items.member_team[0].sup.position_short_name"
                    :background-img="items.member_team[0].sup.bg2"
                    :player-avatar="items.member_team[0].sup.player_image"
                    :score="items.member_team[0].sup.socre_average"
                    :nickname="items.member_team[0].sup.player_nickname"
                    :team-name="items.member_team[0].sup.team_short_name"
                  ></player-item>
                </div>

              </div>
            </div>

            <div class="room top_border" v-show="arr1[index]==1" v-for="(roomItem,i) in items.room_list">
              <div class="line"></div>
              <div class="head" :style="{backgroundImage:'url(' + roomItem.cover_url + ')'}" style="background-size:cover;">
                <room-type-icon data-des="房间类型" v-if="roomItem.type < 9" :type="roomItem.type"></room-type-icon>
                <img data-des="房间类型" class="member-img" v-else-if="roomItem.type == 9"
                     :src="roomItem.member_avatar || '../../assets/image/icon_60_five-pointed-star@2x.png'" alt="">

                <div class="title">
                  <span>{{roomItem.name}}</span>
                  <span>{{roomItem.room_desc}}</span>
                </div>
                <div class="subtitle">
                  <span>{{roomItem.at_times}}/{{roomItem.num}}</span>
                  <span>参与人数</span>
                </div>
              </div>
              <div class="content">
                <div class="item" @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)"><span>{{roomItem.price}}</span><span>入场费</span></div>
                <div class="item" @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)"><span>{{roomItem.prize_num}}</span><span>中奖范围</span></div>
                <div class="item" @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)"><span>{{roomItem.prize_amount}}</span><span>奖励</span></div>
                <div class="item" @click="addRoom(items.member_team[0].top.playerID,items.member_team[0].jun.playerID,items.member_team[0].mid.playerID,items.member_team[0].adc.playerID,items.member_team[0].sup.playerID,roomItem.member_at_times,roomItem.times,roomItem.price,roomItem.roomID,ticket,index,i,roomItem.type,roomItem.at_times,roomItem.num)">
                  <span>{{roomItem.member_at_times}}/{{roomItem.times}}</span>
                  <span><i class="iconfont">&#xe6da;</i></span>
                </div>
              </div>
              <div class="date">
                <div class="time" @click="showRoom(index)">
                  <i class="iconfont">&#xe657;</i> {{ roomItem.at_end_time | formatDate }}
                  <span class="bk" v-if="roomItem.is_must_open==1">必开</span>
                  <span class="rmk" v-else="roomItem.is_must_open==0">满{{roomItem.num_limit != '0' ? roomItem.num_limit : roomItem.num}}人开</span>

                </div>
              </div>
            </div>


          </div>
        </div>

        <!--房间-->
        <div class="room-list-box" v-else-if="bgRed==1" v-for="(items,index) in aquadRoom">
          <div class="head" :style="{backgroundImage:'url(' + items.room_list[0].cover_url + ')'}" style="background-size:cover;">
            <room-type-icon data-des="房间类型" v-if="items.room_list[0].type < 9" :type="items.room_list[0].type"></room-type-icon>
            <img data-des="房间类型" class="member-img" v-else-if="items.room_list[0].type == 9"
                 :src="items.room_list[0].member_avatar || '../../assets/image/icon_60_five-pointed-star@2x.png'" alt="">

            <div class="title" @click="showRoom(index)">
              <span>{{items.room_list[0].name}}</span>
              <span>{{items.room_list[0].room_desc}}</span>
            </div>
            <div class="subtitle">
              <span>{{items.room_list[0].at_times}}/{{items.room_list[0].num}}</span>
              <span>参与人数</span>
            </div>
          </div>
          <div class="content">
            <div class="item"><span>{{items.room_list[0].price}}</span><span>入场费</span></div>
            <div class="item"><span>{{items.room_list[0].prize_num}}</span><span>中奖范围</span></div>
            <div class="item"><span>{{items.room_list[0].prize_amount}}</span><span>奖励</span></div>
            <div class="item"><span class="add-text">{{items.room_list[0].member_at_times}}/{{items.room_list[0].times}}</span><span><i class="iconfont">&#xe6da;</i></span></div>
          </div>
          <div class="date" @click="showRoom(index)">
            <div class="time">
              <i class="iconfont">&#xe657;</i> 2018.08.08 16:00
              <span class="bk" v-if="items.room_list[0].is_must_open==1">必开</span>
              <span class="rmk" v-else="items.room_list[0].is_must_open==0">满{{items.room_list[0].num_limit != '0' ? items.room_list[0].num_limit : items.room_list[0].num}}人开</span>

            </div>
            <i class="iconfont control" :class="{'active':arr2[index]==1}">&#xe673;</i>
          </div>

          <!--阵容-->
          <div class="battle-array top_border" v-show="arr2[index]==1" v-for="(item,i) in items.member_team">
            <div>
              <router-link
                :to="{path:'roomInfo',query:{roomID:items.roomID,status:0,orderId:item.order_id,title:items.room_list[0].name}}">
              <div class="average-score">
                <span>阵容平均分：{{item.avg_score}}</span>
                <span @click="dataStore(item,items.roomID,item.order_id)">编辑</span>
              </div>
              <div class="team">
                <div class="item" title="TOP">
                  <player-item
                    :position="items.member_team[0].top.position_short_name"
                    :background-img="items.member_team[0].top.bg2"
                    :player-avatar="items.member_team[0].top.player_image"
                    :score="items.member_team[0].top.score"
                    :nickname="items.member_team[0].top.player_nickname"
                    :team-name="items.member_team[0].top.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="JUG">
                  <player-item
                    :position="items.member_team[0].jun.position_short_name"
                    :background-img="items.member_team[0].jun.bg2"
                    :player-avatar="items.member_team[0].jun.player_image"
                    :score="items.member_team[0].jun.score"
                    :nickname="items.member_team[0].jun.player_nickname"
                    :team-name="items.member_team[0].jun.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="MID">
                  <player-item
                    :position="items.member_team[0].mid.position_short_name"
                    :background-img="items.member_team[0].mid.bg2"
                    :player-avatar="items.member_team[0].mid.player_image"
                    :score="items.member_team[0].mid.score"
                    :nickname="items.member_team[0].mid.player_nickname"
                    :team-name="items.member_team[0].mid.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="ADC">
                  <player-item
                    :position="items.member_team[0].adc.position_short_name"
                    :background-img="items.member_team[0].adc.bg2"
                    :player-avatar="items.member_team[0].adc.player_image"
                    :score="items.member_team[0].adc.score"
                    :nickname="items.member_team[0].adc.player_nickname"
                    :team-name="items.member_team[0].adc.team_short_name"
                  ></player-item>
                </div>
                <div class="item" title="SUP">
                  <player-item
                    :position="items.member_team[0].sup.position_short_name"
                    :background-img="items.member_team[0].sup.bg2"
                    :player-avatar="items.member_team[0].sup.player_image"
                    :score="items.member_team[0].sup.score"
                    :nickname="items.member_team[0].sup.player_nickname"
                    :team-name="items.member_team[0].sup.team_short_name"
                  ></player-item>
                </div>
              </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="data-null">{{message}}</div>

        </div>


        <carShop v-show="carShow" @newNodeEvent="parentLisen" @newNodeEvent1="parentLisen1" :carList="carList"></carShop>
        <loading v-show="loading==false"></loading>
        <div class="started-null" v-show="loading&&aquadRoom==''">
          <img src="static/images/nothing_icon.png" alt="">
          <p>暂无未开始的房间~</p>
        </div>
      </div>


    </div>
</template>

<script>
  import store from 'store'
  import carShop from '../PayOrder.vue'
  import loading from '../loading.vue'
  var arr1 = new Array()
  var arr2 = new Array()
  var flag
  var flag1
  export default {
    name: 'NotStarted',
    data () {

      return {
        ingSur: '',
        bgRed: 0,
        page: 1,
        room_type: ['', '新手', '活动', '日赛', '周赛', 'Solo', '名人', '毒奶', 'Solo'],
        busy1: false,
        message: '暂无更多内容',
        items: [
          {number: "01"},
          {number: "01"}
        ],
        arr1,
        arr2,
        loading: false,
        show_type: 1,
        flag: 0,
        flag1: 0,
        aquadRoom: [],
        leval,
        ticket: '',
        carShow: false,  //是否弹窗
        cur_player: {  //阵容参数
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        carList: {    //订单弹窗参数
          TOP: '',
          JUN: '',
          MID: '',
          ADC: '',
          SUP: '',
          ticket: '',
          member_at_times: '',
          times: '',
          roomID: '',
          price: '',
          type: ''
        },
        num: '',
        num2: '',
        isAll: 0, //0：继续请求接口 1：不再请求接口
        start_id: '',
        page:1,

        isRoomStop: true, //阻止恶意点击: 显示房间按钮
        isBattleStop: true, //阻止恶意点击: 显示阵容按钮
        repeatTemp:'', //变量时间
        repeatStatus: '' //变量tab
      }
    },
    deactivated(){
      this.busy1 = true;
    },
    methods: {
      parentLisen(evtValue) {
        //evtValue 是子组件传过来的值
        this.carShow = false;
      },
      parentLisen1(evtValue) {
        this.aquadRoom[this.num].room_list[this.num2].member_at_times = parseInt(this.aquadRoom[this.num].room_list[this.num2].member_at_times) + parseInt(evtValue);
      },
      toggleButton(element) {
        this.isAll = 0;
        this.arr1 = [];
        this.arr2 = [];
        this.page = 1;
        this.flag = 0;
        this.flag1 = 0;

        if (this.repeatStatus != element){
          this.repeatTemp = '';
          this.isBattleStop = true;
          this.isRoomStop = true;
          this.repeatStatus = element; //tab变量赋值
          this.loading = false;
          this.$store.commit('set', {
            key: 'isStopClick',
            val: true
          });
        }

        if (element == 0) {
          if(!this.stopRepeatClick() && this.isBattleStop == true && this.$store.state.isStopClick != false){
            this.show_type = 1;
            this.aquadRoom = [];
            this.loadMore();
          }else{
            this.isBattleStop = false;
            this.loading = true;
            return;
          }
        } else {
          if(!this.stopRepeatClick() && this.isRoomStop == true && this.$store.state.isStopClick != false){
            this.show_type = 2;
            this.aquadRoom = [];
            this.loadMore();
          }else{
            this.isRoomStop = false;
            this.loading = true;
            return false;
          }
        }
        this.bgRed = element
      },
      // 阻止恶意点击
      stopRepeatClick (){
        var t = t ? t * 1000 : 2000;//毫秒
        var time = new Date().getTime();
        if(!this.repeatTemp){
          this.repeatTemp = time;
          this.isBattleStop = true;
          this.isRoomStop = true;
          return false;//允许
        }else{
          var ts = t - (time - this.repeatTemp);
          ts = parseInt(ts/1000);
          if(ts > 0){
//            alert("频率限制：还有 <b>"+ ts +"</b> 秒才可以再执行！");
            return true;//禁止执行
          }else{
            this.repeatTemp = time;//更新时间
            this.isBattleStop = true;
            this.isRoomStop = true;
            return false;//允许
          }
        }
      },
      /* 阵容*/
      showSquad(index) {
        if (this.arr1[index] == 0) {
          this.$set(this.arr1, index, 1);

          if (this.arr1.length == 1) {
            this.flag = 1
          } else {
            for (var i = 0; i < this.arr1.length; i++) {
              if (this.arr1[i] == 1) {
                if (this.arr1[i] == this.arr1[i + 1]) {
                  this.flag = 1
                }
              }
            }
          }
        } else {
          this.$set(this.arr1, index, 0);
          if (this.arr1.length == 1) {
            this.flag = 0
          } else {
            for (var i = 0; i < this.arr1.length; i++) {
              if (this.arr1[i] == 1) {
                if (this.arr1[i] == this.arr1[i + 1]) {
                  this.flag = 1
                } else {
                  this.flag = 0
                }
              }
            }
          }
        }
      },
      showSquadList(){
        var index = this.arr1.length;
        if (this.flag == 0) {
          for (var i = 0; i <= index; i++) {
            this.$set(this.arr1, i, 1);
          }
          this.flag = 1
        } else {
          for (var i = 0; i <= index; i++) {
            this.$set(this.arr1, i, 0);
          }
          this.flag = 0
        }
      },
      /*房间*/
      showRoom(index){
        if (this.arr2[index] == 0) {
          this.$set(this.arr2, index, 1);
          if (this.arr2.length == 1) {
            this.flag1 = 1
          } else {
            for (var i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i] == 1) {
                if (this.arr2[i] == this.arr2[i + 1]) {
                  this.flag1 = 1
                }
              }
            }
          }
        } else {
          this.$set(this.arr2, index, 0);
          if (this.arr2.length == 1) {
            this.flag1 = 0
          } else {
            for (var i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i] == 1) {
                if (this.arr2[i] == this.arr2[i + 1]) {
                  this.flag1 = 1
                } else {
                  this.flag1 = 0
                }
              }
            }
          }
        }
      },
      showRoomdList(){
        var index = this.arr2.length;
        if (this.flag1 == 0) {
          for (var y = 0; y <= index; y++) {
            this.$set(this.arr2, y, 1);
          }
          this.flag1 = 1
        } else {
          for (var y = 0; y <= index; y++) {
            this.$set(this.arr2, y, 0);
          }
          this.flag1 = 0
        }
      },
      loadTop(){
        var _this = this;
        if (this.isAll == 0 ) {
          this.message = '加载中...';
          this.$api('/services/fantasy/get_member_room.php', {
            show_type: this.show_type,
            // start_id: this.start_id,
            page : this.page,
            status: 0,
            limit: 5,
            platform: 'h5'
          }).then(response => {
            if (response.code == 200) {
              // if(store.get('member_info').is_new_user == '1'){
              //   if (store.get('new_player').indexOf('mystart') < 0) {
              //     store.set('new_player', store.get('new_player') + 'mystart');
              //     this.$root.hub.$emit('new_player_go_Success', '3');
              //   }
              //   this.pushEvent(store.get('loginInfo').type, 'my', '0');
              // }

              _this.loading = true;
              if (response.data.list.length == 0) {
                _this.isAll = 1;
                _this.message = '暂无更多内容';
              } else {
                // if (response.data.list.length < 5) {
                //   _this.isAll = 1;
                //   _this.message = '暂无更多内容';
                // }
                // _this.start_id = response.data.list[response.data.list.length - 1].order_id;
                _this.page++
              }

              if (_this.show_type == 1) {
                var index = _this.arr1.length
                if (_this.flag == 1) {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr1[index + i] = 1;
                  }
                } else {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr1[index + i] = 0;
                  }
                }
              } else {
                var index = _this.arr2.length;
                if (_this.flag1 == 1) {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr2[index + i] = 1;
                  }
                } else {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr2[index + i] = 0;
                  }
                }

              }
              _this.aquadRoom = _this.aquadRoom.concat(response.data.list);
              _this.ticket = response.data.ticket;
            }
            _this.busy1 = false;
          });
        }

      },
      loadMore(){
        if (this.isAll == 0) {
          this.busy1 = true;
          setTimeout(() => {
            this.loadTop();
//            }
          }, 1000);
        }
      },
      addRoom(topId, junId, midId, adcId, supId, member_at_times, times, price, roomID, ticket, index, i, type, at_times, num){
        this.carList.TOP = topId;
        this.carList.JUN = junId;
        this.carList.MID = midId;
        this.carList.ADC = adcId;
        this.carList.SUP = supId;
        this.carList.price = price;
        this.carList.roomID = roomID;
        this.carList.member_at_times = member_at_times;
        this.carList.times = times;
        this.carList.ticket = ticket;
        this.num = index;
        this.num2 = i;
        this.carList.type = type;
        if (parseInt(at_times) == parseInt(num)) {
          layer.open({
            content: '参与房间已满'
            , btn: '关闭'
          });
        } else if (parseInt(member_at_times) == parseInt(times)) {
          layer.open({
            content: '参与次数已达上限'
            , btn: '关闭'
          });
        } else {
          this.carShow = true;
        }
      },
      linkCreat(roomID, name, orderId){
        sessionStorage.setItem('status', '0');
        this.$router.push({path: '/Roominfo', query: {roomID: roomID, orderId: orderId}});
      },
      dataStore(items, roomID, orderId){
        var cur_player = {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        };
        this.cur_player.TOP = items.top;
        this.cur_player.JUG = items.jun;
        this.cur_player.MID = items.mid;
        this.cur_player.ADC = items.adc;
        this.cur_player.SUP = items.sup;
        store.set('user', {cur_player: this.cur_player});
        this.$router.push({path: '/selected', query: {statued: '2', roomID: roomID, order_id: orderId}});
      },
      linkUrl(roomID, mermber_at_times, times, at_times, num){
        if (parseInt(at_times) == parseInt(num)) {
          layer.open({
            content: '参与房间已满'
            , btn: '关闭'
          });
        } else {
          if (parseInt(mermber_at_times) == parseInt(times)) {
            layer.open({
              content: '参与次数已达上限'
              , btn: '关闭'
            });
          } else {
            store.remove('user');
            this.$router.push({path: '/selected', query: {statued: '2', roomID: roomID}});
          }
        }
      }
    },
    created() {
      this.arr1 = []
    },
    mounted () {
//      this.loadMore();
    },
    components: {
      carShop,
      loading
    }
  }
</script>


<style lang="stylus" scoped>

  .top_border{
    border-top:1px solid #f2f1fb;
  }

  .room-type{
    width 76px;
    height 76px;
    border-radius:50%;
    display flex;
    justify-content center;
    align-items center;
    background #ffbb2a;
    color:#fff;
  }


  .nav-tab{
    margin-top:20px;
    display flex;
    justify-content:flex-start;
    align-items center;
    overflow-x auto;
    -webkit-overflow-scrolling:touch;

    span {
      display inline-block;
      flex-shrink:0;
      text-align center;
      width:168px;
      height:56px;
      line-height @height;

      color:#B2B0D2;
      font-size:22px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      background:rgba(255,255,255,1);
      box-shadow:0px 16px 12px -12px rgba(241,237,255,0.5);
      border-radius:12px;
    }
    span.active{
      background:rgba(83,72,255,1);
      box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
      border-radius:6px;
      color:#fff;
    }


    span.switch-btn{
      margin-left:28px;
      width:140px;
      display flex;
      justify-content space-between;
      align-items center;
      flex-grow: 1;


    }


    .show-all{
      flex-grow: 1;
      text-align: right;
      background none;

      span{
        font-size:22px;
        color:#5B579A;
        background none;
      }
      i.iconfont{
        font-size: 27px;
        color: #5451fb;
        display: inline-block;
        transition: all 0.3s;
      }
      i.iconfont.active{
        font-size: 27px;
        color: #5451fb;
        display: inline-block;
        transform: rotate(180deg);
      }
    }


  }
  .nav-tab::-webkit-scrollbar {
    display: none;
  }


  .room-list-box{
    /*height:268px;*/
    margin-bottom:28px;
    background:rgba(255,255,255,1);
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;
    overflow: hidden;

    .head{
      height:96px;
      color:#fff;
      background:rgba(83,72,255,1);
      box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
      border-radius:12px 12px 0 0;
      padding:0 10px;
      display flex;
      align-items center;

      img {
        width 75px;
        height 75px;
      }

      .title{
        flex-wrap:wrap;
        flex-grow:1;
        margin-left:20px;

        span{
          display block;
          width 370px;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .subtitle{
        width 190px;
        padding-right:10px;
        flex-wrap:wrap;
        justify-content flex-end;

        span{
          display block;
          text-align right;
          width 100%;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }

    }


    .content{
      padding:0 40px;
      display flex;
      justify-content space-between;
      align-items center;

      .item{
        width 140px;
        margin-top: 28px;
        flex-wrap wrap;


        span{
          display block;
          text-align center;
          width 100%;
          color:#5B579A;
          font-size:28px;
          margin-right:10px;
        }
        span.add-text{
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#5348FF;
          line-height:40px;
        }
        span:nth-child(1){
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          margin-top:4px;
          font-size:22px;
          color:#B2B0D2;
          margin-right:10px;
        }
      }
      .item:last-child{
        width:96px;
        height:auto;
        padding:10px;
        background:#F8F7FA;
        border-radius:12px;

        span:last-child{
          width:80px;
          height 24px;
          font-size:#FFFFFF;
          background:#5348FF;
          border-radius:6px;
          display: inline-flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 16px;
            color: #fff;
            font-weight: bold;
          }
        }


      }

    }


    .date{
      padding:28px 28px 12px 28px;
      display flex;
      justify-content space-between;
      align-items center;
      color:#B2B0D2;

      .time{
        display: flex;
        align-items: center;
      }

      i {
        margin-right:10px;
      }
      i.control{
        font-size: 27px;
        color: #5451fb;
        transition: all 0.3s;
      }
      i.control.active{
        font-size: 27px;
        color: #5451fb;
        display: inline-block;
        transform: rotate(180deg);
      }

      span{
        margin-left:10px;
      }
      .bk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#B5B1FF;
        border-radius:4px;
      }
      .rmk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#F4A7BE;
        border-radius:4px;
      }


    }


    .battle-array{
      width:100%;
      //height:342px;
      background:#fff;
      padding:10px 24px 0 24px;
      margin-top: 14px;

      .average-score{
        padding-top:14px;
        display flex;
        justify-content space-between;
        align-items center;


        i {
          margin-right:10px;
          font-weight bold;
        }
        i.control{
          font-size: 27px;
          color: #5451fb;
          transition: all 0.3s;
        }
        i.control.active{
          font-size: 27px;
          color: #5451fb;
          display: inline-block;
          transform: rotate(180deg);
        }

        span{
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#5B579A;
        }
        span:last-child{
          width:88px;
          height:40px;
          background:rgba(83,72,255,1);
          border-radius:12px;
          font-size:24px;
          color:#fff;
          display flex;
          justify-content center;
          align-items center;
        }

        .title{
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(91,87,154,1);
          line-height:34px;
        }

      }

      .team{
        //width:calc(100% / 5);
        margin-bottom:12px;
        display flex;
        justify-content space-between;

        .iconfont{
          font-size:24px;
        }

        .item{
          margin-top: 20px;
          width:calc(100% / 5 - 11px);

          div{
            display inline-flex;
            align-items center;
            justify-content: flex-start;
            font-size:20px;
            color:#B2B0D2;
          }

          .p-text{

          }

          .photo{
            margin-top:8px;
            height 144px;
            display flex;
            align-items flex-end;
            position relative;

            .bg{
              position absolute;
              z-index 1;
            }
            .avatar{
              position absolute;
              z-index 2;
              bottom:0px;

              img {
                width:120px;
                height:120px;
              }
            }
            .score{
              position absolute;
              z-index 2;
              top:0;right 0;
              color:#5B579A;
              font-weight bold;
              font-size:18px;
            }

            img {
              max-width:100%;
            }
          }
          div:nth-child(3){
            margin-top:8px;
            font-size:24px;
            color:#5B579A;
          }
          div:nth-child(4){
            margin-top:8px;
          }

          .player-text{
            display block;
            font-size:24px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:#5B579A;
            line-height:34px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .player-team-text{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#B2B0D2;
            line-height:28px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

        }


      }

    }

    .room{
      padding:20px 20px 0 20px;

      .date {
        padding: 28px 0 12px 0;
      }
      .time{
        display inline-flex;
        align-items center;
      }
    }

  }


  .room-type{
    width: 76px;
    height: 76px;
    border-radius: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background: #ffbb2a;
    color: #fff;
  }

  .data-null{
    text-align: center;
    color: #b2b0d2;
  }

</style>
