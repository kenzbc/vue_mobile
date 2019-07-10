<template>
  <div style="display:flex;align-items:center;">
    <span v-if="status=='1'" class="icon-label zhuli">主力</span>
    <span v-else-if="status=='2'" class="icon-label tibu">替补</span>
    <span v-else-if="status=='4'" class="icon-label inactive">不活跃</span>
    <span v-else></span>
  </div>
</template>

<script>
export default {
  name: "PlayerStatus",
  props:{
    status:{
      type: String,
      default: '0'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .icon-label{
    width: 56px;
    height: 28px;
    border-radius: 6px;
    font-size: 16px;
    color: #fff;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .zhuli{
    color:#FFFFFF
    background: #5348ff;
  }
  .tibu{
    color:#FFFFFF
    background: #B2B0D2;
  }
  .inactive{
    color:#FFFFFF
    background: #B5B1FF;
  }
</style>
