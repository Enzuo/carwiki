<template>
  <v-app>
    <app-menu/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout child-flex>
          <nuxt/>
        </v-layout>
      </v-container>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script>
  import MyFooter from '~/components/MyFooter'
  import AppMenu from '~/components/AppMenu'

  export default {
    name: 'layout-default',

    components: {
      MyFooter,
      AppMenu
    }
  }
</script>

<style>
  .container {
    margin: 0;
    width: 100%;
    padding: 100px 0;
    text-align: center;
  }

  .button, .button:visited {
    display: inline-block;
    color: #744d82;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #744d82;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
  }

  .button:hover, .button:focus {
    color: #fff;
    background-color: #744d82;
  }

  .title {
    color: #505153;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
  }
</style>
