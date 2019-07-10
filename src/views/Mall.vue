<template>
  <div>
    <div class="head-nav">
      <head-top
        head-title="兑换商城"
        mallShowType="true"
        v-on:changeMallList="changeMallList"
      ></head-top>
    </div>
    <div style="height:90px;"></div>

    <div class="head-user">
      <div class="user"><img class="avatar" :src="member_info.avatar ? member_info.avatar  : '/static/images/tx_pic.jpg'" >{{member_info.nickname }} </div>
      <div class="guozi">{{member_info.guozi}} &nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></div>
      <router-link :to="{path:'/record',query:{}}">
        <div class="conversion-btn"><i class="iconfont">&#xe6f1;</i>兑换明细</div>
      </router-link>
    </div>

    <div class="sizer">
      <div class="item" :class="tab_arg_status == '0' ? 'active' : ''" @click="filterBtn('0')">上架时间
        <span class="caret-wrapper">
          <i :class="tab_arg[0].sort == 'asc' ? 'active' : ''" class="sort-caret ascending"></i>
          <i :class="tab_arg[0].sort == 'desc' ? 'active' : ''" class="sort-caret descending"></i>
        </span>
      </div>
      <div class="item" :class="tab_arg_status == '1' ? 'active' : ''" @click="filterBtn('1')">兑换价格
        <span class="caret-wrapper">
          <i :class="tab_arg[1].sort == 'asc' ? 'active' : ''" class="sort-caret ascending"></i>
          <i :class="tab_arg[1].sort == 'desc' ? 'active' : ''" class="sort-caret descending"></i>
        </span>
      </div>
      <div class="item ascending" :class="tab_arg_status == '2' ? 'active' : ''" @click="filterBtn('2')">剩余数量
        <span class="caret-wrapper">
          <i :class="tab_arg[2].sort == 'asc' ? 'active' : ''" class="sort-caret ascending"></i>
          <i :class="tab_arg[2].sort == 'desc' ? 'active' : ''" class="sort-caret descending"></i>
        </span>
      </div>
    </div>


    <div class="goods-list" :class="{'vertical':mallListType}">

      <div class="goods-item-card" v-for="(item,index) in action_list" @click="detailBtn(item.action_id,item.exchange_times,item.end_date)">
        <div class="photo"><img width="232" height="232" :src="item.image_url+'?x-oss-process=image/resize,m_fill,h_160,w_160'" ></div>
        <div class="info">
          <span v-if="!mallListType" :style="mallListGoodsNameStyle">{{item.goods_name}}</span>
          <span v-if="mallListType">{{item.goods_name}}</span>
          <span>库存 {{item.exchange_times}}</span>
          <span>截止到{{item.end_date}}</span>
          <span>{{item.price}} &nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></span>
        </div>
        <!--<span class="icon icon-pink" v-if="item.type=='1'">虚拟</span>-->
        <!--<span class="icon icon-baby-blue" v-else-if="item.type=='2'">实体</span>-->
      </div>

      <div class="exchange-null" v-show="loading && action_list==''">
        <img src="../../static/images/pic_404.png" alt="">
        <p>暂无数据</p>
      </div>

      <div style="display:none" class="goods-item-card">
        <div class="photo"><img src="../assets/image/goodsPhoto@2x.jpg" ></div>
        <div class="info">
          <span>2017星之守护者徽章组合（内含徽章五枚）</span>
          <span>库存 8</span>
          <span>截止到2019.08.15</span>
          <span>225900 &nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></span>
        </div>
        <!--<span class="icon icon-baby-blue">实体</span>-->
      </div>
    </div>


    <!--新手引导弹层 (9)-->
    <div v-if="courseStep=='9'" @click="newUserNextBtn('9')" class="tutorial2-4">
      <div class="content">
        <div class="desc-text">
          <div class="text">商城有各种点券、手办、皮肤、周边等你来赢取。</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>

        <div class="goods-item-card">
          <img class="photo" src="../assets/image/goodsPhoto@2x.jpg" >
          <div class="info">
            <span>199Q币英雄联盟皮肤</span>
            <span>库存 21</span>
            <span>截止到2019.08.15</span>
            <span>19900 &nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></span>
          </div>
          <span class="icon icon-pink">虚拟</span>
        </div>

      </div>
    </div>

    <!--新手引导弹层-->
    <div v-if="courseStep=='10'" @click="newUserNextBtn('10')" class="tutorial2-5">
      <div class="content">

        <div class="modal">
          <div class="title">恭喜你</div>
          <div class="desc">你已经掌握了幻联赛的基本玩法，开始幻联赛之旅吧！</div>
          <div class="button">领取新手奖励</div>
        </div>

      </div>
    </div>

    <!--新手引导弹层-->
    <div v-if="courseStep=='11'" @click="newUserNextBtn('11')" class="tutorial2-6">
      <div class="content">
        <div class="modal">
          <div class="icon"><img src="../assets/image/icon_receive_success@2x.png" ></div>
          <div class="desc">恭喜！您已成功领取新手奖励</div>
          <div class="button">开启幻联赛之旅</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from "axios";
  import store from "store";
  import loading from '../components/loading.vue';
  import HeadTop from '../components/header.vue';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import DialogAwards from '../components/dialogAwards.vue';
  export default {
    name: "MallList-HTML",
    components: {
      headTop:HeadTop,
      swiper,
      swiperSlide,
      loading,
      DialogAwards,
    },
    data () {
      return {
        courseStep:'',

        mallListType:false,
        mallListGoodsNameStyle:{
          width:'430px',
          overflow:'hidden',
          display:'-webkit-box',
          '-webkit-box-orient':'vertical',
          '-webkit-line-clamp':'2'
        },
        guoziIcon:this.$store.state.guoziIcon,
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          mousewheelControl: true,
        },
        showMore:true,
//        bannerList:'',
        flag:false,
        ison:'',
        category:'',
//        category1:[],
        id:'0',
        goodList:'',
        loading:false,
        amount:'',
        guozi:'',
        categoryName:'全部',
        action_list:'',

        //筛选
        flag1:1,
        flag2:3,
        flag3:3,

        tab_arg_status:'',
        tab_arg:[
          {
            name: 'start_date',
            sort:''  //asc: 升序， desc: 降序
          },
          {
            name: 'price',
            sort:''  //asc: 升序， desc: 降序
          },
          {
            name: 'exchange_times',
            sort:''  //asc: 升序， desc: 降序
          },
        ],
        member_info:'',
        awardsShow: false, //奖励弹窗

        page: 0,

      }
    },
    created() {
      this.$root.hub.$on("awardsBtn", _ => {
        this.isTutorial = true;
        this.awardsBtn();
      });
      this.getJson();
      if (this.member) {
        this.getMyInfo();
      }else {
        this.$repeatLogin();
        this.$root.hub.$on("loginSuccess", _ => {
          this.getMyInfo();
        })
      }

      this.courseStep = store.get("new_user_step");
    },
    methods:{
      getMyInfo(){
        this.member_info = store.get('member_info');
        this.member_info.nickname = this.member_info.nickname.replace("#趣玩","").replace("#掌盟","");
      },
      change(msg) {
        this.awardsShow = msg;
      },
      getJson() {
        let _this = this;
        let categoryID = "";
//         if (location.hostname == "mpm.lfl.gg" || location.hostname == "lfl.scoregg.net") {
//           categoryID = "1";
//         } else if(location.hostname == "staging-lfl.famulei.com") {
//           categoryID = "103";
//         } else if(location.hostname == "dev-lfl.scoregg.net"
//           || location.hostname == "localhost" ) {
//           categoryID = "1";
// //          categoryID = "103";
//         }

        let qid = store.get('loginInfo').type;
        axios.get( this.EVN() + 'third_exchange_action_list_' + qid + '.json')
          .then(response => {
            this.loading = true;
            this.action_list = response.data.data.action_list;
            this.$refs.myscroller.resize();
            // //新手引导
            // if(store.get('member_info').is_new_user == '1'){
            //
            //
            // }
          })
          .catch(function(err) {
//            this.loading = true;
            console.log(err);
          });
      },
      showAll(obj,obj2){
        if(obj==0){
          this.showMore=false;
          this.category1=this.category;
        }else{
          this.$router.push({path:'/goods', query: {categoryId:obj,categoryName:obj2}});
        }
      },
      screenShow(){
        if(this.flag){
          this.flag=false;
        }else{
          this.flag=true;
        }
      },
      chooseCategory(index,id,category_name){
        this.categoryName=category_name;
        this.flag=false;
        if(index==0){
          this.id=''
        }else{
          this.id=id
        }
        this.ison=index;

        this.choice()
      },
      choice(){
        var _this = this;
        _this.goodList = '';
        this.$api('/services/exchangeGoods/home_list.php', {
          category_id:this.id,
          exchange_status:1
        }).then(response => {
          _this.bannerList=response.data.top_rec_list;
          _this.goodList=response.data.action_list
        })
      },
      detailBtn(action_id,inventory,endTime){
        //商城兑换按钮添加统计
        this.pushEvent(store.get('loginInfo').type, 'mall_duihuan_btn', '');
        store.set('showBack','1');
        this.$router.push({
          path: "/MallGoodsDetail",
          query: {
            actionId:action_id,
            inventory:inventory,
            endTime:endTime,
          }
        });
      },
      awardsBtn () {  //触发弹窗
        this.awardsShow = true;
      },
      filterBtn (status) {
        this.tab_arg.forEach(function(item,i){
          if (status != i) {
            item.sort = '';
          }
        });
        this.tab_arg_status = status;
        if (this.action_list ){
          if (this.tab_arg[this.tab_arg_status].sort == '') {
            this.action_list.sort(this.compareDesc);
            this.tab_arg[this.tab_arg_status].sort = 'desc';
          } else if(this.tab_arg[this.tab_arg_status].sort == 'desc') {
            this.action_list.sort(this.compareAsc);
            this.tab_arg[this.tab_arg_status].sort = 'asc';
          } else if(this.tab_arg[this.tab_arg_status].sort == 'asc') {
            this.action_list.sort(this.compareDesc);
            this.tab_arg[this.tab_arg_status].sort = 'desc';
          }
        }
      },
      compareDesc(a,b){   //降序
        var arg = this.tab_arg[this.tab_arg_status].name;
        if (arg == 'start_date') {
          var val1 = new Date(a[arg]).getTime();
          var val2 = new Date(b[arg]).getTime();
        } else {
          var val1 = a[arg];
          var val2 = b[arg];
        }
        if (parseInt(val1) > parseInt(val2)) {
          return -1;
        } else if (parseInt(val1) < parseInt(val2)) {
          return 1;
        } else {
          return 0;
        }
      },
      compareAsc(a,b){   //升序
        var arg = this.tab_arg[this.tab_arg_status].name;
        if (arg == 'start_date') {
          var val1 = new Date(a[arg]).getTime();
          var val2 = new Date(b[arg]).getTime();
        } else {
          var val1 = a[arg];
          var val2 = b[arg];
        }
        if (parseInt(val1) < parseInt(val2)) {
          return -1;
        } else if (parseInt(val1) > parseInt(val2)) {
          return 1;
        } else {
          return 0;
        }
      },
      //更改商品列表显示方式
      changeMallList(type){
        this.mallListType = type;
      },
      //新手教程下一步按钮
      newUserNextBtn(step){
        if(step == '9'){
          store.set("new_user_step",'10');
          this.courseStep = '10';
        }else if(step == '10'){
          store.set("new_user_step",'11');
          this.courseStep = '11';
        }else if(step == '11'){
          store.set("new_user_step",'12');
          this.courseStep = '12';
          this.setNewUserTask(2);//设置第2阶段完成
          this.$refreshUserInfo();//刷新用户信息
          this.$router.push('/home')
        }
      },
      //设置新手任务步骤
      setNewUserTask(step){
        this.$api('/services/task/finish_task.php', {
          finish_type_id:step,
        }).then(response => {
          if (response.code == 200) {
            this.$repeatLogin;
          }else{
            layer.open({
              content: response.message,
              btn: '关闭'
            });
          }

        });
      },
    },
    mounted: function () {
      // this.awardsBtn();
      console.log(this.$store.state.mallListLight);
      if (this.$store.state.member) {
        this.getMyInfo();
      }
    },
  }
