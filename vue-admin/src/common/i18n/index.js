import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    zh: {
      message: {
        homePage: '主页',
        table:'表格',
        tableBase:'表格基础',
        tableSort:'排序表格',
        firstEntity:'首检管理'
      }
    },
    en: {
      message: {
        homePage: 'homePage',
        table:'table',
        tableBase:'tableBase',
        tableSort:'tableSort',
        firstEntity:'firstEntity'
      }
    }
}

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages
})

export default i18n