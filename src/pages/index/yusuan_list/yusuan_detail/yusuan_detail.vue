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
            四川{{gongsiname}}有限公司
          </div>
          <div class="listbox_title" style="display: flex;justify-content: space-between">
            <div>
              <div>预算设置</div>
              <div style="font-size: 12px;color: rgb(150,150,150)">注:每个采购员每个年度只能设置一个预算金额。</div>
            </div>
            <el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
            <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput"><span class="musticon" style="color: red">*</span>采购员:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="cgyval" :disabled="detailtype==1" placeholder="请选择">
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
                <div class="itemname iteminput">预算年度:</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="nianval" :disabled="detailtype==1" placeholder="请选择">
                    <el-option
                      v-for="item in niandu"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">预算金额:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="jine" placeholder="请输入预算金额"></el-input>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <el-button type="primary" @click="subbtn">提交</el-button>
              <el-button @click="clearval">重置</el-button>
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
        jine:'',
        cgyarr:[],
        cgyval:'',
        detailtype:0,
        detailid:'',
        detailobj:{
          FAmountPrice:'',
          FSYear:'',
          FUserName:'',
        },
        niandu:[
          {label:'2019',value:'2019'},
          {label:'2020',value:'2020'},
          {label:'2021',value:'2021'},
          {label:'2022',value:'2022'},
          {label:'2023',value:'2023'},
          {label:'2024',value:'2024'},
          {label:'2025',value:'2025'},
          {label:'2026',value:'2026'},
          {label:'2027',value:'2027'},
          {label:'2028',value:'2028'},
        ],
        nianval:'',
      }
    },
    props: {},
    methods: {
      subbtn(){
        if(this.cgyval==''){
          this.$message('采购员不能为空');
          return false
        }
        let _this = this
        var data = {
          FSYear: this.nianval,
          FAmountPrice: this.jine,
          FUserID: this.cgyval,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/ModifyUserBudget',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.$router.push({path:'/yusuan_list'})
            },500)
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      clearval(){
        // this.nianval = ''
        // this.cgyval = ''
        this.jine = ''
      },
      handleClick(tab, event) {},
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
      getcgy(type){
        let _this = this
        var data = {
          FCustID: localStorage.getItem('FCustId'),
          FUserID: '',
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/BudgetPurUserList',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setcgy(res.data.data)
            if(type==1){
              _this.getdata()
            }
          }
        }).catch((res)=>{})
      },
      setdata(data){
        for(let i = 0;i<data.length;i++){
          if(this.detailid==data[i].FID){
            this.jine = data[i].FAmountPrice
            this.nianval = data[i].FSYear
            this.cgyval = data[i].FUserID
          }
        }
      },
      getdata(){
        let _this = this
        var data = {
          FCustID: localStorage.getItem('FCustId'),
          FSYear: '',
          FUserID: '',
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/BudgetExecution',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setdata(res.data.data)
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
      document.title = '设置预算'
      if(this.$route.query.type==1){
        this.getcgy(1)
        this.detailtype = 1
        this.detailid = this.$route.query.id
      }else {
        this.getcgy(0)
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
              text-decoration:none;
              color: #666666;
              display: inline-block;
              margin-right: 20px;
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
  .el-select-dropdown__wrap{
    max-height: 160px!important;
  }
</style>
