<template>
  <div style="padding-bottom:180px;">
    <div class="head-menu">
      <div class="tab-item" @click="isType='day'" :class="{'active':isType=='day'}">
        <span class="title">日榜单</span>
        <span class="dot"></span>
      </div>
      <div class="tab-item" @click="isType='week'" :class="{'active':isType=='week'}">
        <span class="title">周榜单</span>
        <span class="dot"></span>
      </div>
      <div class="tab-item" @click="isType='total'" :class="{'active':isType=='total'}">
        <span class="title">总榜单</span>
        <span class="dot"></span>
      </div>

    </div>

    <div style="padding:20px 28px 0px 28px;">
      <div class="head-title">
        <span>{{period}}</span>
        <span>{{update}}</span>
      </div>

    </div>


    <div class="data-list-box title">
      <div class="item user">
        &nbsp;&nbsp;&nbsp;用户排名
      </div>
      <div class="item score">收益</div>
      <div class="item earnings">中奖率</div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy1" infinite-scroll-distance="100">
      <div class="data-list-box" v-for="item in listData">
        <div class="item user">
          <span v-if="item.position == 1"><img src="../assets/image/icon_level_1@2x.png"></span>
          <span v-else-if="item.position == 2"><img src="../assets/image/icon_level_2@2x.png"></span>
          <span v-else-if="item.position == 3"><img src="../assets/image/icon_level_3@2x.png"></span>
          <span v-else><span class="dot-num">{{item.position}}</span></span>
          <span><img class="avatar" :src="item.avatar" ></span>
          <span class="nickname">{{item.nickname}}</span>
        </div>
        <div class="item score">
          {{item.amount}}
          <span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-JFx"></use>
            </svg>
          </span>
        </div>
        <div class="item earnings">
          <span>{{item.win_num}}</span>

        </div>
      </div>
      <div class="message"><img v-if="isLoading" src="/static/images/loading.gif" width="20"> {{message}}</div>
    </div>




    <div class="footer-info">
      <div class="item user">
        <span><span class="dot-num">{{meList.position}}</span></span>
        <span><img style="border-radius:50%;" :src="meList.avatar" ></span>
        <span>{{meList.nickname}}</span>
      </div>
      <div class="item score">
        {{meList.amount}}
        <span>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-JFx"></use>
          </svg>
        </span>
      </div>
      <div class="item earnings">
        <span>{{meList.win_num}}</span>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "Room-HTML",
    components:{

    },
    data () {
      return {
        busy1: false,
        isAll: 0, //0：继续请求接口 1：不再请求接口
        isLoading:false,
        message:'暂无更多内容',
        pageNo:1, //分页
        isType:'day',//day日榜，week周榜，total总榜
        listData:[],
        meList:'',
        period:'',
        update:'',
      }
    },
    mounted(){

    },
    watch: {
      //监听按钮类型切换
      changeType(newVal, oldVal){
        this.pageNo = 1;
        this.listData = [];
        this.getDataList();
      },
    },
    computed: {
      changeType(){
        return this.isType;
      }
    },
    methods: {

      //上拉获取更多
      loadMore(){
        if (this.isAll == 0) {
          this.busy1 = true;
          setTimeout(() => {
            this.getDataList();
          }, 1000);
        }
      },
      getDataList:function(){
        let _this = this;
        if(_this.isAll != 0){
          return false;
        }

        this.message = '加载中...';
        this.isLoading = true;
        this.$api('/services/canyon/bang_list.php',{
          type:_this.isType,
          page:_this.pageNo,
        })
          .then(function (res) {
            if(res.code==200){
              if(res.data.list.length == 0){
                _this.isAll = 1;
                _this.message = '暂无更多内容';
                _this.isLoading = false;
              }else{
                _this.pageNo++;
              }

              _this.meList = res.data.me;
              _this.period = res.data.period;
              _this.update = res.data.update;

              _this.listData = _this.listData.concat(res.data.list);

            }

            _this.busy1 = false;
          })
          .catch(function (error) {
            layer.open({content: '请求失败！error='+error,skin: 'msg',time: 2});
          })
      }
    },

  }
</script>

