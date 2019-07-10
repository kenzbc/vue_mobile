<template>
  <div class="line">
    <div class="main" :id="id" style="height: 120px;width:124px;"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Highcharts from 'highcharts'


  export default {
    data() {
      return {
        legendArr: [],
        color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32'],
        myChart: {},
        name: '折线图',
      }
    },
    props: ['scoreList', 'id', 'socreAverage'],
    methods: {
      score_list(curVal,oldVal){
        this.scoreList = curVal
      },
      ID(curVal,oldVal){
        this.id = curVal
      },
      score_Average(curVal,oldVal){
        this.socreAverage = curVal;
        this.newChart(this.scoreList,this.id,this.socreAverage)
      },

      newChart(scoreList,id,socreAverage){
        let _this = this;
        setTimeout(function () {
          new Highcharts.Chart({
            chart: {
              renderTo: id,
              type: 'area',
              height: 90,
              padding: 0,
              backgroundColor: '#fff',
            },
            title: {
              text: null
            },
            xAxis: {
              gridLineWidth: '0px',
              tickWidth: 0,
              lineColor: '#FFFFFF',
              labels: {
                enabled: false
              }
            },
            tooltip: {
              enabled: false,
            },
            yAxis: {
              title: {
                text: ''
              },
              gridLineWidth: '0px',
              tickWidth: 0,
              lineColor: '#FFFFFF',
              labels: {
                enabled: false
              },
              startOnTick: false
            },
            plotOptions: {
              area: {
                fillOpacity: 0
              },
            },
            credits: {
              enabled: false     //不显示LOGO
            },
            exporting: {
              enabled: false
            },
            legend: {
              enabled: false,
              verticalAlign: 'middle'
            },
            series: [{
              name: '',
              lineColor: '#0C9DFC',
              animation: false,
              data: _this._scoreList(scoreList,socreAverage),
              type: 'area',
              marker: {
                radius: 3,
                fillColor: '#fff',
                symbol: 'circle',
                lineColor: '#0C9DFC',
                lineWidth: 2,
                border: 1,
              },
              selected: null
            }, {
              name: '',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#24d6dd',
              type: 'line',
              animation: false,
              dashStyle: 'dash',
              marker: {
                fillColor: '#fff', //设置所有数据点的颜色值
                enabled: false,
              },
              selected: null
            }]
          });
        },10)
      },
      _scoreList (scoreList,socreAverage) {
        let arr = [];
        if(scoreList != ''){
          for (let i in scoreList) {

            arr.push(scoreList[i] - socreAverage)


          }
          return arr
        }
      },
    },

    watch: {
      scoreList:'score_list',
      id:'ID',
      socreAverage:'score_Average',
    },
    mounted() {
      this.newChart(this.scoreList,this.id,this.socreAverage)
    }

  }
</script>
<style>
  .line .mian {
    height: 90px;
  }

  .highcharts-container {
    height: 90px;
  }
</style>
