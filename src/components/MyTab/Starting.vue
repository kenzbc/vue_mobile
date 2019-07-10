<template>
  <div title="进行中" style="padding:28px;">

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="50" v-show="onList!=''">

    <div class="room-list-box" v-for="(items,index) in onList">

      <!--阵容-->
      <div class="battle-array">
        <div class="average-score">
          <span>阵容平均分：{{items.avg_score}}</span>
          <span>参与房间数：{{items.room_list.length}}</span>
          <span>
            <span class="edit">编辑</span>
            <i @click="showRun(index)" class="iconfont control" :class="{'active':arr1[index]==1}">&#xe673;</i>
          </span>
        </div>
        <div class="team">
          <div class="item" title="TOP">
            <player-item
              :position="items.member_team[0].top.position_short_name"
              :background-img="items.member_team[0].top.bg2"
              :player-avatar="items.member_team[0].top.player_image"
              :score="items.member_team[0].top.socre_average"
              :nickname="items.member_team[0].top.player_nickname"
              :team-name="items.member_team[0].top.team_short_name"
            ></player-item>
          </div>
          <div class="item" title="JUG">
            <player-item
              :position="items.member_team[0].jun.position_short_name"
              :background-img="items.member_team[0].jun.bg2"
              :player-avatar="items.member_team[0].jun.player_image"
              :score="items.member_team[0].jun.socre_average"
              :nickname="items.member_team[0].jun.player_nickname"
              :team-name="items.member_team[0].jun.team_short_name"
            ></player-item>
          </div>
          <div class="item" title="MID">
            <player-item
              :position="items.member_team[0].mid.position_short_name"
              :background-img="items.member_team[0].mid.bg2"
              :player-avatar="items.member_team[0].mid.player_image"
              :score="items.member_team[0].mid.socre_average"
              :nickname="items.member_team[0].mid.player_nickname"
              :team-name="items.member_team[0].mid.team_short_name"
            ></player-item>
          </div>
          <div class="item" title="ADC">
            <player-item
              :position="items.member_team[0].adc.position_short_name"
              :background-img="items.member_team[0].adc.bg2"
              :player-avatar="items.member_team[0].adc.player_image"
              :score="items.member_team[0].adc.socre_average"
              :nickname="items.member_team[0].adc.player_nickname"
              :team-name="items.member_team[0].adc.team_short_name"
            ></player-item>
          </div>
          <div class="item" title="SUP">
            <player-item
              :position="items.member_team[0].sup.position_short_name"
              :background-img="items.member_team[0].sup.bg2"
              :player-avatar="items.member_team[0].sup.player_image"
              :score="items.member_team[0].sup.socre_average"
              :nickname="items.member_team[0].sup.player_nickname"
              :team-name="items.member_team[0].sup.team_short_name"
            ></player-item>
          </div>
        </div>
      </div>

      <div v-show="arr1[index]==1" @click="savestatus()" v-for="(roomItem,i) in items.room_list">
        <router-link :to="{path:'RoomInfo',query:{roomID:items.roomID,orderId:roomItem.order_id}}" >
        <div class="line"></div>
        <div class="head" :style="{backgroundImage:'url(' + roomItem.cover_url + ')'}" style="background-size:cover;">
          <room-icon :type="roomItem.type"></room-icon>

          <div class="title">
            <span>{{roomItem.name}}</span>
            <span>{{roomItem.room_desc}}</span>
          </div>
          <div class="subtitle">
            <span>{{roomItem.join_times}}</span>
            <span>参与次数</span>
          </div>
        </div>
        <div class="content">
          <v-runing :running="roomItem"></v-runing>
        </div>
        <div class="date">
          <span>当前排名</span>
          <span class="c-blue">{{roomItem.rank}}</span>/
          <span class="c-light-blue">{{roomItem.at_times}}</span>
        </div>
        </router-link>
      </div>

    </div>

    </div>





    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&onList==''">
      <img src="static/images/nothing_icon.png" alt="">
      <p>暂无进行中的的房间~</p>
    </div>



  </div>
