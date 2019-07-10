<template>
    <div title="已结束" style="padding:28px;">

      <div v-show="startedList!=''" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
           infinite-scroll-distance="50">
      <div v-for="item in startedList">
      <div class="room-list-box" v-for="items in item.room_list" @click="savestatus()">
        <router-link :to="{path:'roomInfo',query:{roomID:items.roomID,orderId:items.order_id}}">
        <div class="head">
          <room-type-icon :type="items.type"></room-type-icon>

          <div class="title">
            <span>{{items.name}}</span>
            <span>{{items.room_desc}}</span>
          </div>
          <div class="subtitle">
            <span>{{items.at_times}}/{{items.num}}</span>
            <span>参与人数</span>
          </div>
        </div>
        <div class="content">
          <div class="item"><span>{{items.rank}}</span><span>最终排名</span></div>
          <div class="item"><span>{{items.total_score}}</span><span>阵容积分</span></div>
          <div class="item"><span>{{items.order_prize_amount}}</span><span>获得奖金</span></div>
        </div>
        <div class="date">
          花费门票：<span>{{items.price}}</span> &nbsp;
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-menpiao--copy"></use>
          </svg>
          &nbsp;&nbsp;&nbsp;&nbsp;参与次数：<span>{{items.member_at_times}}/{{items.times}}</span>
        </div>
        </router-link>
      </div>
      </div>
      </div>


      <loading v-show="loading==false"></loading>
      <div class="started-null" v-show="loading&&startedList==''">
        <img src="static/images/nothing_icon.png" alt="">
        <p>暂无已结束的房间~</p>
      </div>

    </div>
</template>

<script>
  import store from 'store'
  import loading from '../loading.vue'
  export default {
    name: 'Finished',
    data () {
      return {
        startedList: [],
        room_type: ['', '新手', '活动', '日赛', '周赛', 'Solo', '名人', '毒奶', 'Solo'],
        busy: false,
        loading: false,
        isAll: 0,
        start_id: '',
        message: '暂无更多内容',
        page:'1',
      }
    },
    created() {
    },
    methods: {
      loadTop(){
        var _this = this;
        if (this.isAll == 0) {
          this.message = '加载中...';
          this.$api('/services/fantasy/get_member_room.php', {
            // start_id: this.start_id,
            page:this.page,
            status: 2,
            limit: 10,
          }).then(response => {
            if (response.code == 200) {
              _this.loading = true;
              if (response.data.list.length == 0) {
                _this.isAll = 1;
                _this.message = '暂无更多内容';
              }
              _this.startedList = _this.startedList.concat(response.data.list);
              if (response.data.list.length != 0) {
                // _this.start_id = response.data.list[response.data.list.length - 1].order_id;
                _this.page++
              }
              //新手引导
              if(store.get('member_info').is_new_user == '1'){
                // if (store.get('new_player').indexOf('my_end') < 0) {
                //   //恭喜中奖
                //   store.set('new_player', store.get('new_player') + 'my_end');
                //   this.$root.hub.$emit('new_player_go_Success', '1');
                //   this.pushEvent(store.get('loginInfo').type, 'xinshou', '7');
                //   store.set('my_status','0');
                // }
                // this.pushEvent(store.get('loginInfo').type, 'my', '2')
              }
            }

            _this.busy = false;
          })
        }
      },
      loadMore(){
        if(this.isAll == 0){
          this.busy = true;
          setTimeout(() => {
            this.loadTop();
          }, 600);
        }
      },
      savestatus(){
        sessionStorage.setItem('status', '2')
      },
    },
    components: {
      loading
    }
  }
</script>

<style lang="stylus" scoped>

  /* 新手引导 */
  .tutorial{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;

      .desc-text{
        padding:0px 28px 28px;

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


    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

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




  .room-list-box{
    margin-bottom:28px;
    background:rgba(255,255,255,1);
    box-shadow:0px 12px 18px -8px rgba(241,237,255,0.5);
    border-radius:12px;
    position:relative;


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
      padding:0 60px;
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
          font-family:PingFangSC-Semibold;
          font-weight:600;
          line-height:40px;
        }
        span:nth-child(2){
          margin-top:4px;
          font-size:22px;
          color:#B2B0D2;
          margin-right:10px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          line-height:32px;
        }


      }

    }

    .date{
      padding:28px 28px 12px 28px;
      display flex;
      align-items center;
      color:#B2B0D2;

      span{
        margin-left:10px;
        font-size:22px;
        color: #5B579A;
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
