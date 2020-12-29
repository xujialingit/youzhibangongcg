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
            <span v-if="type==1">审批设置</span><span v-if="type==0">新增审批</span><el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
            <div style="font-size: 12px;color: rgb(150,150,150)">注:每个采购员只能设置一个审批流程。</div>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>采购员:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="shenpiobj.FFlow1ID" placeholder="请选择">
                    <el-option
                      v-for="item in cgyarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>一级审批:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="shenpiobj.FFlow2ID" :clearable="setclear(2)" placeholder="请选择">
                    <el-option
                      v-for="item in cgyarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">二级审批:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="shenpiobj.FFlow3ID" :clearable="setclear(3)" placeholder="请选择">
                    <el-option
                      v-for="item in cgyarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">三级审批:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="shenpiobj.FFlow4ID" :clearable="setclear(4)" placeholder="请选择">
                    <el-option
                      v-for="item in cgyarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">四级审批:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="shenpiobj.FFlow5ID" :clearable="setclear(5)" placeholder="请选择">
                    <el-option
                      v-for="item in cgyarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">是否禁用</div>
                <div class="itemval inputvalbox"  style="position: relative;top: 15px">
                  <el-radio v-model="shenpiobj.FIsEnable" :label="true">禁用</el-radio>
                  <el-radio v-model="shenpiobj.FIsEnable" :label="false">不禁用</el-radio>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <el-button type="primary" v-if="type==0" @click="subfn(0)">新增</el-button>
              <el-button type="primary" v-if="type==1" @click="subfn(1)">提交</el-button>
              <!--<el-button @click="chongzhi">重置</el-button>-->
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
  export default {
    components: {topnav,leftnav},
    data() {
      return {
        mincht:'',
        gongsiname:localStorage.getItem('FCompanyName'),
        name:'',
        sex:'1',
        jinyong:'1',
        cgyarr:'',
        shenpiobj:{
          FID:'',
          FCustID: localStorage.getItem('FCustId'),
          FFlow1ID: '',
          FFlow2ID: '',
          FFlow3ID:'',
          FFlow4ID: '',
          FFlow5ID: '',
          FFlow1Name: '',
          FFlow2Name: '',
          FFlow3Name: '',
          FFlow4Name: '',
          FFlow5Name: '',
          FIsEnable: true,
        },
        type:0,
        shenpiid:'',
        FFlow1ID:'',
      }
    },
    props: {},
    methods: {
      setclear(id){
        if(id==5){
          return true
        }else if(id==4){
          if(this.shenpiobj.FFlow5ID==''){
            return true
          }
        }else if(id==3){
          if(this.shenpiobj.FFlow5ID==''&&this.shenpiobj.FFlow4ID==''){
            return true
          }
        }else if(id==2){
          if(this.shenpiobj.FFlow5ID==''&&this.shenpiobj.FFlow4ID==''&&this.shenpiobj.FFlow3ID==''){
            return true
          }
        }
      },
      chongzhi(){
        this.shenpiobj.FFlow2ID = ''
        this.shenpiobj.FFlow3ID = ''
        this.shenpiobj.FFlow4ID = ''
        this.shenpiobj.FFlow5ID = ''
      },
      subfn(id){
        let _this = this
        if(this.shenpiobj.FFlow1ID==''){
          return false
        }else if(this.shenpiobj.FFlow2ID==''){
          return false
        }
        var data = {
          FFlow1ID: this.shenpiobj.FFlow1ID,
          FID:this.shenpiid,
          FFlow2ID:this.shenpiobj.FFlow2ID,
          FFlow3ID: this.shenpiobj.FFlow3ID,
          FFlow4ID: this.shenpiobj.FFlow4ID,
          FFlow5ID: this.shenpiobj.FFlow5ID,
          FIsEnable:!this.shenpiobj.FIsEnable,
          FCustID:localStorage.getItem('FCustId'),
        }
        var url = this.apis+'/apix/Flow/Flow/AddFlow'
        if(id==1){
          url = this.apis+'/apix/Flow/Flow/MondifyFlow'
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.$router.push({path:'/shenpi_list'})
            },500)
          }else {
            _this.$message(res.data.message);
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
      setcgy(data){
        for(let i= 0;i<data.length;i++){
          data[i].label = data[i].FUserName
          data[i].value = data[i].FUserID
        }
        this.cgyarr = data
      },
      getcgy(){
        let _this = this
        var data = {
          FCustID: localStorage.getItem('FCustId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/BudgetPurUserList',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setcgy(res.data.data)
          }
        }).catch((res)=>{})
      },
      getdata(){
        let _this = this
        var data = {
          FCustID: localStorage.getItem('FCustId'),
          FUserID: this.FFlow1ID,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Flow/Flow/FlowList',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.shenpiobj = res.data.data[0]
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
      if(this.$route.query.type==1){
        this.shenpiid = this.$route.query.id
        this.FFlow1ID = this.$route.query.FFlow1ID
        this.getdata()
        document.title = '编辑审批'
      }else {
        document.title = '新增审批'
      }
      this.getcgy()
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
