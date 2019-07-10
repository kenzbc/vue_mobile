<template>
  <div data-title="比赛列表">
    <div>&nbsp;</div>
    <div class="play-by-play" v-for="items in matchData">
      <div class="title">
        <img :src="items.tournament_image_thumb" width="28" height="28">&nbsp;&nbsp;
        <div class="subtitle">{{items.tournament_short_name}} {{items.round_name}} {{items.round_son_name}}</div>
        <i style="display:none" class="iconfont active">&#xe673;</i>
      </div>
      <div class="players">
        <div class="item">
          <img :src="items.team_a_image" width="96" height="96" alt="">
          <span>{{items.team_a_short_name}}</span>
        </div>
        <div class="item vs">
          <span><img src="../../assets/image/VS@2x.png" ></span>
          <div style="display:none;" des="比分临时删除">{{items.team_a_win}} : {{items.team_b_win}}</div>
          <span>{{items.start_time_string}}</span>
        </div>
        <div class="item">
          <img :src="items.team_b_image" width="96" height="96" alt="">
          <span>{{items.team_b_short_name}}</span>
        </div>
      </div>

    </div>


  </div>

</template>

<script>
  export default {
    name: 'MatchList',
    data () {
      return {
        matchData:[]
      }
    },
    created() {
      this.loadTop();
    },
    methods:{
      loadTop(){
        var _this=this;
        this.$api('/services/fantasy/room_match.php', {
          roomID:this.$route.query.roomID
        }).then(response => {
          if(response.code == 200){
            _this.matchData=response.data
            //console.log(response);
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .c-blue{
    color:#5348FF;
  }
  .c-light-blue{
    color:#B2B0D2;
  }


  .head-menu{
    padding:0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height 84px;
    background #fff;

    .tab-item{
      flex-shrink:0;
      display:block;
      width:140px;
      /*height: 40px;*/
      line-height: 20px;
      text-align: center;
      color: #B2B0D2;
      position: relative;

      .title{
        font-size: 28px;
        font-family: "PingFang SC";
      }
    }
    .tab-item.active{
      .title{
        color: #5348FF;
        font-weight bold;
      }
    }
    .tab-item.active span.dot{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      background: #5348FF;
      position:absolute;
      bottom: -20px;
      left:63px;
    }

  }



  .play-by-play{
    min-height:100px;
    display grid;
    margin:0 28px;
    margin-bottom:28px;
    background #fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;

    .title{
      padding:20px 20px 0 20px;
      display flex;
      align-items center;

      .subtitle{
        flex-grow:1;
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(178,176,210,1);
        line-height:32px;
      }
    }
    .title{
      i {transition: all 0.3s;}
      i.active {
        display inline-block;
        transform:rotate(180deg);
      }
    }
    i {
      font-size: 27px;
      color: #5451fb;
    }

    .players{
      margin:24px 0;
      display flex;
      justify-content center;
      align-items center;

      .item{
        width:200px;
        display flex;
        justify-content center;
        align-items center;
        flex-wrap wrap;

        span{
          font-size:24px;
          color:#5B579A;
          width 100%;
          display block;
          text-align center;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:34px;
        }
      }
      .item.vs{
        span:first-child{
          font-size:36px;
        }
        span{
          color:#B2B0D2;
          font-size:22px;
        }
      }
    }


    .game-time{
      color:#B2B0D2;
      font-size:20px;
      border-top:1px solid #f8f7fa;

      .item:nth-child(odd){
        background #fcfcfc;
      }
      .item{
        height:48px;
        padding:0 20px;
        display flex;
        justify-content space-between;
        align-items center;

        span{
          display inline-flex;
          justify-content space-between;
          align-items center;

          img {
            margin:0 4px;
          }
        }

        span:nth-child(1){
          width 300px;
        }
        span:nth-child(2){
          width 80px;
        }
        span:nth-child(3){
          //width 250px;
          justify-content flex-end;
          flex-grow:1;
        }


      }
    }
    .game-time.hidden{
      display none;
    }
  }







</style>
