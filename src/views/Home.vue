<template>
  <div>
    <div style="padding:28px;margin-bottom:100px;">

      <!--顶部个人信息-->
      <div class="my-card">
        <div class="my-info">
          <div><img class="avatar" :src="member_info.avatar ? member_info.avatar  : '/static/images/tx_pic.jpg'" width="100%"></div>
          <div class="info">
            <span>{{member_info.nickname}}</span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon-menpiao--copy"></use>
              </svg>
              &nbsp;门票：{{member_info.ticketCount}} &nbsp;<img @click="rechargeBtn()" v-show="rechargeShow" src="../assets/image/btn_buyTicket@2x.png"></span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-JFx"></use>
              </svg>
              &nbsp;积分：{{member_info.guozi}}</span>
          </div>
          <div class="grade-help">
            <span class="hexagon-btn" onclick="location.href='MyRecord'">战绩</span>
            <span class="hexagon-btn" @click="changeCourseShow()">教程</span>
          </div>
        </div>
        <div class="control-btn">
          <button class="button" @click="roomSearchBtn()">中奖查询</button>
          <button class="button" @click="roomExchangeBtn()">{{exchangeData.is_exchange_text}}</button>
          <button class="button" title="签到" :class="is_sign.status == 1 ? 'active' : ''" @click="roomSignBtn()">{{is_sign.text}}</button>
        </div>
      </div>


      <!--设置设备-->
      <dialog-setplat title="选择设备类型" v-if="setplatShow" @dialogHide="change" :msg="setplatShow"></dialog-setplat>

      <!--兑换门票-->
      <dialog-exchange title="兑换门票" v-if="exchangeShow" @dialogHide="change" :msg="exchangeShow" :exchange-list="exchangeData"></dialog-exchange>

      <!--中奖查询-->
      <dialog-search title="中奖查询" v-if="searchShow" @dialogHide="change" :msg="searchShow"></dialog-search>


      <!--签到动画弹层-->
      <div class="dialog sign-dialog" v-show="isDialogSign">
        <div class="dialog_bj" @click="dialogSignClose()" @touchmove.prevent></div>
        <div class="dialog_container dialog_7_sign">
          <div class="dialog_7_top"></div>
          <section class="dialog_home_content cl">
            <div class="dialog_7_item" :class="sign_data.number == 1 ? 'flipInY' : sign_data.number > 1 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第1天</p>
              <p class="dialog_7_item_prise">1张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item" :class="sign_data.number == 2 ? 'flipInY' : sign_data.number > 2 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第2天</p>
              <p class="dialog_7_item_prise">1张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item" :class="sign_data.number == 3 ? 'flipInY' : sign_data.number > 3 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket2.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第3天</p>
              <p class="dialog_7_item_prise">2张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item" :class="sign_data.number == 4 ? 'flipInY' : sign_data.number > 4 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第4天</p>
              <p class="dialog_7_item_prise">1张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item" :class="sign_data.number == 5 ? 'flipInY' : sign_data.number > 5 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第5天</p>
              <p class="dialog_7_item_prise">1张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item" :class="sign_data.number == 6 ? 'flipInY' : sign_data.number > 6 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第6天</p>
              <p class="dialog_7_item_prise">1张</p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
            <div class="dialog_7_item dialog_7_day7" :class="sign_data.number == 7 ? 'flipInY' : sign_data.number > 7 ? 'dialog_7_item_signed':''">
              <img src="static/images/ticket3.png" class="dialog_7_item_pic">
              <p class="dialog_7_item_day">第7天</p>
              <p class="dialog_7_item_prise dialog_7_item_prise7 cl"><span class="fll">3张</span><span class="flr">100积分</span></p>
              <div class="dialog_7_item_signed_pic"></div>
            </div>
          </section>
          <div class="banner">
            <swiper :options="swiperOption" ref="mySwiper":class="'banner_wrap'" v-if="this.banner_list">
              <swiper-slide v-for="(item,index) in this.banner_list">
                <a :href="item.go_url_web ? item.go_url_web : 'javascript:;'">
                  <img :src="item.image_url+'?x-oss-process=image/resize,mfit,h_150,w_542'" width="542" height="150">
                </a>
              </swiper-slide>
            </swiper>
          </div>
          <div class="footer">
            <p @click="roomExchangeBtn()" class="dialog_7_btn" v-if="DialogSignClose">赚取更多门票</p>
            <div class="dialog_sign_success" v-else>
              <div class="dialog_sign_success_bg">
                <img src="static/images/sign_success_gou.png" class="dialog_sign_success_gou">
                <!--<div class="dialog_sign_success_shadow"></div>-->
              </div>
              <img src="static/images/sign_success_bg.png" class="dialog_sign_success_hua">
              <p class="dialog_sign_success_p">签到成功</p>
            </div>
          </div>
        </div>
      </div>

      <!--快速加入-->
      <div class="quick-join" @click="joinRoom()">
        <img src="../assets/image/quick-join@2x.png"/>
      </div>

      <!--房间列表-->
      <div class="room">
        <div class="room-left">
          <router-link :to="{path:'/Room',query: {plate_id:1}}">
          <div class="room-item xinshou">
            <img src="../assets/image/icon_room_type1@2x.png">
            <div class="text">
              <span>新手房</span>
              <span>房间数：{{plate_list.length ? plate_list[0].room_num : '0'}}</span>
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/Room',query: {plate_id:2}}">
          <div class="room-item chujie">
            <img src="../assets/image/icon_room_type2@2x.png" alt="">
            <div class="text">
              <span>初阶房</span>
              <span>房间数：{{plate_list.length ? plate_list[1].room_num : '0'}}</span>
            </div>
          </div>
          </router-link>
          <router-link :to="{path:'/Room',query: {plate_id:3}}">
          <div class="room-item zhongjie">
            <img src="../assets/image/icon_room_type3@2x.png" alt="">
            <div class="text">
              <span>中阶房</span>
              <span>房间数：{{plate_list.length ? plate_list[2].room_num : '0'}}</span>
            </div>
          </div>
          </router-link>
          <router-link :to="{path:'/Room',query: {plate_id:4}}">
          <div class="room-item gaojie">
            <img src="../assets/image/icon_room_type4@2x.png" alt="">
            <div class="text">
              <span>高阶房</span>
              <span>房间数：{{plate_list.length ? plate_list[3].room_num : '0'}}</span>
            </div>
          </div>
          </router-link>
        </div>

        <div class="room-right">
          <router-link :to="{path:'/Canyon',query: {}}">
          <div class="room-item canyon">
            <img src="../assets/image/icon_120_cup@2x.png" alt="">
            <div class="text">
              <span>峡谷时刻</span>
              <span>90倍奖励</span>
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/Room',query: {plate_id:5}}">
            <div class="room-item dunai">
              <img src="../assets/image/icon_room_type5@2x.png" alt="">
              <div class="text">
                <span>毒奶房</span>
                <span>房间数：{{plate_list.length ? plate_list[4].room_num : '0'}}</span>
              </div>
            </div>
          </router-link>

          <router-link :to="{path:'/Room',query: {plate_id:8}}">
            <div class="room-item huodong">
              <img src="../assets/image/icon_room_type8@2x.png" alt="">
              <div class="text">
                <span>活动房</span>
                <span>房间数：{{plate_list.length ? plate_list[5].room_num : '0'}}</span>
              </div>
            </div>
          </router-link>

          <div class="room-item other" style="display:none;">
            <img src="../assets/image/icon_room_type6@2x.png" alt="">
            <div class="text">
              <span>更多玩法</span>
              <span>敬请期待</span>
            </div>
          </div>

        </div>


      </div>

    </div>




    <!--dialog 提示弹层-->
    <div class="dialog anim-opacity2" v-if="isDialogRoom">
      <div class="dialog_bj" @click="dialogClose" @touchmove.prevent></div>
      <div class="dialog_container dialog_home">
        <img class="d_close" src="static/images/fantasy_home_icon_close.png" alt="" @click="dialogClose">
        <img class="d_heli" src="static/images/fantasy_home_pic_heli.png" alt="">
        <div class="dialog_home_content">
          <p class="title">{{pop_up_data[0].title}}</p>
          <div class="body">
            <img :src="pop_up_data[0].app_image_url" alt="" v-if="pop_up_data[0].app_image_url != ''">
            <p>{{pop_up_data[0].desc}}</p>
          </div>
          <div class="footer">
            <p @click="dialogLink(pop_up_data[0].jump_url_web)">{{pop_up_data[0].button_txt}}</p>
          </div>
        </div>
      </div>
    </div>


    <!--峡谷时刻浮动ICON-->
    <div id="canyon_icon" ref="canyon_icon" class="canyon-icon" style="display:none;">
      <router-link :to="{path:'/Canyon',query: {}}"><img src="static/images/xiagu_banner.png" ></router-link>
    </div>







    <!--新手引导弹层-教程 1-1 -->
    <div v-if="courseShowBtn" @click="courseShowBtn=!courseShowBtn" class="tutorial1-1">
      <div class="content">
        <img src="static/images/tutorial1-1@2x.png"/>
      </div>
    </div>

    <div v-if="courseShow && courseStep=='1'" @click="newUserNextBtn('1')" class="tutorial1-1">
      <div class="content">
        <img src="static/images/tutorial1-1@2x.png"/>
        <div class="next-btn">下一步</div>
      </div>
    </div>


    <!--新手引导弹层，tabbar我的比赛 2-1 -->
    <div v-if="courseShow && courseStep=='6'" @click="newUserNextBtn('6')" class="tutorial2-1">
      <div class="content">
        <div class="desc-text">
          <div class="text">点击【我的比赛】<br>查看刚参与的比赛</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>
        <div class="footer-icon">
          <i class="iconfont active">&#xe645;</i>
          <span>我的比赛</span>
        </div>
      </div>
    </div>
    <!--新手引导弹层,商城 (8)-->
    <div v-if="courseShow && courseStep=='8'" @click="newUserNextBtn('8')" class="tutorial2-3">
      <div class="content">
        <div class="desc-text">
          <div class="text">那么赶紧去【商城】看看有什么可以兑换吧。</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>
        <div class="footer-icon">
          <i class="iconfont active">&#xe64a;</i>
          <span>商城</span>
        </div>
      </div>
    </div>

    <!--新手引导弹层，快速加入-->
    <div v-if="courseShow && courseStep=='12'" class="tutorial-fastJoin">
      <div class="content">
        <div class="quick-join" @click="newUserNextBtn('12')">
          <img src="../assets/image/quick-join@2x.png"/>
        </div>
        <div class="desc-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text">房间太多看花眼？ 点【快速加入】试试吧</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import store from "store";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import DialogSetplat from '../components/dialogSetplat.vue'
  import DialogExchange from '../components/dialogExchange.vue'
  import DialogSearch from '../components/dialogSearch.vue'
  import CourseTutorial from '../components/CourseTutorial.vue' //新手教程

  export default {
    name: "Home-HTML",
    components:{
      swiper,
      swiperSlide,
      dialogSetplat: DialogSetplat,
      dialogExchange: DialogExchange,
      dialogSearch: DialogSearch,
      CourseTutorial:CourseTutorial,
    },
    data() {
      return {
        courseShowBtn:false,//首页单页新手教程
        //新的
        plate_list:[
          {"id":"1", "name":"新手房", "ticket_low":"0", "ticket_high":"0", "room_num":0, "text_color":"0"},
          {"id":"2", "name":"初阶房", "ticket_low":"1", "ticket_high":"3", "room_num":0, "text_color":"0"},
          {"id":"3", "name":"中阶房", "ticket_low":"4", "ticket_high":"10", "room_num":0, "text_color":"0"},
          {"id":"4", "name":"高阶房", "ticket_low":"11", "ticket_high":"10000", "room_num":0, "text_color":"0"},
          {"id":"5", "name":"毒奶房", "ticket_low":"0", "ticket_high":"100", "room_num":0, "text_color":"0"},
          {"id":"8", "name":"活动房", "ticket_low":"0", "ticket_high":"100", "room_num":0, "text_color":"0"}
        ], //房间类型列表
        room_new:[],//新手房
        room_experience:[],//快速加入体验房
        courseShow:false,//是否显示教程
        courseStep:0,//新手教程步骤
        iterator:'',//


        guoziIcon:this.$store.state.guoziIcon,
        IsShow: "",
        rechargeShow:true, //是否显示充值按钮
        hTitle: "幻联赛",
        Vdata: "",
        is_sign:{
          status: 0,//签到状态 1：已签到 0：未签到
          text: '签到',
        },
        searchShow: false,  //中奖查询订单弹窗
        exchangeShow: false, //兑换按钮弹窗
        setplatShow:false,//设置设备弹窗
        plat:'1',
        exchangeData:{
          status:3, //来源   1：home/match  2.商城
          tickets:'',  //门票
          mengbi_count:'',
          lastExchangeDate:'',
          is_exchange:0,
          is_exchange_text:'兑换'
        },


        list: "",

        type_status:'',
        pop_up_data: "",
        matching_count: "",
        swiperOption: {
          loop : true,
          notNextTick: true,
          autoplay: 3000,
          mousewheelControl: true,
          paginationType : 'fraction',
        },
        payList: {
          status: "",
          isPrompt: true
          //  index:'',  //1:钻石成功  2.钻石失败  3.门票成功  4.门票失败
        },

        vShow: false,
        ticket: 0,
        isDialogRoom: false,
        isMember: false,
        MPId: "",
        isActive: 0,
        pic_404: "https://img1.famulei.com/active/zm/zm_empty.png",
        img_long_btn: ["../static/images/long_btn.png"],

        orderInfo: [

        ],
        room_list_data: "",
        isDialogSign: false, //是否显示签到弹层
        DialogSignClose:false,
        active_banner:false,
        sign_data:{},
        room_sign_data: {
          my_ticket:'',
        },
        isTutorial: false,
        isRoomList: false, //json数据list是否为空数组
        member_info:'',
        banner_list:[]

      };
    },
    deactivated() {
      this.busy = true;
    },
    created() {
      if (this.$route.query.open_uuid) {
        //      store.remove("member_info");
        store.remove("roomID");
        store.remove("room_info");
        store.remove("room_player");
        store.remove("user");
        store.remove("matchIDs");
        store.remove("pop_up_data");
        // store.remove("my_status");
      }
      //储存
      if(this.$route.query.showBack == '1'){
        store.set("showBack", this.$route.query.showBack);
      }

      //2018.12.12增加验证如果是IOS不显示充值
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        this.rechargeShow = false;
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.rechargeShow = true;
      }


        //判断如果是10月10日，显示s8活动按钮
      var zm_date = new Date();
      if(zm_date.getMonth()+1 == 10 && zm_date.getDate() >= 10){
        this.active_banner = true;
      }else if(zm_date.getMonth()+1 == 11 && zm_date.getDate() <= 3){
        this.active_banner = true;
      }
      //
      //判断登录后请求房间列表api
      if (this.member) {
        //this.getRoomApi();
        this.isSelectDeviceType ();//是否选择过设备
        this.member_info = store.get('member_info');
      }else {
        this.$repeatLogin();//重新登录
        this.$root.hub.$on("loginSuccess", _ => {
          this.member_info = store.get('member_info');
          //this.getRoomApi();
          this.isSelectDeviceType ();//是否选择过设备
        })
      }
      this.$root.hub.$on("joinRoomSuccess", _ => {
        this.isTutorial = true;
        this.joinRoom();
      });
    },
    watch: {},
    computed: {
      member () {
        return this.$store.state.member
      },
    },
    mounted (){

    },
    methods: {
      dialogClose: function() {
        this.isDialogRoom = false;
        this.is_sign.status = 0;
      },
      //关闭签到弹层
      dialogSignClose() {
        this.isDialogSign = false;
      },

      /**
       * 新手任务弹层下一步  加入体验房按钮动作
       * @parameter
       * @return
       * **/
      joinRoomExperience(){
        //立即加入添加统计
        this.pushEvent(store.get('loginInfo').type, 'home_join_btn', '');

        if (this.room_experience.length >= 0) {
          this.testBtn(this.room_experience[0].roomID, 1);
        }
      },
      //快速加入按钮--废弃
      joinRoom_old() {
        //更新新手任务状态
        this.setNewUserTask(3);

        //立即加入添加统计
        this.pushEvent(store.get('loginInfo').type, 'home_join_btn', '');
        //体验房：1  非体验房：0
        var _this = this;
        //未参加过体验房
        var experienceID = [];
        //已参加过一次但还可以参与的体验房
        var experienceID_ing = [];

        //新手房
        //未参加过新手房roomID
        var curNewOrder = [];
        //已参加过一次但还可以参与的新手房
        var curNewOrder_ing = [];

        //普通房间
        var NewOrder = [];
        //已参加过一次但还可以参与的普通房间
        var NewOrder_ing = [];

        //新手房
        this.room_new.forEach(function (item, index) {
          if( parseInt(item.num) - parseInt(item.at_times) != 0 ){
            if (parseInt(item.is_experience_room) == 1) {
              if ((!item.member_at_times || parseInt(item.member_at_times) == 0) ) {
                experienceID.push(item.roomID);
              } else if (item.member_at_times && parseInt(item.member_at_times) < parseInt(item.times)) {
                experienceID_ing.push(item.roomID);
              } else {
                //            console.log('参加完了的体验房' + item.roomID);
              }
            } else if (parseInt(item.type) == 1 && item.is_experience_room != 1) {
              if (!item.member_at_times || parseInt(item.member_at_times) == 0) {
                curNewOrder.push(item.roomID);
              } else if (item.member_at_times && parseInt(item.member_at_times) < parseInt(item.times)) {
                curNewOrder_ing.push(item.roomID);
              } else {
                //            console.log('参加完了的新手房' + item.roomID);
              }
            } else {
              if (!item.member_at_times || parseInt(item.member_at_times) == 0) {
                NewOrder.push(item.roomID);
              } else if (item.member_at_times && parseInt(item.member_at_times) < parseInt(item.times)) {
                NewOrder_ing.push(item.roomID);
              } else {
                //            console.log('参加完了普通房间' + item.roomID);
              }
            }
          }
        });

        //未参加过的体验房
        if (experienceID.length != 0) {
          this.testBtn(experienceID[0], 1);
          //        } else if(experienceID_ing.length != 0){
          //          this.testBtn(experienceID_ing[0],1);
          // 未参加过的新手房
        } else if (curNewOrder.length != 0) {
          this.testBtn(curNewOrder[0]);
          // 参加过但未达到上限新手房
        } else if (curNewOrder_ing.length != 0) {
          this.testBtn(curNewOrder_ing[0]);

          //其他房间依次序推荐
          //        } else if(NewOrder != ''){
          //          this.testBtn(curOrder[0]);
        } else {
          layer.open({
            content: "已经没有可参与的新手房了，去看看其他房间。",
            btn: "知道了"
          });
          this.getRoomApi();
          this.$root.hub.$emit("new_player_go_Success", "0");
          // window.location.reload;
        }
      },
      /**
       * 快速加入按钮动作
       * @parameter
       * @return
       * **/
      joinRoom() {

        //立即加入添加统计
        this.pushEvent(store.get('loginInfo').type, 'home_join_btn', '');
        //体验房：1  非体验房：0
        var _this = this;

        if (_this.room_new && _this.room_new.length != 0) {//新手房
          this.testBtn(_this.room_new[0].roomID);
        } else {
          layer.open({
            content: "暂时没有房间可加入了~",
            btn: "知道了"
          });
          this.getRoomApi();
          this.$root.hub.$emit("new_player_go_Success", "0");
          // window.location.reload;
        }
      },
      /**
       * 判断用户是否选择过设备类型
       * @parameter
       * @return
       * **/
      isSelectDeviceType (){

        if(!store.get('member_info').ticket_type){//
          //判断是否选择过设备
          this.pushEvent(this.MPId, 'setplat', 'show');
          //this.setplatShow = true;
          //改为直接帮用户绑定
          let _this = this;
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            this.plat = '1';
          } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            this.plat = '2';
          }
          this.$api('/services/qw/set_plat.php', {
            plat:_this.plat,
          }).then(response => {
            if (response.code == 200) {
              let member_info = store.get('member_info');
              member_info.ticket_type = this.plat;
              store.set('member_info',member_info);
              this.pushEvent(store.get('loginInfo').type, 'setplat', 'success');

              //如果有体验房，则开启新手任务
              if(this.room_experience.length > 0){
                //触发新手任务步骤
                this.startNewUserTask();
              }


            }else{
              this.pushEvent(store.get('loginInfo').type, 'setplat', response.code);
              layer.open({
                content: response.message,
                btn: '关闭'
              });
            }
          });
        }else{
          this.getRoomApi();
        }
      },

      /**
       * 请求接口初始化房间类型数据
       * @parameter
       * @return
       * **/
      getRoomApi () {
        this.MPId = this.MPId || 4;
        this.$api("/services/fantasy/room_home.php", {}).then(response => {
          this.loading = true;
          this.Vdata = response.data;

          this.plate_list = response.data.plate_list;
          this.iterator = this.plate_list[Symbol.iterator]();
          this.room_new = response.data.room_new;//
          this.room_experience = response.data.room_experience; //体验房
          this.banner_list = response.data.banner_list;//签到轮播图

          //如果没有选择过设备
          //新手引导
          if (this.room_experience.length != 0) {
            //开启新手任务步骤
            this.startNewUserTask();
          }else{
            //判断新手引导后弹出连续签到
            this.isSign();
          }


          //判断新手引导后弹出连续签到
          this.isSign();
          this.pop_up_data = "";
          this.pushEvent(this.MPId, "home");
        })
      },
      /**
       * 开启新手任务步骤主功能区域
       * @parameter
       * @return
       * **/
      startNewUserTask(){
        //判断是否完成新手教程
        if (store.get('member_info').is_new_user != "" && store.get('member_info').is_new_user != '0') {
          let newUserStep = store.get("new_user_step");
          let isNewUserStatus = store.get('member_info').is_new_user;

          if(isNewUserStatus == '1' && !newUserStep && this.room_experience.length > 0){
            this.courseShow = true;
            this.courseStep = '1';
            store.set("new_user_step", '1');
          }else if(isNewUserStatus == '2' && !newUserStep){
            this.courseShow = true;
            this.courseStep = '6';
            store.set("new_user_step", '6');
          }else if(isNewUserStatus == '3' && !newUserStep){
            this.courseShow = true;
            this.courseStep = '12';
            store.set("new_user_step",'12');
          }

          if(newUserStep == '1'){
            this.courseShow = true;
            this.courseStep = '1';
            store.set("new_user_step", '1');
          }else if(newUserStep == '6'){
            this.courseShow = true;
            this.courseStep = '6';
            store.set("new_user_step",'6');
          }else if(newUserStep == '8'){
            this.courseShow = true;
            this.courseStep = '8';
            store.set("new_user_step",'8');
          }else if(newUserStep == '12'){
            this.courseShow = true;
            this.courseStep = '12';
            store.set("new_user_step",'12');
          }
        }
      },
      /**
       * 设置新手任务按钮动作
       * @parameter step 任务步骤
       * @return
       * **/
      newUserNextBtn(step){
        if(step == '1'){
          store.set("new_user_step",'2');
          this.joinRoomExperience();//加入新手体验房
          // this.$router.push({path:'/selected', query: {}});
        }else if(step == '6'){
          store.set("new_user_step",'7');
          this.$router.push({path:'/my', query: {}});
        }else if(step == '8'){
          store.set("new_user_step",'9');
          this.$router.push({path:'/mall', query: {}});
        }else if(step == '12'){
          store.set("new_user_step",'13');
          this.courseShow = false;
          this.courseStep = '13';
          if(this.room_new && this.room_new.length > 0){
            this.setNewUserTask(3);
            this.joinRoom();
          }else{
            layer.open({
              content: "暂时没有房间可加入了~",
              btn: "知道了"
            });
          }
        }

      },

      /**
       * 更新服务端新手任务步骤
       * @parameter  step 步骤
       * @return
       * **/
      setNewUserTask(step){
        if(store.get('member_info').is_new_user != "" && store.get('member_info').is_new_user != '0'){
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
        }
      },

      /**
       * dialog组件
       * **/
      change(msg) {
        this.vShow = msg;
        if (msg == 1){
          this.exchangeShow = false;
          this.exchangeData.is_exchange = 1;
          this.exchangeData.is_exchange_text = '已兑换';
        } else {
          this.exchangeShow = msg;
          this.setplatShow = msg;
          this.searchShow = msg;
        }
      },
      dialogLink(link) {
        if (link) {
          window.location.href = link;
        } else {
          this.dialogClose();
        }
      },
      /**
       * 加入房间路由跳转
       * @parameter  roomID 房间ID
       * @parameter  is_experience 是否体验房
       * @return
       * **/
      testBtn(roomID, is_experience) {
        if (is_experience == 1) {
          this.$router.push({
            path: "/match",
            query: {
              roomID: roomID,
              experience: is_experience
            }
          });
        } else {
          this.$router.push({
            path: "/match",
            query: {
              roomID: roomID
            }
          });
        }
      },
      /**签到**/
      roomSignBtn() {
        this.Sign7Data();
        this.isDialogSign = true;
        this.DialogSignClose = true;
      },
      //获取连续签到数据
      Sign7Data() {
        var _this = this;
        this.$api("/services/fantasy/get_sign_info.php", {}).then(response => {
          if (response.code == '200') {
            _this.sign_data = response.data;
            console.log(_this.sign_data);
          }
        })
      },
      /**
       * 执行签到动作
       * @parameter
       * @return
       * **/
      getSignData() {
        // this.is_sign.room_sign = 1;
        var _this = this;
        this.$api("/services/fantasy/room_sign.php", {}).then(response => {
          // _this.isDialogSign = true;
          if (response.code == 200) {
            _this.sign_data = response.data;
            var member_info = store.get('member_info');
            member_info.sign_date = this.getTodayDate();
            member_info.ticketCount = response.data.my_ticket;
            member_info.num_7 = response.data.num_7;
            member_info.sign_number = response.data.number;
            store.set('member_info',member_info);
            _this.is_sign = {
              status: 1,
              text:'已签到'
            };

          }
        })
      },
      isSign (){
        //判断当天是否已签到
        if (store.get("member_info") && store.get("member_info").sign_date == this.getTodayDate() ) {
          this.isDialogSign = false;
          this.is_sign = {
            status: 1,
            text:'已签到'
          };
        }else{
          //当天未签到，执行签到动作
          this.getSignData();
          // this.Sign7Data();
          this.isDialogSign = true;
        }
        //判断当天是否已兑换
        if (store.get("member_info") && store.get("member_info").lastExchangeDate == this.getTodayDate() ) {
          this.exchangeData.is_exchange = 1;
          this.exchangeData.is_exchange_text = '已兑换';
        }
      },
      roomHelpBtn() {
        this.$root.hub.$emit("new_player_go_Success", "3");
      },

      //兑换按钮
      roomExchangeBtn() {
        //关闭签到弹窗
        this.isDialogSign = false;
        //统计兑换按钮点击数
        this.pushEvent(store.get('loginInfo').type, 'duihuan_btn', '');
        this.getMemberInfo ();
      },
      getMemberInfo (){
        this.exchangeData.status = 1;
        this.exchangeData.tickets = store.get("member_info").ticketCount;
        this.exchangeData.mengbi_count = store.get("member_info").mengbi_count;
        this.exchangeData.lastExchangeDate = store.get("member_info").lastExchangeDate;
        this.exchangeShow = true;
      },
      //充值按钮
      rechargeBtn (){
        this.pushEvent(store.get('loginInfo').type, 'chongzhi_btn', '');
        location.href = "qtpay://guessBuy?game_app_id=5";
      },
      //中奖查询
      roomSearchBtn (){
        console.log('中奖查询~');
        //统计“中奖查询”按钮点击数
        this.pushEvent(store.get('loginInfo').type, 'zhongjiang_btn', '');
        if ( this.member ){
          this.searchShow = true;
        } else {
          this.$repeatLogin();
          this.$root.hub.$on("loginSuccess", _ => {
            this.searchShow = true;
          })
        }
      },



      //是否显示教程
      changeCourseShow(){
        this.courseShowBtn = !this.courseShowBtn;
      },
    }
  }
