<template>
  <div class="create anim-opacity2" v-cloak>
    <head-top
      :head-title="hTitle"
      go-back="true"
      map-list="true"
      @headTabIndex="tabIndex"
      :tabIndexValue="tabIndex"
    ></head-top>
    <div class="create_name">
      <label><input type="" name="" v-model="name" placeholder="给你的阵容起个名字吧"></label>
    </div>
    <div class="create_gradient"></div>
    <section class="create_map selected_content selected_content_bj" v-if="tabIndexValue == 0">

      <!-- 阵容组件 -->
      <create-battle :curPlayer="cur_player" :name="name"></create-battle>
    </section>
    <section class="create_list" v-else>
      <ul>
        <li>
          <router-link :to="{ path:'/CreatePlayer', query: { positionID: 3, name:name} }">
            <section v-if="cur_player.TOP != ''">
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo"
                       :src="cur_player.TOP.bg1 == null || cur_player.TOP.bg1 == '' ? pic_img[0] : cur_player.TOP.bg1">
                  <img class="avatar" :src="cur_player.TOP.image == '' ? pic_img[1] : cur_player.TOP.image">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p3.png"></p>
              </div>
              <div class="create_list_dec fll">
                <p>{{cur_player.TOP.nickname}}</p>
                <p>TOP-{{cur_player.TOP.team_short_name}}</p>
              </div>
              <div class="create_list_price fll">
                <p class="light_yellow">${{cur_player.TOP.value}}</p>
                <p><span v-if="cur_player.TOP.player_status==1" class="choose_zhuli">主力</span><span
                  v-else-if="cur_player.TOP.player_status==2" class="choose_tibu">替补</span><span
                  v-else-if="cur_player.TOP.player_status==4" class="choose_inactive">不活跃</span></p>
              </div>
              <div class="create_list_score fll">
                <p class="light_blue">{{cur_player.TOP.avg_score}}</p>
              </div>
            </section>
            <section v-else>
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo" src="static/images/avater_default.png">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p3.png"></p>
              </div>
              <div class="create_def_dec fll">
                <P>上单 TOP</P>
              </div>
              <div class="create_list_score fll">
                <p class="create_add_btn"><i class="iconfont">&#xe6da;</i></p>
              </div>
            </section>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/CreatePlayer', query: { positionID: 4, name:name} }">
            <section v-if="cur_player.JUG != ''">
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo"
                       :src="cur_player.JUG.bg1 == null || cur_player.JUG.bg1 == '' ? pic_img[0] : cur_player.JUG.bg1">
                  <img class="avatar" :src="cur_player.JUG.image == '' ? pic_img[1] : cur_player.JUG.image">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p4.png"></p>
              </div>
              <div class="create_list_dec fll">
                <p>{{cur_player.JUG.nickname}}</p>
                <p>JUG-{{cur_player.JUG.team_short_name}}</p>
              </div>
              <div class="create_list_price fll">
                <p class="light_yellow">${{cur_player.JUG.value}}</p>
                <p><span v-if="cur_player.JUG.player_status==1" class="choose_zhuli">主力</span><span
                  v-else-if="cur_player.JUG.player_status==2" class="choose_tibu">替补</span><span
                  v-else-if="cur_player.JUG.player_status==4" class="choose_inactive">不活跃</span></p>
              </div>
              <div class="create_list_score fll">
                <p class="light_blue">{{cur_player.JUG.avg_score}}</p>
              </div>
            </section>
            <section v-else>
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo" src="static/images/avater_default.png">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p4.png"></p>
              </div>
              <div class="create_def_dec fll">
                <P>打野 JUG</P>
              </div>
              <div class="create_list_score fll">
                <p class="create_add_btn"><i class="iconfont">&#xe6da;</i></p>
              </div>
            </section>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/CreatePlayer', query: { positionID: 2, name:name} }">
            <section v-if="cur_player.MID != ''">
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo"
                       :src="cur_player.MID.bg1 == null || cur_player.MID.bg1 == '' ? pic_img[0] : cur_player.MID.bg1">
                  <img class="avatar" :src="cur_player.MID.image == '' ? pic_img[1] : cur_player.MID.image">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p2.png"></p>
              </div>
              <div class="create_list_dec fll">
                <p>{{cur_player.MID.nickname}}</p>
                <p>MID-{{cur_player.MID.team_short_name}}</p>
              </div>
              <div class="create_list_price fll">
                <p class="light_yellow">${{cur_player.MID.value}}</p>
                <p><span v-if="cur_player.MID.player_status==1" class="choose_zhuli">主力</span><span
                  v-else-if="cur_player.MID.player_status==2" class="choose_tibu">替补</span><span
                  v-else-if="cur_player.MID.player_status==4" class="choose_inactive">不活跃</span></p>
              </div>
              <div class="create_list_score fll">
                <p class="light_blue">{{cur_player.MID.avg_score}}</p>
              </div>
            </section>
            <section v-else>
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo" src="static/images/avater_default.png">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p2.png"></p>
              </div>
              <div class="create_def_dec fll">
                <P>中单 MID</P>
              </div>
              <div class="create_list_score fll">
                <p class="create_add_btn"><i class="iconfont">&#xe6da;</i></p>
              </div>
            </section>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/CreatePlayer', query: { positionID: 1, name:name} }">
            <section v-if="cur_player.ADC != ''">
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo"
                       :src="cur_player.ADC.bg1 == null || cur_player.ADC.bg1 == '' ? pic_img[0] : cur_player.ADC.bg1">
                  <img class="avatar" :src="cur_player.ADC.image == '' ? pic_img[1] : cur_player.ADC.image">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p1.png"></p>
              </div>
              <div class="create_list_dec fll">
                <p>{{cur_player.ADC.nickname}}</p>
                <p>ADC-{{cur_player.ADC.team_short_name}}</p>
              </div>
              <div class="create_list_price fll">
                <p class="light_yellow">${{cur_player.ADC.value}}</p>
                <p><span v-if="cur_player.ADC.player_status==1" class="choose_zhuli">主力</span><span
                  v-else-if="cur_player.ADC.player_status==2" class="choose_tibu">替补</span><span
                  v-else-if="cur_player.ADC.player_status==4" class="choose_inactive">不活跃</span></p>
              </div>
              <div class="create_list_score fll">
                <p class="light_blue">{{cur_player.ADC.avg_score}}</p>
              </div>
            </section>
            <section v-else>
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo" src="static/images/avater_default.png">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p1.png"></p>
              </div>
              <div class="create_def_dec fll">
                <P>下路 ADC</P>
              </div>
              <div class="create_list_score fll">
                <p class="create_add_btn"><i class="iconfont">&#xe6da;</i></p>
              </div>
            </section>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/CreatePlayer', query: { positionID: 5, name:name} }">
            <section v-if="cur_player.SUP != ''">
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo"
                       :src="cur_player.SUP.bg1 == null || cur_player.SUP.bg1 == '' ? pic_img[0] : cur_player.SUP.bg1">
                  <img class="avatar" :src="cur_player.SUP.image == '' ? pic_img[1] : cur_player.SUP.image">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p5.png"></p>
              </div>
              <div class="create_list_dec fll">
                <p>{{cur_player.SUP.nickname}}</p>
                <p>SUP-{{cur_player.SUP.team_short_name}}</p>
              </div>
              <div class="create_list_price fll">
                <p class="light_yellow">${{cur_player.SUP.value}}</p>
                <p><span v-if="cur_player.SUP.player_status==1" class="choose_zhuli">主力</span><span
                  v-else-if="cur_player.SUP.player_status==2" class="choose_tibu">替补</span><span
                  v-else-if="cur_player.SUP.player_status==4" class="choose_inactive">不活跃</span></p>
              </div>
              <div class="create_list_score fll">
                <p class="light_blue">{{cur_player.SUP.avg_score}}</p>
              </div>
            </section>
            <section v-else>
              <div class="create_list_avatar fll">
                <div class="create_team_avatar">
                  <img class="create_team_logo" src="static/images/avater_default.png">
                </div>
              </div>
              <div class="create_list_role fll">
                <p><img class="icon" src="static/images/icon_p5.png"></p>
              </div>
              <div class="create_def_dec fll">
                <P>辅助 SUP</P>
              </div>
              <div class="create_list_score fll">
                <p class="create_add_btn"><i class="iconfont">&#xe6da;</i></p>
              </div>
            </section>
          </router-link>
        </li>

      </ul>
    </section>
    <div class="choose_footer">
      <div class="choose_footer_base fll">
        <p>阵容平均分:{{cur_avg_score}}</p>
        <p>阵容总身价:<span class="light_yellow">${{parseInt(cur_value)}}</span></p>
      </div>
      <p class="add_button flr" @click="saveButton">保存阵容</p>
      <p class="remove_button flr" @click="removeBtn">清空阵容</p>
    </div>

    <div class="dialog opacity" v-if="isRemove" :class="{'anim-opacity2':inMove == 0,'anim-opacity1':inMove == 1}">
      <div class="dialog_container dialog_remove">
        <div class="dialog_remove_body">
          <p>是否清除阵容？</p>
        </div>
        <div class="dialog_remove_footer">
          <p class="fll" @click="removeCancel">取消</p>
          <p class="fll" @click="removeButton">确定</p>
        </div>
      </div>
    </div>

    <div class="dialog" v-if="isEdit">
      <div class="dialog_container dialog_edit">
        <div class="dialog_order_header dialog_edit_header">
          <p class="edit">是否保存阵容？</p>
          <label class="dialog_close" @click="dialogClose"><i class="iconfont">&#xe6ba;</i></label>
        </div>
        <div class="dialog_edit_body" style="height:80px">
          <!-- <p>保存阵容自动替换原先阵容</p> -->
        </div>
        <div class="dialog_edit_footer">
          <p @click="saveEditButton">保存</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import store from 'store'
  import HeadTop from '../components/header.vue'
  import CreateBattle from '../components/createBattle.vue'
  export default {
    name: 'create',
    data () {
      return {
        id: '',
        name: '',
        createMap: false,
        guozi: 'guozi',
        tabIndexValue: 1,
        cur_player: {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        pic_img: ['static/images/avater_default_1.png', 'static/images/avater_default_2.png', 'static/images/unknow_2.png'],
        cur_value: 0,
        cur_avg_score: 0,
        isRemove: false,
        hTitle: '创建阵容',
        isEdit: false,
        inMove: 0
      }
    },
    methods: {
      dialogClose(){
        this.isEdit = false
      },

      tabIndex(tabIndex){
        this.tabIndexValue = tabIndex;
      },
      curPlayer(){
        // 选中数据
        if (this.$route.query.id) {
          this.id = this.$route.query.id;
          if (this.$route.query.statued) {
            this.hTitle = '编辑阵容';
            this.tabIndexValue = 0;
            store.set('editID', {id: this.id, statued: this.$route.query.statued, name: this.$route.query.name})
          }
        } else {
          var editID = store.get('editID');
          if (editID == undefined) {
            this.hTitle = '创建阵容'
          } else {
            this.hTitle = '编辑阵容'
            this.tabIndexValue = 0
          }
        }

        if (this.$route.query.name) {
          this.name = this.$route.query.name
        }


        var user = store.get('user');
        // console.log(user);
        if (user == undefined) {
          this.removeButton()
          // return false;
        } else {
          this.cur_player = user.cur_player;
          // console.log(this.cur_player);
          if (this.cur_player.TOP != '') {
            var TOP_avg_score = this.cur_player.TOP.avg_score;
            var TOP_value = this.cur_player.TOP.value;
            var TOP_value = this.cur_player.TOP.value;
          } else {
            var TOP_avg_score = 0;
            var TOP_value = 0;
          }
          if (this.cur_player.JUG != '') {
            var JUG_avg_score = this.cur_player.JUG.avg_score;
            var JUG_value = this.cur_player.JUG.value;
          } else {
            var JUG_avg_score = 0;
            var JUG_value = 0;
          }
          if (this.cur_player.MID != '') {
            var MID_avg_score = this.cur_player.MID.avg_score;
            var MID_value = this.cur_player.MID.value;
          } else {
            var MID_avg_score = 0;
            var MID_value = 0;
          }
          if (this.cur_player.ADC != '') {
            var ADC_avg_score = this.cur_player.ADC.avg_score;
            var ADC_value = this.cur_player.ADC.value;
          } else {
            var ADC_avg_score = 0;
            var ADC_value = 0;
          }
          if (this.cur_player.SUP != '') {
            var SUP_avg_score = this.cur_player.SUP.avg_score;
            var SUP_value = this.cur_player.SUP.value;
          } else {
            var SUP_avg_score = 0;
            var SUP_value = 0;
          }
          var cur_avg_score = parseFloat(TOP_avg_score) +
            parseFloat(JUG_avg_score) +
            parseFloat(MID_avg_score) +
            parseFloat(ADC_avg_score) +
            parseFloat(SUP_avg_score);
          this.cur_avg_score = parseFloat(cur_avg_score).toFixed(1);

          this.cur_value = parseInt(TOP_value) + parseInt(JUG_value) + parseInt(MID_value) + parseInt(ADC_value) + parseInt(SUP_value);
        }
        // console.log(this.cur_player);
      },
      removeBtn(){
        this.inMove = 0;
        this.isRemove = true;
        store.remove('user')
      },
      removeCancel(){
        this.inMove = 1;
        this.isRemove = false
      },
      removeButton(){
        var cur_player = {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        };

        // 清除选中
        this.cur_player = cur_player;
        store.remove('user');
        this.cur_avg_score = 0;
        this.cur_value = 0;
        this.isRemove = false
      },
      saveButton(){
        var _this = this
        if (this.name == '') {
          layer.open({
            content: '请给阵容取个名字！'
            , btn: '关闭'
          });
        } else if (this.cur_player.TOP == '' ||
          this.cur_player.JUG == '' ||
          this.cur_player.MID == '' ||
          this.cur_player.ADC == '' ||
          this.cur_player.SUP == '') {
          layer.open({
            content: '请完善阵容'
            , btn: '关闭'
          });
        } else if (this.hTitle == '创建阵容') {
          // console.log(this.cur_player);
          this.$api('/services/fantasy/lineup_add.php', {
            name: this.name,
            playerID_1: this.cur_player.ADC.playerID,
            playerID_2: this.cur_player.MID.playerID,
            playerID_3: this.cur_player.TOP.playerID,
            playerID_4: this.cur_player.JUG.playerID,
            playerID_5: this.cur_player.SUP.playerID,
          }).then(response => {
            if (response.code == 200) {
              // 跳转 mySquad
              store.remove('user');
              _this.$router.push({path: '/mySquad'})
            } else {
              layer.open({
                content: response.message
                , btn: '关闭'
              });
            }
          })
        } else {
          var editID = store.get('editID');
          var _this = this
          this.$api('/services/fantasy/lineup_edit.php', {
            name: this.name,
            id: editID.id,
            playerID_1: this.cur_player.ADC.playerID,
            playerID_2: this.cur_player.MID.playerID,
            playerID_3: this.cur_player.TOP.playerID,
            playerID_4: this.cur_player.JUG.playerID,
            playerID_5: this.cur_player.SUP.playerID,
          }).then(response => {
            if (response.code == 200) {
              // 跳转 mySquad
              store.remove('user');
              store.remove('edit');
              _this.$router.push({path: '/mySquad'})
            } else {
              layer.open({
                content: response.message
                , btn: '关闭'
              });
            }

          })
          // this.isEdit = true
        }

      },
      // saveEditButton(){
      // 	var editID = store.get('editID')
      // 	var _this = this
      // 	this.ajax('fantasy/lineup_edit.php',{
      // 		name:this.name,
      // 		id:editID.id,
      // 		playerID_1:this.cur_player.ADC.playerID,
      // 		playerID_2:this.cur_player.MID.playerID,
      // 		playerID_3:this.cur_player.TOP.playerID,
      // 		playerID_4:this.cur_player.JUG.playerID,
      // 		playerID_5:this.cur_player.SUP.playerID,
      // 	}, function (response) {
      // 		if(response.data.code == 200){
      // 			// 跳转 mySquad
      // 			store.remove('user')
      // 			store.remove('edit')
      // 			_this.$router.push({ path:'/mySquad'})
      // 		}else{
      // 			alert(response.data.message)
      // 		}

      // 	})
      // }
    },
    mounted (){
      this.curPlayer()
    },
    components: {
      createBattle: CreateBattle,
      headTop: HeadTop
    },
    // created(){
    //     var _this=this;
    //     this.ajax('fantasy/fantasy_member_record.php', {}, function (response) {
    //     	_this.weekList=response.data.data.week_record;
    //     	_this.monthList=response.data.data.month_record;
    //     	_this.totalList=response.data.data.total_record;
    //     })
    // },
    watch: {
      '$route' () {
        this.curPlayer()
      }
    }
  }

</script>

<style>
  /*导航*/
  .create ~ .nav-bar {
    display: none;
  }

  .create {
    /*background: #fff;*/
  }

  .create_name {
    height: 104px;
    /*margin:14px 24px;*/
    background: #f5f5f5;
  }

  .create_name label {
    display: block;
    line-height: 80px;
    margin: 15px 24px;
    background: #fff;
    border-radius: 35px;
    padding: 0 25px;
  }

  .create_name label input {
    font-size: 32px;
    width: 100%;
  }

  .create_content {
    width: 750px;
    height: 1030px;
    background: #fff url('../../static/images/create_bj.jpg') no-repeat 0 34px;
    position: relative;
    top: -62px;
    z-index: -3;
  }

  .create_submit {
    width: 100%;
    background: #fff;
    position: relative;
    z-index:2;
    padding: 0 6% 34px 6%;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.04);
  }

  .create_score{
    width: 30%;
    text-align: center;
  }
  .create_sub_right{
    padding-top: 8px;
  }

  .create_score p:first-Child, .create_wage p:first-Child {
    font-size: 42px;
    font-weight: bold;
  }

  .create_gradient {
    height: 4px;
    width: 100%;
    background-image: -webkit-linear-gradient(left, #856932, #c0ae7a, #856932, #856932); /* Safari 5.1 - 6.0 */
    background-image: -o-linear-gradient(left, #856932, #c0ae7a, #856932, #856932); /* Opera 11.1 - 12.0 */
    background-image: -moz-linear-gradient(left, #856932, #c0ae7a, #856932, #856932); /* Firefox 3.6 - 15 */
    background-image: linear-gradient(to right, #856932, #c0ae7a, #856932, #856932); /* 标准的语法 */
  }

  /*列表页*/
  .create_list {
    /*height:1098px;*/
    background: #fff;
  }

  .create_list ul {
    margin-bottom: 140px;
  }

  .create_list li {
    border-bottom: 1px solid rgba(0,0,0,0.06);
    overflow: hidden;
  }

  /*.create_team_avatar,.create_list_role,.create_list_dec,.create_list_price,.create_list_score{
        display: inline;
    }*/

  .create_team_avatar {
    position: relative;
    /*margin:10px;*/
    height: 150px;
    overflow: hidden;

  }

  .create_team_logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 192px;
    height: 150px;
  }

  .create_team_avatar .avatar {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
  }

  .create_team_avatar:before {
    content: '';
  }

  .create_list_avatar {
    width: 192px;
  }

  .create_list_role {
    width: 40px;
    line-height: 150px;
    margin-left: 10px;
    margin-right: 15px;
    text-align: center;
  }

  .create_list_role p .icon {
    width: 100%;
    height: 40px;
    margin-bottom: -12px;
  }

  .create_list_dec {
    width: 180px;
    line-height: 150px;
    margin-right: 42px;
    margin-top: 40px;
  }

  .create_list_dec p {
    line-height: 36px;
    color: #B0B5BF;
  }

  .create_list_dec p:first-Child {
    line-height: 42px;
    font-size: 34px;
    color: #373A41;
  }

  .create_def_dec {
    width: 350px;
    line-height: 150px;
    margin-right: 18px;
  }

  .create_def_dec p {
    color: #373A41;
    font-size: 34px;
  }

  .create_list_price {
    width: 96px;
    margin-right: 42px;
    margin-top: 34px;
  }

  .create_list_price p, .create_list_score p {
    text-align: center;
    font-size: 30px;
  }

  .create_list_score {
    width: 96px;
    line-height: 150px;
  }

  .create_add_btn {
    width: 54px;
    height: 54px;
    line-height: 44px;
    color: #fff;
    background-color: #0C9DFC;
    border: 2px solid #0C9DFC;
    border-radius: 50%;
    text-align: center;
    margin: 48px auto;
  }

  .create_add_btn i {
    font-size: 24px;
  }

  /*公用颜色*/
  .light_blue {
    color: #0C9DFC;
  }

  .light_gray {
    color: #B0B5BF;
  }

  .light_yellow {
    color: #DABE9B;
  }

  .dialog_edit_header .edit {
    top: 60px;
  }

  /*input 设定*/
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #b0b0b0;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #b0b0b0;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #b0b0b0;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #b0b0b0;
  }
</style>
