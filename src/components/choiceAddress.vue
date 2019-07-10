<template>
  <div class="choiceAddress">
    <div class="exchange-head">
      <head-top
        head-title="选择收货地址"
        go-back="true"
      ></head-top>
    </div>
    <div class="address-cont">
      <div class="address-cont-first" v-for="(item,index) in addressList" v-if="item.def_addr==1">
        <div class="address-first-name">
          <p>{{item.name}}</p>
          <p>{{item.mobile}}</p>
        </div>
        <div class="address-first-detail">
          <p @click="setAddress(0,item.addr_id)"><span v-if="defAddr==0" class="choice-button1"><i class="iconfont">&#xe609;</i></span><span v-else class="choice-button"></span></p>
          <p @click="linkEditor(item)"><span v-if="item.def_addr==1">[默认]</span>{{item.addr_name}}{{item.addr}}</p>
          <p @click="linkEditor(item)"><i class="iconfont">&#xe6e4;</i></p>
        </div>
      </div>
      <div class="address-cont-first" v-for="(item,index) in addressList" v-if="item.def_addr!=1">
        <div class="address-first-name">
          <p>{{item.name}}</p>
          <p>{{item.mobile}}</p>
        </div>
        <div class="address-first-detail">
          <p @click="setAddress(index+1,item.addr_id)"><span v-if="defAddr==index+1" class="choice-button1"><i class="iconfont">&#xe609;</i></span><span v-else class="choice-button"></span></p>
          <p @click="linkEditor(item)"><span v-if="item.def_addr==1">[默认]</span>{{item.addr_name}}{{item.addr}}</p>
          <p @click="linkEditor(item)"><i class="iconfont">&#xe6e4;</i></p>
        </div>
      </div>
      <div class="address-add" @click="linkAdd()">+ 新增1个收货地址</div>
      <div @click="buyButton()" class="address-choice"><p>确定</p></div>
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
        addressList:'',
        addressId:'',
        defAddr:'0'
      }
    },
    created(){
      var _this=this;
      this.$api('/services/userCenter/my_address_list.php', {
        limit:50
      }).then(response => {
        if(response.code==200){
          _this.addressList = response.data.list;
          for(var i=0;i<_this.addressList.length;i++){
            if(_this.addressList[i].def_addr==1){
              _this.addressId=_this.addressList[i].addr_id
            }
          }
        }
      })

    },
    methods:{
      linkAdd(){
        this.$router.push({path:'/addAddress',query:{actionId:this.$route.query.actionId}});
      },
      linkEditor(item){
//        console.log(item)
        store.set('address',{item});
        this.$router.push({path:'/editorAddress',query:{actionId:this.$route.query.actionId}});
      },
      setAddress(index,addrId){
//          console.log(index);
        this.defAddr=index;
        this.addressId=addrId;
      },
      buyButton(){
          if(this.addressList.length==0){
            layer.open({
              content: '请添加收货地址'
              ,btn: '关闭'
            });
          }else{
            if(this.addressId==''){
              layer.open({
                content: '请选择收货地址'
                ,btn: '关闭'
              });
            }else{
              var _this=this;
              this.$api('/services/exchangeGoods/member_exchange.php', {
              	action_id:this.$route.query.actionId,
                address_id:this.addressId
              }).then(response => {
                if(response.code==200){
                  layer.open({
                    content: response.message
                    ,btn: '关闭'
                  });
                  _this.$router.push({path:'/record'})
                }else{
                  layer.open({
                    content: response.message
                    ,btn: '关闭'
                  });
                }
              })
            }
          }
  }
    },
    components: {
      headTop:HeadTop
    }
  }
</script>

<style>
  .choiceAddress .exchange-head{
    position: fixed;
    top:0;
    left:0;
    height:90px;
    width:100%;
    z-index: 20;
  }
  .choiceAddress .address-cont{
    margin-top:90px;
    margin-bottom:140px;
  }
  .choiceAddress .address-cont-first{
    background: #fff;
    border-bottom:1px solid #ddd;
  }
  .choiceAddress .address-first-name{
    display: flex;
    display: -webkit-flex;
    height:80px;
    line-height:80px;
    font-size:30px;
    color: #373A41;
  }
  .choiceAddress .address-first-name p:nth-of-type(1){
    margin-left:94px;
    -webkit-box-flex: 1;
    flex: 1;
    font-size:30px;
    color: #373A41;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .choiceAddress .choice-button{
    display: block;
    height:36px;
    width:36px;
    border:2px solid #eee;
    border-radius:50%;
    margin:10px auto 0;
  }
  .choiceAddress .choice-button1{
    display: block;
    height:36px;
    width:36px;
    border:2px solid #eee;
    border-radius:50%;
    background: #ff4141;
    margin:10px auto 0;
    text-align: center;
  }
  .choiceAddress .choice-button1 i{
    font-size: 20px;
    color: #ffffff;
    margin-bottom:6px;
  }
  .choiceAddress .address-first-name p:nth-of-type(2){
    -webkit-box-flex: 1;
    flex: 1;
    margin-right:94px;
    text-align: right;
    font-size:30px;
    color: #373A41;
  }
  .choiceAddress  .address-first-detail{
    display: flex;
    display: -webkit-flex;
    padding-bottom:30px;
  }
  .choiceAddress  .address-first-detail p:nth-of-type(1){
    flex: 0 0 94px;
    text-align: center;
    font-soiz:30px;
    color: #373A41;
  }
  .choiceAddress  .address-first-detail p:nth-of-type(2){
    flex: 1;
    line-height:50px;
    font-size: 30px;
    color: #373A41;
  }
  .choiceAddress .address-first-detail p:nth-of-type(2) span{
    font-size:30px;
    color:red;
  }
  .choiceAddress  .address-first-detail p:nth-of-type(3){
    flex: 0 0 96px;
    text-align: center;
    margin-top:10px;
    color: #373A41;
  }
  .choiceAddress  .address-first-detail p:nth-of-type(3) i{
    font-size:30px;
    color: #a0a0a0;
  }
  .choiceAddress .address-add{
    margin-top:20px;
    height:90px;
    line-height:90px;
    text-align: center;
    background: #fff;
    font-size:30px;
    color: #373A41;
  }

  .choiceAddress .address-choice{
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    height: 120px;
    background: #fff;
    width: 100%;
  }
  .choiceAddress .address-choice p{
    height: 76px;
    line-height: 76px;
    width: 702px;
    margin: 22px auto;
    text-align: center;
    background: #FCD001;
    border-radius: 8px;
    font-size: 30px;
  }
  /*.exchange-null{*/
    /*position: fixed;*/
    /*top:50%;*/
    /*left:50%;*/
    /*margin-top:-100px;*/
    /*margin-left:-100px;*/
  /*}*/
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
