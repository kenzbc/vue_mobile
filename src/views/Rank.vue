<template>
    <div class="anim-opacity2">
        <div class="ranking-header">
            <ul class="ranking-nav">
                <li @click="rankList('s8_activity')" :class="{'active':type=='s8_activity'}">
                    <p>活动排名</p>
                    <span></span>
                </li>
                <li @click="rankList('week')" :class="{'active':type=='week'}">
                    <p>周排名</p>
                    <span></span>
                </li>
                <li @click="rankList('month')" :class="{'active':type=='month'}">
                    <p>月排名</p>
                    <span></span>
                </li>
                <li @click="rankList('total')" :class="{'active':type=='total'}">
                    <p>总排名</p>
                    <span></span>
                </li>
            </ul>
            <div class="ranking-time">
                <p>{{period}}</p>
                <p>{{update}}</p>
            </div>
            <ul class="ranking-message">
                <li>用户排名</li>
                <li>收益</li>
                <li>中奖率</li>
            </ul>
        </div>
        <div class="ranking" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="200">
            <ul class="ranking-list">
                <li v-for="(items,index) in rank_list" class="cl">
                    <p v-show="items.position<=3" class="position_top">
                        <span>{{items.position}}</span>
                        <svg class="icon" :class="{'one':items.position==1,'two':items.position==2,'three':items.position==3}" aria-hidden="true">
                            <use xlink:href="#icon-icon_crown"></use>
                        </svg>
                    </p>
                    <p v-show="items.position>3" class="position"><span>{{items.position}}</span></p>
                    <img :src="items.avatar ? items.avatar : 'static/images/tx_pic.jpg'" class="avatar">
                    <p class="nickname">{{items.nickname}}</p>
                    <p class="amount">
                        {{items.amount ? items.amount : '0'}}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-JFx"></use>
                        </svg>
                    </p>
                    <p class="win_num">{{items.win_num ? items.win_num : '0%'}}</p>
                </li>
            </ul>
        </div>
        <loading v-show="loading==false"></loading>
        <ul class="ranking-myself">
            <li class="cl">
                <p class="position"><span>{{meList.position}}</span></p>
                <img :src="meList.avatar ? meList.avatar : 'static/images/tx_pic.jpg'" class="avatar">
                <p class="nickname">{{meList.nickname}}</p>
                <p class="amount">
                    {{meList.amount ? meList.amount : '0'}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-JFx"></use>
                    </svg>
                </p>
                <p class="win_num">{{meList.win_num ? meList.win_num : '0%'}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import store from 'store'
import HeadTop from '../components/header.vue'
import loading from '../components/loading.vue'
export default {
  name: 'rank',
  data () {
    return {
      loading: false,

      type: 's8_activity',
      rank_list: [],
      meList: '',
      period:'',
      update:'',
      page: 1,

      isAll: false,
      busy: false,
      flag: false

    }
  },
  created() {
    if (this.member) {

    } else {
      this.$repeatLogin();
      this.$root.hub.$on("loginSuccess", _ => {
        this.rankList(this.type);
      })
    }
  },
  methods: {
    rankList(type){
      if(type !== this.type){
          this.page = 1;
          this.isAll = false;
          this.rank_list = [];
      }
      this.type = type;
      this.flag = true;
        var _this = this;
        if(!this.isAll && this.flag){
          this.$api('/services/fantasy/rank_list.php', {
            qid: store.get('loginInfo').type,
            page: this.page,
            limit: 20,
            type: this.type
          }).then(response => {

            if (response.code == 200) {
              _this.loading = true;
              if (response.data.list.length == 0) {
                _this.isAll = true;
              } else {
                _this.page = _this.page + 1;
              }
              _this.rank_list = _this.rank_list.concat(response.data.list);
              _this.meList = response.data.me;
              _this.period = response.data.period;
              _this.update = response.data.update;
              _this.pushEvent(store.get('loginInfo').type, 'rank', type);
              this.busy = false;
              this.flag = false;
            }
          })
        }
    },
    loadMore(){
      this.busy = true;
      this.rankList(this.type);
    },
  },
  components: {
    headTop: HeadTop,
    loading
  }
}
</script>

<style scoped>
    .ranking-header {
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 10;
    }

    .ranking-nav {
        display: flex;
        display: -webkit-flex;
        height: 84px;
        line-height: 84px;
        background: #fff;
        padding: 0 30px;
    }

    .ranking-nav li {
        -webkit-box-flex: 1;
        flex: 1;
        text-align: center;
        -webkit-tap-highlight-color: #A8ABB3;
        position: relative;
    }

    .ranking-nav li p {
        line-height: 84px;
        font-size: 24px;
        color: #A192BD;
    }

    .ranking-nav li.active p {
        color: #5348FF;
        font-weight: 700;
    }

    .ranking-nav li.active span {
        display: block;
        width: 12px;
        height: 12px;
        background: #5348FF;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        bottom: 8px;
        transform: translate(-50%, 0);
    }
    .ranking-time {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        height: 72px;
        background: #f8f7fa;
    }

    .ranking-time p {
        -webkit-box-flex: 1;
        flex: 1;
        line-height: 72px;
        color: #B2B0D2;
    }

    .ranking-time p:nth-of-type(1) {
        margin-left: 30px;
    }

    .ranking-time p:nth-of-type(2) {
        text-align: right;
        margin-right: 30px;
    }
    .ranking-message {
        height: 60px;
        background: #fff;
        padding: 0 30px;
    }

    .ranking-message li {
        float: left;
        line-height: 62px;
        text-align: center;
        color: #B2B0D2;
    }

    .ranking-message li:nth-of-type(1) {
        width: 430px;
        text-align: left;
    }

    .ranking-message li:nth-of-type(2) {
        width: 160px;
    }

    .ranking-message li:nth-of-type(3) {
        width: 100px;
        text-align: right;
    }

    /*排行榜列表 活动 周 月 总 */
    .ranking{
        margin-top: 218px;
        margin-bottom: 224px;
    }
    .ranking-list{

    }
    .ranking-list li{
        font-size: 24px;
        color: #5B579A;
        background: #fff;
        padding: 14px 30px 14px 0px;
    }
    .ranking-list li:nth-child(even){
        background: #FCFCFC;
    }
    .position{
        width: 100px;
        text-align: center;
        color: #fff;
        padding-top: 16px;
        float: left;
    }
    .position span{
        display: inline-block;
        line-height: 28px;
        font-size: 20px;
        background: #D7D5F9;
        border-radius: 14px;
        padding: 0 8px;
    }
    .position_top{
        width: 100px;
        text-align: center;
        position: relative;
        padding-top: 15px;
        float: left;
    }
    .position_top span{
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        position: absolute;
    }
    .position_top .icon{
        width: 28px;
        height: 28px;
    }
    .position_top .icon.one{
        color: rgba(255,220,57,1);
    }
    .position_top .icon.two{
        color: rgba(158,211,255,1);
    }
    .position_top .icon.three{
        color: rgba(255,181,109,1);
    }
    .avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
    }
    .nickname{
        width: 330px;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        overflow: hidden;
        float: left;
        padding: 0 30px;
    }
    .amount{
        width: 130px;
        line-height: 60px;
        font-size: 24px;
        text-align: right;
        padding-right: 30px;
        float: left;
    }
    .amount .icon{
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin-top: 21px;
        margin-left: 6px;
    }
    .win_num{
        width: 100px;
        line-height: 60px;
        font-size: 24px;
        text-align: right;
        float: left;
    }
    /*我的排行*/
    .ranking-myself{
        width: 100%;
        font-size: 24px;
        color: #fff;
        background-image: linear-gradient(-135deg, #5348FF 0%, #B848FF 100%);
        position: fixed;
        bottom: 97px;
        left: 0;
        padding: 14px 30px 14px 0px;
    }
    .ranking-myself .position{
        padding-top: 24px;
    }
    .ranking-myself .avatar{
        width: 80px;
        height: 80px;
    }
    .ranking-myself .nickname{
        width: 310px;
        line-height: 74px;
    }
    .ranking-myself .amount{
        line-height: 74px;
    }
    .ranking-myself .amount .icon{
        margin-top: 27px;
    }
    .ranking-myself .win_num{
        line-height: 74px;
    }
</style>
