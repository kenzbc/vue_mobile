<template>
  <div style="overflow-y:auto;-webkit-overflow-scrolling:touch;">


  <div class="view-box">

    <div class="tickets">
      <router-link :to="{ path:'/TicketDetail', query: { log_type: 0} }">
      <div class="fz-18 text-center">{{myBank.ticket}}</div>
      <div class="fz-12 text-center">门票</div>
        <span class="more fz-9">明细 <i class="iconfont fz-9">&#xe6fc;</i></span>
      </router-link>
    </div>

    <div class="integral">
      <router-link :to="{ path:'/TicketDetail', query: { log_type: 2} }">
      <div class="fz-18 text-center">{{myBank.guozi1}}</div>
      <div class="fz-12 text-center">积分</div>
      <span class="more fz-9">明细 <i class="iconfont fz-9">&#xe6fc;</i></span>
      </router-link>
    </div>

  </div>


  <div class="view-box">
    <div class="item-box" v-show="data.length!=0">
      <div class="item-box-title fz-11 headBgBlueColor">本周战绩：{{weekList.period}}</div>
      <div class="item-box-content">
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>周排名</span><span class="fz-14">{{weekList.position}}</span></span>
          <span class="c-item fz-12"><span>本周战绩</span><span class="fz-14">{{weekList.win_times}}/{{weekList.total_times}}</span></span>
        </div>
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>中奖率</span><span class="fz-14">{{weekList.win_num}}</span></span>
          <span class="c-item fz-12"><span>单场最高</span>
            <span class="fz-14" v-if="weekList.best_bet&&weekList.best_bet.length==0">0</span>
            <span class="fz-14" v-else v-for="items in weekList.best_bet">{{items.prize_amount}}</span>
          </span>
        </div>
        <div class="earnings fz-11">本周收益 <span class="fz-20">{{weekList.amount}}</span></div>
      </div>
    </div>

    <div class="item-box">
      <div class="item-box-title fz-11 headBgPurpleColor">本月战绩：{{monthList.period}}</div>
      <div class="item-box-content">
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>月排名</span><span class="fz-14">1</span></span>
          <span class="c-item fz-12"><span>本月战绩</span><span class="fz-14">{{monthList.win_times}}/{{monthList.total_times}}</span></span>
        </div>
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>中奖率</span><span class="fz-14">{{monthList.win_num}}</span></span>
          <span class="c-item fz-12"><span>单场最高</span>
            <span class="fz-14" v-if="monthList.best_bet&&monthList.best_bet.length==0">0</span>
            <span class="fz-14" v-else v-for="items in monthList.best_bet">{{items.prize_amount}}</span>
          </span>
        </div>
        <div class="earnings fz-11">本月收益 <span class="fz-20">{{monthList.amount}}</span></div>
      </div>
    </div>

    <div class="item-box">
      <div class="item-box-title fz-11 headBgRedColor">总战绩：{{totalList.period}}</div>
      <div class="item-box-content">
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>总排名</span><span class="fz-14">1</span></span>
          <span class="c-item fz-12"><span>总战绩</span><span class="fz-14">{{totalList.win_times}}/{{totalList.total_times}}</span></span>
        </div>
        <div class="item-box-c-list">
          <span class="c-item fz-12"><span>中奖率</span><span class="fz-14">{{totalList.win_num}}</span></span>
          <span class="c-item fz-12"><span>单场最高</span>
            <span class="fz-14" v-if="totalList.best_bet&&totalList.best_bet.length==0">0</span>
            <span class="fz-14" v-else v-for="items in totalList.best_bet">{{items.prize_amount}}</span>
          </span>
        </div>
        <div class="earnings fz-11">总收益 <span class="fz-20">{{totalList.amount}}</span></div>


        <div class="footer-other" v-if="totalList.best_bet && totalList.best_bet.length>0" v-for="items in totalList.best_bet">
          <div class="f">
            <span class="f-title">单场最高收益</span>
            <span class="f-subtitle">花费门票：{{items.price}} <i class="iconfont" style="color:#0c93fb;">&#xe6f7;</i>  &nbsp;参与次数：{{items.join_times}}/{{items.single_times}}</span>
          </div>

          <div class="f-item-box" style="">
            <div class="f-icon"><room-type-icon width="72" height="72" :type="items.room_type"></room-type-icon></div>
            <div class="f-text">
              <span>{{items.name}}</span>
              <span>{{items.desc}}</span>
            </div>
            <div class="f-text2">
              <span>{{items.join_people}}/{{items.times}}</span>
              <span>参与人数</span>
            </div>
          </div>
          <div class="f-item-box b-border-r mt-2">
            <div class="sp-item"><span>{{items.rank}}</span><span>最终排名</span></div>
            <div class="sp-item"><span>{{items.total_score}}</span><span>阵容积分</span></div>
            <div class="sp-item"><span>{{items.prize_amount}}</span><span>获得奖金</span></div>
          </div>
        </div>
      </div>
    </div>




  </div>






  </div>
