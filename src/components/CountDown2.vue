<template>
  <!--<span class="count_time">{{time}}</span>-->
  <div class="time">
    <span class="hour">{{hour1}}</span>
    <span class="hour" v-if="hour2">{{hour2}}</span>
    <span class="hour" v-if="hour3">{{hour3}}</span>
    <span class="hour" v-if="hour4">{{hour4}}</span>
    <span class="colon"><span>:</span></span>
    <span class="minute">{{minute1}}</span>
    <span class="minute">{{minute2}}</span>
    <span class="colon"><span>:</span></span>
    <span class="second">{{second1}}</span>
    <span class="second">{{second2}}</span>
  </div>

</template>

<script>
  export default{
    data () {
      return {
        time : '00:00:00',
        hour1:'0',
        hour2:'0',
        hour3:'0',
        hour4:'0',
        minute1:'0',
        minute2:'0',
        second1:'0',
        second2:'0',
        flag : false
      }

    },
    created () {
      let time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(time)
        }
        this.timeDown()
      },1000)
    },

    props : {
      endTime : {
        type : String
      }
    },
    methods : {
      timeDown () {
      	if(this.endTime == ''){
          this.time = '00:00:00'
        }else{
          var endtime = this.formatDate(this.endTime);
          var timeArr = endtime.split(/[- : \/]/);
          const endTime = new Date(timeArr[0],timeArr[1]-1,timeArr[2],timeArr[3],timeArr[4],timeArr[5],);
          const nowTime = new Date();
          let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000);
          let d = parseInt(leftTime/(24*60*60));
          let h = this.formate(parseInt(leftTime/(60*60)%24));
          let hours = d*24 + parseInt(leftTime/(60*60)%24);
          let m = this.formate(parseInt(leftTime/60%60));
          let s = this.formate(parseInt(leftTime%60));

          //时间过期
          if(leftTime <= 0){
            this.flag = true;
            this.time = '00:00:00'
            this.$emit('time-end')
            return
          }




          let hour = hours+'';
          this.hour1 = hour.slice(0,1);
          this.hour2 = hour.slice(1,2);
          this.hour3 = hour.slice(2,3);
          this.hour4 = hour.slice(3,4);

          let minute = m+'';
          this.minute1 = minute.slice(0,1);
          this.minute2 =  minute.slice(1,2);

          let secound = s+'';
          this.second1 = secound.slice(0,1);
          this.second2 = secound.slice(1,2);



          this.time = `${hours}:${m}:${s}`;
          //console.log(`this.time=${leftTime}`)
        }

      },
      formatDate(str){
        var date = new Date(str*1000),
          Y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          H = date.getHours(),
          i = date.getMinutes(),
          s = date.getSeconds();
        if (m < 10) {
          m = '0' + m;
        }
        if (d < 10) {
          d = '0' + d;
        }
        if (H < 10) {
          H = '0' + H;
        }
        if (i < 10) {
          i = '0' + i;
        }
        if (s < 10) {
          s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d +' '+H +':' + i  +':' + s;
        return t;
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @font-face {
    font-family: 'DIN-Condensed-Bold';
    src: url('../../static/css/DINCondensedBold.ttf'); /* IE9 Compat Modes */
    src: url('../../static/css/DINCondensedBold.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../../static/css/DINCondensedBold.ttf') format('woff'), /* Modern Browsers */
      url('../../static/css/DINCondensedBold.ttf')  format('truetype'), /* Safari, Android, iOS */
      url('../../static/css/DINCondensedBold.ttf') format('svg'); /* Legacy iOS */
  }


  .time{
    padding-top:12px;
    position:relative;
    color:#fff;
    font-family: 'DIN-Condensed-Bold';

    .colon{
      display inline-flex;
      align-items:flex-start;
      width 30px;
      height:50px;
      position relative;
      span{
        position: absolute;
        font-size: 84px;
        height: 40px;
        top: -33px;
        left: 7px;
      }
    }
    .hour,.minute,.second{
      width: 50px;
      padding: 0px 0px 0px 0px;
      background: #fff;
      color: #5348ff;
      font-size: 84px;
      border-radius: 8px;
      display: inline-block;
      /* align-items: center; */
      /* justify-content: center; */
      height: 80px;
      /* line-height: 80px; */
    }
  }

</style>
