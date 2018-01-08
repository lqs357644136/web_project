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
        tourEntity:'巡迴检测',
        checkList:'检查清单',
        batchEnter:'批次录入管理',
        batchEnterBlend:'调合批次录入',
        batchEnterRaw:'原料批次录入',
        xbar:'x-bar图',
        workonoff:'上岗纪录',
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
        tourEntity:'tourEntity',
        checkList:'checkList',
        batchEnter:'batchEnter',
        batchEnterBlend:'batchEnterBlend',
        batchEnterRaw:'batchEnterRaw',
        xbar:'x-bar',
        workonoff:'workonoff',
      }
    }
}

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages
})

export default i18n