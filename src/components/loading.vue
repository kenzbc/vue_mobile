<template>
<div class="loading">
  <img src="../../static/images/loading.gif" alt="">
  <p>{{loadingText}}</p>
</div>
</template>

<script>
export default {
  name: 'mall',
  props:{
    loadingText:{
      type: String,
      default: '加载中...',
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  .loading{
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-100px;
    margin-left:-100px;
    height:200px;
    width:200px;
    text-align: center;
    /*background: #515151;*/
    background: none;
    -webkit-border-radius:;
    -moz-border-radius:;
    border-radius:20px 20px;
    z-index: 99;
  }
  .loading img{
    margin-top:30px;
    vertical-align: middle;
    width:100px;
    height:100px;
  }
  .loading p{
    margin-top:8px;
    text-align: center;
    font-size:28px;
    color: #999;
  }
</style>
