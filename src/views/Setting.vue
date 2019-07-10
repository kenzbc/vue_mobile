<template>
  <div class="setting_container anim-opacity2">
    <div class="exchange-head">
      <head-top
        head-title="设置房间参数"
        go-back="true"
      ></head-top>
    </div>
    <div class="setting_info">
      <div class="setting_base">
        <label><input type="text" placeholder="输入房间名称（10个字内）" id="room_text" v-model="params.name" maxlength="10" v-on:input="isInput" ></label>
        <label><input type="text" placeholder="输入房间描述（15个字内）" v-model="params.room_desc" maxlength="15" ></label>
      </div>
      <div class="setting_option">
        <label>
          <i class="iconfont">&#xe6c5;</i>
          <div>入场费</div>
          <!--<span  @click="targetFun('targetTickt')" >1</span>-->
          <p><input id="targetTickt" v-model="params.group_ticket"  type="text" readonly/><i class="iconfont">&#xe6e4;</i></p>
        </label>
        <label>
          <i class="iconfont">&#xe6f4;</i>
          <div>参与人数</div>
          <p><input id="targetNum" v-model="params.group_member_num" value="1"  type="text" readonly/><i class="iconfont">&#xe6e4;</i></p>
        </label>
        <label>
          <i class="iconfont">&#xe607;</i>
          <div>消耗钥匙</div>
          <p><input id="targetKey" v-model="params.key" type="text" readonly/><i class="iconfont setting_light_orange">&#xe607;</i></p>
        </label>
        <label>
          <i class="iconfont">&#xe604;</i>
          <div>奖金</div>
          <p><span>{{params.reward_guozi}}</span><svg aria-hidden="true" class="icon_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p>
        </label>
        <label>
          <i class="iconfont">&#xe603;</i>
          <div>分配方式</div>
          <p><input id="targetMethod" v-model="params.assign_plan_value"  type="text" readonly/><i class="iconfont">&#xe6e4;</i></p>
        </label>
        <div class="setting_plan">
        <label class="setting_rank" v-for="item in setting_data.assign_plan_rule">
          <div>{{item.name}}</div>
          <p><span>{{item.value}}</span><svg aria-hidden="true" class="icon_guozi"><use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use></svg></p>
        </label>
        </div>

      </div>
    </div>
    <div class="group_footer" :class="{active:isActive == true}" @click="savaData(isActive)">
      <p >完成设置：挑选你的阵容</p>
    </div>

    <!-- 弹框 -->
    <dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>


    <div id="TicktContainer"></div>
    <div id="NumContainer"></div>
    <div id="targetContainer"></div>
    <div id="MethodContainer"></div>
  </div>



