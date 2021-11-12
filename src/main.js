import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from '@/components/common/toast'

import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
import lazyPlugin from 'vue3-lazy'

// 使用懒加载组件

createApp(App).use(store).use(router).use(toast).use(lazyPlugin, {
    loading: require('@/assets/img/common/placeholder.png'),
    error: require('@/assets/img/common/placeholder.png'),
}).mount('#app')

// 解决移动端300ms延迟
FastClick.attach(document.body)