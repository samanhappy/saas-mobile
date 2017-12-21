<template>
  <div>
    <group>
      <x-input title="姓名" v-model="name" readonly></x-input>
      <datetime title="入党日期" v-model="partyDate" placeholder="请选择" :min-year=1921></datetime>
      <x-button type="primary" @click.native="save">保存</x-button>
    </group>
    <tabbar>
      <tabbar-item>
        <span slot="label">主页</span>
      </tabbar-item>
    </tabbar>
    <toast v-model="showToast" type="text" is-show-mask>{{msg}}</toast>
  </div>
</template>

<script>
  import { Group, Cell, XButton, XInput, Datetime, Tabbar, TabbarItem, Toast, dateFormat } from 'vux'
  export default {
    components: {
      Group, Cell, XButton, XInput, Datetime, Tabbar, TabbarItem, Toast
    },
    data () {
      return {
        appId: this.$route.query.appId,
        token: this.$route.query.token,
        uid: null,
        msg: '',
        showToast: false,
        name: null,
        partyDate: null
      }
    },
    mounted: function () {
      console.log(this.token)
      this.$http.get('http://localhost:8080/saas-api/openapi/user', {
        params: {
          token: this.token,
          appId: this.appId
        }
      }).then((response) => {
        this.uid = response.body.data.uid
        this.name = response.body.data.name
        this.$http.get('http://localhost:8080/saas-api/cyuser/uid/' + this.uid).then((response) => {
          this.partyDate = dateFormat(new Date(response.body.data.partyDate), 'YYYY-MM-DD')
        }, (response) => {

        })
      }, (response) => {
      })
    },
    methods: {
      save: function () {
        console.log(this.partyDate)
        if (this.partyDate == null) {
          this.showToast = true
          this.msg = '请选择入党日期'
          return false
        }
        this.$http.patch('http://localhost:8080/saas-api/cyuser/uid/' + this.uid, {
          partyDate: this.partyDate
        }).then((response) => {
          this.showToast = true
          this.msg = '保存成功'
        }, (response) => {

        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
