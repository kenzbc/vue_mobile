<template>
  <div>
    <div class="squad-head anim-opacity2">
      <head-top
        head-title="收藏阵容"
        go-back="true"
      ></head-top>
      <!--<div class="squad-head-sava">收藏阵容</div>-->
    </div>
    <div class="squad-save">
      <div class="squad-template">
        <div class="squad-template-first">
          <div class="squad-template-first-title">收藏阵容可以在[个人中心]→[我的阵容]中编辑</div>
          <div class="start-squad-top" v-for="(items,index) in topList">
            <div class="start-squad-top-title">
              <div>{{items.name}}</div>
              <div>阵容平均分: {{parseFloat(parseFloat(items.top.avg_score)+parseFloat(items.adc.avg_score)+parseFloat(items.mid.avg_score)+parseFloat(items.jun.avg_score)+parseFloat(items.sup.avg_score)).toFixed(1)}}</div>
              <div class="down-arrow" @click="dataStore(items,items.id,items.name)"><span>布阵</span> </div>
            </div>
            <div class="start-squad-top-avatar">
              <ul>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.top.position_short_name]"></use></svg></p> <p>{{items.top.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.top.bg2+')', 'background-size':'100% 100%'}">
                      <img  :src="items.top.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.top.score}}</span>
                    </div>
                    <p>{{items.top.nickname}}</p>
                    <p>{{items.top.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.jun.position_short_name]"></use></svg></p> <p>{{items.jun.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.jun.bg2+')', 'background-size':'100% 100%'}">
                      <img  :src="items.jun.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.jun.score}}</span>
                    </div>
                    <p>{{items.jun.nickname}}</p>
                    <p>{{items.jun.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.mid.position_short_name]"></use></svg></p> <p>{{items.mid.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.mid.bg2+')', 'background-size':'100% 100%'}">
                      <img  :src="items.mid.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.mid.score}}</span>
                    </div>
                    <p>{{items.mid.nickname}}</p>
                    <p>{{items.mid.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.adc.position_short_name]"></use></svg></p> <p>{{items.adc.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.adc.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.adc.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.adc.score}}</span>
                    </div>
                    <p>{{items.adc.nickname}}</p>
                    <p>{{items.adc.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.sup.position_short_name]"></use></svg></p> <p>{{items.sup.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.sup.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.sup.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.sup.score}}</span>
                    </div>
                    <p>{{items.sup.nickname}}</p>
                    <p>{{items.sup.team_short_name}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="squad-template-first">
          <div class="squad-template-first-title">以下阵容与当前房间不匹配</div>
          <div class="start-squad-top" v-for="(items,index) in bottomList">
            <div class="start-squad-top-title">
              <div>{{items.name}}</div>
              <div>阵容平均分: {{parseFloat(parseFloat(items.top.avg_score)+parseFloat(items.adc.avg_score)+parseFloat(items.mid.avg_score)+parseFloat(items.jun.avg_score)+parseFloat(items.sup.avg_score)).toFixed(1)}}</div>
              <div class="down-arrow1"><span>布阵</span> </div>
            </div>
            <div class="start-squad-top-avatar">
              <ul>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.top.position_short_name]"></use></svg></p> <p>{{items.top.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.top.bg2+')', 'background-size':'100% 100%'}">
                      <img  :src="items.top.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.top.score}}</span>
                    </div>
                    <p>{{items.top.nickname}}</p>
                    <p>{{items.top.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.jun.position_short_name]"></use></svg></p> <p>{{items.jun.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.jun.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.jun.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.jun.score}}</span>
                    </div>
                    <p>{{items.jun.nickname}}</p>
                    <p>{{items.jun.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.mid.position_short_name]"></use></svg></p> <p>{{items.mid.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.mid.bg2+')', 'background-size':'100% 100%'}">
                      <img  :src="items.mid.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.mid.score}}</span>
                    </div>
                    <p>{{items.mid.nickname}}</p>
                    <p>{{items.mid.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.adc.position_short_name]"></use></svg></p> <p>{{items.adc.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.adc.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.adc.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.adc.score}}</span>
                    </div>
                    <p>{{items.adc.nickname}}</p>
                    <p>{{items.adc.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.sup.position_short_name]"></use></svg></p> <p>{{items.sup.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.sup.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.sup.image || '../../../static/images/unknow.png'"  alt="">
                      <span></span>
                      <span>{{items.sup.score}}</span>
                    </div>
                    <p>{{items.sup.nickname}}</p>
                    <p>{{items.sup.team_short_name}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import store from 'store'
  import HeadTop from '../header.vue'
export default {
  name: 'squad',
  props: {
  },
  data () {
    return {
      squadList:[],
      topList:[],
      bottomList:[],
      leval,
      matchList:[],
      squadId:[],
      cur_player:{
        TOP:'',
        JUG:'',
        MID:'',
        ADC:'',
        SUP:''
      }
    }
  },
  created() {
    let member_info = store.get('member_info');
    if(member_info == undefined){
      this.$router.push({path:'/room'});
    }
//    if(JSON.parse(sessionStorage.getItem('avatar'))==null){
//      this.$router.push({path:'/room'});
//    }else{
//      if(JSON.parse(sessionStorage.getItem('avatar'))==''){
//        this.$router.push({path:'/room'});
//      }
//    }
    this.matchList=store.get('matchIDs');
    var _this=this
    this.$api('/services/fantasy/lineup_list.php', {

    }).then(response => {
      _this.squadList=response.data.list;
      for(var i=0;i<_this.squadList.length;i++){
        _this.squadId[0]=_this.squadList[i].top.teamID;
        _this.squadId[1]=_this.squadList[i].jun.teamID;
        _this.squadId[2]=_this.squadList[i].mid.teamID;
        _this.squadId[3]=_this.squadList[i].adc.teamID;
        _this.squadId[4]=_this.squadList[i].sup.teamID;
        _this.squadId= _this.getArray(_this.squadId);
        if(_this.isContained(_this.matchList,_this.squadId)){
          _this.topList.push(_this.squadList[i])
        }else{
          _this.bottomList.push(_this.squadList[i])
        }
      }
    })
  },
  methods:{
   getArray(a) {
    var hash = {},
      len = a.length,
      result = [];
    for (var i = 0; i < len; i++){
      if (!hash[a[i]]){
        hash[a[i]] = true;
        result.push(a[i]);
      }
    }
    return result;
  },
  isContained(a, b){
    if(!(a instanceof Array) || !(b instanceof Array)) return false;
    if(a.length < b.length) return false;
    var aStr = ','+a.join(",")+",";
    //console.log(aStr)
    for(var i = 0, len = b.length; i < len; i++){
      if(aStr.indexOf(","+b[i]+",") == -1) return false;
    }
    return true;
  },
    dataStore(items,id,name){
      var cur_player = {
        TOP:'',
        JUG:'',
        MID:'',
        ADC:'',
        SUP:''
      };
      this.cur_player.TOP=items.top;
      this.cur_player.JUG=items.jun;
      this.cur_player.MID=items.mid;
      this.cur_player.ADC=items.adc;
      this.cur_player.SUP=items.sup;
      store.set('user',{cur_player:this.cur_player});
      this.$router.push({path:'/Selected',query:{statued:'1',roomID:this.$route.query.roomID}});
    }
  },
  components:{
    headTop:HeadTop
  }
}
</script>

<style>
  .squad-head{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    z-index:10;
  }
  .squad-head .squad-head-sava{
    height:80px;
    line-height: 80px;
    background: #fff;
    font-size: 30px;
    text-align: center;
  }
  .squad-head  .squad-head-nav{
    height:80px;
    background: #fff;
  }
  .squad-head  .squad-head-nav{
    display: flex;
    display: -webkit-flex;
  }
  .squad-head  .squad-head-nav li{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    text-align: center;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    flex-direction: column;
    line-height:74px;
    font-size:27px;
    color: #373a41;
  }
 .squad-head  .squad-head-nav .active{
    display: block;
    height: 6px;
    width: 30px;
    background: #fe892c;
    margin:0 auto;
  }
  .squad-head  .squad-head-nav .my-header-active{
    color: #fe892c;
    font-weight:bold;
  }
  .squad-template .icon_shangdan{
    width:26px;
    height:26px;
  }
  .squad-save{
    margin-top:90px;
  }
  .squad-save  .squad-quick-title{
    font-size:28px;
    line-height:36px;
    padding:30px;
  }
  .squad-template{
    margin-bottom:50px;
  }
  .squad-template .squad-template-first-title{
    height:80px;
    line-height:80px;
    font-size:26px;
    padding-left:30px;
  }
  .squad-template .start-squad-top{
    margin: 0 12px 10px;
    height: 364px;
    background: url("../../../static/images/room_bg.png") no-repeat;
    background-size : 100% 100%;
  }

  .squad-template .iconBack{
    height:40px;
    width:40px;
    transform:rotate(-90deg);
  }
  .squad-template  .start-squad-top-title{
    height: 76px;
    display: flex;
    line-height: 76px;
    display: flex;
    display: -webkit-flex;
  }
  .squad-template .start-squad-top-title div{
    -webkit-box-flex: 1;
    flex: 1;
    font-size:26px;
    padding-left:10px;
  }
  .squad-template .start-squad-top-title div:nth-of-type(1){
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .squad-template .start-squad-top-title  .down-arrow{
    text-align: right;
    margin-right:30px;
  }
  .squad-template .start-squad-top-title  .down-arrow1{
    text-align: right;
    margin-right:30px;
  }
  .squad-template .start-squad-top-title  .down-arrow span{
    padding: 5px 24px;
    background: #0C9DFC;
    color: #fff;
    border-radius: 20px 20px;
  }
  .squad-template .start-squad-top-title  .down-arrow1 span{
    padding: 5px 24px;
    background: #eeeeee;
    color: #999;
    border-radius: 20px 20px;
  }
  .squad-template .start-squad-top-title  .down-arrow i{
    padding-left:30px;
  }
  .squad-template .start-squad-top-avatar{
    margin:0 10px;

  }
  .squad-template .start-squad-top-avatar ul{
    display: flex;
    display: -webkit-flex;
    border-top:1px solid #f0f0f0;
  }
  .squad-template .start-squad-top-avatar ul li{
    -webkit-box-flex: 1;
    flex: 1;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-leval{
    height:43px;
    line-height:43px;
    margin-left:10px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-leval p{
    float: left;
  }
  .squad-template.start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(1){
    margin-top:8px;
    padding-left:10px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(2){
    padding-left: 6px;
    color: #999999;
    font-size:18px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar{
    width: 134px;
    margin:0 auto;
    border: 1px solid #E7EDF1;
    box-shadow: 3px 3px 4px rgba(0,200,215,0.1);
    border-radius: 6px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar  .start-squad-jiange{
    height:8px;
  }
  .squad-template .start-squad-top-avatar ul li  .start-squad-avatar-bg{
    width:120px;
    height: 144px;
    margin:  0 7px ;
    position: relative;
  }
  .squad-template .start-squad-top-avatar ul li  .start-squad-avatar-bg span{
    position: absolute;
    top:0;
    right:2px;
    color: #0C9DFC;
    font-size:20px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar-bg img{
    margin-top: 28px;
    width: 116px;
    height: 116px;
    vertical-align:middle;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar p{
    padding-left:10px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(1){
    padding-top:8px;
    font-size:24px;
  }
  .squad-template .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(2){
    padding-bottom: 8px;
    font-size:18px;
    color: #bfbfbf;
  }
  .squad-template .start-time{
    height: 46px;
    background: #fff;
    padding-left: 24px;
  }
  .squad-template .start-time span:nth-of-type(1){
    font-size:20px;
    color: #c9c9c9;
  }
  .squad-template .start-time span:nth-of-type(2){
    font-size:20px;
    display: inline-block;
    color: #fff;
    background: #ff5a00;
    height:30px;
    width:64px;
    text-align: center;
    border-radius: 6px 6px;
  }
</style>
