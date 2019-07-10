<template>
  <div class="goodsDetail anim-opacity2">
    <div class="goodsDetail-head">
      <head-top
        :head-title="hTitle"
        go-back="true"
      ></head-top>
    </div>

    <!-- 弹框 -->
    <dialog-exchange v-if="exchangeShow" @dialogHide="change" :msg="exchangeShow"
                     :exchange-list="exchangeData"></dialog-exchange>

    <div class="goodsDetail-body">
      <div class="goodsDetail-body-cover">
        <img v-if="detailList.image_url==''" src="../../static/images/mallimg.png" alt="">
        <img v-else :src="detailList.image_url + '?x-oss-process=image/resize,m_fill,h_500,w_750'" alt="">
      </div>

      <div class="goodsInfo">
        <div class="goodsDetail-body-title">{{detailList.goods_name}}</div>
        <div class="goodsDetail-body-name">
        <span class="money">{{detailList.price}}
          <svg style="width:24px;height:24px;" aria-hidden="true">
              <use xlink:href="#icon-JFx"></use>
          </svg>
        </span>
          <span>
          <!--<span class="icon icon-pink" v-if="detailList.good_type == '1'">虚拟</span>-->
          <!--<span class="icon icon-baby-blue" v-if="detailList.good_type == '2'">实体</span>-->
        </span>
        </div>
      </div>

      <div class="goodsDetail_exchange" v-if="param.status == 2">
        <p class="title success" v-if="is_success == true">{{callback_message}}</p>
        <p class="title" v-else>{{callback_message}}</p>
        <!--<p class="title success" v-if="is_success == true">兑换成功！</p>-->
        <!--<p class="title" v-else>正在处理中，请耐心等候</p>-->
        <section v-if="is_success == true" class="">

          <div class="section repeat_code_container">
            <div class="sec-body">
              <div class="content">
                <p class="order_sn">请凭订单号和兑换码，联系客服兑换</p>
                <span class="sn_code">
                  <span>订单编号：{{detailList.order_sn}}</span>
                  <span v-if="detailList.code">兑换码：{{detailList.code}}</span>
                  <span v-if="detailList.desc">备注：{{detailList.desc}}</span>
                </span>
              </div>
              <!--<p>请凭订单号和激活码联系客服进行兑换，客服QQ：2031363458</p>-->
              <div class="btn">
                <button class="button" id="copyOrder" @click="copyOrderInfo()">复制订单信息</button>
                <button class="button" @click="linkQQ()">联系客服QQ</button>
              </div>
              <div class="repeat_code" v-if="!detailList.code" @click="getInfoData()">
                <div class="content">
                  <p><i class="iconfont icon-shuaxin"></i></p>
                  <p>订单正在处理，请点击刷新试试 ~</p>
                </div>
              </div>
            </div>
          </div>

          <div class="warn">
            <p class="title"><i class="iconfont icon-gantanhao"></i>注意事项</p>
            <div>
              <p style="text-align: left;color:#ee2157;"><span style="color:#CC718C;font-size:28px;font-family:PingFangSC-Semibold;font-weight:600;">请认准唯一客服</span>QQ：2031363458</p>
              <p style="text-align: left;font-weight: normal;">官方不会索要QQ密码等任何个人信息，亦不会让玩家交税。请提高警惕，谨防受骗！</p>
            </div>
          </div>
        </section>
      </div>
      <div class="goodsDetail-body-desc" v-else>
        <div class="goodsDetail-body-desc-top" v-html="detailList.description"></div>
        <div class="goodsDetail-body-desc-focus" >
          <div class="goodsDetail-focus-title"><i class="iconfont icon-gantanhao"></i>重要说明</div>
          <div class="goodsDetail-focus-desc">商品兑换请仔细阅读并参照商品详情的“兑换流程”、“注意事项”与“使用有效期”。除商品本身不能兑换外，商品一经兑换、一律不退还积分。</div>
        </div>
      </div>
    </div>

    <div class="goodsDetail-change" v-if="param.status != 2">
      <p class="goodsDetail-change-fast mpm_btn active"
         @click="maskShow(detailList.action_id,detailList.price,detailList.goods_name)"
         v-if="detailList.button=='立即兑换'">{{detailList.button}}</p>
      <p v-else class="goodsDetail-change-null">{{detailList.button}}</p>
    </div>

    <div class="goodsDetail-null" style="display: none;">
      <img src="../../static/images/pic_404.png" alt="">
      <p>暂未开放</p>
    </div>
    <!--<div class="goodsDetail-mask" v-show="flagChange">-->
      <!--<div class="goodsDetail-mask-button">-->
        <!--<div class="goodsDetail-mask-title">确认兑换</div>-->
        <!--<div v-if="detailList.e_type==0" class="goodsDetail-mask-desc">您要用{{detailList.price}}果子{{detailList.goods_name}}</div>-->
        <!--<div v-if="detailList.e_type==1" class="goodsDetail-mask-desc">您要用{{detailList.price}}钻石{{detailList.goods_name}}</div>-->
        <!--<div class="goodsDetail-mask-buttonList">-->
          <!--<p v-if="detailList.goods_type==2" @click="addressLink(detailList.action_id)">选择收货地址</p>-->
          <!--<p v-else @click="fastChange(detailList.action_id)">确认兑换</p>-->
          <!--<p @click="cancleChange()">暂时不要</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="goodsDetail-mask" v-show="flagChange1">-->
      <!--<div class="goodsDetail-mask-button">-->
        <!--<div class="goodsDetail-mask-title">兑换提示</div>-->
        <!--<div class="goodsDetail-mask-desc">您的钻石不足</div>-->
        <!--<div class="goodsDetail-mask-buttonList">-->
          <!--<p @click="buyDiamond()">购买钻石</p>-->
          <!--<p @click="cancleChange()">暂时不要</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import DialogExchange from '../components/dialogExchange.vue'
  import Clipboard from 'clipboard'

  export default {
    name: 'goodsDetail',
    data () {
      return {
        guoziIcon:this.$store.state.guoziIcon,
        detailList: '',
        flagChange: false,
        flagChange1: false,
        diamondNum: '',
        price: '',
        e_type: '',
        hTitle:'商品详情',
        exchangeShow: false,
        exchangeData: {
          status: 2, //来源   1：home  2.商城-立即兑换
          price:'',  //兑换价钱
          goods_name:'',  //兑换名称
          action_id:'',
        },
        param: {
        	status:this.$route.query.status ? this.$route.query.status : '',
          order_list:'',
        },
        is_success:true,
        callback_message: '',
      }
    },
    created(){
      if (this.member) {
        this.getInfoData();
      } else {
        this.$repeatLogin();
        this.$root.hub.$on("loginSuccess", _ => {
          this.getInfoData();
        });
      }
    },
    mounted (){
    },
    watch: {
    	'$route':'getInfoData',
    },
    methods: {
      getInfoData (){

        var _this = this;
        this.$api('/services/exchangeGoods/action_info.php', {
          action_id: this.$route.query.actionId,
          order_sn: this.$route.query.order_sn ? this.$route.query.order_sn : '',
        }).then(response => {
          _this.diamondNum = response.data.diamond;
          _this.price = response.data.price;
          _this.e_type = response.data.e_type;
          _this.detailList = response.data;

          if (this.$route.query.order_sn && this.$route.query.status == 2 ){
            this.param.status = this.$route.query.status;
          }
          if ( this.$route.query.order_sn) {
            _this.hTitle = '兑换详情';
            if (response.data.order_status == '1' && response.data.good_type == '1') {
              _this.is_success = true;
              _this.callback_message = '兑换成功，奖励已发放';
            } else if (response.data.order_status == '2' && response.data.good_type == '1') {
              _this.is_success = true;
              _this.callback_message = '正在处理中，请联系客服领取奖品';
            } else {
              _this.is_success = false;
              _this.callback_message = response.data.status;
            }
          }
        })
      },
      addressLink(id){
        this.$router.push({path: '/choiceAddress', query: {actionId: id}})
      },
      cancleChange(){
        this.flagChange = false;
        this.flagChange1 = false
      },
      maskShow(action_id,price,goods_name,){
        this.exchangeShow = true;
        this.exchangeData.action_id = action_id;
        this.exchangeData.goods_name = goods_name;
        this.exchangeData.price = price;


//      let member_info = store.get('member_info');
//      if(member_info == undefined){
//        this.$router.push({path:'/login',query: { actionId:this.$route.query.actionId}});
//      }else if(this.e_type==1&&this.price>this.diamondNum){
//        this.flagChange1=true
//      }else{
//        this.flagChange=true
//      }
      },
      buyDiamond(){
        this.$router.push({path: '/diamondList'})
      },
      change(msg) {
        this.exchangeShow = msg;
      },
      copyOrderInfo(){
        var _this = this;
        var copyOrder = new Clipboard('#copyOrder',{
          text(){
            return  '订单编号' + _this.detailList.order_sn + '，兑换码：' + _this.detailList.code;
          }
        });
        copyOrder.on('success', function(e) {
          e.clearSelection();
          layer.open({
            content: '成功复制：'+e.text
            ,btn: '关闭'
          });

        });
      },
      linkQQ (){
      	window.location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=2031363458&version=1&src_type=web&web_src=oicqzone.com';
      }
    },
    components: {
      headTop: HeadTop,
      dialogExchange: DialogExchange,
    },
    computed: {
      member () {
        return this.$store.state.member
      },
    }
  }
