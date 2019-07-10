<!--1:钻石成功  2.钻石失败  3.门票成功  4.门票失败  5.钥匙成功  6.钥匙失败-->
<template>
  <div class="dialog dialog_pay_no" :class="{'anim-opacity2':inMove == 0,'anim-opacity1':inMove == 1}"
       @touchmove.prevent>
    <div class="dialog_bj" @click="dialogClose"></div>
    <div class="dialog_container "
         :class="{
    	    'dialog_pay' : tabIndex == 1,
          'dialog_add' : tabIndex == 2,
          'dialog_input' : tabIndex == 3,
          'dialog_msg' : tabIndex == 4,
          'dialog_order' : tabIndex == 0 || tabIndex == 7}"
    >
      <!-- 支付选择 -->
      <section v-if="tabIndex == 1">
        <div class="dialog_pay_header">
          <p>选择一种支付方式</p>
          <label class="dialog_close" @click="dialogClose()"><i class="iconfont">&#xe6ba;</i></label>
        </div>
        <div class="dialog_pay_body">
          <ul>
            <li @click="diaChoosePay(payList.sku_id,3)">
              <label class="logo"><img src="../../static/images/icon_pay_1.png"></label>
              <p class="fll">支付宝支付</p>
              <label class="arrow flr"><i class="iconfont">&#xe6e4;</i></label>
            </li>
            <!--class="dialog_opacity" @click="diaChoosePay(payList.sku_id,2)"  -->
            <li  @click="diaChoosePay(payList.sku_id,6)">
              <label class="logo"><img src="../../static/images/icon_pay_2.png"></label>
              <p class="fll">微信支付</p>
              <label class="arrow flr"><i class="iconfont">&#xe6e4;</i></label>
            </li>
            <!-- <li @click="diaChoosePay(payList.sku_id,3)">
              <label class="logo"><img src="../../static/images/icon_pay_3.png"></label>
              <p class="fll">余额支付</p>
              <label class="arrow flr"><i class="iconfont">&#xe6e4;</i></label>
            </li> -->
          </ul>
        </div>
      </section>
      <section v-else-if="tabIndex == 2">
        <div class="dialog_create_room" v-if="payList.isPrompt">
          <p @click="addRoom">加入房间</p>
          <p @click="createRoom">创建房间</p>
          <div class="dialog_my_key">我的钥匙：{{myBank.fantasy_key}} <i class="iconfont">&#xe607;</i></div>
        </div>
        <div class="dialog_add_room" v-else>
          <div class="dialog_add_header">提示</div>
          <div class="dialog_add_body">创建8人房间需要1 <i class="iconfont">&#xe607;</i>，参与人数每增长4人，所需钥匙数加1</div>
          <div class="dialog_add_footer">
            <P @click="createRoomLink">朕知道了</P>
          </div>
        </div>
      </section>

      <section v-else-if="tabIndex == 3">
        <div class="dialog_input_room">
          <label class="dialog_close" @click="dialogClose"><i class="iconfont">&#xe6ba;</i></label>
          <p>请输入房间号</p>
          <ul class="inviteCode-first-myCode1">
            <li><p>{{username1}}</p></li>
            <li><p>{{username2}}</p></li>
            <li><p>{{username3}}</p></li>
            <li><p>{{username4}}</p></li>
            <li><p>{{username5}}</p></li>
            <li><p></p></li>
            <li id="inputButton6"><p><input @keyup="inputFocus()" id="inputTel"  v-model="username" type="tel" name="" maxlength="1"  autocomplete="off"></p></li>
          </ul>
        </div>
      </section>
      <section v-else-if="tabIndex == 4">
        <div class="dialog_msg_room">
          <div class="dialog_msg_header">提示</div>
          <div class="dialog_msg_body">{{dialog_msg_text}}</div>
          <div class="dialog_add_footer">
            <p @click="goRoom" v-if="payList.isGoRoom">前往大厅</p>
            <p @click="addRoom" v-else-if="isAgain">重新输入</p>
            <P @click="dialogClose" v-else>朕知道了</P>
          </div>
        </div>
      </section>
      <section v-else-if="tabIndex == 7">
        <div class="dialog_order_header">
          <p>提示</p>
        </div>
        <div class="dialog_pay_cannot no_bg">
          <p>{{dialog_msg_text}}
            <!--<i class="iconfont oran" v-if="payList.isTickts == true">&#xe6c5;</i>-->
            <!--<i class="iconfont oran" v-else >&#xe6c5;</i>-->
          </p>
        </div>
        <div @click="dialogClose" class="cancle-button">取消</div>
        <!--<div  class="dialog_pay_footer key" v-if="(parseInt(payList.key) - parseInt(payList.my_key)) < 1000 ||
          (parseInt(payList.group_ticket) - parseInt(payList.my_ticket)) < 1000 ">
          <p class="fll" @click="dialogClose">暂不购买</p>
          <p class="flr"
             :class="{two:(parseInt(payList.key) - parseInt(payList.my_key)) > 99}"
             v-if="payList.isTickts == false"
             @click="goBuy(2,999,parseInt(payList.key) - parseInt(payList.my_key))">
            用{{(parseInt(payList.key) - parseInt(payList.my_key)) * 2}}
            <i class="iconfont">&#xe6f0;</i>购买{{parseInt(payList.key) - parseInt(payList.my_key)}}<i class="iconfont oran">&#xe607;</i>
          </p>
          <p class="flr"
             :class="{two:(parseInt(payList.key) - parseInt(payList.my_key)) > 99}"
             v-if="payList.isTickts == true"
             @click="goBuy(1,999,parseInt(payList.group_ticket) - parseInt(payList.my_ticket))">
            用{{parseInt(payList.group_ticket) - parseInt(payList.my_ticket)}}
            <i class="iconfont">&#xe6f0;</i>购买{{parseInt(payList.group_ticket) - parseInt(payList.my_ticket)}}<i class="iconfont oran">&#xe6c5;</i>
          </p>
        </div>
        <div  class="dialog_pay_footer key_other" v-else>
          <p @click="dialogClose">暂不购买</p>
          <p
             v-if="payList.isTickts == false"
             @click="goBuy(2,999,parseInt(payList.key) - parseInt(payList.my_key))">
            用{{(parseInt(payList.key) - parseInt(payList.my_key)) * 2}}
            <i class="iconfont">&#xe6f0;</i>购买{{parseInt(payList.key) - parseInt(payList.my_key)}}<i class="iconfont oran">&#xe607;</i>
          </p>
          <p
             v-if="payList.isTickts == true"
             @click="goBuy(1,999,parseInt(payList.group_ticket) - parseInt(payList.my_ticket))">
            用{{parseInt(payList.group_ticket) - parseInt(payList.my_ticket)}}
            <i class="iconfont">&#xe6f0;</i>购买{{parseInt(payList.group_ticket) - parseInt(payList.my_ticket)}}<i class="iconfont oran">&#xe6c5;</i>
          </p>
        </div>-->
      </section>
      <section v-else>
        <div class="dialog_order_header">
          <p v-if="payList.index == 1">购买成功</p>
          <p v-else-if="payList.index == 2">发生错误</p>
          <p v-else-if="payList.index == 3">购买门票</p>
          <p v-else-if="payList.index == 5">购买钥匙</p>
          <p v-else-if="payList.index == 6">提示</p>
          <p v-else>钻石不足</p>
        </div>

        <!-- 购买成功 -->
        <div class="dialog_pay_cannot" v-if="payList.index == 1">
          <p class="title">{{test}}
            <i class="iconfont" v-if="test == '获得钻石'">&#xe6f0;</i>
            <i class="iconfont oran" v-else-if="test == '获得钥匙'">&#xe607;</i>
            <i class="iconfont oran" v-else>&#xe6c5;</i>
          </p>
          <p class="num" v-if="test == '获得钻石'">{{payList.buy_number}}</p>
          <p class="num oran" v-else-if="test == '获得钥匙'">{{key}}</p>
          <p class="num oran" v-else>{{ticket}}</p>
        </div>

        <!-- 错误提示 -->
        <div class="dialog_pay_error" v-if="payList.index == 2">
          <div class="prompt">
            <p>您的支付可能出了点问题，</p>
            <p>请稍后查看，或者联系客服。</p>
          </div>
          <div class="contact">
            <p><img src="../../static/images/icon_QQ.png"><span>325745639</span></p>
          </div>
        </div>

        <!-- 购买门票 -->
        <div class="dialog_pay_cannot" v-if="payList.index == 3">
          <p class="title">门票<i class="iconfont oran">&#xe6c5;</i></p>
          <p class="num oran">{{payList.ticket}}</p>
          <p class="user">消耗钻石{{payList.diamond_number}} <i class="iconfont">&#xe6f0;</i></p>
        </div>

        <!-- 钻石不足 -->
        <div class="dialog_pay_cannot" v-if="payList.index == 4">
          <p>您的钻石不足<i class="iconfont">&#xe6f0;</i></p>
        </div>

        <!-- 购买钥匙 -->
        <div class="dialog_pay_cannot" v-if="payList.index == 5">
          <p class="title">钥匙<i class="iconfont oran">&#xe607;</i></p>
          <p class="num oran">{{payList.fantasy_key}}</p>
          <p class="user">消耗钻石{{payList.diamond_number}} <i class="iconfont">&#xe6f0;</i></p>
        </div>

        <!-- 设置房间判断 -->
        <div class="dialog_pay_cannot" v-if="payList.index == 6">
          <p>您的钥匙不足</p>
        </div>


        <div class="dialog_order_footer" v-if="payList.index == 1 || payList.index == 2 ">
          <P class="anim-opacity1" @click="dialogClose(1)">朕知道了</P>
        </div>
        <div class="dialog_pay_footer" v-else-if="payList.index == 3 || payList.index == 4 || payList.index == 5">
          <p class="fll" v-if="payList.index == 3" @click="subBuy(payList.sku_id,payList.diamond_number)">确认购买</p>
          <p class="fll" v-if="payList.index == 5" @click="subBuyKey(payList.sku_id,payList.fantasy_key)">确认购买</p>
          <p class="fll" v-if="payList.index == 4" @click="diaBuy">购买钻石</p>
          <p class="flr" @click="dialogClose">稍后再说</p>
        </div>
        <!--<div  class="dialog_pay_footer key" v-else-if="payList.index == 6 ">-->
          <!--<p class="fll" @click="dialogClose">暂不购买</p>-->
          <!--<p class="flr" v-if="payList.index == 6" @click="subBuy(payList.sku_id,payList.diamond_number)">用2<i class="iconfont">&#xe6f0;</i>购买1<i class="iconfont oran">&#xe607;</i></p>-->
          <!--<p class="flr" v-if="payList.index == 6" @click="subBuy(payList.sku_id,payList.diamond_number)">用2<i class="iconfont">&#xe6f0;</i>购买1<i class="iconfont oran">&#xe6c5;</i></p>-->
        <!--</div>-->
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'dialog',
    data () {
      return {
        tabIndex: '',
        order_id: '',
        test: '获得钻石',
        ticket: '',
        key:'',
        inMove: 0,
//        isPrompt:true
        iptRoomNum: 0,
        inputNum:'',
        inputParams:[],
        inputLen:0,
        widthActive:0,
        m:1,
        isAgain:false,
        dialog_msg_text:'',
        username:'',
        username1:'',
        username2:'',
        username3:'',
        username4:'',
        username5:'',
        username6:'',
        myBank:''
      }
    },
    props: {
      payList: {
        type: Object
      }
    },
    created(){
      this.tabIndex = this.payList.status;
      if(this.tabIndex == 2){
        let _this = this;
        this.$api('/services/userCenter/my_bank.php', {
        }).then(response => {
        	if(response.code == 200){
            _this.myBank = response.data;
          }
        })
      }
      if(this.payList.msg_text){
        this.dialog_msg_text = this.payList.msg_text;
      }
    },
    methods: {
      goBuy(index,sku_id,num){
        // 1：门票 2：钥匙
        if(index == 1){
          this.subBuy(sku_id,num);
        }else{
        	this.subBuyKey(sku_id,num);
        }
      },
      inputFunc(inputNum){
        var _this = this;
        if(/^[0-9]*$/g.test(inputNum)) {
          var code = inputNum;
          var num = [];

          for (var i in code) {
            num.push(code[i]);
          }
          _this.inputParams = num;
          _this.inputLen = _this.inputParams.length;
          if (_this.inputLen == 6) {
            this.$api('/services/fantasy/room_into.php', {
              secret_key:_this.inputNum,
            }).then(response => {
              if(response.code == 200){
                var roomID = response.data.roomID;
                _this.$router.push({path: '/match', query: {roomID:roomID}})
              }else{
                _this.tabIndex = 4;
                _this.dialog_msg_text = response.message;
                if(response.code == '40304'){
                  _this.isAgain = true;
//                  console.log(_this.isAgain);
                }else{
                  _this.isAgain = false
                }
                _this.inputNum = '';
                _this.inputParams = [];
                _this.inputLen = 0;
                _this.widthActive = 0;
              }
            })
          }else if(_this.inputLen == 0){
            _this.widthActive = 0;
          }else{
            _this.widthActive = _this.inputLen * 79 + 37
          }
        }
      },
      inputFocus(){
        if(this.username!=''){
          if(this.username1==''){
            this.username1=this.username;
            this.username=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 70)+'px';
          }else if(this.username2==''){
            this.username2=this.username;
            this.username=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 140)+'px';
          }else if(this.username3==''){
            this.username3=this.username;
            this.username=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 210)+'px';
          }else if(this.username4==''){
            this.username4=this.username;
            this.username=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 280)+'px';
          }else if(this.username5==''){
            this.username5=this.username;
            this.username=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 340)+'px';
          }else if(this.username6==''){
            this.username6=this.username;
            if (this.username6 != '') {
              document.getElementById('inputTel').blur();
              var _this = this;
              this.$api('/services/fantasy/room_into.php', {
                secret_key:_this.username1+_this.username2+_this.username3+_this.username4+_this.username5+_this.username6,
              }).then(response => {
                if(response.code == 200){
                  var roomID = response.data.roomID;
                  _this.$router.push({path: '/match', query: {roomID:roomID}})
                }else{
                  _this.tabIndex = 4;
                  _this.dialog_msg_text = response.message;
                  if(response.code == '40304'){
                    _this.isAgain = true;
                    console.log(_this.isAgain);
                  }else{
                    _this.isAgain = false
                  }
                  _this.inputNum = '';
                  _this.inputParams = [];
                  _this.inputLen = 0;
                  _this.widthActive = 0;
                }
              })
            }
          }
        }else{
          if(this.username6!=''){
            this.username6=this.username;
            this.username='';
            document.getElementById('inputButton6').style.marginLeft=(this.m * 340)+'px';
          }else if(this.username5!=''){
            this.username=this.username5;
            this.username5=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 280)+'px';
          }else if(this.username4!=''){
            this.username=this.username4;
            this.username4=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 210)+'px';
          }else if(this.username3!=''){
            this.username=this.username3;
            this.username3=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 140)+'px';
          }else if(this.username2!=''){
            this.username=this.username2;
            this.username2=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 70)+'px';
          }else if(this.username1!=''){
            this.username=this.username1;
            this.username1=''
            document.getElementById('inputButton6').style.marginLeft=(this.m * 0)+'px';
          }

        }
      },
      addRoom(){
        this.tabIndex = 3;
        this.username1='';
        this.username2='';
        this.username3='';
        this.username4='';
        this.username5='';
        this.username6='';
        this.username='';
      },
      goRoom(){
        this.$router.push({path: '/home'})
      },
      createRoom(){
        this.payList.isPrompt = false
      },
      createRoomLink(){
        this.$router.push({path: '/group'})
      },
      orderSubmit(){

      },
      dialogClose(index){
          this.inMove = 1;
          this.$emit('dialogHide', false)
//        }
      },
      newGuid() {
        var guid = "";
        for (var i = 1; i < 32; i++) {
          var n = Math.floor(Math.random() * 16.0).toString(16);
          guid += n;
//          if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
//            guid += "-";
        }
        return guid;
      },
      diaChoosePay(sku_id, type){
//        if (type == 2) {
//        	let stringA = 'appid=wx26647d28087e8bda&body=test&device_info=H5&mch_id=1488311442&nonce_str=' + this.newGuid() ;
//        	let stringSignTemp = stringA + '&key=b6c850021c3175e273833b462bd93f31';

//          var _this = this;
//          this.$api('/services/fantasy/get_pay_info.php', {
//            sku_id: sku_id,
//            pay_type: type,
//            platform: 'H5',
//            // pass:true
//          }).then(response => {
////          	console.log(response);
//            if (response.code == 200) {
//              var url = response.data.mweb_url;
//              var wx_order_id = response.data.order_id;
//              setTimeout(window.location.href = url, 800)
//            }
//          });

//        	let sign = MD5(stringSignTemp).toUpperCase();
//          console.log(this.newGuid());
//          axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', {
//            appid:'wx26647d28087e8bda',
//            mch_id:1488311442,
//            device_info:'NWEB',
//            nonce_str:this.newGuid(),
//            sign_type:'MD5',
//            body:'test',
//          })
//            .then(response => {
//              console.log(response);
//            })
//            .catch(err => {
//              console.log(err);
//            });

//          this.$api('https://api.mch.weixin.qq.com/pay/unifiedorder', {
//            appid:'wx26647d28087e8bda',
//            mch_id:1488311442,
//            device_info:'H5',
//            nonce_str:this.newGuid(),
//            sign_type:'MD5',
//            body:'test',
//          }).then(response => {
//            console.log(response)
//          });
//        	console.log(1);
//          layer.open({
//            content: '此功能暂未开放'
//            ,btn: '关闭'
//          });
//        } else {
//          var _this = this;
          this.$api('/services/fantasy/get_pay_info.php', {
            sku_id: sku_id,
            pay_type: type,
            platform: 'H5',
            // pass:true
          }).then(response => {
            if (response.code == 200) {
            	if(type == 6){
                var url = response.data.mweb_url;
              }else{
                var url = response.data.orderString;
              }
              var order_id = response.data.order_id;
              setTimeout(window.location.href = url, 800)
            }
          })
//        }

      },
      subBuy(sku_id, ticket){
        var _this = this;
        let number = '';
        if(sku_id == 999){
          number = ticket
        }
        this.$api('/services/fantasy/ticket_exchange.php', {
          sku_id: sku_id,
          number: number,
//          pass: true
        }).then(response => {
//        	console.log(response)
          if (response.code == 200) {
            _this.tabIndex = 0;
            _this.payList.index = 1;
            _this.ticket = ticket;
            _this.test = '获得门票';
            // _this.$emit('dialogHide', false)
          } else if(response.code == '40405'){
            _this.tabIndex = 0;
            _this.payList.index = 4;
          }
        })
      },
      subBuyKey(sku_id, key){
        var _this = this;
        let number = '';
        if(sku_id == 999){
          number = key;
        }

        this.$api('/services/fantasy/key_exchange.php', {
          sku_id: sku_id,
          number:number
        }).then(response => {
          if (response.code == 200) {
            _this.tabIndex = 0;
            _this.payList.index = 1;
            _this.key = key;
            _this.test = '获得钥匙';
            //_this.$emit('dialogHide', false)
          } else {
            _this.tabIndex = 0;
            _this.payList.index = 4;
          }
        })
      },
      diaBuy(){
        var source = this.$route.name;
        if(this.$route.query.roomID){
          this.$router.push({path: '/DiamondList',query:{
            source:source,
            roomID:this.$route.query.roomID
          }})
        }else if(this.$route.query.group_id){
          this.$router.push({path: '/DiamondList',query:{
            source:source,
            group_id:this.$route.query.group_id,
            salary_cap:this.$route.query.salary_cap,
            at_end_time:this.$route.query.at_end_time,
          }})
        }else if(this.$route.query.orderId && this.$route.query.homeId){
          this.$router.push({path: '/DiamondList',query:{
            source:source,
            orderId:this.$route.query.orderId,
            homeId:this.$route.query.homeId
          }})
        }else if(this.$route.query.orderId){
          this.$router.push({path: '/DiamondList',query:{
            source:source,
            orderId:this.$route.query.orderId
          }})
        }else{
          this.$router.push({path: '/DiamondList',query:{
            source:source,
          }})
        }
      }
    },
    computed: {
//      iptRoomNum(){
//
//      }
    },
    watch: {
//      inputNum(){
//      	console.log(this.inputNum)
//      }
    }
  }