</template>

<script>
  import store from 'store'
  import HeadTop from '../components/header.vue'
  export default {
    name: "MyRedord",
    data () {
      return {
        myBank: {},
        room_type:['','新手','活动','日赛','周赛','Solo','名人','毒奶','Solo'],
        shareShow: false,
        weekList:[],
        monthList:[],
        totalList:[],
        data:'',
        list:[],
        isWatchSuccess: true,
      }
    },
    created(){
      this.$repeatLogin();
      this.$root.hub.$on("loginSuccess", _ => {
        if ( this.isWatchSuccess == true) {
          this.getData();
        }
      })
    },
    mounted () {
      if (this.member){
        this.getData();
      }
    },
    methods:{
      getData(){
        let _this = this;
        this.$api('/services/fantasy/member_record.php', {
          qid:store.get('loginInfo').type,
        }).then(response => {
          if(response.code==200){
            _this.data=response.data;
            _this.weekList=response.data.week_record;
            _this.monthList=response.data.month_record;
            _this.totalList=response.data.total_record;

            _this.myBank = response.data.my_bank;
            _this.isWatchSuccess = false;
          }
        });
      },
      shareDetail() {
        this.shareShow = true
      },
      hideDetail() {
        this.shareShow = false
      },
    },
    components:{
      headTop:HeadTop
    },
    computed: {
      member () {
        return this.$store.state.member
      },
    }
  }
</script>

