<template>
<div class="birthday_con">
  <img :src="'../../assets/img/' + this.$route.query.bgPicUrl" width="100%" />
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
