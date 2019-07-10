<template>
    <div>
      <div class="title pd-14">本房间使用以下场次的比赛：</div>
      <div class="play-by-play" v-for="(items,index) in matchList" v-if="matchList.length" :key="index" @click="show_list(index)">
        <div class="title">
          <img :src="items.tournament_image_thumb" width="32" height="32">&nbsp;&nbsp;
          <div style="flex-grow:1;">
            <span v-html="items.tournament_short_name"></span>
            <span v-html="items.round_name"></span>
            <span v-html="items.round_son_name"></span>
          </div>
          <i class="iconfont" :class="{'active':near_ten_list[index]}">&#xe673;</i>
        </div>
        <div class="players">
          <div class="item"><img :src="items.team_a_image" width="96" height="96" alt=""> <span v-html="items.team_a_short_name">A队</span></div>

          <div class="item vs">
            <span v-if="items.status == 0"><img src="../assets/image/VS@2x.png"></span>
            <span v-else>{{items.team_a_win}}:{{items.team_b_win}}</span>
            <span v-if="items.status == 1">进行中</span>
            <span v-else v-html="items.start_time_string"></span>
          </div>

          <div class="item"><img :src="items.team_b_image" width="96" height="96" alt=""> <span v-html="items.team_b_short_name">B队</span></div>
        </div>
        <!--时间列表-->
        <div class="game-time" v-show="near_ten_list[index]==true">
          <p style="padding:10px 20px;" v-if="items.near_ten.length > 0">最近10场交战</p>
          <p style="padding:10px 20px;" v-else>没有交战记录</p>

          <div class="item" v-for="(near_list,listIndex) in items.near_ten" :key="listIndex">
            <span class="time" v-html="near_list.start_time">2018-08-19 16:00</span>
            <span class="player" v-html="near_list.tournament_short_name"></span>
            <span class="team">
              <span class="team-a"><img :src="near_list.team_image_thumb_a" width="32" height="32" alt="">{{near_list.team_short_name_a}}</span>
              <span class="team-score">{{near_list.team_a_win}}:{{near_list.team_b_win}}</span>
              <span class="team-b">{{near_list.team_short_name_b}}<img :src="near_list.team_image_thumb_b" width="32" height="32" alt=""></span>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RoomDetailList",
    data() {
      return {
        matchList: [],
        near_ten_list: [],
        isWatchSuccess: true,
      };
    },
    created(){
      this.$root.hub.$on("roomInfoSuccess", _ => {
        if (this.isWatchSuccess == true) {
          this.room_match();
        }
      });
    },
    computed: {

    },
    mounted: function () {
      if (this.$store.state.member) {
        this.room_match();
      }
    },
    methods: {
      room_match() {
        let roomID = this.$route.query.roomID;
        let roomInfo = this.$store.state.roomData.listArray.find(room => {
          return roomID === room.roomID
        });


        if (roomInfo && roomInfo._matchList && roomInfo._matchList.length) {
          this.matchList = roomInfo._matchList;
          return
        }

        var _this = this;
        this.$api("/services/fantasy/room_match.php", {roomID: roomID}).then(response => {
          if(response.code == 200){
            _this.matchList = response.data;

            if (roomInfo){
              roomInfo._matchList = response.data;
              this.$store.commit('updateRoomInfo', roomInfo);
            }


            this.isWatchSuccess = false;
          }
        });
      },
      show_list(index) {
        if (this.near_ten_list[index] == true) {
          this.$set(this.near_ten_list, index, false);
        } else {
          this.$set(this.near_ten_list, index, true);
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .pd-14{padding:28px;}

  .title{
    color:#B2B0D2;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:32px;
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
      font-size:22px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
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
          font-family:PingFangSC-Regular;
          font-weight:400;
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

        span.time{
          width 120px;
        }
        span.player{
          width 200px;
          justify-content center;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        span.team{
          width 300px;
          justify-content center;
          flex-grow:0;

          .team-a{
            width:270px;
            padding-right:10px;
            justify-content flex-end;
          }
          .team-score{
            width:50px;
            justify-content center;
          }
          .team-b{
            width:270px;
            padding-left:10px;
            justify-content flex-start;
          }
        }






      }
    }
    .game-time.hidden{
      display none;
    }
  }


</style>
