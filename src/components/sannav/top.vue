<template>
  <div class="containerbox">
    <div class="left_top"><p>采购管理后台系统</p></div>
    <div class="right_top">
      <img :src="userimg" alt="">
      <span class="topusername">{{username}}</span>
      <span class="loginout" @click="loginout">退出</span>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
  </div>
</template>

<script>
  import bus from '@/assets/evnetBus'
  import popup from '@/components/sanpopup/sanpopup'
    export default {
        components: {popup},
        data() {
            return {
              username:localStorage.getItem('FLoginName'),
              userimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576407694282&di=9feb45f935ec053c4a98ccb5fbb9fd08&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180806%2F9425645d47cd4f8e9c11fc6a9959340a.jpeg',
              rolebox:'',
              alertobj:{
                delalert:false,
                alertitle:'退出提示',
                content:'确定要退出登录吗？',
                btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
              },
            }
        },
        props: {},
        methods: {
          //退出登录
          loginout(){
            this.alertobj.delalert=true
          },
          alterdetai(obj){
            //点击弹框确定
            console.log(obj)
            this.alertobj.delalert=false
            let _this = this
            if(obj.type==0){
              this.$router.push({path:'/login'})
            }
          },

        },
      created() {
        if(!localStorage.getItem('token')){
          this.$router.push({path:'/login'})
          return false
        }
        },
    }
</script>

<style scoped lang="less">
.containerbox{
  /*display: flex;*/
  width: 100%;
  font-size: 14px;
  min-height: 70px;
  border-bottom: 1px solid #e4e4e4;
  background-color: white;
  .right_top{
    padding: 10px 0px 10px 0px;
    /*width: 20%;*/
    float: right;
    margin-right: 2%;
    img{
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    span{
     display: inline-block;
      position: relative;
      bottom: 15px;
      padding-left:3px;
      padding-right: 10px;
    }
  }
  .left_top{
    float: left;
    padding: 0px 18px;
    box-sizing: border-box;
    p{
      font-weight: 600;
      font-size: 18px;
    }
  }
}
.loginout{
  cursor: pointer;
  color: #999999;
}
  .topusername{
    color: #2e8ded;
  }
</style>
