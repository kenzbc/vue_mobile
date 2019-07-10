<template>
  <div style="position:fixed;width:100%;height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:28px;">


    <div class="ticket-box" v-if="$route.query.log_type == 0">
      <div class="ticket-text split-line">当前门票</div>
      <div class="ticket-num">{{ticket}}</div>
    </div>

    <div class="ticket-box ticket-box-jf purple" v-if="$route.query.log_type == 2">
      <div class="ticket-text">当前积分</div>
      <div class="line"></div>
      <div class="ticket-num">{{guozi}}</div>
    </div>


    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <!--门票-->
      <div class="item-box mt-15" v-for = "(log_lists,index) in array_new" v-if="$route.query.log_type != 2">
        <div class="item-box-title fz-10 headBgBlueColor" v-text="index">2018.08</div>
        <div class="item-box-content">
          <div class="item-list" v-for="(items,index) in log_lists">
            <span class="subtitle">{{items.title == '每日登录' ? '签到': items.title}} <small>{{items.date_string}}</small></span>

            <span v-if="parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0" class="num income">+{{items.number?items.number:items.guozi}}<i class="iconfont">&#xe6f7;</i></span>

            <span v-if="parseFloat(items.number) < 0 || parseFloat(items.guozi) < 0" class="num expend">{{items.number?items.number:items.guozi}}<i class="iconfont">&#xe6f7;</i></span>
          </div>

          <!--<div class="item-list">-->
            <!--<span>幻联赛签到 <small>2018/08/10 10:51</small></span>-->
            <!--<span class="num expend">-1<i class="iconfont">&#xe6f7;</i></span>-->
          <!--</div>-->
          <!--<div class="item-list">-->
            <!--<span>幻联赛签到 <small>2018/08/10 10:51</small></span>-->
            <!--<span class="num income">+10<i class="iconfont">&#xe6f7;</i></span>-->
          <!--</div>-->
        </div>
      </div>

      <!--积分-->
      <div class="item-box mt-15" v-if="$route.query.log_type == 2">
        <div style="display:none;" class="item-box-title fz-11 headBgBlueColor">2018.08</div>
        <div class="item-box-content">
          <div class="item-list" v-for="(items,index) in log_list">
            <span class="subtitle">{{items.title}} <small>{{items.add_time | formatDate}}</small></span>

            <span v-if="parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0" class="num income">+{{items.number?items.number:items.guozi}}
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-JFx"></use>
            </svg>
            </span>

            <span v-if="parseFloat(items.number) < 0 || parseFloat(items.guozi) < 0" class="num expend">{{items.number?items.number:items.guozi}}
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-JFx"></use>
            </svg>
            </span>
          </div>

          <!--<div class="item-list">-->
          <!--<span>幻联赛签到 <small>2018/08/10 10:51</small></span>-->
          <!--<span class="num expend">-1<i class="iconfont">&#xe6f7;</i></span>-->
          <!--</div>-->
          <!--<div class="item-list">-->
          <!--<span>幻联赛签到 <small>2018/08/10 10:51</small></span>-->
          <!--<span class="num income">+10<i class="iconfont">&#xe6f7;</i></span>-->
          <!--</div>-->
        </div>
      </div>

      <div class="load_message">{{message}}</div>
    </div>



    <loading v-show="loading==false"></loading>


  </div>
</template>

