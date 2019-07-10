<template>
  <div title="积分排名">
    <div class="integral" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="100">
      <div class="integral-ranking">
        <div class="integral-ranking-titlt" style="display:none;">
          <ul class="cl">
            <li></li>
            <li>最终奖励: <span>{{amount}}<svg v-if="type==1" aria-hidden="true" class=" banking-icon_guozi1"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg> <svg v-else-if="type==2" aria-hidden="true" class="banking-icon_guozi1"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></span></li>
            <li>最终排名: <span>{{rank}}</span>/{{num}}</li>
          </ul>
        </div>
        <div class="integral-ranking-runing">
          <v-runing :running="running"></v-runing>
        </div>

      </div>
      <div class="ranking-message">
        <ul>
          <li>用户排名</li>
          <li></li>
          <li>阵容积分</li>
          <li>最终奖励</li>
        </ul>
      </div>
      <div class="banking-list">
        <ul v-for="n in weekList" @click="linkVs(n.id)">
          <li>
            <img v-if="n.rank==1" src="../../../static/images/jifen-leval.png" alt="">
            <img v-else-if="n.rank==2" src="../../../static/images/jifen-leval1.png" alt="">
            <img v-else-if="n.rank==3" src="../../../static/images/jifen-leval2.png" alt="">
            <span v-else>{{n.rank}}</span>
          </li>
          <li>
            <p><img v-if="n.member_avatar==''" src="../../../static/images/tx_pic.jpg" alt=""><img v-else :src="n.member_avatar"  alt=""></p>
            <p><span class="banking-list-name">{{n.member_nickname}}</span></p>
          </li>
          <li>{{n.total_score}}</li>
          <li>{{n.prize_amount}}<svg v-if="type==1" aria-hidden="true" class="banking-icon_guozi1"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg> <svg v-else-if="type==2" aria-hidden="true" class="banking-icon_guozi1"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import vRuning from '../RuningLine.vue';
  export default {
    name: 'integral',
    data () {
      return {
        weekList:[],
        totalList:{},
        type:'',
        amount:'',
        busy: false,
        isAll:0,
        running:{total_score:'',pass_score:'',max_score:''},
        rank:'',
        num:'',
        page:'1',
      }
    },
    created() {
    },
    methods:{
      loadTop(){
        var _this=this;
        if(this.isAll==0){
          this.$api('/services/fantasy/room_ranking_list.php', {
            order_id:this.$route.query.orderId,
            limit:20,
            page:this.page
          }).then(response => {
            if(response.code==200){
              _this.running.total_score=response.data.order.total_score;
              _this.running.pass_score=response.data.room.pass_score;
              _this.running.max_score=response.data.room.max_score;
              _this.rank=response.data.order.rank;
              _this.num=response.data.room.at_times;
              _this.type=response.data.room.prize_type;
              _this.amount=response.data.order.prize_amount;
              if(response.data.list.length == 0){
                _this.isAll=1;
              }else{
                _this.page++
                // if(response.data.list.length<20){
                //   _this.isAll=1;
                // }
              }
              _this.weekList= _this.weekList.concat(response.data.list);
              for(let i in this.weekList){
                this.weekList[i].member_nickname = this.weekList[i].member_nickname.replace("#趣玩","").replace("#掌盟","");
              }

            }
          })
        }
        _this.busy=false;
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.loadTop();
        }, 1000);
      },
      linkVs(target){
        var selfId = this.$route.query.orderId;
        this.$router.push({ path:'/vs', query:{self_order_id:selfId,target_order_id:target}})
      }
    },
    components: {
      vRuning
    }
  }
</script>

<style scoped>
  .integral .integral-ranking{
    background: #f9f9f9;
    height:280px;
  }
  .integral .integral-ranking-titlt{
    height:63px;
    line-height:63px;
  }
  .integral .integral-ranking-titlt ul li{
    float: right;
    height:63px;
    line-height:63px;
    font-size:22px;
    padding-right:30px;
  }
  .integral .integral-ranking-titlt ul li:nth-of-type(3) span{
    color: #fe892c;
  }
  .integral .integral-ranking-titlt ul li:nth-of-type(2) span{
    color: #0C9DFC;
  }
  .integral .integral-ranking-runing{
    padding-top:60px;
    width: 620px;
    margin:0 auto;
  }
  .integral .ranking-message{
    height:62px;
    background: #fff;
    border-top: 0;
  }
  .integral .ranking-message ul{
    border-bottom:1px solid #eeeeee;
    height:62px;
  }
  .integral .ranking-message ul li{
    float: left;
    line-height:62px;
    font-size:24px;
    text-align: center;
    height:62px;
  }
  .integral .ranking-message ul li:nth-of-type(1){
    width:118px;
    margin-left:0;
  }
  .integral  .ranking-message ul li:nth-of-type(1) img{
    height:37px;
    width: 42px;
    margin:0 auto;
  }
  .integral .ranking-message ul li:nth-of-type(2){
    width:304px;
  }
  .integral .ranking-message ul li:nth-of-type(3){
    width:180px;
  }
  .integral .ranking-message ul li:nth-of-type(4){
    width:148px;
  }
  .integral  .banking-list{
  }
  .integral  .banking-list ul{
    height:106px;
    background: #fff;
    border-bottom:1px solid #eeeeee;
  }
  .integral .banking-list ul li{
    float: left;
    height: 106px;
    line-height:106px;
    font-size:24px;
    text-align: center;
  }
  .integral  .banking-list  ul li:nth-of-type(1){
    width:118px;
    text-align: center;
  }
  .integral  .banking-list  ul li:nth-of-type(1) img{
    vertical-align: middle;
  }
  .integral  .banking-list  ul li:nth-of-type(1) svg{
    height:32px;
    width:40px;
    margin-top:35px;
  }
  .integral .banking-list ul li:nth-of-type(2){
    width:334px;
  }
  .integral  .banking-list ul li:nth-of-type(3){
    width:160px;
  }
  .integral .banking-list ul li:nth-of-type(4){
    width:138px;
    color: #ccba86;
    font-weight:bold;
  }
  .integral  .banking-list ul li:nth-of-type(2){
    display: flex;
    display: -webkit-flex;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(1){
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
    position: relative;
  }
  .integral .banking-list ul li:nth-of-type(2) p:nth-of-type(1) .v-bg{
    position: absolute;
    display: block;
    height:30px;
    width:30px;
    background: url("../../../static/images/v.png") no-repeat;
    -webkit-background-size:;
    background-size:100% 100%;
    bottom:15px;
    right:15px;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(1) img{
    vertical-align: middle;
    height:52px;
    width:52px;
    border-radius: 50%;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2) .banking-list-logo{
    height:30px;
    width:30px;
    display: inline-block;
    border-radius:50%;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2) span{
    float: left;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2) span:nth-of-type(2){
    margin-top:40px;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2) span:nth-of-type(3){
    margin-top:40px;
    margin-left:10px;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2)  .banking-list-name{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    font-style: normal;
  }
  .integral  .banking-list ul li:nth-of-type(2) p:nth-of-type(2){
    -webkit-box-flex: 3;
    flex: 3;
    text-align: center;
  }
  .integral .banking-icon_guozi{
    font-size:24px;
  }
  .integral .banking-icon_guozi1{
    display: inline-block;
    height:22px;
    width:22px;
    vertical-align: middle;
    margin-bottom:5px;
  }
</style>
