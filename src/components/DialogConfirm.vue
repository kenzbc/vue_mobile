<template>
    <div>
      <!-- 确认提示控件 -->
      <div class="toast-modal">
        <div class="modal-bg"></div>

        <div class="modal-content">

          <div class="title">{{title}}
            <label class="dialog_close" @click="cancel()">
              <i class="iconfont">&#xe6ba;</i>
            </label>
          </div>
          <div class="title-line"></div>

          <div class="body">
            <div class="content">
              {{text}}
            </div>

            <footer>
              <button class="cancel" @click="cancel()">{{cancelText}}</button>
              <button class="submit" @click="submit()">{{confirmText}}</button>
            </footer>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: "DialogConfirm",
    props:{
      title:{
        type: String,
        default: '提示'
      },
      text:{
        type: String,
        default: '确认要提交操作吗？'
      },
      confirmText:{
        type: String,
        default: '确定'
      },
      cancelText:{
        type: String,
        default: '取消'
      },
    },
    data() {
      return {
        // 默认
        action: false,//默认取消
      }
    },
    methods: {
      submit() {
        this.action = true;
        this.$emit('callbackAction', this.action);
      },
      cancel() {
        this.action = false;
        this.$emit('callbackAction', this.action);
      },
    }
  }
</script>

<style lang="stylus" scoped>

  .toast-modal{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index 9999;
    display flex;
    justify-content center;
    align-items center;

    .modal-bg{
      width 100%;
      height 100%;
      background rgba(0,0,0,0.5);
      position flex;
      z-index 1;
    }
    .modal-content{
      width:540px;
      /*height:656px;*/
      background:#fff;
      border-radius:12px;
      color:#B2B0D2;
      font-size:28px;
      overflow hidden;
      position fixed;
      z-index 10;

      .title{
        width 100%;
        height 108px;
        line-height @height;
        text-align center;
        background #5348FF;
        color:#fff;
        font-size:36px;
      }
      .title-line{
        height 7px;
        margin-top:-1px;
        //background-image: radial-gradient(circle, transparent, transparent 10px, #5348FF 10px, #5348FF);
        //background-size: 20px 20px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAGCAYAAADOic7aAAAAAXNSR0IArs4c6QAAAGpJREFUGBljDPb4/5+BCoCJCmaAjcBvECPDEwYmhihOLgYpEAaxGUBiWAALFjGIEFADEw+D/urVjO+Q1CwPDf2/898XhosM/xlkkMSBduACjAxlaIaAVYLFgHLo2nAaxMnBcABdMYyPTQ4AqVoW60x2m04AAAAASUVORK5CYII=") bottom repeat-x;
      }

      .body{
        min-height 120px;
        color:#999;
        text-align:center;

        .content{
          padding: 28px;
          min-height: 180px;
          max-height: 420px;
          overflow: auto;
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }


      footer {
        width:100%;
        padding:20px;
        display flex;
        justify-content center;
        align-items center;
        bottom:10px;
      }
      button {
        width:50%;
        height:84px;
        margin 0 10px;
        margin-top:10px;
        border-radius:12px;
        color:#fff;
        font-size:28px;
      }
      button.submit{
        background:linear-gradient(137deg,#8B48FF 0%,#5348FF 100%);
        border: 1px solid transparent;
      }
      button.cancel{
        background: none;
        border: 1px solid;
        font-size: 28px;
        color: #5348ff;
      }
    }
  }


</style>
