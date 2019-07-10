<template>
  <div class="diamond_list anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="购买钻石"
        go-back="true"
      ></head-top>
    </div>
    <div class="diamond_banner">
      <swiper ref="mySwiper" v-if="diamond_list.banner_list != []">
        <swiper-slide v-for="(items,index) in diamond_list.banner_list" :key="index">
          <a :href="items.go_url_web" class="banner_img"><img :src="items.image_url" width="100%"><!-- <p class="banner_title font_white" v-html="items.name"></p> --></a>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
    <div class="diamond_lists">
      <ul>
        <li v-for="item in diamond_list.list" @click="choosePay(item.sku_id)">
          <div class="left fll">
            <img class="icon_diamond_light" src="../../static/images/icon_diamond_light.png">
            <img class="icon_mark" src="../../static/images/icon_mark_1.png" v-if="item.has_first_prize == 0 && item.first_prize > 0">
            <img class="icon_mark" src="../../static/images/icon_mark_2.png" v-else-if="item.has_pmt == 1">
          </div>
          <div class="center fll">
            <p class="mounted_width font_color_red">
              <span>{{item.sku_name}}</span>
              <span class="font_color_red" v-if="item.has_first_prize == 0 && item.first_prize > 0">{{item.first_desc}}</span>
              <span class="font_color_red" v-else>{{item.sku_desc}}</span>
            </p>
            <p class="mounted_width" >
              <span class="font_color_oran" v-if="item.has_pmt == 1">{{item.pmt_name}}<span class="font_color_oran" v-if="item.pmt_name!=''">：</span></span>{{item.rule_desc}}</p>
          </div>
          <div class="right flr">
            <p>￥<span>{{item.sku_price}}</span> </p>
          </div>
          <div class="circle top"></div>
          <div class="circle bottom"></div>
        </li>
      </ul>
    </div>
    <!-- 弹框 -->
    <dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>
  </div>
</template>

<script>

  import store from 'store'
  import HeadTop from '../components/header.vue'
  import DialogPay from '../components/dialogPay.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'diamond_list',
  data () {
    return {
      vShow:false,
      diamond_list:'',
      payList:{
        sku_id:'',
        status:'',
        index:'',  //1:钻石成功  2.钻石失败  3.门票成功  4.门票失败
        diamond_number:'',
        buy_number:'',
        sku_diamond_number:'',
        first_prize:'',
        pmt_rule_diamond_number:''
      },
      out_trade_no:'',
      get_pay_result:'',
    }
  },
  created(){
    let member_info = store.get('member_info');
    if(member_info == undefined){
      this.$router.push({path:'/home'});
    }
//    if(JSON.parse(sessionStorage.getItem('avatar'))==null){
//      this.$router.push({path:'/home'});
//    }else{
//      if(JSON.parse(sessionStorage.getItem('avatar'))==''){
//        this.$router.push({path:'/home'});
//      }
//    }
  },
  mounted(){
    this.getData();
    if(this.$route.query.out_trade_no){
      this.out_trade_no = this.$route.query.out_trade_no
      this.IsSuccess(this.out_trade_no)
    }
  },
  methods:{
    getData(){
      var _this = this;
      this.$api('/services/fantasy/diamond_list.php', {
        platform:'H5',
        // pass:true
      }).then(response => {
        //console.log(response)
        if(response.code == 200){
          _this.diamond_list = response.data
        }

      })
    },
    choosePay(sku_id){
      this.payList.sku_id = sku_id;
      this.payList.status = 1;

      this.vShow = true
      // alert('选择支付')
    },
    change(msg){
      this.vShow = msg
      // console.log(msg)
    },
    IsSuccess(order_id){
      var _this = this;
      this.$api('/services/fantasy/get_pay_result.php', {
        order_id:order_id,
        platform:'H5',
        // pass:true
      }).then(response => {
        if(response.code == 200){
          _this.get_pay_result = response.data;
          _this.payList.status = 0;
          _this.payList.index = 1;
          _this.payList.diamond_number = _this.get_pay_result.diamond_number;
          _this.payList.buy_number = _this.get_pay_result.buy_number;
          _this.payList.sku_diamond_number = _this.get_pay_result.sku_diamond_number;
          _this.payList.first_prize = _this.get_pay_result.first_prize;
          _this.payList.pmt_rule_diamond_number = _this.get_pay_result.pmt_rule_diamond_number;
          _this.vShow = true
        }else{
          _this.payList.status = 0;
          _this.payList.index = 2;
          _this.vShow = true
        }
      })
    },

  },
  components: {
    headTop:HeadTop,
    dialogPay:DialogPay,
    swiper,
    swiperSlide,
  }
}
</script>

