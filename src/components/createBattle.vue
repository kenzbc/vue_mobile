<template>
  <div>
    <router-link class="create_content_p3" :to="{ path:'/CreatePlayer', query: { positionID: 3,name:name} }" >
      <input type="hidden" name="" v-model="name">
      <section v-if="curPlayer.TOP != ''">
        <label class="create_avater_img"><img :src="curPlayer.TOP.image == '' ? pic_img[2] : curPlayer.TOP.image"></label>
        <!-- <label class="create_avater_img"><img :src="curPlayer.TOP.player_image == '' ? pic_img[2] : curPlayer.TOP.player_image"></label> -->
        <div class="create_avater_dec">
          <img class="logo fll" :src="curPlayer.TOP.team_image">
          <div class="detail fll">
            <p>{{curPlayer.TOP.nickname}}</p>
            <p><svg class="icon" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_shanglu-"></use></svg>${{curPlayer.TOP.value}}</p>
          </div>
          <div class="score flr">
            <circle-css color="#00f6ff"
              width=70
              font-size=20
              :pv="curPlayer.TOP.score"
              :score="curPlayer.TOP.score"
              :total-score="curPlayer.TOP.max_score"
              bold=8
              text-bg-color='#0e1418'
              text-color="#00f6ff"
              bg-color="rgba(0,0,0,0) "
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P3.png" v-else>
    </router-link>
    <router-link class="create_content_p1" :to="{ path:'/CreatePlayer', query: { positionID: 1,name:name} }">
      <section v-if="curPlayer.ADC != ''">
        <label class="create_avater_img"><img :src="curPlayer.ADC.image == '' ? pic_img[2] : curPlayer.ADC.image"></label>
        <div class="create_avater_dec">
          <img class="logo fll" :src="curPlayer.ADC.team_image">
          <div class="detail fll">
            <p>{{curPlayer.ADC.nickname}}</p>
            <p><svg class="icon" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_AD-"></use></svg>${{curPlayer.ADC.value}}</p>
          </div>
          <div class="score flr">
            <circle-css color="#00f6ff"
              width=70
              font-size=20
              :pv="curPlayer.ADC.score"
              :score="curPlayer.ADC.score"
              :total-score="curPlayer.ADC.max_score"
              bold=8
              text-bg-color='#0e1418'
              text-color="#00f6ff"
              bg-color="rgba(0,0,0,0)"
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P1.png" v-else>
    </router-link>
    <router-link class="create_content_p2" :to="{ path:'/CreatePlayer', query: { positionID: 2,name:name} }">
      <section v-if="curPlayer.MID != ''">
        <label class="create_avater_img"><img :src="curPlayer.MID.image == '' ? pic_img[2] : curPlayer.MID.image"></label>
        <div class="create_avater_dec">
          <img class="logo fll" :src="curPlayer.MID.team_image">
          <div class="detail fll">
            <p>{{curPlayer.MID.nickname}}</p>
            <p><svg class="icon" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_zhonglu-"></use></svg>${{curPlayer.MID.value}}</p>
          </div>
          <div class="score flr">
            <circle-css color="#00f6ff"
              width=70
              font-size=20
              :pv="curPlayer.MID.score"
              :score="curPlayer.MID.score"
              :total-score="curPlayer.MID.max_score"
              bold=8
              text-bg-color='#0e1418'
              text-color="#00f6ff"
              bg-color="rgba(0,0,0,0)"
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P2.png" v-else>
    </router-link>
    <router-link class="create_content_p4" :to="{ path:'/CreatePlayer', query: { positionID: 4,name:name} }">
      <section v-if="curPlayer.JUG != ''">
        <label class="create_avater_img"><img :src="curPlayer.JUG.image == '' ? pic_img[2] : curPlayer.JUG.image"></label>
        <div class="create_avater_dec">
          <img class="logo fll" :src="curPlayer.JUG.team_image">
          <div class="detail fll">
            <p>{{curPlayer.JUG.nickname}}</p>
            <p><svg class="icon" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_daye"></use></svg>${{curPlayer.JUG.value}}</p>
          </div>
          <div class="score flr">
            <circle-css color="#00f6ff"
              width=70
              font-size=20
              :pv="curPlayer.JUG.score"
              :score="curPlayer.JUG.score"
              :total-score="curPlayer.JUG.max_score"
              bold=8
              text-bg-color='#0e1418'
              text-color="#00f6ff"
              bg-color="rgba(0,0,0,0)"
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P4.png" v-else>
    </router-link>
    <router-link class="create_content_p5" :to="{ path:'/CreatePlayer', query: { positionID: 5,name:name} }">
      <section v-if="curPlayer.SUP != ''">
        <label class="create_avater_img"><img :src="curPlayer.SUP.image == '' ? pic_img[2] : curPlayer.SUP.image"></label>
        <div class="create_avater_dec">
          <img class="logo fll" :src="curPlayer.SUP.team_image">
          <div class="detail fll">
            <p>{{curPlayer.SUP.nickname}}</p>
            <p><svg class="icon" aria-hidden="true"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon_fuzhu"></use></svg>${{curPlayer.SUP.value}}</p>
          </div>
          <div class="score flr">
            <circle-css color="#00f6ff"
              width=70
              font-size=20
              :pv="curPlayer.SUP.score"
              :score="curPlayer.SUP.score"
              :total-score="curPlayer.SUP.max_score"
              bold=8
              text-bg-color='#0e1418'
              text-color="#00f6ff"
              bg-color="rgba(0,0,0,0)"
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P5.png" v-else>
    </router-link>
  </div>
