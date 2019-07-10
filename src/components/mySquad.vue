<template>
  <div class="anim-opacity2">
    <div class="mySquad">
      <div class="mySquad-head">
        <head-top
          head-title="我的阵容"
          go-back="true"
        ></head-top>
      </div>

      <div class="mySquad-top" >
        <div class="start-squad-top" v-for="(items,index) in mySquad">
          <div class="start-squad-top-title">
            <div>
              <p>{{items.name}}</p>
              <p>阵容平均分: {{parseFloat(parseFloat(items.top.avg_score)+parseFloat(items.adc.avg_score)+parseFloat(items.mid.avg_score)+parseFloat(items.jun.avg_score)+parseFloat(items.sup.avg_score)).toFixed(1)}}</p>
            </div>
            <div class="down-arrow" >
              <p @click="dataStore(items,items.id,items.name)"><i class="iconfont">&#xe6ed;</i></p>
              <p @click="delectSquad(items.id)"><i class="iconfont">&#xe6ef;</i></p>
            </div>
          </div>
          <div class="start-squad-top-avatar">
            <ul>
              <li>
                <div class="start-squad-leval"><p><svg aria-hidden="true" class=" icon_shangdan"><use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="leval[items.top.position_short_name]"></use></svg></p> <p>{{items.top.position_short_name}}</p></div>
                <div class="start-squad-avatar">
                  <div class="start-squad-jiange"></div>
                  <div v-if="items.top.bg2!=''" class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.top.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.top.image || '../../static/images/unknow.png'"  alt="">
                    <span></span>
                    <span>{{items.top.score}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.top.image || '../../static/images/unknow.png'"  alt="">
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
                  <div v-if="items.jun.bg2!=''" class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.jun.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.jun.image || '../../static/images/unknow.png'"  alt="">
                    <span></span>
                    <span>{{items.jun.score}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg">
                    <img  :src="items.jun.image || '../../static/images/unknow.png'"  alt="">
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
                  <div v-if="items.mid.bg2!=''" class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.mid.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.mid.image || '../../static/images/unknow.png'"  alt="">
                    <span></span>
                    <span>{{items.mid.score}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img  :src="items.mid.image || '../../static/images/unknow.png'"  alt="">
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
                  <div v-if="items.adc.bg2!=''" class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.adc.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.adc.image || '../../static/images/unknow.png'"  alt="">
                    <span></span>
                    <span>{{items.adc.score}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.adc.image || '../../static/images/unknow.png'"  alt="">
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
                  <div v-if="items.sup.bg2!=''" class="start-squad-avatar-bg" v-bind:style="{'background':'url('+items.sup.bg2+')', 'background-size':'100% 100%'}">
                    <img  :src="items.sup.image || '../../static/images/unknow.png'"  alt="">
                    <span></span>
                    <span>{{items.sup.score}}</span>
                  </div>
                  <div v-else class="start-squad-avatar-bg" >
                    <img :src="items.sup.image || '../../static/images/unknow.png'"  alt="">
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
      <div class="mySquad-top-big" v-if="mySquad.length==10">保存的阵容数量已达上限，请先删除阵容</div>
      <div class="mySquad-top-num" v-else @click="removeStire()">
       +最多还能保存{{parseInt(10)-parseInt(mySquad.length)}}套阵容
      </div>
    </div>
    <!--<div class="dialog opacity" v-if="isRemove">-->
      <!--<div class="dialog_container dialog_remove">-->
        <!--<div class="dialog_remove_body">-->
          <!--<p>是否删除阵容？</p>-->
        <!--</div>-->
        <!--<div class="dialog_remove_footer">-->
          <!--<p class="fll" @click="removeCancel">取消</p>-->
          <!--<p class="fll" @click="removeButton">确定</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>

  import HeadTop from '../components/header.vue'
  import store from 'store'
export default {
  name: 'mall',
  data () {
    return {
      isRemove:false,
      mySquad:[],
      leval,
      cur_player:{
        TOP:'',
        JUG:'',
        MID:'',
        ADC:'',
        SUP:''
      },
      id:''
    }
  },
  watch:{
    '$route'(){
        this.delectData()
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
    this.delectData()
  },
  methods:{
    delectSquad:function(id){
      this.id = id;
      this.removeButton();
//      this.isRemove=true;
    },
    delectData:function(){
      var _this = this;
      this.$api('/services/fantasy/lineup_list.php', {
      }).then(response => {
      	if(response.code = 200){
          _this.mySquad = response.data.list;
          //console.log(_this.mySquad)
        }
      })
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
      this.$router.push({path:'/Create',query:{statued:'1',id:id,name:name}});
    },
    removeStire(){
      store.remove('user');
      store.remove('editID');
      this.$router.push({path:'/Create'});
    },
    removeButton(){
      var _this=this;
      this.$api('/services/fantasy/lineup_del.php', {
      	id:this.id
      }).then(response => {
      	if(response.code == 200){
//          _this.isRemove = false;
          _this.delectData()
        }
      })
     /* this.delectData()*/
    },
    removeCancel(){
      this.isRemove=false;
    }
  },
  components:{
    HeadTop:HeadTop
  }
}
</script>

<style>
  .mySquad  .mySquad-head{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 10;
  }
  .mySquad .mySquad-top{
    margin-top:100px;
  }
  .mySquad .start-squad-top{
    margin: 0 12px 20px;
    height: 394px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 5px 5px 8px rgba(0,200,215,0.1);
  }
  .mySquad .icon_shangdan{
    width:26px;
    height:26px;
  }
  .mySquad .iconBack1{
    font-size: 30px;
    color: #0C9DFC;
  }
 .mySquad .active-arrow{
    transform: rotate(180deg);
  }
  .mySquad  .start-squad-top-title{
    height: 106px;
    display: flex;
    display: flex;
    display: -webkit-flex;
  }
  .mySquad .start-squad-top-title div{
    -webkit-box-flex: 1;
    flex: 1;
    font-size:26px;
    padding-left:10px;
  }
  .mySquad .start-squad-top-title div:nth-of-type(1){
    margin:22px 0 0 10px;
  }
  .mySquad .start-squad-top-title div:nth-of-type(1) p:nth-of-type(1){
    font-size:30px;
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .mySquad .start-squad-top-title  .down-arrow{
    margin-top:22px;
  }
  .mySquad .start-squad-top-title  .down-arrow i{
    font-size:26px;
    color: #999;
  }
  .mySquad .start-squad-top-title  .down-arrow p{
    text-align: center;
    line-height:65px;
    float: right;
    height:65px;
    width:65px;
    border-radius:50%;
    border:1px solid #0a001f;
  }
  .mySquad .start-squad-top-title  .down-arrow p:nth-of-type(1){
    margin-left:30px;
  }
  .mySquad .start-squad-top-title  .down-arrow p:nth-of-type(1){
    margin-right:30px;
  }
  .mySquad .start-squad-top-title  .down-arrow span{
    padding: 10px 35px;
    background: #0C9DFC;
    color: #fff;
    border-radius: 35px 35px;
  }
  .mySquad .start-squad-top-title  .down-arrow i{
  }
  .mySquad .start-squad-top-avatar{
    margin:0 8px;

  }
  .mySquad .start-squad-top-avatar ul{
    display: flex;
    display: -webkit-flex;
    border-top:1px solid #f0f0f0;
  }
  .mySquad .start-squad-top-avatar ul li{
    -webkit-box-flex: 1;
    flex: 1;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-leval{
    height:40px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-leval p{
    float: left;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(1){
    margin-top:8px;
    padding-left:10px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-leval p:nth-of-type(2){
    padding-left: 6px;
    color: #999999;
    margin-top:8px;
    font-size:18px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar{
    width: 134px;
    margin:0 auto;
    border: 1px solid #E7EDF1;
    box-shadow: 3px 3px 4px rgba(0,200,215,0.1);
    border-radius: 6px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar  .start-squad-jiange{
    height:8px;
  }
  .mySquad .start-squad-top-avatar ul li  .start-squad-avatar-bg{
    width:120px;
    height: 144px;
    margin:  0 7px ;
    position: relative;
    background: url("../../static/images/fantasy_lineup.png");
    background-size:100% 100%;
  }

  .mySquad .start-squad-top-avatar ul li  .start-squad-avatar-bg span:nth-of-type(1){
    position: absolute;
    top:0;
    right:0px;
    width: 0;
    height: 0;
    /*border-bottom: 70px solid transparent;
    border-right: 70px solid #fff;*/
  }

  .mySquad .start-squad-top-avatar ul li  .start-squad-avatar-bg span:nth-of-type(2){
    position: absolute;
    top:4px;
    right:35px;
    width: 0;
    height: 0;
    color: #0C9DFC;
    font-size:20px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar-bg img{
    margin-top: 28px;
    width: 116px;
    height:116px;
    vertical-align: middle;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar p{
    padding-left:6px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(1){
    padding-top:10px;
    font-size:24px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space :nowrap;
    width:134px;
  }
  .mySquad .start-squad-top-avatar ul li .start-squad-avatar p:nth-of-type(2){
    padding-top: 4px;
    padding-bottom: 12px;
    font-size:18px;
    color: #bfbfbf;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space :nowrap;
    width:134px;
  }
  .mySquad .mySquad-top-num{
    height:106px;
    line-height:106px;
    text-align: center;
    margin:0 24px;
    border:2px dashed #dddddd;
    font-size:27px;
    color: #999999;
    margin-bottom:20px;
  }
  .mySquad-top-big{
    height:72px;
    line-height:72px;
    text-align: center;
    font-size:27px;
    color: #999999;
    margin-bottom:20px;
  }
</style>