<style>
.diamond_banner{
  width: 100%;
  margin-top:90px;
}
.diamond_banner img{
  width: 100%;
  display: block;
}

.diamond_banner .banner_img{
  display: block;
  position: relative;
  overflow: hidden;
  height:300px;
}
.diamond_lists{
  margin:0 24px 20px;
  color:#373a41;
}
.diamond_lists ul{ padding-top: 20px;}
.diamond_lists li{
  background: #fff;
  margin-bottom:20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.diamond_lists li .left{
  width: 132px;
  position: relative;
}
.mounted_width{
  width: 390px;
  height:36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mounted_width span:first-Child.font_color_oran{
  color:#fe892c;
}
.mounted_width span:first-Child{
  color:#333;
}
.diamond_lists li .left img{
  display: block;
}
.icon_diamond_light{
  position: absolute;
  top:0;
  margin:22px;
}
.icon_mark{
  position: absolute;
}
.diamond_lists li .center{
  /*margin-left:132px;*/

  position: absolute;
  left:132px;
  top:0;
  padding:28px 0;
  width: 400px;
  height:100%;
}
.diamond_lists li .center p{
  line-height: 30px;

}
.diamond_lists li .center p:first-Child{
  margin-bottom:6px;
}
.diamond_lists li .center p:first-Child span:first-Child{
  font-size:36px;
  margin-right:20px;
}
.diamond_lists li .right{
  width: 166px;
  background: #0C9DFC;
  height: 100%;
}
.diamond_lists li .right p{
  text-align: right;
  color:#fff;
  font-size:30px;
  margin:40px 18px 15px;
  line-height:60px;
}
.diamond_lists li .right p span{
  font-size:60px;
}

.font_color_oran{
  color:#fe892c;
}
.font_color_red{
  color:#f83030;
}
.diamond_lists li .circle{
  position: absolute;
  right:156px;
  background: #f1f1f1;
  width: 20px;
  height:20px;
  border-radius: 50%;
}
.diamond_lists li .top{
  top:-10px;
}
.diamond_lists li .bottom{
  bottom:-10px;
}


        .swiper {
            height: 200px;
            margin-bottom: 80px;
        }

        .swiper-wrap > div {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 48px;
            color: #fff;
        }

        .swiper-wrap > div:nth-child(3n) {
            background-color: skyblue;
        }

        .swiper-wrap > div:nth-child(3n + 1) {
            background-color: yellowgreen;
        }

        .swiper-wrap > div:nth-child(3n + 2) {
            background-color: rosybrown;
        }

        #append_child {
            text-align: center;
            margin-bottom: 80px;
        }

        #swiper_children_size {
            height: 400px;
        }

        #swiper_children_size .slide-1 {
            height: 200px;
        }

        #swiper_children_size .slide-2 {
            height: 150px;
        }

        #swiper_children_size .slide-3 {
            height: 100px;
        }

        #swiper_children_size .slide-4 {
            height: 350px;
        }

        .swiper-nested-inner {
            width: 100%;
            height: 100%;
            margin-bottom: 0;
        }
</style>
