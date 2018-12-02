import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en_US', // 通过修改此数据切换语言
  messages: {
    en_US: {
      message: {
        lang: 'english'
      }
    },
    zh_CN: {
      message: {
        lang: '中文'
      }
    }
  }
})
