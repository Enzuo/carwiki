'use strict'

const { resolve } = require('path')

module.exports = {

  modules : [
    '@nuxtjs/axios',
  ],

  build: {
    analyze: {
      analyzerMode: 'static',
      generateStatsFile: true,
      statsFilename: 'webpack-stats.json'
    },
    vendor: [
      'axios',
      '~/plugins/vue-charts',
      '~/plugins/vuetify',
      '~/plugins/vue-i18n.js',
      'i18next',
      'vue-i18next2'
    ]
  },

  plugins : [
    '~/plugins/vuetify',
    '~/plugins/vue-i18n',
    // { src: '~/plugins/vue-i18n.js', ssr: false }
  ],

  css: ['~assets/css/main.css','vuetify/dist/vuetify.min.css'],

  head: {
    title: 'Adonuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1'
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge,chrome=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Adonuxt project'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: 'favicon.png'
      },
      {
        href :'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        rel : 'stylesheet'
      }
    ],
    noscript: [{ innerHtml: `
      <h1>Javascript Disabled</h1>
      <p>It appears that you do not have Javascript enabled. This application relies on Javascript for most of our features.<p>
      <p>Please enable Javascript and <a href=".">reload</a> in order to use this site.</p>
    `}]
  },

  loading: {
    color: '#744d82'
  },

  router: {
    base: '/',
    scrollBehaviour: () => ({
      x: 0,
      y: 0
    })
  },

  srcDir: resolve(__dirname, '..', 'resources')

}
