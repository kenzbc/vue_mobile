<template>
  <div>
    <div class="item-player" :title="position">
      <div>
        <position-icon :position="position"></position-icon> &nbsp;
        {{position}}
      </div>
      <div class="photo">
        <span class="bg">
          <img :src="backgroundImg" width="118" height="142">
        </span>
        <span class="avatar">
          <img :src="playerAvatar"  width="118" height="118">
        </span>
        <span class="score">{{score}}</span>
      </div>
      <div class="player-text">{{nickname}}</div>
      <div class="player-team-text">{{teamName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerItem",
  components: {},
  props:{
    position:{
      type: String,
      default: 'TOP',
    },
    backgroundImg:{
      type: String,
      default:'30',
    },
    playerAvatar:{
      type: String,
      default:'../../static/images/unknow.png',
    },
    score:{
      type: String,
      default:'00',
    },
    nickname:{
      type: String,
      default:'',
    },
    teamName:{
      type: String,
      default:'',
    },
  },
  data() {
    return {}
  },
  mounted: function () {

  },
  method: {},
  destroyed: function () {
  }
}
</script>

<style lang="stylus" scoped>
  .item-player{
    width:120px;

    div{
      display inline-flex;
      align-items center;
      font-size:20px;
      color:#B2B0D2;
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

    .photo{
      margin-top:8px;
      height 144px;
      display flex;
      align-items flex-end;
      position relative;

      .bg{
        position absolute;
        z-index 1;

        img {
          width:118px;
          height:146px;
        }
      }
      .avatar{
        position absolute;
        z-index 2;


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
    }
    div:nth-child(3){
      margin-top:8px;
      font-size:24px;
      color:#5B579A;
    }
    div:nth-child(4){
      margin-top:8px;
    }



  }



</style>
