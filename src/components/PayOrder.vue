<template>
  <div class="dialog_1 anim-opacity2">
    <div class="dialog_container dialog_order">
      <div class="dialog_order_header">
        <p>订单支付</p>
        <label class="dialog_close" @click="dialogClose"><i class="iconfont">&#xe6ba;</i></label>
      </div>
      <div class="dialog_order_body">
        <p>参与单价：<span class="light_blue">{{carList.price}}</span></p>
        <div class="order_body_count">
          <p>参与次数</p>
          <div class="add_and_sub">
            <label class="minus fll" @click="minusBtn" :class="{gray:orderCount == 1}"><i class="iconfont">&#xe6d8;</i></label>
            <label class="content fll" v-if="carList.type == 8"><span>{{orderCount}}</span>/1</label>
            <label class="content fll" v-else><span>{{orderCount}}</span>/{{parseInt(carList.times)-parseInt(carList.member_at_times)}}</label>
            <label class="adds flr" @click="addsBtn" :class="{gray:(orderCount == parseInt(totalCount) || parseInt(carList.times)-parseInt(carList.member_at_times) == 1)}">
              <i class="iconfont">&#xe6da;</i>
            </label>
          </div>
          <em></em>
        </div>
        <div class="order_body_use">
          <div class="left fll">
            <p>我的门票</p>
            <p class="light_yellow">{{carList.ticket}}</p>
          </div>
          <div class="right flr">
            <p>本次消耗</p>
            <p class="light_blue">{{parseInt(carList.price) * orderCount}}</p>
          </div>
        </div>
      </div>
      <div class="dialog_order_footer">
        <!--<P class="mpm_btn" v-if="parseInt(carList.ticket) < parseInt(carList.price) * orderCount ">确认提交</P>-->
        <P class="mpm_btn"
           :class="isSort.status == 0 ? 'active' : ''"
           @click="orderSubmit(parseInt(carList.ticket),parseInt(carList.price) * orderCount)" >{{isSort.text}}</P>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "store";
  export default {
    name: 'PayOrder',
    data () {
      return {
        orderCount:1,
        totalCount:5,
        tabIndexValue:'',
        room_info:'',
        room_player:'',
        cur_player:{
          TOP:'',
          JUG:'',
          MID:'',
          ADC:'',
          SUP:''
        },
        isSort:{ //身价是否超过工资帽
          status:0,  //0:身价未超过   1：超过
          text:'确认提交',
        },
        order_ED:true, // 订单是否能开始提交
      }
    },
    props:{
      carList:{
        type:Object
      }
    },
    created(){
      if (parseInt(this.carList.ticket) < parseInt(this.carList.price)) {
        this.isSort.status = 1;
        this.isSort.text = '门票不足';
      }
    },
    methods:{
      dialogClose:function(){
        this.orderCount=1;
        this.$emit('newNodeEvent', 'false')
      },
      addsBtn:function(){
        this.totalCount = parseInt(this.carList.times) - parseInt(this.carList.member_at_times);
        if(this.orderCount < parseInt(this.totalCount)){
          this.orderCount ++;
          if ( parseInt(this.orderCount) * parseInt(this.carList.price) > parseInt(this.carList.ticket)) {
            this.isSort.status = 1;
            this.isSort.text = '门票不足';
          } else {
            this.isSort.status = 0;
            this.isSort.text = '确认提交';
          }
          if (this.orderCount == parseInt(this.totalCount)) {
            return false;
          }
        }else{
          this.orderCount = this.totalCount;
        }
      },
      minusBtn:function(){
        if(this.orderCount > 1){
          this.orderCount --;
          if ( parseInt(this.orderCount) * parseInt(this.carList.price) > parseInt(this.carList.ticket)) {
            this.isSort.status = 1;
            this.isSort.text = '门票不足';
          } else {
            this.isSort.status = 0;
            this.isSort.text = '确认提交';
          }
          if (this.orderCount == 1) {
            return false;
          }
        }else{
          this.orderCount = 1;
        }
      },
      orderSubmit (ticket, price){
        if (parseInt(ticket) - parseInt(price) < 0) {
          layer.open({
            content: '门票不足',
            btn: '关闭'
          });
        } else {
          var _this=this;
          if (this.order_ED == true) {
            this.order_ED = false;
            this.$api('/services/fantasy/create_order.php', {
              qid: store.get("loginInfo").type,
              roomID: this.carList.roomID,
              p1: this.carList.ADC,
              p2: this.carList.MID,
              p3: this.carList.TOP,
              p4: this.carList.JUN,
              p5: this.carList.SUP,
              num: this.orderCount,
            }).then(response => {
              if (response.code == 200) {

                //member_info 减除消耗
                var member_info = store.get('member_info');
                member_info.ticketCount = parseInt(ticket) - parseInt(price);
                store.set('member_info', member_info);


                _this.$emit('newNodeEvent1', _this.orderCount);
                layer.open({
                  content: response.message,
                  btn: '关闭'
                });
                _this.orderCount = 1;
                _this.$emit('newNodeEvent', 'false');

                _this.order_ED = true;

                let _orderInfo = {
                  member_at_times: (parseInt(_this.carList.member_at_times) + parseInt(_this.orderCount)).toString(),
                  roomID: _this.carList.roomID,
                  type: _this.carList.type,
                };

                //更新首页列表个人参与次数
                // let filed = 'member_at_times';
                // let _roomInfo = _this.roomInfo;
                // if (!_roomInfo[filed] || (_roomInfo[filed] && _this.md5(_roomInfo[filed]) !== _this.md5(_orderInfo[filed]))) {
                //   _roomInfo[filed] = _orderInfo[filed]
                // }
                // store.set('roomList', _this.roomData.listArray);

              } else {
                _this.order_ED = true;
                layer.open({
                  content: response.message,
                  btn: '关闭'
                });
              }

            })
          } else {
            this.$emit('newNodeEvent', 'false');
            layer.open({
              content: '你的手速太快，请勿多次提交。',
              btn: "关闭"
            });
          }
        }
      },
    },

    computed: {
      member () {
        return this.$store.state.member
      },
      roomData () {
        return this.$store.state.roomData
      },
      roomList (){
        return this.roomData.listArray
      },
      cacheRoomInfo () {
        return this.roomData.roomDetailHashMap[this.$route.query.roomID]
      },
      roomInfo () {
        if (this.cacheRoomInfo) {
          return this.cacheRoomInfo
        } else {
          return this.roomData.listArray.find(room => this.carList.roomID == room.roomID)
        }
      },
    }
  }
