<template>
  <div class="messsage" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="100">
    <div  v-for="items in articleList">

        <div @click="linkUrl(items.object_id)"  class="messsage-first" v-if="items.picture_model==1" href="">
          <div class="messsage-first-title">
            {{items.title}}
          </div>
          <div class="messsage-first-img">
            <ul>
              <li v-for="item in items.picture_list"><img :src="item" alt=""></li>
            </ul>
          </div>
          <div class="messsage-first-message">
            <p>{{items.nickname}}</p>
            <p>{{items.view_count}}阅</p>
          </div>
        </div>

        <div @click="linkUrl(items.object_id)"  class="messsage-second" v-if="items.picture_model==2" href="">
          <div class="messsage-second-img"><img :src="items.picture_list[0]" alt=""></div>
          <div class="messsage-second-title">{{items.title}}</div>
          <div class="messsage-second-message">
            <p>{{items.nickname}}</p>
            <p>{{items.view_count}}阅</p>
          </div>
        </div>

      <div @click="linkUrl(items.object_id)" class="messsage-three" v-if="items.picture_model==0"  href="">
        <div class="messsage-three-left">
          <div class="messsage-three-title">{{items.title}}</div>
          <div class="messsage-three-message">
            <p>{{items.nickname}}</p>
            <p>{{items.view_count}}阅</p>
          </div>
        </div>
        <div class="messsage-three-right"><img :src="items.picture_list[0]" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
        articleList:[],
        busy: false,
        isAll:0,
        lastKey:''
    }
  },
  created() {

  },
  methods:{
    loadTop(){
      var _this=this;
      if(_this.isAll==0){
        this.$api('/services/fantasy/gossip_article_list.php', {
        	roomID:this.$route.query.roomID,
          limit:10,
          last_key:this.last_key
        }).then(response => {
          if(parseInt(response.data.article_list.length)<10){
            _this.isAll=1;
          }else{
            _this.last_key=response.data.article_list[9].article_id
          }
          _this.articleList=_this.articleList.concat(response.data.article_list)
          //console.log(response);
        })
      }
      //console.log(_this.lastKey)
      _this.busy=false;
    },
    loadMore(){
        this.busy=true;
      setTimeout(() => {
        this.loadTop();
      }, 1000);
    },
    linkUrl(id){
       window.open("http://www.famulei.com/p/"+id,'_blank');
    }
  }
}
</script>


<style>
  .messsage {
    background: #fff;
  }

  .messsage .messsage-first {
    padding: 30px 24px;
    border-bottom: 1px solid #EEEEEE;
  }

  .messsage .messsage-first-title {
    font-size: 30px;
    color: black;
  }

  .messsage .messsage-first-img ul {
    margin-top: 16px;
    display: flex;
    display: -webkit-flex;
  }

  .messsage .messsage-first-img ul li img {
    height: 152px;
    width: 228px;
  }

  .messsage .messsage-first-img ul li:nth-of-type(1) {
    flex: 0 0 220px;
  }

  .messsage .messsage-first-img ul li:nth-of-type(2) {
    text-align: center;
    -webkit-box-flex: 1;
    flex: 1;
  }

  .messsage .messsage-first-img ul li:nth-of-type(3) {
    flex: 0 0 220px;
  }

  .messsage .messsage-first-message {
    margin-top: 20px;
    display: flex;
    display: -webkit-flex;
  }

  .messsage .messsage-first-message p {
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 24px;
    color: #b0b0b0;
  }

  .messsage .messsage-first-message p:nth-of-type(2) {
    text-align: right;
  }

  .messsage .messsage-second {
    padding: 30px 24px;
    border-bottom: 1px solid #EEEEEE;
  }

  .messsage .messsage-second-img {
    height: 350px;
  }

  .messsage .messsage-second-img img {
    height: 350px;
    width: 700px;
  }

  .messsage .messsage-second-title {
    margin-top: 20px;
    font-size: 30px;
    color: black;
  }

  .messsage .messsage-second-message {
    margin-top: 20px;
    display: flex;
    display: -webkit-flex;
  }

  .messsage .messsage-second-message p {
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 24px;
    color: #b0b0b0;
  }

  .messsage .messsage-second-message p:nth-of-type(2) {
    text-align: right;
  }

  .messsage .messsage-three {
    padding: 30px 24px;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    display: -webkit-flex;
  }

  .messsage .messsage-three .messsage-three-title {
    font-size: 30px;
    color: black;
    height: 96px;
  }

  .messsage .messsage-three .messsage-three-left {
    -webkit-box-flex: 1;
    flex: 1;
  }

  .messsage .messsage-three .messsage-three-right {
    flex: 0 0 184px;
  }

  .messsage .messsage-three .messsage-three-right img {
    height: 144px;
    width: 184px;
  }

  .messsage .messsage-three-message {
    margin-top: 20px;
    display: flex;
    display: -webkit-flex;
  }

  .messsage .messsage-three-message p {
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 24px;
    color: #b0b0b0;
  }

  .messsage .messsage-three-message p:nth-of-type(2) {
    text-align: right;
    margin-right: 20px;
  }
</style>

