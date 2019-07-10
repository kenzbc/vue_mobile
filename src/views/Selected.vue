<template>
    <div class="selected anim-opacity2 main" :class="{'bg-blue':tabIndexValue == 1}" v-cloak>
      <div class="head-top">
        <head-top :head-title="hTitle" :is-list="isLists" go-back="true" map-list="true" @headTabIndex="tabIndex" :tabIndexValue="tabIndex"></head-top>
      </div>

      <div class="head-info">
        <div class="tab-item">
          <span class="num">{{cur_avg_score}}</span>
          <span class="title">阵容得分</span>
        </div>
        <div class="tab-item">
          <span class="num red">¥{{cur_salary_cap - cur_value}}</span>
          <span class="title">可用工资</span>
        </div>
        <div class="tab-item">
          <span class="button" v-if="room_info != ''" @click="createSubBtn(room_info.salary_cap,cur_value)">提交阵容</span>
          <span class="button" v-else @click="createSubBtn(params.salary_cap,cur_value)">提交阵容</span>
        </div>
      </div>

      <!--倒计时时间-->
      <div class="end-time" :class="{'map':tabIndexValue == 1}">截止剩余时间 <count-down @time-end="message = '倒计时结束'" :endTime='endTime'></count-down></div>


      <!--新地图形式-->
      <div class="select-squad-map" v-if="tabIndexValue == 1">
        <router-link class="item" :to="{ path:'/ChoosePlayer', query: { positionID: 3} }" >
        <div v-if="cur_player.TOP != ''">
          <span><img width="198" height="198" :src="cur_player.TOP.player_image == '' ? pic_img[1] : cur_player.TOP.player_image " ></span>
          <span class="team-info">
            <span><img :src="cur_player.TOP.team_image" width="40" height="40"></span>
            <span class="text">
              <span>{{cur_player.TOP.nickname}} <em>¥{{cur_player.TOP.value}}</em></span>
              <span>平均分: {{cur_player.TOP.score}}</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-TOPx"></use>
              </svg>
            </span>
          </span>
        </div>
        <div v-else>
          <span><img src="../assets/image/pic_photo_team_imp@2x.png" ></span>
          <span class="team-info">
            <span><i class="iconfont">&#xe652;</i></span>
            <span class="text">点击添加选手</span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-TOPx"></use>
              </svg>
            </span>
          </span>
        </div>
        </router-link>

        <router-link class="item" :to="{ path:'/ChoosePlayer', query: { positionID: 1} }">
          <div v-if="cur_player.ADC != ''">
            <span><img width="198" height="198" :src="cur_player.ADC.player_image == '' ? pic_img[1] : cur_player.ADC.player_image " ></span>
            <span class="team-info">
            <span><img :src="cur_player.ADC.team_image" width="40" height="40"></span>
            <span class="text">
              <span>{{cur_player.ADC.nickname}} <em>¥{{cur_player.ADC.value}}</em></span>
              <span>平均分: {{cur_player.ADC.score}}</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-ADCx"></use>
              </svg>
            </span>
          </span>
          </div>
          <div v-else>
            <span><img src="../assets/image/pic_photo_team_imp@2x.png" ></span>
            <span class="team-info">
              <span><i class="iconfont">&#xe652;</i></span>
              <span class="text">点击添加选手</span>
              <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ADCx"></use>
                </svg>
              </span>
            </span>
          </div>
        </router-link>

        <router-link class="item" :to="{ path:'/ChoosePlayer', query: { positionID: 2} }">
          <div v-if="cur_player.MID != ''">
            <span><img width="198" height="198" :src="cur_player.MID.player_image == '' ? pic_img[1] : cur_player.MID.player_image " ></span>
            <span class="team-info">
            <span><img :src="cur_player.MID.team_image" width="40" height="40"></span>
            <span class="text">
              <span>{{cur_player.MID.nickname}} <em>¥{{cur_player.MID.value}}</em></span>
              <span>平均分: {{cur_player.MID.score}}</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-MIDx"></use>
              </svg>
            </span>
          </span>
          </div>
          <div v-else>
            <span><img src="../assets/image/pic_photo_team_imp@2x.png" ></span>
            <span class="team-info">
              <span><i class="iconfont">&#xe652;</i></span>
              <span class="text">点击添加选手</span>
              <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-MIDx"></use>
                </svg>
              </span>
            </span>
          </div>
        </router-link>

        <router-link class="item" :to="{ path:'/ChoosePlayer', query: { positionID: 4} }">
          <div v-if="cur_player.JUG != ''">
            <span><img width="198" height="198" :src="cur_player.JUG.player_image == '' ? pic_img[1] : cur_player.JUG.player_image " ></span>
            <span class="team-info">
            <span><img :src="cur_player.JUG.team_image" width="40" height="40"></span>
            <span class="text">
              <span>{{cur_player.JUG.nickname}} <em>¥{{cur_player.JUG.value}}</em></span>
              <span>平均分: {{cur_player.JUG.score}}</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-JUGx"></use>
              </svg>
            </span>
          </span>
          </div>
          <div v-else>
            <span><img src="../assets/image/pic_photo_team_imp@2x.png" ></span>
            <span class="team-info">
              <span><i class="iconfont">&#xe652;</i></span>
              <span class="text">点击添加选手</span>
              <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-JUGx"></use>
                </svg>
              </span>
            </span>
          </div>
        </router-link>

        <router-link class="item" :to="{ path:'/ChoosePlayer', query: { positionID: 5} }">
          <div v-if="cur_player.SUP != ''">
            <span><img width="198" height="198" :src="cur_player.SUP.player_image == '' ? pic_img[1] : cur_player.SUP.player_image " ></span>
            <span class="team-info">
            <span><img :src="cur_player.SUP.team_image" width="40" height="40"></span>
            <span class="text">
              <span>{{cur_player.SUP.nickname}} <em>¥{{cur_player.SUP.value}}</em></span>
              <span>平均分: {{cur_player.SUP.score}}</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-SUPx"></use>
              </svg>
            </span>
          </span>
          </div>
          <div v-else>
            <span><img src="../assets/image/pic_photo_team_imp@2x.png" ></span>
            <span class="team-info">
              <span><i class="iconfont">&#xe652;</i></span>
              <span class="text">点击添加选手</span>
              <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-SUPx"></use>
                </svg>
              </span>
            </span>
          </div>
        </router-link>
      </div>

      <!--列表形式-->
      <section class="list" :class="{'playerLight': playerListLight}" v-else>
        <!--<div class="gradient gradient_top"></div>-->
        <ul>
          <li title="TOP" class="battle-array-list-box">
            <router-link :to="{ path:'/choosePlayer', query: { positionID: 3} }">
              <section v-if="cur_player.TOP != ''">
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" :src="cur_player.TOP.bg1 == '' ? pic_img[0] : cur_player.TOP.bg1">
                    <img class="avatar" :src="cur_player.TOP.player_image == '' ? pic_img[1] : cur_player.TOP.player_image ">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-TOPx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_list_dec fll">
                  <p>{{cur_player.TOP.nickname}}</p>
                  <p>TOP-{{cur_player.TOP.team_short_name}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-rose-red">¥{{cur_player.TOP.value}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-blue">{{cur_player.TOP.score}}</p>
                </div>
                <div class="create_list_price fll">
                  <player-status :status="cur_player.TOP.player_status"></player-status>
                </div>
              </section>
              <section v-else>
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" src="static/images/avater_default.png">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-TOPx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_def_dec fll">
                  <span class="c-blue"><strong>TOP</strong></span>
                  <span class="c-light-blue fz-24">点击添加选手</span>
                </div>
                <div class="create_list_add fll">
                  <i class="iconfont">&#xe652;</i>
                </div>
              </section>
            </router-link>
          </li>
          <li title="JUG" class="battle-array-list-box">
            <router-link :to="{ path:'/choosePlayer', query: { positionID: 4} }">
              <section v-if="cur_player.JUG != ''">
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" :src="cur_player.JUG.bg1 == null || cur_player.JUG.bg1 == '' ? pic_img[0] : cur_player.JUG.bg1">
                    <img class="avatar" :src="cur_player.JUG.player_image == '' ? pic_img[1] : cur_player.JUG.player_image ">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-JUGx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_list_dec fll">
                  <p>{{cur_player.JUG.nickname}}</p>
                  <p>JUG-{{cur_player.JUG.team_short_name}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-rose-red">¥{{cur_player.JUG.value}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-blue">{{cur_player.JUG.score}}</p>
                </div>
                <div class="create_list_price fll">
                  <player-status :status="cur_player.JUG.player_status"></player-status>
                </div>
              </section>
              <section v-else>
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" src="static/images/avater_default.png">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-JUGx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_def_dec fll">
                  <span class="c-blue"><strong>JUG</strong></span>
                  <span class="c-light-blue fz-24">点击添加选手</span>
                </div>
                <div class="create_list_add fll">
                  <i class="iconfont">&#xe652;</i>
                </div>
              </section>
            </router-link>
          </li>
          <li title="MID" class="battle-array-list-box">
            <router-link :to="{ path:'/choosePlayer', query: { positionID: 2} }">
              <section v-if="cur_player.MID != ''">
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" :src="cur_player.MID.bg1 == null || cur_player.MID.bg1 == '' ? pic_img[0] : cur_player.MID.bg1">
                    <img class="avatar" :src="cur_player.MID.player_image == '' ? pic_img[1] : cur_player.MID.player_image ">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-MIDx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_list_dec fll">
                  <p>{{cur_player.MID.nickname}}</p>
                  <p>MID-{{cur_player.MID.team_short_name}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-rose-red">¥{{cur_player.MID.value}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-blue">{{cur_player.MID.score}}</p>
                </div>
                <div class="create_list_price fll">
                  <player-status :status="cur_player.MID.player_status"></player-status>
                </div>
              </section>
              <section v-else>
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" src="static/images/avater_default.png">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-MIDx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_def_dec fll">
                  <span class="c-blue"><strong>MID</strong></span>
                  <span class="c-light-blue fz-24">点击添加选手</span>
                </div>
                <div class="create_list_add fll">
                  <i class="iconfont">&#xe652;</i>
                </div>
              </section>
            </router-link>
          </li>
          <li title="ADC" class="battle-array-list-box">
            <router-link :to="{ path:'/choosePlayer', query: { positionID: 1} }">
              <section v-if="cur_player.ADC != ''">
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" :src="cur_player.ADC.bg1 == null || cur_player.ADC.bg1 == '' ? pic_img[0] : cur_player.ADC.bg1">
                    <img class="avatar" :src="cur_player.ADC.player_image == '' ? pic_img[1] : cur_player.ADC.player_image ">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-ADCx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_list_dec fll">
                  <p>{{cur_player.ADC.nickname}}</p>
                  <p>ADC-{{cur_player.ADC.team_short_name}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-rose-red">¥{{cur_player.ADC.value}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-blue">{{cur_player.ADC.score}}</p>
                </div>
                <div class="create_list_price fll">
                  <player-status :status="cur_player.ADC.player_status"></player-status>
                </div>
              </section>
              <section v-else>
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" src="static/images/avater_default.png">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-ADCx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_def_dec fll">
                  <span class="c-blue"><strong>ADC</strong></span>
                  <span class="c-light-blue fz-24">点击添加选手</span>
                </div>
                <div class="create_list_add fll">
                  <i class="iconfont">&#xe652;</i>
                </div>
              </section>
            </router-link>
          </li>
          <li title="SUP" class="battle-array-list-box">
            <router-link :to="{ path:'/choosePlayer', query: { positionID: 5} }">
              <section v-if="cur_player.SUP != ''">
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" :src="cur_player.SUP.bg1 == null || cur_player.SUP.bg1 == '' ? pic_img[0] : cur_player.SUP.bg1">
                    <img class="avatar" :src="cur_player.SUP.player_image == '' ? pic_img[1] : cur_player.SUP.player_image">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-SUPx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_list_dec fll">
                  <p>{{cur_player.SUP.nickname}}</p>
                  <p>SUP-{{cur_player.SUP.team_short_name}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-rose-red">¥{{cur_player.SUP.value}}</p>
                </div>
                <div class="create_list_score fll">
                  <p class="c-blue">{{cur_player.SUP.score}}</p>
                </div>
                <div class="create_list_price fll">
                  <player-status :status="cur_player.SUP.player_status"></player-status>
                </div>
              </section>
              <section v-else>
                <div class="create_list_avatar fll">
                  <div class="create_team_avatar">
                    <img class="create_team_logo" src="static/images/avater_default.png">
                  </div>
                </div>
                <div class="create_list_role fll">
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-SUPx"></use>
                    </svg>
                  </p>
                </div>
                <div class="create_def_dec fll">
                  <span class="c-blue"><strong>SUP</strong></span>
                  <span class="c-light-blue fz-24">点击添加选手</span>
                </div>
                <div class="create_list_add fll">
                  <i class="iconfont">&#xe652;</i>
                </div>
              </section>
            </router-link>
          </li>
        </ul>
      </section>


      <!-- bottom button -->
      <div class="footer-button">
        <button class="button" @click="removeBtn">清除阵容</button>
        <button class="button" :class="hTitle == '选择阵容' ? 'active' : ''" @click="recommendButton">一键选人</button>
        <button class="button" style="display:none;">已存阵容</button>
      </div>


      <!--提交阵容弹层-->
      <div v-if="orderShow" class="toast-modal">
        <div class="modal-bg"></div>
        <!--roomID-->
        <div class="modal-content" v-if="room_info != ''">
          <div class="title">阵容提交
            <label class="dialog_close" @click="dialogClose">
              <i class="iconfont">&#xe6ba;</i>
            </label>
          </div>
          <div class="modal-body">
            <div class="title-line"></div>

            <div class="price"><span>参与单价</span><span>{{room_info.price}} <i class="iconfont">&#xe6f7;</i></span></div>

            <div class="change-num">
              <div class="subtitle">参与次数</div>
              <div class="reduce" @click="minusBtn"><img src="../assets/image/icon_40_reduce@2x.png"></div>

              <div class="num" v-if="room_info.type == 8"><span>{{orderCount}}</span> / 1</div>
              <div class="num" v-else><span>{{orderCount}}</span> / {{(parseInt(room_info.times)-parseInt(room_info.member_at_times))<=0 ? 0 : (parseInt(room_info.times)-parseInt(room_info.member_at_times))}}</div>


              <div class="add" v-if="room_info.type == 8"><img src="../assets/image/icon_40_add@2x.png"></div>
              <div class="add" v-else @click="addsBtn(parseInt(room_info.times)-parseInt(room_info.member_at_times))"><img src="../assets/image/icon_40_add@2x.png"></div>
            </div>


            <div class="price_ticket"><span>我的门票</span><span>{{room_info.ticket}} <i class="iconfont">&#xe6f7;</i></span></div>
            <div class="price_ticket"><span>本次消耗</span><span style="color:#5348FF;">{{parseInt(room_info.price) * orderCount}} <i class="iconfont">&#xe6f7;</i></span></div>

            <button class="button" v-if="orderCount == 0">确认提交</button>
            <button class="button" v-else @click="orderSubmit(room_info.ticket,room_info.price * orderCount)">{{isSort.text}}</button>
          </div>
        </div>

        <!--group_id-->
        <div class="dialog_container dialog_group" style="z-index:50;" v-else-if="isSecretkey == 1">
          <div class="dialog_group_header">
            <p>订单支付</p>
            <label class="dialog_close" @click="dialogClose">
              <i class="iconfont">&#xe6ba;</i>
            </label>
          </div>
          <div class="dialog_group_body">
            <section>
              <label>
                <i class="iconfont">&#xe609;</i>
              </label>
              <p>创建房间
                <span> (消耗{{params.key}}
                  <i class="iconfont light_oran">&#xe607;</i>) </span>
              </p>
              <div class="dialog_group_content">
                <p>《{{params.name}}》</p>
              </div>
              <div class="dialog_group_params">
                <div>
                  <p>{{params.group_ticket}}</p>
                  <p>入场费
                    <i class="iconfont oran">&#xe6c5;</i>
                  </p>
                </div>
                <div>
                  <p>{{params.group_member_num}}</p>
                  <p>参与人数</p>
                </div>
                <div>
                  <p class="light_oran">{{params.reward_guozi}}</p>
                  <p>奖金总额
                    <svg aria-hidden="true" class="icon_guozi">
                      <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-guozi"></use>
                    </svg>
                  </p>
                </div>
              </div>
            </section>
            <section>
              <label>
                <i class="iconfont">&#xe609;</i>
              </label>
              <p>选择阵容参与房间</p>
              <div class="dialog_group_content padding">
                <p>参与单价：
                  <b>{{params.group_ticket}}</b>
                  <i class="iconfont">&#xe6c5;</i>
                </p>
                <p>参与次数：
                  <b>1</b>
                </p>
              </div>
              <div class="dialog_my_params">
                <div>
                  <p class="fll">我的门票：
                    <b>{{params.my_ticket}}</b>
                    <i class="iconfont">&#xe6c5;</i>
                  </p>
                  <p class="flr">我的钥匙：
                    <b>{{params.my_key}}</b>
                    <i class="iconfont light_oran">&#xe607;</i>
                  </p>
                </div>
                <div>
                  <p>本次消耗：
                    <b>{{params.group_ticket}}</b>
                    <i class="iconfont">&#xe6c5;</i> +
                    <b>{{params.key}}</b>
                    <i class="iconfont light_oran">&#xe607;</i>
                  </p>
                </div>
              </div>
            </section>

          </div>
          <div class="dialog_order_footer">
            <P class="" @click="groupSubmit">确认提交</P>
          </div>
        </div>
        <div class="dialog_container dialog_secretkey" style="z-index:50;" v-else-if="isSecretkey == 2">
          <div class="dialog_secretkey_header">
            <p>成功创建并参与房间</p>
            <label class="dialog_close" @click="dialogClose">
              <i class="iconfont">&#xe6ba;</i>
            </label>
          </div>
          <div class="dialog_secretkey_body">
            <p class="name">《{{params.name}}》</p>
            <p class="room_num">房间号</p>
            <p class="room_key" id="roomKey">{{secret_key}}</p>
          </div>
          <div class="dialog_secretkey_footer">
            <P @click="friendLink(secret_key,ssdb_key)">邀请好友</P>
          </div>
        </div>
      </div>


      <!--是否清除阵容？-->
      <dialog-confirm v-if="isRemove" @callbackAction="removeAction" text="是否清除阵容？"></dialog-confirm>


      <!--更新阵容弹层-->
      <dialog-confirm v-if="isEdit" @callbackAction="orderEdit" title="更新阵容" text="保存阵容将自动替换原先阵容"></dialog-confirm>




      <!--提交完成-新版-->
      <transition name="fade">
      <div class="success-page" v-show="shareShow">
        <div class="page-content">
          <div class="head-info">
            <div class="tab-item">
              <span class="num">{{cur_value}}</span>
              <span class="title">阵容身价</span>
            </div>
            <div class="tab-item">
              <figure><img :src="member_info.avatar == '' ? pic_img[4] : member_info.avatar" width="120" height="120"></figure>
            </div>
            <div class="tab-item">
              <span class="num">{{cur_avg_score}}</span>
              <span class="title">阵容得分</span>
            </div>
          </div>

          <div class="success-content">
            <div class="room-list-box">
              <div class="head" :style="{backgroundImage:'url(' + room_info.cover_url + ')'}" style="background-size:cover;">
                <room-type-icon v-for="(room_name,room_index) in room_type" :key="room_index" v-show="room_type[room_index].type == room_info.type" :type="room_type[room_index].type+''"></room-type-icon>
                <div class="title">
                  <span>{{room_info.name}}</span>
                  <span>{{room_info.room_desc}}</span>
                </div>
              </div>
              <div class="room-content">
                <div class="content">
                  <div class="item"><span>比赛开始时间</span><span>{{room_info.at_end_time | formatDate5}} {{room_info.at_end_time | formatDate6}}</span></div>
                  <div class="item"><span>最高可获得奖励</span><span>{{room_info.prize_amount}} {{typeStyle[room_info.prize_type]}}</span></div>
                </div>
                <!--阵容-->
                <div class="battle-array">
                  <div class="average-score">

                  </div>
                  <div class="team">
                    <player-item
                      :position="cur_player.TOP.position_short_name"
                      :backgroundImg="cur_player.TOP.bg2"
                      :player-avatar="cur_player.TOP.image"
                      :score="cur_player.TOP.score"
                      :nickname="cur_player.TOP.nickname"
                      :team-name="cur_player.TOP.team_short_name"
                    ></player-item>
                    <player-item
                      :position="cur_player.JUG.position_short_name"
                      :backgroundImg="cur_player.JUG.bg2"
                      :player-avatar="cur_player.JUG.image"
                      :score="cur_player.JUG.score"
                      :nickname="cur_player.JUG.nickname"
                      :team-name="cur_player.JUG.team_short_name"
                    ></player-item>
                    <player-item
                      :position="cur_player.MID.position_short_name"
                      :backgroundImg="cur_player.MID.bg2"
                      :player-avatar="cur_player.MID.image"
                      :score="cur_player.MID.score"
                      :nickname="cur_player.MID.nickname"
                      :team-name="cur_player.MID.team_short_name"
                    ></player-item>
                    <player-item
                      :position="cur_player.ADC.position_short_name"
                      :backgroundImg="cur_player.ADC.bg2"
                      :player-avatar="cur_player.ADC.image"
                      :score="cur_player.ADC.score"
                      :nickname="cur_player.ADC.nickname"
                      :team-name="cur_player.ADC.team_short_name"
                    ></player-item>
                    <player-item
                      :position="cur_player.SUP.position_short_name"
                      :backgroundImg="cur_player.SUP.bg2"
                      :player-avatar="cur_player.SUP.image"
                      :score="cur_player.SUP.score"
                      :nickname="cur_player.SUP.nickname"
                      :team-name="cur_player.SUP.team_short_name"
                    ></player-item>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="footer-button">
            <button class="button" @click="linkRoom()">进入房间</button>
            <button class="button" @click="linkHome()">返回大厅</button>
            <button class="button active" @click="linkMatch()">快速加入更多</button>
          </div>
        </div>
      </div>
      </transition>



      <!-- 弹框 -->
      <dialog-pay v-if="vShow" @dialogHide="change" :msg="vShow" :pay-list="payList"></dialog-pay>
      <!--渐隐弹出层-->
      <div class="share_show_success" v-if="share_show_success">
        <div class="share_show_success_bg"></div>
        <div class="share_show_success_white">
          <p>阵容提交成功</p>
        </div>
      </div>





      <!--新手引导弹层1-2  (2)-->
      <div v-if="courseStep == '2'" @click="newUserNextBtn('2')" class="tutorial1-2">
        <div class="content">
          <div class="text">新人经理可用【一键选人】无需纠结！</div>
          <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
          <div class="next-btn">一键选人</div>
        </div>
      </div>

      <!--新手引导弹层1-3  (3)-->
      <div v-if="courseStep == '3'" @click="newUserNextBtn('3')" class="tutorial1-3">
        <div class="content">

          <div class="submit-btn">提交阵容</div>
          <div class="submit-text">
            <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            <div class="text">点击【提交阵容】<br>看比赛赢奖励</div>
          </div>


          <div class="player">
            <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            <div class="text">点击选手头像<br>可以查看他的详细数据</div>
          </div>

          <div style="width:calc(100% - 56px);position:absolute;top:438px;box-shadow:none;" class="battle-array-list-box">
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


      <!--新手引导弹层3  (4)-->
      <div v-if="courseStep == '4'" class="toast-modal">
        <div class="modal-bg"></div>
        <div class="modal-content">
          <div class="title">阵容提交</div>
          <div class="title-line"></div>
          <div class="modal-body">
            <div class="price"><span>参与单价</span><span>20 <i class="iconfont">&#xe6f7;</i></span></div>
            <div class="change-num">
              <div class="reduce"><img src="../assets/image/icon_40_reduce@2x.png"></div>
              <div class="num"><span>5</span> / 5</div>
              <div class="add"><img src="../assets/image/icon_40_add@2x.png"></div>
            </div>
            <div class="price"><span>我的门票</span><span>3212 <i class="iconfont">&#xe6f7;</i></span></div>
            <div class="price"><span>本次消耗</span><span>100 <i class="iconfont">&#xe6f7;</i></span></div>
            <br><br><br>
          </div>

        </div>
      </div>
      <div v-if="courseStep == '4'" @click="newUserNextBtn('4')" class="tutorial1-4">
        <div class="content">
          <div class="submit-btn">确认提交</div>
          <div class="submit-text">
            <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            <div class="text">【确认提交】，完成布阵！</div>
          </div>
        </div>
      </div>


      <!--新手引导弹层4  (5)-->
      <div v-if="courseStep == '5'" class="success-page" style="z-index:999;">
        <div class="head-info">
          <div class="tab-item">
            <span class="num">¥3430</span>
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
      <div v-if="courseStep == '5'" @click="newUserNextBtn('5')" class="tutorial1-5">
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



      <!--新手引导弹层  (14)-->
      <div v-if="courseStep == '14'" @click="newUserNextBtn('14')" class="tutorial5">
        <div class="content">

          <div class="head-info">
            <div class="tab-item">
              <span class="num"></span>
              <span class="title"></span>
            </div>
            <div class="tab-item" style="background:#fff">
              <span class="num red">¥181.2</span>
              <span class="title">可用工资</span>
            </div>
            <div class="tab-item">

            </div>
          </div>

          <div class="submit-text">
            <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            <div class="text">这是你的可用工资总额</div>
          </div>


          <div class="player">
            <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            <div class="text">点击任意位置去选择选手</div>
          </div>


          <div style="width:calc(100% - 56px);position:absolute;top:448px;box-shadow:none;" class="battle-array-list-box">
            <div class="content">
              <div class="item avatar">
                <img class="bg" src="../assets/image/pic_team_bg_default@2x.png" alt="">
                <img class="photo" src="../assets/image/pic_photo_team_imp_default@2x.png" alt="">
              </div>
              <div class="item team-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-JUGx"></use>
                </svg>
              </div>
              <div class="item select-team">
                <span>JUG</span>
              </div>
              <div class="item select-text">
                <span>点击添加选手</span>
              </div>
              <div class="item icon-label">
                <i class="iconfont plus">&#xe652;</i>
              </div>
            </div>
          </div>

        </div>
      </div>


      <!--新手引导弹层  (16)--->
      <div v-if="courseStep == '16'" @click="newUserNextBtn('16')" class="tutorial7">
        <div class="content">



          <div class="footer-desc">
            <div class="desc-text">
              <div class="text">查看信息<br>调整阵容</div>
              <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            </div>
            <div class="desc-text">
              <div class="text">查看更多<br>比赛场次</div>
              <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            </div>
            <div class="desc-text">
              <div class="text">用当前阵容<br>参加更多房间</div>
              <div class="icon"><i class="iconfont">&#xe6e3;</i></div>
            </div>
          </div>
          <div class="footer-button">
            <button class="button">进入房间</button>
            <button class="button">返回大厅</button>
            <button class="button active">快速加入更多</button>
          </div>


        </div>
      </div>

    </div>
</template>

<script>
import Vue from "vue";
import store from "store";
import HeadTop from "../components/header.vue";
import Countdown from "../components/Countdown.vue";
import BattleArray from "../components/Battlearray.vue";
import DialogPay from "../components/dialogPay.vue";
import DialogConfirm from '../components/DialogConfirm.vue'
import PositionIcon from "../components/PositionIcon";

export default {
  name: "selected",
  data() {
    return {
      courseStep:'',
      courseShow:false,

      room_type: [
        {type: 1, value: "新手"},
        {type: 2, value: "活动"},
        {type: 3, value: "日赛"},
        {type: 4, value: "周赛"},
        {type: 5, value: "SOLO"},
        {type: 6, value: "名人"},
        {type: 7, value: "毒奶房"},
        {type: 9, value: "自定义房间"}
      ],
      playerListLight: false,
      shareShow: false,
      cur_salary_cap: 0,
      hTitle: "选择阵容",
      message: "正在倒计时",
      endTime: "",
      orderShow: false,
      orderId: "",
      orderCount: 1,
      leval,
      tabIndexValue: 0,//0:列表视图   1:地图视图
      room_info: "",
      room_player: "",
      typeStyle: ["", "积分", "门票", "其它"],
      cur_player: {
        TOP: "",
        JUG: "",
        MID: "",
        ADC: "",
        SUP: ""
      },
      pic_img: [
        "static/images/avater_default_1.png",
        "static/images/avater_default_2.png",
        "static/images/unknow_2.png",
        "static/images/tx_pic.jpg",
        "static/images/icon_avatar@2x.png"
      ],
      cur_avg_score: 0,
      cur_value: 0,
      isRemove: false,
      roomID: "",
      time: "",
      flag: false,
      isEdit: false,
      isLists: 0,
      inMove: 0,
      params: "",
      secret_key: "",
      ssdb_key: "",
      isSecretkey: 2, //1:group_id 订单支付  2：支付完成 复制房间号
      linkHref: "",
      member_info: "",
      vShow: false,
      payList: {
        status: "",
        isPrompt: false,
        msg_text: "",
        isTickts: "",

        group_ticket: "",
        key: "",
        my_key: "",
        my_ticket: ""
      },
      share_show_success: false,
      isSort:{ //身价是否超过工资帽
        status:0,  //0:身价未超过   1：超过
        text:'确认提交',
      },
      order_ED:true, // 订单是否能开始提交
    };
    },
    created() {
        this.$root.hub.$on("recommendButtonSuccess", _ => {
            this.recommendButton();
            this.playerListLight = true;
        });
            this.$root.hub.$on("submitButton", _ => {
            this.createSubBtn(this.params.salary_cap, this.cur_value);
        });
        this.$root.hub.$on("selected_submit_order", _ => {
            //先判断是否存在curPlayer
            this.orderSubmit(this.room_info.ticket,parseInt(this.room_info.price) * this.orderCount);
        });
        this.member_info = store.get("member_info");
        if (this.member_info == undefined) {
            this.$router.push({
                path: "/home"
            });
        }


    },
    mounted() {
      this.new_player();
      this.curPlayer();

      console.log('created tabIndexValue ='+store.get('tabIndexValue'));

      //设置UI类型
      store.get('tabIndexValue') == 1 ? store.set('tabIndexValue', 1) : store.set('tabIndexValue', 0);
      this.tabIndexValue = store.get('tabIndexValue');

      this.courseStep = store.get("new_user_step");
    },
    components: {
      PositionIcon,
      countDown: Countdown,
      battleArray: BattleArray,
      headTop: HeadTop,
      dialogPay: DialogPay,
      DialogConfirm:DialogConfirm
    },

    watch: {
      $route() {
        this.curPlayer();
      }
    },
    computed: {
      member () {
        return this.$store.state.member
      },
      roomData () {
        return this.$store.state.roomData
      },
      orderInfo (){
        return this.$store.state.orderInfo
      },
      cacheRoomInfo () {
        return this.roomData.roomDetailHashMap[this.$route.query.roomID]
      },
      roomInfo () {
        if (this.cacheRoomInfo) {
          return this.cacheRoomInfo
        } else {
          return this.roomData.listArray.find(room => this.$route.query.roomID == room.roomID);
        }
      },
    },
    methods: {
      /**
       * 设置新手任务按钮动作
       * @parameter step 任务步骤
       * @return
       * **/
      newUserNextBtn(step){
        console.log(`set step ${step}`);
        if(step == '2'){
          this.recommendButton();
          store.set("new_user_step",'3');
          this.courseStep = '3';
        }else if(step == '3'){
          this.createSubBtn(this.room_info.salary_cap,this.cur_value);
          store.set("new_user_step",'4');
          this.courseStep = '4';
        }else if(step == '4'){
          this.orderSubmit(this.room_info.ticket,this.room_info.price * this.orderCount)
          store.set("new_user_step",'5');
          this.courseStep = '5';
        }else if(step == '5'){
          store.set("new_user_step",'6');
          this.courseStep = '6';
          this.setNewUserTask(1);//第1阶段完成
          this.$refreshUserInfo();//刷新用户信息
          this.$router.push({path: '/home', query: {}});
        }else if(step == '14'){
          this.courseStep = '15';
          store.set("new_user_step",'15');
          this.setNewUserTask(5);//第5阶段完成
          this.$refreshUserInfo();//刷新用户信息
          //this.$router.push({path: '/ChoosePlayer', query: {positionID: 4}});
        }else{
          this.courseStep = ''
        }
      },
      /**
       * 更新服务端新手任务步骤
       * @parameter  step 步骤
       * @return
       * **/
      setNewUserTask(step){
        if(store.get('member_info').is_new_user != "" && store.get('member_info').is_new_user != '0'){
          this.$api('/services/task/finish_task.php', {
            finish_type_id:step,
          }).then(response => {
            if (response.code == 200) {
              this.$repeatLogin;
            }else{
              layer.open({
                content: response.message,
                btn: '关闭'
              });
            }

          });
        }
      },
      linkRoom() {
        this.$router.push({
          path: "/Roominfo",
          query: {
            roomID: this.$route.query.roomID,
            orderId: this.orderId
          }
        });
      },
      linkMatch() {
        store.remove("checkArray");
        this.$router.push({
          path: "/matchRoom",
          query: {
            orderId: this.orderId,
            homeId: this.$route.query.roomID
          }
        });
      },
      linkHome() {
        this.$router.push({
          path: "/home"
        });
      },
      new_player(){
        //新手引导
        if(this.$route.query.isNewuUser){
          this.isNewUser = this.$route.query.isNewuUser;
        }

      },
      RoomInfo() {
        //改进空间，非编辑房间接口调用vuex
        var _this = this;
        this.$api("/services/fantasy/room_info.php", {
          roomID: this.$route.query.roomID
        }).then(response => {
          if (response.code == 200) {
            _this.room_info = response.data;
            _this.endTime = _this.room_info.at_end_time;
            _this.cur_salary_cap = _this.room_info.salary_cap;
            if (_this.room_info.type == 8) {
              _this.isLists = 1;
            }
            if (_this.room_info.type != 8) {
              if (parseInt(_this.room_info.times) - parseInt(_this.room_info.member_at_times) <=0) {
                _this.orderCount = 0;
              }
            }
            store.set("room_info", _this.room_info);
          } else {
            layer.open({
              content: response.message,
              btn: "关闭"
            });
          }
        });
      },
      //更改UI视图
      tabIndex(tabIndex) {

        this.tabIndexValue = tabIndex;
        store.set('tabIndexValue', tabIndex);
        console.log('tabIndex='+this.tabIndexValue);
        console.log('store tabIndex='+store.get('tabIndexValue'));
      },
      dialogClose: function() {
        this.orderShow = false;
        this.isEdit = false;
      },
      change(msg) {
        this.vShow = msg;
        this.RoomInfo();
        // console.log(msg)
      },
      //提交阵容
      createSubBtn (salary_cap, cur_value) {

        if (
          this.cur_player.TOP != "" &&
          this.cur_player.JUG != "" &&
          this.cur_player.MID != "" &&
          this.cur_player.ADC != "" &&
          this.cur_player.SUP != ""
        ) {
          if (salary_cap - cur_value < 0) {
            layer.open({
              content: "超过可用工资上限",
              btn: "关闭"
            });
          } else if (this.hTitle == "选择阵容") {
            if (this.room_info.type == 8) {
              this.orderCount = 1;
            }
            if (this.secret_key != "") {
              this.isSecretkey = 2;
            } else {
              this.isSecretkey = 1;
            }
            this.orderShow = true;
            //订单提交
          } else {
            if (this.room_info.type == 8) {
              this.orderCount = 1;
            }
            this.isEdit = true;
          }
        } else {
          layer.open({
            content: "请完善阵容",
            btn: "关闭"
          });
        }
      },
      //增加
      addsBtn (totalCount) {
        if (this.orderCount < totalCount) {
          this.orderCount ++;

          if ( parseInt(this.orderCount) * parseInt(this.room_info.price) > parseInt(this.room_info.ticket)) {
            this.isSort.status = 1;
            this.isSort.text = '门票不足';
          } else {
            this.isSort.status = 0;
            this.isSort.text = '确认提交';
          }
          if (this.orderCount == totalCount) {
            return false;
          }
        } else {
          this.orderCount = totalCount;

        }
      },
      //减少
      minusBtn () {
        if (this.orderCount == 0) {
          this.orderCount = 0;
        } else if (this.orderCount > 1) {
          this.orderCount --;
          if ( parseInt(this.orderCount) * parseInt(this.room_info.price) > parseInt(this.room_info.ticket)) {
            this.isSort.status = 1;
            this.isSort.text = '门票不足';
          } else {
            this.isSort.status = 0;
            this.isSort.text = '确认提交';
          }
          if (this.orderCount == 1) {
            return false;
          }
        } else {
          this.orderCount = 1;
        }
      },
      orderEdit(active) {
        if(!active){
          this.dialogClose();
          return false;
        }


        var roomID = store.get("roomID");
        var _this = this;
        this.$api("/services/fantasy/edit_order.php", {
          order_id: roomID.order_id,
          roomID: roomID.roomID,
          p1: _this.cur_player.ADC.playerID,
          p2: _this.cur_player.MID.playerID,
          p3: _this.cur_player.TOP.playerID,
          p4: _this.cur_player.JUG.playerID,
          p5: _this.cur_player.SUP.playerID
          // pass:true
        }).then(response => {
          // 订单成功后，清除roomID，清除room_info，清除user，清除room_player
          if (response.code == 200) {
            store.remove("roomID");
            store.remove("room_info");
            store.remove("user");
            store.remove("room_player");
            //					_this.$router.push({ path:'/my'})
            _this.$router.push({
              path: "/Roominfo",
              query: {
                roomID: _this.$route.query.roomID,
                orderId: _this.$route.query.order_id,
                index: 0
              }
            });
          } else {
            layer.open({
              content: response.message,
              btn: "关闭"
            });
          }
        });
      },
      orderSubmit(ticket, price) {
      var roomID = store.get("roomID");
      var _this = this;
      console.log(_this.cur_player.ADC.playerID);
      if ((parseInt(ticket) - parseInt(price)) < 0) {
        _this.payList.group_ticket = price;
        _this.payList.my_ticket = ticket;
        _this.orderShow = false;
        _this.payList.status = 7;
        _this.payList.msg_text = "您的门票不足";
        _this.payList.isTickts = true;
        _this.vShow = true;
      } else {
        if (this.order_ED == true) {
            this.order_ED = false;
          this.$api("/services/fantasy/create_order.php", {
            qid: store.get("loginInfo").type,
            roomID: roomID.roomID,
            p1: _this.cur_player.ADC.playerID,
            p2: _this.cur_player.MID.playerID,
            p3: _this.cur_player.TOP.playerID,
            p4: _this.cur_player.JUG.playerID,
            p5: _this.cur_player.SUP.playerID,
            num: _this.orderCount
          }).then(response => {
            // 订单成功后，清除roomID，清除room_info，清除user，清除room_player
            if (response.code == 200) {
              //赋值orderId
              _this.orderId = response.data.order_id;

              _this.orderShow = false;
              _this.shareShow = true;


              //member_info 减除消耗
              var member_info = store.get('member_info');
              member_info.ticketCount = parseInt(member_info.ticketCount) - parseInt(price);
              store.set('member_info',member_info);

              store.remove("roomID");
              store.remove("room_info");
              store.remove("user");
              store.remove("room_player");

              _this.share_show_success = true;
              setTimeout(function() {
                _this.share_show_success = false;
              }, 2000);


              /**判断是否新手提交**/
              if(store.get("new_user_step") == '15'){
                store.set("new_user_step",'16');//更新步骤为16
                this.courseStep = '16';
                this.setNewUserTask(6);//设置第6阶段完成
                this.$refreshUserInfo();//更新用户信息
              }

            } else {
              layer.open({
                content: response.message,
                btn: "关闭"
              });
              _this.orderShow = false;
            }
            _this.order_ED = true;
          });
        } else {
          layer.open({
            content: '你的手速太快，请勿多次提交。',
            btn: "关闭"
          });
        }
      }

    },
      groupSubmit() {
        //			console.log(this.params);
        var _this = this;
        this.$api("/services/fantasy/create_group_room.php", {
          group_id: _this.params.group_id,
          name: _this.params.name,
          room_desc: _this.params.room_desc,
          group_ticket: _this.params.group_ticket,
          group_member_num: _this.params.group_member_num,
          assign_plan: _this.params.assign_plan,
          p1: _this.cur_player.ADC.playerID,
          p2: _this.cur_player.MID.playerID,
          p3: _this.cur_player.TOP.playerID,
          p4: _this.cur_player.JUG.playerID,
          p5: _this.cur_player.SUP.playerID
        }).then(response => {
          if (response.code == 200) {
            _this.secret_key = response.data.secret_key;
            _this.ssdb_key = response.data.ssdb_key;
            _this.isSecretkey = 2;
            //          _this.copyLink(_this.secret_key,response.data.data.ssdb_key);
          }
        });
      },
      friendLink(secret_key, ssdb_key) {
        var _this = this;
        this.$api("/services/fantasy/room_into.php", {
          secret_key: secret_key
        }).then(response => {
          if (response.code == 200) {
            store.remove("group");
            var roomID = response.data.roomID;
            _this.$router.push({
              path: "/Roominfo",
              query: {
                roomID: roomID,
                orderId: ssdb_key,
                secret_key: secret_key
              }
            });
          }
        });
      },
      removeBtn() {
        this.inMove = 0;
        this.isRemove = true;
      },
      //是否取消阵容弹层确认
      removeAction(action){
        if(!action){
          this.inMove = 1;
          this.isRemove = false;
          return false;
        }


        var cur_player = {
          TOP: "",
          JUG: "",
          MID: "",
          ADC: "",
          SUP: ""
        };

        // 清除选中
        this.cur_player = cur_player;
        store.remove("user");
        this.cur_avg_score = 0;
        this.cur_value = 0;
        this.isRemove = false;
      },
      recommendButton () {
        var _this = this;
        if (this.$route.query.roomID) {
          //			  var roomID = store.get('roomID');
          var room_id = this.$route.query.roomID;
        } else {
          var room_id = "";
        }
        if (this.$route.query.group_id) {
          var groupID = this.$route.query.group_id;
        } else {
          var groupID = "";
        }
        this.$api("/services/fantasy/recommend_lineup.php", {
          roomID: room_id,
          groupID: groupID
        }).then(response => {
          if (response.code == 200) {
            if (response.data.list == "") {
              layer.open({
                content: "暂无灵活组排",
                btn: "关闭"
              });
            } else {
              _this.cur_player.TOP = response.data.list[0].top;
              _this.cur_player.JUG = response.data.list[0].jun;
              _this.cur_player.MID = response.data.list[0].mid;
              _this.cur_player.ADC = response.data.list[0].adc;
              _this.cur_player.SUP = response.data.list[0].sup;
              store.set("user", {
                cur_player: _this.cur_player
              });
              _this.curPlayer();
            }
          } else {
            layer.open({
              content: response.message,
              btn: "关闭"
            });
          }
        });
      },
      curPlayer () {
        // 选中数据
        // console.log(this.cur_player);
        if (this.$route.query.roomID) {
          this.RoomInfo();
          if (this.$route.query.order_id) {
            store.set("roomID", {
              roomID: this.$route.query.roomID,
              order_id: this.$route.query.order_id
            });
            this.hTitle = "编辑阵容";
          } else {
            store.set("roomID", {
              roomID: this.$route.query.roomID,
              order_id: ""
            });
            this.hTitle = "选择阵容";
          }
        } else if (this.$route.query.group_id) {
          var params = store.get("group");
          this.params = params;
          this.endTime = this.$route.query.at_end_time;
          this.cur_salary_cap = this.$route.query.salary_cap;
        }

        // this.room_info = store.get('room_info')
        // this.endTime = this.room_info.at_end_time;

        var user = store.get("user");
        if (user == undefined) {
          //	   			this.RoomInfo()
          console.log('123');
          this.removeAction(true);
          // return false;
        } else {
          this.cur_player = user.cur_player;
          //console.log(this.cur_player);
          if (this.cur_player.TOP != "") {
            var TOP_avg_score = this.cur_player.TOP.score;
            var TOP_value = this.cur_player.TOP.value;
            var TOP_value = this.cur_player.TOP.value;
          } else {
            var TOP_avg_score = 0;
            var TOP_value = 0;
          }
          if (this.cur_player.JUG != "") {
            var JUG_avg_score = this.cur_player.JUG.score;
            var JUG_value = this.cur_player.JUG.value;
          } else {
            var JUG_avg_score = 0;
            var JUG_value = 0;
          }
          if (this.cur_player.MID != "") {
            var MID_avg_score = this.cur_player.MID.score;
            var MID_value = this.cur_player.MID.value;
          } else {
            var MID_avg_score = 0;
            var MID_value = 0;
          }
          if (this.cur_player.ADC != "") {
            var ADC_avg_score = this.cur_player.ADC.score;
            var ADC_value = this.cur_player.ADC.value;
          } else {
            var ADC_avg_score = 0;
            var ADC_value = 0;
          }
          if (this.cur_player.SUP != "") {
            var SUP_avg_score = this.cur_player.SUP.score;
            var SUP_value = this.cur_player.SUP.value;
          } else {
            var SUP_avg_score = 0;
            var SUP_value = 0;
          }
          var cur_avg_score =
            parseFloat(TOP_avg_score) +
            parseFloat(JUG_avg_score) +
            parseFloat(MID_avg_score) +
            parseFloat(ADC_avg_score) +
            parseFloat(SUP_avg_score);
          this.cur_avg_score = parseFloat(cur_avg_score).toFixed(1);

          this.cur_value =
            parseInt(TOP_value) +
            parseInt(JUG_value) +
            parseInt(MID_value) +
            parseInt(ADC_value) +
            parseInt(SUP_value);
        }
        // console.log(this.cur_player);
      }
    },

};
</script>

<style scoped lang="stylus">


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
        margin-left: -280px;
      }
      .icon{
        height:60px;text-align:center;margin:0 auto;
        position: absolute;
        bottom: 100px;
        left: 50%;
        width: 100%;
        margin-left: -260px;
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
        bottom: 35px;
        left: 50%;
        margin-left: 10px;
      }

    }

  }


  /* 新手引导 */
  .tutorial1-3{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;height:100%;position:relative;z-index:2;


      .icon-label{
        margin-right:10px;
        span{
          text-align center;
        }
      }

      .player{
        width: 100%;
        position: absolute;
        left:30px;
        top: 560px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width:100%;height:60px;margin-left:60px;
          i {
            display inline-block;
            transform rotate(180deg);
            color:#5348FF;font-size:28px;
          }
        }
      }


      .submit-text{
        position: absolute;
        right:0px;
        top: 210px;


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
        top: 124px;
      }

    }




  }


  /* 新手引导 */
  .tutorial1-4{
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
  .tutorial1-5{
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
        top: 590px;


        .text{
          font-size:32px;font-weight:bold;color:#fff;
        }
        .icon{
          width:100%;height:60px;margin-left: 160px

          i {
            display inline-block;
            color:#5348FF;font-size:28px;
            transform rotate(180deg);
          }
        }
      }

      .icon-label{
        margin-right:20px;
        background:none;
      }


      .submit-text{
        position: absolute;
        left: 250px;
        top: 240px;


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
  .tutorial7{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    background:rgba(0,0,0,0.85);

    .content{
      width:100%;

      .footer-desc{
        margin-top:30px;
        padding: 48px;
        display flex;
        justify-content space-between;
        align-items center;
        width 100%;
        position absolute;
        bottom:50px;

        .desc-text{
          width:200px;
          padding:0px 18px 18px;

          .text{
            width: 100%;font-size:26px;font-weight:bold;color:#fff;text-align center;
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
      }


      .footer-button{
        margin-top:30px;
        padding:30px 48px;
        display flex;
        justify-content center;
        align-items center;
        background: none;
        position fixed;
        z-index:10;
        bottom 20px;
        width 100%;

        .button{
          width:200px;
          margin:0 10px;
          height:72px
          border-radius:12px;
          background #fff;
          border:1px solid;
          font-size:24px;
          color:#5348FF;
        }
      }


    }


    .next-btn{
      width:172px;height:64px;line-height:64px;
      text-align:center;background:#5348FF;color:#fff;
      font-size:24px;margin:0 auto;margin-top:40px;border-radius:12px;
    }

  }



  @import '../assets/styl/selected.styl';
  * {
    font-size: inherit;
  }









  .head-top{
    position:fixed;
    width:100%;
    top:0;
    z-index:50;
  }




  .create_team_avatar{
    height:120px;

    .create_team_logo{
      width:154px;
      height:120px;
    }
    .avatar{
      width:120px;
      height:120px;
    }

  }
  .create_list_role{
    height:120px;
    line-height: 120px;
  }
  .create_list_dec {
    width: 160px;
    margin-right: 12px;
    margin-top: 20px;
    font-size:22px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:32px;
  }
  .create_list_dec p {
    line-height: 36px;
    color: #B2B0D2;
    display block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .create_list_dec p:first-Child {
    line-height: 42px;
    font-size: 28px;
    color: #5B579A;
  }

  .create_list_score {
    width: 95px;
    line-height: 120px;
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;

  }

  .create_list_price {
    width: 56px;
    height: 120px;
    line-height: 120px;
    margin-right: 12px;
    margin-top: 0px;
    align-items: center;
    display: flex;


    .choose_inactive {
      display: inline-block;
      font-size: 16px;
      color: #fff;
      background: #ffb310;
      height: 30px;
      line-height: 30px;
      width: 56px;
      text-align: center;
      border-radius: 4px 4px;
    }
  }

  .create_def_dec p{
    font-size:24px;
  }

  .create_def_dec {
    width: 330px;
    height: 120px;
    line-height: 130px;
  }
  .create_list_add{
    width: 80px;
    margin-top: 35px;

    i.iconfont{
      font-size: 48px;
      color:#4940ff;
    }
  }












  .bg-blue{
    background #5348FF;
  }
  .select-squad-map{
    width 588px;
    height 788px;
    margin 0 auto;
    margin-top:10px;
    padding-top:100px;
    padding-bottom:100px;
    margin-bottom:140px;

    background url("../assets/image/squad-map@2x.png") no-repeat center center;
    position:relative;


    .item{
      width:280px;
      position:absolute;

      span{
        width 100%;
        display block;
        text-align center;
      }

      .team-info{
        margin-top:-6px;
        width:280px;
        padding:0 20px;
        height:72px;
        background:#fff;
        border-radius:36px;
        display flex;
        justify-content space-between;
        align-items center;
        font-size:20px;
        color:#5348FF;

        span:first-child{
          width 50px;
          img {
            width 40px;
            height 40px;
          }
          i.iconfont{
            font-size:38px;
          }
        }
        span:last-child{
          width 50px;
          svg {
            width: 40px;
            height: 40px;
          }
        }

        .text {
          width 100%;
          padding-left:10px;
          color:#5B579A;

          span{
            width 100%;
            display block;
            text-align left;
          }
          em{
            color:#EF1B5A;
            font-style normal;
          }
        }

      }
    }

    .item:nth-child(1){
      top:0px;
      left:-35px;
    }
    .item:nth-child(2){
      top:0px;
      right:-35px;
    }
    .item:nth-child(3){
      top: 250px;
      left: 150px;
    }
    .item:nth-child(4){
      left:-35px;
      bottom: 0px;
    }
    .item:nth-child(5){
      bottom: 0px;
      right:-35px;
    }


  }




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
      position absolute;
      left:0;
      top:0;
      z-index 1;
    }
    .modal-content{
      width:540px;
      height:656px;
      border-radius:12px;
      color:#B2B0D2;
      font-size:28px;
      overflow hidden;
      position relative;
      z-index 100;


      .title{
        width 100%;
        height 108px;
        line-height @height;
        text-align center;
        //background #5348FF;
        color:#fff;
        font-size:36px;

        background:#5348FF url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTE1NjVDNzAwMTA5MTFFOThEMDJDNkFENTFDQUY4NTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTE1NjVDNzEwMTA5MTFFOThEMDJDNkFENTFDQUY4NTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RkZBN0Y3RjAxMDgxMUU5OEQwMkM2QUQ1MUNBRjg1MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RkZBN0Y4MDAxMDgxMUU5OEQwMkM2QUQ1MUNBRjg1MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph+FSGAAAABmSURBVHjaYvz//z8DNQELHjlZIA4GYncgNoaKnQXinUC8FogfY9UFciEWbAnEG/7jBhugajD0YjNMloBhyIbKEmNgwX/iQQG6fiYsoeBOQhxgqGXEEsuvgFiUSANfA7EYsgBAgAEABPHcEYzOSnUAAAAASUVORK5CYII=") bottom repeat-x;

      }


      .modal-body{
        background:#fff;
        border-radius:0 0 12px 12px;
        padding-bottom:34px;

        .title-line{
          height 6px;
          margin-top:-1px;
          //background-image: radial-gradient(circle, transparent, transparent 10px, #5348FF 10px, #5348FF);
          //background-size: 20px 20px;

        }

        .price{
          padding:0 28px;
          height 80px;
          display flex;
          justify-content space-between;
          align-items center;

          span:last-child {
            color:#5B579A;

            i {
              color:#4EC6FC;
            }
          }
        }
        .price_ticket{
          margin-top:20px;
          padding:0 28px;
          display flex;
          justify-content space-between;
          align-items center;

          span:last-child {
            color:#5B579A;

            i {
              color:#4EC6FC;
            }
          }
        }


        .change-num{
          height 186px;
          padding:0 28px;
          background #F8F7FA;
          display flex;
          justify-content space-between;
          align-items center;
          position:relative;

          .subtitle{
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(178,176,210,1);
            line-height:40px;
            position absolute;
            left:28px;
            top:20px;
          }
          .num{
            font-size:48px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            line-height:66px;
            margin-top:30px;

            span{
              color:#5348FF;
            }
          }
          .reduce{
            margin-top:30px;
          }
          .add{
            margin-top:30px;
          }
        }

        .button{
          width:448px;
          height:84px;
          margin 0 auto;
          margin-top:40px;
          background:linear-gradient(137deg,#8B48FF 0%,#5348FF 100%);
          box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
          border-radius:12px;
          color:#fff;
          font-size:28px;
          display block;
          text-align center;
        }
      }

    }
  }











  body{
    overflow-x: hidden;
  }
  .main{
    padding-bottom:80px;
    position:absolute;
    height 100%;
    min-height: 1300px;
    width 100%;
  }

  .head-info{
    position:fixed;
    width:100%;
    top:90px;
    height:140px;
    padding:0 80px;
    z-index:50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background #fff;


    .tab-item{
      flex-shrink:0;
      display:block;
      width:140px;
      /*height: 40px;*/
      line-height: 20px;
      text-align: center;
      color: #B2B0D2;
      position: relative;

      span{
        display block;
        text-align center;
        color:#5B579A;
      }
      span.red{
        color:#EF1B5A;
      }
      .num{
        font-size: 36px;
        color: #5b579a;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
      }

      .title{
        //margin-top: 20px;
        font-size: 22px;
        color:#B2B0D2;
        /*font-weight bold;*/
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


  .end-time{
    color:#5B579A;
    padding:20px;
    text-align center;
    font-size:22px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    line-height:32px;
    margin-top:230px;
  }
  .end-time.map{
    color:#fff;
  }

  section.list {
    margin-bottom:140px;
  }
  .icon-label{
    width:56px;
    height:28px;
    background:#5348FF;
    border-radius:6px;
    font-size:16px;
    color:#fff;
    display inline-flex;
    justify-content center;
    align-items center;

  }
  .icon-label.choose_zhuli{
    background:#5348FF;
  }
  .icon-label.choose_tibu{
    background:#5348FF;
  }
  .icon-label.choose_inactive{
    background:#ffb310;
  }



  .battle-array-list-box{
    min-height:120px;
    margin:0 28px 28px 28px;
    border-radius:12px;
    overflow: hidden;
    background:#fff;
    box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);

    .create_list_avatar{
      width:170px;
    }


    .content{
      height:120px;




      display flex;
      align-items center;
      justify-content space-between;


      .item{
        display flex;
        align-items center;
        flex-wrap wrap;

        span{
          width 100%;
          display block;
        }
        .icon{
          width 34px;
          height 34px;
        }
        .plus{
          font-size:32px;
          color:#5451fb;
        }
      }

      .avatar{
        width 220px;
        height 100%;
        position relative;

        .bg{
          position absolute;
          z-index 1;
        }
        .photo{
          position absolute;
          z-index 2;
        }
        img {
          max-height 100%;
        }
      }

      .team-icon{
        width 30px;
      }

      .select-team{
        width 50px;
        color:#5B579A;
        font-s0ze:22px;
        font-weight:bold;
      }
      .select-text{
        width 260px;
        color:#B2B0D2;
        font-size:24px;
      }

      .money{
        width 100px;
        padding-left:20px;
        font-weight bold;

        span:first-child{
          color:#5B579A;
          font-size:28px;
        }
        span:last-child{
          font-size:24px;
          color:#EF1B5A;
        }
      }



      .team{
        color:#5B579A;
        font-size:20px;
        font-weight bold;

        span:last-child{
          font-size:18px;
          color:#B2B0D2;
          font-weight normal;
        }

      }


      .score{
        text-align center;
        color:#B2B0D2;
        font-size:18px;

        span:first-child{
          font-size:24px;
          color:#5348FF;
          font-weight bold;
        }
        span:last-child{

          .control{
            font-size: 27px;
            color: #5451fb;
            transition: all 0.3s;
          }

          i {
            font-size: 27px;
            color: #5451fb;
            transition: all 0.3s;
          }
          i.active{
            font-size: 27px;
            color: #5451fb;
            display: inline-block;
            transform: rotate(180deg);
          }
        }
      }


    }


  }





  .footer-button{
    margin-top:30px;
    padding:30px 48px;
    display flex;
    justify-content center;
    align-items center;
    background #fff;
    position fixed;
    bottom 0;
    width 100%;

    .button{
      width:200px;
      margin:0 10px;
      height:72px
      border-radius:12px;
      background none;
      border:1px solid;
      font-size:24px;
      color:#5348FF;
    }
  }



  .success-page{
    position fixed;
    z-index:999;
    top:0;
    bottom:0;
    width 100%;
    height: 100%;
    overflow-y:auto;-webkit-overflow-scrolling:touch;
    background url("../assets/image/detail_bg@2x.jpg") no-repeat left top;
    background-size cover auto;


    .page-content{
      position absolute;
      width 100%;
      height: 100%;
    }


    .head-info{
      height:140px;
      padding:0 80px;
      margin-top:60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: none;
      position absolute;

      .tab-item{
        flex-shrink:0;
        display:block;
        width:140px;
        /*height: 40px;*/
        line-height: 20px;
        text-align: center;
        color: #B2B0D2;
        position: relative;



        span{
          display block;
          text-align center;
          color:#5B579A;
        }
        span.red{
          color:#EF1B5A;
        }
        .num{
          font-size:40px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#fff;
          line-height:56px;
        }

        .title{
          margin-top: 20px;
          font-size: 22px;
          font-size:24px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#fff;
        }

        figure {
          width 120px;
          height 120px;
          overflow: hidden;
          border-radius @height;

          img {
            width 120px;
            height 120px;
          }
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


    .success-content{
      padding:28px;margin-top:340px;
    }

    .room-list-box{
      /*height:268px;*/
      margin-bottom:28px;
      box-shadow:0px 12px 8px -8px rgba(241,237,255,0.5);
      border-radius:12px;
      overflow: hidden;

      .head{
        height:96px;
        color:#fff;
        background:rgba(83,72,255,1);
        box-shadow:0px 1px 0px 0px rgba(241,237,255,0.5);
        border-radius:12px 12px 0 0;
        padding:0 10px;
        display flex;
        align-items center;

        img {
          width 92px;
          height 92px;
        }

        .title{
          flex-wrap:wrap;
          flex-grow:1;
          margin-left:20px;

          span{
            display block;
            width 100%;
          }
          span:nth-child(1){
            font-size 28px;
            color:#fff;
          }
          span:nth-child(2){
            font-size:22px;
            color:#9B95FF;
          }
        }
        .subtitle{
          width 190px;
          padding-right:10px;
          flex-wrap:wrap;
          justify-content flex-end;

          span{
            display block;
            text-align right;
            width 100%;
          }
          span:nth-child(1){
            font-size 28px;
            color:#fff;
          }
          span:nth-child(2){
            font-size:22px;
            color:#9B95FF;
          }
        }

      }



      .room-content{
        background:#fff;
      }


      .content{
        padding:20px;


        .item{
          width 100%;
          height 56px;
          margin-top: 2px;
          flex-wrap wrap;
          background #F8F7FA;
          display flex;
          justify-content space-between;
          align-items center;
          font-size:28px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          line-height:40px;

          span{
            padding: 0 20px;
          }
          span:first-child{
            color:#B2B0D2;
          }
          span:last-child{
            color:#5348FF;
          }

        }


      }


      .battle-array{
        width:100%;
        //height:342px;
        background:#fff;
        padding:10px 24px;

        .average-score{
          padding-top:22px;
          display flex;
          justify-content space-between;
          align-items center;
          border-top:1px solid #f4f3fc;

          span{
            font-size:28px;
            font-weight:bold;
            color:#5B579A;
          }
          span:last-child{
            width:88px;
            height:40px;
            background:rgba(83,72,255,1);
            border-radius:12px;
            font-size:24px;
            color:#fff;
            display flex;
            justify-content center;
            align-items center;
          }
        }

        .team{
          //width:calc(100% / 5);
          margin-bottom:14px;
          display flex;
          justify-content space-between;

          .iconfont{
            font-size:24px;
          }

          .item{
            margin-top: 20px;
            width:calc(100% / 5 - 11px);

            div{
              display inline-flex;
              align-items center;
              font-size:20px;
              color:#B2B0D2;
            }

            .player-text{
              display block;
              font-size:24px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#5B579A;
              line-height:34px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .player-team-text{
              font-size:20px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#B2B0D2;
              line-height:28px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .photo{
              margin-top:8px;
              height 144px;
              display flex;
              align-items flex-end;
              position relative;

              .bg{
                position absolute;
                z-index 1;

                img {
                  width:118px;
                  height:146px;
                }
              }
              .avatar{
                position absolute;
                z-index 2;


                img {
                  width:120px;
                  height:120px;
                }
              }
              .score{
                position absolute;
                z-index 2;
                top:0;right 0;
                color:#5B579A;
                font-weight bold;
                font-size:18px;
              }
            }
            div:nth-child(3){
              margin-top:8px;
              font-size:24px;
              color:#5B579A;
            }
            div:nth-child(4){
              margin-top:8px;
            }



          }


        }

      }
    }


    .footer-button{
      margin-top:30px;
      padding: 48px;
      display flex;
      justify-content space-between;
      align-items center;
      /*position fixed;*/
      position absolute;
      z-index 100;
      bottom 0;
      width 100%;
      background: none;

      .button{
        width:200px;
        height:72px
        border-radius:12px;
        background #fff;
        border:1px solid transparent;
        font-size:24px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        line-height:56px;
        color:#5B579A;
      }
      .button.active{
        background:linear-gradient(137deg,#8B48FF 0%,#5348FF 100%);
        color:#fff;
      }
    }


  }
</style>
