import Vue from 'vue'
import i18next from 'i18next'
import VueI18next from '@panter/vue-i18next'
// import FetchBackend from 'i18next-fetch-backend';
import XHRBackend from 'i18next-xhr-backend'
import BrowserLngDetector from 'i18next-browser-languagedetector'

Vue.use(VueI18next);

var isClient = process.browser ? true : false

if(isClient){
  i18next
  .use(XHRBackend)
  .use(BrowserLngDetector)
}

const options = {
  fallbackLng: 'en',
  // keySeparator: false, // Allow usage of dots in keys
  debug : true,
  // initImmediate seems to be working (no more display of my keys when hydrating the client)
  // However it's supposed to work with sync backend only
  initImmediate: false,
  backend : {
    // path where resources get loaded from
    loadPath: isClient ? '/locales/{{lng}}/{{ns}}.json' : 'resources/static/locales/{{lng}}/{{ns}}.json',
  },
  detection : {
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
  },
}

if (!i18next.isInitialized) {
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
}
