import Vue from 'vue';
import i18next from 'i18next';
// import VueParams from 'vue-params';
import VueI18next from '@panter/vue-i18next';
// import VueI18Next from 'vue-i18next2';

// Vue.use(VueParams);
Vue.use(VueI18next);

// Vue.params.i18nextLanguage = "en";
i18next.init({
// VueI18Next.i18n.init({
  lng: 'en',
  // lng: Vue.params.i18nextLanguage,
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

// const i18n = new VueI18next(i18next)

export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18next(i18next);
}
