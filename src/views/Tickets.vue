<template>
  <div class="diamond_list anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="购买门票"
        go-back="true"
      ></head-top>
    </div>
    <div class="diamond_banner">
      <swiper ref="mySwiper" v-if="tickts_list.banner_list != []">
        <swiper-slide v-for="(items,index) in tickts_list.banner_list" :key="index">
          <a :href="items.go_url_web" class="banner_img"><img :src="items.image_url" width="100%"><!-- <p class="banner_title font_white" v-html="items.name"></p> --></a>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
    <div class="tickts_lists">
      <ul>
        <li v-for="item in tickts_list.list" @click="choosePay(item.sku_id,item.diamond_number,tickts_list.diamond_number,item.ticket)">
          <label class="fll logo"><img src="../../static/images/ticket_w.png"></label>
          <label class="fll arrow"><em></em></label>
          <label class="fll price"><img :src="'static/images/tickets_'+ item.ticket + '.png' "></label>
          <p class="fll ticket">- 门票 -</p>
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
export default {
  name: 'tickts_list',
  data () {
    return {
      vShow:false,
      tickts_list:'',
      payList:{
        sku_id:'',
        status:'',
        index:'',  //1:钻石成功  2.钻石失败  3.门票成功  4.门票失败
        diamond_number:'',
        ticket:''
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
      this.$api('/services/fantasy/ticket_list.php', {
        // pass:true
      }).then(response => {
        _this.tickts_list = response.data
      })
    },
    choosePay(sku_id,diamond_number,total_diamond_number,ticket){
      this.payList.sku_id = sku_id;
      this.payList.status = 0;
      if(diamond_number <= parseInt(total_diamond_number)){
        this.payList.index = 3;
        this.payList.ticket = ticket;
        this.payList.diamond_number = diamond_number
      }else{
        this.payList.index = 4
      }
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
.tickts_lists{
  margin:0 24px 20px;
  color:#373a41;
}
.tickts_lists ul{ padding-top: 20px;}
.tickts_lists li{
  margin-bottom:20px;
  height:128px;
  line-height: 128px;
  background: url('../../static/images/bg_tickets.png')no-repeat;
  overflow: hidden;
}
.tickts_lists li label{
  display: block;
}
.tickts_lists li .logo{
  height:84px;
  margin:22px 26px 22px 22px;
}
.tickts_lists li .logo i{
  font-size:84px;
  color:#fff;
}
.tickts_lists li .arrow{
  width: 10px;
  height:128px;
  position: relative;
}
.tickts_lists li .arrow em{
  position: absolute;
  top:50%;
  width:0;
  height:0;
  border: 15px solid transparent;
  border-left-color: #fff;
  transform: translate(0,-50%);
}
.tickts_lists li .price{
  margin-left:36px;
  width: 136px;
  margin-right:32px;
}
.tickts_lists li .price img{
  display: block;
  margin-top:42px;
}
.tickts_lists li .ticket{
  color:#fff;
  font-size:28px;
}
.tickts_lists li .diamond{
  width: 206px;
}
.tickts_lists li .diamond p{
  text-align: center;
}
.tickts_lists li .diamond i{
  font-size:30px;
  color:#0C9DFC;
  margin-bottom:-5px;
}
.tickts_lists li .diamond span{
  font-size:60px;
  color:#0C9DFC;
}
</style>
