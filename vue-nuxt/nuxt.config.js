

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'vue-nuxt',
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width,user-scalable=no'
      },
      {
        hid: 'ESOP',
        name: 'ESOP',
        content: 'ESOP'
      },
      {
        name: 'renderer',
        content: 'webkit'
      }
    ],

    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  srcDir: 'src/',
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'element-ui',
      'axios',
     // 'external_library'
    ],
    babel: {
      plugins: [
        ['component', [{
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }]]
      ]
    },
    loaders: [
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 90000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  },
  css: [
    { src: 'normalize.css', ssr: true },
    { src: 'element-ui/lib/theme-chalk/index.css', ssr: true },
    { src: 'font-awesome/scss/font-awesome.scss', ssr: true },
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],
  plugins: [{
    src: '~plugins/element-ui',
    ssr: true,
  },
  {
    src: '~plugins/init',
  }
],
}
