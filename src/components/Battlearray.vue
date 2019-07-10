<template>
  <div>
    <router-link class="create_content_p3" :to="{ path:'/ChoosePlayer', query: { positionID: 3} }" >
      <section v-if="curPlayer.TOP != ''">
        <label class="create_avater_img"><img :src="curPlayer.TOP.player_image == ''  ? pic_img[2] : curPlayer.TOP.player_image"></label>
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
              bg-color="rgba(0,0,0,0)"
              text=""
            ></circle-css>
          </div>
        </div>
      </section>
      <img src="../../static/images/avater_P3.png" v-else>
    </router-link>


    <router-link class="create_content_p1" :to="{ path:'/ChoosePlayer', query: { positionID: 1} }">
      <section v-if="curPlayer.ADC != ''">
        <label class="create_avater_img"><img :src="curPlayer.ADC.player_image == ''  ? pic_img[2] : curPlayer.ADC.player_image"></label>
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
    <router-link class="create_content_p2" :to="{ path:'/ChoosePlayer', query: { positionID: 2} }">
      <section v-if="curPlayer.MID != ''">
        <label class="create_avater_img"><img :src="curPlayer.MID.player_image == '' ? pic_img[2] : curPlayer.MID.player_image"></label>
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
    <router-link class="create_content_p4" :to="{ path:'/ChoosePlayer', query: { positionID: 4} }">
      <section v-if="curPlayer.JUG != ''">
        <label class="create_avater_img"><img :src="curPlayer.JUG.player_image == '' ? pic_img[2] : curPlayer.JUG.player_image"></label>
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
    <router-link class="create_content_p5" :to="{ path:'/ChoosePlayer', query: { positionID: 5} }">
      <section v-if="curPlayer.SUP != ''">
        <label class="create_avater_img"><img :src="curPlayer.SUP.player_image == '' ? pic_img[2] : curPlayer.SUP.player_image"></label>
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

        pic_img:['static/images/avater_default_1.png',
          'static/images/avater_default_2.png',
          'static/images/unknow_2.png']
      }
    },
    props :['curPlayer'],
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
</style>
