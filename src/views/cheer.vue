<template>
    <div class="anim-opacity2">
        <div class="cheer_bg">
            <router-link to="/" class="cheer_back"></router-link>
            <div class="cheer_main">
                <div class="cheer_sp">
                    <p class="cheer_btn cheer_btn_ab" @click="CheerBtn()" v-if="parseInt(cheer_data.sign) >= 15 && parseInt(cheer_data.finish_fantasy) >= 50 && parseInt(cheer_data.share_lineup) >= 15"></p>
                    <p class="cheer_btn" v-else></p>
                    <div class="cheer_sp_complet" v-show="cheer_data.is_receive == '1'"></div>
                </div>
                <div class="cheer_step_1">
                    <ul class="cheer_num fll">
                        <li v-for="(items,index) in cheer_step_1" :key="index">
                            <p class="cheer_time">{{items.cheer_time}}</p>
                            <p class="cheer_prise">{{items.cheer_prise}}</p>
                            <div class="cheer_step_shadow" v-show="parseInt(items.cheer_time) <= parseInt(cheer_data.sign)"></div>
                        </li>
                    </ul>
                    <div class="cheer_info flr">
                        <p class="cheer_obj">目标：15天</p>
                        <p class="cheer_done">已签到<span>{{cheer_data.sign}}</span>天</p>
                        <p class="cheer_step_btn" @click="CheerSignBtn()" v-if="cheer_data.today_is_sign == '0'">签到</p>
                        <p class="cheer_step_btn cheer_step_btn_today" v-else>已签到</p>
                    </div>
                </div>
                <div class="cheer_step_2">
                    <ul class="cheer_num fll">
                        <li v-for="(items,index) in cheer_step_2" :key="index">
                            <p class="cheer_time">{{items.cheer_time}}</p>
                            <p class="cheer_prise">{{items.cheer_prise}}</p>
                            <div class="cheer_step_shadow" v-show="parseInt(items.cheer_time) <= parseInt(cheer_data.finish_fantasy)"></div>
                        </li>
                    </ul>
                    <div class="cheer_info flr">
                        <p class="cheer_obj">目标：50场</p>
                        <p class="cheer_done">已参与<span>{{cheer_data.finish_fantasy}}</span>场</p>
                        <p class="cheer_step_btn" @click="CheerFinishBtn()" v-if="cheer_data.today_is_finish_fantasy == '0'">去参与</p>
                        <p class="cheer_step_btn cheer_step_btn_today" v-else>已参与</p>
                    </div>
                </div>
                <div class="cheer_step_3">
                    <ul class="cheer_num fll">
                        <li v-for="(items,index) in cheer_step_3" :key="index">
                            <p class="cheer_time">{{items.cheer_time}}</p>
                            <p class="cheer_prise">{{items.cheer_prise}}</p>
                            <div class="cheer_step_shadow" v-show="parseInt(items.cheer_time) <= parseInt(cheer_data.share_lineup)"></div>
                        </li>
                    </ul>
                    <div class="cheer_info flr">
                        <p class="cheer_obj">目标：15天</p>
                        <p class="cheer_done">已分享<span>{{cheer_data.share_lineup}}</span>天</p>
                        <p class="cheer_step_btn" @click="CheerShareBtn()" v-if="cheer_data.today_is_share_lineup == '0'">去分享</p>
                        <p class="cheer_step_btn cheer_step_btn_today" v-else>已分享</p>
                    </div>
                </div>
            </div>

            <div class="cheer_bottom">
                <div class="cheer_rule"></div>
                <h2>【活动持续时间】</h2>
                <p>10月10日～11月3日（小组赛阶段到总决赛）</p>
                <h2>【活动内容】</h2>
                <p>活动期间通过分别完成，<span>签到、参与、分享</span>三组任务获取奖励，<span>完成全部任务的玩家还将获得额外特别奖励</span>。</p>

                <div class="cheer_rule_task cl">
                    <a href="javascript:" class="fll">任务1</a>
                    <p>累积签到，活动期间累积签到幻联赛<span>1/3/5/7/10/15天</span>，可以获得门票和积分奖励。</p>
                </div>
                <div class="cheer_rule_task cl">
                    <a href="javascript:" class="fll">任务2</a>
                    <p>参与比赛，活动期间累积参与任意幻联赛房间比赛<span>1/5/10/20/30/50次</span>，可以获得门票和积分奖励。</p>
                </div>
                <div class="cheer_rule_task cl">
                    <a href="javascript:" class="fll">任务3</a>
                    <p>分享阵容，活动期间累积分享幻联赛阵容（每天1次机会）<span>1/3/5/7/10/15天</span>，可以获得门票和积分奖励。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import Vue from "vue";
	import store from "store";
    export default {
        name: 'cheer',
        data () {
            return {
            	cheer_step_1:[
		            {
			            cheer_time:'1',
			            cheer_prise:'1门票',
		            },
		            {
			            cheer_time:'3',
			            cheer_prise:'10积分',
		            },
		            {
			            cheer_time:'5',
			            cheer_prise:'2门票',
		            },
		            {
			            cheer_time:'7',
			            cheer_prise:'20积分',
		            },
		            {
			            cheer_time:'10',
			            cheer_prise:'5门票',
		            },
		            {
			            cheer_time:'15',
			            cheer_prise:'50积分',
		            },
                ],
	            cheer_step_2:[
		            {
			            cheer_time:'1',
			            cheer_prise:'1门票',
		            },
		            {
			            cheer_time:'5',
			            cheer_prise:'10积分',
		            },
		            {
			            cheer_time:'10',
			            cheer_prise:'2门票',
		            },
		            {
			            cheer_time:'20',
			            cheer_prise:'20积分',
		            },
		            {
			            cheer_time:'30',
			            cheer_prise:'5门票',
		            },
		            {
			            cheer_time:'50',
			            cheer_prise:'50积分',
		            },
	            ],
	            cheer_step_3:[
		            {
			            cheer_time:'1',
			            cheer_prise:'1门票',
		            },
		            {
			            cheer_time:'3',
			            cheer_prise:'10积分',
		            },
		            {
			            cheer_time:'5',
			            cheer_prise:'2门票',
		            },
		            {
			            cheer_time:'7',
			            cheer_prise:'20积分',
		            },
		            {
			            cheer_time:'10',
			            cheer_prise:'5门票',
		            },
		            {
			            cheer_time:'15',
			            cheer_prise:'50积分',
		            },
	            ],
                cheer_data:{

                },
            }
        },
        methods:{
            CheerData(){
	            this.$api("/services/qw/get_s8_reward.php", {}).then(response => {
                    if(response.code == '200'){
                        this.cheer_data = response.data;
                    }else{
	                    alert(response.message);
                    }
	            });
	            this.pushEvent(store.get('loginInfo').type, 'cheer', '');
            },
	        CheerBtn(){
		        this.$api("/services/qw/s8_reward.php", {}).then(response => {
			        if(response.code == '200'){
			        	this.cheer_data.is_receive = '1'
			        }else{
			        	alert(response.message);
                    }
		        })
            },
	        CheerSignBtn(){
		        this.$api("/services/qw/s8_sign.php", {}).then(response => {
			        if(response.code == '200'){
				        this.cheer_data.today_is_sign = '1';
				        this.cheer_data.sign = response.data.num;
			        }else{
				        alert(response.message);
			        }
		        })
            },
	        CheerFinishBtn(){
		        this.$router.push({
			        path: "/home"
		        });
	        },
	        CheerShareBtn(){
		        this.$router.push({
			        path: "/my"
		        });

                //services/task/share_task_finish.php 参数是task_name=share_lineup
                // 分享测试
                // this.$api("/services/task/share_task_finish.php", {
			     //    task_name:'share_lineup'
                // }).then(response => {
			     //    if(response.code == '200'){
			     //    	alert('测试分享成功')
			     //    }
                // })
	        }
        },
	    mounted () {
            this.CheerData();
        },
    }
