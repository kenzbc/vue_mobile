<template>
  <div class="main">
    <head-top
      :head-title="hTitle"
      go-back="true"
    ></head-top>

    <div class="battle-array-list-box">
      <div class="content">
        <div class="item avatar">
          <img class="bg" :src="playerData.bg1 == '' ? pic_img[0] : playerData.bg1">
          <img class="photo" :src= "playerData.player_image == '' ? pic_img[1] : playerData.player_image">
        </div>
        <div class="item team">
          <span>{{playerData.player_nickname}}</span>
          <position-Icon :position="playerData.position_short_name" width="40"></position-Icon>

          <span v-if="playerData.player_status==1"  class="icon-label">主力</span>
          <span v-else-if="playerData.player_status==2" class="icon-label">替补</span>
          <span v-else-if="playerData.player_status==4" class="icon-label">不活跃</span>
        </div>
        <div class="item line">/</div>
        <div class="item money">
          <span>¥{{playerData.player_value}}</span>
          <span>身价</span>
        </div>
        <div class="item score">
          <span>{{playerData.score}}</span>
          <span>平均分</span>
        </div>
      </div>
    </div>

    <div class="score-dash-board">
      <div class="item">
        <span class="charts">
         <circle-css color="#5348FF" v-if="isRender"
                     width="200"
                     height="200"
                     font-size=28
                     :score="playerData.win_rate"
                     text="胜率"
         ></circle-css>
        </span>
        <span class="text">{{playerData.total_win == '' ? '-' : playerData.total_win}}W/{{playerData.total_los == '' ? '-' : playerData.total_los}}L</span>
      </div>
      <div class="item">
        <span class="hexagon">
          <span>{{playerData.kda}}</span>
          <span>KDA</span>
        </span>
        <span class="text">{{playerData.kills}}/{{playerData.deaths}}/{{playerData.assists}}</span>
      </div>
      <div class="chart-info">
        <div class="item">
          <span>击杀</span>
          <span>{{playerData.kills}}</span>
        </div>
        <div class="item">
          <span>分均伤害</span>
          <span>{{playerData.dealt}}</span>
        </div>
        <div class="item">
          <span>死亡</span>
          <span>{{playerData.deaths}}</span>
        </div>
        <div class="item">
          <span>分均承伤</span>
          <span>{{playerData.taken}}</span>
        </div>
        <div class="item">
          <span>助攻</span>
          <span>{{playerData.assists}}</span>
        </div>
        <div class="item">
          <span>分均视野</span>
          <span>{{playerData.wards}}</span>
        </div>
      </div>
    </div>

    <div class="data-table">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th align="left">日期</th>
            <th>比赛</th>
            <th>场次</th>
            <th>表现分</th>
            <th>击杀</th>
            <th>死亡</th>
            <th>助攻</th>
            <th>分均伤害</th>
            <th>分均承伤</th>
            <th>分均视野</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in playerData.match_list">
            <td align="left" width="320">{{item.start_time | formatDate}}</td>
            <td>{{item.match}}</td>
            <td>{{item.bo}}</td>
            <td>{{item.score}}</td>
            <td>{{item.kills}}</td>
            <td>{{item.deaths}}</td>
            <td>{{item.assists}}</td>
            <td>{{item.totalDamageDealtToChampions}}</td>
            <td>{{item.totalDamageTaken}}</td>
            <td>{{item.wards}}</td>
          </tr>
        </tbody>
      </table>


    </div>







  </div>
</template>

<script>

  import axios from 'axios'
  import HeadTop from '../components/header.vue'
  import CssCircle from '../components/Circle.vue'
  import ScrollTable from '../components/scroll-table.vue'
  import PositionIcon from '../components/PositionIcon.vue'

  export default {
    name: 'dataplayer',
    data () {
      return {
        default_avatar:'',
        playerData:{},
        hTitle:'',
        playerId:'',
        pic_img: ['static/images/avater_default_1.png', 'static/images/avater_default_2.png', 'static/images/unknow_2.png'],
        isRender:false
      }
    },
    created:function(){
      this.getThisData();
    },
    mounted(){

      drawCircle({
        id: 'two',
        angle: playerData.win_rate.replace("%","")/100,
        color: '#5348FF',
        lineWidth:20
      });

    },
    methods:{
      getThisData:function(){
        var curHref = window.location.href;
        var playerId = this.$route.query.playerID;
        this.playerId = playerId;
        var _this = this;
        if(this.lflmain() == 'http://mpm.lfl.gg'){
          //线上 + 阿里
          axios.get('https://img1.famulei.com/player/'+ this.playerId +'.json')
            .then(function (response) {
              _this.playerData = response.data;
              _this.hTitle = '[' + _this.playerData.position_name + '] ' + _this.playerData.player_nickname ;
              _this.isRender = true
            })
            .catch(function (error) {
              layer.open({
                content: error.data.message
                ,btn: '关闭'
              });
            })
        }else{
          //其他
          axios.get('https://img1.famulei.com/player/'+ this.playerId +'.json')
            .then(function (response) {
              _this.playerData = response.data;
              _this.hTitle = '[' + _this.playerData.position_name + '] ' + _this.playerData.player_nickname ;
              _this.isRender = true
            })
            .catch(function (error) {
              layer.open({
                content: error.data.message
                ,btn: '关闭'
              });
            })
        }
      },

    },
    components: {
      circleCss: CssCircle,
      scrollTable: ScrollTable,
      headTop:HeadTop,
      positionIcon:PositionIcon,
    },
    watch:{
      '$route' () {
        this.getThisData()
      }
    }
  }

