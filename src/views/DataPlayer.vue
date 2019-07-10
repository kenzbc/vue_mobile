<template>
	<div class="data_player anim-opacity2" v-cloak >
		<div class="player_team_info" v-if="playerData != ''">
      <div class="head-nav">
        <head-top
          :head-title="hTitle"
          go-back="true"
        ></head-top>
      </div>



      <div class="battle-array-list-box">
        <div class="content">
          <div class="item avatar">
            <img class="bg" :src="playerData.bg1 == '' ? pic_img[0] : playerData.bg1" width="204" height="160">
            <img class="photo" :src="playerData.player_image == '' ? pic_img[1] : playerData.player_image" width="160" height="160">
          </div>
          <div class="item team">
            <span>{{playerData.player_nickname}}</span>
            <span class="position"><position-icon :position="playerData.position_short_name" width="40" height="40"></position-icon></span>
            <span class="player-status"><player-status :status="playerData.player_status"></player-status></span>

          </div>
          <div class="item line"><img src="static/images/slash@2x.png"></div>
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
            <t-circle :percent="win_rate" :size="175" stroke-color="#5348FF" trail-color="#c5c1ff" :trail-width="10" :stroke-width="10">
              <span style="font-size:36px;color:#5B579A;font-family:PingFangSC-Semibold;font-weight:600;">{{win_rate}}%</span>
              <span style="font-size:24px;color:#B2B0D2;font-family:PingFangSC-Semibold;font-weight:600;">胜率</span>
            </t-circle>
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


		</div>

		<player-data-table :match-list="playerData.match_list"></player-data-table>
	</div>
</template>

<script>

import axios from 'axios'
import HeadTop from '../components/header.vue'
import CssCircle from '../components/css-circle.vue'
import ScrollTable from '../components/scroll-table.vue'
import PlayerDataTable from '../components/PlayerDataTable.vue';
import TCircle from '../components/Circle';


export default {
	name: 'dataplayer',
	data () {
		return {
      win_rate:0,
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
            _this.isRender = true;

            _this.win_rate = Number(_this.playerData.win_rate.replace('%',''))/100;

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
            _this.isRender = true;

            _this.win_rate = Number(_this.playerData.win_rate.replace('%',''));

          })
          .catch(function (error) {
            layer.open({
              content: error
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
    PlayerDataTable:PlayerDataTable,
    tCircle:TCircle
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


  .player_team_info{
    width: 100%;
    top:0px;
    z-index:3;
  }








  .head-nav{
    position: fixed;
    z-index:50;
    left:0;
    right:0;
    top:0;
  }


  .battle-array-list-box{
    min-height:160px;
    overflow: hidden;
    background:#fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    position: fixed;
    z-index:50;
    left:0;
    right:0;
    top:90px;

    .content{
      height:160px;
      display flex;
      align-items center;


      .item{
        flex-shrink:0;
        span{
          //width 100%;
          //display block;
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
        width 200px;
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



      .team{
        width:250px;
        color:#5B579A;
        font-size:40px;
        position relative;

        .position{
          display inline-block;
          margin-left:44px;
        }
        .player-status{
          position absolute;
          top:64px;
          left:94px;
        }


        span:first-child{
          font-size:40px;
          color:#5B579A;
          width: 200px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:56px;
          margin-left: 48px;

          display block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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



      .money{
        width 100px;
        padding-left:20px;
        font-weight bold;

        span{
          display block;
        }

        span:first-child{
          color:#EF1B5A;
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:last-child{
          color:#B2B0D2;
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:34px;
        }
      }




      .score{
        width 100px;

        span{
          display block;
          text-align right;
        }
        span:first-child{
          font-size:28px;
          color:#5B579A;
          font-weight bold;
        }
        span:last-child{
          color:#B2B0D2;
          font-weight bold;
          font-size:24px;
          margin-top: 6px;
        }
      }


    }


  }


  .score-dash-board{
    margin-top:250px;
    display flex;
    justify-content center;
    align-content center;
    flex-wrap:wrap;
    padding:36px 28px;
    height 480px;
    //background: linear-gradient(-45deg, #f8f7fa 25%, #f5f2fa 0, #f5f2fa 50%, #f8f7fa 0, #f8f7fa 75%, #f5f2fa 0);
    //background-size: 30px 30px;
    background url("../assets/image/player_detail_bg@2x.png");


    .item{
      margin:0 70px;

      span {
        display block;
        width: 100%;
        color:#5B579A;
        text-align: center;
        font-size:24px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:34px;
      }
      span.text{
        //padding-top:30px;
      }
      .charts{
        padding-top:14px;
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
        top: 15px;
        width: 160px;
        height: 180px;
        padding-top: 55px;
        margin-bottom: 20px;
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
          color:#B2B0D2;
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:34px;
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
    .t-head{
      color:#fff;
      font-size:22px;
      background: #5348FF;
      height 52px;
      padding:0 28px;
      display flex;
      justify-content flex-start;
      align-items center;

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
