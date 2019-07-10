<template>
  <div>
    <div class="started" v-show="startedList!=''" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
         infinite-scroll-distance="50">
      <div v-for="item in startedList">
        <div class="started-first" v-for="items in item.room_list" @click="savestatus()">
          <router-link :to="{path:'roomInfo',query:{roomID:items.roomID,orderId:items.order_id}}">
            <div class="started-first-title">
              <div class="started-first-title-left" :class="'room_color_' + items.type">
                <p v-if="items.type < 9">{{room_type[items.type]}}</p>
                <img class="member-img" v-else-if="items.type == 9"
                     :src="items.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
              </div>

              <div class="started-first-title-middle">
                <p>{{items.name}}</p>
                <p>{{items.room_desc}}</p>
              </div>
              <div class="started-first-title-right">
                <div class="started-first-title-right-earn">
                  <p><span>{{items.member_at_times}}</span>/{{items.times}}</p>
                  <p>参与次数</p>
                </div>
              </div>
            </div>
            <div class="started-first-message">
              <ul class="cl">
                <li>{{items.at_times}}/{{items.num}}</li>
                <li>
                  <svg aria-hidden="true" class="">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon_renshu"></use>
                  </svg>
                </li>
                <li>|</li>
                <li>{{items.price}}</li>
                <li>
                  <svg aria-hidden="true" class="">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                  </svg>
                </li>
              </ul>
            </div>
            <div class="started-first-cont">
              <ul>
                <li>
                  <p>{{items.rank}}</p>
                  <p>最终排名</p>
                </li>
                <li>
                  <p>{{items.total_score}}</p>
                  <p>阵容积分</p>
                </li>
                <li>
                  <p>{{items.order_prize_amount}}</p>
                  <p>获得奖金
                    <svg v-if="items.prize_type==1" aria-hidden="true" class="icon-size icon_guozi">
                      <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
                    </svg>
                    <svg v-else-if="items.prize_type==2" aria-hidden="true" class="icon-size icon_guozi">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                    </svg>
                  </p>
                </li>
              </ul>
            </div>
          </router-link>

        </div>
      </div>
      <div class="started-no-data">{{message}}</div>
    </div>
    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&startedList==''">
      <img src="../../../static/images/pic_404.png" alt="">
      <p>暂无已结束的房间</p>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import loading from '../loading.vue'
  export default {
    name: 'started',
    data () {
      return {
        startedList: [],
        room_type: ['', '新手', '活动', '日赛', '周赛', 'Solo', '名人', '毒奶', 'Solo'],
        busy: false,
        loading: false,
        isAll: 0,
        start_id: '',
        message: '暂无更多内容',
        page:'1',
      }
    },
    created() {
    },
    methods: {
      loadTop(){
        var _this = this;
        if (this.isAll == 0) {
          this.message = '加载中...';
          this.$api('/services/fantasy/get_member_room.php', {
            // start_id: this.start_id,
            page:this.page,
            status: 2,
            limit: 10,
          }).then(response => {
            if (response.code == 200) {
              _this.loading = true;
              if (response.data.list.length == 0) {
                _this.isAll = 1;
                _this.message = '暂无更多内容';
              }
              _this.startedList = _this.startedList.concat(response.data.list);
              if (response.data.list.length != 0) {
                // _this.start_id = response.data.list[response.data.list.length - 1].order_id;
                _this.page++
              }
              //新手引导
	            if(store.get('member_info').is_new_user == '1'){
		            if (store.get('new_player').indexOf('my_end') < 0) {
			            //恭喜中奖
			            store.set('new_player', store.get('new_player') + 'my_end');
			            this.$root.hub.$emit('new_player_go_Success', '1');
			            this.pushEvent(store.get('loginInfo').type, 'xinshou', '7');
			            store.set('my_status','0');
		            }
		            this.pushEvent(store.get('loginInfo').type, 'my', '2')
                }
            }

            _this.busy = false;
          })
        }
      },
      loadMore(){
      	if(this.isAll == 0){
          this.busy = true;
          setTimeout(() => {
              this.loadTop();
          }, 600);
        }
      },
      savestatus(){
        sessionStorage.setItem('status', '2')
      },
    },
    components: {
      loading
    }
  }
</script>
<style scoped lang="stylus">
  @import '../../assets/styl/started.styl';
</style>