</template>

<script>
  import store from 'store'
  import vRuning from '../RuningLine.vue';
  import loading from '../loading.vue'
  import roomIcon from '../RoomTypeIcon.vue'
  var arr1 = new Array()
  export default {
    name: "Starting",
    data () {
      return {
        onList:[],
        arr1,
        leval,
        loading:false,
        busy: false,
        room_type:['','新手','活动','日赛','周赛','Solo','名人','毒奶','Solo'],
//        room_bg:['','new-people-bg','active-bg','day-bg','week-bg','solo-bg','star-people-bg','dunai-bg','solo-bg1','diy-bg1'],
        running:{},
        cur_player:{
          TOP:'',
          JUG:'',
          MID:'',
          ADC:'',
          SUP:''
        },
        roomList:[],
        isAll:0,
        start_id:'',
        page:1,
        message:'暂无更多内容',
      }
    },
    deactivated(){
    },
    created() {
    },
    methods:{
      loadTop(){
        var _this=this;
        if(this.isAll==0){

          this.message = '加载中...';
          this.$api('/services/fantasy/get_member_room.php', {
            // start_id:this.start_id,
            page:this.page,
            limit:5,
            status:1
          }).then(response => {
            // console.log(response.data.data.list.length)
            if(response.code==200){
              _this.loading=true;

              if(response.data.list.length==0 ){
                _this.isAll=1;
                _this.message = '暂无更多内容'
              }else{
                var index=_this.arr1.length;
                for(var i=0;i<response.data.list.length;i++){
                  _this.arr1[index+i]=1;
                }
                _this.page++
                this.pushEvent(store.get('loginInfo').type, 'my', '1')
              }
              var index=_this.arr1.length;
              for(var i=0;i<response.data.list.length;i++){
                _this.arr1[index+i]=1;
              }
              var length=response.data.list.length;
              _this.onList=_this.onList.concat(response.data.list);
              // if(response.data.list.length != 0) {
              //   _this.start_id = response.data.list[response.data.list.length - 1].order_id;
              // }
            }
            _this.busy=false;
          });
        }

      },
      loadMore(){
        if(this.isAll == 0) {
          this.busy = true;
          setTimeout(() => {
            this.loadTop();
          }, 600);
        }
      },
      showRun:function (element) {
        if(this.arr1[element]==0){
          this.$set(this.arr1, element, 1)
        }else{
          this.$set(this.arr1, element, 0);
        }
      },
      savestatus(){
        sessionStorage.setItem('status','1')
      },
      dataStore(items,roomID){
        //console.log(roomID)
        var cur_player = {
          TOP:'',
          JUG:'',
          MID:'',
          ADC:'',
          SUP:''
        };
        this.cur_player.TOP=items.member_team[0].top;
        this.cur_player.JUG=items.member_team[0].jun;
        this.cur_player.MID=items.member_team[0].mid;
        this.cur_player.ADC=items.member_team[0].adc;
        this.cur_player.SUP=items.member_team[0].sup;
        store.set('user',{cur_player:this.cur_player});

        this.$router.push({path:'/Selected',query:{statued:'2',roomID:roomID}});
      }
    },
    components: {
      vRuning,
      loading,
      roomIcon,
    }
  }
</script>

