<template>
  <div class="game_data">
    <!--未开始头部-->
    <div class="match_header_top game_start_top" v-if="data.status == 0">
      <h1 class="match_time">
        <p class="match_p">距截止时间：</p>
        <count-down @time-end="message = '倒计时结束'" :endTime='endTime'></count-down>
      </h1>
    </div>
    <!--进行中头部-->
    <div class="integral-ranking" v-else-if="data.status == 1">
      <div class="integral-ranking-titlt">
        <ul class="cl">
          <li>当前排名: <span class="font_orange">{{data.rank}}</span>/{{data.room_info.at_times}}</li>
        </ul>
      </div>
      <div class="integral-ranking-runing">
        <v-runing :running='running'></v-runing>
      </div>
    </div>
    <!--已结束头部-->
    <h3 class="game_end_top cl" v-else-if="data.status == 2">
      <span class="fll">阵容积分：{{data.total_score}}</span>
      <span class="flr">最终排名：<span class="font_orange">{{data.rank}}</span>/{{data.room_info.at_times}}</span>
    </h3>
    <!--选中选手列表-->
    <div class="" v-for="(item,index) in playerList">
      <div class="table" v-if="data.status == 0">
        <div class="table-td" style="width:172px;" @click="playerLink(item.playerID)">
          <div class="choose_team_avatar">
            <img class="choose_team_logo" :src="item.bg1 == '' ? pic_img[0] : item.bg1">
            <img class="avatar" :src="item.player_image == '' ? pic_img[1] : item.player_image">
          </div>
        </div>
        <div class="table-td vs_more_father" @click="playerLink(item.playerID)">
          <div class="choose_team_dec ">
            <p class="font_black">
              <svg aria-hidden="true" class="icon fll">
                <use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[item.position_short_name]"></use>
              </svg>
              {{item.player_nickname}}
            </p>
            <p v-for="(matchs,index) in item.match_info" v-if="index <= 1">VS {{matchs.vs_team}}</p>
            <p class="vs_more_than" v-if="item.match_info.length > 2">等<span>{{item.match_info.length}}</span>场</p>
          </div>
        </div>
        <div class="table-td" style="width: 150px;">
          <div class="choose_sraw_line">
            <draw-line
              :score-list="item.score_list == '' ? score_list : item.score_list"
              :id="'chat-'+item.playerID"
              :socre-average="item.score"
            ></draw-line>
            <p>平均分：{{item.score}}</p>
          </div>
        </div>
        <div class="table-td" style="width:200px;">
          <p class="font_gold">${{item.value}}</p>
          <p><span v-if="item.player_status==1" class="choose_zhuli">主力</span><span v-else-if="item.player_status==2"
                                                                                    class="choose_tibu">替补</span><span
            v-else-if="item.player_status==4" class="choose_inactive">不活跃</span></p>
        </div>
      </div>
      <div class="table" v-else-if="data.status == 1">
        <div class="table-td" style="width:172px;" @click="playerLink(item.playerID)">
          <div class="choose_team_avatar">
            <img class="choose_team_logo" :src="item.bg1 == '' ? pic_img[0] : item.bg1">
            <img class="avatar" :src="item.player_image == '' ? pic_img[1] : item.player_image">
          </div>
        </div>
        <div class="table-td" style="width: 228px;" @click="playerLink(item.playerID)">
          <div class="game_data_name">
            <svg aria-hidden="true" class="icon">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[item.position_short_name]"></use>
            </svg>
            <div class="game_data_name_main">
              <h3>{{item.player_nickname}}</h3>
              <p class="font_gold"><span class="fontGold">${{item.value}}</span><span v-if="item.player_status==1"
                                                                                      class="choose_zhuli">主力</span><span
                v-else-if="item.player_status==2" class="choose_tibu">替补</span><span v-else-if="item.player_status==4"
                                                                                     class="choose_inactive">不活跃</span>
              </p>
            </div>
          </div>
        </div>
        <div class="table-td" style="width: 100px;" v-for="matchs in item.match_info">
          <div class="game_data_info">
            <p>{{matchs.vs_team}}</p>
            <p>{{matchs.score}}</p>
          </div>
        </div>
        <div class="table-td" style="width:150px;">
          <div class="game_data_btn" @click="show_list(index)">
            <p class="font_black">当前得分</p>
            <h3 class="font_blue">{{item.r_score}}</h3>
            <p><i class="iconfont icon-icon_jiantouxiangshang-" v-if="game_more[index]==true"></i><i
              class="iconfont icon-icon_jiantouxiangxia-" v-else=""></i></p>
          </div>
        </div>
      </div>
      <div class="table" v-else-if="data.status == 2">
        <div class="table-td" style="width:172px;" @click="playerLink(item.playerID)">
          <div class="choose_team_avatar">
            <img class="choose_team_logo" :src="item.bg1 == '' ? pic_img[0] : item.bg1">
            <img class="avatar" :src="item.player_image == '' ? pic_img[1] : item.player_image">
          </div>
        </div>
        <div class="table-td" style="width: 228px;" @click="playerLink(item.playerID)">
          <div class="game_data_name">
            <svg aria-hidden="true" class="icon">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[item.position_short_name]"></use>
            </svg>
            <div class="game_data_name_main">
              <h3>{{item.player_nickname}}</h3>
              <p class="font_gold"><span class="fontGold">${{item.value}}</span><span v-if="item.player_status==1"
                                                                                      class="choose_zhuli">主力</span><span
                v-else-if="item.player_status==2" class="choose_tibu">替补</span><span v-else-if="item.player_status==4"
                                                                                     class="choose_inactive">不活跃</span>
              </p>
            </div>
          </div>
        </div>
        <div class="table-td" style="width: 100px;" v-for="matchs in item.match_info">
          <div class="game_data_info">
            <p>{{matchs.vs_team}}</p>
            <p>{{matchs.score}}</p>
          </div>
        </div>
        <div class="table-td" style="width:150px;">
          <div class="game_data_btn" @click="show_list(index)">
            <p class="font_black">最终得分</p>
            <h3 class="font_orange">{{item.r_score}}</h3>
            <p><i class="iconfont icon-icon_jiantouxiangshang-" v-if="game_more[index]==true"></i><i
              class="iconfont icon-icon_jiantouxiangxia-" v-else=""></i></p>
          </div>
        </div>
      </div>

      <!--开始后更多数据-->
      <ul class="game_data_more cl" v-show="game_more[index]==true">
        <li><span>击杀</span><span class="font_blue">{{item.r_kills}}</span></li>
        <li><span>死亡</span><span class="font_blue">{{item.r_deaths}}</span></li>
        <li><span>助攻</span><span class="font_blue">{{item.r_assists}}</span></li>
        <li><span>分均伤害</span><span class="font_blue">{{item.r_demage_dealt_m}}</span></li>
        <li><span>分均承伤</span><span class="font_blue">{{item.r_demage_taken_m}}</span></li>
        <li><span>分均视野</span><span class="font_blue">{{item.r_sight_m}}</span></li>
      </ul>
    </div>
    <!--未开始底部-->
    <div class="fixed_bottom" v-if="data.status == 0">
      <div class="choose_footer_base fll">
        <p>阵容平均分:{{data.player_avg_score}}</p>
        <p>剩余工资:<span class="font_gold">${{data.room_info.salary_cap - cur_value}}</span></p>
      </div>
      <p class="bottom_button mpm_btn active flr" @click="dataStore(playerList,data.roomID)">编辑阵容</p>
      <p
        @click="partNum(data.player_list[0].playerID,data.player_list[1].playerID,data.player_list[2].playerID,data.player_list[3].playerID,data.player_list[4].playerID,data.room_info.member_at_times,data.room_info.times,data.room_info.price,data.room_info.roomID,data.ticket,data.room_info.type)"
        class="bottom_button mpm_btn flr">已参加{{data.room_info.member_at_times}}/{{data.room_info.times}}</p>
    </div>
    <carShop v-show="carShow" @newNodeEvent="parentLisen" @newNodeEvent1="parentLisen1" :carList="carList"></carShop>
  </div>

