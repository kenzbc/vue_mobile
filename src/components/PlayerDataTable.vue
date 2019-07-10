<template>
  <div v-cloak class="scroll_table" id="scroll_table">
    <div>
      <table class="table" border="0" cellspacing="0" v-for="item in matchList">
        <tr>
          <td colspan="8"><div class="date-time">{{item.start_time | formatDate}} &nbsp;<span class="match">{{item.match}}</span></div></td>
        </tr>
        <tr>
          <td v-for="item in th">{{item}}</td>
        </tr>
        <tr>
          <td>{{item.bo}}</td>
          <td>{{item.score}}</td>
          <td>{{item.kills}}</td>
          <td>{{item.deaths}}</td>
          <td>{{item.assists}}</td>
          <td>{{item.totalDamageDealtToChampions}}</td>
          <td>{{item.totalDamageTaken}}</td>
          <td>{{item.wards}}</td>
        </tr>
      </table>
    </div>
    <!--活动的表格-->
    <table style="display: none"  class="table" id="sTable" border="0" cellspacing="0">
      <thead>
      <tr>
        <th v-for="item in th">{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in matchList">
        <td>{{item.start_time | formatDate}}</td>
        <td>{{item.match}}</td>
        <td>{{item.bo}}</td>
        <td>{{item.score}}</td>
        <td>{{item.kills}}</td>
        <td>{{item.deaths}}</td>
        <td>{{item.assists}}</td>
        <td>{{item.totalDamageDealtToChampions}}</td>
        <td>{{item.totalDamageTaken}}</td>
        <td>{{item.wards}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default{
    data: function() {
      return {
        th: ['场次','表现分','击杀','死亡','助攻','分均伤害','分均承伤','分均视野'],
        temp: [],
        fixedCol: false,
        fixedHeader:false,
        fixedA1:false,
        hLeft:0,
        hHeight:400,
      }
    },
    props: ['matchList'],
    mounted: function() {

    },
    methods: {

    },

  }
</script>

<style scoped>
  .table{
    width: 100%;
    height: 100px;
    background:#fff;
    border-bottom: 1px solid #f2f1fb;
  }
  .table .date-time{
    height:50px;
    line-height: 50px;
    text-align:left;
    padding-left:10px;
    font-size:20px;
    color:#5b579a;
    font-weight: bold;
  }
  .table .match{
    color:#5348FF;
  }
  .table:nth-child(2n){
    /*background:#f5f5f5;*/
  }
  .table th, .table td {
    text-align: center;
  }
  .table tr{
    color:#b2b0d2;
    font-size:20px;
  }
  .table tr:nth-child(3){
    color:#5b579a;
    font-size:20px;
    height:50px;
    line-height: 50px;
  }
</style>
