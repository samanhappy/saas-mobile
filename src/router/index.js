import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserParty from '@/components/user/party'
import VueResource from 'vue-resource'
import {ToastPlugin} from 'vux'

Vue.use(ToastPlugin)
Vue.use(VueResource)
Vue.use(Router)

Vue.http.interceptors.push(function (request, next) {
  console.log(request)
  next(function (response) {
    if (response.status !== 200 || response.body.status !== 0) {
      this.$vux.toast.show({
        type: 'text',
        text: '请求错误'
      })
    }
    console.log(response)
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld1',
      component: HelloWorld
    },
    {
      path: '/user/party.html',
      name: 'UserParty',
      component: UserParty
    }
  ]
})
