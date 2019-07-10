<template>
  <div>
    <!--房间类型切换-->
    <div class="nav-tab">
      <span v-for="(items,index) in type_list" :key="index" :class="type_status == items.name ? 'active' : ''"  @click="change_type(items.name)">{{items.name}}</span>
    </div>

    <div style="padding:28px;">
      <!--房间列表-->
      <div class="room-list-box" v-for="(items,index) in room_list" :key="index" v-show="type_status == '全部' || items.tour_tag == type_status"  @click="testBtn(items.roomID,items.is_experience_room)" v-if="!items.isHideFull || items.isHideFull != true">
        <div class="head" :style="{backgroundImage:'url(' + items.cover_url + ')'}" style="background-size:cover;">
          <span v-for="(room_name,room_index) in room_type" :key="room_index" v-show="items.type == room_name.type">
            <room-type-icon :type="items.type"></room-type-icon>
          </span>


          <div class="title">
            <span v-html="items.name">周三LPL最高2000积分</span>
            <span v-html="items.room_desc">前800名有奖，最高2000积分</span>
          </div>
          <div class="subtitle">
            <span>{{items.at_times}}/{{items.num}}</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item">
            <span v-html="items.price">1</span>
            <span>入场费
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon-menpiao--copy"></use>
            </svg>
            </span>
          </div>
          <div class="item"><span v-html="items.prize_num">前8000名</span><span>中奖范围</span></div>
          <div class="item">
            <span><span class="checked-num" :class="{'active':items.member_at_times>0}">{{items.member_at_times ? items.member_at_times : 0}}</span>/{{items.times}}</span>
            <span v-if="items.member_at_times > 0">已参与</span>
            <span v-else>未参与</span>
          </div>
          <div class="item">
            <span v-html="items.prize_amount">16000</span>
            <span>奖励
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-JFx"></use>
            </svg>
            </span>
          </div>
        </div>
        <div class="date"><i class="iconfont">&#xe6c6;</i> {{items.at_end_time | formatDate}}
          <span class="bk" v-if="items.is_must_open == 1">必开</span>
          <span class="rmk" v-else>满{{items.num_limit != '0' ? items.num_limit : items.num}}人开</span>
        </div>
      </div>

      <div style="display:none;" class="room-list-box">
        <div class="head">
          <img src="../assets/image/icon_60_SOLO@2x.png" alt="">
          <div class="title">
            <span>周三LPL最高2000积分</span>
            <span>前800名有奖，最高2000积分</span>
          </div>
          <div class="subtitle">
            <span>69/2000</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item"><span>1</span><span>入场费</span></div>
          <div class="item"><span>前8000名</span><span>中奖范围</span></div>
          <div class="item"><span>0/5</span><span>未参与</span></div>
          <div class="item"><span>16000</span><span>奖励</span></div>
        </div>
        <div class="date"><i class="iconfont">&#xe6c6;</i> 2018.08.08 16:00 <span class="bk">必开</span><span class="rmk">人满开</span></div>
      </div>

    </div>


  </div>
</template>

