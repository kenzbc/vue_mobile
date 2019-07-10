<template>
  <div class="anim-opacity2">
    <div class="goods">
      <div class="exchange-head">
        <head-top
          :head-title="categoryName"
          go-back="true"
        ></head-top>
      </div>
      <div class="exchange-cont">

        <div class="exchange-cont-body">
          <ul class="goods-change">
            <li @click="orderTime()">
              <p v-bind:class="{'yellow-bg3':flag1==0,'yellow-bg2':flag1==1}">上架时间</p>
              <p><i v-bind:class="{'yellow-bg':flag1==0}"  class="iconfont">&#xe6d6;</i><i v-bind:class="{'yellow-bg':flag1==1}" class="iconfont">&#xe6e3;</i></p>
            </li>
            <li @click="orderMonay()">
              <p v-bind:class="{'yellow-bg3':flag2==0,'yellow-bg2':flag2==1}">兑换价格</p>
              <p><i v-bind:class="{'yellow-bg':flag2==0}"  class="iconfont">&#xe6d6;</i><i v-bind:class="{'yellow-bg':flag2==1}" class="iconfont">&#xe6e3;</i></p>
            </li>
            <li @click="orderNum()">
              <p v-bind:class="{'yellow-bg3':flag3==0,'yellow-bg2':flag3==1}">剩余数量</p>
              <p><i v-bind:class="{'yellow-bg':flag3==0}"  class="iconfont">&#xe6d6;</i><i v-bind:class="{'yellow-bg':flag3==1}" class="iconfont">&#xe6e3;</i></p>
            </li>
          </ul>
          <div class="exchange-cont-body-first cl">
            <div v-for="(items,index) in goodList" v-bind:class="{'exchange-cont-body-first-left': index%2==0,'exchange-cont-body-first-right': index%2==1}"  >
              <router-link :to="{path:'goodsDetail',query:{actionId:items.action_id}}">
                <div class="exchange-first-title">
                  <p>{{items.category_name}}</p>
                  <p><img v-if="items.type==1||items.type==3" src="../../static/images/xuni.png" alt=""><img v-else-if="items.type==2" src="../../static/images/shiti.png" alt=""></p>
                </div>
                <div class="exchange-first-name">{{items.goods_name}}</div>
                <div class="exchange-first-guozi">{{items.price}} <svg v-if="items.e_type==0" aria-hidden="true" class="mall-guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg><svg v-else-if="items.e_type==1" aria-hidden="true" class="mall-guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use></svg></div>
                <div class="exchange-first-product">
                  <div class="exchange-first-product-left"><p>剩余{{items.exchange_times}}份</p><p>截止到{{items.end_date}}</p></div>
                  <div class="exchange-first-product-right" v-if="items.image_url!=''"  :style="{'background':'url('+items.image_url+') center/cover no-repeat'}"></div>
                  <div class="exchange-first-product-right1" v-else ></div>
                </div>
              </router-link>

            </div>
            <!--<div class="exchange-cont-body-first-right">
              <div class="exchange-first-title">
                <p>微章</p>
                <p><img src="../../static/images/shiti.png" alt=""></p>
              </div>
              <div class="exchange-first-name">来说都看过了多少公开</div>
              <div class="exchange-first-guozi">78888 <svg  aria-hidden="true" class="mall-guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></div>
              <div class="exchange-first-product">
                <div class="exchange-first-product-left"><p>2016.9.17~ 2016.9.17</p></div>
                <div class="exchange-first-product-right"><img src="http://img1.famulei.com/z/0/p/178/0213570029698.jpg?x-oss-process=image/resize,m_fill,h_90,w_120,limit_0" alt=""></div>
              </div>
            </div>-->
          </div>

        </div>
      </div>
      <!--<div class="exchange-guozi"><p>可兑换果子 : {{guozi}} <svg  aria-hidden="true" class="mall-guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p></div>-->
      <div class="exchange-null" style="display: none;">
        <img src="../../static/images/pic_404.png" alt="">
        <p>暂未开放</p>
      </div>



    </div>
    <loading v-show="loading==false"></loading>
  </div>
</template>

