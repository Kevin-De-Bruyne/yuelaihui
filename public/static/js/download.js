// import ajaxs from "axios"

// import {baseUrl} from '../../../src/main'

const baseUrl = 'http://mall.yuelaihuism.com/'

let downToak = null

function getVersion() {
    downwgt().then(res => {
        console.log(res)
        if (!res) {
            downToak.addEventListener("statechanged", (task, status) => { //下载监听
                console.log('下载中')
                let i = parseInt(Number(task.downloadedSize) / Number(task.totalSize) * 100);
                if (i >= 100) {
                    console.log('下载完成')
                }
            });
        }
    })
}
let s = '234dfafaf'
console.log(123123123)

function downwgt() {
    console.log('开始下载')
    return new Promise((ok, err) => {
        downToak = plus.downloader.createDownload(baseUrl + 'wgt/wx.wgt', {}, (d, status) => {
            console.log('下载中')
            if (status == 200) {
                installWgt(d.filename);
            } else {
                alert("配置出错,请检查网络链接！");
            }
        });
        ok(Boolean(downToak.start()));
    })
}

function installWgt(path) {
    console.log('开始下载')
    plus.nativeUI.showWaiting("Install...");
    plus.runtime.install(path, {}, function() {
        plus.nativeUI.closeWaiting();
        plus.runtime.restart();
    }, function(e) {
        plus.nativeUI.closeWaiting();
        alert(e.message);
    })
}