<script>
  import store from "store";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import HeadTop from "../components/header.vue";
  import DialogSetplat from '../components/dialogSetplat.vue'
  import DialogExchange from '../components/dialogExchange.vue'
  import DialogSearch from '../components/dialogSearch.vue'

  export default {
    name: "Room-HTML",
    data() {
      return {
        plate_id:'',
        rechargeShow:true,
        hTitle: "幻联赛",

        room_list:"",
        list: "",
        type_list:[],
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


        isActive: 0,
        pic_404: "https://img1.famulei.com/active/zm/zm_empty.png",
        img_long_btn: ["../static/images/long_btn.png"],
        room_type: [
          {type: 1, value: "新手"},
          {type: 2, value: "活动"},
          {type: 3, value: "日赛"},
          {type: 4, value: "周赛"},
          {type: 5, value: "SOLO"},
          {type: 6, value: "名人"},
          {type: 7, value: "毒奶房"},
          {type: 9, value: "自定义房间"},
        ],
        orderInfo: [
          //        测试用
          //        {
          //          roomID:2724,
          //          member_at_times:1,
          //          type:1,
          //        },
          //        {
          //          roomID:2728,
          //          member_at_times:4,
          //          type:2,
          //        },
        ],
        room_list_data: "",

        room_sign_data: {
          my_ticket:'',
        },

        isRoomList: false, //json数据list是否为空数组
      };
    },
    deactivated() {
      this.busy = true;
    },
    components: {
      swiper,
      swiperSlide,
      headTop: HeadTop,
      //    dialogPay: DialogPay,
      dialogSetplat: DialogSetplat,
      dialogExchange: DialogExchange,
      dialogSearch: DialogSearch
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

      this.plate_id = this.$route.query.plate_id;

      //判断登录后请求房间列表api
      if (this.member) {
        this.getRoomApi();
      }else {
        this.$repeatLogin();
        this.$root.hub.$on("loginSuccess", _ => {
          this.getRoomApi();
        })
      }

    },
    watch: {},
    methods: {
      //更改房间类型
      change_type(type_name){
        this.type_status = type_name;
      },
      //获取房间列表
      getRoomApi () {
        let _this = this;
        this.MPId = this.MPId || 4;
        this.$api("/services/fantasy/room_list.php", {
          plate_id:_this.plate_id,
        }).then(response => {
          this.loading = true;
          this.room_list = response.data.room_list; //房间列表
          this.type_list = response.data.cate_list; //房间类型
          if(this.type_list && this.type_list.indexOf('LPL')>0){
            this.type_status = 'LPL';
          }else{
            this.type_status = '全部';
          }
          if (this.type_list && this.room_list.length == 0) {
            this.isRoomList = true;
          }

          this.pop_up_data = "";
          this.pushEvent(this.MPId, "home");
        })
      },

      //跳转房间详情
      testBtn(roomID, is_experience) {
        if (is_experience == 1) {
          this.$router.push({
            path: "/RoomDetail",
            query: {
              roomID: roomID,
              experience: is_experience
            }
          });
        } else {
          this.$router.push({
            path: "/RoomDetail",
            query: {
              roomID: roomID
            }
          });
        }
      },


    },
    computed: {
      member () {
        return this.$store.state.member
      },
    },
    mounted (){

    }
  }
</script>

<style lang="stylus" scoped>
  .nav-tab{
    margin-top:20px;
    display flex;
    justify-content:flex-start;
    align-items center;
    overflow-x auto;
    -webkit-overflow-scrolling:touch;

    span {
      display inline-block;
      flex-shrink:0;
      text-align center;
      width:168px;
      height:56px;
      line-height @height;
      margin-left:28px;
      color:#B2B0D2;
      font-size:28px;
      background: #F0f0f0;
      box-shadow:0px 16px 12px -12px rgba(241,237,255,0.5);
      border-radius:12px;
    }
    span.active{
      background:rgba(83,72,255,1);
      box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
      border-radius:6px;
      color:#fff;
    }
  }
  .nav-tab::-webkit-scrollbar {
    display: none;
  }

  .room-list-box{
    height:268px;
    margin-bottom:28px;
    background:rgba(255,255,255,1);
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;


    .head{
      height:96px;
      color:#fff;
      background:rgba(83,72,255,1);
      box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
      border-radius:12px 12px 0 0;
      padding:0 10px;
      display flex;
      align-items center;

      img {
        width 92px;
        height 92px;
      }

      .title{
        flex-wrap:wrap;
        flex-grow:1;
        margin-left:20px;

        span{
          display block;
          width:400px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-child(1){
          display block;
          font-size 28px;
          color:#fff;

        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }
      .subtitle{
        width 190px;
        padding-right:10px;
        flex-wrap:wrap;
        justify-content flex-end;

        span{
          display block;
          text-align right;
          width 100%;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }

    }


    .content{
      display flex;
      justify-content space-between;
      align-items center;

      .item{
        width 140px;
        padding-top:28px;
        flex-wrap wrap;


        span{
          display block;
          text-align center;
          width 100%;
          color:#5B579A;
          font-size:28px;
          margin-right:10px;

          .checked-num{
            display:inline;
            margin-right:0px;
          }
          .checked-num.active{
            color:#5348FF;
          }
        }
        span:nth-child(2){
          margin-top:4px;
          font-size:22px;
          color:#B2B0D2;
          margin-right:10px;
        }


      }

    }

    .date{
      padding:28px;
      display flex;
      align-items center;
      color:#B2B0D2;

      i {
        margin-right:10px;
        font-weight bold;
      }

      span{
        margin-left:10px;
      }
      .bk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#B5B1FF;
        border-radius:4px;
      }
      .rmk{
        padding:0 4px;
        height:24px;
        font-size:16px;
        color:#fff;
        background:#F4A7BE;
        border-radius:4px;
      }


    }

  }






</style>
