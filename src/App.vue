<template>
<div id="app">
  <router-view v-wechat-title="$route.meta.title" /> </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
a {
  text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
}
</style>
