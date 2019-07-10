<template>
  <div>
    <div class="ongoing" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="50" v-show="onList!=''">
      <div class="squad-ongoing" v-for="(items,index) in onList">
        <div class="start-squad-top" @click="showRun(index)">
          <div class="start-squad-top-title">
            <div>参赛房间数:{{items.room_list.length}}</div>
            <div>阵容平均分: {{items.avg_score}}</div>
            <div class="down-arrow">
              <!-- <p @click="dataStore(items,items.roomID)"><span>编辑</span></p>-->
              <p  :class="{'active-arrow':arr1[index]==1}"><i   class="iconfont ongoing-arrow">&#xe6d4;</i></p>
            </div>
          </div>
          <div class="start-squad-top-avatar">
            <ul>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.member_team[0].top.position_short_name]"></use></svg></p> <p>{{items.member_team[0].top.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.member_team[0].top.bg2!=''" class="start-squad-avatar-bg" :style="{'background':'url('+items.member_team[0].top.bg2+')', 'background-size':'100% 100%'}">
                    <img :src="items.member_team[0].top.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].top.socre_average}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.member_team[0].top.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].top.socre_average}}</span>
                  </div>
                  <p>{{items.member_team[0].top.player_nickname}}</p>
                  <p>{{items.member_team[0].top.team_short_name}}</p>
                </div>
              </li>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.member_team[0].jun.position_short_name]"></use></svg></p> <p>{{items.member_team[0].jun.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.member_team[0].jun.bg2!=''" class="start-squad-avatar-bg" :style="{'background':'url('+items.member_team[0].jun.bg2+')', 'background-size':'100% 100%'}">
                    <img :src="items.member_team[0].jun.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].jun.socre_average}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img  :src="items.member_team[0].jun.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].jun.socre_average}}</span>
                  </div>
                  <p>{{items.member_team[0].jun.player_nickname}}</p>
                  <p>{{items.member_team[0].jun.team_short_name}}</p>
                </div>
              </li>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.member_team[0].mid.position_short_name]"></use></svg></p> <p>{{items.member_team[0].mid.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.member_team[0].mid.bg2!=''" class="start-squad-avatar-bg" :style="{'background':'url('+items.member_team[0].mid.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.member_team[0].mid.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].mid.socre_average}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img  :src="items.member_team[0].mid.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].mid.socre_average}}</span>
                  </div>
                  <p>{{items.member_team[0].mid.player_nickname}}</p>
                  <p>{{items.member_team[0].mid.team_short_name}}</p>
                </div>
              </li>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.member_team[0].adc.position_short_name]"></use></svg></p> <p>{{items.member_team[0].adc.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.member_team[0].adc.bg2!=''" class="start-squad-avatar-bg" :style="{'background':'url('+items.member_team[0].adc.bg2+')', 'background-size':'100% 100%'}">
                    <img :src="items.member_team[0].adc.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].adc.socre_average}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.member_team[0].adc.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].adc.socre_average}}</span>
                  </div>
                  <p>{{items.member_team[0].adc.player_nickname}}</p>
                  <p>{{items.member_team[0].adc.team_short_name}}</p>
                </div>
              </li>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.member_team[0].sup.position_short_name]"></use></svg></p> <p>{{items.member_team[0].sup.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.member_team[0].sup.bg2!=''" class="start-squad-avatar-bg" :style="{'background':'url('+items.member_team[0].sup.bg2+')', 'background-size':'100% 100%'}">
                    <img :src="items.member_team[0].sup.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].sup.socre_average}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.member_team[0].sup.player_image || '../../../static/images/unknow.png'" alt="">
                    <span>{{items.member_team[0].sup.socre_average}}</span>
                  </div>
                  <p>{{items.member_team[0].sup.player_nickname}}</p>
                  <p>{{items.member_team[0].sup.team_short_name}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="start-squad-bottom" v-show="arr1[index]==1" @click="savestatus()">
          <div class="start-squad-bottom-first" v-for="(roomItem,i) in items.room_list">
            <router-link :to="{path:'roomInfo',query:{roomID:items.roomID,orderId:roomItem.order_id}}" >
              <div :class="{'start-squad-middle-bg1':items.room_list.length==i+1}" class="start-squad-middle-bg"></div>
              <div class="start-squad-middle-title">
                <ul>
                  <li :class="'room_color_' + roomItem.type">
                    <p v-if="roomItem.type < 9">{{room_type[roomItem.type]}}</p>
                    <img class="member-img" v-else-if="roomItem.type == 9" :src="roomItem.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
                  </li>
                  <li>
                    <p>{{roomItem.name}}</p>
                    <p>{{roomItem.room_desc}}</p>
                  </li>
                  <li>
                    <p><span>X</span>{{roomItem.join_times}}</p>
                    <p>阵容参与次数</p>
                  </li>
                </ul>
              </div>
              <div class="start-squad-money">
                <div class="start-squad-money-rank">
                  当前排名: <span>{{roomItem.rank}}</span>/{{roomItem.at_times}}
                </div>
                <v-runing :running="roomItem"></v-runing>
              </div>
            </router-link>

          </div>
        </div>
      </div>
      <div class="ongoing-no-data">{{message}}</div>
    </div>
    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&onList==''">
      <img src="../../../static/images/pic_404.png" alt="">
      <p>暂无进行中的的房间</p>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import vRuning from '../running.vue';
  import loading from '../loading.vue'
  var arr1 = new Array()
  export default {
    name: 'ongoing',
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
      loading
    }
  }
