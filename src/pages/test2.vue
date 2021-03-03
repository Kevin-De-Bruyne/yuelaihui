<template>
  <main >
 
    <section>
      <h1>Scroll down!</h1>
    </section>
 
    <!-- This section will reveal itself each time it's scrolled into view -->
    <section >
      <h1>Tada!</h1>
    </section>
 
    <!-- Element-specific configuration options can be passed like this -->
    <section v-scroll="myscroll">
      <h1>Slightly late tada!</h1>
    </section>
    <button @click="play='false'">
      点击我
    </button>
      <van-swipe
              class="vant_swipe2 img_100"
              :autoplay="play"
              indicator-color="white"
              :touchable="true"
            >
              <van-swipe-item v-for="(item_child,i) in 4" :key="i">
                <img
                class="img_100j"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
                  alt=""
                />
              </van-swipe-item>
            </van-swipe>
  </main>
</template>

<script>
    export default{
        methods: {
            myscroll(e,el){
                console.log(document.documentElement.scrollTop,el.offsetTop,window.innerHeight)
                if(document.documentElement.scrollTop>=(el.offsetTop-window.innerHeight)){
                    console.log('超过了')
                }
            }
        },
        
        mounted() {
          setTimeout(()=>{
            this.play=false
          },2000)
        },
        data(){
          return{
            play:'false'
          }
        }
    }
</script>
 
<style>
  section {
    height: 100vh;
  }
  .img_100j{
    height: 400px;
    width: 100%;
  }
</style> 