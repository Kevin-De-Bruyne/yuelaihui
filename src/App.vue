<template>
  <div id="app">
    <div id="download" v-if="download">
		<van-circle
		v-model="currentRate"
		:rate="0"
    layer-color="#eeeeee"
  color="#ee0a24"
		:text="text"/>
    </div>
         <router-view v-if="!download" ref="router-view" class="router-view"/>

    <!-- <template v-else>
       <transition name="danru">
         </transition>
    </template> -->
     
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-left',
       download:false,
       currentRate:0
    }
  },
   computed: {
      text() {
	    return this.currentRate + '%';
	  }
  },
    watch: {
            $route(to, from) {
              let box=this.$refs['router-view']
              box.scrollTop=0
                //  document.documentElement.scrollTop = 0; 
                if (to.meta.index > from.meta.index) {  //外---》内
                    this.transitionName = 'slide-left'
                } else if (to.meta.index < from.meta.index) {   //内---》外

                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-content'   //同级 无过渡效果
                }
                console.log(this.transitionName)
            }
   },
  mounted() {

    console.log(this.$axios)
    return 
    document.addEventListener('plusready', ()=> { //等待puls准备好
      // 等puls准备好获取系统版本号
      plus.runtime.getProperty( plus.runtime.appid,  ( wgtinfo ) =>{ 
        var wgtStr = String(wgtinfo.version);
        //获取系统版本号
             this.ajax({
               url:'index/my/version',
               data:{
                 version:wgtStr
               }
             }).then(res=>{
               console.log(res.status)
                if(res.data.status==0){
                  this.download=true
                  this.downloadsr() 
                  // 如果当前系统版本号跟远程数据库上的版本号不一致，则下载更新包
                }
             }).catch(err=>{
               console.log(err,'请求版本号错误')
             })
          })
	},false); 
  },
  methods:{
     downloadsr(){
		var that = this;
	    	this.downwgt().then((res)=>{
          console.log(res)
	    		if(!res){
	    			downToak.addEventListener("statechanged",(task, status) =>{
                  let i = parseInt(Number(task.downloadedSize) / Number(task.totalSize) * 100);
                  console.log(i)
			            if(i>99){
			                this.download = false;
			            }else{
			                this.currentRate = i;
			            }
			        });
	    		}
	    	}) 
  },
   downwgt(){
     console.log('开始下载')
      return new Promise((ok,err)=>{
         downToak = plus.downloader.createDownload(this.baseURL+'wgt/wx.wgt' , {}, (d,status)=>{
             console.log('下载中')
                    if ( status == 200 ) { 
                        installWgt(d.filename);
                    } else {
                        alert("配置出错,请检查网络链接！");
                    }
                });
            ok(Boolean(downToak.start()));
      })
  },
     installWgt(path){
      console.log('安装')
 plus.nativeUI.showWaiting("Install...");
 plus.runtime.install(path,{},function(){
     plus.nativeUI.closeWaiting();
     plus.runtime.restart();
 },function(e){
     plus.nativeUI.closeWaiting();
     alert(e.message);
 })
}
  }
}
</script>

<style>
 
  @import url('./assets/css/default.css');
  @import url('./assets/css/medio.css');
   /*切换动画*/
    /* .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-content-leave-active,
    .slide-content-enter-active,
    .slide-left-leave-active{
        will-change: transform;
    } */
    
    html{
    height: 100%;
}

body{
    height: 100%;
    
}
::-webkit-scrollbar {
    display: none;
}
    #app{
      position: relative;
      height: 100%;
    }
    .slide-right-enter-active{
        /* transform: translate3d(-100%, 0, 0); */
        animation: right_in .3s;
    }
    .slide-right-leave-active{
        /* transform: translate3d(-100%, 0, 0); */
        animation: right_out .3s;
    }
    .slide-left-enter-active{
        /* transform: translate3d(-100%, 0, 0); */
        animation: left_in .3s;
    }
    .slide-left-leave-active{
        /* transform: translate3d(-100%, 0, 0); */
        animation: left_out .3s;
    }

    .router-view{
      position: absolute;
      width: 100vw;
      /* min-height: 100vh; */
      height: 100vh;
      overflow-y: scroll;
      box-sizing: border-box;
      top: 0;
      left: 0;
    }
    @keyframes right_in{
      from{
        transform: translate3d(-100%, 0, 0);
      }
      to{
        transform: translate3d(0, 0, 0);
      }
    }
     @keyframes right_out{
      from{
        transform: translate3d(0, 0, 0);
      }
      to{
        transform: translate3d(100%, 0, 0);
      }
    }
    @keyframes left_in{
      from{
        transform: translate3d(100%, 0, 0);
      }
      to{
        transform: translate3d(0, 0, 0);
      }
    }
     @keyframes left_out{
      from{
        transform: translate3d(0, 0, 0);
      }
      to{
        transform: translate3d(-100%, 0, 0);
      }
    }
    
  .bottom{
    position: static !important;
  }
  .getcode{
    font-size: 12px;
  }
  #download{
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000045;
    z-index: 9999;
}
</style>
