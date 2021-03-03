import toast from './_toast.js'

toast.install=(Vue)=>{
    Vue.prototype.mytoast=toast
}

export default toast