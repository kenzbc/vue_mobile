<template>
  <div class="dialog search_dialog">
    <div class="dialog_bj" @touchmove.prevent></div>
    <div class="dialog_search_win dialog_container">
      <div class="dialog_header">
        领取奖励
      </div>
      <div class="dialog_content dialog_search_content">
        <section v-if="!isAwardsEd">
          <ul class="dialog_search_list dialog_awards_list cl">
            <li>
              <p class="dialog_search_name">积分<span></span></p>
              <p class="dialog_search_num">{{awardsData.guozi ? awardsData.guozi : '0'}}</p>
            </li>
            <li>
              <p class="dialog_search_name">门票</p>
              <p class="dialog_search_num">{{awardsData.ticket ? awardsData.ticket : '0'}}</p>
            </li>
          </ul>
        </section>
        <section v-else>
          <p>你已领取过新手奖励</p>
        </section>
      </div>
      <div class="dialog_footer">
        <p @click="dialogAwardsBtn()" class="mpm_btn active dialog_btn_full">开始幻联赛之旅</p>
      </div>
    </div>
  </div>
</template>
<script>
  import store from "store";
  export default {
    name: 'dialog-awards',
    data () {
      return {
        guoziIcon: this.$store.state.guoziIcon,
        awardsData: '',
        isAwardsEd: false  //是否领取过奖励  true: 领取过  false: 未领取过
      }
    },
    created(){

    },
    methods: {
      getAwards () {  //获取新手奖励接口
        var _this = this;
        this.$api('/services/task/share_task_finish.php', {
          task_name:'into_fantasy',
          appid: store.get('loginInfo').type,
        }).then(response => {
        	if (response.code == 200) {
        		if (response.data.length != 0 ){
              _this.awardsData = {
                ticket: response.task_data.guozi_auto_get[0].ticket,
                guozi: response.task_data.guozi_auto_get[0].total_num,
              };
              // 将奖励添加至个人登录信息
              var member_info = store.get('member_info');
              member_info.guozi = (parseInt(member_info.guozi) + parseInt(this.awardsData.guozi)).toString();
              member_info.ticketCount = (parseInt(member_info.ticketCount) + parseInt(this.awardsData.ticket)).toString();
              store.set('member_info',member_info);
            } else {
              _this.isAwardsEd = true;
            }
          }
        })
      },
      dialogAwardsBtn (){
        this.$emit('dialogHide', false);
        this.$router.push({
          path: "/",
        });
      }
    },
    mounted () {
      this.getAwards();
    },
  }
</script>
<style>
.dialog_awards_list{
  padding-left: 25%;
}
</style>
