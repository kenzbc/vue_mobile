<template>
  <div class="dialog search_dialog">
    <div class="dialog_bj" @click="dialogClose()" @touchmove.prevent></div>
    <div class="dialog_container dialog_search_win">
      <div class="dialog_header">中奖查询</div>
      <div class="dialog_content dialog_search_content">
        <section>
          <p class="dialog_search_tips">最近24小时，中奖结果</p>
          <ul class="dialog_search_list cl">
            <li>
              <p class="dialog_search_name">中奖次数<span></span></p>
              <p class="dialog_search_num">{{getListData.count ? getListData.count : '0'}}</p>
            </li>
            <li>
              <p class="dialog_search_name">积分<span></span></p>
              <p class="dialog_search_num">{{getListData.guozi ? getListData.guozi : '0'}}</p>
            </li>
            <li>
              <p class="dialog_search_name">门票</p>
              <p class="dialog_search_num">{{getListData.ticket ? getListData.ticket : '0'}}</p>
            </li>
          </ul>

        </section>
      </div>
      <div class="dialog_footer cl">
        <p @click="dialogSearchBtn(1)" class="mpm_btn active search_btn fll">查看结果</p>
        <p @click="dialogSearchBtn(2)" class="mpm_btn active search_btn flr">查看明细</p>
      </div>
    </div>
  </div>
</template>
<script>
  import store from "store";
  export default {
    name: 'dialog-search',
    data () {
      return {
        guoziIcon:this.$store.state.guoziIcon,
        getListData:''
      }
    },
    created(){
    },
    methods: {
      dialogClose(){
        this.$emit('dialogHide', false);
      },
      getmMyDayGuoziList (){
        this.$api('/services/task/my_day_guozi_list.php', {
        }).then(response => {
          if (response.code == 200) {
            this.getListData = response.data;
          }
        });
      },
      dialogSearchBtn (status){
        this.$emit('dialogHide', false);
        if ( status == 1 ) {
          //统计“中奖查询”按钮点击数
          this.pushEvent(store.get('loginInfo').type, 'zhongjiang_btn', 'jieguo');
          store.set('my_status','2');
          this.$router.push({
            path: "/my"
          });
        } else if( status == 2 ){
          //统计“中奖查询”按钮点击数
          this.pushEvent(store.get('loginInfo').type, 'zhongjiang_btn', 'mingxi');
          this.$router.push({
            path: "/MyRecord",
//            query: {
//              log_type: '2'
//            }
          });
        }

      }
    },
    mounted () {
      this.getmMyDayGuoziList();
    },
  }
</script>
<style scoped>
  .search_dialog .dialog_bj {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .dialog_container{
    z-index: 51;
  }
  .dialog_search_win {
    width: 640px;
  }
  .dialog_search_content p {
    font-size: 28px;
  }
  .dialog_search_content p.dialog_search_tips{
    width: 388px;
    height: 56px;
    line-height: 56px;
    color: #fff;
    text-align: center;
    background:  url("../../static/images/dialog_search_bg.png") center top no-repeat;
    background-size: contain;
    margin: 0 auto 40px auto;
  }
  .dialog_search_list li{
    width: calc(100%/3);
    text-align: center;
    float: left;
  }
  .dialog_search_list li p.dialog_search_name{
    color: #A8ABB3;
    position: relative;
    margin-bottom: 10px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(168,171,179,1);
    line-height:40px;
  }
  .dialog_search_list li p.dialog_search_name span{
    content: '';
    width: 4px;
    height: 28px;
    background: #F6DAFF;
    position: absolute;
    right: 0;
    top: 6px;
  }
  .dialog_search_list li p.dialog_search_num{
    color: #5348FF;
    font-size:40px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:56px;
  }
</style>
