<template>
  <div class="diamond_list anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="购买钥匙"
        go-back="true"
      ></head-top>
    </div>
    <div class="diamond_banner">
      <swiper ref="mySwiper" v-if="key_list.banner_list != []">
        <swiper-slide v-for="(items,index) in key_list.banner_list" :key="index">
          <a :href="items.go_url_web" class="banner_img"><img :src="items.image_url" width="100%"><!-- <p class="banner_title font_white" v-html="items.name"></p> --></a>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
    <div class="tickts_lists key_lists">
      <ul>
        <li v-for="item in key_list.list" @click="choosePay(item.sku_id,item.diamond_number,key_list.diamond_number,item.fantasy_key)">
          <label class="fll logo"><img src="static/images/key_logo.png"></label>
          <label class="fll arrow"><em></em></label>
          <label class="fll price"><img :src="'static/images/key_'+ item.fantasy_key + '.png' "></label>
          <p class="fll ticket">- 钥匙 -</p>
          <label class="flr diamond"><p><i class="iconfont">&#xe6f0;</i> <span>{{item.diamond_number}}</span></p></label>
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
  import axios from 'axios'
export default {
  name: 'key_list',
  data () {
    return {
      vShow:false,
      key_list:'',
      payList:{
        sku_id:'',
        status:'',
        index:'',  //1:钻石成功  2.钻石失败  3.门票成功  4.门票失败  5.钥匙成功  6.钥匙失败
        diamond_number:'',
        fantasy_key:''
      },
      order_id:'5149820500315050489',
      get_pay_result:'',
    }
  },
  created(){
    let member_info = store.get('member_info');
//    var avatar=JSON.parse(sessionStorage.getItem('avatar'));
    if(member_info == undefined){
      this.$router.push({path:'/login', query: { states:'5'}});
    }
  },
  mounted(){
    this.getData();
    if(this.$route.query.order_id){
      this.order_id = this.$route.query.order_id;
      this.IsSuccess(this.order_id)
    }
  },
  methods:{
    getData(){
      var _this = this;
      this.$api('/services/fantasy/key_list.php', {
      }).then(response => {
      	if(response.code == 200){
          _this.key_list = response.data
        }
      })

      //跨域
//      axios.get('http://dev-api.famulei.com/services/fantasy/key_list.php?sign=6F629A7AB37E86071A7EE8B5DCBB6EA7&api_version=4.0.0&member_id=&token=')
//        .then(function (response) {
//          _this.key_list = response.data.data
//          console.log(_this.key_list)
//        })
//        .catch(function (error) {
//          alert(error.data.message)
//        })
    },
    choosePay(sku_id,diamond_number,total_diamond_number,fantasy_key){
      this.payList.sku_id = sku_id;
      this.payList.status = 0;
      if(diamond_number <= parseInt(total_diamond_number)){
        this.payList.index = 5;
        this.payList.fantasy_key = fantasy_key;
        this.payList.diamond_number = diamond_number;
//        console.log(this.payList)
      }else{
        this.payList.index = 4
      }
      this.vShow = true
    },
    change(msg){
      this.vShow = msg
      // console.log(msg)
    },
    IsSuccess(order_id){
//      var _this = this
//      this.ajax('fantasy/get_pay_result.php', {
//        order_id:order_id,
//        platform:'H5',
//        // pass:true
//      }, function (response) {
//        if(response.data.code == 200){
//          _this.get_pay_result = response.data.data
//          _this.payList.status = 0
//          _this.payList.index = 1
//          _this.payList.diamond_number = _this.get_pay_result.diamond_number
//          _this.payList.buy_number = _this.get_pay_result.buy_number
//          _this.payList.sku_diamond_number = _this.get_pay_result.sku_diamond_number
//          _this.payList.first_prize = _this.get_pay_result.first_prize
//          _this.payList.pmt_rule_diamond_number = _this.get_pay_result.pmt_rule_diamond_number
//          _this.vShow = true
//        }else{
//          _this.payList.status = 0
//          _this.payList.index = 2
//          _this.vShow = true
//        }
//      })
    }
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
.key_lists li{
  background: url('../../static/images/bg_key.png')no-repeat;
}

</style>
