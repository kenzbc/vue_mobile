<template>
  <div class="matchList">
    <div class="matchList-first" v-for="items in matchData">
      <div class="matchList-first-title">
        <img :src="items.tournament_image_thumb" alt="">
        <p>{{items.tournament_short_name}} {{items.round_name}} {{items.round_son_name}}</p>
      </div>
      <div class="matchList-first-logo">
        <ul>
          <li>
            <img :src="items.team_a_image" alt="">
            <p>{{items.team_a_short_name}}</p>
          </li>
          <li>
            <p>{{items.team_a_win}} : {{items.team_b_win}}</p>
            <p>{{items.start_time_string}}</p>
          </li>
          <li>
            <img :src="items.team_b_image" alt="">
            <p>{{items.team_b_short_name}}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'matchList',
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

<style>
  .matchList {
    padding-top: 20px;
  }

  .matchList .matchList-first {
    margin: 0 19px 20px;
    background: #fff;
    border-radius: 10px 10px;
    padding: 26px 29px;
    box-shadow: 5px 5px 8px rgba(0, 200, 215, 0.1);
  }

  .matchList .matchList-first-title {
    display: flex;
    display: -webkit-flex;
  }

  .matchList .matchList-first-title img {
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
  }

  .matchList .matchList-first-title p {
    padding-left: 16px;
    flex: 1;
    font-size: 24px;
  }

  .matchList .matchList-first-logo ul {
    padding: 38px 0 0 0;
    display: flex;
    display: -webkit-flex;
  }

  .matchList .matchList-first-logo ul li img {
    height: 84px;
    width: 84px;
  }

  .matchList .matchList-first-logo ul li p {
    color: black;
    font-size: 24px;
  }

  .matchList .matchList-first-logo ul li:nth-of-type(1) {
    -webkit-box-flex: 0 0 252px;
    flex: 0 0 252px;
    text-align: center;
  }

  .matchList .matchList-first-logo ul li:nth-of-type(2) {
    -webkit-box-flex: 0 0 142px;
    flex: 0 0 142px;
    text-align: center;
  }

  .matchList .matchList-first-logo ul li:nth-of-type(2) p:nth-of-type(1) {
    font-size: 28px;
    font-weight: bold;
    color: #373a41;
    margin-top: 36px;
  }

  .matchList .matchList-first-logo ul li:nth-of-type(3) {
    -webkit-box-flex: 0 0 252px;
    flex: 0 0 252px;
    text-align: center;
  }
</style>

