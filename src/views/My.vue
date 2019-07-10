<template>
  <div style="padding-bottom:80px;">
    <div class="head-menu">
      <div class="tab-item" @click="toggleList('0')" :class="{'active':status=='0'}">
        <span class="title">未开始</span>
        <span class="dot"></span>
      </div>
      <div class="tab-item" @click="toggleList('1')" :class="{'active':status=='1'}">
        <span class="title">进行中</span>
        <span class="dot"></span>
      </div>
      <div class="tab-item" @click="toggleList('2')" :class="{'active':status=='2'}">
        <span class="title">已结束</span>
        <span class="dot"></span>
      </div>
    </div>
    <component :is="currentView"></component>




    <!--新手引导弹层 2-2 -->
    <div v-if="courseStep == '7'" style="padding:28px;padding-top:120px;" class="tutorial2-2">
      <div class="room-list-box">
        <div class="head">
          <img src="../assets/image/icon_bottle@2x.png" alt="">
          <div class="title">
            <span>周三LPL最高2000积分</span>
            <span>前800名有奖，最高2000积分</span>
          </div>
          <div class="subtitle">
            <span>69/2000</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item"><span>1</span><span>最终排名</span></div>
          <div class="item"><span>241.9</span><span>阵容积分</span></div>
          <div class="item"><span>2000</span><span>获得奖金</span></div>
        </div>
        <div class="date">
          花费门票：<span>4</span> &nbsp;
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-menpiao--copy"></use>
          </svg>
          &nbsp;&nbsp;&nbsp;&nbsp;参与次数：<span>1/5</span>
        </div>
      </div>
      <div class="room-list-box">
        <div class="head">
          <img src="../assets/image/icon_60_five-pointed-star@2x.png" alt="">
          <div class="title">
            <span>周三LPL最高2000积分</span>
            <span>前800名有奖，最高2000积分</span>
          </div>
          <div class="subtitle">
            <span>69/2000</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item"><span>1</span><span>最终排名</span></div>
          <div class="item"><span>241.9</span><span>阵容积分</span></div>
          <div class="item"><span>2000</span><span>获得奖金</span></div>
        </div>
        <div class="date">
          花费门票：<span>4</span> &nbsp;
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-menpiao--copy"></use>
          </svg>
          &nbsp;&nbsp;&nbsp;&nbsp;参与次数：<span>1/5</span>
        </div>
      </div>
      <div class="room-list-box">
        <div class="head">
          <img src="../assets/image/icon_60_SOLO@2x.png" alt="">
          <div class="title">
            <span>周三LPL最高2000积分</span>
            <span>前800名有奖，最高2000积分</span>
          </div>
          <div class="subtitle">
            <span>69/2000</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item"><span>1</span><span>最终排名</span></div>
          <div class="item"><span>241.9</span><span>阵容积分</span></div>
          <div class="item"><span>2000</span><span>获得奖金</span></div>
        </div>
        <div class="date">
          花费门票：<span>4</span> &nbsp;
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-menpiao--copy"></use>
          </svg>
          &nbsp;&nbsp;&nbsp;&nbsp;参与次数：<span>1/5</span>
        </div>
      </div>
    </div>
    <div v-if="courseStep == '7'" @click="newUserNextBtn('7')" class="tutorial2-2">
      <div class="content">

        <div style="margin:116px 28px 28px;" class="room-list-box">
          <div class="head">
            <img src="../assets/image/icon_bottle@2x.png" alt="">
            <div class="title">
              <span>周三LPL最高2000积分</span>
              <span>前800名有奖，最高2000积分</span>
            </div>
            <div class="subtitle">
              <span>69/2000</span>
              <span>参与人数</span>
            </div>
          </div>
          <div class="content">
            <div class="item"><span>1</span><span>最终排名</span></div>
            <div class="item"><span>241.9</span><span>阵容积分</span></div>
            <div class="item"><span>2000</span><span>获得奖金</span></div>
          </div>
          <div class="date">
            花费门票：<span>4</span> &nbsp;
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon-menpiao--copy"></use>
            </svg>
            &nbsp;&nbsp;&nbsp;&nbsp;参与次数：<span>1/5</span>
          </div>
        </div>

        <div class="desc-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text">恭喜中奖！这是你的房间排名和奖励，奖励会直接放入你的账户，可以在【战绩】页面查看</div>
        </div>


        <div class="next-btn">下一步</div>
      </div>
    </div>


  </div>
