<template>
  <span class="count_time">{{time}}</span>
</template>

<script>
  export default{
    data () {
      return {
        time : '00:00:00',
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
          if(leftTime <= 0){
            this.flag = true;
            this.$emit('time-end')
          }
          this.time = `${hours}:${m}:${s}`
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
