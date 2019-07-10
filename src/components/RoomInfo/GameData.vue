<template>
  <div title="阵容数据">
    <div style="padding:28px;margin-bottom:50px;">

      <!--未开始头部-->
      <!--倒计时时间-->
      <div class="end-time" v-if="data.status == 0">
        截止剩余时间
        <count-down @time-end="message = '倒计时结束'" :endTime='endTime'></count-down>
      </div>

      <!--进行中头部-->
      <div class="progress" v-else-if="data.status == 1">
        <v-runing :running='running'></v-runing>
        <div class="ranking">当前排名 <span><span>{{data.rank}}</span>/{{data.room_info.at_times}}</span></div>
      </div>

      <!--已结束头部-->
      <div class="game-end" v-else-if="data.status == 2">
        <span>阵容积分：{{data.total_score}}</span>
        <span>最终排名：<span class="font_orange">{{data.rank}}</span>/{{data.room_info.at_times}}</span>
      </div>


      <div v-for="(item,index) in playerList">

        <div class="battle-array-list-box" v-if="data.status == 0">
          <div class="icon-selected"><img src="../../assets/image/icon_right_top_selected@2x.png"></div>
          <div class="content">
            <div class="item avatar" @click="playerLink(item.playerID)">
              <img class="bg" :src="item.bg1 == '' ? pic_img[0] : item.bg1" alt="">
              <img class="photo" :src="item.player_image == '' ? pic_img[1] : item.player_image" width="120" height="120">
            </div>
            <div class="item" style="width:40px;" @click="playerLink(item.playerID)">
              <position-icon :position="item.position_short_name" width="40"></position-icon>
            </div>
            <div class="item team" style="width:240px;">
              <span>{{item.player_nickname}}1</span>
              <span v-for="(matchs,index) in item.match_info" v-if="index <= 1">vs {{matchs.vs_team}}</span>
              <p class="vs_more_than" v-if="item.match_info.length > 2">等<span>{{item.match_info.length}}</span>场</p>
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
              <span>${{item.value}}</span>
              <player-status :status="item.player_status"></player-status>
            </div>
          </div>
        </div>

        <div class="battle-array-list-box2" v-if="data.status == 1">
          <div class="content">
            <div class="item avatar" @click="playerLink(item.playerID)">
              <img class="bg" :src="item.bg1 == '' ? pic_img[0] : item.bg1" alt="">
              <img class="photo" :src="item.player_image == '' ? pic_img[1] : item.player_image" width="120" height="120">
            </div>
            <div class="item" style="width:40px;" @click="playerLink(item.playerID)">
              <position-icon :position="item.position_short_name" width="40"></position-icon>
            </div>
            <div class="item money" style="width:240px;">
              <span>{{item.player_nickname}}</span>
              <span>
                  <span>¥32</span>
                  <player-status :status="item.player_status"></player-status>
                </span>
            </div>
            <div class="item team" style="width:80px;">
                <span v-for="matchs in item.match_info">
                  <span class="title" v-html="matchs.vs_team">Snake</span>
                  <span v-html="matchs.score">未开始</span>
                </span>
            </div>

            <div class="item score" style="width:150px;" @click="show_list(index)">
              <span>{{item.r_score}}</span>
              <span>当前得分</span>
              <span><i class="iconfont control" :class="{'active':game_more[index]==true}">&#xe673;</i></span>
            </div>
          </div>
          <div class="more-data" v-show="game_more[index]==true">
            <div class="item"><span>击杀:</span><span>{{item.r_kills}}</span></div>
            <div class="item"><span>死亡:</span><span>{{item.r_deaths}}</span></div>
            <div class="item"><span>助攻:</span><span>{{item.r_assists}}</span></div>
            <div class="item"><span>分均伤害:</span><span>{{item.r_demage_dealt_m}}</span></div>
            <div class="item"><span>分均承伤:</span><span>{{item.r_demage_taken_m}}</span></div>
            <div class="item"><span>分均视野:</span><span>{{item.r_sight_m}}</span></div>
          </div>
        </div>

        <div class="battle-array-list-box2" v-if="data.status == 2">
          <div class="content">
            <div class="item avatar" @click="playerLink(item.playerID)">
              <img class="bg" :src="item.bg1 == '' ? pic_img[0] : item.bg1" alt="">
              <img class="photo" :src="item.player_image == '' ? pic_img[1] : item.player_image" width="120" height="120">
            </div>
            <div class="item" style="width:40px;" @click="playerLink(item.playerID)">
              <position-icon :position="item.position_short_name" width="40"></position-icon>
            </div>
            <div class="item money" style="width:240px;">
              <span>{{item.player_nickname}}</span>
              <span>
                  <span>¥32</span>
                  <player-status :status="item.player_status"></player-status>
                </span>
            </div>
            <div class="item team" style="width:80px;">
                <span v-for="matchs in item.match_info">
                  <span class="title" v-html="matchs.vs_team">Snake</span>
                  <span v-html="matchs.score">未开始</span>
                </span>
            </div>
            <div class="item score" style="width:150px;" @click="show_list(index)">
              <span>{{item.r_score}}</span>
              <span>最终得分</span>
              <span><i class="iconfont control" :class="{'active':game_more[index]==true}">&#xe673;</i></span>
            </div>
          </div>
          <div class="more-data" v-show="game_more[index]==true">
            <div class="item"><span>击杀:</span><span>{{item.r_kills}}</span></div>
            <div class="item"><span>死亡:</span><span>{{item.r_deaths}}</span></div>
            <div class="item"><span>助攻:</span><span>{{item.r_assists}}</span></div>
            <div class="item"><span>分均伤害:</span><span>{{item.r_demage_dealt_m}}</span></div>
            <div class="item"><span>分均承伤:</span><span>{{item.r_demage_taken_m}}</span></div>
            <div class="item"><span>分均视野:</span><span>{{item.r_sight_m}}</span></div>
          </div>
        </div>


      </div>

    </div>




    <!--未开始底部-->
    <div class="footer-button" v-if="data.status == 0">
      <div class="count">
        <span class="text">阵容平均分：{{data.player_avg_score}}</span>
        <span class="text">可用工资：
              <span><span class="c-rose-red">¥{{data.room_info.salary_cap - cur_value}}</span> (<span class="c-rose-red">¥39</span>/人)</span>
          </span>

      </div>
      <button class="button" @click="partNum(data.player_list[0].playerID,data.player_list[1].playerID,data.player_list[2].playerID,data.player_list[3].playerID,data.player_list[4].playerID,data.room_info.member_at_times,data.room_info.times,data.room_info.price,data.room_info.roomID,data.ticket,data.room_info.type)">已参加{{data.room_info.member_at_times}}/{{data.room_info.times}}</button>

      <button class="button active" @click="dataStore(playerList,data.roomID)">编辑阵容</button>
    </div>

  </div>
