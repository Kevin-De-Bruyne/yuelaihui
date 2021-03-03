import Vue from 'vue'
import Rotuer from 'vue-router'

Vue.use(Rotuer)

import home from '../pages/home'
import cate from '../pages/cate'
let user=()=>import ('../pages/user')
// import user from '../pages/user'
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
let xiaodian=()=>import ('../pages/xiaodian')
// import xiaodian from '../pages/xiaodian'
import reg from '../pages/reg'
import login from '../pages/login'
import pwd_login from '../pages/pwd_login'
import shenqing from '../pages/shenqing'
import xiaodian_mx from '../pages/xiaodian_mx'
import xiaodian_shouyi from '../pages/xiaodian_shouyi'
import xiaodian_xiaoshou from '../pages/xiaodian_xiaoshou'
import tx_mx from '../pages/tx_mx'
import tx from '../pages/tx'
import guanyu from '../pages/guanyu'
import xieyi from '../pages/xieyi'
import fuwu from '../pages/fuwu'
import card from '../pages/card'
import card_add from '../pages/card_add'
import zhuxiao from '../pages/zhuxiao'
import toast from '../pages/toast'
import team_mx from '../pages/team_mx'
import xiazai from '../pages/xiazai'
import test from '../pages/test'
import test2 from '../pages/test2'
import pinglun_submit from '../pages/pinglun_submit'
import pinglun_my from '../pages/pinglun_my'
import dianpu from '../pages/dianpu'
import butie from '../pages/butie'
import gonggao from '../pages/gonggao'
import gonggao_detail from '../pages/gonggao_detail'
import dengji_detail from '../pages/dengji_detail'


export default new Rotuer({
    routes:[
        {
            name:'home',
            path:'/',
            component:home,
            meta:{
                index:0
            }
    },
{
    path:'/dianpu',
    component:dianpu,
    meta:{
        index:2
    }
},
{
    path:'/dengji_detail',
    component:dengji_detail,
    meta:{
        index:2
    }
},

{
    path:'/gonggao_detail',
    component:gonggao_detail,
    meta:{
        index:2
    }
},
{
    path:'/gonggao',
    component:gonggao,
    meta:{
        index:1
    }
},

{
    path:'/butie',
    component:butie,
    meta:{
        index:2
    }
},

{
    path:'/pinglun_my',
    component:pinglun_my,
    meta:{
        index:1
    }
},

{
    path:'/xiazai',
    component:xiazai,
    meta:{
        index:0
    }
},
    {
        path:'/reg',
        component:reg,
        meta:{
            index:1
        }
},
{
    path:'/login',
    component:login,
    meta:{
        index:0
    }
},
{
    path:'/pinglun_submit',
    component:pinglun_submit,
    meta:{
        index:1
    }
},
    {
        path:'/cate',
        component:cate,
        name:'cate',
        meta:{
            index:0
        }
    },
    {
        path:'/user',
        component:user,
        name:'user',
        meta:{
            index:0
        }
    },
    {
        path:'/set',
        component:set,
        meta:{
            index:1
        }
    },
    {
        path:'/shop_detail',
        component:shop_detail,
        meta:{
            index:2
        }
    },
    {
        path:'/cart',
        component:cart,
        name:'cart',
        meta:{
            index:0
        }
    },
    {
        path:'/qiandao',
        component:qiandao,
        meta:{
            index:1
        }
    },
    {
        path:'/qianbao',
        component:qianbao,
        meta:{
            index:1
        }
    },
    {
        path:'/shimin',
        component:shimin,
        meta:{
            index:1
        }
    },
    {
        path:'/renwu',
        component:renwu,
        meta:{
            index:1
        }
    },
    {
        path:'/fankui',
        component:fankui,
        meta:{
            index:1
        }
    },
    {
        path:'/addres_list',
        component:addres_list,
        meta:{
            index:1
        }
    },
    {
        path:'/addres_add',
        component:addres_add,
        meta:{
            index:2
        }
    },
    {
        path:'/youhuijuan',
        component:youhuijuan,
        meta:{
            index:1
        }
    },
    {
        path:'/order',
        component:order,
        meta:{
            index:1
        }
    },
    {
        path:'/mingxi_cz',
        component:mingxi_cz,
        meta:{
            index:1
        }
    },
    {
        path:'/shoucang',
        component:shoucang,
        meta:{
            index:1
        }
    },
    {
        path:'/msg',
        component:msg,
        meta:{
            index:1
        }
    },
    {
        path:'/tuiguang',
        component:tuiguang,
        meta:{
            index:1
        }
    },
    {
        path:'/sreach',
        component:sreach,
        meta:{
            index:2
        }
    },
    {
        path:'/cate_list',
        component:cate_list,
        meta:{
            index:1
        }
    },
    {
        path:'/conorder',
        component:conorder,
        meta:{
            index:3
        }
    },
    {
        path:'/conpay',
        component:conpay,
        meta:{
            index:4
        }
    },
    {
        path:'/sreach_page',
        component:sreach_page,
        meta:{
            index:1
        }
    },
    {
        path:'/order_detail',
        component:order_detail,
        meta:{
            index:2
        }
    },
    {
        path:'/xiaodian',
        component:xiaodian,
        meta:{
            index:1
        }
    },
    {
        path:'/pwd_login',
        component:pwd_login,
        meta:{
            index:2
        }
    },
    {
        path:'/shenqing',
        component:shenqing,
        meta:{
            index:1
        }
    },
    {
        path:'/xiaodian_mx',
        component:xiaodian_mx,
        meta:{
            index:2
        }
    },
    {
        path:'/xiaodian_shouyi',
        component:xiaodian_shouyi,
        meta:{
            index:2
        }
    },
    {
        path:'/xiaodian_xiaoshou',
        component:xiaodian_xiaoshou,
        meta:{
            index:2
        }
    },
    {
        path:'/tx_mx',
        component:tx_mx,
        meta:{
            index:2
        }
    },
    {
        path:'/tx',
        component:tx,
        meta:{
            index:2
        }
    },
    {
        path:'/guanyu',
        component:guanyu,
        meta:{
            index:2
        }
    },
    {
        path:'/xieyi',
        component:xieyi,
        meta:{
            index:2
        }
    },
    {
        path:'/fuwu',
        component:fuwu,
        meta:{
            index:2
        }
    },
    {
        path:'/card_add',
        component:card_add,
        meta:{
            index:3
        }
    },
    {
        path:'/card',
        component:card,
        meta:{
            index:2
        }
    },
    {
        path:'/zhuxiao',
        component:zhuxiao,
        meta:{
            index:2
        }
    },
    {
        path:'/team_mx',
        component:team_mx,
        meta:{
            index:1
        }
    },
    
]
})