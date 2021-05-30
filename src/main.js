import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载element组件库
import ElementUI from 'element-ui'

// 加载element组件库样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/index.less'

// 加载nprogress
import 'nprogress/nprogress.css'

// 加载富文本编辑器Element-tiptap
import { ElementTiptapPlugin } from 'element-tiptap'
import 'element-tiptap/lib/index.css'

// 全局注册element组件库
Vue.use(ElementUI)

// 安装element-tiptap插件
Vue.use(ElementTiptapPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
