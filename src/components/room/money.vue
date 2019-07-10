<template>
  <div class="money">
    <!--<p class="money_tips" v-if="type == 5">积分相同，平分奖金。</p>
    <p class="money_tips" v-else>奖金分配方案以最大参与人数为基数，实际分配以最终参与情况为准。积分相同的玩家，参与时间早的排位靠前。</p>-->
    <ul class="app_h5_list" v-if="rewardRule.list">
      <li class="cl" v-for="rank in rewardRule.list">
        <span class="fll" v-html="rank.name"></span>
        <span class="flr">
          <span v-text="rank.value"></span>
          <svg class="icon" v-if="rank.prize_type == 1" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-JFx"></use></svg>
          <svg class="icon" v-if="rank.prize_type == 2" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use></svg>
        </span>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    name: 'money',
    data() {
      return {
        rewardRule: {}
      }
    },
    created: function () {
//      this.$root.hub.$on("roomInfoSuccess", _ => {
//        if (this.isWatchSuccess == true) {
//          this.get_user();
//        }
//      });
    },
    mounted: function () {
      if (this.$store.state.member) {
        this.get_money();
      }
    },
    methods: {
      get_money (){
        let roomID = this.$route.query.roomID;
        let roomInfo = this.$store.state.roomData.listArray.find(room => {
          return roomID === room.roomID
        });

        if (roomInfo ){
          if (roomInfo._rewardRule && roomInfo._rewardRule.list.length) {
            this.rewardRule = roomInfo._rewardRule;
            return
          }
        }

        this.$api('/services/fantasy/reward_rule.php', {
          roomID: this.$route.query.roomID,
        }).then(response => {
          if (response.code == 200 && response.data.list.length !== 0) {
            this.rewardRule = response.data;
            if(roomInfo){
              roomInfo._rewardRule = response.data;
              this.$store.commit('updateRoomInfo', roomInfo)
            }
          }
        })
      }
    }
  }
</script>
<style>
  .fll,.flr{
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(91,87,154,1);
  }
</style>
