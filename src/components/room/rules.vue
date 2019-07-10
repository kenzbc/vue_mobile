<template>
<div class="rules_style">
    <h2 class="rules_title">选手选择：</h2>
    <p class="rules_p">(1) 同一支战队可选择选手数量不限；<br>(2) 所选选手身价总和不能超过工资帽；<br>注：系统根据每位现役选手在一段时间的表现计算身价，身价会根据选手在真实赛事中的表现上下浮动，房间创建之后，选手身价不会变动。<br></p>
    <h2 class="rules_title">评分规则：</h2>
    <table class="rules_table">
        <tr> <td>击杀</td> <td>2分</td></tr>
        <tr> <td>死亡</td> <td>-1分</td></tr>
        <tr> <td>助攻</td> <td>1分</td></tr>
        <tr> <td>分均输出</td> <td>0.02分</td></tr>
        <tr> <td>分均承伤</td> <td>0.02分</td></tr>
        <tr> <td>分均插/排眼</td> <td>10分</td></tr>
        <tr> <td>单场击杀或助攻超过10</td> <td>2分</td></tr>
    </table>
    <p class="rules_p">注：一位选手在房间内参加了多局比赛，表现分取多局比赛的平均分，普通房间未上场选手算10分，毒奶房未上场选手算50分</p>
    <h2 class="rules_title">不可抗力机制说明：</h2>
    <p class="rules_p">对于因不可抗力或本站不能控制的原因（如自然灾害、官方取消等）造成的比赛延期或取消，房间将关闭并退还所有门票。为您造成的不便深表歉意，伐木累将保留对此类特殊情况的最终解释权。</p>
    <h2 class="rules_title">赛事方赛后修改数据情况说明：</h2>
    <p class="rules_p">如遇到赛事方在比赛结束后修改数据情况，伐木累将锁定房间结算时的所有数据及排名，以房间结算当时数据为准，不会发生数据及排名变动。</p>
    <h2 class="rules_title">公平竞赛机制：</h2>
    <p class="rules_p">为保障用户间公平竞赛，一旦发现您存在利用我们的规则漏洞进行任何形式的作弊行为（包括但不限于通过我们的竞赛获得不正当的经济利益），我们有权取消与利弊行为相关账户的奖励、追回您作弊获得的不正当利益、关闭作弊账户或与您相关的所有账户，并保留取消您后续使用我们服务的权利，必要时会依据严重程度追究您的法律责任。</p>
    <p class="rules_p">说明：最终解释权归伐木累所有。</p>
</div>

</template>
<script>
export default {
  name: 'rules',
  data () {
    return {
    }
  },
  methods:{
  },
  components: {
  }
}
</script>
<style scoped>
.rules_style{ max-height: 999999px; padding: 0 30px; background: #fff;}
.rules_title{ line-height: 48px; font-size: 24px; color: #5348ff; padding: 10px 0 4px 0; }
.rules_p{ line-height: 32px; font-size: 18px; color: #444444; }
.rules_table{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
    margin-top: 5px;
}

.rules_table tr td {
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    text-align: center;
    color: #808080;
    border: 1px solid #e3e3e3;
}
.rules_table tr td:nth-child(1) {
    width: 60%;
}
</style>
