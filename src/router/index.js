import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserParty from '@/components/user/party'
import VueResource from 'vue-resource'
import {ToastPlugin, LoadingPlugin, base64} from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueResource)
Vue.use(Router)

Vue.http.interceptors.push(function (request, next) {
  console.log(this.$vux)
  if (this.config.user.token) {
    request.headers.set('userToken', this.config.user.token)
    request.headers.set('appId', this.config.appId)
    request.headers.set('type', this.config.type)
  } else if (this.$route.query.token && this.$route.query.appId && this.$route.query.type) {
    this.config.token = this.$route.query.token
    this.config.appId = this.$route.query.appId
    this.config.type = this.$route.query.type
    request.headers.set('token', this.config.token)
    request.headers.set('appId', this.config.appId)
    request.headers.set('type', this.config.type)
  } else {
    this.$vux.toast.show({
      type: 'warn',
      text: '用户信息不正确'
    })
    next(request.respondWith('', {
      status: 403,
      statusText: 'Forbidden'
    }))
    return false
  }
  console.log(request)
  this.$vux.loading.show()
  next(function (response) {
    this.$vux.loading.hide()
    if (response.headers.get('user')) {
      this.config.user = JSON.parse(base64.decode(response.headers.get('user')))
    }
    if (response.status !== 200) {
      this.$vux.toast.show({
        type: 'warn',
        text: '请求出错'
      })
    } else if (response.body.status !== 0) {
      if (response.body.message !== '') {
        this.$vux.toast.show({
          type: 'warn',
          text: response.body.message
        })
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '处理出错'
        })
      }
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
