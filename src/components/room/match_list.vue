<template>
  <div class="match_list_tab" >
    <p class="match_list_tips">本房间使用以下场次的比赛：</p>
    <article class="match_list" v-for="(items,index) in matchList" v-if="matchList.length" :key="index" @click="show_list(index)">
      <p class="match_list_top cl">
        <img :src="items.tournament_image_thumb" class="fll">
        <span v-html="items.tournament_short_name"></span>
        <span v-html="items.round_name"></span>
        <span v-html="items.round_son_name"></span>
        <i class="iconfont icon-icon_jiantouxiangshang- flr" v-if="near_ten_list[index]"></i>
        <i class="iconfont icon-icon_jiantouxiangxia- flr" v-else></i>
      </p>
      <section class="match_list_main cl">
        <div class="fll">
          <img :src="items.team_a_image" class="match_logo">
          <p v-html="items.team_a_short_name"></p>
        </div>
        <div class="match_score fll">
          <h3 v-if="items.status == 0">VS</h3>
          <h3 v-else>{{items.team_a_win}}:{{items.team_b_win}}</h3>
          <p v-if="items.status == 1" class="font_red">进行中</p>
          <p v-else v-html="items.start_time_string"></p>
        </div>
        <div class="flr">
          <img :src="items.team_b_image" class="match_logo">
          <p v-html="items.team_b_short_name"></p>
        </div>
      </section>
      <div class="match_list_info" v-show="near_ten_list[index]==true">
        <p v-if="items.near_ten.length > 0">最近10场交战</p>
        <p class="near_ten_null" v-else>没有交战记录</p>
        <ul>
          <li v-for="(near_list,listIndex) in items.near_ten" :key="listIndex">
            <span class="near_ten_day" v-html="near_list.start_time"></span>
            <span v-html="near_list.tournament_short_name"></span>
            <span class="near_ten_main">
              <label class="left">
                <span class="fll">{{near_list.team_short_name_a}}</span><img class="flr" :src="near_list.team_image_thumb_a"></label>
              <label class="center">{{near_list.team_a_win}}:{{near_list.team_b_win}}</label>
              <label class="right"><img class="fll" :src="near_list.team_image_thumb_b">
                <span class="flr">{{near_list.team_short_name_b}}</span>
              </label>
            </span>
          </li>
        </ul>
      </div>
    </article>
  </div>

</template>
<script>
  export default {
    name: "match_list",
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

  };
</script>
<style>
  .match_list_tips {
    line-height: 64px;
    color: #ABAFB8;
    padding-left: 24px;
  }

  .match_list {
    width: calc(100% - 48px);
    margin: 0 auto 24px;
    background-color: #fff;
    border: 1px solid rgba(232,234,237,0.50);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.04);
    border-radius: 8px;
  }

  .match_list_top {
    padding: 16px 24px 30px 24px;
  }

  .match_list_top img {
    display: block;
    width: 24px;
    height: 24px;
    margin: 4px 16px 0 0;
  }

  .match_list_top .iconfont {
    display: inline-block;
    color: #ACB2BF;
    margin-top: 4px;
  }

  .match_list_main {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    padding: 0 40px 38px 40px;
  }

  .match_list_main div {
    width: 33%;
    text-align: center;
  }

  .match_list_main div.match_score {
    width: 28%;
    padding-top: 30px;
  }

  .match_score h3 {
    line-height: 48px;
    font-size: 32px;
  }
  .match_score p{
    color: #B0B5BF;
  }
  .match_logo {
    width: 84px;
    height: 84px;
  }

  .match_list_info {
    padding: 24px 0 12px;
  }

  .match_list_info p {
    margin-bottom: 24px;
    padding: 0 24px;
  }

  .match_list_info ul {
    padding: 0 24px;
  }

  .match_list_info ul li {
    display: table;
    width: 100%;
    margin-bottom: 16px;
    line-height: 24px;
  }

  .match_list_info ul li span {
    display: table-cell;
    width: 32%;
  }

  .match_list_info ul li span.near_ten_day {
    width: 20%;
  }

  .match_list_info ul li span.near_ten_main {
    text-align: center;
    width: 100%;
    display: block;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }

  .match_list_info ul li span.near_ten_main span {
    font-size: 22px;
  }

  .match_list_info ul li img {
    display: inline-block;
    width: 24px;
    margin: 0 6px;
  }

  .match_list_info p.near_ten_null {
    text-align: center;
    margin-bottom: 14px;
  }

  .near_ten_main label {
    display: block;
    height: 24px;
    overflow: hidden;
  }

  .near_ten_main .left,
  .near_ten_main .right {
    width: 41%;
  }

  .near_ten_main .center {
    width: 18%;
  }

  .near_ten_main .left {
    text-align: right;
    position: relative;
  }

  .near_ten_main .left span {
    display: block;
    line-height: 24px;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .near_ten_main .left img {
    display: block;
    width: 24px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }

  .near_ten_main .right {
    text-align: left;
    position: relative;
  }

  .near_ten_main .right span {
    display: block;
    width: 90px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .near_ten_main .right img {
    display: block;
    width: 24px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