<style lang="stylus" scoped>
  SCALE=2;

  *{
    font-size: 22px;
    box-sizing: border-box;
  }

  .fz-9{font-size:18px;}
  .fz-10{font-size:20px;}
  .fz-11{font-size:22px;}
  .fz-12{font-size:24px;}
  .fz-14{font-size:28px;}
  .fz-16{font-size:32px;}
  .fz-18{font-size:36px;}
  .fz-20{font-size:40px;}

  .mt-2{margin-top:4px;}
  .mt-4{margin-top:8px;}
  .mt-10{margin-top:20px;}
  .mt-15{margin-top:30px;}
  .mt-30{margin-top:60px;}

  .text-center{text-align: center}
  .text-left{text-align: left}
  .text-rigth{text-align: right}
  .f-left{ float:left;}
  .f-rigth{ float: right}

  .headBgBlueColor{
    background:rgba(83,72,255,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgBlueColor + .item-box-content .earnings span{color:#5348FF;}
  .headBgPurpleColor{
    background:rgba(156,72,255,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgPurpleColor + .item-box-content .earnings span{color:#9C48FF;}
  .headBgRedColor{
    background:rgba(239,27,90,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgRedColor + .item-box-content .earnings span{color:#EF1B5A;}


  .view-box{
    padding:14px*SCALE 14px*SCALE 0 14px*SCALE;
    background:#F8F7FA;
    display flex;
    justify-content space-between;
    align-items center;
    flex-wrap:wrap;
    color:#fff;

  }

  .tickets{
    width 49%;
    height:60px*SCALE;
    padding-top:9px*SCALE;
    background:linear-gradient(135deg,rgba(24,182,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 8px 6px -6px rgba(72,136,255,0.5);
    border-radius:6px;
    position:relative;

    a{
      color:#fff;
    }
  }
  .view-box .more{
    position absolute;
    top:8px;
    right:12px;

    .iconfont{
      font-weight bold;
    }
  }
  .integral{
    width 49%;
    height:60px*SCALE;
    padding-top:9px*SCALE;
    background:linear-gradient(135deg,rgba(184,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 8px 6px -6px rgba(141,72,255,0.5);
    border-radius:6px;
    position:relative;

    a{
      color:#fff;
    }
  }


  .item-box{
    width:100%;
    min-height:100px;
    margin-bottom:28px;
    background:#fff;
    box-shadow:0px 6px*SCALE 4px*SCALE -4px*SCALE rgba(241,237,255,0.5);
    border-radius:6px*SCALE;
  }
  .item-box .item-box-title{
    height:26px*SCALE;
    padding:5px*SCALE 10px*SCALE;
  }
  .item-box .item-box-content{
    width:100%;
    min-height:100px;
    padding:9px*SCALE 10px*SCALE;
    display: flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
  }
  .item-box-c-list{
    width:100%;display:flex;justify-content:space-between;
  }
  .item-box .item-box-c-list .c-item:nth-child(odd){
    margin-right:8px;
    font-weight:500;
    line-height:34px;
  }
  .item-box .item-box-c-list .c-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:50%;
    padding:8px*SCALE 3px*SCALE;
    margin-bottom:4px*SCALE;
    height:24px*SCALE;
    background:rgba(248,247,250,1);
    color:#B2B0D2;

  }
  .item-box .item-box-c-list .c-item span:last-child{
    color:#5B579A;
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:40px;
  }
  .earnings{
    width 100%;
    margin:40px auto;
    display flex;
    justify-content center
    align-items center
    color:#B2B0D2;
  }
  .earnings span{
    margin-left:20px;
    font-size:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
  }


  .footer-other{
    color:#B2B0D2;
    width:100%;
  }
  .footer-other .f-title{
    display:inline-block;
    text-align:center;
    width:180px;
    height:32px;
    background:#F8F7FA;
    border-radius:12px 12px 0px 0px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:32px;
  }
  .footer-other .f-subtitle{
    text-align:right;
    float:right;
    padding-right:20px;
    font-size:22px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#B2B0D2;
    line-height:32px;
  }
  .footer-other .f-item-box{
    width:100%;padding:10px 20px 16px 80px;background:#F8F7FA;border-radius:0px 12px 0px 0px;
    display:flex;
    align-items:center;
    position:relative;
  }
  .footer-other .f-item-box.b-border-r{
    padding:16px 10px 18px 10px;
    margin-top:4px;border-radius:0px 0px 12px 12px;
  }
  .f-icon{
    flex-shrink:0;
    text-align:center;
    border-radius:50%;
    position absolute;
    left:5px;
    top:0;
  }
  .f-icon .star{
    color:#FFF909;
    font-size:48px;
  }

  .f-text{
    width:320px;
    margin-left:20px;
  }
  .f-text2{
    text-align:right;
    flex-grow:1;
  }
  .f-text span,.f-text2 span{
    display:block;
  }
  .f-text span:first-child,.f-text2 span:first-child{
    font-size:28px;
    color:#5B579A;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(91,87,154,1);
    line-height:40px;
  }

  .sp-item{
    width:33%;
  }
  .sp-item span:first-child{
    color:#5B579A;
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(91,87,154,1);
    line-height:40px;
  }
  .sp-item span{
    display:block;
    text-align:center;
    width:100%;
  }



</style>
