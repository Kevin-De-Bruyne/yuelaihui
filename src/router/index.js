import Vue from 'vue'
import Rotuer from 'vue-router'

Vue.use(Rotuer)

import home from '../pages/home'
import cate from '../pages/cate'
import user from '../pages/user'
import set from '../pages/set'
import shop_detail from '../pages/shop_detail'
import cart from '../pages/cart'
import qiandao from '../pages/qiandao'
import qianbao from '../pages/qianbao'
import shimin from '../pages/shimin'
import renwu from '../pages/renwu'
import fankui from '../pages/fankui'
import addres_list from '../pages/addres_list'
import addres_add from '../pages/addres_add'
import youhuijuan from '../pages/youhuijuan'
import order from '../pages/order'
import mingxi_cz from '../pages/mingxi_cz'
import shoucang from '../pages/shoucang'
import msg from '../pages/msg'
import tuiguang from '../pages/tuiguang'
import sreach from '../pages/sreach'
import cate_list from '../pages/cate_list'
import conorder from '../pages/conorder'
import conpay from '../pages/conpay'
import sreach_page from '../pages/sreach_page'
import order_detail from '../pages/order_detail'
import xiaodian from '../pages/xiaodian'
import reg from '../pages/reg'
import login from '../pages/login'
import pwd_login from '../pages/pwd_login'
import shenqing from '../pages/shenqing'
import xiaodian_mx from '../pages/xiaodian_mx'
import tx_mx from '../pages/tx_mx'
import tx from '../pages/tx'
import guanyu from '../pages/guanyu'
import xieyi from '../pages/xieyi'
import fuwu from '../pages/fuwu'
import card from '../pages/card'
import card_add from '../pages/card_add'
import zhuxiao from '../pages/zhuxiao'


export default new Rotuer({
    routes:[
        {
            path:'/',
            component:home
    },
    {
        path:'/reg',
        component:reg
},
{
    path:'/login',
    component:login
},
    {
        path:'/cate',
        component:cate
    },
    {
        path:'/user',
        component:user
    },
    {
        path:'/set',
        component:set
    },
    {
        path:'/shop_detail',
        component:shop_detail
    },
    {
        path:'/cart',
        component:cart
    },
    {
        path:'/qiandao',
        component:qiandao
    },
    {
        path:'/qianbao',
        component:qianbao
    },
    {
        path:'/shimin',
        component:shimin
    },
    {
        path:'/renwu',
        component:renwu
    },
    {
        path:'/fankui',
        component:fankui
    },
    {
        path:'/addres_list',
        component:addres_list
    },
    {
        path:'/addres_add',
        component:addres_add
    },
    {
        path:'/youhuijuan',
        component:youhuijuan
    },
    {
        path:'/order',
        component:order
    },
    {
        path:'/mingxi_cz',
        component:mingxi_cz
    },
    {
        path:'/shoucang',
        component:shoucang
    },
    {
        path:'/msg',
        component:msg
    },
    {
        path:'/tuiguang',
        component:tuiguang
    },
    {
        path:'/sreach',
        component:sreach
    },
    {
        path:'/cate_list',
        component:cate_list
    },
    {
        path:'/conorder',
        component:conorder
    },
    {
        path:'/conpay',
        component:conpay
    },
    {
        path:'/sreach_page',
        component:sreach_page
    },
    {
        path:'/order_detail',
        component:order_detail
    },
    {
        path:'/xiaodian',
        component:xiaodian
    },
    {
        path:'/pwd_login',
        component:pwd_login
    },
    {
        path:'/shenqing',
        component:shenqing
    },
    {
        path:'/xiaodian_mx',
        component:xiaodian_mx
    },
    {
        path:'/tx_mx',
        component:tx_mx
    },
    {
        path:'/tx',
        component:tx
    },
    {
        path:'/guanyu',
        component:guanyu
    },
    {
        path:'/xieyi',
        component:xieyi
    },
    {
        path:'/fuwu',
        component:fuwu
    },
    {
        path:'/card_add',
        component:card_add
    },
    {
        path:'/card',
        component:card
    },
    {
        path:'/zhuxiao',
        component:zhuxiao
    },
    
]
})