<style lang="stylus" scoped>

  .c-blue{
    color:#5348FF;
  }
  .c-light-blue{
    color:#B2B0D2;
  }

  .head-menu{
    padding:0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height 84px;
    background #fff;

    .tab-item{
      flex-shrink:0;
      display:block;
      width:140px;
      height: 40px;
      line-height: 20px;
      text-align: center;
      color: #B2B0D2;
      position: relative;

      .title{
        font-size: 28px;
        font-family: "PingFang SC";
      }
    }
    .tab-item.active{
      .title{
        color: #5348FF;
        font-weight bold;
      }
    }
    .tab-item.active span.dot{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      background: #5348FF;
      position:absolute;
      top:30px;
      left:63px;
    }

  }



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
      background:rgba(255,255,255,1);
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
    /*height:268px;*/
    margin-bottom:28px;
    background:rgba(255,255,255,1);
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;
    overflow: hidden;

    .line{
      width 100%;
      border-bottom:1px solid #f4f3fc;
    }

    .head{
      height:96px;
      color:#fff;
      background:rgba(83,72,255,1);
      box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
      border-radius:12px;
      margin:20px;
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
          width 100%;
        }
        span:nth-child(1){
          font-size 28px;
          color:#fff;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
          width 400px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;

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
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          font-size:22px;
          color:#9B95FF;
        }
      }

    }


    .content{
      padding:0 40px;
      display flex;
      justify-content space-between;
      align-items center;

      .progress{
        width: 100%;
        height: 150px;
        padding-top: 80px;
        position: relative;

        .icon-num{
          width: 82px;
          height: 120px;
          display flex;
          justify-content center;
          align-items center;
          flex-wrap: wrap;

          position: absolute;
          bottom: 40px;
          z-index: 20;
          left: 25%;

          span{
            width 100%;
            height:28px;
            background:#5348FF;
            color:#fff;
            border-radius:6px;
            text-align center;
          }
        }

        .bar{
          width 100%;
          height:50px;
          background:#F8F7FF;
          position relative;

          .mosaic{
            position absolute;top:0;right:0;
            height 50px;
            width 24px;

            img {
              max-width 100%;
            }
          }
        }


        .text-num{
          display flex;
          justify-content space-between;
          align-items center;
          font-size:22px;
          color:#B2B0D2;
        }
      }

    }


    .date{
      padding:28px 28px 6px 28px;
      display flex;
      justify-content center;
      align-items center;
      color:#B2B0D2;
      font-size:28px;

      span{
        margin:0px;
        font-size:28px;
        font-weight bold;
      }
      span:first-child{
        margin:10px;
        font-size:22px;
        font-weight normal;
      }


    }


    .battle-array{
      width:100%;
      //height:342px;
      background:#fff;
      padding:10px 24px;

      .average-score{
        padding-top:14px;
        display flex;
        justify-content space-between;
        align-items center;


        span{
          font-size:24px;
          font-weight:bold;
          color:#5B579A;
        }
        span:last-child{
          width:120px;
          display flex;
          justify-content flex-end;
          align-items center;

          i {
            font-size: 27px;
            color: #5451fb;
            transition: all 0.3s;
          }
          i.active{
            font-size: 27px;
            color: #5451fb;
            display: inline-block;
            transform: rotate(180deg);
          }
        }
        .edit{
          width:88px;
          height:40px;
          background:rgba(83,72,255,1);
          border-radius:12px;
          font-size:24px;
          color:#fff;
          display flex;
          justify-content center;
          align-items center;
          display none;
        }
      }

      .team{
        //width:calc(100% / 5);
        margin-bottom:14px;
        display flex;
        justify-content space-between;

        .iconfont{
          font-size:24px;
        }

        .item{
          margin-top: 20px;
          width:calc(100% / 5 - 11px);

          div{
            display inline-flex;
            align-items center;
            width 100%;
            font-size:20px;
            color:#B2B0D2;
          }

          .photo{
            margin-top:8px;
            height 144px;
            display flex;
            align-items flex-end;
            position relative;

            .bg{
              position absolute;
              z-index 1;
            }
            .avatar{
              position absolute;
              z-index 2;
            }
            .score{
              position absolute;
              z-index 2;
              top:0;right 0;
              color:#5B579A;
              font-weight bold;
              font-size:18px;
            }

            img {
              max-width:100%;
            }
          }
          div:nth-child(3){
            margin-top:8px;
            font-size:24px;
            color:#5B579A;
          }
          div:nth-child(4){
            margin-top:8px;
          }



        }


      }

    }
  }


  .room-type{
    width: 76px;
    height: 76px;
    border-radius: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background: #ffbb2a;
    color: #fff;
  }

  .data-null{
    text-align: center;
    color: #b2b0d2;
  }


</style>