</script>

<style lang="stylus" scoped>

  /* 新手引导 */
  .tutorial2-4{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 452px;

      .desc-text{
        margin:0 auto;

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            //transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }


    }


  }


  /* 新手引导 */
  .tutorial2-5{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);
    display flex;justify-content center;align-items center;

    .content{
      width: 500px;
      position: absolute;
      z-index: 2;
      top: 452px;
      margin:0 auto;

      .modal{
        width:476px;
        height:480px;
        padding:150px 30px;
        background:url("../assets/image/success-modal-bg@2x.png") no-repeat top;
        border-radius:12px;
        display flex;justify-content center;align-items:flex-start;
        flex-wrap:wrap;
        position relative;


        .title{
          font-size:48px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(91,87,154,1);
          line-height:66px;
        }
        .desc{
          margin-top:24px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(91,87,154,1);
          line-height:44px;
        }
        .button{
          margin-top:44px;
          width:254px;
          height:64px;
          line-height @height;
          text-align center;
          background:rgba(83,72,255,1);
          border-radius:12px;
          font-size:24px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#fff;
        }

      }


    }


  }


  /* 新手引导 */
  .tutorial2-6{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);
    display flex;justify-content center;align-items center;

    .content{
      width: 500px;
      position: absolute;
      z-index: 2;
      top: 452px;
      margin:0 auto;

      .modal{
        width:476px;
        height:480px;
        padding:50px 30px;
        background:#fff;
        border-radius:12px;
        display flex;justify-content center;align-items:flex-start;
        flex-wrap:wrap;
        position relative;


        .icon{
          width:134px;
          height:154px;

        }
        .desc{
          margin-top:24px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(91,87,154,1);
          line-height:44px;
        }
        .button{
          margin-top:44px;
          width:254px;
          height:64px;
          line-height @height;
          text-align center;
          background:rgba(83,72,255,1);
          border-radius:12px;
          font-size:24px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#fff;
        }

      }


    }


  }










  @font-face {
    font-family: 'DIN-Condensed-Bold';
    src: url('../../static/css/DINCondensedBold.ttf'); /* IE9 Compat Modes */
    src: url('../../static/css/DINCondensedBold.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../../static/css/DINCondensedBold.ttf') format('woff'), /* Modern Browsers */
      url('../../static/css/DINCondensedBold.ttf')  format('truetype'), /* Safari, Android, iOS */
      url('../../static/css/DINCondensedBold.ttf') format('svg'); /* Legacy iOS */
  }
  @font-face {
    font-family: 'Semibold';
    src: url('../../static/css/Semibold.ttf'); /* IE9 Compat Modes */
    src: url('../../static/css/Semibold.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../../static/css/Semibold.ttf') format('woff'), /* Modern Browsers */
      url('../../static/css/Semibold.ttf')  format('truetype'), /* Safari, Android, iOS */
      url('../../static/css/Semibold.ttf') format('svg'); /* Legacy iOS */
  }

  .mt-10{margin-top:20px;}
  .pd-10{padding:20px;}
  .pd-14{padding:28px;}

  .icon{
    width: auto;
    height: auto;
    display:inline-flex;
    justify-content center;
    align-items center;
    padding:2px 14px;
    font-size:20px;
    border-radius:8px;
  }
  .icon.icon-pink{
    background:#F4A7BE;
    color:#fff;
  }
  .icon.icon-baby-blue{
    background:#B5B1FF;
    color:#fff;
  }


  .head-nav{
    background #fff;
    position fixed;
    z-index 50;
    left 0;
    right 0;
  }



  .head-user{
    display flex;
    justify-content space-between;
    align-items center;
    padding:0 28px;
    height:108px;
    background:linear-gradient(135deg,#B848FF 0%,#5348FF 100%);
    color:#fff;


    .user{
      display inline-flex;
      justify-content center;
      align-items center;
      font-size:28px;

      .avatar{
        width:80px;
        height:80px;
        margin-right:20px;
        border-radius: 50%;
      }
    }

    .guozi{
      display inline-flex;
      justify-content center;
      align-items center;
    }



    .conversion-btn{
      display inline-flex;
      justify-content center;
      align-items center;
      width:164px;
      height:60px;
      border:1px solid #fff;
      border-radius:6px;
      color: #fff;

      i {
        font-size:28px;
        margin-right:10px;
      }
    }


  }


  //筛选器
  .sizer{
    padding:0 60px;
    height 80px;
    background #fff;
    display flex;
    justify-content space-between;
    align-items center;
    font-size:28px;
    color:#B2B0D2;


    .item.active{
      color:#5348FF;
    }
    .item{
      width calc(100% / 3 - 60px);

      .caret-wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 34px;
        width: 24px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: relative;
      }

      .sort-caret {
        width: 0;
        height: 0;
        border: 8px solid transparent;
        position: absolute;
        left: 7px;
      }

      .sort-caret.ascending {
        border-bottom-color: #c0c4cc;
        top: -2px;
      }
      .sort-caret.descending {
        border-top-color: #c0c4cc;
        bottom: 0px;
      }
      .sort-caret.ascending.active{
        border-bottom-color: #5348ff;
      }
      .sort-caret.descending.active{
        border-top-color: #5348ff;
      }

    }
  }



  .goods-list{
    transition: all 0.3s;
    margin-bottom: 280px;
  }
  //垂直版本
  .goods-list.vertical{
    padding:20px 22px;
    display flex;
    justify-content space-between;
    flex-wrap: wrap;
    transition: all 0.3s;

    //商品列表
    .goods-item-card{
      width calc(100% / 2 - 11px);
      height:auto;
      background:#fff;
      border-radius:12px;
      margin:0px;
      position:relative;
      overflow:hidden;
      display:flex;
      flex-wrap: wrap;
      margin-bottom: 20px;

      .photo{
        width:100%;
        height auto;

        img {
          max-width: 100%;
          width 342px;
          height 342px;
        }
      }

      .info{
        width:100%;
        padding:20px;
        color:#B2B0D2;
        font-size:20px;

        span:nth-child(1){
          width 310px;
          display block;
          align-items: flex-start;
          flex-wrap: wrap;
          height:38px;
          margin-bottom:10px;
          font-size:28px;
          color:#5B579A;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow hidden;
        }
      }
    }



  }



  .goods-item-card{
    height:232px;
    background:#fff;
    border-radius:12px;
    margin:20px 28px 28px 28px;
    position:relative;
    overflow:hidden;
    display:flex;


    .photo{
      width: auto;
      height 100%;

      img {
        max-height 100%;
        height 100%;
      }
    }


    .info{
      padding:20px;
      color:#B2B0D2;
      font-size:20px;

      span{
        width 100%;
        display inline-flex;
        align-items center;
      }
      span:nth-child(1){
        width 430px;
        display block;
        align-items: flex-start;
        flex-wrap: wrap;
        font-size:28px;
        color:#5B579A;
        margin-bottom: 20px;
        height: 80px;

      }
      span:nth-child(4){
        margin-top:10px;
        color:#EF1B5A;
        font-size:28px;
      }

    }


    .icon{
      position absolute;
      right 20px;
      bottom:20px;
    }


  }



</style>
