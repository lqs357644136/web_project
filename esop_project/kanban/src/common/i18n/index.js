import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {menu_zh, menu_en} from './menu'//菜单国际化

Vue.use(VueI18n)

const messages = {
  zh: {
    message: {
      menu: menu_zh
    }
  },
  en: {
    message: {
      menu: menu_en
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages
})

export default i18n
