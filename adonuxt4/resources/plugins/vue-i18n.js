import Vue from 'vue';
import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';
// import Backend from 'i18next-node-fs-backend'

Vue.use(VueI18next);

var isClient = process.browser ? true : false
console.log('VUE I18next init, client :', isClient)

i18next
// .use(Backend)
.init({
  lng: 'en',
  fallbackLng: 'en',
  debug : true,
  resources : {
    en: {
      translation: {
        "key": "hello world "+isClient
      }
    },
    cn: {
      translation: {
        "key": "chinese "
      }
    }
  },
  backend : {
    // path where resources get loaded from
    loadPath: '/locales/{{lng}}/{{ns}}.json',

    // path to post missing resources
    addPath: '/locales/{{lng}}/{{ns}}.missing.json',

    // jsonIndent to use when storing json files
    jsonIndent: 2
  }
})

export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18next(i18next);
}
