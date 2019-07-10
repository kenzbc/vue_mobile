<template>
    <div title="参与玩家">
      <div style="padding:20px 28px 0px 28px;">
        <div class="head-title">
          <span>用户</span>
          <span>参与次数</span>
        </div>

      </div>

      <div class="data-list-box" v-if="timesRank.list" v-for="user in timesRank.list">
        <div class="item user">
          <span><img :src="user.avatar==''?'/static/images/tx_pic.jpg':user.avatar"></span>
          <span v-html="user.nickname">张三丰</span>
        </div>
        <div class="item score" v-html="user.num">234</div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        timesRank: {},
        limit: 99,
        last_member_id: ''
      }
    },
    created: function () {
    },
    mounted: function () {
      if (this.$store.state.member) {
        this.get_user();
      }
    },
    methods: {
      get_user(){
//        let roomID = this.$route.query.roomID;
//        let roomInfo = this.$store.state.roomData.listArray.find(room => {
//          return roomID === room.roomID
//        });
//        if(roomInfo){
//          if (roomInfo._timesRank && roomInfo._timesRank.list && roomInfo._timesRank.list.length) {
//            this.timesRank = roomInfo._timesRank;
//            return
//          }
//        }
        this.$api('/services/fantasy/times_rank.php', {
          roomID: this.$route.query.roomID,
          limit: this.limit,
          last_member_id: this.last_member_id
        }).then(response => {
          if (response.code == 200 && response.data.list.length !== 0) {
            this.timesRank = response.data;
            for(let i in this.timesRank.list){
              this.timesRank.list[i].nickname = this.timesRank.list[i].nickname.replace("#趣玩","").replace("#掌盟","");
            }
//            if (roomInfo) {
//              roomInfo._timesRank = response.data;
//              this.last_member_id = response.data.list[response.data.list.length - 1].member_id;
//              this.$store.commit('updateRoomInfo', this.roomInfo)
//            }
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



  .head-title{
    display flex;
    align-items center;
    justify-content space-between;
    color:#B2B0D2;
    font-size:22px;
    margin-bottom:10px;


    span {
      span {
        color:#5348FF;
      }
    }

  }



  .data-list-box{
    min-height:88px;
    overflow: hidden;
    background:#fff;
    display flex;
    justify-content space-between;
    align-items center;
    flex-wrap wrap;
    color:#5B579A;
    font-size:24px;
    font-weight bold;

    .user{
      padding-left:10px;
      display inline-flex;
      align-items center;
      flex-grow:1;

      span{
        display flex;
        justify-content center;
        align-items center;

        .dot-num{
          display flex;
          justify-content center;
          align-items center;
          width 34px;
          height 34px;
          background #d7d6f8;
          font-size:20px;
          color:#fff;
          border-radius 34px;
          font-weight normal;
        }
      }
      img {
        max-width 60px;
        margin:0 10px;
        border-radius:50%;
      }


    }
    .score{
      width 140px;
      padding:20px;
      text-align center;
    }



  }
  .data-list-box:nth-child(odd){
    background #FCFCFC;
  }
  .data-list-box.title{
    min-height 30px;
    border-bottom:1px solid #f4f3fc;
    background #fff;
  }



</style>
