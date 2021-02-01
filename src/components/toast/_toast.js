import Vue from 'vue'

import toast_vue from './toast.vue'
const createToast=Vue.extend(toast_vue)

let shili=null

const shili_arr=[]


function errorDate(data,name) {

    if (data===undefined||data===null||data==='') {
       throw new Error(`${name}不能为空`)
    }
}


function createObj({data}){
    console.log(onclose)
    shili=new createToast({
        data
    })
    shili_arr.push(shili)
    shili.vm=shili.$mount()

    document.body.appendChild(shili.$el)
    Vue.nextTick(()=>{
        shili.visible=true
    })

    return shili.onclose
}

function clearObj(){
    shili_arr.forEach(item=>{
        item.clear()
    })
}

const Toast=function (data){
    if(typeof data=='object'){
        errorDate(data.msg,'msg')

        if(data.icon){
            createObj({
                data:{
                    type:'icon',
                    icon:data.icon,
                    msg:data.msg,
                    onclose:data.onclose
                }
            })
        }else{
            createObj({
                data:{
                    ...data
                }
            })
        }
    }else{
        errorDate(data,'msg')
       
        
        createObj({
            data:{
                msg:data
            }
        })
    }
}

Toast.loading=(opt)=>{
    createObj({
        data:{
            type:'loading',
            duration:0,
            ...opt
        }
    })
}

Toast.success=(opt)=>{
    createObj({
        data:{
            type:'success',
            ...opt
        }
    })
}

Toast.fail=(opt)=>{
    createObj({
        data:{
            type:'fail',
            ...opt
        }
    })
}

Toast.clear=(opt)=>{
   clearObj()
}

export default Toast




