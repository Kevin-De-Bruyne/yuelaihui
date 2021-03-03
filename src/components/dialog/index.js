import dialog from  './_dialog'

console.log(dialog)
dialog.install=function(Vue){
    Vue.prototype.$mydialog=dialog
}

export default dialog
