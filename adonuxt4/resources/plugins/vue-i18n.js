import Vue from 'vue';
import i18next from 'i18next';
import VueI18next from '@panter/vue-i18next';
// import FetchBackend from 'i18next-fetch-backend';
import XHRBackend from 'i18next-xhr-backend';


Vue.use(VueI18next);

var isClient = process.browser ? true : false
console.log('VUE I18next init, client :', isClient)

// if(isClient){
//   i18next
//   // .use(FetchBackend)
//   .use(XHRBackend)
// }

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
  // resources : {
  //   en: {
  //     translation: {
  //       "key": "hello world "+isClient
  //     }
  //   },
  //   cn: {
  //     translation: {
  //       "key": "chinese "
  //     }
  //   }
  // },
  backend : {
    // path where resources get loaded from
    loadPath: isClient ? '/locales/{{lng}}/{{ns}}.json' : 'resources/static/locales/{{lng}}/{{ns}}.json',

    // path to post missing resources
    // addPath: '/locales/{{lng}}/{{ns}}.missing.json',

    // jsonIndent to use when storing json files
    // jsonIndent: 2
  }
}


if (!i18next.isInitialized) {
  i18next.init(options)
}
// i18next.init({
//   lng: 'en',
//   fallbackLng: 'en',
//   // keySeparator: false, // Allow usage of dots in keys
//   debug : true,
//   // resources : {
//   //   en: {
//   //     translation: {
//   //       "key": "hello world "+isClient
//   //     }
//   //   },
//   //   cn: {
//   //     translation: {
//   //       "key": "chinese "
//   //     }
//   //   }
//   // },
//   backend : {
//     // path where resources get loaded from
//     loadPath: isClient ? '/locales/{{lng}}/{{ns}}.json' : 'resources/static/locales/{{lng}}/{{ns}}.json',

//     // path to post missing resources
//     // addPath: '/locales/{{lng}}/{{ns}}.missing.json',

//     // jsonIndent to use when storing json files
//     // jsonIndent: 2
//   }
// })


export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18next(i18next);
}
