import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    zh: {
      message: {
        table:'表格',
        tableBase:'表格基础',
        tableSort:'排序表格',
        homePage: '主页',
        firstEntity:'首检管理',
        product:'产品履历',
        productInfo:'产品履历查看',
        productEnter:'产品履历录入',
        attention:'注意事项',
        selfInspection:'自检管理',
        detection:'巡检管理'
      }
    },
    en: {
      message: {
        table:'table',
        tableBase:'tableBase',
        tableSort:'tableSort',
        homePage: 'homePage',
        firstEntity:'firstEntity',
        product:'productResume',
        productInfo:'productInfo',
        productEnter:'productEnter',
        attention:'attention',
        selfInspection:'selfInspection',
        detection:'detection'
      }
    }
}

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages
})

export default i18n