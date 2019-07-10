<template>
  <div class="running_wrap">
    <div class="running_width"></div>
    <div class="running_now" v-bind:style=" 'width:' +running.total_score/running.max_score*100 + '%'"></div>
    <div class="running_man" v-bind:style="{ 'left': 'calc('+running.total_score/running.max_score*100+'% - 37px)' }"><p>{{running.total_score}}</p><img src="../assets/image/runing-crystal.gif"></div>
    <div class="running_line"><img src="../assets/image/mosaic@2x.jpg"></div>
    <div class="running_score">
      <p>{{running.pass_score}}</p>
      <p>{{running.max_score}}</p>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'running_wrap',
    data () {
      return {
      }
    },
    props: {
      running : Object
    },
    methods:{
    },
    created(){
      //console.log(this.running)
    },
    components: {
    }
  }
</script>
<style lang="stylus" scoped>
  .running_wrap{ width:100%; height: 45px; margin: 0 auto; margin-top: 120px; position: relative;}
  .running_width{ width: 100%; height: 45px; background-color: #e5e5e5;transform: skew(0deg);}
  .running_now{ height: 100%; position: absolute; left: 0; top: 0;}
  .running_man{width: 90px; position: absolute; left:-37px; top: -115px; z-index: 3; }
  .running_man img{ display: block; width: 50px; margin-left: 17px;}
  .running_man p{width:80px;font-size: 20px; line-height: 34px; color: #fff; background-color: #5348ff; border-radius: 4px; margin-bottom: 10px; position: relative; display block;text-align center;}
  //.running_man p:after{ content: ""; width: 0;height: 0;border-top: 10px solid #5348ff;border-left: 7px solid transparent;border-right:7px solid transparent; position: absolute; left: 36px; bottom: -7px;margin-bottom: -3px; }

  .running_line{ position: absolute; top: 0; z-index: 2;right:0px;}
  .running_line img{ display: block;width: 30px; height: 45px;margin-right:0;}

  .running_score{
   display flex;
   justify-content space-between;
   align-items center;
    color: #b2b0d2;
  }
</style>
