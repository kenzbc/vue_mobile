<template>
  <div class="record anim-opacity2" title="兑换商城兑换记录">
    <div class="exchange-head">
      <head-top
        head-title="兑换记录"
        go-back="true"
      ></head-top>
    </div>
    <div class="record-cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="100">

      <div v-for="(item,index) in changeList">
        <router-link class="goods-item-card" :to="{path:'goodsDetail',query:{actionId:item.action_id,order_sn:item.order_sn,status:2}}">
        <div class="photo" v-if="item.image_url!=''"  :style="{'background':'url('+item.image_url+') center/cover no-repeat'}"></div>
        <div class="photo" v-else></div>
        <div class="info">
          <span class="goodsname">{{item.goods_name}}</span>
          <span class="c-rose-red" v-if="item.order_status == '1' && item.good_type == '1'">兑换成功，奖励已发放</span>
          <span class="c-rose-red" v-else-if="item.order_status == '2' && item.good_type == '1'">正在处理中，请联系客服领取奖品</span>
          <span class="c-rose-red" v-else>{{item.status}}</span>
          <span class="footer">
            <span class="c-rose-red money">{{item.price}}&nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></span>
            <span>
              <span class="icon icon-light-orange">限量</span>
              <!--<span class="icon icon-pink" v-if="item.goods_type == '1'">虚拟</span>-->
              <!--<span class="icon icon-baby-blue" v-if="item.goods_type == '2'">实体</span>-->
            </span>
          </span>
          <span class="detail-icon"><i class="iconfont">&#xe6fc;</i></span>
        </div>
        </router-link>
      </div>

      <div class="message"><img v-if="loading" src="/static/images/loading.gif" width="20"> {{message}}</div>
    </div>



    <div class="exchange-null" v-show="loading && changeList == ''">
      <img src="../../static/images/pic_404.png" alt="">
      <p>暂无记录</p>
    </div>

  </div>
</template>

<script>
  import HeadTop from '../components/header.vue'
  import loading from '../components/loading.vue'
export default {
  name: 'mall',
  data () {
    return {
      guoziIcon:this.$store.state.guoziIcon,
      changeList:[],
      busy: false,
      loading:false,
      isAll:0,
      pageNo:1,
      orderSn:'',
      loaded:0,
    }
  },
  created(){
  	if(this.member){

    } else {
//    if (!this.member) {
      this.$repeatLogin();
      this.$root.hub.$on("loginSuccess", _ => {
      })
    }
  },
  methods:{
    loadMore(){
      if (this.isAll == 0) {
        this.busy = true;
        setTimeout(() => {
          this.loadTop();
        }, 1000);
      }
    },
    loadTop(){
      var _this=this;
      if(_this.isAll != 0){
        return false;
      }

      this.message = '加载中...';
      this.loading = true;

      this.$api('/services/exchangeGoods/exchange_list.php', {
        start_order_sn:this.orderSn,
        page:this.pageNo,
        limit:10
      }).then(response => {
        if(response.code == 200 ){
          if(response.data.list.length == 0){
            _this.isAll = 1;
            _this.loading = false;
            _this.message = '暂无更多内容';
          }else{
            _this.pageNo++;
          }

          _this.orderSn = response.data.list[response.data.list.length-1].order_sn;

          _this.changeList =  _this.changeList.concat(response.data.list);
        }
        _this.loading = false;
        _this.busy = false;
      });


    }
  },
  components: {
    headTop:HeadTop,
    loading
  },
  computed: {
    member () {
      return this.$store.state.member
    },
  }
}
</script>

<style lang="stylus" scoped>
  .message{
    padding:20px 0;
    text-align:center;
    color: #d7d6f8;
  }
.record .exchange-head{
  position: fixed;
  top:0;
  left:0;
  height:90px;
  width:100%;
  z-index: 20;
}
/*.record  .exchange-null{*/
    /*position: fixed;*/
    /*top:50%;*/
    /*left:50%;*/
    /*margin-top:-150px;*/
    /*margin-left:-140px;*/
  /*}*/
.record .exchange-null img{
  height:200px;
  width:200px;
}
.record .exchange-null p{
  text-align:center;
  font-size:28px;
  color: #999;
}
.record .record-cont{
  margin-top: 110px;
}
.record .record-cont-first{
  padding:24px 40px 26px 24px;
  border-bottom:1px solid #eeeeee;
}
.record .record-cont-first ul{
  display: flex;
  display: -webkit-flex;
  height:160px;
}
.record .record-cont-first ul li:nth-of-type(1){
  flex: 0 0 160px;
}
.record .record-cont-first ul .mall-img-bg{
  background: url("../../static/images/mallimg.png") center/cover no-repeat;
}
.record .record-cont-first ul li:nth-of-type(1) img{
  width: 160px;
}
.record .record-cont-first ul li:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(1){
  font-size:24px;
  color: #999;
  padding-left: 24px;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(2){
  font-size:28px;
  color: #333;
  /*margin-top:10px;*/
  padding-left: 24px;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(3){
  padding-left: 28px;
  font-size:32px;
  color: #606060;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(3)>span{
  display:block;
  float: left;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(3)>span:nth-of-type(1){
  font-size:24px;
  color: #606060;
  margin-top:10px;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(3)>span:nth-of-type(1) .price {
  font-size: 32px;
  color: #FA9B3C;
  line-height: 28px;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(3) span:nth-of-type(2){
  font-size:24px;
  color: #f89c2d;
  border:1px solid #f89c2d;
  padding:2px 6px 4px;
  border-radius:8px 8px;
  margin-top:8px;
  margin-left:24px;
}
.record .mall-guozi{
  width:26px;
  height:26px;
  vertical-align: middle;
  margin-bottom:4px;
}
.record .record-cont-first ul li:nth-of-type(2) p:nth-of-type(4){
  margin-top:12px;
  font-size:26px;
  width:480px;
  color: #ff5151;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 24px;
}
.record .record-cont-first ul li:nth-of-type(3){
  flex: 0 0 46px;
  line-height:160px;
  text-align: right;
}
.record .record-cont-first ul li:nth-of-type(3) i{
  font-size: 30px;
  color: #a0a0a0;
}
.record .record-cont-first ul li:nth-of-type(3) p .price {
  font-size: 32px;
  color: #FA9B3C;
}


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
  .icon.icon-light-orange{
    background:#FCB28C;
    color:#fff;
  }

  //商品列表
  .goods-item-card {
    height: auto;
    background: #fff;
    border-radius: 12px;
    margin: 24px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    .photo {
      width: 180px;
      height: 180px;
      background: url("../../static/images/mallimg.png") center / cover no-repeat;

      img {
        max-width: 100%;
        width 342px;
        height 342px;
      }
    }

    .info {
      width:calc(100% - 180px);
      padding:10px 20px 0 20px;
      color: #B2B0D2;
      font-size: 20px;
      position relative;

      .footer{
        padding-top:38px;
        display flex;
        justify-content space-between;
        align-items center;

        .money{
          display flex;
          align-items center;
          font-size:28px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#EF1B5A;
          line-height:40px;
        }
      }

      .goodsname{
        display block;
        height: 38px;
        margin-bottom: 10px;
        padding-right:10px;
        font-size: 28px;
        color: #5B579A;
        font-family:PingFangSC-Medium;
        font-weight:500;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .detail-icon{
        position absolute;
        top:24px;
        right:20px;
      }
    }
  }




</style>
