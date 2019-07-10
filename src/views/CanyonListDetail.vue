<template>
  <div style="position:fixed;width:100%;height:100%;background-color:#26254b;overflow:auto;-webkit-overflow-scrolling:touch;">
    <header>
      <div class="head-phase">
        <span>第{{dataInfo.phase_number}}期记录详情</span>
        <span>{{dataInfo.add_time}}</span>
      </div>
      <div style="text-align:center;position: absolute;bottom:80px;left:72px;">
      <span class="prize color-left">
        <div class="box">
          <span class="item">{{winTeam.name}}</span>
          <div style="font-size:36px;">在 <span class="item2">{{winLocation.name}}</span> 地点</div>
          <span class="item">{{winSkill.name}}</span>
        </div>
        <span class="hex-border"></span>
      </span>
      </div>

      <div style="width:270px;position:absolute;bottom:40px;right:0;"><img style="width:230px;" src="../assets/image/ruiwen_people2@2x.png" ></div>

      <div style="width:100%;text-align: center;position: absolute;bottom:-60px;left:0%;">
        <span class="parallelogram color-right">
          <span class="p-left">
            <div style="margin-top:20px;display:flex;justify-content:center;align-items:center;font-size:24px;">共计参与&nbsp;<img src="../assets/image/icon_12_fruit@2x.png"></div>
            <span style="font-size:40px;">{{dataInfo.ticket}}</span>
          </span>
        </span>
        <span class="parallelogram color-right">
          <span class="p-right">
            <div style="margin-top:20px;display:flex;justify-content:center;align-items:center;font-size:24px;">共计获得&nbsp;<img src="../assets/image/jinbi_icon@2x.png"></div>
            <span style="font-size:40px;">{{dataInfo.reward_guozi}}</span>
          </span>
        </span>
      </div>

    </header>
    <br><br><br>
    <div class="list" v-if="dataInfo.list.length" v-for="item,index in dataInfo.list">
      <div class="list-left-item">
        <span class="item" :class="{'red':item.item == winTeam.item || item.item == winLocation.item || item.item == winSkill.item}" v-for="item in item.list">{{item.name}}</span>
        <!--<span class="item red">野区</span>-->
        <!--<span class="item red">轻松超神</span>-->
      </div>
      <div class="list-right-item">
        <span class="gain"><span class="mr10" style="color:#ec225d;">{{item.reward_guozi}}</span>&nbsp;获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
        <span class="participation"><span class="mr10" style="color:#dfddff">{{item.ticket}}</span>&nbsp;参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
      </div>
    </div>



    <div style="display:none" class="list">
      <div class="list-left-item">
        <span class="item">红方</span>
        <span class="item">上路</span>
      </div>
      <div class="list-right-item">
        <span class="gain"><span class="mr10" style="color:#ec225d;">23</span>&nbsp;获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
        <span class="participation"><span class="mr10" style="color:#dfddff">4323</span>&nbsp;参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
      </div>
    </div>
    <div style="display:none" class="list">
      <div class="list-left-item">
        <span class="item">红方</span>
      </div>
      <div class="list-right-item">
        <span class="gain"><span class="mr10" style="color:#ec225d;">23</span>&nbsp;获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
        <span class="participation"><span class="mr10" style="color:#dfddff">4323</span>&nbsp;参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
      </div>
    </div>
    <div style="display:none" class="list">
      <div class="list-left-item">
        <span class="item">下路</span>
      </div>
      <div class="list-right-item">
        <span class="gain"><span class="mr10" style="color:#ec225d;">23</span>&nbsp;获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
        <span class="participation"><span class="mr10" style="color:#dfddff">4323</span>&nbsp;参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
      </div>
    </div>
    <div style="display:none" class="list">
      <div class="list-left-item">
        <span class="item red">轻松超神</span>
      </div>
      <div class="list-right-item">
        <span class="gain"><span class="mr10" style="color:#ec225d;">23</span>&nbsp;获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
        <span class="participation"><span class="mr10" style="color:#dfddff">4323</span>&nbsp;参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
      </div>
    </div>

    <router-link :to="{path:'/Canyon'}">
    <a href="javascript:;" class="button">返回游戏</a>
    </router-link>
  </div>
</template>

