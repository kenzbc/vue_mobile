<template>
    <div class="anim-opacity2">
        <div class="sign_bg">
            <router-link to="/" class="sign_back_btn"></router-link>
            <div class="sign_main">
                <img src="static/images/sign_logo.png" class="sign_logo">
                <ul class="sign_reward cl">
                    <li v-for="(items,index) in sign_reward" :class="{special:index == 6 || index == 14 || index == 20 || index == 29,done:index+1<sign_day,flipInY:index+1==sign_day}">
                        <div class="sign_reward_bg">
                            <p class="sign_reward_day">{{index+1}}</p>
                            <p class="sign_reward_tickets">门票x{{items.tickets}}</p>
                            <p class="sign_reward_guozi" v-show="items.guozi">积分x{{items.guozi}}</p>
                        </div>
                        <div class="sign_reward_gou"></div>
                    </li>
                </ul>
                <p class="sign_btn">已签到<span>{{sign_day}}</span>天</p>
            </div>
            <div class="sign_bottom">
                <p><b>活动持续时间：</b><span>9月1日～9月30日</span></p>
                <p><b>活动内容：</b>活动期间，累计签到天数可领取相应的门票和积分奖励。累计签到<span>7天、15天、21天、30天</span>的时候还会有<span>额外的门票和积分奖励</span>。</p>
            </div>
        </div>
    </div>
</template>

<script>
	import Vue from "vue";
	import store from "store";
    export default {
        name: 'sign',
        data () {
            return {
	            sign_day:'',
                sign_reward:[],
	            sign_reward_num:{
		            tickets: 1,
		            guozi: 0
	            },
	            sign_reward_num7:{
		            tickets: 2,
		            guozi: 100
	            },
	            sign_reward_num15:{
		            tickets: 50,
		            guozi: 500
	            },
	            sign_reward_num21:{
		            tickets: 2,
		            guozi: 200
	            },
	            sign_reward_num30:{
		            tickets: 100,
		            guozi: 1000
	            },
            }
        },
        methods:{
            SignData(){
                for (var i = 0; i < 30; i++) {
                	if(i == 6){
		                Vue.set(this.sign_reward, i, this.sign_reward_num7);
                    }else if(i == 14){
		                Vue.set(this.sign_reward, i, this.sign_reward_num15);
	                }else if(i == 20){
		                Vue.set(this.sign_reward, i, this.sign_reward_num21);
	                }else if(i == 29){
		                Vue.set(this.sign_reward, i, this.sign_reward_num30);
	                }else{
		                Vue.set(this.sign_reward, i, this.sign_reward_num);
                    }
                }
                console.log(this.sign_reward);
	            this.sign_day = store.get('member_info').num_7;
	            // this.sign_day = 10;
            },
        },
	    mounted () {
            this.SignData();
        },
    }
</script>
<style scoped>
.sign_bg{
    background: url("../../static/images/sign_bg.png") center/cover no-repeat;
    padding: 140px 0 10px 0;
    position: relative;
}
.sign_back_btn{
    display: block;
    width: 150px;
    height: 60px;
    background: url("../../static/images/sign_back_btn.png") center/cover no-repeat;
    position: absolute;
    right: 0px;
    top: 50px;
}
.sign_main{
    width: 100%;
    height: 1100px;
    background: url("../../static/images/sign_main.png") center/cover no-repeat;
    position: relative;
}
.sign_main .sign_logo{
    width: 300px;
    position: absolute;
    left: 50%;
    top: -120px;
    margin-left: -150px;
}
.sign_main .sign_reward{
    padding: 80px 20px 30px 20px;
}
.sign_main .sign_reward li{
    overflow: hidden;
    position: relative;
    float: left;
    margin: 12px;
}
.sign_main .sign_reward li .sign_reward_bg{
    width: 118px;
    height: 118px;
    text-align: center;
    color: #fff;
    border-radius: 12px;
    background: rgba(8,164,120,1);
}
.sign_main .sign_reward li.special .sign_reward_bg{
    background: rgba(253,80,122,1);
}
.sign_main .sign_reward li.done .sign_reward_bg{
    background: rgba(8,164,120,0.3);
}
.sign_main .sign_reward li.special.done .sign_reward_bg{
    background: rgba(253,80,122,0.3);
}

.sign_main .sign_reward li .sign_reward_gou{
    width: 44px;
    height: 32px;
    background: url("../../static/images/sign_mark.png") center/cover no-repeat;
    position: absolute;
    left: 50%;
    top: 40px;
    margin-left: -22px;
    opacity: 0;
}
.sign_main .sign_reward li.done .sign_reward_gou{
    opacity: 1;
}
.sign_main .sign_reward li.done p{
    opacity: 0.3;
}
.sign_reward_day{
    line-height: 38px;
    font-weight: 700;
    font-size: 26px;
    padding-top: 20px;
}
.sign_main .sign_reward li.special .sign_reward_day{
    padding-top: 10px;
}
.sign_reward_tickets{

}
.sign_reward_guozi{

}
.sign_main .sign_btn{
    display: block;
    width: 404px;
    height: 76px;
    line-height: 72px;
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    color: #fff;
    background: url("../../static/images/sign_btn.png") center/cover no-repeat;
    margin: 0 auto;
}
.sign_main .sign_btn span{
    font-size: 40px;
    color: #75D7BB;
    padding: 0 18px;
}
.sign_bottom{
    padding: 25px 30px;
}
.sign_bottom p{
    line-height: 38px;
    font-size: 24px;
    color: #75D7BB;
}
.sign_bottom p span{
    font-size: 24px;
    color: #fff;
}
.sign_bottom p b{
    font-size: 24px;
}
.sign_main .sign_reward li.flipInY .sign_reward_bg{
    animation: signed_item 1.5s;
    -moz-animation: signed_item 1.5s;  /* Firefox */
    -webkit-animation: signed_item 1.5s;  /* Safari 和 Chrome */
    -o-animation: signed_item 1.5s;
    animation-fill-mode:forwards;
}
.sign_main .sign_reward li.flipInY .sign_reward_gou{
    animation: signed_pic 2s;
    -moz-animation: signed_pic 2s;  /* Firefox */
    -webkit-animation: signed_pic 2s;  /* Safari 和 Chrome */
    -o-animation: signed_pic 2s;
    animation-fill-mode:forwards;
}
</style>