</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import HeadTop from '../components/header.vue'
  import DialogPay from '../components/dialogPay.vue'
  import store from 'store'

  export default {
    name: 'setting',
    data () {
      return {
        isActive:false,
        targetIuput:'',
        params:{
          group_id:'',

          name:'',
          key:'',
          reward_guozi:'',
          room_desc:'',
          group_ticket:'',
          group_member_num:'',
          assign_plan:'',
          assign_plan_value:'',

          salary_cap:'',
          at_end_time:'',

          my_ticket:'',
          my_key:''

        },
        setting_data:'',
        TicktJson:[],
        NumJson:[],
        MethodJson:[],
        vShow:false,
        payList:{
          status:'',
          isPrompt:false,
          msg_text:'',
          isTickts:'',

          group_ticket:'',
          key:'',
          my_key:'',
          my_ticket:'',
        },
        my_bank:''
      }
    },
    created(){
      var params = store.get('group');
      if(params != undefined){
        this.params = params;
      }
      this.params.group_id = this.$route.query.group_id;
      this.params.salary_cap = this.$route.query.salary_cap;
      this.params.at_end_time = this.$route.query.at_end_time;
      this.myBank();
      this.getData(this.params.group_ticket,this.params.group_member_num,this.params.assign_plan,);
    },
    methods:{
      getData(group_ticket,group_member_num,assign_plan){
        var _this = this;
        this.$api('/services/fantasy/set_room_param.php', {
          group_ticket: group_ticket,
          group_member_num:group_member_num,
          assign_plan:assign_plan
        }).then(response => {
          if (response.code == 200) {
            var id = document.getElementById('multi-picker-MethodContainer-0');
            if(id != null && response.data.assign_plan){
              if(response.data.assign_plan.length == 3){
                var exclusive_name = document.querySelectorAll('[data-id="exclusive"]');
                var average_name = document.querySelectorAll('[data-id="average"]');
                var gradient_name = document.querySelectorAll('[data-id="gradient"]');
                for(var i = 0; i< response.data.assign_plan.length; i++){
                  if(response.data.assign_plan[i].name == "exclusive"){
                    if(exclusive_name[0]){
                      exclusive_name[0].innerText = response.data.assign_plan[i].value;
                    }else{
                      var createDom = document.createElement("li");
                      createDom.setAttribute('data-id',response.data.assign_plan[i].name);
                      var createnode = document.createTextNode(response.data.assign_plan[i].value);
                      createDom.appendChild(createnode);
                      id.insertBefore(createDom,id.children[id.children.length - 2]);
                    }
                  }else if(response.data.assign_plan[i].name == "average"){
                    if(average_name[0]){
                      average_name[0].innerText = response.data.assign_plan[i].value;
                    }else{
                      var createDom = document.createElement("li");
                      createDom.setAttribute('data-id',response.data.assign_plan[i].name);
                      var createnode = document.createTextNode(response.data.assign_plan[i].value);
                      createDom.appendChild(createnode);
                      id.insertBefore(createDom,id.children[id.children.length - 2]);
                    }
                  }else if(response.data.assign_plan[i].name == "gradient"){
                    if(gradient_name[0]){
                      gradient_name[0].innerText = response.data.assign_plan[i].value;
                    }else{
                      var createDom = document.createElement("li");
                      createDom.setAttribute('data-id',response.data.assign_plan[i].name);
                      var createnode = document.createTextNode(response.data.assign_plan[i].value);
                      createDom.appendChild(createnode);
                      id.insertBefore(createDom,id.children[id.children.length - 2]);
                    }
                  }
                }
              }else{
                var average_name = document.querySelectorAll('[data-id="average"]');
                var gradient_name = document.querySelectorAll('[data-id="gradient"]');
                if(average_name[0]){
                  average_name[0].remove();
                }
                if(gradient_name[0]){
                  gradient_name[0].remove();
                }
              }
            }
            _this.setting_data = response.data;
            _this.params.key = response.data.key;
            _this.params.reward_guozi = _this.setting_data.reward_guozi;
            _this.params.group_ticket = _this.setting_data.select_group_ticket;
            _this.params.group_member_num = _this.setting_data.select_group_member_num;
            _this.params.assign_plan = _this.setting_data.select_assign_plan;

            // 变更name->ID
            var assign_plan = _this.setting_data.assign_plan;
            assign_plan.forEach(function(item){
              Vue.set(item, 'id', item.name);
              if(item.id == _this.setting_data.select_assign_plan){
                _this.params.assign_plan_value = item.value;
              }
            });
            _this.MethodJson = assign_plan;
            _this.forData(_this.setting_data.group_ticket,0);
            _this.forData(_this.setting_data.group_member_num,1);
          } else {
            layer.open({
              content: response.data.message
              ,btn: '关闭'
            });
          }
        });
      },
      forData(data,status){
      	var _this = this;
        for(var key in data){
          var obj = {};
          var value = data[key];
          obj['id'] = key;
          obj['value'] = value.toString();
          if(status == 0){
            _this.TicktJson.push(obj);
          }else if(status == 1){
            _this.NumJson.push(obj);
          }
        }
      },
      myBank(){
        let _this = this;
        this.$api('/services/userCenter/my_bank.php', {
        }).then(response => {
          if(response.code == 200){
            _this.my_bank = response.data;
          }
        })
      },
      savaData(arg){
      	this.myBank();
        setTimeout(() => {

          if(arg == false || this.params.name == ''){
            this.payList.status = 4;
            this.payList.msg_text = '请填写房间标题';
            this.vShow = true
          }else{
            if(parseInt(this.my_bank.ticket) < parseInt(this.params.group_ticket)){
              store.set('group',this.params);
              this.payList.group_ticket = this.params.group_ticket;
              this.payList.my_ticket = this.params.my_ticket;
              this.payList.status = 7;
              this.payList.msg_text = '您的门票不足';
              this.payList.isTickts = true;
              this.vShow = true;
            }else if(parseInt(this.my_bank.fantasy_key) < parseInt(this.params.key)){
              store.set('group',this.params);
              this.payList.key = this.params.key;
              this.payList.my_key = this.params.my_key;
              this.payList.status = 7;
              this.payList.msg_text = '您的钥匙不足';
              this.payList.isTickts = false;
              this.vShow = true;
            }else{
              store.remove('user');
              store.remove('roomID');
              store.remove('room_info');
              store.remove('room_player');
              store.set('group',this.params);
              this.$router.push({path:'/selected', query: {
                group_id: this.params.group_id,
                salary_cap: this.$route.query.salary_cap,
                at_end_time:this.$route.query.at_end_time,
              }});
            }
          }
        }, 500);

      },
      isInput(){
      	if(this.params.name != ''){
      		this.isActive = true
        }else if(document.getElementById('room_text').value.length == 0){
          this.isActive = false
        };
      },
      change(msg){
        this.vShow = msg
        // console.log(msg)
      },
      myBank(){
        var _this = this;
        this.$api('/services/userCenter/my_bank.php', {
        }).then(response => {
          _this.my_bank = response.data;
          _this.params.my_ticket = _this.my_bank.ticket;
          _this.params.my_key = _this.my_bank.fantasy_key;
        })

      }
    },

    mounted() {
      this.myBank();
      let _this = this;
      setTimeout(function () {
        new MultiPicker({
          input:'targetTickt',
          container:'TicktContainer',
          jsonData:_this.TicktJson,
          success:function(arr){
            _this.params.group_ticket = arr[0].value;
            _this.getData(_this.params.group_ticket, _this.params.group_member_num, _this.params.assign_plan);
            setTimeout(function () {
              if(parseInt(_this.my_bank.ticket) < parseInt(_this.params.group_ticket)){
                store.set('group',_this.params);
                _this.payList.group_ticket = arr[0].value;
                _this.payList.my_ticket = _this.params.my_ticket;
                _this.payList.status = 7;
                _this.payList.msg_text = '您的门票不足';
                _this.payList.isTickts = true;
                _this.vShow = true;
              }
            },500);
          },
        });

        new MultiPicker({
          input:'targetNum',
          container:'NumContainer',
          jsonData:_this.NumJson,
          success:function(arr){
            _this.params.group_member_num = arr[0].value;
            _this.getData(_this.params.group_ticket, _this.params.group_member_num, _this.params.assign_plan);
            setTimeout(function () {
              if (parseInt(_this.params.my_key) < parseInt(_this.params.key)) {
                store.set('group', _this.params);
                _this.payList.key = _this.params.key;
                _this.payList.my_key = _this.my_bank.fantasy_key;
                _this.payList.status = 7;
                _this.payList.msg_text = '您的钥匙不足';
                _this.payList.isTickts = false;
                _this.vShow = true;
              };
            },500);
          },
        });
        new MultiPicker({
          input:'targetMethod',
          container:'MethodContainer',
          jsonData:_this.MethodJson,
          success:function(arr){
            _this.params.assign_plan_value = arr[0].value;
            _this.params.assign_plan = arr[0].id;
            _this.getData(_this.params.group_ticket,_this.params.group_member_num,_this.params.assign_plan)
          },
        });
      },1000);
    },
    watch:{

    },
    components: {
      headTop:HeadTop,
      dialogPay:DialogPay,
    }
  }
