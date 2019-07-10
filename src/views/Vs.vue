<template>
  <div class="vs_container anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="阵容对比"
        go-back="true"
      ></head-top>
    </div>


    <div v-if="vs_data != ''">



      <div class="vs_player">
        <div class="vs_a_player fll">
          <div class="vs_team_header vs_team_a">
            <div class="dec">
              <label><img :src="vs_data.self.member_avatar == ''?'static/images/icon_avatar@2x.png':vs_data.self.member_avatar" alt=""></label>
              <p>{{vs_data.self.member_nickname}}</p>
            </div>
            <div class="score">
              <p>最终排名：<span class="dark-blud">{{vs_data.self.rank}}</span> / {{vs_data.self.room_info.num}}</p>
              <p>阵容得分：<span class="c-blue">{{vs_data.self.total_score}}</span></p>
            </div>
          </div>
        </div>
        <div class="vs_dec_player fll">
          <div class="header">
            <img src="../assets/image/VS@2x.png">
          </div>
          <div class="line"><img src="../../static/images/slash_dark@2x.png"></div>
        </div>
        <div class="vs_b_player flr">
          <div class="vs_team_header vs_team_b">
            <div class="dec">
              <label><img :src="vs_data.target.member_avatar == ''?'static/icon_avatar@2x.png':vs_data.target.member_avatar" alt=""></label>
              <p>{{vs_data.target.member_nickname}}</p>
            </div>
            <div class="score">
              <p>最终排名：<span class="dark-blud">{{vs_data.target.rank}}</span> / {{vs_data.target.room_info.num}}</p>
              <p>阵容得分：<span class="c-blue">{{vs_data.target.total_score}}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="vs_player_content">
        <div class="position-item" v-for="item in vsList">
          <div class="vs_a_left fll">
            <ul>
              <li>
                <div class="vs_a_avater fll">
                  <img class="bj" :src="item.self_bg1" alt="">
                  <img class="player" :src="item.self_player_image" alt="">
                </div>
                <div class="vs_a_info fll">
                  <p class="value light_blue">{{item.self_r_score}}</p>
                  <p class="name">{{item.self_player_nickname}}</p>
                  <p class="team">{{item.self_team_short_name}}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="vs_dec_center fll">
            <ul>
              <li>
                <position-icon width="40" height="40" :position="item.position"></position-icon>
                <p>{{item.position}}</p>
              </li>
            </ul>
          </div>

          <div class="vs_b_right flr">
            <ul>
              <li>
                <div class="vs_b_avater flr">
                  <img class="bj" :src="item.target_bg1" alt="">
                  <img class="player" :src="item.target_player_image" alt="">
                </div>
                <div class="vs_b_info flr">
                  <p class="value light_blue">{{item.target_r_score}}</p>
                  <p class="name">{{item.target_player_nickname}}</p>
                  <p class="team">{{item.target_team_short_name}}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>



    </div>
  </div>
</template>

<script>
  import store from 'store'
  import axios from 'axios'
  import HeadTop from '../components/header.vue'
  export default {
    name: 'vs_container',
    data () {
      return {
        dec_test:[
          {
            title:'TOP',
            icon:'../static/images/icon_p3.png'
          },
          {
            title:'JUG',
            icon:'../static/images/icon_p4.png'
          },
          {
            title:'MID',
            icon:'../static/images/icon_p2.png'
          },
          {
            title:'ADC',
            icon:'../static/images/icon_p1.png'
          },
          {
            title:'SUP',
            icon:'../static/images/icon_p5.png'
          },
        ],
        vs_data:'',
        vsList:[],
      }
    },
    created(){
      let member_info = store.get('member_info');
      if(member_info == undefined){
        this.$router.push({path:'/home'});
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        var self_order_id = this.$route.query.self_order_id;
        var target_order_id = this.$route.query.target_order_id;
        var _this = this;
        this.$api('/services/fantasy/lineup_contrast.php', {
          self_order_id:self_order_id,
          target_order_id:target_order_id,
        }).then(response => {
          //console.log(response)
          if(response.code == 200){
            _this.vs_data = response.data
            /*求两个集合的并集*/

            let vsList = [];
            let selfList = response.data.self.player_list;
            let targetList = response.data.target.player_list;

            for (let i=0; i< selfList.length; i++){
              vsList.push({
                self_bg1 : selfList[i].bg1,
                self_player_image : selfList[i].player_image,
                self_r_score : selfList[i].r_score,
                self_player_nickname : selfList[i].player_nickname,
                position : this.dec_test[i].title,
                target_bg1 : targetList[i].bg1,
                target_player_image : targetList[i].player_image,
                target_r_score : targetList[i].r_score,
                target_player_nickname : targetList[i].player_nickname,
              })
            }
            this.vsList = vsList;

          }else{
            layer.open({
              content: response.message
              ,btn: '关闭'
            });
          }
        })
//      axios.get('http://api-v2.famulei.com/services/fantasy/lineup_contrast.php?sign=55F8FD34FACD701E4D3CD3F6E0680F4C&api_version=4.0.0&self_order_id=47966&target_order_id=46620&token=',{
//      })
//        .then(function (response) {
//          _this.vs_data = response.data.data
//        })
//        .catch(function (error) {
//          alert(error.data.message)
//        })
      }
    },
    components: {
      headTop:HeadTop,
    }
  }
