import Vue from 'vue'

import dialog_opt from './dialog.vue'

let create_dialog=Vue.extend(dialog_opt)

let shili=null

let shili_arr=[]

function createObj(data){
    console.log(data)
     shili=new create_dialog({
         data
     })

     shili.vm=shili.$mount()

     document.body.appendChild(shili.$el)

     shili.visible=true
     return new Promise((res,fills)=>{
        shili.ok=function(){
            res()
        }
        shili.qvxiao=function(){
            fills()
        }
     })
     
     
}

let mydialog={
    alert(option){
       createObj({
            ...option,
            type:'alert'
        })
    },
    confirm(option){
        return createObj({
            ...option,
            type:'confirm'
        })
    }
}

export default mydialog