<script>
  import loading from '../components/loading.vue'
  import HeadTop from '../components/header.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'mall',
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          mousewheelControl: true,
        },
        bannerList:'',
          flag:false,
          ison:'',
          category:'',
        categoryName:'',
        id:'0',
        goodList:'',
        loading:false,
        amount:'',
        guozi:'',
        flag1:1,
        flag2:3,
        flag3:3,
        order_key:'add_time',
        order_by:'desc',
        categoryName:'全部'
      }
    },
    created() {
      this.categoryName=this.$route.query.categoryName
      this.choice(this.order_key,this.order_by)
    },
    methods:{
      orderTime(){
        this.flag2=3;
        this.flag3=3;
          if(this.flag1==0){
            this.flag1=1;
            this.order_key='add_time';
            this.order_by='desc'
            this.choice(this.order_key,this.order_by)
          }else if(this.flag1==1){
            this.flag1=0;
            this.order_key='add_time'
            this.order_by='asc'
            this.choice(this.order_key,this.order_by)
          }else if(this.flag1==3){
            this.flag1=1;
            this.order_key='add_time';
            this.order_by='desc'
            this.choice(this.order_key,this.order_by)
          }

      },
      orderMonay(){
        this.flag1=3;
        this.flag3=3;
        if(this.flag2==0){
          this.flag2=1;
          this.order_key='price'
          this.order_by='desc'
          this.choice(this.order_key,this.order_by)
        }else if(this.flag2==1){
          this.flag2=0;
          this.order_key='price'
          this.order_by='asc'
          this.choice(this.order_key,this.order_by)
        }else if(this.flag2==3){
          this.flag2=1;
          this.order_key='price'
          this.order_by='desc'
          this.choice(this.order_key,this.order_by)
        }

      },
      orderNum(){
        this.flag1=3;
        this.flag2=3;
        if(this.flag3==0){
          this.flag3=1;
          this.order_key='exchange_times'
          this.order_by='desc'
          this.choice(this.order_key,this.order_by)
        }else if(this.flag3==1){
          this.flag3=0;
          this.order_key='exchange_times'
          this.order_by='asc'
          this.choice(this.order_key,this.order_by)
        }else if(this.flag3==3){
          this.flag3=1;
          this.order_key='exchange_times'
          this.order_by='desc'
          this.choice(this.order_key,this.order_by)
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
      choice(obj,obj1){
        var _this=this;
        this.$api('/services/exchangeGoods/action_list.php', {
          category_id:this.$route.query.categoryId,
          order_key:obj,
          order_by:obj1
        }).then(response => {
          if(response.code==200){
            _this.loading=true;
          }
          _this.goodList=response.data.action_list;
        });
      }
    },
    components: {
      headTop:HeadTop,
      swiper,
      swiperSlide,
      loading
    }
  }
</script>

<style>
  .goods{
    margin-top:90px;
  }
  .goods .mall-background{
    background: #e3c600;
  }
  .goods .exchange-head{
    position: fixed;
    top:0;
    left:0;
    height:90px;
    width:100%;
    z-index: 20;
  }
  .goods .exchange-null{
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-100px;
    margin-left:-100px;
  }
  .goods .screen-icon{
    height:30px;
    width:30px;
    vertical-align: middle;
    margin-bottom:3px;
  }
  /*.goods .exchange-null img{*/
    /*height:200px;*/
    /*width:200px;*/
  /*}*/
  .goods .exchange-null p{
    text-align:center;
    font-size:28px;
    color: #999;
  }
  .goods  .exchange-cont-header{
    position: relative;
  }
  .goods  .exchange-cont-header-top{
    display: flex;
    display: -webkit-flex;
    height:80px;
    line-height:80px;
    background: #fff;
    border-bottom:1px solid #eeeeee;
    text-align: center;

  }

  .goods  .exchange-cont-header p:nth-of-type(1){
    -webkit-box-flex: 1;
    flex: 1;
    text-align: right;
    margin-right: 10px;
  }
  .goods  .exchange-cont-header p:nth-of-type(1) span, .exchange  .exchange-cont-header p:nth-of-type(3) span{
    display: inline-block;
    height:2px;
    width:40px;
    background: #999;
    margin-bottom: 5px;
  }
  .goods  .exchange-cont-header p:nth-of-type(2){
    flex: 0 0 113px;
    text-align: right;
    font-size:28px;
    color: red;
    font-weight:bold;
  }
  .goods  .exchange-cont-header p:nth-of-type(3){
    -webkit-box-flex: 1;
    flex: 1;
    text-align: left;
    font-size:26px;
    margin-left: 10px;
  }
  .goods .exchange-cont-body-first{

  }
  .goods .exchange-cont-body-first .exchange-cont-body-first-left{
    float: left;
    width:376px;
    border-right:1px solid #eeeeee;
    border-bottom:1px solid #eeeeee;
    background: #fff;
  }
  .goods .exchange-cont-body-first .exchange-cont-body-first-right{
    float: left;
    width:374px;
    border-bottom:1px solid #eeeeee;
    background: #fff;
  }
  .goods  .exchange-first-title{
    display: flex;
    display: -webkit-flex;
    font-size:28px;
    color: #999;
  }
  .goods  .exchange-first-title p{
    -webkit-box-flex: 1;
    flex: 1;
  }
  .goods  .exchange-first-title p:nth-of-type(1){
    margin:30px 0 10px 24px;
  }
  .goods  .exchange-first-title p:nth-of-type(2){
    text-align: right;
  }
  .goods  .exchange-first-name{
    margin:10px 0 0 24px;
    font-size:28px;
    color: #606060;
    width:340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods  .exchange-first-guozi{
    margin:24px 0 0 24px;
    font-size:28px;
    color: #FF6000;
  }
  .goods .mall-guozi{
    width:24px;
    height:24px;
    vertical-align: middle;
    margin-bottom:4px;
  }
  .goods .exchange-first-product{
    margin:24px;
    display: flex;
    display: -webkit-flex;
  }
  .goods .exchange-first-product-left{
    flex: 0 0 150px;
    margin-top:70px;
  }
  .goods .exchange-first-product-left p{
    margin-top: 10px;
    font-size:18px;
    color: #606060;
  }
  .goods .exchange-first-product-right{
    margin-left:24px;
    flex: 0 0 150px;
    height:150px;
  }
  .goods .exchange-first-product-right1{
    margin-left:24px;
    flex: 0 0 150px;
    height:150px;
    background: url("../../static/images/mallimg.png") center/cover no-repeat;
  }
  .goods .exchange-first-product-right img{
    width:150px;
  }

  .goods .exchange-guozi{
    position: fixed;
    bottom:98px;
    background: #fff;
    height:80px;
    line-height:80px;
    width:100%;
    text-align: right;
    font-size:28px;
  }
  .goods .exchange-guozi p{
    color: #373a41;
    padding-right:24px;
  }
  .goods .exchange-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
  .goods .exchange-screening-mask{
    position: absolute;
    z-index: 101;
    top:170px;
    right:30px;
  }
  .goods .exchange-screening{
    max-height:240px;
    width:200px;
    background: #fddc00;
    border-radius:8px;
    overflow: scroll;
  }
  .goods .exchange-arrow{
    position: absolute;
    right:20px;
    top:-28px;
  }
  .goods .exchange-arrow i{
    font-size: 30px;
    color: #fddc00;
  }
  .goods .exchange-screening ul li{
    height:60px;
    line-height:60px;
    text-align: center;
    font-size:24px;
    color: #333333;
    width:194px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .goods .fade-enter-active,.fade-leave-active{
    transition: all 0.05s
  }
  .goods .fade-enter, .fade-leave-active{
    background: rgba(7, 17, 27, 0)
  }
  .goods .exchange-category_list{
    background: #fff;
    margin:14px auto;
    padding: 30px 10px 0;
  }
  .goods .exchange-category_list li{
    float: left;
    width: 146px;
    text-align: center;
  }
  .goods .exchange-category_list li img{
    height:70px;
    width: 70px;
    vertical-align: middle;
  }
  .goods .exchange-category_list li p{
    font-size: 26px;
    padding: 12px 0 24px;
  }
  .goods .goods-change{
    height:80px;
    background: #fff;
    border-bottom:1px solid #dfdfdf;
    display: flex;
    display: -webkit-flex;
  }
  .goods .goods-change li{
    -webkit-box-flex: 1;
    flex: 1;
    display: flex;
    display: -webkit-flex;
  }
  .goods .goods-change li p:nth-of-type(1){
    -webkit-box-flex: 2;
    flex: 2;
    text-align: right;
    line-height: 80px;
    font-size: 28px;
  }
  .goods .goods-change li p:nth-of-type(2){
    margin-left: 10px;
    margin-top: 24px;
    -webkit-box-flex: 1;
    flex: 1;
    text-align: left;
  }
  .goods .goods-change li p:nth-of-type(2) i{
    display: block;
    font-size: 16px;
    color: #c9c9c9;
  }
  .goods .goods-change li p:nth-of-type(2) .yellow-bg{
    color: #fe892c;
  }
  .goods .goods-change li  .yellow-bg2{
    color: #fe892c;
  }
  .goods .goods-change li  .yellow-bg3{
    color: #fe892c;
  }
</style>
