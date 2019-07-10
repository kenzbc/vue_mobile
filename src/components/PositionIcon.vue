<template>
    <div>
      <svg v-if="position == 'TOP'" v-bind:style="svgStyle" class="icon" aria-hidden="true"><use xlink:href="#icon-TOPx"></use></svg>
      <svg v-else-if="position == 'MID'" v-bind:style="svgStyle" class="icon" aria-hidden="true"><use xlink:href="#icon-MIDx"></use></svg>
      <svg v-else-if="position == 'ADC'" v-bind:style="svgStyle" class="icon" aria-hidden="true"><use xlink:href="#icon-ADCx"></use></svg>
      <svg v-else-if="position == 'JUG'" v-bind:style="svgStyle" class="icon" aria-hidden="true"><use xlink:href="#icon-JUGx"></use></svg>
      <svg v-else-if="position == 'SUP'" v-bind:style="svgStyle" class="icon" aria-hidden="true"><use xlink:href="#icon-SUPx"></use></svg>
    </div>
</template>

<script>
  export default {
    name: "PositionIcon",
    props:{
      position:{
        type: String,
        default: 'TOP',
      },
      width:{
        type: String,
        default:'30',
      },
      height:{
        type: String,
        default:'30',
      },
    },
    data() {
      return {
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

</style>
