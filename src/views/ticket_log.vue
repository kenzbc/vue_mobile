<template>
<div class="ticket_log anim-opacity2">
    <div class="exchange-head">
        <head-top
        :head-title="log_title"
        go-back="true"
        ></head-top>
    </div>
    <div class="log_wrap">
        <h1 class="log_header" v-if="$route.query.log_type == 0">
            <span class="fll">我的门票：</span>
            <span class="log_num fll">{{ticket}}</span>
            <svg class="icon match_icon fll" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
            </svg>
        </h1>
        <h1 class="log_header" v-else-if="$route.query.log_type == 1">
            <span class="fll">我的钻石：</span>
            <span class="log_num fll">{{diamond_number}}</span>
            <svg class="icon match_icon fll" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use>
            </svg>
            <router-link :to="{ path:'/DiamondList' }" class="diamond_but flr">充值</router-link>
        </h1>
        <h1 class="log_header" v-else-if="$route.query.log_type == 2">
            <span class="fll">我的积分：</span>
            <span class="log_num fll">{{guozi}}</span>
            <svg class="icon match_icon fll" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
            </svg>
        </h1>
        <h1 class="log_header" v-else-if="$route.query.log_type == 3">
            <span class="fll">我的钥匙：</span>
            <span class="log_num fll">{{fantasy_key}}</span>
            <i class="iconfont key">&#xe607;</i>
            <router-link :to="{ path:'/key' }" class="diamond_but flr">购买</router-link>
        </h1>

        <div class="log_main" v-infinite-scroll="loadMore"  infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <div v-for = "(log_lists,index) in array_new" v-if="$route.query.log_type != 2">
            <p class="log_date"  v-text="index"></p>
            <section class="" v-for="(items,index) in log_lists">
              <div class="log_lists cl">
                <div class="log_name fll name_width">
                    <h2 class="log_title">{{items.title == '每日登录' ? '签到': items.title}}</h2>
                    <p class="log_time gray" v-if="$route.query.log_type == 2">{{items.add_time | formatDate}}</p>
                    <p class="gray" v-else>{{items.date_string}}</p>
                </div>
                <!--<p class="guozi_type fll">{{items.keyword}}</p>-->
                <p class="log_number flr" :class="{'font_blue': parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0,'font_orange': parseFloat(items.number) < 0 || parseFloat(items.guozi) < 0}">
                  <span v-if="parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0">+</span>{{items.number?items.number:items.guozi}}
                  <svg class="icon match_icon flr" aria-hidden="true" v-if="$route.query.log_type == 0"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use></svg>
                  <svg class="icon match_icon flr" aria-hidden="true" v-else-if="$route.query.log_type == 1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use></svg>
                  <svg class="icon match_icon flr" aria-hidden="true" v-else-if="$route.query.log_type == 2"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg>
                  <i class="iconfont key" v-else-if="$route.query.log_type == 3">&#xe607;</i>
                </p>
              </div>
            </section>
          </div>
          <div v-if="$route.query.log_type == 2">
            <section v-for="(items,index) in log_list">
              <div class="log_lists cl">
                <div class="log_name fll">
                  <h2 class="log_title">{{items.title}}</h2>
                  <p class="log_time gray" v-if="$route.query.log_type == 2">{{items.add_time | formatDate}}</p>
                  <p class="gray" v-else>{{items.date_string}}</p>
                </div>
                <p class="guozi_type fll"></p>
                <p class="log_number flr" :class="{'font_blue': parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0,'font_orange': parseFloat(items.number) < 0 || parseFloat(items.guozi) < 0}">
                  <span v-if="parseFloat(items.number) > 0 || parseFloat(items.guozi) > 0">+</span>{{items.number?items.number:items.guozi}}
                  <svg class="icon match_icon flr" aria-hidden="true" v-if="$route.query.log_type == 0"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg>
                  <svg class="icon match_icon flr" aria-hidden="true" v-else-if="$route.query.log_type == 1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_zuanshi"></use></svg>
                  <svg class="icon match_icon flr" aria-hidden="true" v-else-if="$route.query.log_type == 2"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg>
                  <i class="iconfont key" v-else-if="$route.query.log_type == 3">&#xe607;</i>
                </p>
              </div>
            </section>
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
    name: 'ticket_log',
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


//
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

<style>
.ticket_log{}
.log_wrap{ margin-top: 90px; }
.log_header{ height: 108px; line-height: 60px; font-weight: normal; font-size: 28px; color: #373a41; background-color: #fff; padding: 24px; margin-bottom: 12px; }
.log_header span{ font-size: 28px;}
.log_header span.log_num{ font-weight: bold; }
.log_header svg{ width: 28px; height: 28px; margin-top: 16px; }
.log_header a{display: block; width: 120px; height: 60px; line-height: 60px; text-align: center; font-size: 24px; border: 1px solid #373a41; border-radius: 30px;}
.log_header a.ticket_but{  color: #373a41; }
.log_header a.diamond_but{ color: #fff; background-color: #0C9DFC; border-color: #0C9DFC; }
.log_header .key,.log_number .key{
  font-size:24px;
  color:#ccba87;
  margin-left:10px;
}
.log_main{}
.log_date{ margin-top:10px; line-height:50px; background-color: #fff; padding:0 24px; border-bottom: 1px solid #eee; color:#373a41; font-size:22px;}
.log_lists{ background-color: #fff; padding: 14px 24px; border-bottom: 1px solid #eee;}
.log_title{ line-height: 40px; font-size: 28px; font-weight: normal; color: #373a41;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.log_lists .name_width{
  width: 66%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.log_time{ line-height: 32px; font-size: 20px; color: #999999; }
.log_number{ font-size: 26px; padding-top: 14px; }
.log_number svg{ width: 26px; height: 26px; margin-top: 5px; }
.log_name{ width: 50%; }
.log_name .gray{
  color:#b0b0b0;
  font-size:20px;
}
.guozi_type{ width: 33%; line-height: 62px; text-align: center; margin: 0 auto; }
.load_message{ line-height: 40px; text-align: center; font-size: 24px; color: #999; padding: 10px 0; margin-top:10px;}
</style>