<script>
  import Vue from 'vue'
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import loading from '../components/loading.vue'
  export default {
    name: 'TicketDetail',
    data () {
      return {
        log_title:'',
        log_type:'',
        log_list:[],
        ticket:'',
        diamond_number:'',
        guozi:'',
        last_log_id:'',
        page:1,
        busy:false,
        isLoad:0,
        loading:false,
        message:'暂无更多内容',
        fantasy_key:'',
        array_new:[],
        jf_list:[],
        array_jf:[],
      }
    },
    created(){

//      let member_info = store.get('member_info');
//      if(member_info == undefined){
//        this.$router.push({path:'/home'});
//      }
//      if(JSON.parse(sessionStorage.getItem('avatar'))==null){
//        this.$router.push({path:'/room'});
//      }else{
//        if(JSON.parse(sessionStorage.getItem('avatar'))==''){
//          this.$router.push({path:'/room'});
//        }
//      }
    },
    deactivated(){
      this.busy=true;
    },
    mounted(){
      // this.getData()
    },
    methods:{
      loadMore(){

        if(this.isLoad==0){
          this.message='加载中...';
          this.busy = true;
          setTimeout(() => {

            this.getData();
          }, 300);
        }else{
          this.message='暂无更多内容'
        }

      },
      //时间string 转换
      getDate(time){
        let log_year = time.slice(0,4);
        let log_mouth = time.slice(5,7);
        return log_year + '.' + log_mouth
      },
      getData(){
        var _this = this;

        if(this.$route.query.log_type == 0){
          _this.pushEvent(store.get('loginInfo').type, 'myrecord', 'ticket');
          _this.log_type = '/services/fantasy/ticket_log.php';
          _this.log_title = '门票明细'
        }else if(this.$route.query.log_type == 1){
          _this.log_type = '/services/fantasy/diamond_log.php';
          _this.log_title = '钻石明细'
        }else if(this.$route.query.log_type == 2){
          _this.pushEvent(store.get('loginInfo').type, 'myrecord', 'guozi');
          _this.log_type = '/services/task/my_guozi_list.php';
          _this.log_title = '积分明细'
        }else if(this.$route.query.log_type == 3){
          _this.log_type = '/services/fantasy/key_log.php';
          _this.log_title = '钥匙明细'
        }
        this.$api( _this.log_type , {
          start_id:this.last_log_id,
          page:this.page,
          limit:12
        }).then(response => {
          //console.log(response);
          if(response.code==200){
            _this.loading = true;
            _this.log_list = _this.log_list.concat(response.data.list);

            if(this.$route.query.log_type != 2){
              //罗列日期
              let array_date = [];
              _this.log_list.forEach(function(item){
                array_date.push(_this.getDate(item.date_string));
              });
//                  console.log(array_date);

              //日期去重
              let array_data_repeat = [];
              for(var i = 0; i < array_date.length; i++ ){
                if(array_data_repeat.indexOf(array_date[i]) == -1){
                  array_data_repeat.push(array_date[i]);
                }
              }

              let array_new = {};
              //循环遍历，重建数组
              for(var i = 0; i < array_data_repeat.length; i++){
                array_new[ array_data_repeat[i] ] = [];
                _this.log_list.forEach(function(item){
                  if(_this.getDate(item.date_string) == array_data_repeat[i]){
                    array_new[array_data_repeat[i]].push(item);
                  }
                });
              }
              _this.array_new = array_new;
            }



            if(response.data.ticket){
              _this.ticket = response.data.ticket;
            }else if(response.data.diamond_number){
              _this.diamond_number = response.data.diamond_number;
            }else if(response.data.guozi){
              _this.guozi = response.data.guozi;
            }else if(response.data.fantasy_key){
              _this.fantasy_key = response.data.fantasy_key;
            }

            var AllListLenth = _this.log_list.length;
            if(AllListLenth != 0){
              _this.last_log_id = _this.log_list[AllListLenth-1].log_id;
              _this.page++;
            }

            if(response.data.list == 0){
              _this.isLoad = 1;
              _this.message = '暂无更多内容'
            }
          }
          this.busy = false
        });
        this.loading = false
      }
    },
    components: {
      headTop:HeadTop,
      loading
    },
    watch:{
      '$route.query.log_type' () {
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  MAIN_BACKGROUND=#F8F7FA;

  *{
    font-size: 22px;
    box-sizing: border-box;
  }

  .fz-9{font-size:18px;}
  .fz-10{font-size:20px;}
  .fz-11{font-size:22px;}
  .fz-12{font-size:24px;}
  .fz-14{font-size:28px;}
  .fz-16{font-size:32px;}
  .fz-18{font-size:36px;}
  .fz-20{font-size:40px;}

  .mt-2{margin-top:4px;}
  .mt-4{margin-top:8px;}
  .mt-10{margin-top:20px;}
  .mt-15{margin-top:30px;}
  .mt-20{margin-top:40px;}
  .mt-30{margin-top:60px;}

  .text-center{text-align: center}
  .text-left{text-align: left}
  .text-rigth{text-align: right}
  .f-left{ float:left;}
  .f-rigth{ float: right}

  .headBgBlueColor{
    background:rgba(83,72,255,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgBlueColor + .item-box-content .earnings span{color:#5348FF;}
  .headBgPurpleColor{
    background:rgba(156,72,255,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgPurpleColor + .item-box-content .earnings span{color:#9C48FF;}
  .headBgRedColor{
    background:rgba(239,27,90,1);
    box-shadow:0px 2px 0px 0px rgba(241,237,255,0.5);
    border-radius:12px 12px 0px 0px;
  }
  .headBgRedColor + .item-box-content .earnings span{color:#EF1B5A;}


  .view-box{
    padding:28px 28px 0 28px;
    background:MAIN_BACKGROUND;
    display flex;
    justify-content space-between;
    align-items center;
    flex-wrap:wrap;
    color:#fff;
  }

  .ticket-box{
    position: relative;
    overflow:hidden;
    height 96px;
    border:none;
    background:linear-gradient(to right,#2ab6fc ,#5352fb);
    //box-shadow:0 10px 10px rgba(#2ab6fc,0.2);
    display flex;
    justify-content space-between;
    align-items center;
    color:#fff;

    .ticket-text{
      width 30%;
      height 100%;
      display inline-flex;
      justify-content center;
      align-items center;
      border-right: 2px dashed #fff;
      font-size:24px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#FFF;
      line-height:34px;
    }
    .ticket-num{
      width 70%;
      height 100%;
      display inline-flex;
      justify-content center;
      align-items center;
      font-size:40px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#fff;
    }
  }
  .ticket-box.purple{
    background:linear-gradient(to right,#B848FF ,#5348FF);
  }
  .ticket-box:after,.ticket-box:before{
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: MAIN_BACKGROUND;
    border-radius:50%;
    z-index: 1;
  }
  .ticket-box-jf{
    box-shadow:0px 16px 12px -12px rgba(141,72,255,0.5);
    border-radius:12px;

    .line{
      width:4px;
      height:40px;
      border:2px solid #fff;
    }
    .ticket-text{
      border-right: 2px dashed transparent;
    }
  }
  .ticket-box-jf:after,.ticket-box-jf:before{
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: none;
    border-radius:50%;
    z-index: 1;
  }


  .ticket-box:after{
    top:32px;
    right: -18px;
  }
  .ticket-box:before{
    top:32px;
    left: -18px;
  }



  .item-box .item-box-title{
    height: 52px;
    line-height: 52px;
    padding-left: 28px;
    color: #fff;
    font-family:PingFangSC-Semibold;
    font-weight:600;
  }
  .item-box .item-box-content{
    width:100%;
    min-height:50px;
    display: flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    background #fff;
    border-radius:0 0 12px 12px;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);


    .item-list{
      width 100%;
      padding:0 28px;
      display flex;
      align-items center;
      justify-content space-between;
      height 84px;
      background #fcfcfc;
      color:#B2B0D2;
      font-size:22px;

      .subtitle{
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(178,176,210,1);
        line-height:32px;

        small{
          font-size:18px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(178,176,210,1);
          line-height:26px;
        }
      }

      .num{
        font-size:28px;
      }
      .income{
        color:#5348FF;
        font-size:28px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
      }
      .expend{
        color:#EF1B5A;
        font-size:28px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
      }
      .iconfont{
        color:#4EC6FC;
        font-size:28px;
        margin-left:10px;
      }

    }
    .item-list:nth-child(odd){
      background:#fff;
    }

  }




</style>
