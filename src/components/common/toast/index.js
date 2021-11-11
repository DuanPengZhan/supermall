// import { createApp } from 'vue'
// import Toast from "./Toast.vue";


// const obj = {};



// obj.install = function (Vue) {
//     // //1.创建组件构造器
//     // const toastConstructor = Vue.extends(Toast);

//     // //2.new的方式，根据组件构造器 创建一个组件对象实例
//     // const toast = new toastConstructor();

//     // //3.将组件对象手动挂载到元素上，并添加到DOM中
//     // toast.$mount(document.createElement("div"));

//     // // 4.toast.$el对应的就是div
//     // document.body.appendChild(toast.$el);

//     // //4.给Vue原型添加上挂载后的实例
//     // Vue.prototype.$toast = toast;

//     // const toast = Toast
//     // createApp(toast).mount('div')
//     // console.log(Vue);

//     // const toast = createApp(Toast);
//     // toast.mount(document.createElement("div"));
//     // document.body.appendChild(toast.$el);
//     // constructor.config.globalProperties.$toast = toast;


// };

// export default obj;

import {
    reactive,
    createApp,
    h
} from 'vue';

const state = reactive({
    show: false, // toast元素是否显示
    text: ''
});

const toastVM = createApp({
    setup() {
        return () =>
            h(
                'div', {
                    // 这里是根据配置显示一样不同的样式
                    id: [
                        'lx-toast',
                    ],
                    style: {
                        display: state.show ? 'block' : 'none',
                        background: "#000",
                        color: "#fff",
                        width: '100px',
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "8px 10px",
                    }
                },
                state.text
            );
    }
});

const toastWrapper = document.createElement('div');
toastWrapper.id = 'lx-toast';
document.body.appendChild(toastWrapper);
toastVM.mount('#lx-toast');

export function useToast() {
    return function Toast(msg) {
        console.log(msg)
        // 拿到传来的数据
        state.show = true
        state.text = msg
        setTimeout(() => {
            state.show = false
        }, 1000);
    }
}