</script>




<style lang="stylus" scoped>
  * {
    font-size: inherit;
  }


  .c-blue{
    color:#5348FF;
  }
  .c-light-blue{
    color:#B2B0D2;
  }

  .main{

  }




  .battle-array-list-box{
    min-height:120px;
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

      .line{
        padding-right:30px;
        color:#F8F7FA;
        font-size:42px;
      }

      .avatar{
        width 220px;
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
        padding-left:20px;
        padding-right:60px;
        font-weight bold;

        span:first-child{
          font-size:24px;
          color:#EF1B5A;
        }
        span:last-child{
          color:#B2B0D2;
          font-size:24px;
        }
      }



      .team{
        color:#5B579A;
        font-size:20px;
        font-weight bold;

        span:first-child{
          font-size:40px;
          color:#5B579A;
          font-weight normal;
        }

        .icon-label{
          width:56px;
          height:28px;
          background:#5348FF;
          border-radius:6px;
          font-size:16px;
          margin-left:10px;
          color:#fff;
          display inline-flex;
          justify-content center;
          align-items center;
        }

      }


      .score{

        span:first-child{
          font-size:28px;
          color:#5B579A;
          font-weight bold;
        }
        span:last-child{
          color:#B2B0D2;
          font-weight bold;
          font-size:24px;

        }
      }


    }


  }


  .score-dash-board{
    display flex;
    justify-content center;
    align-content center;
    flex-wrap:wrap;
    padding:36px 28px;
    height 480px;
    background: linear-gradient(-45deg, #f8f7fa 25%, #f5f2fa 0, #f5f2fa 50%, #f8f7fa 0, #f8f7fa 75%, #f5f2fa 0);
    background-size: 30px 30px;


    .item{
      margin:0 70px;

      span {
        display block;
        width: 100%;
        font-size:24px;
        color:#5B579A;
        text-align: center;
      }
      span.text{
        //padding-top:30px;
      }
      .charts{
        width 200px;
        height 200px;
        position relative;

        .chart{
          font-size: 24px;
          color: #b2b0d2;
          padding-top: 10px;
          position: absolute;
          top: 100px
        }
      }


      .hexagon {
        top: 25px;
        width: 140px;
        height: 160px;
        padding-top: 43px;
        margin-bottom: 40px;
        background: #ccc8ff;
        position: relative;
        background url("../assets/image/kda-bg@3x.png") no-repeat center;
        background-size cover;

        span:first-child{
          height auto;
          display block;
          font-size:36px;
          color:#5B579A;
        }
        span:last-child{
          height auto;
          font-size:24px;
          color:#B2B0D2;
        }
      }




    }


    .chart-info{
      width:100%;
      margin-top:29px;
      display flex;
      justify-content space-between;
      align-items center;
      flex-wrap:wrap;

      .item{
        margin:0;
        width:calc(100% / 2 - 5px);
        height:48px;
        padding:0 20px;
        margin-bottom:10px;
        background:#fff;
        display flex;
        justify-content space-between;
        align-items center;

        span{
          width auto;
          font-size:24px;
        }
        span:first-child{
          color:#B2B0D2;
        }
        span:last-child{
          color:#5B579A;
        }
      }
    }
  }

  .data-table{
    overflow-y:auto;
    -webkit-overflow-scrolling:touch;

    table{
      width:1250px;
      collapse 0;
    }
    th {
      height 52px;
      background #5348FF;
      color:#fff;
      width:200px;
    }
    th:first-child {
      padding-left:14px;
    }
    td{
      text-align center;
      height:60px;
      color:#5B579A;
    }

    .t-head{
      color:#fff;
      font-size:22px;
      background: #5348FF;
      height 52px;
      padding:0 28px;
      display flex;
      justify-content flex-start;
      align-items center;
      overflow-y auto;
      flex-shrink 1;

      span:nth-child(1){
        width:235px;
      }
      span:nth-child(2){
        width:160px;
      }
      span:nth-child(3){
        width:120px;
      }
      span:nth-child(4){
        width:120px;
      }
    }

    .t-list{
      height 60px;
      padding:0 28px;
      display flex;
      justify-content flex-start;
      align-items center;
      font-size:20px;
      color:#5B579A;

      span:nth-child(1){
        width:230px;
      }
      span:nth-child(2){
        width:165px;
      }
      span:nth-child(3){
        width:120px;
      }
      span:nth-child(4){
        width:130px;
      }
    }
    .t-list:nth-child(odd){
      background:#fcfcfc;
    }
  }



</style>