</template>
<script>
  import store from 'store'
  import LineDraw from '../components/line-draw.vue'
  import Countdown from '../components/Countdown.vue'
  import vRuning from '../components/running.vue';
  import carShop from '../components/carShop.vue'
  export default {
    name: 'game_data',
    data () {
      return {
        data: '',
        carShow: false,
        carList: {
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
        cur_player: {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        score_list: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        pic_img: ['static/images/avater_default_1.png', 'static/images/avater_default_2.png', 'static/images/unknow_2.png'],
        playerList: [],
        game_more: [],
        leval,
        cur_value: 0,
        running: {
          total_score: 0,
          pass_score: 0,
          max_score: 0
        },
        endTime: ''
      }
    },
    components: {
      drawLine: LineDraw,
      countDown: Countdown,
      carShop,
      vRuning
    },
    watch: {
      '$route.query.roomID': 'player_list'
    },
    created(){
      this.player_list();
    },
    methods: {
      parentLisen(evtValue) {
        //evtValue 是子组件传过来的值
        this.carShow = false;
      },
      parentLisen1(evtValue) {
        this.data.room_info.member_at_times = parseInt(this.data.room_info.member_at_times) + parseInt(evtValue);
      },
      partNum(topId, junId, midId, adcId, supId, member_at_times, times, price, roomID, ticket, type){
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
        this.carList.type = type;
//        console.log(this.carList)
        if (parseInt(member_at_times) == parseInt(times)) {
          layer.open({
            content: '参与次数已达上限'
            , btn: '关闭'
          });
        } else {
          this.carShow = true;
        }
      },
      playerLink(playerID){
        this.$router.push({path: 'dataPlayer', query: {playerID: playerID}});
      },
      player_list() {
        var _this = this;
        this.$api('/services/fantasy/team_data.php', {
          order_id: this.$route.query.orderId
        }).then(response => {
          if (response.code == 200) {

            if (response.data.room_info.secret_key != 0) {
              _this.$emit('statusChange', {
                title: response.data.room_info.name,
                status: response.data.status,
                secret_key: response.data.room_info.secret_key
              });
            } else {
              _this.$emit('statusChange', {
                title: response.data.room_info.name,
                status: response.data.status,
              });
            }

          }
          _this.playerList = response.data.player_list;
          _this.data = response.data;
	        var member_info = store.get('member_info');
	        _this.data.ticket = member_info.ticketCount;
          if(store.get('new_player').indexOf('/Roominfo') < 0 && _this.data.status == '0'){
            store.set('new_player',store.get('new_player')+'/Roominfo');
            this.$root.hub.$emit('new_player_go_Success','1');
          }
          _this.endTime = _this.data.at_end_time;
          for (var i = 0; i < _this.playerList.length; i++) {
            _this.cur_value = _this.cur_value + parseInt(_this.playerList[i].value)
          }

          _this.running.total_score = _this.data.total_score;
          _this.running.pass_score = _this.data.room_info.pass_score;
          _this.running.max_score = _this.data.room_info.max_score
          // console.log(_this.running.pass_score);
        })
      },
      show_list(index){
        if (this.game_more[index] == true) {
          this.$set(this.game_more, index, false)
        } else {
          this.$set(this.game_more, index, true)
        }
      },
      dataStore(items, roomID){
        //console.log(roomID)
        var cur_player = {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        };
        this.cur_player.TOP = items[0];
        this.cur_player.JUG = items[1];
        this.cur_player.MID = items[2];
        this.cur_player.ADC = items[3];
        this.cur_player.SUP = items[4];
        store.set('user', {cur_player: this.cur_player});
        store.remove('group');
        this.$router.push({
          path: '/selected',
          query: {statued: '2', roomID: roomID, order_id: this.$route.query.orderId}
        });
      }
    }

  }
</script>
<style>
  .vs_more_father {
    position: relative;
  }

  .game_data .vs_more_father .vs_more_than {
    position: absolute;
    right: 30px;
    bottom: 30px;
    font-size: 16px;
    color: #999;
  }

  .vs_more_than span {
    color: #0C9DFC;
    font-size: 16px;
    margin: 0 3px;
  }

  .game_data .integral-ranking {
    background: #f5f5f5;
    height: 220px;
  }

  .game_data .integral-ranking-titlt {
    height: 63px;
    line-height: 63px;
  }

  .game_data .integral-ranking-titlt ul li {
    float: right;
    height: 63px;
    line-height: 63px;
    font-size: 22px;
    padding-right: 30px;
  }

  .game_data .integral-ranking-runing {
    padding-top: 60px;
    width: 620px;
    margin: 0 auto;

  }

  .game_data .table {
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .game_data_main {
  }

  .game_data_more {
    display: block;
    width: 100%;
    padding: 16px 0;
  }

  .game_data_more li {
    display: block;
    width: 250px;
    line-height: 40px;
    padding-left: 20px;
    float: left;
  }

  .game_data_more li span {
    display: inline-block;
    width: 48%;
    text-align: right;
  }

  .game_data_more li span.font_blue {
    text-align: left;
    float: right;
  }

  .game_start_top {
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.04);
    position: relative;
    z-index: 2;
    padding: 30px 0;
  }

  .game_start_top p {
    color: #373a41;
  }

  .game_start_top .match_time {
    height: 120px;
    padding-bottom: 0;
  }

  .game_end_top {
    line-height: 70px;
    font-weight: normal;
    color: #373a41;
    padding: 0 25px;
  }

  .game_data {
    padding-bottom: 140px;
  }

  .game_data_name {
    text-align: left;
  }

  .game_data_name .icon {
    width: 36px;
    height: 36px;
    margin: 18px 12px 0 0;
    float: left;
  }

  .game_data_name_main h3 {
    width: 145px;
    height: 44px;
    line-height: 44px;
    font-size: 30px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .game_data_name_main p {
  }

  .game_data_name_main .fontGold {
    font-size: 28px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
    vertical-align: middle;
  }

  .game_data_info {
    font-size: 18px;
  }

  .game_data_btn {
    width: 104px;
    text-align: center;
    border: 1px solid #e9e9e9;
    padding: 10px 0 4px 0;
    margin: 0 auto;
  }

  .game_data_btn p {
    font-size: 18px;
  }

  .game_data_btn p i {
    color: #0C9DFC;
  }

  .game_data_btn h3 {
    line-height: 32px;
    font-size: 30px;
    padding-top: 4px;
  }

  .game_data .table p.font_gold {
    font-size: 28px;
  }

  .game_data .choose_team_dec p:first-Child {
    font-size: 28px;
    width: 164px;
  }

  .game_data .choose_team_dec p svg {
    margin-top: 6px;
    margin-right: 4px;
  }

  .game_data .choose_team_dec p.font_black {
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .game_data .choose_team_dec p {
    font-size: 18px;
  }

  .game_data .choose_team_dec {
    width: auto;
  }

  .game_data .choose_team_avatar {
    min-height: 135px;
    width: 172px;
  }

  .game_data .choose_team_logo {
    height: 135px;
  }

  .game_data .choose_team_avatar .avatar {
    width: 135px;
    height: 135px;
  }
</style>
