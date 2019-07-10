<template>
  <div class="mode_container anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="选择比赛组合"
        go-back="true"
      ></head-top>
    </div>
    <section v-if="group_data != ''" >
      <div class="mode_compose group_content" v-if="group_data.list!= []">
        <P class="title">为你的房间选择一组比赛</P>
        <section v-for="lists in group_data.list"
                 v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50"
                 @click="selectedBtn(lists.group_id,lists.salary_cap,lists.at_end_time)">
          <div class="mode_lists mode_border"
               :class="{active:isCurID == lists.group_id}"
          >
            <div class="title">
              <p class="fll">{{lists.group_name}}</p>
            </div>
            <ul class="mode_lists_content">
              <li v-for="item in lists.matches">
                <div class="mode_team">
                  <label><img :src="item.team_a_image_thumb" alt=""></label>
                  <p>{{item.team_a_short_name}}</p>
                </div>
                <div class="mode_team_vs">
                  <p>{{item.start_time_string}}</p>
                  <p>VS</p>
                </div>
                <div class="mode_team">
                  <label><img :src="item.team_b_image_thumb" alt=""></label>
                  <p>{{item.team_b_short_name}}</p>
                </div>
              </li>
              <li class="mode_patch" v-if="lists.matches.length % 2 != 0"></li>
            </ul>
          </div>
        </section>

      </div>
    </section>
    <!--<div class="room_nodata" v-if="loading && count == 0">-->
      <!--<img :src="pic_404">-->
      <!--<p>暂无数据！</p>-->
    <!--</div>-->
    <div class="group_footer" :class="{active:isActive == true}" @click="LinkDetail(isActive)">
      <p>下一步设置房间参数</p>
    </div>
    <loading v-show="loading==false"></loading>
  </div>
</template>

<script>
  import store from 'store'
  import loading from '../components/loading.vue'
  import HeadTop from '../components/header.vue'
  export default {
    name: 'group',
    data () {
      return {
        data:'',
        pic_404: 'static/images/pic_404.png',
        group_data:'',
        isCurID:'',
        isActive:false,
        salary_cap:'',
        at_end_time:'',
        isLoad: 0,
        start_id:'',
        loading: false,
        count:'',
        busy:false
      }
    },
    mounted(){
    	this.loadMore();
    },
    methods:{
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          if (this.isLoad == 0) {
            this.getData(this.start_id);
          }
        },500);
      },
      getData(start_id){
        var _this = this;
        this.$api('/services/fantasy/group_list.php', {
          start_id:start_id
        }).then(response => {
          if(response.code == 200){
            _this.loading = true;
            _this.group_data = response.data;
            if(_this.group_data.count == 0){
            	_this.count = 0;
            }else{
            	var list =  _this.group_data.list;
              _this.isLoad = 0;
              for(var key in list){
              	var startID = list[key].group_id;
              }
              _this.start_id = startID
            }
          }else{
            layer.open({
              content: response.message
              ,btn: '关闭'
            });
          }
        });
        this.busy = false
      },
      selectedBtn(groupID,salary_cap,at_end_time){
      	this.isCurID = groupID;
        this.isActive = true;
        this.salary_cap = salary_cap;
        this.at_end_time = at_end_time;
        var groupLists = this.group_data.list;
        groupLists.forEach(function(item){
          if(item.group_id == groupID){
            store.set('matches',item.matches);
          };
        })
      },
      LinkDetail(arg){
//      	console.log(arg);
//        if(arg == true){
          store.remove('group');
          this.$router.push({path:'/setting', query: {
          	group_id: this.isCurID,
            salary_cap: this.salary_cap,
            at_end_time: this.at_end_time,
          }})
//        }
      }
    },
    components: {
      headTop:HeadTop,
      loading
    }
  }
</script>

<style>
 .group_content{
   margin-top:90px;
   margin-bottom:170px;
 }
 .mode_border{
   margin: 0 23px 22px;
   border:2px solid #fff;
 }
 .mode_border.active{
   border:2px solid #0C9DFC;
 }
  .group_footer{
    position: fixed;
    bottom:0;
    height:90px;
    width: 100%;
    background: #c9c9c9;
  }
  .group_footer p{
    text-align: center;
    line-height:90px;
    color:#fff;
    font-size:30px;
  }
 .group_footer.active{
   background: #0C9DFC;
 }
</style>