</script>

<style lang="stylus" scoped>
  .dark-blud{
    color:#5B579A
  }
  .c-blue{color:#5348FF;}

  .vs_player{
    margin:90px auto 0;
    overflow: hidden;
  }
  .vs_a_player,.vs_b_player,.vs_a_left,.vs_b_right{
    width:calc(50% - 25px);
  }
  .vs_dec_player .header p{
    width: 50px;
    text-align: center;
  }
  .vs_team_a{
    margin-left:24px;
  }
  .vs_team_b{
    margin-right:24px;
  }
  .vs_team_header{
    /*position: relative;*/
    height:318px;
  }
  .vs_team_header .dec{
    position: relative;
  }
  .vs_team_header .dec label{
    position: absolute;
    left:50%;
    top:36px;
    display: block;
    overflow: hidden;
    width: 120px;
    height:120px;
    background: #e5e5e5;
    /*border:1px solid #dcdcdc;*/
    border-radius: 50%;
    transform: translate(-50%, 0);
  }
  .vs_team_header .dec label img{
    width: 100%;
    display: block;
  }
  .vs_team_header .dec p{
    position: absolute;
    top:170px;
    left:50%;
    transform: translate(-50%, 0);
    width: 100%;
    text-align: center;
    padding:0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#5B579A;


  }
  .vs_team_header .score{
    padding-top:220px;
    padding-left:12%;
  }
  .vs_team_header .score p{
    font-size:24px;
    color:#B2B0D2;
    line-height:34px;

    span{
      font-family:PingFangSC-Semibold;
      font-weight:600;
    }
  }
  .vs_dec_player{
    height:318px;
    padding-top:86px;
    text-align: center;

    .line{
      padding-top:110px;
      color:#B2B0D2;
      font-size:48px;
      font-family:"Heiti TC";
      font-weight:800;
    }
  }
  .vs_dec_player .header p{
    font-size:42px;
    color:#999999;
    font-weight: bold;
  }
  .vs_dec_player .body{
    height:750px;
  }
  .vs_dec_player .body section{
    height:150px;
  }
  .vs_dec_player .body section label{
    display: block;
  }
  .vs_player_content{
    overflow: hidden;
  }
  .vs_player_content .position-item{
    background #fff;
    margin:15px;
    display flex;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
    border-radius:12px;
    overflow: hidden;
  }
  .vs_a_left li,.vs_b_right li{
    overflow: hidden;
    width: 100%;
  }
  .vs_dec_center{
    width: 50px;
  }
  .vs_a_left li,.vs_b_right li,.vs_dec_center li{
    height:153px;
  }
  .vs_dec_center li{
    text-align center
    padding-top:40px;
  }

  .vs_dec_center li{
    height:153px;
  }
  .vs_dec_center li p{
    text-align: center;
    font-size:18px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#B2B0D2;
  }
  .vs_dec_center label{
    display: block;
    margin-top:40px;
    width: 50px;
    height:50px;
  }
  .vs_dec_center label img{
    display: block;
    width: 100%;
  }
  .vs_a_avater,.vs_b_avater{
    width:192px;
    height:150px;
    position: relative;
  }
  .vs_a_avater img,.vs_b_avater img{
    display: block;
    width: 100%;
  }
  .vs_a_avater .player{
    position: absolute;
    top:0;
    left:0;
    width: 150px;
    height:150px;
  }
  .vs_a_avater .bj{
    position: absolute;
    top:0;
    left:0;
    width: 192px;
    height:150px;
  }
  .vs_b_avater .player{
    position: absolute;
    top:0;
    right:42px;
    width: 150px;
    height:150px;
  }
  .vs_b_avater .bj{
    position: absolute;
    top:0;
    right:0;
    width: 192px;
    height:150px;
  }
  .vs_a_info{
    padding-top:20px;
    padding-left:10px;
    padding-bottom:20px;
    width: 130px;
  }
  .vs_b_info{
    padding-top:20px;
    padding-bottom:20px;
    padding-right:10px;
    width: 130px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .vs_b_info p{
    text-align: right;
  }
  .vs_a_info .value,.vs_b_info .value{
    font-size:28px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#5348FF;
  }
  .vs_a_info .name,.vs_b_info .name{
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:#5B579A;
    width: 130px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .vs_a_info .team,.vs_b_info .team{
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#B2B0D2;
    width: 130px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
