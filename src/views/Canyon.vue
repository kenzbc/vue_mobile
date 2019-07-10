<template>
  <div class="main">

    <header>
      <span @click="headerMenuBtn" class="left h-menu"><img src="../assets/image/icon_24pt_general_24_category@2x.png" width="48"></span>
      <span style="display:none;">ST:{{localTimeS}}、LT:{{60-localTimeS}}、CD:{{(60-30-localTimeS >= 0)?60-30-localTimeS:'--'}}</span>
      <span class="right h-money">
        <span><img src="../assets/image/jinbi_icon@2x.png" width="24"> <span id="myGuozi" class="counter-1">{{myInfo.myGuozi}}</span></span>&nbsp;&nbsp;
        <span><img src="../assets/image/icon_12_fruit@2x.png" width="24"> <span id="myMoney" class="counter-2">{{myInfo.myMoney}}</span></span>

        <span v-if="rechargeShow" class="plus" @click="rechargeBtn()" v-show="rechargeShow"><img src="../assets/image/icon_24_add@2x.png" width="48"></span>
      </span>
    </header>

    <!--左上角菜单-->
    <div v-if="isHomeMenuShow" @click="isHomeMenuShow = false" class="home-menu-modal">
      <div @click.stop="" id="homeMenu" class="home-menu">
        <ul>
          <router-link :to="{path:'/'}">
            <li><img src="../assets/image/h-menu-icon1.png" width="24"><a href="javascript:;">回到首页</a></li>
          </router-link>
          <li @click="showReadme"><img src="../assets/image/h-menu-icon2.png" width="24"><a href="javascript:;">玩法说明</a></li>
          <router-link :to="{path:'/CanyonRankingList'}">
            <li><img src="../assets/image/h-menu-icon3.png" width="24"><a href="javascript:;">日排行榜</a></li>
          </router-link>
          <router-link :to="{path:'/CanyonList'}">
            <li><img src="../assets/image/h-menu-icon4.png" width="24"><a href="javascript:;alert('游戏记录')">游戏记录</a></li>
          </router-link>
          <li><img src="../assets/image/h-menu-icon5.png" width="24"><a @click="showDataAnalysis">数据分析</a></li>
        </ul>

      </div>
    </div>





    <!--body-->
    <scroller ref="my_scroller" >
      <main>
        <div class="xt team">
          <div class="layer">
          <span class="title">
            <img src="../assets/image/jinbi_icon@2x.png" width="24" height="24">
            每门票可得<span class="c-rosered">18</span>积分</span>
            <span class="subtitle">选手 <span class="c-lightgray">·</span></span>
          </div>
        </div>
        <!--选择选手-->
        <div class="xs" id="lottery1">
          <!-- 红方选手 -->
          <div id="s1A" @click="yzA(0,'item1_1')" :data-team="teamInfo.teamA.teamName" class="a s1 lottery-unit lottery-unit-0">
            <span class="a-bg"></span>
            <div class="team-people-portrait">
              <!--<img v-if="teamInfo.teamA.image_url" :src="teamInfo.teamA.image_url" width="120" height="120">-->
              <img src="https://img1.famulei.com/active/zm/canyon/red_avatar.png" width="120" height="120">
            </div>
            <div class="team-portrait"><img src="https://img1.famulei.com/active/zm/canyon/red_team_icon.png" width="40" height="40"></div>

            <div class="atext">
              <span>{{teamInfo.teamA.teamName}}</span>
              <span>{{teamInfo.teamA.name}}</span>
            </div>

            <span class="jf" v-if="gameTeamData['0'].myYZMoney">{{gameTeamData['0'].myYZMoney}}</span>
          </div>

          <!-- 蓝方选手 -->
          <div id="s1B" @click="yzA(1,'item1_2')" :data-team="teamInfo.teamB.teamName" class="b s1 lottery-unit lottery-unit-1">
            <span class="b-bg"></span>
            <div class="btext">
              <span class="fz-20 text-right">{{teamInfo.teamB.teamName}}</span>
              <span class="fz-24 text-right">{{teamInfo.teamB.name}}</span>
            </div>
            <div class="team-portrait"><img src="https://img1.famulei.com/active/zm/canyon/blue_team_icon.png" width="40" height="40"></div>

            <div class="team-people-portrait">
              <!--<img v-if="teamInfo.teamB.image_url" :src="teamInfo.teamB.image_url" width="120" height="120">-->
              <img src="https://img1.famulei.com/active/zm/canyon/blue_avatar.png" width="120" height="120">
            </div>

            <span class="jf" v-if="gameTeamData['1'].myYZMoney">{{gameTeamData['1'].myYZMoney}}</span>
          </div>
        </div>

        <!--游戏位置-->
        <div class="xt game-position">
          <div class="layer">
          <span class="title">
            <img src="../assets/image/jinbi_icon@2x.png" width="24" height="24">
            每门票可得<span class="c-rosered">42</span>积分</span>
            <span class="subtitle">地点 <span class="c-lightgray">·</span></span>
          </div>
        </div>
        <div class="xs-2" id="lottery2">
          <div v-for="gm,index in gameData" :data-item="gm.name" @click="yzB(index,gm.item)" :class="'lottery-unit-'+index" class="item lottery-unit">
            <span class="ojf">{{gm.allYZMoney}}</span>
            <span>{{gm.name}}</span>
            <span class="jf" v-if="gm.myYZMoney">{{gm.myYZMoney}}</span>
          </div>
        </div>

        <!--游戏技能-->
        <div class="xt game-action">
          <div class="layer">
          <span class="title">
            <img src="../assets/image/jinbi_icon@2x.png" width="24" height="24">
            每门票可得<span class="c-rosered">98</span>积分</span>
            <span class="subtitle">事件 <span class="c-lightgray">·</span></span>
          </div>
        </div>
        <div class="xs-3" id="lottery3">
          <div v-for="skill,index in gameSkillData" :data-item="skill.name" @click="yzC(index,skill.item)" :class="'lottery-unit-'+index" class="item lottery-unit" >
            <span class="ojf">{{skill.allYZMoney}}</span>
            <span>{{skill.name}}</span>
            <span class="jf" v-if="skill.myYZMoney">{{skill.myYZMoney}}</span>
          </div>
        </div>

        <!-- 2串1，3串1，数据分析区域 -->
        <div class="xt">
          <div class="group1">
            <div class="layer2" @click="showForecast(1)">
              <span class="c-lightgray fz-24"><span class="c-rosered">{{myInfo.myYzD.possibleJF}}</span>积分</span>
              <span class="c-lightgray fz-24"><img src="../assets/image/icon_edit@2x.png" width="24"></span>
            </div>
            <div class="js" @click="oDataYZ(1)">
              <span class="jf" v-if="myInfo.myYzD.myTotalMoney">{{myInfo.myYzD.myTotalMoney}}</span>
              <img src="../assets/image/module_1_bg_dark@2x.png" width="164">
              <span :class="'it'+(index+1)" v-for="item,index in myInfo.myYzD.data">{{item.name}}</span>
            </div>
          </div>
          <div class="group2">
            <div class="layer2" @click="showForecast(2)">
              <span  class="c-lightgray fz-24"><span class="c-rosered">{{myInfo.myYzE.possibleJF}}</span>积分</span>
              <span class="c-lightgray fz-24"><img src="../assets/image/icon_edit@2x.png" width="24"></span>
            </div>
            <div class="jsjl" @click="oDataYZ(2)">
              <span class="jf" v-if="myInfo.myYzE.myTotalMoney">{{myInfo.myYzE.myTotalMoney}}</span>
              <img src="../assets/image/module_1_bg_dark@2x.png" width="164">
              <span :class="'it'+(index+1)" v-for="item,index in myInfo.myYzE.data">{{item.name}}</span>
            </div>
          </div>
          <div class="data-des">
            <div class="ruiwen"><img src="../assets/image/ruiwen_people1@2x.png" width="136"></div>
            <div class="layer2" @click="showDataAnalysis()">
              <span class="c-lightgray fz-24">数据分析</span>
              <span class="c-lightgray fz-24"><img src="../assets/image/icon_12pt_general_12_arrow_right_white@2x.png" width="24"></span>
            </div>
            <div class="defalut-des">
              <div class="layer-bg layer-bg-light">
                <div class="desc">
                  <div class="yc-layer" style="position:relative;">预测一下-哪位选手</div>
                  <div class="yc-changci">在<span class="yc-changci-val">哪个</span>地点</div>
                  <div class="yc-why" style="position:relative;">发生什么事</div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <!--个人信息及其他用户参与信息-->
        <div class="player-list">
          <div>
            <img v-if="otherInfo[0]" :src="otherInfo[0]" width="120" height="120">
            <img v-else src="../assets/image/pic_photo@2x.png" width="120" height="120">
          </div>
          <div>
            <img v-if="otherInfo[1]" :src="otherInfo[1]" width="120" height="120">
            <img v-else src="../assets/image/pic_photo@2x.png" width="120" height="120">
          </div>
          <div class="big"><img :src="myInfo.myAvatar" style="border-radius:50%;"></div>
          <div>
            <img v-if="otherInfo[2]" :src="otherInfo[2]" width="120" height="120">
            <img v-else src="../assets/image/pic_photo@2x.png" width="120" height="120">
          </div>
          <div>
            <img v-if="otherInfo[3]" :src="otherInfo[3]" width="120" height="120">
            <img v-else src="../assets/image/pic_photo@2x.png" width="120" height="120">
          </div>
        </div>
        <div class="player-list" style="justify-content:center;">
          <div class="name">{{myInfo.myName}}</div>
        </div>



      </main>
    </scroller>



    <!--玩法说明-->
    <div class="readme data-modal" v-if="isReadmeShow">
      <div class="head-title">
        <span>峡谷时刻玩法说明</span>
        <span class="close" @click="closeReadme"><img src="../assets/image/icon_close@2x.png" width="32"></span>
      </div>
      <scroller ref="my_scroller" >
        <div class="body">
          <div class="body-title">峡谷时刻玩法规则是什么？</div>
          <div class="content">
            每期游戏的选择时间为<strong>30秒</strong>，玩家在游戏时间内首先选择要使用的门票数，然后选择区域进行参与，非选择时间段，无法进行选择。<br><br>
            在屏幕的右下角有取消（撤销）按钮，在选择时段点击，则一键撤销本期游戏中的所有参与。<br><br>
            游戏结束后，公布正确答案，为获胜者分发奖励。随后，立刻开始下一期游戏。<br><br>
          </div>

          <div class="body-title">如何计算每期奖励积分数量？</div>
          <div class="content">
            <strong>选择选手：</strong>左（红）、右（蓝），1门票猜中可获 <span class="c-rosered" style="font-weight:bold;">18积分</span>选手根据本周幻联赛最高得分来选定。 <br>
            <strong>地点：</strong>上路、中路、下路、野区、高地，1门票猜中可获 <span class="c-rosered" style="font-weight:bold;">42积分</span><br>
            <strong>事件：</strong>12个赛场事件，1门票猜中可获 <span class="c-rosered" style="font-weight:bold;">98积分</span><br><br>
            <strong>预测2项(2串1)：</strong>选手、地点、事件，选择其中两项的组合。不同组合的奖励数量不同。<br><br>
            <strong>预测3项(3串1)：</strong>选手（2选1）、地点（5选1）、事件（12选1），更大的难度，更高的积分奖励数量。<br><br>
          </div>

          <div class="body-title">如何获得奖励？</div>
          <div class="content">
            若玩家参与的选项（投注项）为公布的正确答案，则可以获得对应积分奖励。<br><br>
            1门票猜中可获18积分，即玩家使用1门票，若中奖，玩家最终获得18积分的奖励，以此类推。<br><br>
          </div>

          <div class="body-title">特殊情况处理？</div>
          <div class="content">
            如果系统遇到不可预测的外力导致玩法异常，系统可能会对当前局中玩家已参与的金额需要暂缓一段时间后返还玩家。
          </div>

          <div class="footer-text">（*最终解释权归本产品所有）</div>
        </div>
      </scroller>
    </div>


    <!--开奖结果-->
    <div id="prizeActionSheet" class="prize-modal">
      <span class="ruiwen"><img src="../assets/image/ruiwen_people2@2x.png" width="288"></span>
      <div class="win">
        <div class="win-item">
            <span class="item s1" id="res1">
              <span>哪位选手</span>
              <span class="win-text" id="restext1">{{prizeRes.prizeAName}}</span>
            </span>
        </div>
        <div class="win-item2">&nbsp;&nbsp;在<span class="item s2" id="res2">
            <span>什么</span>
            <span class="win-text" id="restext2">{{prizeRes.prizeBName}}</span>
          </span>地点</div>
        <div class="win-item3">
            <span class="item s3" id="res3">
              <span>发生什么事</span>
              <span class="win-text" id="restext3">{{prizeRes.prizeCName}}</span>
            </span>
        </div>
      </div>
    </div>


    <!--数据分析弹层-->
    <div v-if="isDataAnalysisShow" @click="isDataAnalysisShow = false" class="data-analysis">
      <div @click.stop="" id="dataAnalysis" class="analysis-content data-modal">
        <div class="tab-list">
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 1}" @click="changeDataAnalysis(1)">
              <span class="title">当前播报</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 2}" @click="changeDataAnalysis(2)">
              <span class="title">当前遗漏</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 3}" @click="changeDataAnalysis(3)">
              <span class="title">出现次数</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 4}" @click="changeDataAnalysis(4)">
              <span class="title">平均遗漏</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 5}" @click="changeDataAnalysis(5)">
              <span class="title">最大遗漏</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 6}" @click="changeDataAnalysis(6)">
              <span class="title">最大连续</span>
              <span class="dot"></span>
          </span>
          <span class="tab-title-item" :class="{'active':dataAnalysis.thisShow == 7}" @click="changeDataAnalysis(7)">
              <span class="title">欲出指数</span>
              <span class="dot"></span>
          </span>
        </div>
        <div class="tab-body">
          <span name="当前播报" v-if="dataAnalysis.thisShow == 1">
              <div class="tab-sub-title">
                  <span class="left-item">当前回合下的播报</span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="24"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">当前播报</span><br>
                      指该播报在当前回合下给您播报新闻。 玩家可根据当前播报判断新闻趋势。（用户进入峡谷时刻页面后，所有的统计期数）
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                      <thead>
                      <tr>
                          <td>期数</td>
                          <td>红方</td>
                          <td>蓝方</td>
                          <td>上路</td>
                          <td>中路</td>
                          <td>下路</td>
                          <td>野区</td>
                          <td>高地</td>
                          <td>状态</td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item,index in dataAnalysis.betData.data">
                          <td>{{item.phase_number}}</td>
                          <td><span class="dot" v-if="item.item1_1 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item1_2 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item2_1 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item2_2 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item2_3 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item2_4 == '1'"></span></td>
                          <td><span class="dot" v-if="item.item2_5 == '1'"></span></td>
                          <td>{{item.status}}</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </span>
          <span name="当前遗漏" v-if="dataAnalysis.thisShow == 2">
              <div class="tab-sub-title">
                  <span class="left-item">当前回合下的播报</span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">当前遗漏</span><br>
                      当前遗漏：指该内容上次出现（预测）之后的遗漏次数。例如越塔强杀5，即为越塔强杀从上一次出现（预测结果）起，已有5期没有出现（预测结果）。
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.omitData.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.omitData.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.omitData.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.omitData.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.omitData.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.omitData.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.omitData.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.omitData.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.omitData.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.omitData.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.omitData.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.omitData.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.omitData.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.omitData.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.omitData.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.omitData.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.omitData.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.omitData.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.omitData.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
          <span name="出现次数" v-if="dataAnalysis.thisShow == 3">
              <div class="tab-sub-title">
                  <span class="left-item">
                    <div class="time-filter" v-if="dataAnalysis.filterStatus">
                      <div @click="changeTimeFilter('all','number_occurrences',1,'至今')" :class="{'active':dataAnalysis.filterTimeIndex == 1}" class="time-item">至今</div>
                      <div @click="changeTimeFilter('today','number_occurrences',2,'今天')" :class="{'active':dataAnalysis.filterTimeIndex == 2}" class="time-item">今天</div>
                      <div @click="changeTimeFilter('yesterday','number_occurrences',3,'昨天')" :class="{'active':dataAnalysis.filterTimeIndex == 3}" class="time-item">昨天</div>
                      <div @click="changeTimeFilter('last20','number_occurrences',4,'近20期')" :class="{'active':dataAnalysis.filterTimeIndex == 4}" class="time-item w74">近20期</div>
                      <div @click="changeTimeFilter('last100','number_occurrences',5,'近100期')" :class="{'active':dataAnalysis.filterTimeIndex == 5}" class="time-item w74">近100期</div>
                      <div @click="changeTimeFilter('last200','number_occurrences',6,'近200期')" :class="{'active':dataAnalysis.filterTimeIndex == 6}" class="time-item w74">近200期</div>
                      <div @click="changeTimeFilter('last500','number_occurrences',7,'近500期')" :class="{'active':dataAnalysis.filterTimeIndex == 7}" class="time-item w74">近500期</div>
                    </div>
                    <span class="right-item" @click="dataAnalysis.filterStatus = !dataAnalysis.filterStatus"><img src="../assets/image/icon_today@2x.png" width="12"> {{dataAnalysis.filterText}}</span> 出现次数
                  </span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">出现次数</span><br>
                      指该内容在统计期内出现的次数。 例如：越塔强杀5，即为越塔强杀在选择统计时间内出现（预测结果）5次。
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.occurrenceNumberData.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
          <span name="平均遗漏" v-if="dataAnalysis.thisShow == 4">
              <div class="tab-sub-title">
                  <span class="left-item">
                    <div class="time-filter" v-if="dataAnalysis.filterStatus">
                      <div @click="changeTimeFilter('all','average_omission',1,'至今')" :class="{'active':dataAnalysis.filterTimeIndex == 1}" class="time-item">至今</div>
                      <div @click="changeTimeFilter('today','average_omission',2,'今天')" :class="{'active':dataAnalysis.filterTimeIndex == 2}" class="time-item">今天</div>
                      <div @click="changeTimeFilter('yesterday','average_omission',3,'昨天')" :class="{'active':dataAnalysis.filterTimeIndex == 3}" class="time-item">昨天</div>
                      <div @click="changeTimeFilter('last20','average_omission',4,'近20期')" :class="{'active':dataAnalysis.filterTimeIndex == 4}" class="time-item w74">近20期</div>
                      <div @click="changeTimeFilter('last100','average_omission',5,'近100期')" :class="{'active':dataAnalysis.filterTimeIndex == 5}" class="time-item w74">近100期</div>
                      <div @click="changeTimeFilter('last200','average_omission',6,'近200期')" :class="{'active':dataAnalysis.filterTimeIndex == 6}" class="time-item w74">近200期</div>
                      <div @click="changeTimeFilter('last500','average_omission',7,'近500期')" :class="{'active':dataAnalysis.filterTimeIndex == 7}" class="time-item w74">近500期</div>
                    </div>
                    <span class="right-item" @click="dataAnalysis.filterStatus = !dataAnalysis.filterStatus" style="color:#5B579A;padding-left:0;margin-right:6px;"><img src="../assets/image/icon_today@2x.png" width="12"> {{dataAnalysis.filterText}}</span>当前回合下的播报
                  </span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">平均遗漏</span><br>
                      平均遗漏：指该内容在统计期内多次遗漏的平均值，例如：越塔强杀5，即为越塔强杀在选择的统计时间内出现（预测结果）3次，第一次出现前遗漏为4、第二次出现前遗漏为5、第三次出现前遗漏为6，平均遗漏即为（4+5+6）/3=5。
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.avgOmitData.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.avgOmitData.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.avgOmitData.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.avgOmitData.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.avgOmitData.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.avgOmitData.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.avgOmitData.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.avgOmitData.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
          <span name="最大遗漏" v-if="dataAnalysis.thisShow == 5">
              <div class="tab-sub-title">
                  <span class="left-item">当前回合下的播报</span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">最大遗漏</span><br>
                      指该内容在统计期内多期遗漏出现过的最大值。例如：越塔强杀6，即为越塔强杀在选择的统计时间内出现（预测结果）3次。第一次出现前遗漏为4、第二次出现前遗漏为5、第三次出现前遗漏为6，最大遗漏即为6。
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.maxOmitData.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.maxOmitData.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.maxOmitData.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.maxOmitData.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.maxOmitData.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.maxOmitData.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.maxOmitData.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.maxOmitData.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
          <span name="最大连续" v-if="dataAnalysis.thisShow == 6">
              <div class="tab-sub-title">
                  <span class="left-item">最大连续</span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">最大连续</span><br>
                      指改内容在统计期内最大的连续出现次数。例如：越塔强杀5，即为越塔强杀在选择的统计时间内最大连续出现（预测结果）过5次
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.maxSerial.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.maxSerial.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.maxSerial.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.maxSerial.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.maxSerial.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.maxSerial.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.maxSerial.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.maxSerial.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
          <span name="欲出指数" v-if="dataAnalysis.thisShow == 7">
              <div class="tab-sub-title">
                  <span class="left-item">
                    <div class="time-filter" v-if="dataAnalysis.filterStatus">
                      <div @click="changeTimeFilter('all','index_of_appear',1,'至今')" :class="{'active':dataAnalysis.filterTimeIndex == 1}" class="time-item">至今</div>
                      <div @click="changeTimeFilter('today','index_of_appear',2,'今天')" :class="{'active':dataAnalysis.filterTimeIndex == 2}" class="time-item">今天</div>
                      <div @click="changeTimeFilter('yesterday','index_of_appear',3,'昨天')" :class="{'active':dataAnalysis.filterTimeIndex == 3}" class="time-item">昨天</div>
                      <div @click="changeTimeFilter('last20','index_of_appear',4,'近20期')" :class="{'active':dataAnalysis.filterTimeIndex == 4}" class="time-item w74">近20期</div>
                      <div @click="changeTimeFilter('last100','index_of_appear',5,'近100期')" :class="{'active':dataAnalysis.filterTimeIndex == 5}" class="time-item w74">近100期</div>
                      <div @click="changeTimeFilter('last200','index_of_appear',6,'近200期')" :class="{'active':dataAnalysis.filterTimeIndex == 6}" class="time-item w74">近200期</div>
                      <div @click="changeTimeFilter('last500','index_of_appear',7,'近500期')" :class="{'active':dataAnalysis.filterTimeIndex == 7}" class="time-item w74">近500期</div>
                    </div>
                    <span class="right-item" @click="dataAnalysis.filterStatus = !dataAnalysis.filterStatus" style="color:#5B579A;padding-left:0;margin-right:6px;"><img src="../assets/image/icon_today@2x.png" width="12"> {{dataAnalysis.filterText}}</span>欲出指数
                  </span>
                  <span class="right-item" @click="showDataHelp" id="dataHelpBtn">说明&nbsp;<img src="../assets/image/help-icon.png" width="12"></span>
              </div>
              <div id="dataHelpDes" v-if="isShowDataHelp" @click="isShowDataHelp = !isShowDataHelp" class="data-help-des">
                  <div class="des">
                      <span id="dataDesCloseBtn" class="close">X</span>
                      <span style="font-size:28px;">欲出指数</span><br>
                      指该好运在统计期内，当前遗漏/平均遗漏。例如：越塔强杀 0.5，即为越塔强杀在当前遗漏为6，平均遗漏为12，欲出指数为6/12=0.5
                  </div>
              </div>
              <div class="tab-data-table">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                      <td>
                        <span>红方</span>
                        <span>{{dataAnalysis.probabilityData.data.item1_1}}</span>
                      </td>
                      <td>
                        <span>蓝方</span>
                        <span>{{dataAnalysis.probabilityData.data.item1_2}}</span>
                      </td>
                      <td>
                        <span>上路</span>
                        <span>{{dataAnalysis.probabilityData.data.item2_1}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>中路</span>
                        <span>{{dataAnalysis.probabilityData.data.item2_2}}</span>
                      </td>
                      <td>
                        <span>下路</span>
                        <span>{{dataAnalysis.probabilityData.data.item2_3}}</span>
                      </td>
                      <td>
                        <span>野区</span>
                        <span>{{dataAnalysis.probabilityData.data.item2_4}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>高地</span>
                        <span>{{dataAnalysis.probabilityData.data.item2_5}}</span>
                      </td>
                      <td>
                        <span>抱团推塔</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_1}}</span>
                      </td>
                      <td>
                        <span>越塔强杀</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_2}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>原地被秒</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_3}}</span>
                      </td>
                      <td>
                        <span>互相尬舞</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_4}}</span>
                      </td>
                      <td>
                        <span>包围五人</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_5}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>当场失业</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_6}}</span>
                      </td>
                      <td>
                        <span>收获三杀</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_7}}</span>
                      </td>
                      <td>
                        <span>强拿一塔</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_8}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>轻松超神</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_9}}</span>
                      </td>
                      <td>
                        <span>传送绕后</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_10}}</span>
                      </td>
                      <td>
                        <span>单人带线</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_11}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>抗塔输出</span>
                        <span>{{dataAnalysis.probabilityData.data.item3_12}}</span>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
          </span>
        </div>
      </div>
    </div>



    <!--预测三项弹层-->
    <div class="forecast data-modal" v-if="isForecastShow">
      <div class="head-title">
        <span v-if="ycItemType == 1">预测二项</span>
        <span v-if="ycItemType == 2">预测三项</span>
        <span class="close" @click="closeForecast"><img src="../assets/image/icon_close@2x.png" width="32"></span>
      </div>
      <div class="body">
        <div class="body-title">
          <span>当前已选预测项</span>
          <span>预测奖励：
              <span class="c-rosered" v-if="ycItemType==1">{{myInfo.myYzD.possibleJF}}积分</span>
              <span class="c-rosered" v-if="ycItemType==2">{{myInfo.myYzE.possibleJF}}积分</span>
            </span>
        </div>
        <div class="group-selected">
          <span class="gs-list-item" v-if="ycItemType==1" v-for="item,index in myInfo.myYzD.data">
            <span class="item active" :data-group="item.group" :data-val="item.value">{{item.name}}</span>
          </span>
          <span class="gs-list-item" v-if="ycItemType==2" v-for="item,index in myInfo.myYzE.data">
            <span class="item active" :data-group="item.group" :data-val="item.value">{{item.name}}</span>
          </span>
          <span @click="isOmitShow = !isOmitShow" class="change-omit-show">
            <span v-if="isOmitShow">收起遗漏</span>
            <span v-if="!isOmitShow">显示遗漏</span>  <i :class="{'active':isOmitShow}" class="iconfont">&#xe673;</i>
          </span>
        </div>
        <div class="group-selected-tips" v-if="ycItemType == 1">规则说明：选项二串一，预测正确收获{{myInfo.myYzD.possibleJF}}积分</div>
        <div class="group-selected-tips" v-if="ycItemType == 2">规则说明：选项三串一，预测正确收获{{myInfo.myYzE.possibleJF}}积分</div>
        <div class="group-a mt15">
          <div class="layer-light" style="width:100%;">
            <span class="c-blue fz-24">哪里的选手？</span>
          </div>
        </div>
        <div class="group-selected">
          <span class="gs-list-item" v-for="item,index in gd">
              <span class="item" :class="{'active':item.checked == true}" @click="chooseYCItem(item.name,index,1,item.item)">{{item.name}}</span>
              <span class="omit"><span v-if="isOmitShow" class="num">{{item.omit}}</span></span>
          </span>
        </div>
        <div class="group-a mt15">
          <div class="layer-light" style="width:100%;">
            <span class="c-blue fz-24">在第几场？</span>
          </div>
        </div>
        <div class="group-selected space-between" style="flex-wrap:nowrap;">
          <span class="gs-list-item" v-for="item,index in gdA">
              <span class="item" :class="{'active':item.checked == true}" @click="chooseYCItem(item.name,index,2,item.item)">{{item.name}}</span>
              <span class="omit"><span v-if="isOmitShow" class="num">{{item.omit}}</span></span>
          </span>
        </div>
        <div class="group-a mt15">
          <div class="layer-light" style="width:100%;">
            <span class="c-blue fz-24">发生了什么？</span>
          </div>
        </div>
        <div class="group-selected gs3 space-between">
            <span class="gs-list-item" v-for="item,index in gdB">
                <span class="item" :class="{'active':item.checked == true}" @click="chooseYCItem(item.name,index,3,item.item)">{{item.name}}</span>
                <span class="omit" v-if="isOmitShow"><span v-if="isOmitShow" class="num">{{item.omit}}</span></span>
            </span>
        </div>
        <button class="confirm-btn" @click="confirmForecast">确认</button>
      </div>
    </div>


    <!--等待游戏开始提示层-->
    <div v-if="!isGameRuningTime" class="game-wait-tips">
      <div class="content">
        <div class="modal">
          <div class="icon"><img src="../../static/images/pic_404.png" ></div>
          <div class="desc" style="text-align:center;">
            游戏参与时间为每天<br>
            <span style="color:#ec225d;">06:00-24:00</span><br>
            请您稍后再来参与哟~
          </div>
          <div class="button" @click="isGameLotteryWait = false">我知道了</div>
        </div>
      </div>
    </div>

    <!--等待游戏开始提示层-->
    <div v-if="isGameLotteryWait" class="game-wait-tips">
      <div class="content">
        <div class="modal">
          <div class="icon"><img src="../../static/images/pic_404.png" ></div>
          <div class="desc">游戏正在进行中，请稍等~</div>
          <div class="button" @click="isGameLotteryWait = false">我知道了</div>
        </div>
      </div>
    </div>




    <footer>
      <!--倒计时区域-->
      <div class="footer-menu">
        <div class="count-down"><div class="second" id="xzEndTime">{{countDownTime}}</div>s</div>
        <div class="money-num">
          <div class="btn" :class="{'active':myInfo.myYzMoney == 1}" @click="changeMyYzMoney(1)"><img src="../assets/image/icon_12_fruit@2x.png" width="24"> <span>1</span></div>
          <div class="btn" :class="{'active':myInfo.myYzMoney == 10}" @click="changeMyYzMoney(10)"><img src="../assets/image/icon_12_fruit@2x.png" width="24"> <span>10</span></div>
          <div class="btn" :class="{'active':myInfo.myYzMoney == 100}" @click="changeMyYzMoney(100)"><img src="../assets/image/icon_12_fruit@2x.png" width="24"> <span>100</span></div>
        </div>
        <div class="cancel-btn" @click="cancelOrderAct">取消</div>
      </div>
    </footer>

  </div>
