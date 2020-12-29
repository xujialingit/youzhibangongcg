<template>
  <div class="container"   :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title" style="color: red">
            四川{{gongsiname}}公司
          </div>
          <div class="listbox_title">
            <span v-if="type==0">新增用户</span><span v-if="type==1">编辑用户</span><el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>用户账号:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FLoginName" placeholder="请输入用户账号"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>电话:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobile" placeholder="请输入用户电话"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>手机号:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobilePhone" placeholder="请输入用户手机号"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">姓名:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FUserName" placeholder="请输入姓名"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">性别:</div>
                <div class="itemval inputvalbox" style="position: relative;top: 15px">
                  <el-radio v-model="userobj.FSex" :label="false">男</el-radio>
                  <el-radio v-model="userobj.FSex" :label="true">女</el-radio>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">职务:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FOccupation" placeholder="请输入部门"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">邮箱:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FEmail" placeholder="请输入邮箱"></el-input>
                </div>
              </div>
              <div class="itembox" v-if="type==0">
                <div class="itemname iteminput">密码:</div>
                <div class="itemval inputvalbox">
                  <el-input type="password" v-model="userobj.FPassWord" placeholder="请输入密码"></el-input>
                </div>
              </div>
              <div class="itembox" v-if="type==0">
                <div class="itemname iteminput">确认密码</div>
                <div class="itemval inputvalbox">
                  <el-input type="password" v-model="surepwd" placeholder="请输入确认密码"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">是否禁用</div>
                <div class="itemval inputvalbox"  style="position: relative;top: 15px">
                  <el-radio v-model="userobj.FForbidStstus" :label="true">禁用</el-radio>
                  <el-radio v-model="userobj.FForbidStstus" :label="false">不禁用</el-radio>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <el-button type="primary" v-if="type==0" @click="addfn">新增</el-button>
              <el-button type="primary" v-if="type==1" @click="subfn">提交</el-button>
              <el-button>重置</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import md5 from 'js-md5'
  export default {
    components: {topnav,leftnav},
    data() {
      return {
        mincht:'',
        gongsiname:localStorage.getItem('FCompanyName'),
        name:'',
        sex:'1',
        type:0,
        userid:'',
        userobj:{
          FCustID:localStorage.getItem('FCustId'),
          FLoginName:'',
          FPassWord:'',
          FUserName:'',
          FMobile:'',
          FEmail:'',
          FOccupation:'',
          FMobilePhone:'',
          FRoleID:'3',
          FSex:false,
          FForbidStstus:false,
        },
        userpwd:'',
        surepwd:'',
        isbin:'1',
      }
    },
    props: {},
    methods: {
      addfn(){
        let _this = this
        var data = this.userobj
        data.FPassWord = md5(data.FPassWord)
        console.log(data,'data')
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/User/User/AddUser',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.$router.push({path:'/user_list'})
            },500)
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      subfn(){
        let _this = this
        var dataobj = {
          FUserName:this.userobj.FUserName,
          FID:this.userid,
          FMobile:this.userobj.FMobile,
          FEmail:this.userobj.FEmail,
          FSex:this.userobj.FSex,
          FOccupation:this.userobj.FOccupation,
          FMobilePhone:this.userobj.FMobilePhone,
          FForbidStstus:this.userobj.FForbidStstus,
        }
        var data = dataobj
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/User/User/ModifyUser',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.$router.push({path:'/user_list'})
            },500)
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      handleClick(tab, event) {
      },
      handleChange1(e){
        console.log(e)
      },
      returnback(){
        this.$router.go(-1)
      },
      setinfo(data){
        for(let i = 0;i<data.length;i++){
          if(this.userid==data[i].FID){
            this.userobj = data[i]
            this.userobj = {
              FCustID:localStorage.getItem('FCustId'),
              FLoginName:data[i].FLoginName,
              FPassWord:'',
              FUserName:data[i].FUserName,
              FMobile:data[i].FMobile,
              FEmail:data[i].FEmail,
              FOccupation:data[i].FDescription,
              FMobilePhone:data[i].FMobilePhone,
              FRoleID:data[i].FRoleId,
              FSex:data[i].FSex,
              FForbidStstus:data[i].FForbidStstus,
            }
          }
        }
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FCustID: localStorage.getItem('FCustId')
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/UserList',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setinfo(res.data.data)
          }
        }).catch((res)=>{})
      },
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      this.type = this.$route.query.type
      if(this.$route.query.id){
        this.userid = this.$route.query.id
        this.getdata()
        document.title = '编辑用户'
      }else {
        document.title = '新增用户'
      }
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      height: 100%;
      max-height: 100%;
      margin-left: 200px;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 400px;
          background-color: white;
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            .return_list{
              margin-left:85%;
              text-decoration:none;
              color: #666666;
              display: inline-block;
            }
          }
          .show_table{
            width: 100%;
            padding: 30px 25px;
            box-sizing: border-box;
            .detailcont{
              width: 100%;
              .itembox{
                width: 100%;
                display: flex;
                padding: 15px 0;
                box-sizing: border-box;
                .itemname{
                  width: 20%;
                  text-align: right;
                  margin-right: 30px;
                }
                .iteminput{
                  line-height: 40px;
                }
                .itemval{
                  display: flex;
                  .upimgbox{
                    width: 80px;
                    height: 80px;
                    position: relative;
                    margin-right: 25px;
                    .videobox{
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      opacity: 0;
                      z-index: 100;
                      #videobtn{
                        width: 80px;
                        height: 80px;
                      }
                    }
                    .upimage{
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      opacity: 0;
                      z-index: 100;
                    }
                    img{
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .tagitem{
                    width: 100%;
                    display: flex;
                    margin-right: 30px;
                    .tagname{
                      margin-right: 10px;
                    }
                    .tagval{
                      position: relative;
                      top: -1px;
                    }
                  }
                }
                .inputvalbox{
                  width: 400px;
                }
              }
            }
            .btnbox{
              width: 80%;
              margin-left: 20%;
              padding: 10px 30px;
              box-sizing: border-box;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .inputvalbox .el-select{
    width: 100%;
  }
</style>