</script>

<style>
  .ongoing{
    margin:100px 0 98px 0;
  }
  .ongoing .icon_shangdan{
    width:26px;
    height:26px;
  }
  .ongoing .squad-ongoing{
    margin-bottom:20px;
  }
  .ongoing .squad-ongoing .start-squad-top{
    margin: 0 12px;
    height: 364px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 5px 5px 8px rgba(0,200,215,0.1);
  }
  .ongoing .squad-ongoing .iconBack{
    height:40px;
    width:40px;
    transform:rotate(-90deg);
  }
  .ongoing .squad-ongoing  .start-squad-top-title{
    height: 80px;
    display: flex;
    line-height: 80px;
    display: flex;
    display: -webkit-flex;
  }
  .ongoing .squad-ongoing .start-squad-top-title div{
    -webkit-box-flex: 1;
    flex: 1;
    font-size:26px;
    padding-left:10px;
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow{
    text-align: right;
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow .ongoing-arrow{
    font-size:30px;
    color: #0C9DFC;
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow  .active-arrow{
    transform : rotate(180deg);
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow p{
    float: right;
    text-align: center;
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow p:nth-of-type(1){
    margin-right:30px;
  }
  .ongoing .squad-ongoing .start-squad-top-title  .down-arrow span{
    padding: 8px 35px;
    background: #0C9DFC;
    color: #fff;
    border-radius: 35px 35px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar{
    margin:0 8px;

  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul{
    display: flex;
    display: -webkit-flex;
    border-top:1px solid #f0f0f0;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li{
    -webkit-box-flex: 1;
    flex: 1;
  }

  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-leval{
    height:40px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-leval p{
    float: left;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(1){
    margin-top:8px;
    padding-left:10px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(2){
    padding-left: 6px;
    color: #999999;
    margin-top:8px;
    font-size:18px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar{
    width: 134px;
    margin:0 auto;
    border: 1px solid #E7EDF1;
    box-shadow: 3px 3px 4px rgba(0,200,215,0.1);
    border-radius: 6px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar  .start-squad-jiange{
    height:8px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li  .start-squad-avatar-bg{
    width:120px;
    height: 144px;
    margin:  0 7px ;
    position: relative;
    background: url("../../../static/images/fantasy_lineup.png");
    background-size:100% 100%;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li  .start-squad-avatar-bg span{
    position: absolute;
    top:0;
    right:4px;
    color: #0C9DFC;
    font-size:20px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar-bg img{
    margin-top: 28px;
    width: 116px;
    height:116px;
    vertical-align: middle;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar p{
    padding-left:10px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(1){
    padding-top: 12px;
    font-size: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 130px;
  }
  .ongoing .squad-ongoing .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(2){
    padding-bottom: 10px;
    font-size:18px;
    color: #bfbfbf;
  }
  .ongoing .squad-ongoing .start-time{
    height: 46px;
    background: #fff;
    padding-left: 24px;
  }
  .ongoing .squad-ongoing .start-time span:nth-of-type(1){
    font-size:20px;
    color: #c9c9c9;
  }
  .ongoing .squad-ongoing .start-time span:nth-of-type(2){
    font-size:20px;
    display: inline-block;
    color: #fff;
    background: #ff5a00;
    height:30px;
    width:64px;
    text-align: center;
    border-radius: 6px 6px;
  }
  .ongoing .start-squad-bottom-first {
    position: relative;
    margin: 20px 30px 0 77px;
    height: 300px;
    background: #fff;
    border-radius:8px;
    box-shadow: 5px 5px 8px rgba(0,200,215,0.1);
  }
  .ongoing .start-squad-middle-bg{
    position: absolute;
    top:-22px;
    left: -46px;
    background: url("../../../static/images/zhoubg0.png") no-repeat;
    background-size:100% 100%;
    width:25px;
    height:298px;
    z-index: -1;
  }
  .ongoing .start-squad-middle-bg1{
    position: absolute;
    top:-24px;
    left: -46px;
    background: url("../../../static/images/zhoubg.png") no-repeat;
    background-size:100% 100%;
    width:25px;
    height:80px;
    z-index: -1;
  }
  .ongoing .start-squad-middle-title{
    height:90px;
    margin: 0 20px;
    border-bottom:1px solid #f1f1f1;
  }
  .ongoing .start-squad-middle-title li{
    float: left;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(1){
    margin: 16px 0 0 0;
    height:60px;
    width:60px;
    line-height: 60px;
    text-align: center;
    font-size:22px;
    color: #fff;
    border-radius :50%;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(2){
    padding:16px 0 0 20px;
    color: black;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(2) p {
    width:400px;
    overflow: hidden;
    white-space :nowrap;
    text-overflow :ellipsis;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(2) p:nth-of-type(1){
    font-size:24px;
    font-weight:bold;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(2) p:nth-of-type(2){
    font-size:20px;
    color: #d3d3d3;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(3){
    float: right;
    color: black;
    margin:15px 0 0 0;
    text-align: center;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(3) p:nth-of-type(1){
    text-align: right;
    font-size:28px;
    color: #0C9DFC;
  }
  .ongoing .start-squad-middle-title li:nth-of-type(3) p:nth-of-type(1) span{
    display:inline-block; width:22px; height:2px; background:#0C9DFC; font-size:0; line-height:0;vertical-align:middle;-webkit-transform: rotate(45deg);

  }
  .ongoing .start-squad-middle-title li:nth-of-type(3) p:nth-of-type(1) span:after { content:'.'; display:block; width:22px; height:2px; background:#0C9DFC;-webkit-transform: rotate(-90deg);}
  .ongoing .start-squad-middle-title li:nth-of-type(3) p:nth-of-type(2){
    font-size:18px;
    color: #d3d3d3;
  }
  .ongoing .start-squad-money{
    background: #fff;
    margin:0 40px 70px;
    width:530px;
  }
  .ongoing .start-squad-money .start-squad-money-rank{
    height: 70px;
    line-height:70px;
    font-size:24px;
    text-align: right;
    margin-bottom: 50px;
  }
  .ongoing .start-squad-money .start-squad-money-rank span{
    color: #fe892c;
  }
  .ongoing .start-squad-money  .running_wrap{

  }
  .ongoing  .ongoing-no-data{
    font-size:26px;
    text-align: center;
    height:60px;
    color:#999;
  }
</style>
