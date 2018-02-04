<template>
  <v-app>
    <app-menu v-model="drawer"/>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn icon slot="activator">
          <v-badge left v-model="show">
            <span slot="badge">{{nbCarsInBasket}}</span>
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <car-basket :cars="carBasket"></car-basket>
      </v-menu>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script>
import MyFooter from '~/components/MyFooter'
import AppMenu from '~/components/AppMenu'
import CarBasket from '~/components/CarBasket'
import { mapGetters, mapState } from 'vuex'


export default {
  name: 'layout-default',
  components: {
    MyFooter,
    AppMenu,
    CarBasket,
  },
  data: () => ({
    drawer: null
  }),
  computed : {
    ...mapGetters([
      'nbCarsInBasket',
    ]),
    ...mapState([
      'carBasket',
    ]),
    show : function () {
      console.log('show', this.nbCarsInBasket )
      return this.nbCarsInBasket ? true : false
    }
  },
}
</script>

<style>
  .container {
    margin: 0;
    width: 100%;
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