</script>

<style lang="stylus" scoped>

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

  .button{
    width:312px;
    height:60px;
    background:linear-gradient(137deg,rgba(139,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 12px 8px -8px rgba(83,72,255,0.5);
    border-radius:12px;
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#fff;
  }



  /*刷新code码*/
  .repeat_code_container {
    position: relative;
    display flex
    justify-content center;
    align-items:center

    .sec-body{
      width: 100%;
      background #fff;
      border-radius:10px;
      padding:10px;
    }
  }
  /*repeat_code_container .content {*/
    /*text-align: left;*/
  /*}*/
  .repeat_code {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.85);
  }

  .goodsDetail ~body {
    background: #fff;
  }
  .goodsDetail-head {
    position: fixed;
    top: 0;
    left: 0;
    height: 90px;
    width: 100%;
    z-index: 20;
  }

  .goodsDetail-null {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
  }

  .goodsDetail-null img {
    height: 200px;
    width: 200px;
    border: none;
  }

  .goodsDetail-null p {
    text-align: center;
    font-size: 28px;
    color: #999;
  }

  .goodsDetail .goodsDetail-body {
    margin-top: 90px;
    padding-bottom: 140px;
  }

  .goodsDetail .goodsDetail-body-cover {
    height: 500px;
    width: 750px;
    overflow: hidden;
  }

  .goodsDetail .goodsDetail-body-cover img {
    height: 550px;
    width: 750px;
  }


  .goodsDetail .goodsInfo{
    padding-top:20px;
    padding-bottom:20px;
    background: #fff;
  }

  .goodsDetail .goodsDetail-body-title {
    margin-left: 24px;
    height:88px;
    font-size:32px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(91,87,154,1);
    line-height:44px;
  }

  .goodsDetail .goodsDetail-body-name {
    /*height: 60px;*/
    padding:0 30px;
    display: flex;
    justify-content space-between;

    .money{
      font-size:36px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(239,27,90,1);
    }
  }

  .goodsDetail .mall-guozi {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-bottom: 10px;
  }

  .goodsDetail .goodsDetail-body-desc {
    margin: 40px 25px 0;
  }

  .goodsDetail .goodsDetail-body-desc-top {
    margin-top: 30px;
    line-height: 50px;
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#EF1B5A;
  }

  .goodsDetail .goodsDetail-body-desc-focus {
    margin-top: 10px;
    background:#FFEBF1;
    border-radius:12px;
    padding:10px;
  }

  .goodsDetail .goodsDetail-focus-title {
    margin-top:10px;
    text-align: center;
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#EF1B5A;
    line-height:40px;

    i{
      font-size: 32px;
      margin-right: 10px;
    }
  }

  .goodsDetail .goodsDetail-focus-desc {
    margin:10px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#CC718C;
    line-height:40px;
  }

  .goodsDetail .goodsDetail-change {
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    height: 120px;
    background: #fff;
    width: 100%;
  }

  .goodsDetail .goodsDetail-change .goodsDetail-change-fast {
    height: 76px;
    line-height: 76px;
    width: 702px;
    margin: 22px auto;
    text-align: center;
    /*background: #FCD001;*/
    border-radius: 8px;
    font-size: 30px;
  }

  .goodsDetail .goodsDetail-change .goodsDetail-change-null {
    height: 76px;
    line-height: 76px;
    width: 702px;
    margin: 22px auto;
    text-align: center;
    background: #e7e7e7;
    border-radius: 8px;
    font-size: 30px;
    color: #999;
  }

  .goodsDetail .goodsDetail-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }

  .goodsDetail .goodsDetail-mask-button {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -100px;
    margin-left: -250px;
    width: 500px;
    background: #fff;
    border-radius: 10px;
  }

  .goodsDetail .goodsDetail-mask-title {
    font-size: 30px;
    height: 40px;
    text-align: center;
    margin-top: 30px;
    font-weight: bold;
  }

  .goodsDetail .goodsDetail-mask-desc {
    font-size: 28px;
    margin: 10px 30px;
    text-align: center;
  }

  .goodsDetail .goodsDetail-mask-buttonList {
    border-top: 1px solid #ddd;
    display: flex;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    margin-top: 20px;
  }

  .goodsDetail .goodsDetail-mask-buttonList p {
    font-size: 28px;
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
    color: #0075ff;
    font-weight: bold;
  }

  .goodsDetail .goodsDetail-mask-buttonList p:nth-of-type(1) {
    border-right: 1px solid #ddd;
  }
  .goodsDetail_exchange {
    padding: 24px;
    max-height: 999999px;
  }
  .goodsDetail_exchange .success {

  }

  .goodsDetail_exchange p.title {
    font-size: 32px;
    color: #FF5C5C;
  }
  .goodsDetail_exchange p.success {
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(239,27,90,1);
  }
  .goodsDetail_exchange .section {
    margin-top: 30px;
    padding: 10px;
    text-align: center;
    border: 1px solid #F0F1F2;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.02);

    background-color: #DDDBFF;
    background-size: 30px 30px;
    background-position: 0 0,15px 15px;
    background-image: linear-gradient(-45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent);
    border-radius: 10px

  }

  .goodsDetail_exchange .section .content {
    padding: 10px;
    padding-top: 0px;
  }
  .goodsDetail_exchange .section .content>p {
    text-align: left;
  }
  .goodsDetail_exchange .section p.order_sn {
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#5B579A;
    margin-top:10px;
    margin-bottom:20px;
  }
  .goodsDetail_exchange .section .sn_code{
    display block
    width:646px;
    padding:20px;
    height:120px;
    border-radius:12px;
    border:2px #979797 dashed;
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(91,87,154,1);
    line-height:40px;

    span{
      display: block
      text-align left
      width 100%;
      font-size:28px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(91,87,154,1);
      line-height:40px;
    }

  }
  .goodsDetail_exchange .section .btn {
    /*width: 512px;*/
    overflow: hidden;
    margin: 10px auto 0;
    padding: 4px;
    display flex
    justify-content: space-between
  }
  .goodsDetail_exchange .section .repeat_code>.content {
    margin-top: calc((50% - 120px)/2);

  }
  .goodsDetail_exchange .section .repeat_code>.content p{
    text-align: center;
    color: #fff;
    line-height: 60px;
    font-size: 24px;
  }
  .goodsDetail_exchange .section .repeat_code>.content p i {
    font-size: 64px;
    color: #fff;
  }
  .goodsDetail_exchange .section .btn p {
    width: calc((100% - 32px)/2);
    line-height: 72px;
    color: #fff;
  }
  .goodsDetail_exchange .warn {
    margin: 30px 0;
    background: #FFF5F6;
    border-radius: 4px;
    padding: 30px;
    line-height: 42px;
    font-size:28px;
    font-family: PingFangSC-Regular;
    font-weight:600;
    color:#CC718C;
  }
  .goodsDetail_exchange .warn p {
    font-size: 28px;
    text-align: center;
    font-family: PingFangSC-Regular;
  }
  .goodsDetail_exchange .warn p i {
    font-size: 32px;
    margin-right:10px;
  }
  .goodsDetail_exchange .warn .title {
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(239,27,90,1);
    line-height:40px;
  }




  .goods-info{
    height:270px;
    background #fff;
    padding:20px;
    color:#B2B0D2;
    font-size:20px;
    position relative;

    span{
      width 100%;
      display inline-flex;
      align-items center;
    }
    span:nth-child(1){
      display block;
      align-items: flex-start;
      flex-wrap: wrap;
      height:94px;
      margin-bottom:10px;
      font-size:32px;
      color:#5B579A;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    span:nth-child(4){
      margin-top:30px;
      color:#EF1B5A;
      font-size:28px;
    }

    .icon{
      width inherit;
      position absolute;
      right 20px;
      bottom:20px;
    }
  }


  .goods-detail{
    padding:28px;
    position relative;

    .goods-content{
      color:#B2B0D2;
      font-size:24px;

      strong {
        font-size:24px;
      }
    }


    .goods-statement-text{
      margin-top:28px;
      padding:28px;
      color:#5B579A;
      min-height:50px;
      background:#fff;
      border-radius:12px;
      font-size 24px;

      .title{
        font-weight bold;
        text-align center;
      }
    }


  }





</style>
