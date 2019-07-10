<template>
  <div>
    <div class="start-nav">
      <div class="start-nav-left">
        <div class="start-nav-left-bg">
          <p @click="toggleButton(0)" :class="{'bg-red':bgRed==0}">显示阵容</p>
          <p @click="toggleButton(1)" :class="{'bg-red':bgRed==1}">显示房间</p>
        </div>
      </div>
      <div class="start-nav-right" v-show="bgRed==0" @click="showSquadList">
        <p v-show="flag==0">全部展开</p>
        <p v-show="flag==1">全部收起</p>
        <p :class="{'icon-zhankai1':flag==1}"><i class="iconfont all-zhankai">&#xe6d4;</i></p>
      </div>
      <div class="start-nav-right" @click="showRoomdList" v-show="bgRed==1">
        <p v-show="flag1==0">全部展开</p>
        <p v-show="flag1==1">全部收起</p>
        <p :class="{'icon-zhankai1':flag1==1}"><i class="iconfont all-zhankai">&#xe6d4;</i></p>
      </div>
    </div>
    <div class="start" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy1" infinite-scroll-distance="100"
         v-show="aquadRoom!=''">

      <!--  阵容-->
      <div class="start-squad" v-if="bgRed==0">
        <div class="squad" v-for="(items,index) in aquadRoom">
          <div class="start-squad-top" @click="showSquad(index)">
            <div class="start-squad-top-title">
              <div>参赛房间数：{{items.room_list.length}}</div>
              <div>阵容平均分：{{items.avg_score}}</div>
              <div class="down-arrow">
                <!--<p><span>编辑</span></p>-->
                <p :class="{'active-arrow':arr1[index]==1}"><i class="iconfont iconBack1">&#xe6d4;</i></p>
              </div>
            </div>
            <div class="start-squad-top-avatar">
              <ul>
                <li>
                  <div class="start-squad-leval">
                    <p>
                      <svg aria-hidden="true" class=" icon_shangdan">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink"
                             :xlink:href="leval[items.member_team[0].top.position_short_name]"></use>
                      </svg>
                    </p>
                    <p>{{items.member_team[0].top.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div v-if="items.member_team[0].top.bg2!=''" class="start-squad-avatar-bg"
                         :style="{'background':'url('+items.member_team[0].top.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.member_team[0].top.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].top.score}}</span>
                    </div>
                    <div v-else class="start-squad-avatar-bg">
                      <img :src="items.member_team[0].top.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].top.score}}</span>
                    </div>
                    <p>{{items.member_team[0].top.player_nickname}}</p>
                    <p>{{items.member_team[0].top.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval">
                    <p>
                      <svg aria-hidden="true" class=" icon_shangdan">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink"
                             :xlink:href="leval[items.member_team[0].jun.position_short_name]"></use>
                      </svg>
                    </p>
                    <p>{{items.member_team[0].jun.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div v-if="items.member_team[0].jun.bg2!=''" class="start-squad-avatar-bg"
                         :style="{'background':'url('+items.member_team[0].jun.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.member_team[0].jun.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].jun.score}}</span>
                    </div>
                    <div v-else class="start-squad-avatar-bg">
                      <img :src="items.member_team[0].jun.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].jun.score}}</span>
                    </div>
                    <p>{{items.member_team[0].jun.player_nickname}}</p>
                    <p>{{items.member_team[0].jun.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval">
                    <p>
                      <svg aria-hidden="true" class=" icon_shangdan">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink"
                             :xlink:href="leval[items.member_team[0].mid.position_short_name]"></use>
                      </svg>
                    </p>
                    <p>{{items.member_team[0].mid.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div v-if="items.member_team[0].mid.bg2!=''" class="start-squad-avatar-bg"
                         :style="{'background':'url('+items.member_team[0].mid.bg2+') center/cover no-repeat'}">
                      <img :src="items.member_team[0].mid.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].mid.score}}</span>
                    </div>
                    <div v-else class="start-squad-avatar-bg">
                      <img :src="items.member_team[0].mid.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].mid.score}}</span>
                    </div>
                    <p>{{items.member_team[0].mid.player_nickname}}</p>
                    <p>{{items.member_team[0].mid.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval">
                    <p>
                      <svg aria-hidden="true" class=" icon_shangdan">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink"
                             :xlink:href="leval[items.member_team[0].adc.position_short_name]"></use>
                      </svg>
                    </p>
                    <p>{{items.member_team[0].adc.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div v-if="items.member_team[0].adc.bg2!=''" class="start-squad-avatar-bg"
                         :style="{'background':'url('+items.member_team[0].adc.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.member_team[0].adc.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].adc.score}}</span>
                    </div>
                    <div v-else class="start-squad-avatar-bg">
                      <img :src="items.member_team[0].adc.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].adc.score}}</span>
                    </div>
                    <p>{{items.member_team[0].adc.player_nickname}}</p>
                    <p>{{items.member_team[0].adc.team_short_name}}</p>
                  </div>
                </li>
                <li>
                  <div class="start-squad-leval">
                    <p>
                      <svg aria-hidden="true" class=" icon_shangdan">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink"
                             :xlink:href="leval[items.member_team[0].sup.position_short_name]"></use>
                      </svg>
                    </p>
                    <p>{{items.member_team[0].sup.position_short_name}}</p></div>
                  <div class="start-squad-avatar">
                    <div class="start-squad-jiange"></div>
                    <div v-if="items.member_team[0].sup.bg2!=''" class="start-squad-avatar-bg"
                         :style="{'background':'url('+items.member_team[0].sup.bg2+')', 'background-size':'100% 100%'}">
                      <img :src="items.member_team[0].sup.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].sup.score}}</span>
                    </div>
                    <div v-else class="start-squad-avatar-bg">
                      <img :src="items.member_team[0].sup.player_image || '../../../static/images/unknow.png'" alt="">
                      <span></span>
                      <span>{{items.member_team[0].sup.score}}</span>
                    </div>
                    <p>{{items.member_team[0].sup.player_nickname}}</p>
                    <p>{{items.member_team[0].sup.team_short_name}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="start-squad-middle" v-show="arr1[index]==1">
            <div class="start-squad-middle-first" v-for="(roomItem,i) in items.room_list">
              <div :class="{'start-squad-middle-bg1':items.room_list.length==i+1}" class="start-squad-middle-bg"></div>
              <div class="start-squad-middle-title" @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)">
                <ul>
                  <li :class="'room_color_' + roomItem.type">
                    <p v-if="roomItem.type < 9">{{room_type[roomItem.type]}}</p>
                    <img class="member-img" v-else-if="roomItem.type == 9"
                         :src="roomItem.member_avatar || '../../static/images/tx_pic.jpg'" alt="">
                  </li>

                  <li>
                    <p>{{roomItem.name}}</p>
                    <p>{{roomItem.room_desc}}</p>
                  </li>
                  <li>
                    <p><span>{{roomItem.at_times}}</span>/{{roomItem.num}}</p>
                    <p>参与人数</p>
                  </li>
                </ul>
              </div>
              <div class="start-squad-money">
                <ul class="cl">
                  <li @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)">
                    <p><span>{{roomItem.price}}</span></p>
                    <p>入场费
                      <svg aria-hidden="true" class="icon match_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                      </svg>
                    </p>
                  </li>
                  <li @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)">
                    <p><span>{{roomItem.prize_num}}</span></p>
                    <p>中奖范围</p>
                  </li>
                  <li @click="linkCreat(roomItem.roomID,roomItem.name,roomItem.order_id)">
                    <p><span>{{roomItem.prize_amount}}</span></p>
                    <p>奖金总额
                      <svg v-if="roomItem.prize_type==1" aria-hidden="true" class="icon banking-icon_guozi">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
                      </svg>
                      <svg v-else-if="roomItem.prize_type==2" aria-hidden="true" class="icon banking-icon_guozi">
                        <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                      </svg>
                    </p>
                  </li>
                  <li>
                    <!--<div class="start-squad-money-circle" @click="addRoom(items.member_team[0].top.playerID,items.member_team[0].jun.playerID,items.member_team[0].mid.playerID,items.member_team[0].adc.playerID,items.member_team[0].sup.playerID,roomItem.member_at_times,roomItem.times,roomItem.price,roomItem.roomID,ticket,index,i,roomItem.type)">-->
                    <!--<p><span>{{roomItem.member_at_times}}</span>/{{roomItem.times}}</p>-->
                    <!--</div>-->
                    <div class="start-squad-money-circle"
                         @click="addRoom(items.member_team[0].top.playerID,items.member_team[0].jun.playerID,items.member_team[0].mid.playerID,items.member_team[0].adc.playerID,items.member_team[0].sup.playerID,roomItem.member_at_times,roomItem.times,roomItem.price,roomItem.roomID,ticket,index,i,roomItem.type,roomItem.at_times,roomItem.num)">
                      <p><span>{{roomItem.member_at_times}}</span>/{{roomItem.times}}</p>
                      <div class="start-squad-money-add"><i class="iconfont icon-icon_"></i></div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="start-time">
                <i class="iconfont start-time-clock">&#xe6c6;</i>
                <span>{{ roomItem.at_end_time | formatDate }}</span>
                <span v-if="roomItem.is_must_open==0"
                      :class="{'must-open-people':roomItem.is_must_open==0}">满{{roomItem.num}}人开</span>
                <span v-else-if="roomItem.is_must_open==1" :class="{'must-open':roomItem.is_must_open==1}">必开</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!--  房间-->
      <div class="start-room-cont" v-else-if="bgRed==1" v-for="(items,index) in aquadRoom">
        <div class="start-room-cont-head">
          <div class="start-title-room">
            <div class="start-title" @click="showRoom(index)">
              <div class="start-title-left" :class="'room_color_' + items.room_list[0].type ">
                <p v-if="items.room_list[0].type < 9">{{room_type[items.room_list[0].type]}}</p>
                <img class="member-img" v-else-if="items.room_list[0].type == 9"
                     :src="items.room_list[0].member_avatar || '../../static/images/tx_pic.jpg'" alt="">
              </div>

              <div class="start-title-middle">
                <p>{{items.room_list[0].name}}</p>
                <p>{{items.room_list[0].room_desc}}</p>
              </div>
              <div class="start-title-right">
                <div class="start-title-right-left">
                  <p><span>{{items.room_list[0].at_times}}</span>/{{items.room_list[0].num}}</p>
                  <p>参与人数</p>
                </div>
              </div>
            </div>
          </div>

          <div class="start-money">
            <ul>
              <li @click="showRoom(index)">
                <p><span>{{items.room_list[0].price}}</span></p>
                <p>入场费
                  <svg aria-hidden="true" class="icon match_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                  </svg>
                </p>
              </li>
              <li @click="showRoom(index)">
                <p><span>{{items.room_list[0].prize_num}}</span></p>
                <p>中奖范围</p>
              </li>
              <li @click="showRoom(index)">
                <p><span>{{items.room_list[0].prize_amount}}</span></p>
                <p>奖金总额
                  <svg aria-hidden="true" v-if="items.room_list[0].prize_type==1" class="icon banking-icon_guozi">
                    <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
                  </svg>
                  <svg aria-hidden="true" v-else-if="items.room_list[0].prize_type==2" class="icon banking-icon_guozi">
                    <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-icon-menpiao--copy"></use>
                  </svg>
                </p>
              </li>
              <li>
                <!--<div class="start-money-circle" @click="linkUrl(items.room_list[0].roomID,items.room_list[0].member_at_times,items.room_list[0].times,items.room_list[0].at_times,items.room_list[0].num)">-->
                <!--<p><span>{{items.room_list[0].member_at_times}}</span>/{{items.room_list[0].times}}</p>-->
                <!--</div>-->
                <div class="start-squad-money-circle"
                     @click="linkUrl(items.room_list[0].roomID,items.room_list[0].member_at_times,items.room_list[0].times,items.room_list[0].at_times,items.room_list[0].num)">
                  <p><span>{{items.room_list[0].member_at_times}}</span>/{{items.room_list[0].times}}</p>
                  <div class="start-squad-money-add"><i class="iconfont icon-icon_"></i></div>
                </div>
              </li>
            </ul>
          </div>
          <div @click="showRoom(index)" class="start-time-arrow cl">
            <div class="start-time">
              <i class="iconfont start-time-clock">&#xe6c6;</i>
              <span>{{ items.room_list[0].at_end_time | formatDate }}</span>
              <span v-if="items.room_list[0].is_must_open==0"
                    :class="{'must-open-people':items.room_list[0].is_must_open==0}">满{{items.room_list[0].num}}人开</span>
              <span v-else-if="items.room_list[0].is_must_open==1"
                    :class="{'must-open':items.room_list[0].is_must_open==1}">必开</span>
            </div>
            <div class="start-title-right-arrow"><p :class="{'active-arrow':arr2[index]==1}"><i
              class="iconfont iconBack2">&#xe6d4;</i></p></div>
          </div>
        </div>


        <div class="start-room" v-show="arr2[index]==1">
          <div class="start-room-first" v-for="(item,i) in items.member_team">
            <div :class="{'start-room-first-bg1':items.member_team.length==i+1}" class="start-room-first-bg"></div>
            <div class="start-room-top">
              <ul>
                <li>阵容平均分:{{item.avg_score}}</li>
                <li @click="dataStore(item,items.roomID,item.order_id)"><span>编辑</span></li>
              </ul>
            </div>
            <router-link
              :to="{path:'roomInfo',query:{roomID:items.roomID,status:0,orderId:item.order_id,title:items.room_list[0].name}}">
              <div class="start-room-middle">
                <ul>
                  <li>
                    <div class="start-room-leval">
                      <p>
                        <svg aria-hidden="true" class=" icon_shangdan">
                          <use xmlns:xlink="https://www.w3.org/1999/xlink"
                               :xlink:href="leval[item.top.position_short_name]"></use>
                        </svg>
                      </p>
                      <p>{{item.top.position_short_name}}</p></div>
                    <div class="start-room-player">
                      <div class="start-room-player-jiange"></div>
                      <div v-if="item.top.bg2!=''" class="start-room-player-bg"
                           :style="{'background':'url('+item.top.bg2+')', 'background-size':'100% 100%'}">
                        <img :src="item.top.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.top.score}}</span>
                      </div>
                      <div v-else class="start-room-player-bg">
                        <img :src="item.top.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.top.score}}</span>
                      </div>
                      <p>{{item.top.player_nickname}}</p>
                      <p>{{item.top.team_short_name}}</p>
                    </div>
                  </li>
                  <li>
                    <div class="start-room-leval">
                      <p>
                        <svg aria-hidden="true" class=" icon_shangdan">
                          <use xmlns:xlink="https://www.w3.org/1999/xlink"
                               :xlink:href="leval[item.jun.position_short_name]"></use>
                        </svg>
                      </p>
                      <p>{{item.jun.position_short_name}}</p></div>
                    <div class="start-room-player">
                      <div class="start-room-player-jiange"></div>
                      <div v-if="item.jun.bg2!=''" class="start-room-player-bg"
                           :style="{'background':'url('+item.jun.bg2+')', 'background-size':'100% 100%'}">
                        <img :src="item.jun.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.jun.score}}</span>
                      </div>
                      <div v-else class="start-room-player-bg">
                        <img :src="item.jun.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.jun.score}}</span>
                      </div>
                      <p>{{item.jun.player_nickname}}</p>
                      <p>{{item.jun.team_short_name}}</p>
                    </div>
                  </li>
                  <li>
                    <div class="start-room-leval">
                      <p>
                        <svg aria-hidden="true" class=" icon_shangdan">
                          <use xmlns:xlink="https://www.w3.org/1999/xlink"
                               :xlink:href="leval[item.mid.position_short_name]"></use>
                        </svg>
                      </p>
                      <p>{{item.mid.position_short_name}}</p></div>
                    <div class="start-room-player">
                      <div class="start-room-player-jiange"></div>
                      <div v-if="item.mid.bg2!=''" class="start-room-player-bg"
                           :style="{'background':'url('+item.mid.bg2+')', 'background-size':'100% 100%'}">
                        <img :src="item.mid.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.mid.score}}</span>
                      </div>
                      <div v-else class="start-room-player-bg">
                        <img :src="item.mid.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.mid.score}}</span>
                      </div>
                      <p>{{item.mid.player_nickname}}</p>
                      <p>{{item.mid.team_short_name}}</p>
                    </div>
                  </li>
                  <li>
                    <div class="start-room-leval">
                      <p>
                        <svg aria-hidden="true" class=" icon_shangdan">
                          <use xmlns:xlink="https://www.w3.org/1999/xlink"
                               :xlink:href="leval[item.adc.position_short_name]"></use>
                        </svg>
                      </p>
                      <p>{{item.adc.position_short_name}}</p></div>
                    <div class="start-room-player">
                      <div class="start-room-player-jiange"></div>
                      <div v-if="item.adc.bg2!=''" class="start-room-player-bg"
                           :style="{'background':'url('+item.adc.bg2+')', 'background-size':'100% 100%'}">
                        <img :src="item.adc.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.adc.score}}</span>
                      </div>
                      <div v-else class="start-room-player-bg">
                        <img :src="item.adc.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.adc.score}}</span>
                      </div>
                      <p>{{item.adc.player_nickname}}</p>
                      <p>{{item.adc.team_short_name}}</p>
                    </div>
                  </li>
                  <li>
                    <div class="start-room-leval">
                      <p>
                        <svg aria-hidden="true" class=" icon_shangdan">
                          <use xmlns:xlink="https://www.w3.org/1999/xlink"
                               :xlink:href="leval[item.sup.position_short_name]"></use>
                        </svg>
                      </p>
                      <p>{{item.sup.position_short_name}}</p></div>
                    <div class="start-room-player">
                      <div class="start-room-player-jiange"></div>
                      <div v-if="item.sup.bg2!=''" class="start-room-player-bg"
                           :style="{'background':'url('+item.sup.bg2+')', 'background-size':'100% 100%'}">
                        <img :src="item.sup.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.sup.score}}</span>
                      </div>
                      <div v-else class="start-room-player-bg">
                        <img :src="item.sup.player_image || '../../../static/images/unknow.png'" alt="">
                        <span></span>
                        <span>{{item.sup.score}}</span>
                      </div>
                      <p>{{item.sup.player_nickname}}</p>
                      <p>{{item.sup.team_short_name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </router-link>

          </div>

        </div>
      </div>
      <div class="data-null">{{message}}</div>
    </div>
    <carShop v-show="carShow" @newNodeEvent="parentLisen" @newNodeEvent1="parentLisen1" :carList="carList"></carShop>
    <loading v-show="loading==false"></loading>
    <div class="started-null" v-show="loading&&aquadRoom==''">
      <img src="../../../static/images/pic_404.png" alt="">
      <p>暂无未开始的房间</p>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import carShop from '../carShop.vue'
  import loading from '../loading.vue'
  var arr1 = new Array()
  var arr2 = new Array()
  var flag
  var flag1
  export default {
    name: 'start',
    data () {

      return {
        ingSur: '',
        bgRed: 0,
        page: 1,
        room_type: ['', '新手', '活动', '日赛', '周赛', 'Solo', '名人', '毒奶', 'Solo'],
        busy1: false,
        message: '暂无更多内容',
        items: [
          {number: "01"},
          {number: "01"}
        ],
        arr1,
        arr2,
        loading: false,
        show_type: 1,
        flag: 0,
        flag1: 0,
        aquadRoom: [],
        leval,
        ticket: '',
        carShow: false,  //是否弹窗
        cur_player: {  //阵容参数
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        },
        carList: {    //订单弹窗参数
          TOP: '',
          JUN: '',
          MID: '',
          ADC: '',
          SUP: '',
          ticket: '',
          member_at_times: '',
          times: '',
          roomID: '',
          price: '',
          type: ''
        },
        num: '',
        num2: '',
        isAll: 0, //0：继续请求接口 1：不再请求接口
        start_id: '',
        page:1,

        isRoomStop: true, //阻止恶意点击: 显示房间按钮
        isBattleStop: true, //阻止恶意点击: 显示阵容按钮
        repeatTemp:'', //变量时间
        repeatStatus: '' //变量tab
      }
    },
    deactivated(){
      this.busy1 = true;
    },
    methods: {
      parentLisen(evtValue) {
        //evtValue 是子组件传过来的值
        this.carShow = false;
      },
      parentLisen1(evtValue) {
        this.aquadRoom[this.num].room_list[this.num2].member_at_times = parseInt(this.aquadRoom[this.num].room_list[this.num2].member_at_times) + parseInt(evtValue);
      },
      toggleButton(element) {
        this.isAll = 0;
        this.arr1 = [];
        this.arr2 = [];
        this.page = 1;
        this.flag = 0;
        this.flag1 = 0;

        if (this.repeatStatus != element){
          this.repeatTemp = '';
          this.isBattleStop = true;
          this.isRoomStop = true;
          this.repeatStatus = element; //tab变量赋值
          this.loading = false;
          this.$store.commit('set', {
            key: 'isStopClick',
            val: true
          });
        }

        if (element == 0) {
          if(!this.stopRepeatClick() && this.isBattleStop == true && this.$store.state.isStopClick != false){
            this.show_type = 1;
            this.aquadRoom = [];
            this.loadMore();
          }else{
            this.isBattleStop = false;
            this.loading = true;
            return;
          }
        } else {
          if(!this.stopRepeatClick() && this.isRoomStop == true && this.$store.state.isStopClick != false){
            this.show_type = 2;
            this.aquadRoom = [];
            this.loadMore();
          }else{
            this.isRoomStop = false;
            this.loading = true;
            return false;
          }
        }
        this.bgRed = element
      },
      // 阻止恶意点击
      stopRepeatClick (){
        var t = t ? t * 1000 : 2000;//毫秒
        var time = new Date().getTime();
        if(!this.repeatTemp){
          this.repeatTemp = time;
          this.isBattleStop = true;
          this.isRoomStop = true;
          return false;//允许
        }else{
          var ts = t - (time - this.repeatTemp);
          ts = parseInt(ts/1000);
          if(ts > 0){
//            alert("频率限制：还有 <b>"+ ts +"</b> 秒才可以再执行！");
            return true;//禁止执行
          }else{
            this.repeatTemp = time;//更新时间
            this.isBattleStop = true;
            this.isRoomStop = true;
            return false;//允许
          }
        }
      },
      /* 阵容*/
      showSquad(index) {
        if (this.arr1[index] == 0) {
          this.$set(this.arr1, index, 1);

          if (this.arr1.length == 1) {
            this.flag = 1
          } else {
            for (var i = 0; i < this.arr1.length; i++) {
              if (this.arr1[i] == 1) {
                if (this.arr1[i] == this.arr1[i + 1]) {
                  this.flag = 1
                }
              }
            }
          }
        } else {
          this.$set(this.arr1, index, 0);
          if (this.arr1.length == 1) {
            this.flag = 0
          } else {
            for (var i = 0; i < this.arr1.length; i++) {
              if (this.arr1[i] == 1) {
                if (this.arr1[i] == this.arr1[i + 1]) {
                  this.flag = 1
                } else {
                  this.flag = 0
                }
              }
            }
          }
        }
      },
      showSquadList(){
        var index = this.arr1.length;
        if (this.flag == 0) {
          for (var i = 0; i <= index; i++) {
            this.$set(this.arr1, i, 1);
          }
          this.flag = 1
        } else {
          for (var i = 0; i <= index; i++) {
            this.$set(this.arr1, i, 0);
          }
          this.flag = 0
        }
      },
      /*房间*/
      showRoom(index){
        if (this.arr2[index] == 0) {
          this.$set(this.arr2, index, 1);
          if (this.arr2.length == 1) {
            this.flag1 = 1
          } else {
            for (var i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i] == 1) {
                if (this.arr2[i] == this.arr2[i + 1]) {
                  this.flag1 = 1
                }
              }
            }
          }
        } else {
          this.$set(this.arr2, index, 0);
          if (this.arr2.length == 1) {
            this.flag1 = 0
          } else {
            for (var i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i] == 1) {
                if (this.arr2[i] == this.arr2[i + 1]) {
                  this.flag1 = 1
                } else {
                  this.flag1 = 0
                }
              }
            }
          }
        }
      },
      showRoomdList(){
        var index = this.arr2.length;
        if (this.flag1 == 0) {
          for (var y = 0; y <= index; y++) {
            this.$set(this.arr2, y, 1);
          }
          this.flag1 = 1
        } else {
          for (var y = 0; y <= index; y++) {
            this.$set(this.arr2, y, 0);
          }
          this.flag1 = 0
        }
      },
      loadTop(){
        var _this = this;
        if (this.isAll == 0 ) {
          this.message = '加载中...';
          this.$api('/services/fantasy/get_member_room.php', {
            show_type: this.show_type,
            // start_id: this.start_id,
            page : this.page,
            status: 0,
            limit: 5,
            platform: 'h5'
          }).then(response => {
            if (response.code == 200) {
	            if(store.get('member_info').is_new_user == '1'){
		            if (store.get('new_player').indexOf('mystart') < 0) {
			            store.set('new_player', store.get('new_player') + 'mystart');
			            this.$root.hub.$emit('new_player_go_Success', '3');
		            }
		            this.pushEvent(store.get('loginInfo').type, 'my', '0');
                }

              _this.loading = true;
              if (response.data.list.length == 0) {
                _this.isAll = 1;
                _this.message = '暂无更多内容';
              } else {
                // if (response.data.list.length < 5) {
                //   _this.isAll = 1;
                //   _this.message = '暂无更多内容';
                // }
                // _this.start_id = response.data.list[response.data.list.length - 1].order_id;
                _this.page++
              }

              if (_this.show_type == 1) {
                var index = _this.arr1.length
                if (_this.flag == 1) {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr1[index + i] = 1;
                  }
                } else {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr1[index + i] = 0;
                  }
                }
              } else {
                var index = _this.arr2.length;
                if (_this.flag1 == 1) {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr2[index + i] = 1;
                  }
                } else {
                  for (var i = 0; i < response.data.list.length; i++) {
                    _this.arr2[index + i] = 0;
                  }
                }

              }
              _this.aquadRoom = _this.aquadRoom.concat(response.data.list);
              _this.ticket = response.data.ticket;
            }
            _this.busy1 = false;
          });
        }

      },
      loadMore(){
      	if (this.isAll == 0) {
          this.busy1 = true;
          setTimeout(() => {
              this.loadTop();
//            }
          }, 1000);
        }
      },
      addRoom(topId, junId, midId, adcId, supId, member_at_times, times, price, roomID, ticket, index, i, type, at_times, num){
        this.carList.TOP = topId;
        this.carList.JUN = junId;
        this.carList.MID = midId;
        this.carList.ADC = adcId;
        this.carList.SUP = supId;
        this.carList.price = price;
        this.carList.roomID = roomID;
        this.carList.member_at_times = member_at_times;
        this.carList.times = times;
        this.carList.ticket = ticket;
        this.num = index;
        this.num2 = i;
        this.carList.type = type;
        if (parseInt(at_times) == parseInt(num)) {
          layer.open({
            content: '参与房间已满'
            , btn: '关闭'
          });
        } else if (parseInt(member_at_times) == parseInt(times)) {
          layer.open({
            content: '参与次数已达上限'
            , btn: '关闭'
          });
        } else {
          this.carShow = true;
        }
      },
      linkCreat(roomID, name, orderId){
        sessionStorage.setItem('status', '0');
        this.$router.push({path: '/Roominfo', query: {roomID: roomID, orderId: orderId}});
      },
      dataStore(items, roomID, orderId){
        var cur_player = {
          TOP: '',
          JUG: '',
          MID: '',
          ADC: '',
          SUP: ''
        };
        this.cur_player.TOP = items.top;
        this.cur_player.JUG = items.jun;
        this.cur_player.MID = items.mid;
        this.cur_player.ADC = items.adc;
        this.cur_player.SUP = items.sup;
        store.set('user', {cur_player: this.cur_player});
        this.$router.push({path: '/selected', query: {statued: '2', roomID: roomID, order_id: orderId}});
      },
      linkUrl(roomID, mermber_at_times, times, at_times, num){
        if (parseInt(at_times) == parseInt(num)) {
          layer.open({
            content: '参与房间已满'
            , btn: '关闭'
          });
        } else {
          if (parseInt(mermber_at_times) == parseInt(times)) {
            layer.open({
              content: '参与次数已达上限'
              , btn: '关闭'
            });
          } else {
            store.remove('user');
            this.$router.push({path: '/selected', query: {statued: '2', roomID: roomID}});
          }
        }
      }
    },
    created() {
      this.arr1 = []
    },
    mounted () {
//      this.loadMore();
    },
    components: {
      carShop,
      loading
    }
  }
</script>

<style lang="stylus">
  @import '../../assets/styl/start.styl';
</style>
