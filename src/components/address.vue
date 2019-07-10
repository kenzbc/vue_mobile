<template>
  <div class="address anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="管理收货地址"
        go-back="true"
      ></head-top>
    </div>
    <div class="address-cont">
      <div class="address-cont-first" v-for="item in addressList" @click="linkEditor(item)" v-if="item.mobile && item.addr_name">
        <div class="address-first-name">
          <p>{{item.name}}</p>
          <p>{{item.mobile}}</p>
        </div>
        <div class="address-first-detail">
          <p></p>
          <p><span v-if="item.def_addr==1">[默认]</span>{{item.addr_name}}{{item.addr}}</p>
          <p><i class="iconfont">&#xe6e4;</i></p>
        </div>
      </div>

      <div class="address-add" @click="linkAdd()">+ 新增1个收货地址</div>
    </div>
    <div class="exchange-null" style="display: none;">
      <img src="../../static/images/pic_404.png" alt="">
      <p>暂未开放</p>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/header.vue'
  import store from 'store'
export default {
  name: 'address',
  data () {
    return {
      addressList:''
    }
  },
  created(){
    var _this=this;
    this.$api('/services/userCenter/my_address_list.php', {
      limit:50
    }).then(response => {
    	if(response.code == 200){
        _this.addressList = response.data.list;
      }
    })
  },
  methods:{
    linkAdd(){
      this.$router.push({path:'/addAddress',query:{}});
    },
    linkEditor(item){
      store.set('address',{item});
      this.$router.push({path:'/editorAddress',query:{}});
    }
  },
  components: {
    headTop:HeadTop
  }
}
</script>

<style>
.address .exchange-head{
  position: fixed;
  top:0;
  left:0;
  height:90px;
  width:100%;
  z-index: 20;
}
.address .address-cont{
  margin-top:90px;
}
.address .address-cont-first{
  background: #fff;
  border-bottom:1px solid #ddd;
}
.address .address-first-name{
  display: flex;
  display: -webkit-flex;
  height:80px;
  line-height:80px;
  font-size:30px;
  color: #373A41;
}
.address .address-first-name p:nth-of-type(1){
  margin-left:24px;
  -webkit-box-flex: 1;
  flex: 1;
  font-size:30px;
  color: #373A41;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address .choice-button{
  display: block;
  height:36px;
  width:36px;
  border:2px solid #eee;
  border-radius:50%;
  margin:10px auto 0;
}
.address .choice-button1{
  display: block;
  height:36px;
  width:36px;
  border:2px solid #eee;
  border-radius:50%;
  background: #ff4141;
  margin:10px auto 0;
  text-align: center;
}
.address .choice-button1 i{
  font-size: 20px;
  color: #ffffff;
  margin-bottom:6px;
}
.address .address-first-name p:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
  margin-right:94px;
  text-align: right;
  font-size:30px;
  color: #373A41;
}
.address  .address-first-detail{
  display: flex;
  display: -webkit-flex;
  padding-bottom:30px;
}
.address  .address-first-detail p:nth-of-type(1){
  flex: 0 0 24px;
  text-align: center;
  font-soiz:30px;
  color: #373A41;
}
.address  .address-first-detail p:nth-of-type(2){
  flex: 1;
  line-height:50px;
  font-size: 30px;
  color: #373A41;
}
.address .address-first-detail p:nth-of-type(2) span{
  font-size:30px;
  color:red;
}
.address  .address-first-detail p:nth-of-type(3){
  flex: 0 0 96px;
  text-align: center;
  margin-top:10px;
  color: #373A41;
}
.address  .address-first-detail p:nth-of-type(3) i{
  font-size:30px;
  color: #a0a0a0;
}
.address .address-add{
  margin-top:20px;
  height:90px;
  line-height:90px;
  text-align: center;
  background: #fff;
  font-size:30px;
  color: #373A41;
}



  .exchange-null{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
/*.exchange-null img{*/
  /*height:200px;*/
  /*width:200px;*/
/*}*/
.exchange-null p{
  text-align:center;
  font-size:28px;
  color: #999;
}
</style>
