const i18next = require('i18next')
const i18nextMiddleware = require('i18next-express-middleware')

console.log('SETUP i18n server middleware', process.server ? true : false)

i18next.use(i18nextMiddleware.LanguageDetector)

const fsBackend = require('i18next-node-fs-backend')
i18next.use(fsBackend)

i18next.init({
  fallbackLng: 'en',
  preload: ['en', 'fr', 'cn'],
  // keySeparator: false, // Allow usage of dots in keys
  debug : true,

  initImmediate: false,
  backend : {
    // path where resources get loaded from
    loadPath: 'resources/static/locales/{{lng}}/{{ns}}.json',
  },
  detection : {
    order: [/*'path', 'session',*/ 'querystring', 'cookie', 'header'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupSession: 'lng',
    lookupPath: 'lng',
    lookupFromPathIndex: 0,
  }
})

// exports = function (req, res, next) {
var middleware = i18nextMiddleware.handle(i18next, {
  ignoreRoutes: ["/vuetify.min.css.map"],
})
module.exports = function (req, res, next) {
  if(!req.paht){
    req.path = req.url
  }
  console.log(req.url)
  console.log('translation middleware')
  middleware(req, res, next)
}