</template>

<script>
  import store from 'store'
  import NotStarted from '../components/MyTab/NotStarted.vue'
  import Finished from '../components/MyTab/Finished.vue'
  import Starting from '../components/MyTab/Starting.vue'
  import HeadTop from '../components/header.vue'
  export default {
    name: 'My2',
    components: {
      NotStarted, //未开始
      Starting, //进行中
      Finished,  //已结束
      headTop: HeadTop
    },
    data () {
      return {
        courseStep:'',//是否显示教程


        status: '0',
        currentView: '',
        isWatchSuccess:true,
      }
    },
    props: ['goBack', 'headTitle', 'comIcon', 'remove', 'mapList'],
    methods: {
      toggleList(element) {

        this.status = element ? element : store.get('my_status');
        sessionStorage.setItem('status', element);
        //this.status = element;
        store.set('my_status',element);

        if (this.status == '0') {
          //阻止二次点击加载
          this.$store.commit('set', {
            key: 'isStopClick',
            val: false
          });
          this.currentView = "NotStarted";
        } else if (this.status == '1') {
          this.$store.commit('set', {
            key: 'isStopClick',
            val: true
          });
          this.currentView = "Starting";
        } else if (this.status == '2') {
          this.$store.commit('set', {
            key: 'isStopClick',
            val: true
          });
          this.currentView = "Finished";
        }
        this.isWatchSuccess = false;
      },
      init (){
        this.status = store.get('my_status') ? store.get('my_status') : '0';
        this.toggleList(this.status);
      },
      newUserNextBtn(step){
        store.set("new_user_step",'8');//步骤8
        this.$router.push('/home');
      },
    },
    created() {
      this.$repeatLogin();
      this.$root.hub.$on("loginSuccess", _ => {
        if (this.isWatchSuccess == true) {
          this.init();
        }
      })


      this.courseStep = store.get("new_user_step");
      console.log(`my new_user_step = ${this.courseStep}`);
    },
    mounted(){
      if (this.member){
        this.init();
      }
    },
    computed: {
      member() {
        return this.$store.state.member
      }
    },

  }
</script>

<style lang="stylus" scoped>

  /* 新手引导 */
  .tutorial2-2{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;

      .desc-text{
        padding:0px 28px 28px;

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }
    }


    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

    .room-list-box{
      height:268px;
      margin-bottom:28px;
      background:rgba(255,255,255,1);
      box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
      border-radius:12px;


      .head{
        height:96px;
        color:#fff;
        background:rgba(83,72,255,1);
        box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
        border-radius:12px 12px 0 0;
        padding:0 10px;
        display flex;
        align-items center;

        img {
          width 92px;
          height 92px;
        }

        .title{
          flex-wrap:wrap;
          flex-grow:1;
          margin-left:20px;

          span{
            display block;
            width 100%;
          }
          span:nth-child(1){
            font-size 28px;
            color:#fff;
          }
          span:nth-child(2){
            font-size:22px;
            color:#9B95FF;
          }
        }
        .subtitle{
          width 190px;
          padding-right:10px;
          flex-wrap:wrap;
          justify-content flex-end;

          span{
            display block;
            text-align right;
            width 100%;
          }
          span:nth-child(1){
            font-size 28px;
            color:#fff;
          }
          span:nth-child(2){
            font-size:22px;
            color:#9B95FF;
          }
        }

      }


      .content{
        padding:0 60px;
        display flex;
        justify-content space-between;
        align-items center;

        .item{
          width 140px;
          padding-top:28px;
          flex-wrap wrap;


          span{
            display block;
            text-align center;
            width 100%;
            color:#5B579A;
            font-size:28px;
            margin-right:10px;
          }
          span:nth-child(2){
            margin-top:4px;
            font-size:22px;
            color:#B2B0D2;
            margin-right:10px;
          }


        }

      }

      .date{
        padding:28px;
        display flex;
        align-items center;
        color:#B2B0D2;

        span{
          margin-left:10px;
          font-size:22px;
          color: #5B579A;
        }

      }

    }

  }





  .data-null{
    text-align: center;
    color: #b2b0d2;
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
        font-size:24px;
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




</style>
