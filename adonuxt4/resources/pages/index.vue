<template>
  <section class="container">
    <img src="/img/logo.png" alt="Adonuxt logo"/>
    <h1>Universal Vue.js Applications Framework</h1><br>
    <span>With translation {{ $t('key') }}</span><br>
    <button @click="$i18n.i18next.changeLanguage('en')">Change to EN</button><br>
    <button @click="$i18n.i18next.changeLanguage('cn')">Change to CN</button><br>
    <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
  </section>
</template>

<script>
  export default {
    name: 'page-index'
  }
</script>

<style scoped>
  h1 {
    margin: 50px 0;
  }
</style>
