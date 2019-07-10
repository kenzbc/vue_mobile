<template>
  <div>
    <span>
      <img v-if="type == '1'" v-bind:style="svgStyle" src="static/images/room_type_icon_t1.png">
      <img v-if="type == '2'" v-bind:style="svgStyle" src="static/images/room_type_icon_t2.png">
      <img v-if="type == '3'" v-bind:style="svgStyle" src="static/images/room_type_icon_t3.png">
      <img v-if="type == '4'" v-bind:style="svgStyle" src="static/images/room_type_icon_t4.png">
      <img v-if="type == '5'" v-bind:style="svgStyle" src="static/images/room_type_icon_t5.png">
      <img v-if="type == '6'" v-bind:style="svgStyle" src="static/images/room_type_icon_t6.png">
      <img v-if="type == '7'" v-bind:style="svgStyle" src="static/images/room_type_icon_t7.png">
      <img v-if="type == '9'" v-bind:style="svgStyle" src="static/images/room_type_icon_t9.png">
    </span>

    <span style="display:none;">
      <p v-if="type == '1'" v-bind:style="svgStyle" class="room-type">新手</p>
      <p v-if="type == '2'" v-bind:style="svgStyle" class="room-type">活动</p>
      <p v-if="type == '3'" v-bind:style="svgStyle" class="room-type">日赛</p>
      <p v-if="type == '4'" v-bind:style="svgStyle" class="room-type">周赛</p>
      <p v-if="type == '5'" v-bind:style="svgStyle" class="room-type">SOLO</p>
      <p v-if="type == '6'" v-bind:style="svgStyle" class="room-type">名人</p>
      <p v-if="type == '7'" v-bind:style="svgStyle" class="room-type">毒奶房</p>
      <p v-if="type == '9'" v-bind:style="svgStyle" class="room-type">自定义</p>
    </span>

  </div>
</template>

<script>
  export default {
    name: "RoomTypeIcon",
    props:{
      type:{
        type: String,
        default: '1',
      },
      width:{
        type: String,
        default: '90',
      },
      height:{
        type: String,
        default: '90',
      },
    },
    data() {
      return {
        typeNo:{
          t1: "新手",
          t2: "活动",
          t3: "日赛",
          t4: "周赛",
          t5: "SOLO",
          t6: "名人",
          t7: "毒奶房",
          t9: "自定义房间",
        },
        svgStyle:{
          width: this.width + 'px',
          height: this.width + 'px',
        }
      }
    },
    mounted(){

    },
    methods: {


    },
  }
</script>

<style scoped>
  .room-type{
    border-radius: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background: #ffbb2a;
    color: #fff;
  }
</style>