</script>

<style lang="stylus" scoped>
  /* 新手引导 */
  .tutorial1-1{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;position:absolute;z-index:2;
      top:50%;margin-top:-500px;text-align:center;
    }

    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

  }


  /* 新手引导 */
  .tutorial2-1{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;position:absolute;z-index:2;bottom:0;

      .desc-text{
        width 400px;
        margin-left:calc(100% / 4 - 105px);

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

      .footer-icon{
        width: calc(100% / 4);
        margin-left:calc(100% / 4);
        height:98px;
        background: #fff;
        color: #5348FF;
        display: flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;

        i{
          font-size:48px;
        }

        span{
          width 100%;
          display block;
          text-align center;
        }
      }
    }


  }


  /* 新手引导 */
  .tutorial2-3{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;position:absolute;z-index:2;bottom:0;

      .desc-text{
        width 400px;
        margin-left:calc((100% / 4) * 2 - 105px);

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

      .footer-icon{
        width: calc(100% / 4);
        margin-left:calc(100% / 4 * 2);
        height:98px;
        background: #fff;
        color: #5348FF;
        display: flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;

        i{
          font-size:48px;
        }

        span{
          width 100%;
          display block;
          text-align center;
        }
      }
    }


  }


  /* 新手引导 */
  .tutorial-fastJoin{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{

      .quick-join{
        text-align center;
        margin-top: 310px;
      }
      .desc-text{
        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }


    }


  }



  import 'swiper/dist/css/swiper.css'



  .canyon-icon{
    width: 130px;
    position: absolute;
    right: 0;
    bottom: 10%;
    height: 190px;
  }







  .my-card{
    //height:236px;
    padding:28px;
    background:linear-gradient(135deg,rgba(184,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 16px 12px -12px rgba(141,72,255,0.5);
    border-radius:20px;

    .my-info{
      width 100%;
      background: none;
      display flex;
      justify-content flex-start;
      align-items: center;

      .avatar{
        display block;
        width 120px;
        height 120px;
        border-radius 50%;
      }

      .info{
        width:340px;
        padding-left:28px;
        font-size:24px;
        color:#B5B1FF;

        span{
          width 100%;
          display inline-flex;
          margin-bottom:4px;
        }
        span:nth-child(1){
          color:#fff;
          font-size:28px;
        }
      }

      .grade-help{

        .hexagon-btn{
          display inline-flex;
          justify-content center;
          align-items center;
          width 78px;
          height:90px;
          color:#fff;
          background:url('../assets/image/btn_hexagon@2x.png') no-repeat center center;
        }
        .hexagon-btn:first-child{
          margin-right:14px;
        }

      }
    }
    .control-btn{
      width 100%;
      margin-top: 28px;
      display flex;
      justify-content space-between;
      align-items: center;

      .button{
        width:196px;
        height:50px;
        font-size:24px;
        color:#5B579A;
        background:#fff;
        border-radius:12px;
      }
    }

  }


  .quick-join{
    margin-top:28px;
  }

  .room{
    display flex;
    justify-content space-between;
    flex-wrap:wrap;
    margin-top: 8px;



    .room-left{
      width:336px;

      .room-item{
        width:336px;
        height:144px;
        display flex;
        justify-content flex-start;
        align-items center;
        margin-bottom:20px;
        border-radius:12px;

        img {margin-left:10px;}

        .text{

          span{
            display inline-flex;
            align-items center;
            flex-wrap:wrap;
            width 100%;
            padding-left:28px;
            color:#fff;
          }
          span:nth-child(1){
            font-size:36px;
          }
          span:nth-child(2){
            font-size:22px;
          }
        }

      }
      .room-item.xinshou{
        background: linear-gradient(180deg, #1ff5d3 0%, #32d2e2 100%);
        box-shadow:0px 12px 8px -8px rgba(50,210,226,0.5);
      }
      .room-item.chujie{
        background: linear-gradient(180deg, #38c7e7 0%, #4aa5f3 100%);
        box-shadow:0px 12px 8px -8px rgba(74,165,243,0.5);
      }
      .room-item.zhongjie{
        background: linear-gradient(180deg, #6f94fe 0%, #c869e2 100%);
        box-shadow:0px 12px 8px -8px rgba(200,106,227,0.5);
      }
      .room-item.gaojie{
        background: linear-gradient(360deg, #fd4885 0%, #b06fb6 100%);
        box-shadow:0px 12px 8px -8px rgba(253,72,133,0.5);
      }




    }
    .room-right{
      width:336px;

      .room-item{
        margin-bottom:20px;
        border-radius:12px;
        display flex;
        justify-content space-between;
        align-items center;

        img {margin-left:10px;}

        span{
          display inline-flex;
          align-items center;
          flex-wrap:wrap;
          width 100%;
          padding-left:28px;
          color:#fff;
        }
        span:nth-child(1){
          font-size:36px;
        }
        span:nth-child(2){
          font-size:22px;
        }
      }

      .room-item.canyon{
        width:336px;
        height:308px;
        background: linear-gradient(180deg, #b848ff 0%, #5348ff 100%);
        box-shadow:0px 12px 8px -8px rgba(141,72,255,0.5);
        -ms-flex-pack: center;
        justify-content center;
        flex-wrap wrap;
        .text{
          display block;
          width 180px;
          margin-top: -70px;
        }
      }
      .room-item.dunai{
        width:336px;
        height:144px;
        background: linear-gradient(360deg, #ff487c 0%, #ff936c 100%);
        box-shadow:0px 12px 8px -8px rgba(255,71,124,0.5);
        border-radius: 12px;
      }
      .room-item.huodong{
        width:336px;
        height:144px;
        background:linear-gradient(360deg,#FFA94D 0%, #FFE15D 100%);
        box-shadow:0px 12px 8px -8px #FFA94D;
        border-radius: 12px;
      }
      .room-item.other{
        width:336px;
        height:144px;
        background: #d2d4d9;
        box-shadow:0px 12px 8px -8px rgba(210,212,217,0.5);
        border-radius:12px;
      }

    }
  }









  //签到弹层
  .dialog_home_content {
    margin-top: 120px;
    text-align: center;
    padding: 0 30px;
  }
  .sign-dialog .dialog_bj {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .sign-dialog .dialog_container{
    z-index: 51;
  }
  .sign-dialog .banner{
    width:542px;height:150px;margin:0 auto;
  }
  /*7天连续签到*/
  .dialog_7_sign{
    width: 620px;
    height: 792px;
    background: url("../../static/images/popup_bg.png") no-repeat;
    background-size: cover;
    overflow: initial;
  }
  .dialog_7_sign .dialog_home_content{
    margin-top: 80px;
    padding: 0 28px;
  }
  .dialog_7_sign .dialog_7_item{
    width: 140px;
    height: 190px;
    position: relative;
    float: left;
  }
  .dialog_7_sign .dialog_7_item_pic{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .dialog_7_sign .dialog_7_item.dialog_7_day7{
    width: 284px;
  }
  .dialog_7_item .dialog_7_item_day{
    line-height: 42px;
    font-size: 20px;
    color: #fff;
    position: relative;
    z-index: 2;
    margin-bottom: 76px;
  }
  .dialog_7_item .dialog_7_item_prise{
    line-height: 44px;
    font-size: 22px;
    color: #fff;
    position: relative;
    z-index: 2;
  }
  .dialog_7_item .dialog_7_item_prise7{
    width: 220px;
    position: relative;
    padding-left: 20px;
    margin: 0 auto;
  }
  .dialog_7_item .dialog_7_item_prise7 span{
    line-height: 44px;
    font-size: 22px;
  }
  .dialog_7_sign .dialog_7_top{
    width: 512px;
    height: 226px;
    background: url("../../static/images/popup_top.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 54px;
    top: -164px;
  }
  .dialog_7_sign .footer{
    height: auto;
    padding-top: 46px;
  }
  .dialog_7_btn{
    display: block;
    width:448px;
    height:84px;
    background:rgba(255,59,118,1);
    box-shadow:0px 16px 12px -12px rgba(255,59,118,0.5);
    border-radius:12px;
    margin: 0 auto;
    margin-top:14px;
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#fff;
    line-height:84px;
    text-align center
  }
  .dialog_7_signed{
    width: 620px;
    height: 460px;
    background: url("../../static/images/popup_bg2.png") no-repeat;
    background-size: cover;
    overflow: initial;
  }
  .dialog_7_signed .dialog_7_top{
    width: 512px;
    height: 120px;
    background: url("../../static/images/popup_top2.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 54px;
    top: -64px;
  }
  .dialog_7_signed .dialog_home_content{
    margin-top: 68px;
    padding: 0 28px;
  }

  .dialog_7_signed .dialog_home_content .dialog_7_signed_status{
    font-size: 32px;
    font-weight: normal;
    color: #FFFFFF;
  }
  .dialog_7_signed .dialog_home_content .dialog_7_signed_info{
    line-height: 100px;
    font-size: 48px;
    color: #D73CFA;
    padding-top: 36px;
  }
  .dialog_7_signed .dialog_home_content .dialog_7_signed_tips{
    font-size: 24px;
    color: #A8ABB3;
  }
  .dialog_7_signed .footer{
    height: auto;
    padding-top: 46px;
  }
  .dialog_7_signed .dialog_7_btn{
    box-shadow: 0 10px 20px 2px rgba(255,166,36,0.50);
  }
  .dialog_7_item_signed .dialog_7_item_day,.dialog_7_item_signed .dialog_7_item_prise,.dialog_7_item_signed .dialog_7_item_pic{
    opacity: 0.3;
  }
  .dialog_7_item_signed_pic{
    width: 96px;
    height: 82px;
    background: url("../../static/images/signed.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 40px;
    margin-left: -48px;
    z-index: 2;
    opacity: 0;
  }
  .dialog_7_item_signed .dialog_7_item_signed_pic{
    opacity: 1;
  }

  .dialog_sign_success{
    text-align: center;
    position: relative;
  }
  .dialog_sign_success_bg{
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  .dialog_sign_success_hua{
    width: 72px;
    position: absolute;
    top: 25px;
    transform: translate(-50%, -50%);
  }
  .dialog_sign_success_gou{
    display: block;
    width: 55px;
    margin: 15px auto 0 auto;
  }
  .dialog_sign_success_p{
    line-height: 62px;
    font-size: 34px;
    font-weight: 700;
    color: #fff;
  }
  .dialog_sign_success_shadow{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left:0;
    background:#fff;
    animation: myfirst 3s;
    -moz-animation: myfirst 3s;  /* Firefox */
    -webkit-animation: myfirst 3s;  /* Safari 和 Chrome */
    -o-animation: myfirst 3s;
    animation-fill-mode:forwards;
  }
  @keyframes myfirst
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  @-o-keyframes myfirst /* Opera */
  {
    0%   {left: 0;}
    100% {left:100px;}
  }

  .flipInY{
    backface-visibility: visible !important;
    /*animation-name: flipInY;*/
    animation: flipInY 1.5s;
    -moz-animation: flipInY 1.5s;  /* Firefox */
    -webkit-animation: flipInY 1.5s;  /* Safari 和 Chrome */
    -o-animation: flipInY 1.5s;
    animation-fill-mode:forwards;
  }
  .flipInY .dialog_7_item_day,.flipInY .dialog_7_item_prise,.flipInY .dialog_7_item_pic{
    animation: signed_item 1.5s;
    -moz-animation: signed_item 1.5s;  /* Firefox */
    -webkit-animation: signed_item 1.5s;  /* Safari 和 Chrome */
    -o-animation: signed_item 1.5s;
    animation-fill-mode:forwards;
  }
  .flipInY .dialog_7_item_signed_pic{
    animation: signed_pic 2s;
    -moz-animation: signed_pic 2s;  /* Firefox */
    -webkit-animation: signed_pic 2s;  /* Safari 和 Chrome */
    -o-animation: signed_pic 2s;
    animation-fill-mode:forwards;
  }
  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 0deg);
      animation-timing-function: ease-in;
      opacity: 1;
    }
    20% {
      transform: perspective(400px) rotate3d(0, 1, 0, -10deg);
      animation-timing-function: ease-in;
    }

    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 1;
    }

    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px);
    }
  }
  @keyframes signed_item {
    from { opacity: 1;}
    40% { opacity: 1;}
    80% { opacity: 0.6;}
    to { opacity: 0.3;}
  }
  @keyframes signed_pic {
    from { opacity: 0; transform: scale3d(1, 1, 1);}
    60% { opacity: 0; transform: scale3d(1.3, 1.3, 1.3);}
    80% { opacity: 1; transform: scale3d(1.3, 1.3, 1.3);}
    to { opacity: 1; transform: scale3d(1, 1, 1);}
  }

</style>