<style lang="stylus" scoped>
  body {
    font-family: "PingFang SC";
    color: #fff;
    margin: 0;
    padding: 0;
    position: relative;
    background: none;
  }

  .c-blue{
    color:#5348FF;
  }
  .c-light-blue{
    color:#B2B0D2;
  }

  .message{
    margin-top:20px;
    text-align center;
    color: #d7d6f8;
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
      /*height: 40px;*/
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
      bottom: -20px;
      left:63px;
    }

  }



  .head-title{
    display flex;
    align-items center;
    justify-content space-between;
    color:#B2B0D2;
    font-size:22px;
    margin-bottom:10px;


    span {
      span {
        color:#5348FF;
      }
    }

  }



  .data-list-box{
    min-height:88px;
    overflow: hidden;
    background:#fff;
    display flex;
    justify-content space-between;
    align-items center;
    flex-wrap wrap;
    color:#5B579A;
    font-size:24px;
    font-weight bold;

    .user{
      padding-left:10px;
      display inline-flex;
      align-items center;
      flex-grow:1;

      span:first-child{
        width 50px;
      }
      span{
        display flex;
        justify-content center;
        align-items center;

        .dot-num{
          width: initial;
          background: #d7d6f8;
          font-size: 20px;
          color: #fff;
          border-radius: 32px;
          font-weight: 400;
          display: inline-block;
          text-align: center;
          padding: 3px 8px;
        }
      }

      .nickname{
        width: 280px;
        justify-content: flex-start;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      img {
        margin:0 10px;
        border-radius:50%;
      }
      img.avatar{
        width 60px;
        height 60px;
      }


    }
    .score{
      width 180px;
      padding:20px;
      text-align right;
    }
    .earnings{
      width: 140px;
      padding:30px;
      text-align right;
    }



  }
  .data-list-box:nth-child(odd){
    background #FCFCFC;
  }
  .data-list-box.title{
    min-height 30px;
    border-bottom:1px solid #f4f3fc;
    background #fff;
  }

  .footer-info{
    display flex;
    justify-content space-between;
    align-items center;
    position fixed;
    bottom 0;
    width 100%;
    height:108px;
    background:linear-gradient(135deg,rgba(184,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 8px 12px -4px rgba(141,72,255,0.5);
    color:#fff;

    .item{
      justify-content center;
      align-items center;
    }

    .user{
      padding-left:10px;
      display inline-flex;
      align-items center;
      justify-content flex-start;
      flex-grow:1;

      span:first-child{
        width 50px;
      }
      span{
        display flex;
        justify-content center;
        align-items center;

        .dot-num{
          display flex;
          justify-content center;
          align-items center;
          min-width 34px;
          height 34px;
          background #d7d6f8;
          font-size:20px;
          color:#fff;
          border-radius 34px;
          font-weight normal;
        }
      }
      img {
        max-width 60px;
        margin:0 10px;
      }


    }
    .score{
      width 140px;
      text-align right;
    }
    .earnings{
      width 160px;
      text-align right;
      padding-right:30px;
    }
  }



  .footer-info{
    display flex;
    justify-content space-between;
    align-items center;
    position fixed;
    bottom 0;
    width 100%;
    padding-right:30px;
    height:108px;
    background:linear-gradient(135deg,rgba(184,72,255,1) 0%,rgba(83,72,255,1) 100%);
    box-shadow:0px 8px 12px -4px rgba(141,72,255,0.5);
    color:#fff;

    .item{
      justify-content center;
      align-items center;
    }

    .user{
      padding-left:10px;
      display inline-flex;
      align-items center;
      justify-content flex-start;
      flex-grow:1;

      span:first-child{
        width 50px;
      }
      span{
        display flex;
        justify-content center;
        align-items center;

        .dot-num{
          display flex;
          justify-content center;
          align-items center;
          min-width 34px;
          height 34px;
          background #d7d6f8;
          font-size:20px;
          color:#fff;
          border-radius 34px;
          font-weight normal;
        }
      }
      img {
        max-width 60px;
        margin:0 10px;
      }


    }
    .score{
      width 140px;
      text-align right;
    }
    .earnings{
      width 160px;
      text-align right;
    }
  }





</style>
