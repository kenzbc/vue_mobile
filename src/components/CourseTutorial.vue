<template>
  <div title="新手教程">

    <!--新手引导弹层-教程-->
    <div v-if="courseStep=='1-1'" @click="setStep('1-2')" class="tutorial1-1">
      <div class="content">
        <div class="logo"><img src="../assets/image/tutorial/logo@2x.png" ></div>
        <div class="desc">
          <img src="../assets/image/tutorial/1@2x.png" >
          <span class="text">选择和真实比赛相对应的房间</span>
        </div>
        <div class="desc">
          <img src="../assets/image/tutorial/2@2x.png" >
          <span class="text">挑选5位选手组成梦之队</span>
        </div>
        <div class="desc">
          <img src="../assets/image/tutorial/3@2x.png" >
          <span class="text">等待现实比赛开始</span>
        </div>
        <div class="desc">
          <img src="../assets/image/tutorial/4@2x.png" >
          <span class="text">总分排名靠前获得奖励</span>
        </div>

        <div class="table-info">
          <div class="title">
            <span style="color:#A8A6FF;">积分规则</span>
            <span>单位：分</span>
          </div>
          <table class="tutorial-table" cellpadding="0" cellspacing="0">
            <tr style="color:#A8A6FF;text-align:center;">
              <td>击杀</td>
              <td>死亡</td>
              <td>助攻</td>
              <td>分均输出</td>
              <td>分均承伤</td>
              <td>分均插/排眼</td>
            </tr>
            <tr style="height:36px;text-align:center;">
              <td>2</td>
              <td>-1</td>
              <td>1</td>
              <td>0.02</td>
              <td>0.016</td>
              <td>8</td>
            </tr>
          </table>

        </div>
        <div class="next-btn">下一步</div>
      </div>
    </div>

    <!--新手引导弹层-->
    <div v-if="courseStep == '1-2'" @click="setStep('1-3')" class="tutorial1-2">
      <div class="content">
        <div class="text">新人经理可用【一键选人】无需纠结！</div>
        <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        <div class="next-btn">下一步</div>
      </div>
    </div>





    <!--新手引导弹层2-->
    <div v-if="courseStep == '2'" @click="" class="tutorial2">
      <div class="content">

        <div class="submit-btn">提交阵容</div>
        <div class="submit-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text">点击【提交阵容】<br>看比赛赢奖励</div>
        </div>


        <div class="player">
          <div class="text">点击选手头像<br>可以查看他的详细数据</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>

        <div style="width:calc(100% - 56px);position:absolute;bottom:500px;box-shadow:none;" class="battle-array-list-box">
          <div class="content">
            <div class="item avatar">
              <img class="bg" src="../assets/image/txBg2@2x.png" alt="">
              <img class="photo" src="../assets/image/tx.png" alt="">
            </div>
            <div class="item team-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-SUPx"></use>
              </svg>
            </div>
            <div class="item team">
              <span>957</span>
              <span>TOP-WE</span>
            </div>
            <div class="item money">
              <span>¥32</span>
            </div>
            <div class="item score">
              <span>34.8</span>
            </div>
            <div class="item icon-label">
              <span>主力</span>
            </div>
          </div>
        </div>


      </div>
    </div>

    <!--新手引导弹层3-->
    <div v-if="courseStep == '3'" class="toast-modal">
      <div class="modal-bg"></div>
      <div class="modal-content">
        <div class="title">阵容提交</div>
        <div class="title-line"></div>
        <div class="price"><span>参与单价</span><span>20 <i class="iconfont">&#xe6f7;</i></span></div>
        <div class="change-num">
          <div class="reduce"><img src="../assets/image/icon_40_reduce@2x.png"></div>
          <div class="num"><span>5</span> / 5</div>
          <div class="add"><img src="../assets/image/icon_40_add@2x.png"></div>
        </div>
        <div class="price"><span>我的门票</span><span>3212 <i class="iconfont">&#xe6f7;</i></span></div>
        <div class="price"><span>本次消耗</span><span>100 <i class="iconfont">&#xe6f7;</i></span></div>
        <button class="button">确认提交</button>
      </div>
    </div>
    <div v-if="courseStep == '3'" @click="" class="tutorial3">
      <div class="content">
        <div class="submit-btn">确认提交</div>
        <div class="submit-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text">【确认提交】，完成布阵！</div>
        </div>
      </div>
    </div>

    <!--新手引导弹层4-->
    <div class="success-page" style="z-index:999;">
      <div class="head-info">
        <div class="tab-item">
          <span class="num">¥</span>
          <span class="title">阵容身价</span>
        </div>
        <div class="tab-item">
          <figure><img src="../assets/image/goodsPhoto@2x.jpg" width="120" height="120"></figure>
        </div>
        <div class="tab-item">
          <span class="num">168.1</span>
          <span class="title">阵容得分</span>
        </div>
      </div>

      <div style="padding:28px;margin-top:370px;">
        <div class="room-list-box">
          <div class="head">
            <img src="../assets/image/icon_60_five-pointed-star@2x.png" alt="">
            <div class="title">
              <span>周三LPL最高2000积分</span>
              <span>前800名有奖，最高2000积分</span>
            </div>

          </div>
          <div class="content">
            <div class="item"><span>比赛开始时间</span><span>2018年08月17日 17:00</span></div>
            <div class="item"><span>最高可获得奖励</span><span>20000</span></div>
          </div>


          <!--阵容-->
          <div class="battle-array">
            <div class="average-score">

            </div>
            <div class="team">
              <div class="item">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-TOPx"></use>
                  </svg> &nbsp;TOP
                </div>
                <div class="photo">
                  <span class="bg"><img src="../assets/image/teamInfoBg.png" ></span>
                  <span class="avatar"><img src="../assets/image/tx.png" ></span>
                  <span class="score">30.5</span>
                </div>
                <div>957</div>
                <div>WE</div>
              </div>
              <div class="item">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-JUGx"></use>
                  </svg> &nbsp;JUG
                </div>
                <div class="photo">
                  <span class="bg"><img src="../assets/image/teamInfoBg.png" ></span>
                  <span class="avatar"><img src="../assets/image/tx.png" ></span>
                  <span class="score">30.5</span>
                </div>
                <div>Condi</div>
                <div>WE</div>
              </div>
              <div class="item">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-MIDx"></use>
                  </svg> &nbsp;MID
                </div>
                <div class="photo">
                  <span class="bg"><img src="../assets/image/teamInfoBg.png" ></span>
                  <span class="avatar"><img src="../assets/image/tx.png" ></span>
                  <span class="score">30.5</span>
                </div>
                <div>Xiye</div>
                <div>WE</div>
              </div>
              <div class="item">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ADCx"></use>
                  </svg> &nbsp;ADC
                </div>
                <div class="photo">
                  <span class="bg"><img src="../assets/image/teamInfoBg.png" ></span>
                  <span class="avatar"><img src="../assets/image/tx.png" ></span>
                  <span class="score">30.5</span>
                </div>
                <div>Mystic</div>
                <div>WE</div>
              </div>
              <div class="item">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-SUPx"></use>
                  </svg> &nbsp;SUP
                </div>
                <div class="photo">
                  <span class="bg"><img src="../assets/image/teamInfoBg.png" ></span>
                  <span class="avatar"><img src="../assets/image/tx.png" ></span>
                  <span class="score">30.5</span>
                </div>
                <div>Ben</div>
                <div>WE</div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="footer-button">
        <button class="button">进入房间</button>
        <button class="button">返回大厅</button>
        <button class="button active">快速加入更多</button>
      </div>
    </div>
    <div v-if="courseStep == '4'" @click="" class="tutorial4">
      <div class="content">

        <div class="desc-text">
          <div class="text">到时见，看比赛，为你的队员加油！</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="time">
            <span>比赛开始时间</span>
            <span>2018年08月17日 17:00</span>
          </div>
        </div>

      </div>
    </div>








    <!--新手引导弹层，tabbar我的比赛-->
    <div v-if="courseStep=='6'" @click="courseStep='8'" class="tutorial2-1">
      <div class="content">
        <div class="desc-text">
          <div class="text">点击【我的比赛】<br>查看刚参与的比赛</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>
        <div class="footer-icon">
          <i class="iconfont active">&#xe645;</i>
          <span>我的比赛</span>
        </div>
      </div>
    </div>
    <!--新手引导弹层，tabbar商城-->
    <div v-if="courseStep=='8'" @click="courseSuccess" class="tutorial3">
      <div class="content">
        <div class="desc-text">
          <div class="text">那么赶紧去【商城】看看有什么可以兑换吧。</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
        </div>
        <div class="footer-icon">
          <i class="iconfont active">&#xe64a;</i>
          <span>商城</span>
        </div>
      </div>
    </div>
    <!--新手引导弹层，快速加入-->
    <div style="display:none;" class="tutorial-fastJoin">
      <div class="content">

        <div class="quick-join">
          <img src="../assets/image/quick-join@2x.png"/>
        </div>

        <div class="desc-text">
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="text">房间太多看花眼？ 点【快速加入】试试吧</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CourseTutorial",
    props:{
      step:{
        type: String,
        default: '1-1',
      }
    },
    data(){
      return{
        isFinish:false,
        courseStep:'1-1',
      }
    },
    mounted(){
      console.log('this.step='+this.step);
      this.courseStep = this.step;
    },
    methods:{
      setStep(step){
        this.courseStep = step;
        if(step == '1-2'){
          this.$router.push({path:'/selected', query: {}});
        }


      },
      courseSuccess(){
        this.isFinish = true;
        this.$emit('callbackStatus', this.isFinish);
      },
    },
  }
