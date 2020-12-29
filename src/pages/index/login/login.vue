<template>
  <div class="ccontainer" :style="'height:'+mincht">
    <div class="logincont">
      <div class="loginimg">
        <div class="logoimg">
          <img src="/static/img/u84.png">
        </div>
        <div class="cardimg">
          <img src="/static/img/u78.png">
        </div>
      </div>
      <div class="login_from" v-if="showforget==0">
        <div class="loginbox">
          <div class="login_user">
            <div class="loginiocn iconfont icon-zhanghaoguanli"></div>
            <input v-model="username"  type="text" placeholder="请输入用户名">
          </div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-mima"></div>
            <input v-model="userpwd" type="password" placeholder="请输入密码">
          </div>
          <div class="login_btn" @click="login">登录</div>
          <div class="forgetpwd" @click="forge">忘记密码?点这里找回</div>
        </div>
      </div>
      <div class="forgetbox" v-if="showforget==1">
        <div class="loginbox">
          <div style="color: rgb(150,150,150)">我们会向您的用户登录手机号发送验证码信息。</div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-zhanghaoguanli"></div>
            <input v-model="username"  type="text" placeholder="请输入用户名">
          </div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-ecurityCode"></div>
            <input v-model="code" type="text" placeholder="请输入验证码">
            <div class="codeimg" @click="checkcode">{{codenum}}</div>
          </div>
          <div class="login_btn" @click="send">发送</div>
          <div class="forgetpwd" @click="forge">已找回?立即登录</div>
        </div>
      </div>
      <div class="login_from" v-if="showforget==2">
        <div class="loginbox">
          <div style="color: red;text-align: center">{{codetishi}}</div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-mima"></div>
            <input v-model="newpwd"  type="password" placeholder="请输入密码">
          </div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-mima"></div>
            <input v-model="newpwd2" type="password" placeholder="请输入确认密码">
          </div>
          <div class="login_user">
            <div class="loginiocn iconfont icon-ecurityCode"></div>
            <input v-model="phonecode" type="text" placeholder="请输入短信验证码">
          </div>
          <div class="login_btn" @click="zhaohuifn">找回</div>
          <div class="forgetpwd" @click="forge">已找回?立即登录</div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import foot from '@/components/footnav/foot'
  export default {
    components: {foot},
    data() {
      return {
        //动态列表回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'提示',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        code:'',
        phonecode:'',
        username:'',
        userpwd:'',
        newpwd:'',
        newpwd2:'',
        mincht:'',
        codenum:'',
        showforget:0,
        codetishi:'已向您的手机号发送验证码，注意查收',
      }
    },
    props: {},
    methods: {
      checkcode(){
        this.codenum = Math.floor(Math.random()*(9999-1000))+1000;
      },
      zhaohuifn(){
        if(this.newpwd==''){
          this.$message('密码不能为空');
          return false
        }
        if(this.newpwd!=this.newpwd2){
          this.$message('两次密码不一致');
          return false
        }
        if(this.phonecode==''){
          this.$message('短信验证码不能为空');
          return false
        }
        let _this = this
        var data = {
          FLoginName:this.username,
          FPassWord:md5(this.newpwd),
          FVCode:this.phonecode,
        }
        this.axios.post(this.apis+'/api/User/RetrievePassword',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '修改密码成功',
              type: 'success'
            });
            _this.showforget = 2
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      forge(){
        if(this.showforget==0){
          this.showforget = 1
        }else {
          this.showforget = 0
        }
      },
      send(){
        if(this.code!=this.codenum){
          this.$message('图形验证码有误');
          return false
        }
        let _this = this
        var data = {
          FLoginName:this.username,
        }
        this.axios.post(this.apis+'/apix/user/user/SendVCode',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '发送成功',
              type: 'success'
            });
            _this.showforget = 2
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      login(){
        if(!this.username){
          this.$message('请输入用户名');
          return false
        }
        if(!this.userpwd){
          this.$message('请输入密码');
          return false
        }
        let _this = this
        var data = {
          username: this.username,
          password: md5(this.userpwd),
          // password: this.userpwd,
        }
        this.axios.post(this.apis+'/apix/User/User/Login',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem('token', res.data.data.Token);
            localStorage.setItem('FCompanyName', res.data.data.FCompanyName);
            localStorage.setItem('FId', res.data.data.FId);
            localStorage.setItem('FCustId', res.data.data.FCustId);
            localStorage.setItem('FBillTypeID', res.data.data.FBillTypeID);
            localStorage.setItem('FSaleOrgID', res.data.data.FSaleOrgID);
            localStorage.setItem('FSettleCurrID', res.data.data.FSettleCurrID);
            localStorage.setItem('FSeller', res.data.data.FSeller);
            setTimeout(()=>{
              _this.$router.push({path:'/user_list'})
            },500)
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
    },
    mounted(){
    },
    created() {
      localStorage.removeItem('token')
      localStorage.removeItem('FCompanyName')
      localStorage.removeItem('FId')
      localStorage.removeItem('FCustId')
      localStorage.removeItem('FBillTypeID')
      localStorage.removeItem('FSaleOrgID')
      localStorage.removeItem('FSettleCurrID')
      localStorage.removeItem('FSeller')
      this.checkcode()
      this.mincht = (this.docheight )+'px'
      document.title = '用户登录'
    },
  }
</script>

<style scoped lang="less">
  .ccontainer{
    width: 100%;
    overflow: hidden;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    .logincont{
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      justify-content: flex-start;
      .loginimg{
        width: 50%;
        padding: 60px 0 0;
        box-sizing: border-box;
        .logoimg{
          width: 100%;
          text-align: center;
          img{
            width: 200px;
          }
        }
        .cardimg{
          margin-top: 100px;
          width: 100%;
          img{
            float: right;
            margin-right:50px;
            width: 350px;
          }
        }
      }
      .login_from,.forgetbox{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .loginbox{
          margin-left: 100px;
          width: 480px;
          padding: 35px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 10px;
          .login_user{
            width: 100%;
            border-bottom: 1px solid #ccc;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding: 15px;
            box-sizing: border-box;
            margin-bottom:10px;
            .loginiocn{
              font-size: 25px;
              margin-right: 10px;
            }
            input{
              border: none;
              outline: none;
              background-color: #fff;
              flex: 1;
              height: 30px;
            }
            .codeimg{
              width: 125px;
              height: 37px;
              position: relative;
              top: -3px;
              margin-left: 10px;
              background-color: rgb(216,183,227);
              text-align: center;
              line-height: 37px;
              font-size: 16px;
              cursor: pointer;
              letter-spacing: 3px;
            }
          }
          .login_btn{
            background-color: rgb(196,0,0);
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: white;
            font-size: 17px;
            margin-top: 30px;
            border-radius: 5px;
            cursor: pointer;
          }
          .login_btn:hover{
            background-color: rgb(155,0,0);
          }
          .forgetpwd{
            width: 100%;
            text-align: right;
            margin-top: 30px;
          }
          .forgetpwd:hover{
            text-decoration: underline;
            cursor: pointer;
            color: rgb(196,0,0);
          }
        }
      }
    }
    .footbox{
      width: 100%;
      background-color: rgb(50,56,61);
      color: white;
      .foottop{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .ft_left{
          width: 50%;
          padding-left: 30%;
          box-sizing: border-box;
          .aboutus{
            font-size: 20px;
            font-weight: bold;
          }
          .aboutustext{
            margin-top: 20px;
            line-height: 20px;
          }
        }
        .ft_right{
          width: 50%;
          padding-left: 50px;
          box-sizing: border-box;
          .talkus{
            font-size: 20px;
            font-weight: bold;
          }
          .talkustext{
            margin-top: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          }
        }
      }
      .footunder{
        width: 100%;
        text-align: center;
        padding: 20px 0;
        .yzbgurl{
          margin-left: 50px;
          cursor: pointer;
        }
        .yzbgurl:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