</script>

<style>
  .setting_container{
    background: url('../../static/images/fantasy_room_bg.jpg')no-repeat center;
    width:100%;
    background-size:cover;
    height:100%;
    padding-bottom: 90px
    /*height:calc(100vh - 90px);*/
    /*position: relative;*/
  }
  .setting_info{
    margin-top:90px;
    padding:0 165px;
  }
  .setting_info label{
    display: block;
    text-align: center;
  }
  .setting_base{
    padding-top:150px;
  }
  .setting_base label{
    height:80px;
    line-height:80px;
    border-bottom:1px solid #fff;
  }
  .setting_base label:last-child{
    margin-top:80px;
  }
  .setting_base label input{
    background:none;
    outline:none;
    border:0px;
    text-align: left;
  }
  .setting_base label input[placeholder]{
    font-size:32px;
    color:#fff !important;
  }

  .setting_option{
    margin-top:120px;
    margin-bottom:50px;
  }

  .setting_option label{
    color:#fff;
    line-height:80px;
    font-size:26px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-content: flex-start;
  }
  .setting_option label i{
    display: inline-block;
    width: 26px;
    font-size:26px;
    margin-right:10px;
  }
  .setting_option label div{
    display: inline-block;
    flex-grow:3;
    font-size:30px;
    text-align: left;
  }
  .setting_option label p{
    font-size:30px;
  }
  .setting_option label p span{
    font-size:30px;
    padding-right:26px;
  }
  .setting_option label p i{
    margin-right:0;
  }
  .setting_option label input{
    color:#fff;
    width: 200px;
    text-align: right;
    display: inline;
    padding-right:26px;
    font-size:30px;
    line-height:80px;
    background: rgba(255,255,255,0);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #targetContainer{
    z-index:999;
  }
  .setting_option label input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff;
    opacity:1;
  }

  .setting_option label input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff; opacity:1;
  }

  .setting_option label input:-ms-input-placeholder{
    color: #fff; opacity:1;
  }

  .setting_option label input::-webkit-input-placeholder{
    color: #fff; opacity:1;
  }

  .setting_light_orange{
    color:#ccba87;
  }

  .icon_guozi{
    width: 24px;
    height:24px;
    margin-bottom: 3px;
  }

  .setting_option .setting_plan{
    overflow-y: auto;
    max-height:200px;
  }

  .setting_option label.setting_rank div{
    padding-left:36px;
    font-size:26px;
    line-height:40px;
  }
  .setting_option label.setting_rank p{
    font-size:26px;
    line-height:40px;
  }
  .setting_option label.setting_rank p span{
    font-size:26px;
  }



</style>
