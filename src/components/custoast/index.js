import cusToast from './_toast';

console.log(cusToast)
cusToast.install = function (Vue) {
    console.log('我实例化成功了')
    Vue.prototype['$cusToast'] = cusToast;
}

export default cusToast;