</template>

<script>
  function lotteryFun(){
    this.index = -1; //默认中奖节点-1（没有中奖）
    this.count = 0; //
    this.timer = 0; //
    this.speed = 20; //初始转动速度
    this.times = 0; //转动次数
    this.cycle = 50; //转动基本次数：即至少需要转动多少次再进入抽奖环节
    this.prize = -1; //中奖位置

    this.init = function(id) { //初始化节点
      if($('#' + id).find('.lottery-unit').length > 0) {
        var lotteryid = $('#' + id);  //#lottery
        var units = lotteryid.find('.lottery-unit'); //从当前节点查找.lottery-unit
        this.obj = lotteryid;
        this.count = units.length; //赋值总的数量
        lotteryid.find('.lottery-unit.lottery-unit-' + this.index).addClass('active'); //查找当前转动的位置
      };
    }

    this.roll = function () { //开始滚动
      var index = this.index;
      var count = this.count;
      var lottery = this.obj;
      $(lottery).find('.lottery-unit.lottery-unit-' + index).removeClass('active');
      index += 1;
      if(index > count - 1) {
        index = 0;
      };
      $(lottery).find('.lottery-unit.lottery-unit-' + index).addClass('active');
      this.index = index;
      return false;
    }

    this.stop = function (index) { //中奖位置停止
      this.prize = index;
      return false;
    }
  }

  import lemCounter from 'lem_counter';
  import store from "store";
  import loading from '../components/loading.vue';

  import $ from 'jquery'
  export default {
    name: "Canyon",
    data() {
      return {
        theme:{
          redActive:false,
          blueActive:false,
        },
        rechargeShow:true,//充值
        otherInfo:[],//其他参与用户信息
        serverDate:'',//服务器时间
        myInfo:{
          /**个人信息Start**/
          myName:store.get('member_info').name,
          myAvatar:'http://q2.qlogo.cn/g?b=qq&k=vEJOXlcHWyThiayZ0dXC39g&s=140&t=1483313236',
          myguoziSer:0,//服务器返回待更新果子/积分数量（游戏结束，计算果子数量时暂存）
          myGuozi:0, //我的果子/积分
          myMoneySer:0,//服务器返回待更新金币/门票数量（游戏结束，计算金币数量时暂存）
          myMoney:0, //我的金币/门票
          /**个人信息End**/




          /**标准版已选择的数据（需要同步服务器数据）**/
          myYzA:0, //下注A队员下注金额 (0为未下注)
          myYzAMoney:0,//第一组总下注金额
          myYzB:0, //下注B位置下注信息
          myYzBMoney:0,//第一组总下注金额
          myYzC:0, //下注C技能下注信息
          myYzCMoney:0,//第一组总下注金额


          /**2串1 已选择的数据 （需要同步服务器数据）**/
          myYzD:{/**2串1，当前选择的信息，此选项必须选2项**/
            myYzChecked:false, //2串1选项是否下注
            myYzMoney:0, //2串1选项当前下注金额
            myTotalMoney:0,//总的累计金额
            possibleJF:75,//预测正确可得积分
            data:[
              {name:'红方',value:'0',group:'1',item:'item1_1'},
              {name:'上路',value:'0',group:'2',item:'item2_1'},
            ],

          },
          /**3串1 已选择的数据 （需要同步服务器数据）**/
          myYzE:{/**3串1，当前选择的信息，此选项必须选3项**/
            myYzChecked:false, //3串1选项是否下注
            myYzMoney:0, //2串1选项当前下注金额
            myTotalMoney:0,//总的累计金额
            possibleJF:740,//预测正确可得积分
            data:[
              //3串1选择的，此选项必须选3项
              {name:'红方',value:'0',group:'1',item:'item1_1'},
              {name:'上路',value:'0',group:'2',item:'item2_1'},
              {name:'推塔报团',value:'0',group:'3',item:'item3_1'},
            ]
          },
          myYzMoney:1, //我的单次押注金额，默认 1，10，100 三个选项
        },



        /**抽奖结果，暂存信息 （开奖时需要同步服务器获取中奖号）**/
        prizeRes:{
          prizeA:'', //本次A抽奖结果 (''为没有结果)
          prizeAName:'',
          prizeB:'', //本次B抽奖结果
          prizeBName:'',
          prizeC:'', //本次C抽奖结果
          prizeCName:'',
        },



        /**选手信息，单独初始化**/
        teamInfo:{
          teamA:{//队A
            id:1,
            image_url:'', //头像
            teamLogo:'../assets/image/we.png', //团队LOGO
            teamName:'IG-MID', //团队名称
            name:'红方', //我的名称
          },
          teamB:{//队B
            id:2,
            image_url:'', //头像
            teamLogo:'../assets/image/we.png', //团队LOGO
            teamName:'RNG-ADC', //团队名称
            name:'蓝方', //我的名称
          }
        },


        /**-----默认信息数据库-----**/
        /**标准版-队员**/
        gameTeamDataPossibleJF:0,//标准版-队员 预测正确可得积分
        gameTeamData:[
          {id:1,name:'红方',allYZMoney:10,myYZMoney:0,item:'item1_1'},
          {id:2,name:'蓝方',allYZMoney:0,myYZMoney:0,item:'item1_2'},
        ],
        /**标准版-地点**/
        gameSiteDataPossibleJF:0,//标准版-地点 预测正确可得积分
        gameData:[
          {id:1,name:'上路',allYZMoney:0,myYZMoney:0,item:'item2_1'},
          {id:2,name:'中路',allYZMoney:0,myYZMoney:0,item:'item2_2'},
          {id:3,name:'下路',allYZMoney:0,myYZMoney:0,item:'item2_3'},
          {id:4,name:'野区',allYZMoney:0,myYZMoney:0,item:'item2_4'},
          {id:5,name:'高地',allYZMoney:0,myYZMoney:0,item:'item2_5'},
        ],
        /**标准版-事件**/
        gameSkillDataPossibleJF:0,//标准版-事件 预测正确可得积分
        gameSkillData:[
          {id:1,name:'抱团推塔',allYZMoney:0,myYZMoney:0,item:'item3_1'},
          {id:2,name:'越塔强杀',allYZMoney:50,myYZMoney:0,item:'item3_2'},
          {id:3,name:'原地被秒',allYZMoney:0,myYZMoney:0,item:'item3_3'},
          {id:4,name:'互相尬舞',allYZMoney:0,myYZMoney:0,item:'item3_4'},
          {id:5,name:'包围五人',allYZMoney:0,myYZMoney:0,item:'item3_5'},
          {id:6,name:'当场失业',allYZMoney:10,myYZMoney:0,item:'item3_6'},
          {id:7,name:'收获三杀',allYZMoney:0,myYZMoney:0,item:'item3_7'},
          {id:8,name:'强拿一塔',allYZMoney:10,myYZMoney:0,item:'item3_8'},
          {id:9,name:'轻松超神',allYZMoney:6,myYZMoney:0,item:'item3_9'},
          {id:10,name:'传送绕后',allYZMoney:0,myYZMoney:0,item:'item3_10'},
          {id:11,name:'单人带线',allYZMoney:2,myYZMoney:0,item:'item3_11'},
          {id:12,name:'抗塔输出',allYZMoney:0,myYZMoney:0,item:'item3_12'},
        ],
        /**-----2串1或3串1信息数据库 GroupData -----**/
        ycItemType:1, //组合选择类型，1=2串1 、2=3串1
        isOmitShow:true,//是否显示当前遗漏
        /**队员(名称，是否选中，已选人数)**/
        gd:[
          {id:1,name:'红方',checked:true,num:0,omit:0,item:'item1_1'},
          {id:2,name:'蓝方',checked:false,num:0,omit:0,item:'item1_2'},
        ],
        /**地点(名称，是否选中，已选人数)**/
        gdA:[
          {id:1,name:'上路',checked:true,num:0,omit:0,item:'item2_1'},
          {id:2,name:'中路',checked:false,num:0,omit:0,item:'item2_2'},
          {id:3,name:'下路',checked:false,num:0,omit:0,item:'item2_3'},
          {id:4,name:'野区',checked:false,num:0,omit:0,item:'item2_4'},
          {id:5,name:'高地',checked:false,num:0,omit:0,item:'item2_5'},
        ],
        /**事件(名称，是否选中，已选人数)**/
        gdB:[
          {id:1,name:'抱团推塔',checked:true,num:0,omit:0,item:'item3_1'},
          {id:2,name:'越塔强杀',checked:false,num:0,omit:0,item:'item3_2'},
          {id:3,name:'原地被秒',checked:false,num:0,omit:0,item:'item3_3'},
          {id:4,name:'互相尬舞',checked:false,num:0,omit:0,item:'item3_4'},
          {id:5,name:'包围五人',checked:false,num:0,omit:0,item:'item3_5'},
          {id:6,name:'当场失业',checked:false,num:0,omit:0,item:'item3_6'},
          {id:7,name:'收获三杀',checked:false,num:0,omit:0,item:'item3_7'},
          {id:8,name:'强拿一塔',checked:false,num:0,omit:0,item:'item3_8'},
          {id:9,name:'轻松超神',checked:false,num:0,omit:0,item:'item3_9'},
          {id:10,name:'传送绕后',checked:false,num:0,omit:0,item:'item3_10'},
          {id:11,name:'单人带线',checked:false,num:0,omit:0,item:'item3_11'},
          {id:12,name:'抗塔输出',checked:false,num:0,omit:0,item:'item3_12'},
        ],


        /**数据分析弹层**/
        dataAnalysis:{
          thisShow:'1', //当前显示的是第几个
          filterStatus:false,//时间筛选器显示状态
          filterText:'至今',//时间筛选器
          filterTimeIndex:1, //时间选择器默认选第几个
          /**当前播报信息**/
          betData:{
            title:'当前播报',
            helpDsc:'指该播报在当前回合下给您播报新闻。 玩家可根据当前播报判断新闻趋势。',
            data:[],
          },
          /**当前遗漏信息**/
          omitData:{
            title:'当前遗漏',
            helpDsc:'',
            data:{},
          },
          /**出现次数信息**/
          occurrenceNumberData:{
            title:'出现次数',
            helpDsc:'',
            data:{},
          },
          /**平均遗漏信息**/
          avgOmitData:{
            title:'平均遗漏',
            helpDsc:'',
            data:{},
          },
          /**最大遗漏信息**/
          maxOmitData:{
            title:'最大遗漏',
            helpDsc:'',
            data:{},
          },
          /**最大连续**/
          maxSerial:{
            title:'最大连续',
            helpDsc:'',
            data:{},
          },
          /**欲出指数**/
          probabilityData:{
            title:'欲出指数',
            helpDsc:'',
            data:{},
          },
        },


        /**初始化抽奖跑马灯**/
        lottery1: new lotteryFun(),
        lottery1Cycle:50,
        lottery2: new lotteryFun(),
        lottery2Cycle:120,
        lottery3: new lotteryFun(),
        lottery3Cycle:120,


        /**游戏运行相关**/
        gameTimer:'', //本地任务定时器
        secondRunTimer:'', //本地秒表定时器
        timeSyncTimer:'',//同步服务器时间定时器

        localTimeS:0, //本地秒表
        countDownTime:0, //倒计时剩余秒数
        isGameRuningTime:true,//是否在游戏运行时间内
        isGameRuning:false, //游戏是否正在运行
        isGameLotteryWait:false, //是否正在开奖

        startTime:'',//游戏开始时间
        endTime:'', //游戏结束时间
        serverTime:'', //服务器时间戳
        time_s:0, //服务器实时秒数（如果该数据>30则不允许下单。为0时开始新一轮）
        phaseTime:'', //游戏期数



        /**弹层遮罩控制**/
        isHomeMenuShow:false,//是否显示左上角按钮弹出菜单
        isDataAnalysisShow:false, //是否显示数据分析弹层
        isShowDataHelp:false,//是否显示数据分析弹层，帮助浮层
        isForecastShow:false,//预测项目1:2串1 、2:3串1弹层
        isReadmeShow:false,//是否显示玩法说明


        isDebug:false,

        ws:'',//websocket

      }
    },
    mounted(){
      console.log('mounted');
      let _this = this;
      //let viewport = document.querySelector("meta[name=viewport]");
      //viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no');

      //console.log('member='+JSON.stringify(store.get('member_info')));

      //验证如果是IOS不显示充值
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        this.rechargeShow = false;
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.rechargeShow = true;
      }


      //初始化时，请求服务器现在默认时间
      this.$api('/services/canyon/home.php',{
        tag:'mounted InitData',
        is_first:1, //第一次请求
      })
        .then(function (res) {
          if(res.code!=200){
            layer.open({content: res.message, btn: '关闭'});
            return false;
          }
          //初始化游戏基础配置信息
          _this.startTime = res.data.start_time;//游戏开始时间
          _this.endTime = res.data.end_time; //游戏结束时间
          _this.serverTime = res.data.time+''; //服务器时间戳
          _this.phaseTime = res.data.phase_time; //游戏期数
          _this.time_s = res.data.time_s; //服务器剩余秒数（如果该数据>30则不允许下单。为0时开始新一轮）
          _this.localTimeS = _this.time_s; //服务器秒数同步本地秒表

          _this.myInfo.myMoney = res.data.ticket;//门票数/金币
          _this.myInfo.myGuozi = res.data.guozi;//果子数/积分

          let thisHours = new Date().getHours();
          let serverStartTime = _this.startTime.substr(0,2);
          if (thisHours > serverStartTime){
            console.log(`可以开始游戏`);
            /** 系统开始初始化加载数据 **/
            if(!_this.isDebug){
              _this.refreshData(); //初始化刷新数据定时器
              _this.initData();//初始化基础数据

              //初始化游戏任务定时器（服务器时间）
              _this.gameTimer = setInterval(function () {
                //console.log('gameTimer 运行中~');
                _this.localTimeS++;
              },1000);


              //初始化本地秒表监控器
              _this.secondRunTimer = setInterval(function () {
                //console.log('gameRunTime 运行中~');
                let localSec = 60 - 30 - _this.localTimeS;
                if(localSec >= 0){
                  _this.countDownTime = localSec;
                }else{
                  _this.countDownTime = '--';
                }

                if(_this.localTimeS==60){//每60秒循环1次
                  _this.localTimeS = 0;
                }
              },500);//每500毫秒刷新一次
            }
            /** 系统开始初始化加载数据 **/



            //如果中途进入系统，且本轮抽奖未开始
            console.log('localTimeS='+_this.localTimeS);
            if(_this.localTimeS<=30){//如果本地秒表在0-30之间
              _this.isGameLotteryWait = false;
            }else{
              _this.isGameLotteryWait = true;
            }

          } else{
            console.log(`未到开始时间`);
            _this.isGameRuningTime = false;
          }

        })
        .catch(function (error) {
          layer.open({content: '请求失败！error='+error,skin: 'msg',time: 2});
          if(_this.isDebug){
            layer.open({content: 'mounted InitData 初始化失败 error='+error, btn: '关闭'});
          }
        })


      //websocket
      //this.websocket();
    },
    components: {

    },
    watch: {
      //监听金额/门票变化
      newMoneyValue(newVal, oldVal){
        console.log("newMoney="+newVal+',oldMoney='+oldVal+';');
        let nVal = newVal++;
        let oVal = oldVal++;

        //增加金额效果
        $('.counter-2').lemCounter({
          value_to: nVal, //新的值
          value_from: oVal, //旧的值
          animate_duration:0.5,//速度
        });
      },
      //监听果子/积分变化
      newGuoziValue(newVal, oldVal){
        console.log("newGuozi="+newVal+',oldGuozi='+oldVal+';');
        let nVal = newVal++;
        let oVal = oldVal++;
        //如果果子数量有变化
        if(nVal!=oVal){
          //增加金额效果
          $('.counter-1').lemCounter({
            value_to: nVal, //新的值
            value_from: oVal, //旧的值
            animate_duration:0.5,
          });
        }

      },
      //监听服务器秒数
      watchServerTime(newVal, oldVal){
        //console.log('倒计时更新了~  newVal='+newVal);

      },
      //监听本地秒表 0-60
      watchLocalTimeS(newVal, oldVal){
        if(newVal==0){
          this.isGameLotteryWait = false;
          this.cleanWinActItem(); //清空中奖锁定状态
          layer.open({content: '游戏开始，现在可以预测啦~',skin: 'msg',time: 2});
          this.initData();//初始化
          // this.countDownTime = 30;
          // this.countDownStart();//开始到时间下注
        }

        //如果最后10秒，给倒计时特效css
        if(newVal>20 && newVal<=30){
          this.isGameLotteryWait = false;
          $(".count-down").css({"color":"red"});
          $("#xzEndTime").addClass('scale-font-size');
        }
        if(newVal>29){
          $(".count-down").css({"color":"#5348FF"});
          $("#xzEndTime").removeClass('scale-font-size');
        }

        if(newVal < 10 && newVal > 0){
          //console.log('倒计时');
        }

        if(newVal == 30){
          layer.open({content: '预测结束,正在开奖~',skin: 'msg',time: 2});
        }

        if(newVal == 32){
          this.getWinNumber(); //请求本次开奖信息
        }

      }

    },
    computed: {
      newMoneyValue() {
        return this.myInfo.myMoney;
      },
      newGuoziValue() {
        return this.myInfo.myGuozi;
      },
      watchServerTime() {
        return this.time_s;
      },
      watchLocalTimeS(){
        return this.localTimeS;
      },
    },
    destroyed: function () {
      console.log("destroyed~");
      clearInterval(this.gameTimer);//停止游戏任务定时器
      clearInterval(this.secondRunTimer);//停止本地秒表定时器
      clearTimeout(this.timeSyncTimer);//停止同步时间定时器

    },
    methods: {
      //webSocket
      websocket () {
        let _this = this;
        this.ws = new WebSocket('ws://websocket.auan.cn/websocket');
        this.ws.onopen = (evt) => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          this.ws.send('Hello')
          console.log('已建立连接...')
        }
        this.ws.onmessage = evt => {
          // console.log('数据已接收...')
          //console.log('服务器返回数据='+evt.data);
          let serverMsg = JSON.parse(evt.data);
          if(serverMsg.type == "date"){
            //console.log('服务器时间：'+serverMsg.data);
            _this.serverDate = serverMsg.data;
          }else if(serverMsg.type == "string"){
            console.log(`服务器返回自定义信息：${serverMsg.data}`);
            layer.open({content: '👍 '+serverMsg.data, skin: 'msg',time: 2});
          }

        }
        this.ws.onclose = function (evt) {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // 路由跳转时结束websocket链接
        this.$router.afterEach(function () {
          this.ws.close();
        })
      },
      sendMsg:function(){
        let msg = $("#webMsg").val();
        this.ws.send(msg);
      },


      /** 初始化数据 **/
      initData(){
        /**初始化抽奖跑马灯**/
        this.lottery1 = new lotteryFun();
        this.lottery1.cycle = this.lottery1Cycle;
        this.lottery2 = new lotteryFun();
        this.lottery2.cycle = this.lottery2Cycle;
        this.lottery3 = new lotteryFun();
        this.lottery3.cycle = this.lottery3Cycle;

        console.log('****初始化数据****');
        let _this = this;
        this.$api('/services/canyon/home.php',{
          tag:'initData',
          is_first:0, //第一次请求
        })
          .then(function (res) {
            //console.log('redData='+res.data.list[0].items);
            if(res.code == 200){
              /**初始化游戏基础配置信息**/
              _this.startTime = res.data.start_time;//游戏开始时间
              _this.endTime = res.data.end_time; //游戏结束时间
              _this.serverTime = res.data.time+''; //服务器时间戳
              _this.phaseTime = res.data.phase_time; //游戏期数
              _this.time_s = Number(res.data.time_s); //服务器剩余秒数（如果该数据>30则不允许下单。为0时开始新一轮）
              console.log(`time_s=${_this.time_s}`);
              if (_this.time_s<=30){
                _this.countDownTime = 30-res.data.time_s;
              }

              /** 初始化更新本地数据**/
              _this.initServerData(res);
            }else{
              layer.open({content: '初始化失败！'+res.message,skin: 'msg'});
            }

          })
          .catch(function (error) {
            layer.open({content: '初始化失败！error='+error,skin: 'msg',time: 2});
            if(_this.isDebug){
              layer.open({content: 'InitData 初始化失败 error='+error, btn: '关闭'});
            }
            console.log('初始化失败！error='+error);
          })
      },
      /**初始化本地数据**/
      initServerData(res){
        let _this = this;
        console.log('initServerData 初始化本地数据');
        /**初始化我的个人信息**/
        _this.myInfo.myAvatar = res.data.my_avatar_list;//头像
        _this.myInfo.myMoney = res.data.ticket;//门票数/金币
        _this.myInfo.myGuozi = res.data.guozi;//果子数/积分
        /**初始化其他用户参与信息**/
        _this.otherInfo = res.data.avatar_list;


        /**初始化 红方 队员信息**/
        let teamAInfo = res.data.list[0].items[0];
        _this.teamInfo.teamA.id = teamAInfo.id;
        _this.teamInfo.teamA.image_url = teamAInfo.image_url;
        _this.teamInfo.teamA.name = teamAInfo.name;
        _this.teamInfo.teamA.item = teamAInfo.item;

        /**初始化 蓝方 队员信息**/
        let teamBInfo = res.data.list[0].items[1];
        _this.teamInfo.teamB.id = teamBInfo.id;
        _this.teamInfo.teamB.image_url = teamBInfo.image_url;
        _this.teamInfo.teamB.name = teamBInfo.name;
        _this.teamInfo.teamB.item = teamBInfo.item;


        _this.updateData(res);

      },
      //刷新数据
      refreshData(){
        console.log('SyncServerTime - SEC='+new Date().getSeconds());
        //console.log('refreshData 刷新数据~');
        let _this = this;
        this.$api('/services/canyon/home.php',{
          tag:'SyncServerTime',
          is_first:0, //非第一次请求
        })
          .then(function (res) {

            if(res.code == 200){

              if(JSON.stringify(res.data) != '{}'){
                //更新游戏基础配置信息
                _this.serverTime = res.data.time+''; //服务器时间戳
                _this.phaseTime = res.data.phase_time; //游戏期数

                _this.time_s = Number(res.data.time_s); //服务器剩余秒数（如果该数据>30则不允许下单。为0时开始新一轮）
                _this.localTimeS = Number(_this.time_s);

                /**更新本地数据**/
                _this.syncServerData(res);

              }

              //初始化我的头像
              if(JSON.stringify(res.data.my_avatar_list) != '{}'){
                _this.myInfo.myAvatar = res.data.my_avatar_list;
                //初始化其他用户参与信息
                _this.otherInfo = res.data.avatar_list;
              }


              //查询服务器是否有中奖数据
              if(res.data.reward_items.length > 0){
                //更新中奖号码
                _this.prizeRes.prizeA = res.data.reward_items.item_1;
                _this.prizeRes.prizeB = res.data.reward_items.item_2;
                _this.prizeRes.prizeC = res.data.reward_items.item_3;

                //更新待更新果子及金币数量
                _this.myInfo.myguoziSer = res.data.guozi;
                _this.myInfo.myMoneySer = res.data.ticket;

                //console.log('开奖啦~第一组='+_this.prizeRes.prizeA+',第二组='+_this.prizeRes.prizeB+',第三组='+_this.prizeRes.prizeC);
              }


            }

          })
          .catch(function (error) {
            layer.open({content: '同步服务器失败!',skin: 'msg',time: 2});
            if(_this.isDebug){
              layer.open({content: '同步服务器失败 error='+error, btn: '关闭'});
            }
            console.log('同步服务器失败error='+error);
          })


        //每3秒同步一下服务器数据
        this.timeSyncTimer = setTimeout(this.refreshData,3000);
      },

      /**同步更新下单数据**/
      syncServerData(res){
        let _this = this;
        console.log('syncServerData 同步本地数据 - SEC='+new Date().getSeconds());
        /**初始化我的个人信息**/
        _this.myInfo.myAvatar = res.data.my_avatar_list;//头像
        /**初始化其他用户参与信息**/
        _this.otherInfo = res.data.avatar_list;


        /**初始化 红方 队员信息**/
        _this.teamInfo.teamA.id = res.data.list[0].items[0].id;
        _this.teamInfo.teamA.image_url = res.data.list[0].items[0].image_url;
        _this.teamInfo.teamA.name = res.data.list[0].items[0].name;
        _this.teamInfo.teamA.item = res.data.list[0].items[0].item;

        /**初始化 蓝方 队员信息**/
        _this.teamInfo.teamB.id = res.data.list[0].items[1].id;
        _this.teamInfo.teamB.image_url = res.data.list[0].items[1].image_url;
        _this.teamInfo.teamB.name = res.data.list[0].items[1].name;
        _this.teamInfo.teamB.item = res.data.list[0].items[1].item;

        _this.updateData(res);
      },

      /**更新主界面队员信息**/
      updateData(res){

        let _this = this;

        /**2串1下单数据**/
        let model_ticket_1 = 0;
        let model_items_1 = [];
        if(res.data.p_ticket_member['model_ticket_1']){
          model_ticket_1 = res.data.p_ticket_member['model_ticket_1'];
          model_items_1 = res.data.p_ticket_member.model_items_1.split(',');
        }

        /**3串1下单数据**/
        let model_ticket_2 = 0;
        let model_items_2 = [];
        if(res.data.p_ticket_member['model_ticket_2']){
          model_ticket_2 = res.data.p_ticket_member['model_ticket_2'];
          model_items_2 = res.data.p_ticket_member.model_items_2.split(',');
        }



        //初始化主界面队员信息
        let gameTD = res.data.list[0].items;
        let resGTDData = []; //标准版队员新数组
        for(let i=0;i<gameTD.length;i++){
          //console.log('resGTDData[i]='+JSON.stringify(gameTD[i]));
          let myYZMoney = res.data.p_ticket_member[gameTD[i].item] ? res.data.p_ticket_member[gameTD[i].item] : 0;


          resGTDData.push({
            id:gameTD[i].id,
            name:gameTD[i].name,
            image_url:gameTD[i].image_url,
            item:gameTD[i].item,
            now_omission:gameTD[i].now_omission,
            allYZMoney:gameTD[i].p_ticket_all,
            myYZMoney:myYZMoney,
            model_ticket_1:model_ticket_1,//2串1下单金额
            model_items_1:model_items_1, //2串1下单组合内容
            model_ticket_2:model_ticket_2,//3串1下单金额
            model_items_2:model_items_2 //3串1下单组合内容
          },)
        }
        _this.gameTeamData = resGTDData;




        //初始化主界面地点信息
        let gPosition = res.data.list[1].items;
        //处理数据，将所有人投注项，与我自己的投注项进行数据匹配组合
        let resGameData = [];
        for(let i=0;i<gPosition.length;i++){
          let myYZMoney = res.data.p_ticket_member[gPosition[i].item] ? res.data.p_ticket_member[gPosition[i].item] : 0;

          resGameData.push({
            id:gPosition[i].id,
            name:gPosition[i].name,
            item:gPosition[i].item,
            now_omission:gPosition[i].now_omission,
            allYZMoney:gPosition[i].p_ticket_all,
            myYZMoney:myYZMoney,
            model_ticket_1:model_ticket_1,//2串1下单金额
            model_items_1:model_items_1, //2串1下单组合内容
            model_ticket_2:model_ticket_2,//3串1下单金额
            model_items_2:model_items_2 //3串1下单组合内容
          },);
        }
        _this.gameData = resGameData;




        //初始化主界面技能信息
        let gameAction = res.data.list[2].items;
        //处理数据，将所有人投注项，与我自己的投注项进行数据匹配组合
        let resSkillData = [];
        for(let i=0;i<gameAction.length;i++){
          let myYZMoney = res.data.p_ticket_member[gameAction[i].item] ? res.data.p_ticket_member[gameAction[i].item] : 0;

          resSkillData.push({
            id:gameAction[i].id,
            name:gameAction[i].name,
            item:gameAction[i].item,
            now_omission:gameAction[i].now_omission,
            allYZMoney:gameAction[i].p_ticket_all,
            myYZMoney:myYZMoney,
            model_ticket_1:model_ticket_1,//2串1下单金额
            model_items_1:model_items_1, //2串1下单组合内容
            model_ticket_2:model_ticket_2,//3串1下单金额
            model_items_2:model_items_2 //3串1下单组合内容
          },);
        }
        _this.gameSkillData = resSkillData;



      },
      /**更新2串1数据，更新3串1数据**/
      updateGroupData(res){
        console.log('更新2串1数据，更新3串1数据');
        let _this = this;


        /**2串1下单数据**/
        let model_ticket_1 = 0;
        let model_items_1 = [];
        if(res.data.p_ticket_member['model_ticket_1']){
          model_ticket_1 = res.data.p_ticket_member['model_ticket_1'];
          model_items_1 = res.data.p_ticket_member.model_items_1.split(',');
        }

        /**3串1下单数据**/
        let model_ticket_2 = 0;
        let model_items_2 = [];
        if(res.data.p_ticket_member['model_ticket_2']){
          model_ticket_2 = res.data.p_ticket_member['model_ticket_2'];
          model_items_2 = res.data.p_ticket_member.model_items_2.split(',');
        }


        //初始化2串1数据
        //2串1 已押注信息  res.data.p_ticket_member.model_ticket_1
        //2串1 已押注选项  res.data.p_ticket_member.model_item_1
        if(model_ticket_1){

          _this.myInfo.myYzD.myYzChecked = true;
          _this.myInfo.myYzD.myYzMoney = model_ticket_1;
          _this.myInfo.myYzD.myTotalMoney = model_ticket_1;

          //判断队员信息是否有选择的
          let gd = _this.gd;
          for(let i=0;i<gd.length;i++){
            gd[i].checked = false;
            if(model_items_1.indexOf(gd[i].item) >= 0){//如果数组中包含该节点
              gd[i].checked = true;
            }
            console.log('_this.gd='+JSON.stringify(gd));
          }
          //判断地点是否有选择
          let gdA = _this.gdA;
          for(let i=0;i<gdA.length;i++){
            gdA[i].checked = false;
            if(model_items_1.indexOf(gdA[i].item) >= 0){//如果数组中包含该节点
              gdA[i].checked = true;
            }
          }

          //判断事件是否有选择
          let gdB = _this.gdB;
          for(let i=0;i<gdB.length;i++){
            gdB[i].checked = false;
            if(model_items_1.indexOf(gdB[i].item) >= 0){//如果数组中包含该节点
              gdB[i].checked = true;
            }
          }
        }

        //初始化3串1数据
        //3串1 已押注信息  res.data.p_ticket_member.model_ticket_1
        //3串1 已押注选项  res.data.p_ticket_member.model_item_1
        if(model_ticket_2){

          _this.myInfo.myYzE.myYzChecked = true;
          _this.myInfo.myYzE.myYzMoney = model_ticket_2;
          _this.myInfo.myYzE.myTotalMoney = model_ticket_2;

          //判断队员信息是否有选择的
          let gd = _this.gd;
          for(let i=0;i<gd.length;i++){
            gd[i].checked = false;
            if(model_ticket_2.indexOf(gd[i].item) >= 0){//如果数组中包含该节点
              gd[i].checked = true;
            }
          }
          //判断地点是否有选择
          let gdA = _this.gdA;
          for(let i=0;i<gdA.length;i++){
            gdA[i].checked = false;
            if(model_ticket_2.indexOf(gdA[i].item) >= 0){//如果数组中包含该节点
              gdA[i].checked = true;
            }
            //console.log(JSON.stringify(gdA))
          }

          //判断事件是否有选择
          let gdB = _this.gdB;
          for(let i=0;i<gdB.length;i++){
            gdB[i].checked = false;
            if(model_ticket_2.indexOf(gdB[i].item) >= 0){//如果数组中包含该节点
              gdB[i].checked = true;
            }
          }
        }


      },

      //增加积分动画
      jfAnimation(){
        let _this = this;
        console.log('积分动画~');
        $("body").append('<div class="movieMoney" style="position:absolute;right:48%;bottom:80px;z-index:9999;width:30px;height:30px;"><img class="u-flyer" src="/static/images/moneyIcon@2x.png" width="30" height="30"></div>');

        let myGuoziX = document.getElementById('myGuozi').getBoundingClientRect().left;
        //金币图片移动动画
        $(".movieMoney").animate({top:"20px",left:myGuoziX+"px"},1500,"",function(){
          console.log('移动完成');
          //动画执行完成，回调更新果子和金币数量
          _this.myInfo.myGuozi = _this.myInfo.myguoziSer;//将服务器返回的果子赋值给当前果子数量
          _this.myInfo.myMoney = _this.myInfo.myMoneySer;//将服务器返回的金币赋值给当前金币数量
          $(this).remove();
        });

      },
      //获取开奖号码及开奖后我的果子和金币信息
      getWinNumber(){
        let _this = this;

        console.log('请求开奖号码~ localTimeS='+_this.localTimeS+',prizeA='+_this.prizeRes.prizeA);
        _this.$api('/services/canyon/home.php',{
          tag:'getWinNumber',
          is_first:0, //非第一次请求
        })
          .then(function (res) {
            if(res.code!=200){
              layer.open({content: res.message, skin: 'msg',time: 2});
              _this.getWinNumber();//失败后重新请求开奖记录
              return false;
            }

            if(res.data.reward_items.item_1){
              //更新中奖号码
              _this.prizeRes.prizeA = res.data.reward_items.item_1;
              _this.prizeRes.prizeB = res.data.reward_items.item_2;
              _this.prizeRes.prizeC = res.data.reward_items.item_3;

              _this.start(); //开始跑马灯

              //更新待更新果子及金币数量
              _this.myInfo.myguoziSer = res.data.guozi;
              _this.myInfo.myMoneySer = res.data.ticket;

              console.log('开奖啦~第一组='+_this.prizeRes.prizeA+',第二组='+_this.prizeRes.prizeB+',第三组='+_this.prizeRes.prizeC);
            }

          })
          .catch(function (error) {
            layer.open({content: '请求开奖记录失败！！',skin: 'msg',time: 2});
            if(_this.isDebug){
              layer.open({content: '请求开奖记录失败 error='+error, btn: '关闭'});
            }
            console.log('请求开奖记录失败error='+error);
            _this.getWinNumber();//失败后重新请求开奖记录
          })



      },
      /** 开始滚动抽奖 **/
      start(){
        console.log('开始滚动抽奖~ isGameRuning='+this.isGameRuning);
        if(this.isGameRuning) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
          return false;
        } else {
          this.lottery1.init('lottery1');
          this.lottery1.speed = 150;
          this.roll1(); //第一组

          this.lottery2.init('lottery2');
          this.lottery2.speed = 200;
          this.roll2(); //第二组

          this.lottery3.init('lottery3');
          this.lottery3.speed = 200;
          this.roll3(); //第三组

          this.showPrize();//显示中奖弹层

          this.isGameRuning = true; //一次抽奖完成后，设置click为true，可继续抽奖
          return false;
        }
      },





      //点击了押注队员
      yzA(arrIndex,item){
        console.log("yzA 选择押队="+(arrIndex+1)+"，名称="+item);
        let _this = this;
        //判断时间区域
        if(_this.localTimeS>30){
          layer.open({content: '❌ 不在预测时间~',skin: 'msg',time: 2});
          return false;
        }

        _this.myInfo.myYzA = arrIndex;
        let myGTD = this.gameTeamData;
        for (let i=0;i<myGTD.length;i++){
          let thisMyAllMoney = Number(_this.myInfo.myMoney)+0; //当前总剩余金额
          let thisYzMoney = Number(_this.myInfo.myYzMoney)+0;//当前选择的单次押注金额
          if (i==arrIndex) {
            if(this.isMoneyExpense(this.myInfo.myYzMoney)){
              console.log(i+'='+arrIndex+'更新金额');
              console.log('myMoney='+thisMyAllMoney+'，当前节点已押注='+Number(myGTD[i].myYZMoney));
              _this.myInfo.myMoney = (thisMyAllMoney-thisYzMoney);//总金额减当前选择的押注额度

              console.log('myGTD[i].myYZMoney='+myGTD[i].myYZMoney);
              console.log('myGTD[i].myYZMoney='+myGTD[i].myYZMoney);
              if(myGTD[i].myYZMoney){
                myGTD[i].myYZMoney = Number(myGTD[i].myYZMoney)+_this.myInfo.myYzMoney;//更新已押注金额
              }else{
                myGTD[i].myYZMoney = Number(_this.myInfo.myYzMoney);//更新已押注金额
              }
              console.log('myGTD[i].myYZMoney='+myGTD[i].myYZMoney);
              console.log('_this.myInfo.myYzMoney='+_this.myInfo.myYzMoney);



              _this.myInfo.myYzAMoney = _this.myInfo.myYzAMoney+_this.myInfo.myYzMoney;//赋值预测得积分
              //_this.myInfo.myYzAMoney = Number(_this.myInfo.myYzAMoney*18);
              _this.createOrder(item,_this.myInfo.myYzMoney,0,'add');
            }
          }


          //计算队员预测可得积分 gameTeamDataPossibleJF
          let teamArr = [_this.gameTeamData[0].myYZMoney,_this.gameTeamData[1].myYZMoney];
          //sort()排序默认为升序，reverse()将数组掉个
          let max = teamArr.sort().reverse()[0];
          console.log('计算队员,最大的预测分是='+max);
          _this.gameTeamDataPossibleJF = max;


        }

      },
      //点击了押注位置
      yzB(arrIndex,item){
        console.log("选择押赛="+(arrIndex+1)+"，名称="+item);
        let _this = this;
        //判断时间区域
        if(_this.localTimeS>30){
          layer.open({content: '❌ 不在预测时间~',skin: 'msg',time: 2});
          return false;
        }

        _this.myInfo.myYzB = arrIndex;
        let myGD = this.gameData;
        for (let i=0;i<myGD.length;i++){

          if (i==arrIndex) {
            if(this.isMoneyExpense(this.myInfo.myYzMoney)){
              console.log(i+'='+arrIndex+'更新金额');
              console.log('myMoney='+_this.myInfo.myMoney+'，当前节点已押注='+myGD[i].myYZMoney);
              _this.myInfo.myMoney -= _this.myInfo.myYzMoney;//总金额减当前选择的押注额度

              console.log('myGD[i].myYZMoney='+myGD[i].myYZMoney);
              if(myGD[i].myYZMoney){
                myGD[i].myYZMoney = Number(myGD[i].myYZMoney)+_this.myInfo.myYzMoney;//更新已押注金额
              }else{
                myGD[i].myYZMoney = Number(_this.myInfo.myYzMoney);//更新已押注金额
              }
              console.log('myGD[i].myYZMoney='+myGD[i].myYZMoney);
              console.log('_this.myInfo.myYzMoney='+_this.myInfo.myYzMoney);

              _this.myInfo.myYzBMoney = _this.myInfo.myYzBMoney+_this.myInfo.myYzMoney;//赋值预测得积分
              _this.myInfo.myYzBMoney = (_this.myInfo.myYzBMoney*1.8).toFixed(2);
              _this.createOrder(item,_this.myInfo.myYzMoney,0,'add');
            }
          }
        }

      },
      //点击了押注技能
      yzC(arrIndex,item){
        console.log("选择押赛="+(arrIndex+1)+"，名称="+item+",当前剩余金额="+this.myInfo.myMoney);
        let _this = this;
        //判断时间区域
        if(_this.localTimeS>30){
          layer.open({content: '❌ 不在预测时间~',skin: 'msg',time: 2});
          return false;
        }


        _this.myInfo.myYzC = arrIndex;
        let myGSD = this.gameSkillData;
        for (let i=0;i<myGSD.length;i++){

          if (i==arrIndex) {
            if(this.isMoneyExpense(this.myInfo.myYzMoney)){
              console.log(i+'='+arrIndex+'更新金额');
              console.log('myMoney='+_this.myInfo.myMoney+'，当前节点已押注='+myGSD[i].myYZMoney);
              _this.myInfo.myMoney -= _this.myInfo.myYzMoney;//总金额减当前选择的押注额度


              console.log('myGSD[i].myYZMoney='+myGSD[i].myYZMoney);
              if(myGSD[i].myYZMoney){
                myGSD[i].myYZMoney = Number(myGSD[i].myYZMoney)+_this.myInfo.myYzMoney;//更新已押注金额
              }else{
                myGSD[i].myYZMoney = Number(_this.myInfo.myYzMoney);//更新已押注金额
              }
              console.log('myGSD[i].myYZMoney='+myGSD[i].myYZMoney);
              console.log('_this.myInfo.myYzMoney='+_this.myInfo.myYzMoney);



              _this.myInfo.myYzCMoney = _this.myInfo.myYzCMoney+_this.myInfo.myYzMoney;//赋值预测得积分
              _this.myInfo.myYzCMoney = (_this.myInfo.myYzCMoney*1.8).toFixed(2);
              _this.createOrder(item,_this.myInfo.myYzMoney,0,'add');
            }
          }
        }

        console.log('剩余金额='+_this.myInfo.myMoney);

      },

      /**
       * 更改了底部单次押注金额
       * 参数：更改的单次押注金额
       * **/
      changeMyYzMoney(val) {
        this.myInfo.myYzMoney = val;
        console.log("更改了底部单次押注金额=myYzMoney="+val);
      },





      /**
       * 点击下注2串1或3串1； str=1 代表2串1    str=2 代表3串1
       * 获取当前节点下注金额，以及组合方式，提交服务器下单
       * **/
      oDataYZ(str){
        let _this = this;
        //判断时间区域
        if(_this.localTimeS>30){
          layer.open({content: '❌ 不在预测时间~',skin: 'msg',time: 2});
          return false;
        }

        //先验证金钱是否足够下单
        if(this.isMoneyExpense(this.myInfo.myYzMoney)){
          this.myInfo.myMoney -= this.myInfo.myYzMoney; //减金钱
          if(str==1){//2串1
            console.log('点击下注2串1,str='+str);
            _this.myInfo.myYzD.myTotalMoney = Number(_this.myInfo.myYzD.myTotalMoney);
            console.log('typeof(xxx)='+typeof(_this.myInfo.myYzD.myTotalMoney));


            _this.myInfo.myYzD.myYzChecked = true; //更改2串1状态已押注
            //_this.myInfo.myYzD.myTotalMoney = Number(_this.myInfo.myYzD.myTotalMoney)+_this.myInfo.myYzMoney; //减去金额
            _this.myInfo.myYzD.myTotalMoney += _this.myInfo.myYzMoney; //减去金额
            _this.myInfo.myYzD.myYzMoney = _this.myInfo.myYzMoney; //更改当前节点最后一次押注金额
            console.log('myYzChecked='+_this.myInfo.myYzD.myYzChecked);
            console.log('2串1，请求服务器下单；下单数据='+JSON.stringify(_this.myInfo.myYzD));

            let item1 = _this.myInfo.myYzD.data[0].item; //选项1
            let item2 = _this.myInfo.myYzD.data[1].item; //选项2
            let ticket = _this.myInfo.myYzD.myYzMoney; //最后一次押注的门票数

            //下单请求(这里是要扣款)
            this.createOrderGroup(item1,item2,"",ticket,'add','1');
          }else{//3串1
            console.log('点击下注3串1,str='+str);
            _this.myInfo.myYzE.myYzChecked = true; //更改3串1状态已押注
            _this.myInfo.myYzE.myTotalMoney = Number(_this.myInfo.myYzE.myTotalMoney)+_this.myInfo.myYzMoney; //减去金额
            //_this.myInfo.myYzE.myTotalMoney += _this.myInfo.myYzMoney; //累加总投注金额
            _this.myInfo.myYzE.myYzMoney = _this.myInfo.myYzMoney; //更改当前节点最后一次押注金额
            console.log('myYzChecked='+_this.myInfo.myYzE.myYzChecked);
            console.log('3串1，请求服务器下单；下单数据='+JSON.stringify(_this.myInfo.myYzE));

            let item1 = _this.myInfo.myYzE.data[0].item; //选项1
            let item2 = _this.myInfo.myYzE.data[1].item; //选项2
            let item3 = _this.myInfo.myYzE.data[2].item; //选项3
            let ticket = _this.myInfo.myYzE.myYzMoney; //最后一次押注的门票数

            //下单请求(这里是要扣款)
            this.createOrderGroup(item1,item2,item3,ticket,'add','2');
          }
        }
      },
      /**三串一，或二串一下注（选中的名称，选中的数组index，选的哪个分组）**/
      chooseYCItem(name,value,group,item){
        console.log("name="+name+',value='+value+',group='+group+',item='+item);

        let checkedData = this.myInfo.myYzD.data;//总篮子数据，默认操作数据，2串1数据
        if (this.ycItemType==2){
          checkedData = this.myInfo.myYzE.data; //总篮子数据，修改操作数据，3串1数据
        }


        //第一组，红队蓝队 gd
        if(group==1){

          console.log('1组'+value);
          /**
           * 1、查看当前组中是否已经有选择的了
           * 2、如果已经有选择的，1：取消当前gd的所有选择 2：更新总篮子里的当前组的数据
           * 3、如果都没有选，1：总篮子里的数据增加一个
           * **/
          //当前点击的这个是否是已经选中的
          if(this.gd[value].checked == true){
            console.log('当前已经是选中的了~要取消选中，并删除总数据');
            this.gd[value].checked = false; //将自己取消选中
            //删除总数据
            for(let i=0;i<checkedData.length;i++){
              if(checkedData[i].group == group){
                checkedData.splice(i,1);
              }
            }
          }else{
            console.log('当前点击的是没有选中');
            /**
             *
             * 1、其他兄弟有选中的情况下：1将其他兄弟设置为未选中  2将总数据更新  3将自己选中
             * 2、其他兄弟未选中的情况下：1总数据中，添加一个新数据
             *
             * **/

            let isPrevChecked = false; //true 其他兄弟有选中状态,false没有兄弟节点在选中状态
            for(let i=0;i<this.gd.length;i++){
              if(this.gd[i].checked == true){//如果有其他兄弟在选中
                isPrevChecked = true;
              }
            }
            console.log('isPrevChecked='+isPrevChecked);

            //有选中
            if(isPrevChecked == true){
              console.log('有其他兄弟节点在选中状态~');
              for(let i=0;i<this.gd.length;i++){
                this.gd[i].checked = false; //将所有节点设置为未选中
              }
              this.gd[value].checked = true;//将当前节点选中
              //更新数据
              for(let i=0;i<checkedData.length;i++){
                if(checkedData[i].group == group){
                  checkedData[i].name = name;
                  checkedData[i].value = value;
                  checkedData[i].item = item;
                }
              }
            }else{
              //判断当前是 2串1模式，还是3串1模式，判断是否超过当前模式的足最大选择量
              console.log('已下注数量='+checkedData.length);
              if(this.ycItemType == 1 && checkedData.length == 2){
                layer.open({content: '❌ 已超过最大预测项~',skin: 'msg',time: 2});
                return false;
              }

              console.log('更新数据~');
              this.gd[value].checked = true;//将当前节点选中
              checkedData.push({name:name,value:value,group:group,item:item});
            }

          }

        }

        //第二组，第几场
        if(group==2){


          console.log('2组'+value);
          /**
           * 1、查看当前组中是否已经有选择的了
           * 2、如果已经有选择的，1：取消当前gd的所有选择 2：更新总篮子里的当前组的数据
           * 3、如果都没有选，1：总篮子里的数据增加一个
           * **/
          //当前点击的这个是否是已经选中的
          if(this.gdA[value].checked == true){
            console.log('当前已经是选中的了~要取消选中，并删除总数据');
            this.gdA[value].checked = false; //将自己取消选中
            //删除总数据
            for(let i=0;i<checkedData.length;i++){
              if(checkedData[i].group == group){
                checkedData.splice(i,1);
              }
            }
          }else{
            console.log('当前点击的是没有选中');
            /**
             *
             * 1、其他兄弟有选中的情况下：1将其他兄弟设置为未选中  2将总数据更新  3将自己选中
             * 2、其他兄弟未选中的情况下：1总数据中，添加一个新数据
             *
             * **/

            let isPrevChecked = false; //true 其他兄弟有选中状态,false没有兄弟节点在选中状态
            for(let i=0;i<this.gdA.length;i++){
              if(this.gdA[i].checked == true){//如果有其他兄弟在选中
                isPrevChecked = true;
              }
            }
            console.log('isPrevChecked='+isPrevChecked);

            //有选中
            if(isPrevChecked == true){
              console.log('有其他兄弟节点在选中状态~');
              for(let i=0;i<this.gdA.length;i++){
                this.gdA[i].checked = false; //将所有节点设置为未选中
              }
              this.gdA[value].checked = true;//将当前节点选中
              //更新数据
              for(let i=0;i<checkedData.length;i++){
                if(checkedData[i].group == group){
                  checkedData[i].name = name;
                  checkedData[i].value = value;
                  checkedData[i].item = item;
                }
              }
            }else{
              //判断当前是 2串1模式，还是3串1模式，判断是否超过当前模式的足最大选择量
              console.log('已下注数量='+checkedData.length);
              if(this.ycItemType == 1 && checkedData.length == 2){
                layer.open({content: '❌ 已超过最大预测项~',skin: 'msg',time: 2})
                return false;
              }

              console.log('更新数据~');
              this.gdA[value].checked = true;//将当前节点选中
              checkedData.push({name:name,value:value,group:group,item:item});
            }

          }
        }

        //第三组，发生了什么
        if(group==3){

          console.log('3组'+value);
          /**
           * 1、查看当前组中是否已经有选择的了
           * 2、如果已经有选择的，1：取消当前gd的所有选择 2：更新总篮子里的当前组的数据
           * 3、如果都没有选，1：总篮子里的数据增加一个
           * **/
          //当前点击的这个是否是已经选中的
          if(this.gdB[value].checked == true){
            console.log('当前已经是选中的了~要取消选中，并删除总数据');
            this.gdB[value].checked = false; //将自己取消选中
            //删除总数据
            for(let i=0;i<checkedData.length;i++){
              if(checkedData[i].group == group){
                checkedData.splice(i,1);
              }
            }
          }else{
            console.log('当前点击的是没有选中');
            /**
             *
             * 1、其他兄弟有选中的情况下：1将其他兄弟设置为未选中  2将总数据更新  3将自己选中
             * 2、其他兄弟未选中的情况下：1总数据中，添加一个新数据
             *
             * **/

            let isPrevChecked = false; //true 其他兄弟有选中状态,false没有兄弟节点在选中状态
            for(let i=0;i<this.gdB.length;i++){
              if(this.gdB[i].checked == true){//如果有其他兄弟在选中
                isPrevChecked = true;
              }
            }
            console.log('isPrevChecked='+isPrevChecked);

            //有选中
            if(isPrevChecked == true){
              console.log('有其他兄弟节点在选中状态~');
              for(let i=0;i<this.gdB.length;i++){
                this.gdB[i].checked = false; //将所有节点设置为未选中
              }
              this.gdB[value].checked = true;//将当前节点选中
              //更新数据
              for(let i=0;i<checkedData.length;i++){
                if(checkedData[i].group == group){
                  checkedData[i].name = name;
                  checkedData[i].value = value;
                  checkedData[i].item = item;
                }
              }
            }else{
              //判断当前是 2串1模式，还是3串1模式，判断是否超过当前模式的足最大选择量
              console.log('已下注数量='+checkedData.length);
              if(this.ycItemType == 1 && checkedData.length == 2){
                layer.open({content: '❌ 已超过最大预测项~',skin: 'msg',time: 2})
                return false;
              }

              console.log('更新数据~');
              this.gdB[value].checked = true;//将当前节点选中
              checkedData.push({name:name,value:value,group:group,item:item});
            }

          }
        }

        //计算最多可得积分 myYzD.possibleJF
        //[{"name":"中路","value":1,"group":"2","item":"item2_2"},{"name":"原地被秒","value":2,"group":3,"item":"item3_3"}]
        let possibleArr = this.myInfo.myYzD.data;
        if(possibleArr && possibleArr.length == 2){
          let arr1 = possibleArr[0].group;
          let arr2 = possibleArr[1].group;
          let sum = parseInt(arr1)+parseInt(arr2);
          if(sum==3){
            this.myInfo.myYzD.possibleJF = 75;
          }else if(sum == 4){
            this.myInfo.myYzD.possibleJF = 176;
          }else{
            this.myInfo.myYzD.possibleJF = 411;
          }
          console.log('当前组合方式可得积分：'+this.myInfo.myYzD.possibleJF);

        }

      },

      /**普通模式下单**/
      createOrder(item,money,model,action){
        let _this = this;
        console.log('下单请求：item='+item+',money='+money);

        let keyArr= ["ticket","phase_time",item,"model",action];
        let valArr = [money,_this.phaseTime,money,model,action];
        function fn(keyArr,valArr){
          let data = {};
          for(let i = 0;i<keyArr.length;i++){
            let key = keyArr[i];
            let val = valArr[i];
            data[key] = val;
          }
          return data;
        }
        let parameter = fn(keyArr,valArr);

        //废弃不用，参考用
        let parmar = {
          ticket:money, //当前下单扣款金额
          phase_time:_this.phaseTime, //当期数
          item:item, //是哪个节点
          model:model, //模式：0:普通、1:2串1、2:3串1
          action:action, //是否扣门票, add:扣门票(默认)，edit:不扣门票（只针对模式2和3只是修改数据，没修改下单金额的情况下）
        };

        this.$api('/services/canyon/create_order.php',parameter)
          .then(function (res) {
            if (res.code != 200){
              layer.open({
                content: res.message
                ,skin: 'msg'
                ,time: 1 //2秒后自动关闭
              });
            }

            layer.open({content: '预测成功！',skin: 'msg',time: 2});
            _this.initData();//下单完成后要重新获取最新数据（本次请求中，所有人的投注项可能有延时）

            //服务器所有投注数据返回有延迟，需要延时再次请求一次
            setTimeout(function(){
              _this.initData();//下单完成后要重新获取最新数据
            },1000);


          })
          .catch(function (error) {
            layer.open({content: '❌ '+error.data.message,skin: 'msg',time: 2});
            if(_this.isDebug){
              layer.open({content: '普通模式下单失败 error='+error, btn: '关闭'});
            }
          })
      },
      /**
       * 2串1 或 3串1 请求服务器下单
       * item1_1:1 //2串1 item必须有2个组合项，3串1必须有3个组合项，值默认都传1
       * item2_1:1
       * item3_1:1
       * ticket:30  当前2串1节点的押注金额
       * model:1 //1是2串1
       * action:add  //是否扣门票  如果当前2串1下单了，则修改组合项目，点确定传edit不需要重新扣款；如果先点了组合项目，后点的下单按钮，则需要扣门票
       * type:1  //1是2串1，2是3串1
       *
       * **/
      createOrderGroup(item1,item2,item3,tiekcet,action,type){
        let _this = this;

        let successText = '订单修改成功~';
        if(action=="add"){
          successText = '预测成功~';
        }

        let keyArr= [];
        let valArr = [];
        if(type==1){
          console.log('2串1 请求服务器下单：item1='+item1+',item2='+item2+',tiekcet='+tiekcet+',action='+action);
          keyArr= [item1,item2,"ticket","phase_time","model","action"];
          valArr = ["1","1",tiekcet,_this.phaseTime,1,action];
        }else{
          console.log('3串1 请求服务器下单：item1='+item1+',item2='+item2+',item3='+item3+',tiekcet='+tiekcet+',action='+action);
          keyArr= [item1,item2,item3,"ticket","phase_time","model","action"];
          valArr = ["1","1","1",tiekcet,_this.phaseTime,2,action];
        }

        function fn(keyArr,valArr){
          let data = {};
          for(let i = 0;i<keyArr.length;i++){
            let key = keyArr[i];
            let val = valArr[i];
            data[key] = val;
          }
          return data;
        }
        let parameter = fn(keyArr,valArr);

        this.$api('/services/canyon/create_order.php',parameter)
          .then(function (res) {
            if (res.code == 200){
              layer.open({content: successText,skin: 'msg',time: 2});
              _this.closeForecast();//关闭弹窗
              _this.initData();//2串1 或 3串1 请求服务器下单后要获取最新数据
            }else{
              layer.open({
                content: res.message
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
            }

          })
          .catch(function (error) {
            layer.open({
              content: error.data.message
              ,btn: '关闭'
            });
            if(_this.isDebug){
              layer.open({content: '组合模式下单失败 error='+error, btn: '关闭'});
            }
          })
      },
      /** 点击了取消押注、撤单、取消订单提交 **/
      cancelOrderAct(){
        let _this = this;
        //判断时间区域是否允许撤单
        if(_this.localTimeS>30){
          layer.open({content: '❌ 抽奖已开始，无法撤单~',skin: 'msg',time: 2});
          return false;
        }

        //开始请求撤单
        this.$api('/services/canyon/cancel_order.php',{phase_time:_this.phaseTime})
          .then(function (res) {
            if (res.code != 200){
              layer.open({content: '❌ '+res.message,skin: 'msg',time: 2});
              return false;
            }
          }).catch(function (error) {
          layer.open({content: '❌ '+error.data.message,skin: 'msg',time: 2});
          if(_this.isDebug){
            layer.open({content: '取消订单失败 error='+error, btn: '关闭'});
          }
        })

        //取消所有押注积分计算
        _this.myInfo.myYzAMoney = 0;
        _this.myInfo.myYzBMoney = 0;
        _this.myInfo.myYzCMoney = 0;

        _this.myInfo.myYzD.myTotalMoney = 0;
        _this.myInfo.myYzE.myTotalMoney = 0;

        _this.initData();//取消订单后，要重新获取最新数据

      },
      //判断金钱是否足够押注
      isMoneyExpense(money){
        if((this.myInfo.myMoney - this.myInfo.myYzMoney) < 0){
          layer.open({content: 'OMG~ 😭 门票不够了~',skin: 'msg',time: 2});
          return false;
        }else{
          return true;
        }
      },




      //点击了左上角菜单
      headerMenuBtn(){
        console.log('showMenu');
        this.isHomeMenuShow = true; //显示左上角弹出菜单
        console.log(this.isHomeMenuShow);
      },
      //显示玩法说明
      showReadme(){
        this.isHomeMenuShow = false; //隐藏左上角弹出菜单
        this.isReadmeShow = !this.isReadmeShow;
      },
      closeReadme(){
        this.isReadmeShow = false;
      },



      //显示数据分析弹层
      showDataAnalysis(){
        console.log('显示数据分析弹层');
        let _this = this;

        //请求数据
        this.$api('/services/canyon/get_history.php',{})
          .then(function (res) {
            if (res.code != 200){
              layer.open({
                content: res.message
                ,skin: 'msg'
                ,time: 1 //2秒后自动关闭
              });
              return false;
            }
            //填充数据
            _this.dataAnalysis.betData.data = res.data.current_broadcast; //当前播报
            _this.dataAnalysis.omitData.data = res.data.now_omission; //当前遗漏
            _this.dataAnalysis.occurrenceNumberData.data = res.data.number_occurrences; //出现次数
            _this.dataAnalysis.avgOmitData.data = res.data.average_omission; //平均遗漏
            _this.dataAnalysis.maxOmitData.data = res.data.max_omission; //最大遗漏
            _this.dataAnalysis.maxSerial.data = res.data.max_appearance; //最大连续
            _this.dataAnalysis.probabilityData.data = res.data.index_of_appear; //欲出指数

          })
          .catch(function (error) {
            layer.open({content: '❌ '+error.data.message,skin: 'msg',time: 2});
          })

        this.isHomeMenuShow = false; //隐藏左上角弹出菜单
        this.isDataAnalysisShow = true; //显示数据分析弹层
      },

      //切换数据分析tab
      changeDataAnalysis(tab){
        this.dataAnalysis.thisShow = tab; //切换tab显示
        this.dataAnalysis.filterTimeIndex = 1;//时间筛选器重置默认选至今
        this.dataAnalysis.filterText = '至今';
        this.isShowDataHelp = false; //隐藏帮助提示
        this.dataAnalysis.filterStatus = false; //隐藏时间筛选器
      },
      //显示数据分析帮助浮层
      showDataHelp(){
        this.isShowDataHelp = !this.isShowDataHelp;
      },
      //更改了数据分析选择时间 str=时间周期参数,type=哪段数据,index=节点,text=至今
      changeTimeFilter(str,type,index,text){
        let _this = this;
        //type=number_occurrences//出现次数
        //type=average_omission //平均遗漏
        //type=index_of_appear //欲出指数

        /*
        //本地数据名称
        _this.dataAnalysis.betData.data = res.data.current_broadcast; //当前播报
        _this.dataAnalysis.omitData.data = res.data.now_omission; //当前遗漏
        _this.dataAnalysis.occurrenceNumberData.data = res.data.number_occurrences; //出现次数
        _this.dataAnalysis.avgOmitData.data = res.data.max_appearance; //平均遗漏
        _this.dataAnalysis.maxOmitData.data = res.data.max_omission; //最大遗漏
        _this.dataAnalysis.maxSerial.data = res.data.max_appearance; //最大连续
        _this.dataAnalysis.probabilityData.data = res.data.index_of_appear; //欲出指数
        */

        if(type=='' || str == ''){
          layer.open({content: '参数错误~',skin: 'msg',time: 2});
          return false;
        }

        _this.dataAnalysis.filterTimeIndex = index;
        _this.dataAnalysis.filterText = text;

        //请求数据
        this.$api('/services/canyon/get_history_other.php',{
          type1:type, //哪段数据
          type2:str, //时间周期参数
        })
          .then(function (res) {
            if (res.code != 200){
              layer.open({
                content: res.message
                ,skin: 'msg'
                ,time: 1 //2秒后自动关闭
              });
              return false;
            }
            //填充数据
            switch(type)
            {
              case 'number_occurrences'://出现次数
                _this.dataAnalysis.occurrenceNumberData.data = res.data;
                break;
              case 'average_omission'://平均遗漏
                _this.dataAnalysis.avgOmitData.data = res.data;
                break;
              case 'index_of_appear'://欲出指数
                _this.dataAnalysis.probabilityData.data = res.data;
                break;
              default:
                return false;
            }
            _this.dataAnalysis.filterStatus = false; //隐藏时间筛选器

          })
          .catch(function (error) {
            layer.open({content: '❌ '+error.data.message,skin: 'msg',time: 2});
          })



      },

      //工具传入item 返回当前 item的中文名
      itemToName(item){
        const arr = [
          {item:'item1_1',name:'红方'},
          {item:'item1_2',name:'蓝方'},
          {item:'item2_1',name:'上路'},
          {item:'item2_2',name:'中路'},
          {item:'item2_3',name:'下路'},
          {item:'item2_4',name:'野区'},
          {item:'item2_5',name:'高地'},
          {item:'item3_1',name:'抱团推塔'},
          {item:'item3_2',name:'越塔强杀'},
          {item:'item3_3',name:'原地被秒'},
          {item:'item3_4',name:'互相尬舞'},
          {item:'item3_5',name:'包围五人'},
          {item:'item3_6',name:'当场失业'},
          {item:'item3_7',name:'收获三杀'},
          {item:'item3_8',name:'强拿一塔'},
          {item:'item3_9',name:'轻松超神'},
          {item:'item3_10',name:'传送绕后'},
          {item:'item3_11',name:'单人带线'},
          {item:'item3_12',name:'抗塔输出'},
        ];

        let name = '';
        arr.forEach(function(value,index,arr){
          if(value.item == item){
            name = value.name;
          }
        });

        return name;
      },


      //显示2串1，3串1预测弹层
      showForecast(type){
        this.ycItemType = type; //
        this.isForecastShow = true;
        let _this = this;

        _this.getOmitData();

        //组合选择类型，1=2串1 、2=3串1
        //处理第三组默认选中数据
        if(type==2){
          /** 3串1 已选数据~ **/
          console.log('3串1 已选数据~');
          //3串1 已选的
          let myYzEData = this.myInfo.myYzE.data;

          //1、查找队员是否有选中状态
          this.gd.forEach(function(value,index,arr){
            console.log('队员 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了团队
            for(let i=0;i<myYzEData.length;i++){
              if(value.item == myYzEData[i].item){
                arr[index].checked = 1;
              }
            }
          });

          //2、查找位置是否有选中状态
          this.gdA.forEach(function(value,index,arr){
            console.log('位置 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了位置
            for(let i=0;i<myYzEData.length;i++){
              if(value.item == myYzEData[i].item){
                arr[index].checked = 1;
              }
            }
          });
          //3、查找技能是否有选中状态
          this.gdB.forEach(function(value,index,arr){
            console.log('技能 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了技能
            for(let i=0;i<myYzEData.length;i++){
              if(value.item == myYzEData[i].item){
                arr[index].checked = 1;
              }
            }
          });



          // this.gd[0].checked = 1;
          // this.gdA[0].checked = 1;
          // this.gdB[0].checked = 1;
        }else{
          /** 2串1 已选数据~ **/
          console.log('2串1 已选数据~');
          //2串1 已选的
          let myYzDData = this.myInfo.myYzD.data;

          //1、查找队员是否有选中状态
          this.gd.forEach(function(value,index,arr){
            console.log('团队 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了团队
            for(let i=0;i<myYzDData.length;i++){
              if(value.item == myYzDData[i].item){
                arr[index].checked = 1;
              }
            }
          });

          //2、查找位置是否有选中状态
          this.gdA.forEach(function(value,index,arr){
            console.log('位置 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了位置
            for(let i=0;i<myYzDData.length;i++){
              if(value.item == myYzDData[i].item){
                arr[index].checked = 1;
              }
            }
          });

          //3、查找技能是否有选中状态
          this.gdB.forEach(function(value,index,arr){
            console.log('位置 value='+value.name+',index='+index+',arr='+arr[index].item);
            arr[index].checked = 0;
            //循环已经选择的数据中是否包含了技能
            for(let i=0;i<myYzDData.length;i++){
              if(value.item == myYzDData[i].item){
                arr[index].checked = 1;
              }
            }
          });
        }


      },
      //获取当前遗漏数据
      getOmitData(){
        let _this = this;

        //请求数据
        this.$api('/services/canyon/get_history.php',{})
          .then(function (res) {
            if (res.code != 200){
              layer.open({
                content: res.message
                ,skin: 'msg'
                ,time: 1 //2秒后自动关闭
              });
              return false;
            }else{


              //获取服务器给到的当前遗漏数据转数组字符串
              let resOm = [];//当前遗漏数组(队员)
              for (let i in res.data.now_omission) {
                resOm.push(res.data.now_omission[i]+''); //属性
              }


              /**选手--当前遗漏数据**/
              let myGD = _this.gd;
              for (let i=0; i<myGD.length; i++){
                myGD[i].omit = resOm[i];
              }

              /**位置地点--当前遗漏数据**/
              let omPosition = resOm.slice(2,7);//当前遗漏数组(队员)
              let myGDA = _this.gdA;
              for (let i=0; i<myGDA.length; i++){
                myGDA[i].omit = omPosition[i];
              }

              /**技能--当前遗漏数据**/
              let omAction = resOm.slice(7,19);//当前遗漏数组(队员)
              let myGDB = _this.gdB;
              for (let i=0; i<myGDB.length; i++){
                myGDB[i].omit = omAction[i];
              }


            }

          })
          .catch(function (error) {
            layer.open({content: '❌ '+error,skin: 'msg',time: 2});
          })

      },
      //关闭 2串1，3串1预测弹层
      closeForecast(){
        //恢复数据为上一次状态
        let c2Data = this.myInfo.myYzD.data;
        let c3Data = this.myInfo.myYzE.data;

        //ycItemType:1, //组合选择类型，1=2串1 、2=3串1
        if(this.ycItemType == 1){
          if(c2Data.length < 2){
            layer.open({content: '请至少选择2项！',skin: 'msg',time: 2});
            return false;
          }
        }else if(this.ycItemType == 2){
          if(c3Data.length < 3){
            layer.open({content: '请至少选择3项！',skin: 'msg',time: 2});
            return false;
          }
        }

        this.isForecastShow = false;
      },
      //确认修改 2串1，3串1数据，如果当前节点已经押注，要请求服务器进行组合方式更改
      confirmForecast(){
        if(this.ycItemType==1){
          if(this.myInfo.myYzD.data.length!=2){layer.open({content: '请至少选择2项！',skin: 'msg',time: 2});return false;}
          let isYZ = this.myInfo.myYzD.myYzChecked;
          let isYZMoney = this.myInfo.myYzD.myYzMoney;

          console.log('2串1押注状态：'+isYZ);
          console.log('当前选择的是2串1，'+this.ycItemType+',选择的项目是：'+JSON.stringify(this.myInfo.myYzD));

          let item1 = this.myInfo.myYzD.data[0].item; //选项1
          let item2 = this.myInfo.myYzD.data[1].item; //选项2
          let ticket = this.myInfo.myYzD.myYzMoney; //最后一次押注的门票数
          let action = isYZ?'edit':'add'; //是否扣款，如果是选中状态，更改节点不扣款
          console.log('2串1押注状态：'+isYZ);
          //如果当前的2串1 已经下注了，则组合数据更改后，点击确认需要更新订单
          if(isYZ==true){
            //下单请求(这里是更新订单)
            console.log('2串1  下单请求(这里是更新订单) isYZ='+isYZ);
            this.createOrderGroup(item1,item2,"",ticket,action,'1');
          }else{
            layer.open({content: '保存成功，可以预测了~',skin: 'msg',time: 2});
            this.closeForecast();//关闭弹窗
          }


        }else{
          if(this.myInfo.myYzE.data.length!=3){layer.open({content: '请至少选择3项！',skin: 'msg',time: 2});return false;}
          let isYZ = this.myInfo.myYzE.myYzChecked;
          let isYZMoney = this.myInfo.myYzE.myYzMoney;

          console.log('3串1押注状态：'+isYZ);
          console.log('当前选择的是3串1'+this.ycItemType+',选择的项目是：'+JSON.stringify(this.myInfo.myYzE));


          let item1 = this.myInfo.myYzE.data[0].item; //选项1
          let item2 = this.myInfo.myYzE.data[1].item; //选项2
          let item3 = this.myInfo.myYzE.data[2].item; //选项3
          let ticket = this.myInfo.myYzE.myYzMoney; //最后一次押注的门票数
          let action = isYZ?'edit':'add'; //是否扣款，如果是选中状态，更改节点不扣款
          console.log('3串1押注状态：'+isYZ);
          //如果当前的3串1 已经下注了，则组合数据更改后，点击确认需要更新订单
          if(isYZ==true){
            //下单请求(这里是更新订单)
            console.log('3串1  下单请求(这里是更新订单) isYZ='+isYZ);
            this.createOrderGroup(item1,item2,item3,ticket,action,'2');
          }else{
            layer.open({content: '保存成功，可以预测了~',skin: 'msg',time: 2});
            this.closeForecast();//关闭弹窗
          }

        }

      },









      //进入倒计时下注
      countDownStart(){
        let _this = this;
        layer.open({content: '游戏开始，请预测~',skin: 'msg',time: 2});
        _this.initData(); //开始倒计时时，用户有可能是中途进来的，要重新初始化数据

      },
      //显示中奖结果
      showPrize(){
        $("#prizeActionSheet").animate({bottom:"0px"},1200); //推出显示获奖结果ActionSheet
      },
      /** 计算奖金 **/
      hidePrize(){
        let _this = this;
        _this.cleanWinActItem();

        //延时4秒 计算获奖金额
        let timeOjsj = setTimeout(function x(){
          layer.open({content: '正在计算奖金~',skin: 'msg',time: 4});
          //本次增加奖金
          //_this.myInfo.myMoney = _this.myInfo.myMoney*2;
          console.log('本次增加后，我的门票='+_this.myInfo.myMoney);
          $("#restext1").animate({"left":"1000px"},{duration:1500});
          $("#restext2").animate({"left":"1000px"},{duration:1500});
          $("#restext3").animate({"left":"1000px"},{duration:1500});

          //获奖 ActionSheet 提示 复位
          _this.prizeRes.prizeAName = '哪位选手';
          _this.prizeRes.prizeBName = '哪个';
          _this.prizeRes.prizeCName = '发生什么事';


          //判断如果服务器返回的果子数量比当前的果子数量多，则调用金币飞的动画
          console.log('_this.myInfo.myguoziSer='+_this.myInfo.myguoziSer);
          console.log('_this.myInfo.myGuozi='+_this.myInfo.myGuozi);
          if(_this.myInfo.myguoziSer > _this.myInfo.myGuozi){
            _this.jfAnimation();//调用奖金动画
          }
        },2000);


      },
      //清除中奖结果锁定状态
      /** 隐藏中奖结果 **/
      cleanWinActItem(){
        let _this = this;

        this.isGameRuning = false; //可以开始游戏

        $("#prizeActionSheet").animate({bottom:"-600px"},1200); //隐藏获奖记录ActionSheet
        $(".lottery-unit").removeClass('active'); //取消所有中奖按钮的选中状态
        $(".lottery-unit").removeClass('red');
        $(".lottery-unit").removeClass('blue');

        //取消所有押注积分
        _this.myInfo.myYzAMoney = 0;
        _this.myInfo.myYzBMoney = 0;
        _this.myInfo.myYzCMoney = 0;

        //取消2串1押注数据
        _this.myInfo.myYzD.myYzChecked = false;
        _this.myInfo.myYzD.myYzMoney = 0;
        _this.myInfo.myYzD.myTotalMoney = 0;
        //取消3串1押注数据
        _this.myInfo.myYzE.myYzChecked = false;
        _this.myInfo.myYzE.myYzMoney = 0;
        _this.myInfo.myYzE.myTotalMoney = 0;

      },








      /**跑马灯1 队员**/
      roll1:function(){
        let _this = this;
        _this.lottery1.times += 1;
        _this.lottery1.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        _this.lottery1.prize = _this.prizeRes.prizeA-1;//开奖号

        if(_this.lottery1.times > _this.lottery1.cycle + 10 && _this.lottery1.prize == _this.lottery1.index) {
          clearTimeout(_this.lottery1.timer);


          /***这段是模拟，真实情况下的当前结果是来自服务器数据，这段可以删除***/
          let thisTeam = $("#lottery1").find(".lottery-unit-"+_this.lottery1.index).data('team');

          $("#restext1").animate({"left":"0"},{duration:1500});
          _this.prizeRes.prizeAName = thisTeam;
          console.log('锁定的='+_this.lottery1.index+",team="+thisTeam);
          _this.prizeRes.prizeAName = thisTeam;
          /*******end*******/

          _this.lottery1.prize = -1;
          _this.lottery1.times = 0;
          //click = false;
        } else {
          if(_this.lottery1.times < _this.lottery1.cycle) {
            _this.lottery1.speed -= 10;
          } else if(_this.lottery1.times == _this.lottery1.cycle) {
            console.log('第一组开奖号='+_this.prizeRes.prizeA);

          } else {
            //times转动次数
            if(_this.lottery1.times > _this.lottery1.cycle + 10 && ((_this.lottery1.prize == 0 && _this.lottery1.index == 1) || _this.lottery1.prize == _this.lottery1.index + 1)) {
              _this.lottery1.speed += 110;
            } else {
              _this.lottery1.speed += 20;
            }
          }
          if(_this.lottery1.speed < 100) {
            _this.lottery1.speed = 100;
          };


          //循环调用
          //console.log('lottery1.timer='+_this.lottery1.timer);
          _this.lottery1.timer = setTimeout(this.roll1, _this.lottery1.speed);

        }
        return false;
      },
      /**跑马灯2 位置**/
      roll2:function(){
        let _this = this;
        _this.lottery2.times += 1;
        _this.lottery2.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        _this.lottery2.prize = _this.prizeRes.prizeB-1;//开奖号

        if(_this.lottery2.times > _this.lottery2.cycle + 10 && _this.lottery2.prize == _this.lottery2.index) {
          clearTimeout(_this.lottery2.timer);

          //$('#res2').html(lottery2.index);
          let thisName = $("#lottery2").find(".lottery-unit-"+_this.lottery2.index).data('item');
          let thisDomItem = $("#lottery2").find(".lottery-unit-"+_this.lottery2.index);
          if(_this.prizeRes.prizeA === 1){//如果是红队锁定，更新item为红色锁定样式
            $(thisDomItem).addClass('red');
          }else{
            $(thisDomItem).addClass('blue');
          }
          $("#restext2").animate({"left":"0"},{duration:1500});
          _this.prizeRes.prizeBName = thisName;
          console.log('锁定的='+_this.lottery2.index+",itemName="+thisName);


          _this.lottery2.prize = -1;
          _this.lottery2.times = 0;
          //click = false;
        } else {
          if(_this.lottery2.times < _this.lottery2.cycle) {
            _this.lottery2.speed -= 10;
          } else if(_this.lottery2.times == _this.lottery2.cycle) {

            /**静态演示，随机产生一个奖品序号，实际需请求接口产生**/
            console.log('第二组开奖号='+_this.prizeRes.prizeB);
            /**静态演示，随机产生一个奖品序号，实际需请求接口产生**/

          } else {
            if(_this.lottery2.times > _this.lottery2.cycle + 10 && ((_this.lottery2.prize == 0 && _this.lottery2.index == 4) || lottery2.prize == lottery2.index + 1)) {
              _this.lottery2.speed += 110;
            } else {
              _this.lottery2.speed += 20;
            }
          }
          if(_this.lottery2.speed < 80) {
            _this.lottery2.speed = 80;
          };

          //循环调用
          _this.lottery2.timer = setTimeout(this.roll2, _this.lottery2.speed);
          //console.log('lottery2.timer='+lottery2.timer);
        }
        return false;
      },
      /**跑马灯3 事件**/
      roll3:function(){
        let _this = this;
        _this.lottery3.times += 1;
        _this.lottery3.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        _this.lottery3.prize = _this.prizeRes.prizeC-1;//开奖号

        if(_this.lottery3.times > _this.lottery3.cycle + 10 && _this.lottery3.prize == _this.lottery3.index) {
          clearTimeout(_this.lottery3.timer);

          //$('#res3').html(lottery3.index);
          let thisName = $("#lottery3").find(".lottery-unit-"+_this.lottery3.index).data('item');
          let thisDomItem = $("#lottery3").find(".lottery-unit-"+_this.lottery3.index);
          if(_this.prizeRes.prizeA === 1){//如果是红队锁定，更新item为红色锁定样式
            $(thisDomItem).addClass('red');
          }else{
            $(thisDomItem).addClass('blue');
          }
          $("#restext3").animate({"left":"0"},{duration:1500});
          //$("#res3").animate({"backgroundPositionX":"500px","backgroundPositionY":"0px"},{duration:500});
          _this.prizeRes.prizeCName = thisName;
          console.log('锁定的='+_this.lottery3.index+",itemName="+thisName);


          //延时显示获奖结果
          let timeO2 = setTimeout(function x(){
            _this.hidePrize(); //隐藏中奖记录
          },5000);


          _this.lottery3.prize = -1;
          _this.lottery3.times = 0;
          //click = false;
        } else {
          if(_this.lottery3.times < _this.lottery3.cycle) {
            _this.lottery3.speed -= 10;
          } else if(_this.lottery3.times == _this.lottery3.cycle) {

            /**静态演示，随机产生一个奖品序号，实际需请求接口产生**/
            console.log('第三组开奖号='+_this.prizeRes.prizeC);
            /**静态演示，随机产生一个奖品序号，实际需请求接口产生**/

          } else {
            if(_this.lottery3.times > _this.lottery3.cycle + 10 && ((_this.lottery3.prize == 0 && _this.lottery3.index == 11) || _this.lottery3.prize == _this.lottery3.index + 1)) {
              _this.lottery3.speed += 110;
            } else {
              _this.lottery3.speed += 20;
            }
          }
          if(_this.lottery3.speed < 100) {
            _this.lottery3.speed = 100;
          };

          //循环调用
          _this.lottery3.timer = setTimeout(this.roll3, _this.lottery3.speed);
          //console.log('lottery3.timer='+lottery3.timer);
        }
        return false;
      },



      //充值
      rechargeBtn (){
        console.log('充值~');
        this.pushEvent(store.get('loginInfo').type, 'chongzhi_btn', '');
        location.href = "qtpay://guessBuy?game_app_id=5";
      },
    }
  }
</script>

<style lang="stylus" scoped>

  mainBgColor = #26244C;

  teamJGBg = #26254b;
  teamABg = linear-gradient(-80deg, #26254b 5.6%, #3A3682 0);
  teamAActiveBg = linear-gradient(-80deg, #26254b 5.6%, #EF1B5A 0);
  teamABgImg = '../assets/image/RED_1_dark@2x.png';
  teamABgImgHover = '../assets/image/RED_2@2x.png';

  teamBBg = linear-gradient(-80deg, #3A3682 94.3%, #26254b 0px);
  teamBActiveBg = linear-gradient(-80deg, #5348ff 94.3%, #26254b 0px);
  teamBBgImg = '../assets/image/BLUE_1_dark@2x.png';
  teamBBgImgHover = '../assets/image/BLUE_2@2x.png';

  itemColor = #fff;
  itemBgColor = #3A3682;
  itemShadowBg = rgba(31,29,61,0.5);
  itemActiveBgRed = #ec225d;
  itemActiveBgBlue = #5451fb;

  layerTextColor = #B2B0D2;
  layerBg = linear-gradient(-45deg, #1b1a37 25%, #17162f 0, #17162f 50%, #1b1a37 0, #1b1a37 75%, #17162f 0);
  layerBgLight = linear-gradient(-45deg, #5f5bfb 25%, #5451fb 0, #5451fb 50%, #5f5bfb 0, #5f5bfb 75%, #5451fb 0);

  footerMenuBg = rgba(83,72,255,1) url("../assets/image/footer-bg-dark.png") top center no-repeat;




  * {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    user-select: inherit;
  }
  html{

  }
  body{
    font-family: "PingFang SC";
    color: #fff;
    margin: 0;
    padding: 0;
    position: inherit;

  }
  div,a,img {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select:none;
  }
  .mt10{margin-top:10px;}
  .mt15{margin-top:15px;}
  .mt20{margin-top:20px;}
  .mt30{margin-top:30px;}
  .mt40{margin-top:40px;}
  .mt50{margin-top:50px;}

  .fz-20{ font-size:20px;}
  .fz-24{ font-size:24px;}
  .fz-48{ font-size:48px;}

  .text-left{text-align:left;}
  .text-center{text-align:center;}
  .text-right{text-align:right;}

  .c-lightgray{
    color: #b2b0d2;
  }
  .c-rosered{
    color: #ED2C64;
  }
  .c-blue{color:#5348FF;}

  /* 等待游戏开始提示 */
  .game-wait-tips{
    width:100%;height:100%;
    position:absolute;
    z-index:99999;left:0;top:0;
    //background:rgba(0,0,0,0.85);
    display flex;justify-content center;align-items center;

    .content{
      width: 500px;
      position: absolute;
      z-index: 2;
      top: 452px;
      margin:0 auto;

      .modal{
        width:476px;
        height:480px;
        padding:50px 30px;
        background:#fff;
        border-radius:12px;
        display flex;justify-content center;align-items:flex-start;
        flex-wrap:wrap;
        position relative;


        .icon{
          width:134px;
          height:154px;

          img {
            max-width 100%;
          }
        }
        .desc{
          margin-top:24px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(91,87,154,1);
          line-height:44px;
        }
        .button{
          margin-top:44px;
          width:254px;
          height:64px;
          line-height @height;
          text-align center;
          background:rgba(83,72,255,1);
          border-radius:12px;
          font-size:24px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#fff;
        }

      }


    }


  }




  .main{
    background mainBgColor;
    height: 100%;
    width: 100%;
    position: fixed;
  }
  main,header{
    min-width: 375px;
    max-width: 800px;
    margin:0 auto;
  }

  header{
    background: #fff;
    display: flex;
    align-items:center;
    justify-content: space-between;
    height:72px;
    background:linear-gradient(90deg,rgba(239,27,90,1) 0%,rgba(83,72,255,1) 100%);
    position: fixed;
    top:0;
    z-index 100;
    width: 100%;

    .left{
      margin-left:20px;
      display:inline-flex;
      align-items:center;
    }
    .right{
      //width: 150px;
      margin-right:20px;
      display:inline-flex;
      align-items:center;
      justify-content: flex-end;
    }
    .h-money{
      margin-right:28px;color:#FFFFFF;font-size:28px;
    }
    .plus{
      width:48px;
      height:48px;
      display: flex;
      justify-content: center;
      align-items: center;
      float:right;
      margin-left:20px;
    }
  }


  main{
    margin-top:72px;
    height 1300px;
  }

  a{ text-decoration: none;}

  //黑色半透明遮罩层
  #zzBg{
    position:fixed;z-index:9999;width:100%;height:100%;background:rgba(0,0,0,0.85);
  }





  .home-menu-modal{
    position relative;
    z-index 9999;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.7);
  }
  .home-menu{
    width:260px;
    padding:36px;
    position:absolute;
    top:30px;
    left:30px;
    z-index:10000;
    background:rgba(248,247,250,1);
    border-radius:12px;
    font-size:24px;

    ul{
      list-style: none;
      padding: 0;
    }
    li{
      list-style: none;

      a{
        display: inline-block;
        margin-left:36px;
        height: 56px;
        line-height: 56px;
        font-size:24px;
        color: #5B579A;
      }
    }
  }




  .layer {
    width 100%;
    font-weight: bold;
    padding:0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    background: layerBg;
    background-size: 60px 60px;
  }

  .xt{
    padding:16px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;

    .js{
      width:164px;height:132px;position:relative;margin-top:20px;

      span{
        width: 100%;
        display: inline-block;
        text-align: center;
        position:absolute;
        color:itemColor;
        font-size:24px;
        left:0px;
      }
      span.it1{top:28px;}
      span.it2{top:60px;}
    }

    .jsjl{
      width:164px;height:132px;position:relative;margin-top:20px;

      span{
        width: 100%;
        display: inline-block;
        text-align: center;
        position:absolute;
        color:itemColor;
        font-size:24px;
        left:0px;
      }
      span.it1{top:24px;}
      span.it2{top:50px;}
      span.it3{top:78px;}
    }

    .layer-bg{
      width:352px;height:132px;flex-wrap:wrap;margin-top: 20px;

      .yc-layer{
        display:block;width:198px;height:32px;text-align:center;color:#fff;font-size:20px;background:#4A41D0;border-radius:16px;
      }
      .yc-changci{
        height:32px;display:block;color:#B5B1FF;font-size:24px;text-align:center;margin:0 auto;margin-top:4px;
      }
      .yc-changci-val{
        display:inline-block;width:80px;height:32px;background:#4A41D0;color:#fff;font-size:20px;text-align:center;border-radius:16px;margin: 0 8px 0 12px;
      }
      .yc-why{
        width:124px;height:32px;display:block;color:#fff;font-size:20px;text-align:center;background:#4A41D0;border-radius:16px;margin:0 auto;margin-top:12px;
      }
    }

    .layer{

      .title{
        color:layerTextColor;font-size:24px;display:inline-flex;align-items:center;

        img {margin-right:10px;}
      }

      .subtitle{
        color:layerTextColor;font-size:24px;
      }
    }
  }


  //位置
  .xt.game-position{

    .layer{
      width:100%;
    }
  }

  //事件、动作
  .xt.game-action{

    .layer{
      width:100%;
    }
  }

  .xt{
    .group1{
      width:164px;

      .jf{
        width:100px;top:0;z-index:40;left:80px;height:40px;font-size:16px;color:#D88032;
      }
    }
    .group2{
      width:164px;

      .jf{
        width:100px;top:0;z-index:40;left:80px;height:40px;font-size:16px;color:#D88032;
      }
    }
    .data-des{
      width:348px;
      position:relative;

      .ruiwen{
        position:absolute;top:0;right:0;
      }
      .layer2{
        width:220px;
      }
      .defalut-des{

        .desc{
          width:200px;padding-left:12px;display:block;text-align:center;
        }
      }
    }
  }



  .atext{
    position:absolute;
    top:28px;
    left:160px;
    z-index:10;
    width:120px;
    padding-left:20px;
    color:itemColor;
    display:flex;
    flex-wrap:wrap;
  }
  .btext{
    position:absolute;
    top:24px;
    z-index:10;
    width:120px;
    color:itemColor;
    display:flex;
    flex-wrap:wrap;
    right:160px;
    padding-right:20px;
    justify-content: flex-end;
  }


  //选手
  .xs{
    padding:0 20px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    //红方
    .a{
      min-width:354px;
      width:50%;
      height:120px;
      box-shadow:itemShadowBg;
      border-radius:12px 0px 0px 12px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background:teamABg;
      /*background:url('../image/red_team_result_bg@2x.png') right no-repeat;*/

      .team-people-portrait{
        width:120px;height:120px;
      }
      .team-portrait{
        width:40px; height:40px; line-height:40px;
        border-radius:40px;
        text-align:center;
        border:1px solid #E3D6EA;
        background:#f8f7fa;
        position:absolute;
        top:40px;left:120px;z-index:10;
      }
      .a-bg{
        display:block;
        overflow: hidden;
        position:absolute;z-index:1;right:12px;top:24px;width:204px;height:64px;
        background:url(teamABgImg) right center no-repeat;background-size: cover;
      }
      .jf{
        left:auto;right:20px;
      }
    }
    .a:active,.a.active{
      color:#fff;
      background:#EF1B5A;
      background:teamAActiveBg;
      /*background:url('../image/red_team_result_bg@2x.png') right no-repeat;*/

      .a-bg{
        background:url(teamABgImgHover) right center no-repeat;background-size: cover;
      }
      .atext{
        color:#fff;
      }
    }

    //蓝方
    .b{
      min-width:354px;
      width:50%;
      height:120px;
      box-shadow:itemShadowBg;
      border-radius:0px 12px 12px 0px;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background:teamBBg;
      /*background:url('../image/blue_team_normal_bg@2x.png') left no-repeat;*/


      .team-people-portrait{
        width:120px;height:120px;position:absolute;top:0;right:0px;z-index:10;
      }
      .team-portrait{
        width:40px;height:40px;border-radius:40px;text-align:center;border:1px solid #E3D6EA;background:#f8f7fa;position:absolute;top:40px;right:120px;z-index:10;
      }
      .b-bg{
        display:block;
        overflow: hidden;
        position:absolute;z-index:1;left:16px;top:24px;width:270px;height:64px;
        background:url(teamBBgImg) right center no-repeat;background-size: cover;
      }
      .jf{
        left:60px;
      }
    }

    .b:active,.b.active{
      color:#fff;
      /*background:url('../image/blue_team_result_bg@2x.png') left no-repeat;*/
      background:teamBActiveBg;

      .b-bg{
        background:url(teamBBgImgHover) right center no-repeat;background-size: cover;
      }
      .btext{
        color:#fff;
      }
    }
  }


  //游戏位置
  .xs-2{
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .item{
      width:126px;
      height:110px;
      color: itemColor;
      font-size:24px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      background:itemBgColor;
      box-shadow:itemShadowBg;
      border-radius:12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .item.active{
      color: #fff;
      background: itemActiveBgBlue;
    }
    .item.active.red{
      color: #fff;
      background: itemActiveBgRed;
    }
  }


  //游戏技能
  .xs-3{
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .item{
      width:164px;
      height:110px;
      margin-bottom: 12px;
      color: itemColor;
      font-size:24px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      background:itemBgColor;
      box-shadow:itemShadowBg;
      border-radius:12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .item.active{
      color: #fff;
      background: itemActiveBgBlue;
    }
    .item.active.red{
      color: #fff;
      background: itemActiveBgRed;
    }
  }



  .ojf{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(178,176,210,1);
    line-height:22px;
    position: absolute;
    width: 100px;
    left: 50%;
    margin-left:-50px;
    top: 4px;
  }
  .jf{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 24px;
    font-size:16x;
    color: #D88032;
    background: url("../assets/image/bets_bg@2x.png") no-repeat;
    background-size: 100% auto;
    position: absolute;
    left: 50%;
    margin-left:-50px;
    bottom: 4px;
  }


  .layer2{
    width: 100%;
    font-weight: bold;
    padding:0 12px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    background: layerBg;
    background-size: 60px 60px;
  }

  .layer-light {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0px 2px;
    border-radius: 2px;
    background: linear-gradient(-45deg, rgb(234, 233, 246) 25%, rgb(238, 237, 247) 0px, rgb(238, 237, 247) 50%, rgb(234, 233, 246) 0px, rgb(234, 233, 246) 75%, rgb(238, 237, 247) 0px) 0% 0% / 30px 30px;
  }


  .layer-bg{
    width: auto;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    background: layerBg;
    background-size: 60px 60px;
  }
  .layer-bg-light{
    background: layerBgLight;
  }

  .player-list{
    width: 560px;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
    align-items: center;

    .name{
      font-size:18px;
      color:#B2B0D2;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius 50%;
    }
    .big{

      img {
        width: 72px;
        height: 72px;
      }
    }

  }


  footer{
    position: fixed;
    z-index 100;
    bottom: 0;
    width: 100%;
    height: 92px;
    min-width: 375px;
    max-width: 800px;
  }
  .footer-menu{
    height: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:footerMenuBg;
    background-size: 560px auto;


    .count-down{
      width:60px;
      padding-right:10px;
      height:60px;
      margin-left:20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-radius:60px;
      color:#5348FF;
      font-size:24px;
      background:#fff;
      position: relative;

      .second{
        width: 28px;
        //position: absolute;
        //left: 4px;
        text-align: center;
        //display: inline-block;
        height: 32px;
        line-height: 32px;
        //font-size:34px;
      }
    }
  }



  .scale-font-size{
    animation:scalesize 1s infinite;
    -webkit-animation:scalesize 1s infinite; /*Safari and Chrome*/
  }

  @keyframes scalesize
  {
    0% {
      color:red;
      font-size: 70px;
      //font-weight: bold;
      //left:0px;
      //top:-10px;
      opacity: 0.3;
    }
    //15% {opacity: 0.5;}
    //30% {opacity: 0.6;}
    //45% {opacity: 0.7;}
    //60% {opacity: 0.8;}
    //65% {opacity: 0.85;}
    //80% {opacity: 0.95;}
    100% {
      color:red;
      //width: 14px;
      height: auto;
      font-size:24px;
      //top:7px;
      opacity: 1;
    }
  }
  @-webkit-keyframes scalesize /*Safari and Chrome*/
  {
    0% {
      color:red;
      font-size: 70px;
      //font-weight: bold;
      //left:0px;
      //top:-10px;
      opacity: 0.3;
    }
    //15% {opacity: 0.5;}
    //30% {opacity: 0.6;}
    //45% {opacity: 0.7;}
    //60% {opacity: 0.8;}
    //65% {opacity: 0.85;}
    //80% {opacity: 0.95;}
    100% {
      color:red;
      //width: 14px;
      height: auto;
      font-size:24px;
      //top:7px;
      opacity: 1;
    }
  }


  .footer-menu .money-num{
    width: 480px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-menu .money-num .btn{
    width:142px;
    height:60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:rgba(255,255,255,1);
    box-shadow:0px 8px 8px -8px rgba(224,222,255,0.5);
    border-radius:12px;
    font-size:24px;
    color: #5B579A;
  }
  .footer-menu .money-num .btn.active,.footer-menu .money-num .btn:hover,.footer-menu .money-num .btn:focus{
    background:rgba(239,27,90,1);
    box-shadow:0px 8px 8px -8px rgba(239,27,90,1);
    color: #fff;
  }
  .footer-menu .money-num .btn img{
    margin-right:8px;
  }


  .footer-menu .cancel-btn{
    width:60px;
    height:60px;
    margin-right:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:60px;
    color:#FFFFFF;
    font-size:20px;
    background:#938efc;
  }

  /**开奖结果**/
  .prize-modal{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    position: fixed;
    bottom: -600px;
    z-index: 10000;
    width: 100%;
    height: 380px;
    padding:40px 0;
    background:rgba(83,72,255,0.95);
    color: #B5B1FF;

    .ruiwen{
      position: absolute;
      right: 20px;
      bottom: 0px;
    }

    .win{
      width:440px;
      font-size:40px;
      color: #B5B1FF;

      .item{
        min-width:160px;
        height:76px;
        margin: 0 20px;
        background:rgba(74,65,208,1);
        //background-image: url("http://pic.51yuansu.com/pic/cover/00/22/39/57d8fd0637e8e_610.jpg");
        //background-repeat: no-repeat;
        //background-size: cover auto;
        //background-position: 500px 0;
        border-radius:38px;
        display: inline-flex;
        font-size:48px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color: #989898;
        justify-content: center;
        align-items: center;
        margin-bottom:20px;
      }

    }
    .win-item{
      width: 360px;
      text-align: center;


      .s1{
        width:380px;
        color: #fff;
        position: relative;
        overflow: hidden;
      }

    }
    .win-item2{
      margin-left: 30px; display: flex; line-height: 75px;
      .s2{
        width:160px;
        position:relative;
        overflow:hidden;
        color: #fff;
      }
    }
    .win-item3{
      width:298px;
      height:76px;

      .s3{
        width:300px;
        margin-left:50px;
        position:relative;
        overflow:hidden;
        color:#fff;
      }
    }



    .win-text{
      position: absolute;left:1000px;
      z-index: 2;
      width: 100%;color:#fff;
      height:100%;
      //padding-top:5px;
      //background: linear-gradient(90deg, #ef1b5a 0%, #c514ef 50%, #ef1b5a 100%);
      background-image: url('../assets/image/incline_texture@2x.jpg');
      background-repeat: repeat-y;
      border-radius: 38px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }




  //数据分析弹层
  .data-analysis{
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 9999;
  }
  .analysis-content{
    position: absolute;
    z-index: 10000;
    //top: 80px;
    top:0;
    left: 0;
    width: 100%;
    min-height: 400px;
    background: #fff;

    .tab-list{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(178,176,210,1);
      line-height:34px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      .tab-title-item{
        flex-shrink:0;
        display:block;
        width: 140px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 24px;
        color: #B2B0D2;
        position: relative;
      }
      .tab-title-item.active{
        color: #5348FF;

        span.dot{
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background: #5348FF;
          position:absolute;
          top:60px;
          left:68px;
        }

      }

    }


    .tab-sub-title{
      padding: 0 20px;
      height: 60px;
      background: #F8F7FA;
      font-size:24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position:relative;
      color:#B2B0D2;

      img {
        width:22px;
      }

      span.left-item{
        color:#B2B0D2;
        font-size:20px;
        font-weight:500;
        display: inline-flex;
        align-items: center;
        //padding-left:10px;
      }
      span.right-item{
        padding-left:0;
        margin-right:12px;
        color:#5B579A;
        font-size:20px;
        font-weight:500;
        display: inline-flex;
        align-items: center;
        //padding-right:10px;
      }

    }


    //时间筛选器
    .time-filter{
      width: 360px;
      height: 200px;
      padding: 28px;
      background: #5348ff;
      border-radius: 12px;
      position: absolute;
      left: 20px;
      top: 60px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;


      .time-item{
        width:96px;
        height:40px;
        font-size:24px;
        background:#473EDF;
        border-radius:20px;
        color:#9B95FF;
        display:inline-flex;
        justify-content:center;
        align-items center;
      }
      .time-item.w74{
        width:148px;
      }
      .time-item.active{
        color:#fff;
      }
    }
  }






  .tab-data-table{
    max-height:800px;
    overflow-y:auto;

    table{
      width: 100%;
      text-align: center;
    }

    td{
      height: 60px;
      font-size:24px;
      vertical-align: middle;

      span:first-child{
        color:#5B579A;
      }
      span:last-child{
        color:#5348FF;
      }

    }
    td:nth-child(n+2){//从第n=0个开始，每隔2个
      border-left:1px solid #F8F7FA;
    }

    thead {
      td {
        height: 60px;
        color: #B2B0D2;
        font-size: 18px;
        border-left:1px solid #f4f5f6;
      }
    }


    tbody {
      tr:nth-child(odd){
        background: #fcfcfc;
      }
    }
    tr {
      td:nth-child(1){
        color: #5B579A;
        //font-size:20px
      }
      td:nth-child(9){
        color: #5B579A;
        font-size:20px;
        font-weight: bold;
      }

    }

    .dot{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: #5348FF;
    }
    .xs-item{
      width:33%;
      height:28px;
      padding:16px 0;
      text-align:center;
      border-right:1px solid #f8f7fa;
      font-size:2px;
      float:left;
    }
  }





  .data-help-des{
    width:94%;
    //height:160px;
    font-size:24px;
    color:#fff;
    background:rgba(83,72,255,1);
    border-radius:12px;
    position: absolute;
    top:100px;
    left:50%;
    margin-left:-47%;


    .des{
      position: relative;
      padding:20px;
    }
    .close{
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width:40px;
      height:40px;
      font-size:28px;
      position:absolute;
      top:4px;
      right:4px;
    }
  }



  .readme{
    width: auto;
    position: absolute;
    z-index: 10000;
    top:20px;
    left:20px;
    right:20px;
    bottom:20px;
    background: #fff;
    border-radius:12px;
    display: flex;
    flex-wrap: wrap;

    .head-title{
      width: 100%;
      height:80px;
      background: #5348FF;
      color:#fff;
      border-radius:12px  12px 0 0 ;
      font-size:28px;
      font-family:PingFangSC-Medium;
      display: flex;
      justify-content: center;
      align-items: center;
      position:relative;
      z-index: 10;

      span.close{
        position: absolute;
        top:24px;
        right:24px;
      }
    }
    .body{
      width: 100%;
      min-height: 300px;
      padding:20px;
      padding-top: 100px;
    }
    .body-title{
      padding:0 20px;
      height:60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F0F1F2;
      border-radius:30px;
      font-size:28px;
      font-weight bold;
      color:#5B579A;
    }
    .content{
      padding:15px 20px 20px 20px;
      color:#5B579A;
      font-size:24px;
    }
    .footer-text{
      border-top:1px solid #F0F1F2;
      margin-top:20px;
      height 80px;
      line-height @height;
      font-size:24px;
      color:#5B579A;
      font-weight bold;
      text-align center;
    }


  }


  .forecast{
    width: auto;
    position: absolute;
    z-index: 10000;
    top:20px;
    left:20px;
    right:20px;
    background: #fff;
    border-radius:12px;
    display: flex;
    flex-wrap: wrap;

    .show{
      top:20px;
    }

    .head-title{
      width: 100%;
      height:80px;
      background: #5348FF;
      color:#fff;
      border-radius:12px 12px 0 0 ;
      font-size:28px;
      font-family:PingFangSC-Medium;
      display: flex;
      justify-content: center;
      align-items: center;
      position:relative;

      .close{
        top: 20px;
        position: absolute;
        right: 24px;
      }
    }
    .body{
      width: 100%;
      min-height: 300px;
      padding:10px;

      .group-selected{
        width: 100%;
        margin-top:18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        position relative;
      }
      .group-selected.space-between{
        justify-content: space-between;
      }
      .change-omit-show{
        position:absolute;
        right:0px;top:0;
        color: #5451fb;
        padding:4px 8px;
        border:1px solid #5451fb;
        border-radius:6px;

        i{
          font-size: 27px;
          color: #5451fb;
          display: inline-block;
          transition: all 0.3s;
        }
        i.active{
          transform: rotate(180deg);
        }
      }



      .gs-list-item{
        min-width:90px;
        height:60px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-right:20px;
        margin-bottom:20px;

        .omit{
          display:block;
        }

        .num{
          width: 100%;
          font-size:20px;
          color:#5348FF;
          text-align: center;
        }
      }

      .item{
        width:100%;
        padding:6px 12px;
        height:48px;
        background:#fff;
        border:1px solid #B2B0D2;
        border-radius:12px;
        color:#B2B0D2;
        font-size:24px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      .item.active,.item:active{
        border:1px solid #5348FF;
        background:#5348FF;
        color:#fff;
      }
      .group-selected-tips{
        margin-top:12px;
        font-size:18px;
        color:#B2B0D2;
      }
      .group-a{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .body-title{
      width: 100%;
      display: flex;
      font-size:24px;
      font-weight: bold;
      justify-content: space-between;
      align-items: center;
      color:#5B579A;

      span.close{
        position: absolute;
        top:24px;
        right:24px;
      }
    }



  }

  .forecast .body .group-selected.gs3 .gs-list-item{
    width: 160px;
  }




  /*屏幕宽度400以内*/
  @media screen and (max-width: 400px) {
    .forecast .body .group-selected.gs3 .gs-list-item{
      width: 142px;
    }
  }

  /*iphone Plus*/
  /* 当浏览器的可视区域 > 667*/
  @media only screen and (min-device-width : 414px){
    .xs-2 .item {
      width: 126px;
      height: 108px;
      color: itemColor;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      background: itemBgColor;
      box-shadow: itemShadowBg;
      border-radius: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .xs-3 .item {
      width: 164px;
      height: 108px;
      margin-bottom:12px;
      color: itemColor;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      background: itemBgColor;
      box-shadow: itemShadowBg;
      border-radius: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }


  /*iphoneX*/
  @media only screen and (min-device-height : 812px) and (max-device-height : 1200px){
    .xt {
      margin-top: 20px;
    }
    .xs-2 .item {
      width: 130px;
      height: 110px;
      color: itemColor;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      background: itemBgColor;
      box-shadow: itemShadowBg;
      border-radius: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .xs-3 .item {
      width: 164px;
      height: 110px;
      margin-bottom: 12px;
      color: itemColor;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      background: itemBgColor;
      box-shadow: itemShadowBg;
      border-radius: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }


  .confirm-btn{
    width:630px;
    height:86px;
    font-size:24px;
    color: #fff;
    display: block;
    margin: 32px auto 36px auto;
    background:rgba(83,72,255,1);
    box-shadow:0px 16px 12px -12px rgba(83,72,255,0.5);
    border-radius:12px;
    border:0 solid transparent;
  }








</style>
