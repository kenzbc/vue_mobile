<template>
  <div>

    <!-- 兑换弹框 -->
    <dialog-exchange v-if="exchangeShow" @dialogHide="change" :msg="exchangeShow"
                     :exchange-list="exchangeData"></dialog-exchange>

    <head-top
      headTitle="商品详情"
      go-back="true"
      is-share="true"
    ></head-top>

    <div class="goods-photo">
      <img v-if="detailList.image_url==''" src="../../static/images/mallimg.png" alt="">
      <img v-else :src="detailList.image_url + '?x-oss-process=image/resize,m_fill,h_500,w_750'" alt="">
    </div>

    <div class="goods-info">
      <span>{{detailList.goods_name}}</span>
      <span>库存 {{$route.query.inventory}}</span>
      <span>截止到 {{$route.query.endTime}}</span>
      <span>{{detailList.price}} &nbsp;<img src="../assets/image/jinbi_icon@2x.png" ></span>
      <span class="icon icon-pink" v-if="detailList.goods_type == '1'">虚拟</span>
      <span class="icon icon-baby-blue" v-else>实物</span>
    </div>

    <div class="goods-detail" v-if="param.status == 2">
      <p class="title success" v-if="is_success == true">{{callback_message}}</p>
      <p class="title" v-else>{{callback_message}}</p>
      <div class="goods-content">
        <section v-if="is_success == true" class="">
          <div class="section repeat_code_container" >
            <div class="content">
              <p class="order_sn">请凭订单号和兑换码，联系客服兑换</p>
              <p>订单编号：{{detailList.order_sn}}</p>
              <p v-if="detailList.code">兑换码：{{detailList.code}}</p>
              <p v-if="detailList.desc">备注：{{detailList.desc}}</p>
            </div>

            <!--<p>请凭订单号和激活码联系客服进行兑换，客服QQ：2031363458</p>-->
            <div class="btn">
              <p class="mpm_btn active fll" id="copyOrder" @click="copyOrderInfo()">复制订单信息</p>
              <p class="mpm_btn active flr" @click="linkQQ()">联系客服QQ</p>
            </div>
            <div class="repeat_code" v-if="!detailList.code" @click="getInfoData()">
              <div class="content">
                <p><i class="iconfont icon-shuaxin"></i></p>
                <p>订单正在处理，请点击刷新试试 ~</p>
              </div>
            </div>
          </div>
          <div class="warn">
            <p class="title"><i class="iconfont icon-tackCare"></i>注意事项</p>
            <p>请认准唯一客服QQ：2031363458</p>
            <p>官方不会索要QQ密码等任何个人信息，亦不会让玩家交税。请提高警惕，谨防受骗！</p>
          </div>
        </section>
      </div>


      <div class="goods-statement">
        <div class="title">重要说明</div>
        商品兑换请仔细阅读并参照商品详情的“兑换流程”、“注意事项”与“使用有效期”。除商品本身不能兑换外，商品一经兑换、一律不退还积分。
      </div>
    </div>


    <div class="goods-detail" v-else>
      <div class="goods-content" style="font-size:24px;">
        <strong>兑换流程</strong><br>
        1.兑换商品。<br>
        2.点击兑换商城右上角兑换记录。<br>
        3.查看刚才兑换的商品的兑换详情，获得订单号和激活码。<br>
        4.联系客服QQ：<span style="color:#5e5c9a">2031363458</span><br><br>

        <strong>注意事项</strong><br>
        1.每个订单号和激活码一一对应。
        2.每个激活码只能兑换一次。
        3.该商品是充值Q币，皮肤请自行购买。
      </div>

      <div class="goods-statement-text">
        <div class="title">重要说明</div>
        商品兑换请仔细阅读并参照商品详情的“兑换流程”、“注意事项”与“使用有效期”。除商品本身不能兑换外，商品一经兑换、一律不退还积分。
      </div>
    </div>


    <div class="conversion" v-if="param.status != 2">
      <button class="button"
              @click="maskShow(detailList.action_id,detailList.price,detailList.goods_name)"
              v-if="detailList.button=='立即兑换'">{{detailList.button}}</button>
      <button v-else class="button">{{detailList.button}}</button>
    </div>

  </div>
</template>

<script>
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import DialogExchange from '../components/dialogExchange.vue'
  import Clipboard from 'clipboard'
  export default {
    name: "MallGoodsDetail",
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

  .goods-photo{
    width 100%;
    color:#fff;

    img {
      width 100%;
    }

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




  .conversion{
    padding:0 28px;
    height 136px;
    background #fff;
    display flex;
    align-items center;

    .button{
      width 100%;
      height:80px;
      background:linear-gradient(137deg,rgba(139,72,255,1) 0%,rgba(83,72,255,1) 100%);
      box-shadow:0px 12px 8px -8px rgba(83,72,255,0.5);
      border-radius:12px;
      font-size:28px;
      color:#fff;
    }
  }




</style>
