<template>
  <div v-cloak class="scroll_table" id="scroll_table">
    <!--固定A1-->
    <table border="0" cellspacing="0" class="fixedA1" v-show="fixedA1">
      <thead>
      <tr>
        <th v-for="(item,index) in th" v-if="index==0 || index==1">{{item}}</th>
      </tr>
      </thead>
    </table>
    <!--固定列头-->
    <table border="0" cellspacing="0" class="fixedCol" v-show="fixedCol">
      <thead>
      <tr>
        <th v-for="(item,index) in th" v-if="index==0 || index==1">{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in matchList">
        <td style="width:150px">{{item.start_time | formatDate}}</td>
        <td>{{item.match}}</td>
      </tr>
      </tbody>
    </table >
    <!--固定表头-->
    <table border="0" id="fHeader" cellspacing="0" v-show="fixedHeader">
      <thead>
      <tr >
        <th v-for="item in th">{{item}}</th>
      </tr>
      </thead>
    </table>
    <!--活动的表格-->
    <table id="sTable" border="0" cellspacing="0">
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
  import $ from '../../static/js/jquery-1.12.2.min.js';

  export default{
    data: function() {
      return {
        th: ['日期','比赛','场次','表现分','击杀','死亡','助攻','分均伤害','分均承伤','分均视野'],
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
      this.hLeft=$("#sTable").offset().left;
      this.hHeight=$("#sTable").offset().top;
      this.monitor()
    },
    methods: {

      //监控表头、列头位置
      monitor:function(){
        var self=this;
        $(window).scroll(function(){
          self.setPosition();
          //当滚动条达到左偏移值的时候，出现固定列头
          if($(this).scrollLeft()>self.hLeft){
            self.fixedCol=true
          }else{
            self.fixedCol=false
          }
          //当滚动条达到上偏移值的时候，出现固定表头
          // if($(this).scrollTop()>self.hHeight){
          if($(this).scrollTop()>0){
            self.fixedHeader=true
          }else{
            self.fixedHeader=false
          }
          //当表格移到左上角时，出现固定的A1表格
          if($(this).scrollLeft()>self.hLeft&&$(this).scrollTop()>self.hHeight){
            self.fixedA1=true
          }else{
            self.fixedA1=false
          }
        })
      },
      //使固定表头与列头的偏差与当前表格的偏移值相等
      setPosition:function(){
        $("#fHeader").css("left",this.hLeft-$(document).scrollLeft());
        $(".fixedCol").css("top",this.hHeight-$(document).scrollTop())
      }

    },

  }
</script>

<style scoped>
  .scroll_table{
    color:#3a3d44;
  }
  .scroll_table th,
  .scroll_table td {
    min-width: 150px;
    height: 68px;
    text-align: center;
  }
  #sTable {
    /*margin: 300px*/
    z-index:-1;
  }
  .fixedCol{
    position: fixed;
    left: 0;
    background: #5348FF;
    color:#fff;
    z-index: 1;
  }
  #fHeader {
    background: #5348FF;
    color:#fff;
    position: fixed;
    /*top: 348px;*/
    z-index: 1;
  }
  .fixedA1{
    background: #5348FF;
    position: fixed;
    /*top: 348px;*/
    color:#fff;
    left: 0;
    z-index:2;
  }
  #sTable tr{
    background: #fff;
  }
  #sTable th{
    background: #5348FF;
    color:#fff;
  }
  #sTable tr:nth-child(2n){
    background: #f5f5f5;
  }
</style>
