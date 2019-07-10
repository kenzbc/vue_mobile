<template>
<div class="running_wrap">
    <div class="running_width"></div>
    <div class="running_now" v-bind:style=" 'width:' +running.total_score/running.max_score*100 + '%'"></div>
    <div class="running_man" v-bind:style="{ 'left': 'calc('+running.total_score/running.max_score*100+'% - 45px)' }"><p>{{running.total_score}}</p><img src="static/images/running.gif"></div>
    <div class="running_line" v-bind:style="{ 'left': 'calc('+running.pass_score/running.max_score*100+'% - 45px)' }"><img src="static/images/end.png"><p>{{running.pass_score}}</p></div>
    <p class="running_end">{{running.max_score}}</p>
</div>

</template>
<script>
export default {
    name: 'running_wrap',
    data () {
        return {
        }
    },
    props: {
        running : Object
    },
    methods:{
    },
    created(){
        //console.log(this.running)
    },
    components: {
    }
}
</script>
<style>
.running_wrap{ width:100%; height: 45px; margin: 0 auto; position: relative;}
.running_width{ width: 100%; height: 45px; background-color: #e5e5e5; transform: skew(45deg); }
.running_now{ height: 100%; background-color: #ccba87; position: absolute; left: 0; top: 0; transform: skew(45deg); }
.running_man{ position: absolute; top: -68px; z-index: 3; }
.running_man img{ display: block; width: 50px; }
.running_man p{ line-height: 34px; color: #fff; background-color: #0C9DFC; border-radius: 4px; margin-bottom: 10px; padding: 0 15px; position: relative; }
.running_man p:after{ content: ""; width: 0;height: 0;border-top: 10px solid #0C9DFC;border-left: 7px solid transparent;border-right: 7px solid transparent; position: absolute; left: 50%; bottom: -7px; margin-left: -5px; }
.running_line{ position: absolute; top: 0; z-index: 2; }
.running_line img{ display: block; height: 45px; }
.running_line p{ line-height: 34px; color: #0C9DFC; margin-top: 4px; }
.running_end{ color: #ccba86; position: absolute; right: -64px; bottom: -34px; }
</style>