</script>
<style scoped>
.cheer_bg{
    background: #14193A url("../../static/images/cheer_bg.jpg") center top no-repeat;
    background-size: contain;
    position: relative;
}
.cheer_main{
    padding: 540px 28px 0px 28px;
}
.cheer_back{
    display: block;
    width: 154px;
    height: 72px;
    background: url("../../static/images/cheer_back.png") center/cover no-repeat;
    position: absolute;
    right: 0px;
    top: 50px;
}
.cheer_sp{
    width: 694px;
    height: 221px;
    background: url("../../static/images/cheer_sp.png") center/cover no-repeat;
    position: relative;
    margin-bottom: 48px;
}
.cheer_sp_complet{
    width: 100%;
    height: 100%;
    background: url("../../static/images/cheer_sp_complet.png") center/cover no-repeat;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 3;
}
.cheer_btn{
    width: 116px;
    height: 76px;
    background: url("../../static/images/cheer_btn.png") center/cover no-repeat;
    position: absolute;
    right: 18px;
    top: 80px;
    z-index: 2;
    opacity: 0.7;
}
.cheer_btn.cheer_btn_ab{
    opacity: 1;
}
.cheer_step_1{
    width: 694px;
    height: 248px;
    background: url("../../static/images/cheer_step_1.png") center/cover no-repeat;
    margin-bottom: 48px;
}
.cheer_step_2{
    width: 694px;
    height: 248px;
    background: url("../../static/images/cheer_step_2.png") center/cover no-repeat;
    margin-bottom: 48px;
}
.cheer_step_3{
    width: 694px;
    height: 248px;
    background: url("../../static/images/cheer_step_3.png") center/cover no-repeat;
    margin-bottom: 48px;
}
.cheer_num{
    width: 450px;
    padding: 52px 0px 0 20px;
}
.cheer_num li{
    width: 132px;
    height: 84px;
    background: #212C76;
    position: relative;
    padding-top: 4px;
    margin: 0 10px 10px 0;
    float: left;
}
.cheer_num li.special{
    background: #3242A9;
}
.cheer_step_shadow{
    width: 100%;
    height: 100%;
    background: url("../../static/images/cheer_complet.png") center/cover no-repeat;
    position: absolute;
    left: 0;
    top: 0;
}
.cheer_num li p{
    text-align: center;
}
.cheer_time{
    line-height: 40px;
    font-size: 28px;
    color: #fff;
}
.cheer_prise{
    line-height: 32px;
    color: #70A0DF;
}
.cheer_info{
    width: 240px;
    text-align: center;
    color: #fff;
    padding-top: 54px;
}
.cheer_obj{
    line-height: 34px;
    font-size: 24px;
    color: #70A0DF;
}
.cheer_done{
    line-height: 40px;
    font-size: 28px;
    color: #fff;
    margin-bottom: 30px;
}
.cheer_done span{
    font-size: 28px;
    color: #43E9F5;
}
.cheer_step_btn{
    width: 120px;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    color: #fff;
    background: #4390F5;
    border-radius: 6px;
    margin: 0 auto;
}
.cheer_step_btn_today{
    opacity: 0.3;
}

.cheer_bottom{
    background: #14193A url("../../static/images/cheer_bottom.jpg") center/cover no-repeat;
    padding: 0 28px 20px 28px;
}
.cheer_rule{
    width: 694px;
    height: 50px;
    background: url("../../static/images/cheer_rule.png") center/cover no-repeat;
    margin-bottom: 25px;
}
.cheer_bottom h2{
    line-height: 34px;
    font-size: 24px;
    font-weight: normal;
    color: #43E9F5;
    margin-left: -6px;
    margin-bottom: 8px;
}
.cheer_bottom p{
    line-height: 34px;
    font-size: 24px;
    color: #70A0DF;
    margin-bottom: 38px;
}
.cheer_bottom p span{
    font-size: 24px;
    color: #fff;
}
.cheer_bottom p b{
    font-size: 24px;
}
.cheer_rule_task a{
    line-height: 34px;
    font-size: 24px;
    color: #14193A;
    background: #43E9F5;
    border-radius: 3px;
    padding: 4px 6px;
    margin: 20px 28px 10px 0;
}
</style>
