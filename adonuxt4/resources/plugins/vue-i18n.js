import Vue from 'vue'
import i18next from 'i18next'
import VueI18next from '@panter/vue-i18next'
// import FetchBackend from 'i18next-fetch-backend';
import XHRBackend from 'i18next-xhr-backend'
import LngDetector from 'i18next-browser-languagedetector'

Vue.use(VueI18next);

var isClient = process.browser ? true : false
console.log('VUE I18next init, client :', isClient)

var detectorOpts = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  // cookieDomain: 'carwiki',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: isClient ? document.documentElement : false
}

if(isClient){
  i18next
  .use(XHRBackend)
  .use(LngDetector)
}


// with this condition it'll be ignored on nuxt module build
// https://github.com/nuxt/nuxt.js/issues/2458
// if (process.server) {
//   var servLngDetector = new LngDetector()

//   const fsBackend = require('i18next-node-fs-backend')
//   i18next.use(fsBackend).use(servLngDetector)

//   // Server side detection :
//   // https://github.com/i18next/react-i18next/issues/280

//   detectorOpts.order = ['servQueryString', 'servCookies']
// }

const options = {
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
  },
  detection : detectorOpts,
}

if (isClient && !i18next.isInitialized) {
  i18next.init(options)
}

export default ({ app, req}, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  if(!isClient && req && req.i18n){
    app.i18n = new VueI18next(req.i18n);
  }
  else {
    app.i18n = new VueI18next(i18next);
  }
  // console.log('plugin context', Object.keys(context))

  console.log('setup add i18n', app.i18n.t('key'), i18next.language)
}
