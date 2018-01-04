<template>
<div class="birthday_con">
  <img v-if="this.$route.query.bgPicUrl === 'party1.png'" src="../../assets/img/party1.png" width="100%" />
  <img v-if="this.$route.query.bgPicUrl === 'party2.png'" src="../../assets/img/party2.png" width="100%" />
  <img v-if="this.$route.query.bgPicUrl === 'party3.png'" src="../../assets/img/party3.png" width="100%" />
  <div class="birthday_con_txt">
    <p>给：{{this.$route.query.userName}}</p>
    <p>{{this.$route.query.msgContent}}</p>
    <p>{{this.$route.query.fromUserName}}</p>
  </div>
</div>
</template>

<style scoped>
.birthday_con {
  position: relative;
}

.birthday_con_txt {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.birthday_con_txt p {
  width: 60%;
  color: #eb6100;
  margin: 0 auto;
  padding: 65% 0 0 5%;
  line-height: 25px;
}

.birthday_con_txt p:nth-child(2) {
  padding-top: 10px;
  width: 50%;
}

.birthday_con_txt p:nth-child(3) {
  padding-top: 10px;
  width: 50%;
  text-align: right;
}
</style>
