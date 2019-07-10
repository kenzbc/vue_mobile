<template>
  <div class="editorAddress">
    <div class="exchange-head">
      <head-top
        head-title="编辑收货地址"
        go-back="true"
        add-address="true"
        @saveChange="savestate"
        :msg="msg"
      ></head-top>
    </div>
    <div class="addAddress-cont">
      <div class="addAddress-cont-name">
        <p>收货人</p>
        <p><input id="username" type="text" name=""  v-model="username"  autocomplete="off"></p>
      </div>
      <div class="addAddress-cont-phone">
        <p>联系电话</p>
        <p><input id="phone" type="tel" name="" maxlength="11" v-model="phonenum"  autocomplete="off"></p>
      </div>
      <div class="addAddress-cont-region">
        <p>所在地区</p>
        <p ><input id="addressArea" v-model="addressDetail"  type="text" readonly/></p>
      </div>
      <div class="addAddress-cont-detail">
        <textarea class="addAddress-cont-textar" placeholder="请填写详细地址" v-model="str"></textarea>
      </div>
      <div class="addAddress-cont-postcode">
        <p>邮政编码</p>
        <p><input id="postcode" v-model="postcode" type="tel" maxlength="6" name=""  autocomplete="off"></p>
      </div>
      <div  class="addAddress-cont-bottom">
        <div v-if="defAddr==0" @click="setAddress()"  class="addAddress-cont-set">设置为默认地址</div>
        <div v-else-if="defAddr==1" @click="removAddress()"  class="addAddress-cont-set">取消默认地址设置</div>
        <div @click="delectAddress()" class="addAddress-cont-delect">删除收货地址</div>
      </div>

    </div>
    <div id="AddressContainer"></div>
  </div>
</template>

<script>
  import HeadTop from '../components/header.vue'
  'use strict'

  import {city} from './city-data'
  import store from 'store'
  export default {
    name: 'editorAddress',
    data () {
      return {
        str:'',
        result: null,
        detailList:'',
        show: false,
        addressDetail:'',
        username:'',
        phonenum:'',
        defAddr:'',
        msg:false,
        postcode:'',
        cityList:'',
        regionId:''
      }
    },
    created(){

    },
    mounted(){
      this.detailList = store.get('address');
      this.username=this.detailList.item.name;
      this.phonenum=this.detailList.item.mobile;
      this.addressDetail=this.detailList.item.addr_name;
      this.str=this.detailList.item.addr;
      this.postcode=this.detailList.item.zip;
      this.regionId=this.detailList.item.region_id;
      this.addrId=this.detailList.item.addr_id;
      this.defAddr=this.detailList.item.def_addr;
//      console.log(this.detailList.item);
      this.cityList=city
      var _this = this
      new MultiPicker({
        input:'addressArea',
        container:'AddressContainer',
        jsonData:this.cityList,
        success:function(arr){
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
                    var _this=this
                    this.$api('/services/userCenter/my_address_save.php',  {
                    	name:_this.username,
                      mobile:_this.phonenum,
                      zipcode:_this.postcode,
                      region_id:_this.regionId,
                      addr:_this.str,
                      addr_id:_this.addrId
                    }).then(response => {
                      //console.log(response)
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
      delectAddress(){
        var _this=this
        this.$api('/services/userCenter/my_address_del.php', {
        	addr_id:this.addrId
        }).then(response => {
            if(response.code==200){
//                console.log(response);
              layer.open({
                content: response.message
                ,btn: '关闭'
              });
              if(_this.$route.query.actionId){
                _this.$router.push({path:'/goodsDetail',query:{actionId:_this.$route.query.actionId}});
              }else{
                _this.$router.push({path: '/address'})
              }
            }
        })
      },
      setAddress(){
        var _this=this;
        this.$api('/services/userCenter/my_address_setdefault.php', {
        	name:_this.username,
          mobile:_this.phonenum,
          zipcode:_this.postcode,
          region_id:_this.regionId,
          addr:_this.str,
          addr_id:_this.addrId
        }).then(response => {
//          console.log(response)
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
      },
      removAddress(){
        var _this=this;
        this.$api('/services/userCenter/my_address_setdefault.php', {
          addr_id:_this.addrId
        }).then(response => {
//          console.log(response)
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
      },
      areaResult: function(show, result){
        this.show = show;
        this.result = result;
//        console.log(this.result);
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
  .editorAddress{
    margin-top:90px;
    background: #fff;
  }
  .editorAddress .addAddress-cont-name{
    height:100px;
    line-height:100px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #eee;
  }
  .editorAddress .addAddress-cont-name p:nth-of-type(1){
    flex:0 0 120px;
    margin-left: 24px;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-name p:nth-of-type(2){
    -webkit-box-flex: 1;
    flex: 1;
  }
  .editorAddress .addAddress-cont-phone{
    height:100px;
    line-height:100px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #eee;
  }
  .editorAddress .addAddress-cont-phone p:nth-of-type(1){
    flex:0 0 154px;
    margin-left: 24px;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-phone p:nth-of-type(2){
    -webkit-box-flex: 1;
    flex: 1;
  }
  .editorAddress .addAddress-cont-region{
    height:100px;
    line-height:100px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #eee;
  }
  .editorAddress .addAddress-cont-region p:nth-of-type(1){
    flex:0 0 154px;
    margin-left: 24px;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-region p:nth-of-type(2){
    -webkit-box-flex: 1;
    flex: 1;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-detail{
    height:150px;
    margin:25px 15px;
    border-bottom:1px solid #eee;
  }
  .editorAddress .addAddress-cont-textar{
    color: #585858;
  }
  .editorAddress .addAddress-cont-detail textarea{
    height:100px;
    width:720px;
    border:none;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-postcode{
    height:100px;
    line-height:100px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #eee;
  }
  .editorAddress .addAddress-cont-postcode p:nth-of-type(1){
    flex:0 0 154px;
    margin-left: 24px;
    font-size:30px;
    color: #585858;
  }
  .editorAddress .addAddress-cont-postcode p:nth-of-type(2){
    -webkit-box-flex: 1;
    flex: 1;
  }
  .editorAddress .addAddress-cont-bottom{
    background: #eaeaea;
    padding-top:35px;
  }
  .editorAddress .addAddress-cont-set{
    height:100px;
    line-height:100px;
    background: #fff;
    border-bottom:1px solid #eee;
    font-size: 30px;
    color: red;
    padding-left:24px;
  }
  .editorAddress .addAddress-cont-delect{
    height:100px;
    line-height:100px;
    background: #fff;
    font-size: 30px;
    color: red;
    padding-left:24px;
  }





  .editorAddress input {
    width:100%;
    height:50px;
    line-height: 50px;
    font-size:30px;
    background: rgba(0,0,0,0);
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    color: #585858;
  }
</style>