</script>

<style>
  /*弹出层*/
  .dialog_1{
    /*position: absolute;*/
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.4);
    position:fixed;
    z-index:22;
  }

  .dialog_order p{
    font-size:30px;
  }
  .dialog_order span{
    font-size:30px;
  }
  .dialog_order_header{
    position: relative;
    height:86px;
    background: #d2be85;
  }
  .dialog_order_header p{
    width: 100%;
    line-height: 86px;
    font-size:36px;
    color:#fff;
    text-align: center;
  }
  .dialog_close{
    position: absolute;
    top:22px;
    right:22px;
    width: 44px;
    height:44px;
    font-size:30px;
    color:#fff;
    line-height:44px;
    text-align: center;
  }
  .dialog_close i{
    font-size:20px;
  }
  .dialog_order_body{

  }
  .dialog_order_body>p:first-Child{
    line-height: 78px;
    padding-left:36px;
  }
  .order_body_count{
    background: #eeeeee;
    height:234px;
    padding:0 36px;
  }
  .order_body_count>p{
    line-height: 88px;
  }
  .order_body_use{
    padding:30px 0 40px;
    overflow: hidden;
  }
  .order_body_use>div{
    width: 50%;
    text-align: center;
  }
  .order_body_use>div p:last-Child{
    font-size:36px;
  }
  .add_and_sub{
    overflow: hidden;
  }
  .add_and_sub .iconfont{
    color:#0C9DFC;
    font-size:24px;
  }
  .add_and_sub .adds,.add_and_sub .minus{
    display: block;
    width: 58px;
    height:58px;
    line-height:58px;
    text-align: center;
    border:2px solid #0C9DFC;
    border-radius: 10px;
  }
  .add_and_sub .gray{
    border:2px solid #ccc;
  }
  .add_and_sub .gray .iconfont{
    color:#ccc;
  }
  .add_and_sub .content{
    display: block;
    height:58px;
    line-height:58px;
    width: 330px;
    text-align: center;
    font-size:60px;
  }
  .add_and_sub .content span{
    font-size:60px;
    color:#0C9DFC;
  }
</style>






