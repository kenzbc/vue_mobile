<template>
  <div class="users_style users">
    <!-- <iframe :src='src' width='750' frameborder='0'></iframe> -->
    <ul class="app_h5_list" v-if="timesRank.list">
      <li class="cl" v-for="user in timesRank.list">
        <img :src="user.avatar==''?'/static/images/tx_pic.jpg':user.avatar" class="user_img fll">
        <span v-html="user.nickname" class="fll"></span>
        <!--<span class="rank_lv1 rank_lv fll" :class="'rank_lv_'+user.rank"></span>-->
        <!--<img :src=user.badge_image class="badge_image fll" v-if="user.badge_image">-->
        <span class="flr"><em v-html="user.num"></em>次</span>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    name: 'users',
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
<style>
  .users_style .app_h5_list li {
    padding: 0 30px 0 24px;
  }

  .user_img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 15px 14px 0 0;
  }

  .money_tips { /* height: 36px;*/
    line-height: 36px;
    font-size: 26px;
    color: #373a41;
    background-color: #f5f5f5;
    padding: 14px 24px;
  }

  .app_h5_list li {
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #373a41;
    background-color: #fff;
    padding: 0 24px;
  }

  .app_h5_list li:nth-child(even) {
    background-color: #f5f5f5;
  }

  .app_h5_list li span.flr em {
    margin-right: 8px;
  }

  .badge_image {
    width: 28px;
    margin-top: 20px;
  }

  .users_style .icon_guozi, .money .icon_guozi {
    width: 22px;
    height: 22px;
    margin-top: 28px;
    float: right;
  }

  /*等级徽章*/
  .rank_lv1 {
    margin: 26px 10px 0 6px;
  }

</style>
