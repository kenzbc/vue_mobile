<template>
  <div>

  <keep-alive include="CanyonList">
    <div class="list-box">

      <div v-show="listData!=''" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
           infinite-scroll-distance="50">
      <router-link v-for="item,index in listData" :to="{path:'/CanyonListDetail',query: {phase_time:item.phase_time}}">
      <div class="list" :class="{'active':item.reward_guozi > 0}">
        <div class="list-left-item">
          <span class="phase">第{{item.phase_number}}期</span>
          <span class="date">{{item.add_time}}</span>
          <div class="award" style="display: none">加奖{{item.award}}%</div>
          <div class="award-triangle" style="display: none"><div class="dot"></div></div>
        </div>
        <div class="list-right-item">
          <span class="gain"><span class="mr10" style="color:#ec225d;">{{item.reward_guozi}}</span> 获得 <img src="../assets/image/jinbi_icon@2x.png"></span>
          <span class="participation"><span class="mr10" style="color:#dfddff">{{item.ticket}}</span> 参与 <img src="../assets/image/icon_12_fruit@2x.png"></span>
        </div>
      </div>
      </router-link>
      </div>

    </div>



    <div class="started-null" v-show="listData==''">
      <img src="../../static/images/pic_404.png" alt="">
      <p>暂无进行中的的房间</p>
    </div>


  </keep-alive>


    <loading v-show="loading==false"></loading>
  </div>
</template>

<script>
  import loading from '../components/loading.vue';
    export default {
      name: "CanyonList",
      components: {
        loading,
      },
      data: function (){
        return {
          loading:false,
          data:[
            {id:'82374234',phase:399,date:'06-07 17:52',award:32,gain:8,participation:1700},
            {id:'25353442',phase:398,date:'06-07 17:52',award:0,gain:0,participation:1050},
            {id:'17956864',phase:397,date:'06-07 17:52',award:32,gain:8,participation:1300},
            {id:'17854643',phase:396,date:'06-07 17:52',award:0,gain:89,participation:1050},
            {id:'46754327',phase:395,date:'06-07 17:52',award:32,gain:0,participation:100},
            {id:'95443423',phase:394,date:'06-07 17:52',award:32,gain:52,participation:100},
            {id:'39546552',phase:393,date:'06-07 17:52',award:0,gain:0,participation:820},
            {id:'48633334',phase:392,date:'06-07 17:52',award:32,gain:8,participation:920},
            {id:'94523432',phase:391,date:'06-07 17:52',award:0,gain:86,participation:1010},
            {id:'98566334',phase:390,date:'06-07 17:52',award:32,gain:108,participation:1008},
            {id:'82374234',phase:389,date:'06-07 17:52',award:32,gain:8,participation:1700},
            {id:'25353442',phase:388,date:'06-07 17:52',award:0,gain:0,participation:1050},
            {id:'17956864',phase:387,date:'06-07 17:52',award:32,gain:8,participation:1300},
            {id:'17854643',phase:386,date:'06-07 17:52',award:0,gain:89,participation:1050},
            {id:'46754327',phase:385,date:'06-07 17:52',award:32,gain:0,participation:100},
            {id:'95443423',phase:384,date:'06-07 17:52',award:32,gain:52,participation:100},
            {id:'39546552',phase:383,date:'06-07 17:52',award:0,gain:0,participation:820},
            {id:'48633334',phase:382,date:'06-07 17:52',award:32,gain:8,participation:920},
            {id:'94523432',phase:381,date:'06-07 17:52',award:0,gain:86,participation:1010},
            {id:'98566334',phase:380,date:'06-07 17:52',award:32,gain:108,participation:1008},
          ],
          listData:[],
          lastPhaseTime:'',//最后一个期号
          isAll: 0,
          busy: false,
          message: '暂无更多内容',
        }
      },
      mounted(){

      },
      created(){
        console.log('CanyonList created!');
      },
      methods:{
        loadMore(){
          if(this.isAll == 0){
            this.busy = true;
            setTimeout(() => {
              this.getList();
            }, 600);
          }
        },
        getList:function () {
          let _this = this;
          this.$api('/services/canyon/log_list.php',{
              last_phase_time:this.lastPhaseTime,//上一页最后一个期号
             })
            .then(function (res) {
              if(res.code!=200){
                layer.open({content: res.message, btn: '关闭'});
                return false;
              }

              _this.loading = true;

              if (res.data.list.length == 0) {
                _this.isAll = 1;
                _this.message = '暂无更多内容';
                return false;
              }

              _this.lastPhaseTime = res.data.list[res.data.list.length -1].phase_time;

              _this.listData = _this.listData.concat(res.data.list);
              _this.busy = false;
            })
            .catch(function (error) {
              layer.open({content: '请求失败！error='+error,skin: 'msg',time: 2});
            })
        },


      },

    }
</script>

<style scoped>
  *{
    font-size: 22px;
    box-sizing: border-box;
  }
  .list-box{
    padding:20px;
    background-color:#26254b;
    position:fixed;
    width:100%;height:100%;
    overflow-y:auto;-webkit-overflow-scrolling:touch;
  }
  .body-bg{
    background-color: #26254b;
  }
  .ml10{margin-left: 10px;}
  .mr10{margin-right: 10px;}
  .list{
    height:96px;margin-top:20px;
    color:#B2B0D2;font-size:12px;
    border-radius:48px;
    background:#343367;
    overflow-y: scroll;
  }
  .list:hover,.list:active,.list:focus,.list.active{
    box-shadow:0px 6px 4px -4px rgba(239,27,90,0.5);
    border-image:linear-gradient(360deg, rgba(239,27,90,1), rgba(57,54,115,1)) 1 1;
  }

  .list-left-item{
    width:40%;float:left;padding:20px 0 0 36px;
    position:relative;
  }
  .list-left-item .phase{display:block;font-size:24px;color:#fff;}
  .list-left-item .date{display:block;font-size:18px;margin-top:10px;}
  .list-left-item .award{
    width:126px;height: 36px;
    line-height: 36px;
    border-radius:3px;
    color:#fff;
    font-size:20px;
    text-align: center;
    background: #EF1B5A;
    position:absolute;
    top:30px;left:280px;
  }
  .award-triangle{
    width: 0;
    height: 0;
    transform: rotate(-45deg);
    border-width: 12px;
    border-color: #EF1B5A transparent transparent #EF1B5A;
    border-style: solid;
    border-top-left-radius: 10px;
    position:absolute;
    top:36px;left:268px;
  }
  .dot{
    width: 8px;
    height: 8px;
    background: #343168;
    border-radius: 8px;
    position: absolute;
    top: -4px;
    left: -4px;
  }


  .list-right-item{
    width:40%;height:100%;float:right;padding:12px 32px 12px 0;margin-right:20px;display:flex;justify-content:flex-end;flex-wrap:wrap;
    background: url("../assets/image/icon_12pt_general_12_arrow_right_white@2x.png") no-repeat center right;
  }
  .list-right-item .gain{width:100%;display:inline-flex;justify-content:flex-end;align-items:center;}
  .list-right-item .participation{width:100%;display:inline-flex;justify-content:flex-end;align-items:center;}
  .list-right-item img{
    margin-left:10px;
  }

</style>