<script>
    export default {
      name: "CanyonListDetail",
      components:{

      },
      data: function (){
        return {
          phase_time:'',
          dataInfo:{},
          winTeam:{},
          winLocation:{},
          winSkill:{},

        }
      },
      mounted(){
        this.getDetailInfo();
      },
      created(){
        this.phase_time = this.$route.query.phase_time;
      },
      methods:{
        getDetailInfo:function () {
          let _this = this;
          //this.$api('/services/canyon/log_info.php?phase_time=201811231642&member_id=2564563&platform=ios&api_version=5.1.1&ts=1542962849&token=ec701bd9e35791e8aba44da4d29791bf&open_uuid=73acd641e7b2c9706d057c86b45c00bf&open_token=bog1JFXuvBAU_PpUL4z_-7XO4-RWObOi4a3l1jJ4-IdvdNR2bjuQuIA0_iRGAyXHsximwFCVrIpgAB12OQ5t9LP63gvJTERnRfGO2Ujsy1L2nURV23mzi6zUvMAcexE2',{
          this.$api('/services/canyon/log_info.php',{
            phase_time:this.phase_time,
          })
          .then(function (res) {
            if(res.code!=200){
              layer.open({content: res.message, btn: '关闭'});
              return false;
            }

            _this.dataInfo = res.data.list;
            _this.winTeam = res.data.list.reward_items[0];
            _this.winLocation = res.data.list.reward_items[1];
            _this.winSkill = res.data.list.reward_items[2];

          })
          .catch(function (error) {
            layer.open({content: '请求失败！error='+error,skin: 'msg',time: 2});
          })
        },


      }
    }
</script>

<style lang="stylus" scoped>
  leftBgColor = #EF1B5A;
  rightBgColor = #5348FF;

  *{
    font-size: 22px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    display: none;
  }


  header{
    height:484px;
    background:linear-gradient(180deg,rgba(38,36,76,1) 0%,rgba(138,15,92,1) 100%);
    position:relative;
  }

  .head-phase{
    width:194px*2;height:42px*2;
    text-align:center;
    color:#fff;
    position:absolute;top:22px;left:32px;
    background:url('../assets/image/canyon-detail-banner-bg@2x.png') no-repeat center top;
    background-size cover;
  }
  .head-phase span{
    display:block;
    height:50px;line-height:50px;
    text-align:center;
    font-size:28px;
  }
  .head-phase span:last-child{
    font-size:24px;
  }
  .prize {
    display: inline-block;
    width: 450px;
    height: 260px;
    color:#fff;
    font-size:48px;
    transform: skew(10deg);
    position: relative;
  }
  .prize .hex-border{
    display:inline-block;width:70px;height:100%;background:leftBgColor;transform: skew(-10deg);position:absolute;z-index:1;left:-30px;border-radius:12px 0 0 12px;
  }
  .prize .box{
    width 90%;
    height 100%;
    /*background #0A451D;*/
    transform: skew(-10deg);
    position:absolute;
    z-index 10;
    left:-10px;
  }
  .prize .box .item{
    display:inline-block;
    width:100%;
    height:60px;
    margin-top:20px;
    line-height:@height;
    background:rgba(203,18,73,1);
    border-radius:38px;
    font-size:36px;
  }
  .prize .box .item2{
    display:inline-block;
    width:115px;
    height:60px;
    margin-top:20px;
    line-height:@height;
    background:rgba(203,18,73,1);
    border-radius:38px;
    font-size:36px;
  }


  .parallelogram {
    display: inline-block;
    width: 300px;
    height: 120px;
    color:#fff;
    font-size:48px;
    transform: skew(-10deg);
    position: relative;
  }
  .color-left{background: leftBgColor;}
  .color-right{background: rightBgColor;}
  .p-left{display:inline-block;width:100%;height:120px;background:rightBgColor;transform: skew(10deg);position:absolute;left:-30px;border-radius:12px 0 0 12px;}
  .p-right{display:inline-block;width:100%;height:120px;background:rightBgColor;transform: skew(10deg);position:absolute;right:-30px;border-radius:0 12px 12px 0;}



  .list{
    height:84px;margin-top:20px;
    margin-left:20px;
    margin-right:20px;
    color:#B2B0D2;font-size:12px;
    border-radius:48px;
    background:#1F1D3D;
    overflow-y: scroll;
  }
  .list:hover,.list:active,.list:focus,.list.active{
    box-shadow:0px 6px 4px -4px rgba(239,27,90,0.5);
    border-image:linear-gradient(360deg, rgba(239,27,90,1), rgba(57,54,115,1)) 1 1;
  }
  .list-left-item{
    width:480px;float:left;padding:20px 0 0 20px;
    position:relative;
  }
  .list-left-item .item{
    display:inline-flex;
    justify-content center;
    align-items center;
    min-width:96px;height:48px;
    padding:20px;
    margin-right:10px;
    background:#594A7F;
    border-radius:48px;
    font-size:28px;
  }
  .list-left-item .item.red{
    color:#fff;
    background:leftBgColor;
  }

  .list-right-item{
    width:180px;height:100%;float:right;padding:12px 0px 12px 0;margin-right:20px;display:flex;justify-content:flex-end;flex-wrap:wrap;
  }
  .list-right-item .gain{width:100%;display:inline-flex;justify-content:flex-end;align-items:center;}
  .list-right-item .participation{width:100%;display:inline-flex;justify-content:flex-end;align-items:center;}
  .list-right-item img{
    margin-left:10px;
  }


  .button{
    width auto;
    margin:20px 60px;
    display block;
    height:84px;
    line-height: @height;
    text-align:center;
    background:rgba(83,72,255,1);
    box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
    border-radius:12px;
    border:0;
    font-size:28px;
    color:#fff;
  }

</style>
