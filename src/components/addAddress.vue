<template>
  <div class="addAddress">
    <div class="exchange-head">
      <head-top
        head-title="新增收货地址"
        go-back="true"
        add-address="true"
        @saveChange="savestate"
        :msg="msg"
      ></head-top>
    </div>
    <div class="addAddress-cont">
      <div class="addAddress-cont-name">
        <p>收货人</p>
        <p><input id="username" type="text" name="" v-model="username"  autocomplete="off"></p>
      </div>
      <div class="addAddress-cont-phone">
        <p>联系电话</p>
        <p><input id="phone" type="tel" name="" maxlength="11" v-model="phonenum"  autocomplete="off"></p>
      </div>
      <div class="addAddress-cont-region" >
        <p>所在地区</p>
        <p ><input id="addressArea"  v-model="addressDetail"  type="text" readonly/></p>
        <span v-show="flag==false">请选择  <i style="font-size: 26px;" class="iconfont">&#xe6e4;</i></span>
      </div>
      <div class="addAddress-cont-detail">
        <textarea class="addAddress-cont-textar"  placeholder="请填写详细地址" v-model="str"></textarea>
      </div>
      <div class="addAddress-cont-postcode">
        <p>邮政编码</p>
        <p><input id="postcode" v-model="postcode" type="tel" maxlength="6" name=""  autocomplete="off"></p>
      </div>
    </div>
    <div id="AddressContainer"></div>
  </div>
</template>

<script>
  import HeadTop from '../components/header.vue'
  'use strict';
  import {city} from './city-data'

export default {
  name: 'addAddress',
  data () {
    return {
        str:'',
      flag:false,
      result: null,
      show: false,
      addressDetail:'',
      username:'',
      phonenum:'',
      msg:false,
      postcode:'',
      cityList:'',
      regionId:''
    }
  },
  mounted(){
    this.cityList=city;
    var _this = this;
    new MultiPicker({
      input:'addressArea',
      container:'AddressContainer',
      jsonData:this.cityList,
      success:function(arr){
          _this.flag=true;
        if(arr[2]){
          _this.addressDetail = arr[0].value+'-'+arr[1].value+'-'+arr[2].value;
          _this.regionId=arr[2].id
        }else{
          _this.addressDetail = arr[0].value+'-'+arr[1].value;
          _this.regionId=arr[1].id
        }
      },
    });
  },
  methods:{
    savestate(msg){
//    	console.log(msg);
        if(msg){
           if(this.username==''){
             layer.open({
               content: '请输入收货人'
               ,btn: '关闭'
             });
           }else{
             var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
             if(!myreg.test(this.phonenum)){
               layer.open({
                 content: '请输入正确的手机号'
                 ,btn: '关闭'
               });
               }else{
                 if(this.addressDetail==''){
                   layer.open({
                     content: '请选择所在地区'
                     ,btn: '关闭'
                   });
                 }else{
                     if(this.str==''){
                       layer.open({
                         content: '请填写详细地址'
                         ,btn: '关闭'
                       });
                     }else{
                         if(this.postcode==''||this.postcode.length<6){
                           layer.open({
                             content: '请填写正确邮编'
                             ,btn: '关闭'
                           });
                         }else{
                           var _this=this;
                           this.$api('/services/userCenter/my_address_save.php', {
                           	 name:_this.username,
                             mobile:_this.phonenum,
                             zipcode:_this.postcode,
                             region_id:_this.regionId,
                             addr:_this.str
                           }).then(response => {
                             if(response.code==200){
                               layer.open({
                                 content: response.message
                                 ,btn: '关闭'
                               });
                               if(_this.$route.query.actionId){
                                 _this.$router.push({path:'/goodsDetail',query:{actionId:_this.$route.query.actionId}});
                               }else{
                                 _this.$router.push({path: '/address'})
                               }

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
             }
           }
        }
    },
    addressShow(){
        this.show=true
    },

    areaResult: function(show, result){
      this.show = show;
      this.result = result;
      if(this.result==null){

      }else{
        this.addressDetail=this.result.province.name+'-'+this.result.city.name+'-'+this.result.area.name
      }
    }
  },
  components: {
    headTop:HeadTop,
  }
}
</script>

<style>
.exchange-head{
  position: fixed;
  top:0;
  left:0;
  height:90px;
  width:100%;
  z-index: 20;
}
.addAddress{
  margin-top:90px;
  background: #fff;
}
.addAddress .addAddress-cont-name{
  height:100px;
  line-height:100px;
  display: flex;
  display: -webkit-flex;
  border-bottom:1px solid #eee;
}
.addAddress .addAddress-cont-name p:nth-of-type(1){
  flex:0 0 120px;
  margin-left: 24px;
  font-size:30px;
  color: #585858;
}
.addAddress .addAddress-cont-name p:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
}
.addAddress .addAddress-cont-phone{
  height:100px;
  line-height:100px;
  display: flex;
  display: -webkit-flex;
  border-bottom:1px solid #eee;
}
.addAddress .addAddress-cont-phone p:nth-of-type(1){
  flex:0 0 154px;
  margin-left: 24px;
  font-size:30px;
  color: #585858;
}
.addAddress .addAddress-cont-phone p:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
}
.addAddress .addAddress-cont-region{
  position: relative;
  height:100px;
  line-height:100px;
  display: flex;
  display: -webkit-flex;
  border-bottom:1px solid #eee;
}
.addAddress .addAddress-cont-region span{
  position: absolute;
  right:30px;
  font-size: 30px;
  color: #585858;
}
.addAddress .addAddress-cont-region p:nth-of-type(1){
  flex:0 0 154px;
  margin-left: 24px;
  font-size:30px;
  color: #585858;
}
.addAddress .addAddress-cont-region p:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
  font-size:30px;
  color: #585858;
  z-index: 3;
}
.addAddress .addAddress-cont-detail{
  height:150px;
  margin:25px 15px;
  border-bottom:1px solid #eee;
}
.addAddress .addAddress-cont-textar{
  color: #585858;
}
.addAddress .addAddress-cont-detail textarea{
  height:100px;
  width:720px;
  border:none;
  font-size:30px;
  color: #585858;
}
.addAddress .addAddress-cont-postcode{
  height:100px;
  line-height:100px;
  display: flex;
  display: -webkit-flex;
  border-bottom:1px solid #eee;
}
.addAddress .addAddress-cont-postcode p:nth-of-type(1){
  flex:0 0 154px;
  margin-left: 24px;
  font-size:30px;
  color: #585858;
}
.addAddress .addAddress-cont-postcode p:nth-of-type(2){
  -webkit-box-flex: 1;
  flex: 1;
}








.addAddress input {
  width:100%;
  height:50px;
  line-height: 50px;
  font-size:30px;
  background: rgba(0,0,0,0);
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  color: #585858;
}
</style>
