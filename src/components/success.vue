<template>
  <div class="anim-opacity2">
    <div class="success">
      <div class="success-head">
        <head-top
          head-title="已成功邀请好友"
          go-back="true"
        ></head-top>
      </div>
      <div class="success-cont">
        <div class="success-cont-first" v-for="items in successList">
          <div class="success-first-left">
            <p>{{items.date}}</p>
            <p>{{items.time}}</p>
          </div>
          <div class="success-first-mid">
            <div class="success-first-mid-avatar">
              <img :src="items.member_avatar|| '../../static/images/tx_pic.jpg'" alt="">
            </div>

            <p>{{items.member_nickname}}</p>
          </div>
          <div class="success-first-right">+{{items.change_value}} <svg aria-hidden="true" class="icon_menpiao"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao-"></use></svg></div>
        </div>

      </div>
    </div>
    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&successList==''">
      <img src="../../static/images/pic_404.png" alt="">
      <p>暂无还没有内容哦</p>
    </div>
  </div>
</template>

<script>
  import loading from '@/components/loading'
  import HeadTop from '@/components/header'
  export default {
    name: 'mall',
    data () {
      return {
        loading:false,
        successList:''
      }
    },
    created() {
      var _this=this;
      this.$api('/services/userCenter/inviting_log_list.php', {
        limit:50
        // pass:true
      }).then(response => {
        if(response.code==200){
          _this. loading=true;
          _this.successList=response.data.list;
        }else{

        }

      })
    },
    methods:{

    },
    components: {
      headTop:HeadTop,
      loading
    }
  }
</script>

<style>
  .success .success-head{
    position: fixed;
    top:0;
    left:0;
    width:100%;
  }
.success .success-cont{
  margin-top: 90px;
}
.success  .success-cont-first{
  display: flex;
  display: -webkit-flex;
  height:110px;
}
.success  .success-cont-first:nth-of-type(2n-1){
  background: #fff;
}
.success .success-first-left{
  flex:0 0 200px;
  font-size: 26px;
  color: #373a41;
  text-align: center;
  margin-top: 20px;
}
  .success .success-first-left p:nth-of-type(1){
    font-size: 26px;
  }
  .success .success-first-left p:nth-of-type(2){
    font-size: 26px;
  }
.success .success-first-mid{
  -webkit-box-flex: 1;
  flex: 1;
  line-height: 110px;
  display: flex;
  display: -webkit-flex;
}
  .success .success-first-mid .success-first-mid-avatar{
    flex: 0 0 92px;
    text-align: right;
  }
  .success .success-first-mid .success-first-mid-avatar img{
    width: 52px;
    height: 52px;
    border-radius:50%;
    vertical-align: middle;
  }
  .success .success-first-mid p{
    -webkit-box-flex: 1;
    flex: 1;
    margin-left: 16px;
    font-size: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
  }
.success .success-first-right{
  flex:0 0 172px;
  line-height: 110px;
  text-align: center;
  font-size: 28px;
}
  .success  .icon_menpiao{
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
