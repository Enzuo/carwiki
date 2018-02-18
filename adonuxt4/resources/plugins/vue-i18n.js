import Vue from 'vue';
import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';

Vue.use(VueI18next);

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  debug : true,
  resources : {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
})

export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18next(i18next);
}
