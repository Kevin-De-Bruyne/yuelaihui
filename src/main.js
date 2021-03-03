import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'

import axios from 'axios'

Vue.prototype.axios = axios

import store from './store'


import animated from 'animate.css'

Vue.use(animated)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    loading: require('./assets/images/cart_nodata.png'), //加载中图片，一定要有，不然会一直重复加载占位图
    error: require('./assets/images/default_header.png'), //加载失败图片
    lazyComponent: true,
    attempt: 1
});


Vue.directive('scroll', {
    inserted: function(el, binding) {
        let f = function(evt) {
            let s = binding.value(evt, el)
            if (s) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})



router.beforeEach((to, from, next) => {

    console.log(router.history)
    document.documentElement.scrollTop = 0
    next()

})


let a = require('./test')


console.log(a = { c: 1 })





import tabbar from '@/components/tabbar'
import header from '@/components/header'
import nodata from '@/components/nodata'
import swiper from '@/components/swiper/swiper'
import SwiperItem from '@/components/swiper/swiper_item'
import scroll from '@/components/scroll'

Vue.component('tabbar', tabbar)
Vue.component('headers', header)
Vue.component('nodata', nodata)
Vue.component('swiper', swiper)
Vue.component('SwiperItem', SwiperItem)
Vue.component('scroll', scroll)

import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

import 'vant/lib/index.css';



import mytoast from '@/components/toast'

mytoast.install(Vue)

import mydialog from '@/components/dialog'

mydialog.install(Vue)

import custoast from '@/components/custoast'

console.log(custoast)

custoast.install(Vue)

NutUI.install(Vue);

import {
    Toast,
    Swipe,
    SwipeItem,
    Cell,
    CellGroup,
    Button,
    Switch,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Tabs,
    Tab,
    Stepper,
    NumberKeyboard,
    Popup,
    Dialog,
    SwipeCell,
    Uploader,
    Circle,
    ShareSheet,
    Rate,
    Icon,
    Progress
} from 'vant'

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Cell)
    .use(CellGroup)
    .use(Button)
    .use(Switch)
    .use(RadioGroup)
    .use(Radio)
    .use(CheckboxGroup)
    .use(Checkbox)
    .use(Tabs)
    .use(Toast)
    .use(Circle)
    .use(ShareSheet)
    .use(Tab)
    .use(Stepper)
    .use(NumberKeyboard)
    .use(Popup)
    .use(Dialog)
    .use(SwipeCell)
    .use(Uploader)
    .use(Rate)
    .use(Icon)
    .use(Progress)

Vue.prototype.$toast = Toast

Vue.prototype.$dialog = Dialog

let first = null;

function plusReady() {


    plus.navigator.setStatusBarBackground('#eb2c34');

    // 监听“返回”按钮事件
    plus.key.addEventListener("backbutton", function() {

        console.log(router.history.current.fullPath)
        if (
            router.history.current.fullPath == '/' || router.history.current.fullPath == '/cate' || router.history.current.fullPath == '/cart' ||
            router.history.current.fullPath == '/user' || router.history.current.fullPath == '/login'
        ) {
            if (!first || new Date().getTime() - first > 1000) {
                first = new Date().getTime();
                Toast('再按一次退出')
            } else if (new Date().getTime() - first < 1000) {
                plus.runtime.quit();
            }
        } else {
            router.go(-1)
        }
        return
    });
}

if (window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}
// let baseurl='http://newa.com/'
// let baseurl='http://ylh.test/'
// let baseurl = 'http://ylh.com/'
let baseurl = 'http://mall.yuelaihuism.com/'
    // let baseurl=''
Vue.prototype.baseURL = baseurl
    // let baseurl='http://47.96.8.140/'
axios.defaults.baseURL = baseurl

Vue.prototype.ajax = ({ url, data = {}, headers = {}, methods = 'post' }) => {
    data.token = localStorage.getItem('token')

    return new Promise((ok, err) => {
        // if(lurl){
        //   //避免重复请求
        //   err('请勿重新请求了')
        //   return
        // }
        // Toast.loading({
        //   duration:0,
        //   forbidClick:true
        // })
        axios[methods](url,
            methods == 'post' ? data : { params: data }, { headers }).then(res => {
            console.log(res)
            Toast.clear()
            if (res.data.status == 200 || res.data.code == 0) {
                ok(res.data)
            } else {
                console.log(res)


                if (res.data.msg == '用户不存在') {
                    Vue.prototype.showtitle('请重新登录')
                    err(res)
                    router.push('/login')
                    return
                }
                Toast.fail(res.message || res.msg || res.data.message || res.data.msg)
                err(res)
            }
        }).catch(fill => {
            console.log(fill)
            Toast.clear()
            Toast.fail('请求失败')
        })
    })

}
Vue.prototype.showtitle = (msg) => {
    return new Promise((ok, err) => {
        Toast({
            message: msg,
            duration: 1500
        })
        setTimeout(() => {
            ok()
        }, 1500);
    })
}

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')