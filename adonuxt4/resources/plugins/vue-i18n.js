import Vue from 'vue';
import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';
// import FetchBackend from 'i18next-fetch-backend';
import XHRBackend from 'i18next-xhr-backend';


Vue.use(VueI18next);

var isClient = process.browser ? true : false
console.log('VUE I18next init, client :', isClient)

if(isClient){
  i18next
  .use(XHRBackend)
}

// with this condition it'll be ignored on nuxt module build
// https://github.com/nuxt/nuxt.js/issues/2458
if (process.server) {
  const fsBackend = require('i18next-node-fs-backend')
  i18next.use(fsBackend)
}

const options = {
  lng: 'en',
  fallbackLng: 'en',
  // keySeparator: false, // Allow usage of dots in keys
  debug : true,
  // preload : ['en'],
  // initImmediate seems to be working (no more display of my keys when hydrating the client)
  // However it's supposed to work with sync backend only
  initImmediate: false,
  backend : {
    // path where resources get loaded from
    loadPath: isClient ? '/locales/{{lng}}/{{ns}}.json' : 'resources/static/locales/{{lng}}/{{ns}}.json',
  }
}


if (!i18next.isInitialized) {
  i18next.init(options)
}


export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18next(i18next);
}