</script>

<style lang="stylus" scoped>


  /* 新手引导 */
  .tutorial1-1{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;position:absolute;z-index:2;

      .logo{
        text-align:center;margin:0 auto;
      }
      .desc{
        width:600px;height:90px;
        display:flex;justify-content:flex-start;flex-wrap:wrap;align-items:center;
        margin:0 auto;

        .text{
          margin-left:30px;font-size:36px;font-weight:bold;color:#fff;
        }
      }
    }

    .table-info{
      width:642px;height:150px;padding:20px;background:#2C29AF;margin:0 auto;margin-top:38px;

      .title{
        display:flex;justify-content: space-between;align-items: center;color: #fff;
      }

      .tutorial-table{
        width:100%;height:36px;background:#1B1987;color:#fff;
        margin-top:10px;

        td {
          padding:4px 8px;
          border: 1px solid #2625a5;
        }
      }

    }
    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

  }


  /* 新手引导 */
  .tutorial1-2{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;height:100%;position:relative;z-index:2;
      .text{
        font-size:32px;font-weight:bold;color:#fff;text-align:center;
        position: absolute;
        bottom: 170px;
        left: 50%;
        width: 100%;
        margin-left: -365px;
      }
      .icon{
        height:60px;text-align:center;margin:0 auto;
        position: absolute;
        bottom: 100px;
        left: 50%;
        width: 100%;
        margin-left: -365px;
        i {
          color:#5348FF;font-size:28px;
        }
      }
      .next-btn{
        width: 200px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #fff;
        color: #5348FF;
        font-size: 24px;
        margin: 0 auto;
        margin-top: 40px;
        border-radius: 12px;
        position: absolute;
        z-index: 100;
        bottom: 52px;
        left: 50%;
        margin-left: -100px;
      }

    }

  }



  /* 新手引导 */
  .tutorial2{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;height:100%;position:relative;z-index:2;

      .player{
        width: 100%;
        position: absolute;
        left:30px;
        bottom: 650px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width:100%;height:60px;margin-left:60px;
          i {
            color:#5348FF;font-size:28px;
          }
        }
      }


      .submit-text{
        position: absolute;
        right:0px;
        top: 120px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width: 100%;
          height: 40px;
          margin-left: 110px;
          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }

      .submit-btn{
        width: 180px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        background: linear-gradient(137deg, #8b48ff 0%, #5348ff 100%);
        box-shadow: 0px 8px 12px -4px rgba(83,72,255,0.5);
        border-radius: 12px;
        color: #fff;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        position: absolute;
        right: 40px;
        top: 34px;
      }

    }




  }
  /* 新手引导 */
  .tutorial3{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);
    display flex;flex-wrap:wrap;justify-content center;align-items center;


    .content{
      width: 100%;
      height: 190px;
      position: relative;
      z-index: 2;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-end;
      padding-top: 450px;


      .submit-text{

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }

      .submit-btn{
        width: 448px;
        height: 84px;
        line-height: 84px;
        background: linear-gradient(137deg, #8b48ff 0%, #5348ff 100%);
        box-shadow: 0px 8px 12px -4px rgba(83,72,255,0.5);
        border-radius: 12px;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #fff;
        text-align: center;
      }

    }




  }


  /* 新手引导 */
  .tutorial4{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);
    display flex;flex-wrap:wrap;justify-content center;


    .content{
      width: 100%;
      height: 560px;
      position: relative;
      z-index: 2;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-end;
      margin-top: 385px;


      .desc-text{
        width 660px;
        position:absolute;
        top:30px;

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          margin-left: 30%;

          i {
            display inline-block;
            //transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
        .time{
          width:654px;height:50px;background:#fff;
          padding:0 20px;
          display flex;justify-content space-between;align-items center;

          span:first-child{
            width: 144px;
            height: 34px;
            font-size: 24px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #b2b0d2;
            line-height: 34px;
          }
          span:last-child{
            width: 284px;
            height: 40px;
            font-size: 28px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #5348ff;
            line-height: 40px;
          }
        }
      }

      .submit-btn{
        width: 448px;
        height: 84px;
        line-height: 84px;
        background: linear-gradient(137deg, #8b48ff 0%, #5348ff 100%);
        box-shadow: 0px 8px 12px -4px rgba(83,72,255,0.5);
        border-radius: 12px;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #fff;
        text-align: center;
      }

    }

  }


  /* 新手引导 */
  .tutorial5{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;height:100%;position:relative;z-index:2;

      .head-info{
        height:140px;
        padding:0 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background none;

        .tab-item{
          flex-shrink: 0;
          display: block;
          width: 190px;
          padding: 28px;
          /* height: 40px; */
          line-height: 20px;
          text-align: center;
          color: #b2b0d2;
          position: relative

          span{
            display block;
            text-align center;
            color:#5B579A;
          }
          span.red{
            color:#EF1B5A;
          }
          .num{
            font-size:36px;
            color:#5B579A;
            font-weight bold;
          }

          .title{
            margin-top: 20px;
            font-size: 22px;
            color:#B2B0D2;
            font-weight bold;
          }

          .button{
            width:180px;
            height:72px;
            line-height @height;
            background:linear-gradient(137deg,rgba(139,72,255,1) 0%,rgba(83,72,255,1) 100%);
            box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
            border-radius:12px;
            color:#fff;
            font-size:28px;
            font-weight bold;
          }


        }

      }



      .player{
        width: 100%;
        position: absolute;
        left:30px;
        bottom: 650px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width:100%;height:60px;margin-left: 160px
          i {
            color:#5348FF;font-size:28px;
          }
        }
      }


      .submit-text{
        position: absolute;
        left: 250px;
        top: 140px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width: 100%;
          height: 40px;
          margin-left: 110px;
          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }

      .submit-btn{
        width: 180px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        background: linear-gradient(137deg, #8b48ff 0%, #5348ff 100%);
        box-shadow: 0px 8px 12px -4px rgba(83,72,255,0.5);
        border-radius: 12px;
        color: #fff;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        position: absolute;
        right: 40px;
        top: 34px;
      }

    }




  }











  /* 新手引导 */
  .tutorial2-1{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;position:absolute;z-index:2;bottom:0;

      .desc-text{
        width 400px;
        margin-left:calc(100% / 4 - 105px);

        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            //transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }

      .footer-icon{
        width: calc(100% / 4);
        margin-left:calc(100% / 4);
        height:98px;
        background: #fff;
        color: #5348FF;
        display: flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;

        i{
          font-size:48px;
        }

        span{
          width 100%;
          display block;
          text-align center;
        }
      }
    }


  }

  /* 新手引导 */
  .tutorial-fastJoin{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{

      .quick-join{
        text-align center;
        margin-top: 310px;
      }
      .desc-text{
        .text{
          width: 100%;font-size:32px;font-weight:bold;color:#fff;text-align center;
        }
        .icon{
          width: 100%;
          height: 40px;
          text-align center;

          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }


    }


  }



</style>
