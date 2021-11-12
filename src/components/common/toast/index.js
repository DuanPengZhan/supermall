import { createApp } from 'vue'
import Toast from "./Toast.vue";


const obj = {};



obj.install = function (Vue) {
    console.log(Vue)
    // Vue2 写法
    // //1.创建组件构造器  
    // const toastConstructor = Vue.extends(Toast);

    // //2.new的方式，根据组件构造器 创建一个组件对象实例
    // const toast = new toastConstructor();

    // //3.将组件对象手动挂载到元素上，并添加到DOM中
    // toast.$mount(document.createElement("div"));

    // // 4.toast.$el对应的就是div
    // document.body.appendChild(toast.$el);

    // //4.给Vue原型添加上挂载后的实例
    // Vue.prototype.$toast = toast;

    // Vue3 写法
    // 1.实例化并绑定组件
    const toast = createApp(Toast).mount(document.createElement("div"));
    // 2.将挂载的Node添加到body中
    document.body.appendChild(toast.$el);
    // 3.定义全局
    Vue.config.globalProperties.$toast = toast;


};

export default obj;

