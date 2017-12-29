<template>
  <div>
    <group>
      <x-input title="姓名" v-model="partyDate.name" readonly></x-input>
      <datetime title="入党日期" v-model="partyDate.partyDate" placeholder="请选择" :min-year=1921></datetime>
      <x-button type="primary" @click.native="save">保存</x-button>
    </group>
    <tabbar style="position:fixed">
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
        msg: '',
        showToast: false,
        partyDate: {}
      }
    },
    mounted: function () {
      this.$http.get(this.config.API_URL + '/app/userParty/userId')
      .then((response) => {
        if (response.body.data) {
          this.partyDate = response.body.data
          this.partyDate.partyDate = dateFormat(new Date(response.body.data.partyDate), 'YYYY-MM-DD')
        } else {
          this.partyDate.name = this.config.user.name
        }
      }, (response) => {
      })
    },
    methods: {
      save: function () {
        if (this.partyDate.partyDate == null) {
          this.showToast = true
          this.msg = '请选择入党日期'
          return false
        }
        if (this.partyDate.id) {
          this.$http.patch(this.config.API_URL + '/app/userParty/' + this.partyDate.id, {
            partyDate: this.partyDate.partyDate
          }).then((response) => {
            this.showToast = true
            this.msg = '保存成功'
          })
        } else {
          this.partyDate.id = this.config.user.id
          this.$http.put(this.config.API_URL + '/app/userParty/', partyDate).then((response) => {
            this.showToast = true
            this.msg = '保存成功'
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
</style>
