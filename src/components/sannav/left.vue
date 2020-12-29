<template>
  <div class="left">
    <div class="content-border">
      <div class="container1">
    <el-row class="tac">
      <div class="logobox">
        <img class="logoimg" src="/static/img/u84.png">
      </div>
      <el-col :span="24">
        <el-menu
          :default-active="this.$route.path"
          :unique-opened="true"
          :collapse-transition="false"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          color="#c0c4cc"
          background-color="#273043"
          text-color="#c0c4cc"
          active-text-color="#409EFF">
          <div class="left_logo">
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user_list">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shenpi_list">审批列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>预算管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/yusuan_list">预算列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/yusuan_table">预算报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>采购分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/order_list">订单列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/baobiao">分析图表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
    </div>
  </div>
</template>

<script>
  import bus from '@/assets/evnetBus'
    export default {
        components: {},
        data() {
            return {
              mincht:'',
              roledata:''//权限
            }
        },
        props: {},
      mounted(){
        this.mincht = (document.body.offsetHeight-90)  +'px'
      },
       methods: {
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
      },
        created() {
          if(!localStorage.getItem('token')){
            this.$router.push({path:'/login'})
            return false
          }
          let _this=this
        },
    }
</script>

<style scoped lang="less">
  .left{
    position: fixed;
    width:200px;
    top:0;bottom:0;
    height: 100%;
    overflow-x: hidden;
  }
  .el-menu-item-group__title{
    padding: 0px !important;
    display: none !important;
  }
  .content-border{
    overflow-x: hidden;
    width:220px;
    height: 100%
  }
  .container1{
    width: 200px;
    height: 100%;
  .tac{
    height: 100%;
    width: 200px;
    background-color:#273043;
    .logobox{
      width: 100%;
      text-align: center;
      margin-top: 20px;
      .logoimg{
        width: 100px;
      }
    }
  }
}
  .el-menu{
    border-right:none;
  }
.el-submenu .el-menu-item{
   min-width: auto;
}
  .left_logo{
    width: 70%;
    margin-left: 15%;
    text-align: center;
  }
  .el-menu-item-group>div{
    padding: 0px !important;
    display: none !important;
  }

</style>