</script>

<style>
  .dialog_pay_no {
    background: transparent;
    top: initial;
    z-index: 101;
  }

  .dialog_opacity {
    opacity: 0.3
  }

  .dialog_pay {
    width: 520px;
    height: 365px;
    border-radius: 35px;
    font-size: 30px;
    color: #999;
  }

  .dialog_pay_header {
    position: relative;
    height: 100px;
    /*background: #d2be85;*/
    border-bottom: 1px solid #d1d1d5;
  }

  .dialog_pay_header p {
    line-height: 100px;
    text-align: center;
    color: #333333;
    font-size: 32px;
  }

  .dialog_pay_header i {
    color: #cacaca;
  }

  .dialog_pay_body {
    padding: 0 30px;
  }

  .dialog_pay_body li {
    line-height: 126px;
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;
    position: relative;
  }

  .dialog_pay_body li:last-Child {
    border-bottom: 0;
  }

  .dialog_pay_body li p {
    font-size: 30px;
    color: #333;
    margin-left: 140px;
  }

  .dialog_pay_body li .logo {
    position: absolute;
    top: 50%;
    left: 30px;
    display: block;
    width: 70px;
    height: 70px;
    margin-top: -35px;
  }

  .dialog_pay_body li .arrow {
    margin-right: 10px;
  }
 .dialog_container .cancle-button{
   position: absolute;
   bottom: 44px;
   left: 20px;
   right: 20px;
   background: #0C9DFC;
   color: #fff;
   width: 484px;
   line-height: 70px;
   border-radius: 35px;
   text-align: center;
   font-size: 30px;
 }
  .dialog_pay_body li .arrow i {
    font-size: 24px;
  }

  .dialog_pay_body li label img {
    display: block;
    width: 100%;
  }

  .dialog_pay_error {

  }

  .dialog_pay_error p {
    text-align: center;
  }

  .dialog_pay_error .prompt {
    padding: 120px 50px 80px;
  }

  .dialog_pay_error .prompt p {
    color: #333;
  }

  .dialog_pay_error .contact p {
    color: #333;
    font-weight: bold;
    vertical-align: middle;
  }

  .dialog_pay_error .contact p img {
    margin-bottom: -4px;
    margin-right: 20px;
  }

  .dialog_pay_cannot {
    width: 520px;
    height: 460px;
    position: relative;
    background: url('../../static/images/bg_dialog.png') no-repeat 0 30px;
    background-size: cover;
  }

  .dialog_pay_cannot.no_bg{
    background: #fff;
  }

  .dialog_pay_cannot p {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
  }

  .dialog_pay_cannot p i {
    color: #0C9DFC;
    margin-left: 10px;
    font-size: 30px;
  }

  .dialog_pay_cannot .title {
    position: absolute;
    text-align: center;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
  }

  .dialog_pay_cannot .num {
    color: #0C9DFC;
    font-size: 120px;

  }

  .dialog_pay_cannot .user {
    top: 72%;
  }

  .dialog_pay_cannot .oran {
    color: #fe892c;
  }

  .dialog_pay_footer {
    position: absolute;
    bottom: 24px;
    overflow: hidden;
    left: 24px;
    right: 24px;
    /*width: 100%;*/
  }

  .dialog_pay_footer p {
    width: 47%;
    line-height: 68px;
    color: #fff;
    text-align: center;
    background: #0C9DFC;
    border-radius: 35px;
    border: 1px solid #0C9DFC;
  }
  .dialog_pay_footer.key p{
    width: 48%;
  }

  .dialog_pay_footer p:last-Child {
    border: 1px solid #333;
    background: #fff;
    color: #333;
  }

  .dialog_pay_footer.key p:first-Child{
    border: 1px solid #333;
    background: #fff;
    color: #333;
  }

  .dialog_pay_footer.key p:last-Child{
    border: 1px solid #0C9DFC;
    background: #0C9DFC;
    color: #fff;
    font-size:26px;
  }
  .dialog_pay_footer.key p:last-Child i{
    font-size:26px;
    margin:0 5px;
  }


  .dialog_pay_footer.key p:last-Child.two{
    font-size:24px;
  }

  .dialog_pay_footer.key p:last-Child.two i{
    font-size:24px;
  }

  .dialog_pay_footer.key_other p{
    width: 100%;
  }
  .dialog_pay_footer.key_other p:first-Child{
    border: 1px solid #333;
    background: #fff;
    color: #333;
    margin-bottom:20px;
  }
  .dialog_pay_footer.key_other p:last-Child{
    border: 1px solid #0C9DFC;
    background: #0C9DFC;
    color: #fff;
  }
  .dialog_pay_footer.key_other p:last-Child i{
    font-size:28px;
  }

  .dialog_container.dialog_add {
    width: 520px;
    height: 436px;
    border-radius: 35px;
    overflow: hidden;
    background: rgba(255, 255, 255, .95);
  }

  .dialog_create_room {
    padding: 60px 30px;
  }

  .dialog_create_room p {
    text-align: center;
    background: #0C9DFC;
    border-radius: 35px;
    line-height: 80px;
    color: #fff;
    font-size: 30px;
  }

  .dialog_create_room p {
    margin-bottom: 40px;
  }

  .dialog_my_key {
    text-align: center;
    line-height: 40px;
    font-size: 26px;
    padding-top: 30px;
    color: #373a41;
  }

  .dialog_add_room {
    padding: 60px;
    text-align: center;
  }

  .dialog_add_header {
    line-height: 60px;
    font-size: 30px;
    margin-bottom: 40px;
  }

  .dialog_add_footer {
    color: #fff;
    border-radius: 35px;
    font-size: 30px;
    line-height: 70px;
    background: #0C9DFC;
  }

  .dialog_add_body {
    color: #373a41;
    font-size: 26px;
    margin-bottom: 50px;
  }
  .dialog_add_body i,.dialog_my_key i{
    font-size:26px;
    color:#ccba87;
  }

  .dialog_container.dialog_input {
    width: 520px;
    height: 354px;
    border-radius: 35px;
    overflow: hidden;
    background: rgba(255, 255, 255, .95);
  }

  .dialog_input_room {
    padding: 34px 30px;
  }

  .dialog_input_room .dialog_close {
    color:#393c43;
  }

  .dialog_input_room p {
    text-align: center;
    font-size: 36px;
    line-height: 80px;
    margin-bottom: 50px;
  }

  .dialog_container.dialog_msg {
    width: 520px;
    height:370px;
    border-radius: 35px;
  }

  .dialog_msg_room {
    padding: 40px 60px;
    text-align: center;
  }

  .dialog_msg_header {
    font-size:34px;
  }

  .dialog_msg_body {
    font-size:28px;
    margin:70px 0;
    color:#373a41;
  }


  /*输入框*/
  .ipt-box-nick {
    height: 78px;
    line-height: 78px;
    position: relative;
    border-right: 1px solid #bfbfbf;
  }

  .ipt-box-nick .ipt-real-nick {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 78px;
    line-height: 78px;
    opacity: 0;
    z-index: 3;
    color:transparent;
  }

  .ipt-box-nick .ipts-box-nick {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 1 !important;
    width: 100%;
    height: 78px !important;
    line-height: 78px !important;
    overflow: hidden !important;
  }

  .ipt-box-nick .ipts-box-nick .ipt-fake-box {
    height: 78px;
    line-height: 78px;
    display: flex;
    justify-content: space-between;
  }

  .ipt-box-nick .ipts-box-nick .ipt-fake-box input {
    width: 78px;
    height: 78px;
    border-top: 1px solid #bfbfbf;
    border-left: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf ;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 56px ;
    text-align: center;
    padding: 0;
  }

  .ipt-box-nick .ipt-active-nick {
    width: 78px;
    height: 78px ;
    line-height: 78px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .ipt-box-nick .ipt-active-nick img {
    vertical-align: middle;
  }
  .dialog .inviteCode-first-myCode1{
    margin:20px 30px 0;
    display: flex;
    display: -webkit-flex;
    height: 72px;
    line-height: 72px;
    position: relative;
    border:1px solid #bfbfbf;
  }
  .dialog .inviteCode-first-myCode1 li{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
    border-right:1px solid #bfbfbf;
  }
  .dialog .inviteCode-first-myCode1 li:nth-of-type(7){
    position: absolute;
    left:0;
    top:0;
    height: 70px;
  }
  .dialog .inviteCode-first-myCode1 li:nth-of-type(6) {
    border:none;
  }
  .dialog .inviteCode-first-myCode1 li:nth-of-type(7) {
    border:none;
    height: 70px;
  }
  .dialog .inviteCode-first-myCode1 li:nth-of-type(7) p input{
    margin: 10px auto;
    width:60px;
    height:48px;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 40px;
    background: rgba(0,0,0,0);
    border:0;
  }
  .dialog  .inviteCode-first-myCode1 li p{
    margin:0 auto;
    width:68px;
    height:68px;
    line-height: 68px;
    text-align: center;
    color: #0C9DFC;
    font-weight: bold;
    font-size: 40px;
  }
</style>