</template>

<script>
  import store from 'store'
  import CssCircle from '../components/css-circle.vue'
  export default{
    data () {
      return {

        pic_img:[
        	'../../static/images/avater_default_1.png',
          '../../static/images/avater_default_2.png',
          '../../static/images/unknow_2.png']
      }
    },
    props :['curPlayer','name'],
    mounted:function(){


    },
    methods : {
      addPlayer:function(index){
        //console.log(index);
      }
    },
    components: {
      circleCss: CssCircle
    }
  }
</script>
<style type="text/css">
  .icon {
    width: 24px;
    height: 24px;
  }

  .create_avater_img {
    position: absolute;
    top: 0;
    left: 34px;
    width: 180px;
    height: 180px;
  }

  .create_avater_img img {
    width: 100%;
  }

  .create_avater_dec {
    position: absolute;
    bottom: 0;
    width: 246px;
    height: 70px;
    border-radius: 35px;
    background: #0e1418;
    /*overflow: hidden;*/
  }

  .create_avater_dec .logo {
    /*width: 100%;*/
    width: 50px;
    height: 50px;
    margin: 10px;
  }

  .create_avater_dec .detail {
    padding: 7px 0;
    width: 106px;
  }

  .create_avater_dec .detail p {
    text-align: center;
    color: #fff;
    font-size: 24px;
  }

  .create_avater_dec .detail p:last-Child {
    color: #ccba87;
    font-size: 20px;
  }

  .create_avater_dec .detail p .icon {
    margin-right: 5px;
  }

  .create_avater_dec .score {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .create_avater_dec .score .v-circle {
    margin: -2px 0 0 -2px;
  }

  .create_content_p3, .create_content_p1, .create_content_p2, .create_content_p4, .create_content_p5 {
    width: 246px;
    height: 250px;
    position: relative;
  }

  .create_content_p3 > img, .create_content_p1 > img, .create_content_p2 > img, .create_content_p4 > img, .create_content_p5 > img {
    margin-top: 16px;
  }

  .create_content_p3 {
    position: absolute;
    left: 24px;
    /*bottom:626px;*/
    top: 76px;
  }

  .create_content_p1 {
    position: absolute;
    right: 24px;
    /*bottom:626px;*/
    top: 76px;
  }

  .create_content_p2 {
    position: absolute;
    left: 250px;
    /*bottom:426px;*/
    top: 276px;
  }

  .create_content_p4 {
    position: absolute;
    left: 24px;
    /*bottom:254px;*/
    top: 480px;
  }

  .create_content_p5 {
    position: absolute;
    right: 24px;
    /*bottom:254px;*/
    top: 480px;
  }

</style>

