import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
  menu_zh_cn,
  menu_zh_tw,
  menu_en
} from './menu' //菜单国际化

Vue.use(VueI18n)

const messages = {
  'zh-cn': {
    message: {
      menu: menu_zh_cn
    }
  },
  'zh-tw': {
    message: {
      menu: menu_zh_tw
    }
  },
  'en': {
    message: {
      menu: menu_en
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh-cn', // 语言标识
  //messages
})

export default i18n
