<template>
  <div class="content">
    <headers title="我的收货地址" />

    <div class="item-box">
      <div class="item" v-for="(item) in data" :key="item.address_id">
        <div class="top">
          <div class="left">
            <div class="text1">
              {{item.province_name+item.city_name+item.district_name}}
              <span class="m-l-5">{{item.address}}</span>
            </div>
            <div class="text2">
              <span class="m-r-15">{{item.consignee}}</span>
              <span class="m-r-15">{{item.mobile}}</span>
            </div>
          </div>
          <div class="right">
            <span class="iconfont icon-bianji" @click="gobj(item)"></span>
            <span class="iconfont m-l-10 icon-shanchu" @click="deletes(item)"></span>
          </div>
        </div>
        <div class="bottom">
          <span class="span2" v-if="item.is_default">默认地址</span>
          <!-- <span class="span1" v-else>设为默认地址</span> -->
        </div>
      </div>
    </div>

    <div class="butn" @click="$router.push('/addres_add')">新建地址</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    gobj(item) {
      this.$router.push("/addres_add?id="+item.address_id);
    },
    deletes(item) {
      this.$dialog.confirm({
        title: "提示",
        message: "是否删除"
      })
        .then(() => {
            console.log(123123)
          this.ajax({
            url: "index/My/del_address",
            data: {
              id: item.address_id
            }
          }).then(res => {
             this.getdata();
            this.showtitle("删除成功").then(res => {
             
            });
          });
        })
        .catch((e) => {
            console.log(e)
        });
    },
    getdata() {
      this.ajax({
        url: "index/My/address_list"
      }).then(res => {
        this.data = res.address;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content{
    box-sizing: border-box;
    padding: 50px 0 0 0;
}
.butn {
  background: rgb(234,61,47);
  color: white;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 60px;
  font-size: 18px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
}
.item-box {
  background: white;
  .bottom {
    margin: 10px 0 0 0;
    .span1 {
      display: inline-block;
      padding: 0 10px;
      line-height: 30px;
      color: white;
      font-size: 12px;
      border-radius: 6px;
      background: rgb(10, 82, 193);
    }
    .span2 {
      color:rgb(234,61,47);
    }
  }
  .item {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 15px;
    .top {
      font-size: 16px;
      display: flex;
      .left {
        flex: 1;
      }
      .text1 {
        margin: 0 0 15px 0;
        color: rgb(64, 65, 67);
      }
      .text2 {
        color: #999;
      }
      .right {
        display: flex;
        color: rgb(64, 65, 67);
        align-items: center;
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}
</style>