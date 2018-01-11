<template>
<div>
  <divider @click.native="showParam">今天是{{this.$route.query.name}}的入党纪念日，给TA发送一份祝福吧</divider>
  <divider>选择背景图片</divider>
  <checker v-model="bless.bgPicUrl" default-item-class="item" selected-item-class="item-selected">
    <checker-item value="party1.png"> <img src="../../assets/img/party1.png" width="100%"> </checker-item>
    <checker-item value="party2.png"> <img src="../../assets/img/party2.png" width="100%"> </checker-item>
    <checker-item value="party3.png"> <img src="../../assets/img/party3.png" width="100%"> </checker-item>
  </checker>
  <divider>祝福语</divider>
  <x-textarea v-model="bless.msgContent" :max="100"></x-textarea>
  <x-button type="primary" @click.native="sendBless">发送</x-button>
  <toast v-model="toast.show" type="text" is-show-mask>{{toast.msg}}</toast>
</div>
</template>

<script>
import {
  Group,
  Divider,
  Checker,
  CheckerItem,
  XTextarea,
  XButton,
  Toast
} from 'vux'
export default {
  components: {
    Group,
    Divider,
    Checker,
    CheckerItem,
    XTextarea,
    XButton,
    Toast
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ''
      },
      bless: {
        id: this.$route.query.id,
        bgPicUrl: '',
        msgContent: ''
      }
    }
  },
  methods: {
    showParam: function () {
      this.toast.msg = this.$route.query.token
      this.toast.show = true
    },
    sendBless: function () {
      if (!this.bless.id) {
        this.toast.msg = '用户信息不正确'
        this.toast.show = true
        return false
      }
      if (!this.bless.bgPicUrl) {
        this.toast.msg = '请选择背景图片'
        this.toast.show = true
        return false
      }
      if (!this.bless.msgContent) {
        this.toast.msg = '请填写祝福语'
        this.toast.show = true
        return false
      }
      this.$http.get(this.config.API_URL + '/app/userParty/sendBless', {
        params: this.bless
      }).then((response) => {
        if (response.status === 200 && response.body.status === 0) {
          this.toast.msg = '发送成功'
          this.toast.show = true
        }
      })
    }
  }
}
</script>

<style scoped>
.item {
  padding: 5px 5px;
  font-size: 0;
  width: 28%;
}

.item-selected {
  outline: 1px solid #8B8AEE;
}

.weui-cell:before {
  border-top: none;
}
</style>