</template>

<script>
  import store from 'store'
  import LineDraw from '../../components/LineDraw.vue'
  import Countdown from '../../components/Countdown.vue'
  import vRuning from '../../components/RuningLine.vue';
  import carShop from '../../components/carShop.vue'
  export default {
    name: "GameData",
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
          if(store.get('new_player') && store.get('new_player').indexOf('/RoomInfo') < 0 && _this.data.status == '0'){
            store.set('new_player',store.get('new_player')+'/RoomInfo');
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

<style lang="stylus" scoped>
  .end-time{
    color:#5B579A;
    padding-bottom:20px;
    text-align center;
    font-size:22px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:32px;
  }
  .game-end{
    color:#5B579A;
    padding-bottom:20px;
    display flex;
    justify-content space-between;
  }
  .progress{
    width: calc(100% - 20px);
    padding:0 0 30px 40px;
    position: relative;
  }

  .ranking{
    margin-top:30px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(178,176,210,1);
    line-height:32px;
    display flex;
    align-items center;
    justify-content center;

    span{
      font-size:28px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#B2B0D2;
      line-height:40px;
      padding-left:10px;

      span{
        color:#5348FF;
      }
    }
  }


  .battle-array-list-box2{
    min-height:120px;
    margin-bottom:28px;
    border-radius:12px;
    overflow: hidden;
    background:#fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);

    .content{
      height:120px;




      display flex;
      align-items center;
      justify-content flex-start;


      .item{
        display flex;
        align-items center;
        flex-wrap wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span{
          width 100%;
          display block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size:18px;
        }
        span.title{
          font-weight bold;
          color: #5B579A;
          font-size:20px;
        }


        .icon{
          width 34px;
          height 34px;
        }
      }


      .avatar{
        width 160px;
        height 100%;
        position relative;
        flex-shrink:0;

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
        width 190px;
        padding:0 10px 0 20px;
        white-space: nowrap;

        span:first-child{
          width 100%;
          font-weight bold;
          color:#5B579A;
          font-size:28px;
          overflow : hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all; /* 追加这一行代码 */
        }

        span {
          width 100%;
          display block;

          span:first-child{
            display block;
            font-weight bold;
            font-size:24px;
            color:#EF1B5A;
          }
          span.icon-label{
            width:56px;
            height:28px;
            background:#5348FF;
            border-radius:6px;
            font-size:16px;
            color:#fff;
            display inline-flex;
            justify-content center;
            align-items center;
          }
          span.icon-label.tb{
            color: #fff;
            background: gray;
          }
          span.icon-label.inactive{
            color: #fff;
            background: #FFB310;
          }

        }

      }



      .team{
        color:#5B579A;
        font-size:20px;
        font-weight bold;

        span:last-child{
          font-size:18px;
          color:#B2B0D2;
          font-weight normal;
        }

      }


      .score{
        text-align center;
        color:#B2B0D2;
        font-size:18px;

        span:first-child{
          font-size:24px;
          color:#5348FF;
          font-weight bold;
        }
        span:last-child{

          .control{
            font-size: 27px;
            color: #5451fb;
            transition: all 0.3s;
          }

          i {
            font-size: 27px;
            color: #5451fb;
            display: inline-block;
            transition: all 0.3s;
          }
          i.active{
            font-size: 27px;
            color: #5451fb;
            display: inline-block;
            transform: rotate(180deg);
            transition: all 0.3s;
          }
        }
      }


    }


    .more-data{
      height 100px;
      padding:18px 28px;
      background #fff;
      border:1px solid #f4f3fc;

      display flex;
      justify-content space-between;
      align-items center;
      flex-wrap:wrap;

      .item{
        display block;
        text-align center;
        width:calc(100% / 3);
        color:#5B579A;

        span:last-child{
          margin-left:6px;
          font-size:22px;
          font-weight bold;
          color:#5348FF;
        }
      }


    }

  }



  .battle-array-list-box{
    min-height: 120px;
    margin-bottom: 28px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    position:relative;
    border:transparent;

    .icon-selected{
      position:absolute;
      top:-4px;right:-4px;
      display none;
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
          width: 120px;
          height: 120px;
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
        padding: 0 10px 0 20px;
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
        position relative;

        span{
          font-size:20px;
          color:#5B579A;
          font-weight bold;
        }

        .chart{
          width 120px;
          height 90px;
          margin:0 auto;

          img {
            width 100%;
          }
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
    padding: 34px 48px;
    display flex;
    justify-content space-between;
    align-items center;
    background #fff;
    position fixed;
    bottom 0;
    width 100%;
    z-index:10;

    .count{
      width:300px;
      color:#5B579A;
      font-size:24px;
      font-weight bold;

      .text {
        display block;
        width 100%;

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
