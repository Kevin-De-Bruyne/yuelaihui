import Vue from "vue";
import settings from "./toast.vue";

console.log(settings)
let ToastConstructor = Vue.extend(settings);
console.log(ToastConstructor)
let instance;//实例
let instanceArr = [];//实例列表
let defaultOptionsMap = {};//默认配置参数地图
const defaultOptions = {//默认配置参数
    msg:"",//提示文字
    type:"",//提示框类型
    visible:false,//是否显示
    duration: 2000, //显示时间(毫秒)
    timer: null,//计时器
    textTimer: null,//文本的计时器
    onClose: null,//关闭提示框回调
    closeOnClickOverlay: false,//是否可以点击遮罩来关闭提示框
    textAlignCenter: true,//文字是否居中
    bgColor: "#ffffff",//背景颜色
    coverColor: "rgba(0, 0, 0, 0.3)",//遮罩颜色
    customClass: "",//自定义类名
    msgColor:"#686f80",//提示文字颜色
};

let currentOptions = {
    //浅克隆一个默认配置
    ...defaultOptions
};

function _showToast() {
    //挂载组件
    instance.vm = instance.$mount();
    console.log(instance.vm)    
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
    });
}

function _getInstance(obj) {
    //获取组件实例
    
    let opt = {
        id: new Date().getTime(),//new Date().getTime()  避免重复出现弹出框
        ...currentOptions,//默认配置
        ...defaultOptionsMap[obj.type],//???
        ...obj,//传入的配置
    };
    console.log(opt['id'])
    //有相同id者共用一个实例，否则新增实例
    if (opt["id"] && instanceArr[opt["id"]]) {
        console.log('相同了')
        instance = instanceArr[opt["id"]];
        console.log(instance)
        instance.hide(true);
        instance = Object.assign(instance, opt);
      } else {
        instance = new ToastConstructor({
            data: Object.assign(opt, obj)
        });
        console.log(instance)
        opt["id"] && (instanceArr[opt["id"]] = instance);
        console.log(instanceArr)
    }
    console.log(instanceArr[opt['id']])
    _showToast();
    return instance;
}

function errorMsg(msg) {
    if (!msg) {
      console.warn(" msg不能为空");
      return;
    }
}

let Toast = {
    text(msg, obj = {}) {
        errorMsg(msg);
        return _getInstance({ ...obj, msg, type: "text" });
    },
    loading(msg, obj = {}){
        obj = { ...obj, id: obj.id || "loading", msg, type: "loading" };
        obj.duration = 0; //loading类型默认不自动关闭
        return _getInstance(obj);
    }
};

export default  Toast;