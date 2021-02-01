<template>
  <div class="swiper-box" ref="swiper-box">
    
    
        <div class="swiper-container">
<!-- @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" -->
      <div class="swiper_over"
      :style="style"
      @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
        ref="swiper_over">
        <div class="swiper_maxbox" ref="swiper_maxbox" :style="{width:swiper_width+'px'}">
         
            <slot></slot>
           
        </div>
    </div>
    </div>

   
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
	export default {
		name: "Swiper",
    props: {
      autoplay:{
        type:Boolean,
        default:true
      },
      interval: {
        type: Number,
        default: 3000
      },
      loop:{
        type:Boolean,
        default:true
      }
    },
    data () {
      return {
        length:0,
        swiper_width:0,
        allWidth:0,
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currIndex: 0, // 当前的index
        scrolling: false, // 是否正在滚动
        swiper_arr:[],
        StartX:0,
        EndX:0,
        MoveX:0,
        moveBox:null,
        duration:'.5s',
        style:{
          transition:'',
          transform:''
        },
        timer:null,
        outtimer:null,
        scroll:null
      }
    },
    created() {
      
    },
    mounted() {
      // 1.操作DOM, 在前后添加Slide
      this.swiper_arr=this.$children
      this.length=this.swiper_arr.length
      this.init()
    },
    methods: {
      changetransform(value){
        // this.style.transition='none'
        this.style.transform=value
      },
      settransform(value){
        if(value==0){
          this.style.transition=`none`
          this.style.transform=`translate3d(0,0,0)`
          console.log('aaaaaa')
          return 
        }
        
        this.style.transform=`translate3d(-${this.currIndex*this.swiper_width}px,0,0)`
      },
      init(){
        let box=this.$refs['swiper-box']
      let width=box.offsetWidth
      this.swiper_width=width
      this.allWidth=this.swiper_width*this.length
      this.moveBox=this.$refs.swiper_over

      this.$set(this.style,'width',this.allWidth+'px')
     
        this.init_timeout()
      },
      init_timeout(){
        if(this.autoplay){
          this.timer=setInterval(() => {
            let z=this.currIndex
            z++
            this.changeindex(z)
            this.settransform()
        }, this.interval);
        }
      },
      changeindex(index){
        if(!index){
          this.settransform()
          return
        }
        if(index==this.length+1){
            this.loop_start2()
            return
        }
        if(index<0){
          if(this.loop){
            index=this.length-1
            index++
          }else{
            index=0
          }
        }
        if(index>this.length-1){
          if(this.loop){
            index++
          }else{
            index=this.length-1
          }
        }
        if(index=='loop_end'){ // 循环至结束
          
        }
        if(index==this.length-1&&this.loop){  //如果到最后一张而且是loop，克隆元素
              this.clone()
        }
 console.log(this.index)
        this.currIndex=index
       
        this.settransform()
      },
      clone(){
        console.log(this.swiper_arr[0].$el)
        let box=this.$refs.swiper_maxbox
        this.swiper_arr.forEach(item=>{
          
          box.appendChild(item.$el.cloneNode(true))
          console.log(box.children)
          // box.removeChild(box.children[0])
        })
        this.length=this.swiper_arr.length*2
      },
      loop_start(){
        console.log('jiajfiajifaji')
         
      },
      loop_start2(){
          this.currIndex=1
          this.settransform()
      },
      touchstart(e){
        this.style.transition='none' 
          this.StartX=e.touches[0].clientX
          clearInterval(this.timer)
          this.timer=null
          clearInterval(this.outtimer)
          this.outtimer=null
      },
      touchmove(e){
        let old=this.currIndex*this.swiper_width
        this.MoveX=this.StartX-e.changedTouches[0].clientX
        let value=-(this.MoveX+old)
        this.changetransform(`translate3d(${value}px,0,0)`)
        
        
      },
      touchend(e){
        this.style.transition=`transform ${this.duration} ease`
        this.EndX=e.changedTouches[0].clientX-this.StartX

        if(this.EndX<0){  // 负数代表往右滑动，跳下一张
            if(Math.abs(this.EndX)>=this.swiper_width/2){
              let z=this.currIndex
              this.changeindex(++z)
            }else{
              this.changeindex()
            }
        }else{
          if(this.EndX>=this.swiper_width/2){
            let z=this.currIndex
            this.changeindex(--z)
          }else{
            this.changeindex()
          }
        }
        this.outtimer=setTimeout(()=>{
          this.init_timeout()
        },1000)
        
      },
      touchcancel(e){
      },
      // 定时器操作
    }
	}
</script>

<style lang="scss" scoped>
.swiper-container{
  overflow: hidden;
  
}
  .swiper_over{
    display: flex;
  }
  .swiper_maxbox{
    display: flex;
  }
</style>