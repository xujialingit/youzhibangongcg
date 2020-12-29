<template>
  <div class="container" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title" style="color: red">
            四川XX有限公司
          </div>
          <div class="listbox_title">
            订单列表
          </div>
          <div class="listbox_do">
            <div class="list_inputs">
              <!--按钮-->
                <div class="block">
                  <span class="demonstration">下单时间:</span>
                  <el-date-picker
                    v-model="timeval"
                    type="daterange"
                    @change="changetime"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              <el-button size="small" type="primary" style="margin-left: 10px" @click="serchfn">查询</el-button>
              <el-button size="small" type="primary" @click="daochu">导出</el-button>
            </div>
          </div>
          <div class="martial_table" >
            <div class="tablebox">
              <el-table
                :data="userlist"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="FBillNo"
                  show-overflow-tooltip
                  label="订单编号">
                </el-table-column>
                <el-table-column
                  prop="FBillTime"
                  show-overflow-tooltip
                  label="下单时间">
                </el-table-column>
                <el-table-column
                  prop="FOccupation"
                  show-overflow-tooltip
                  label="采购部门">
                </el-table-column>
                <el-table-column
                  prop="FUserName"
                  show-overflow-tooltip
                  label="采购员">
                </el-table-column>
                <el-table-column
                  prop="FStatus"
                  show-overflow-tooltip
                  label="审核状态">
                </el-table-column>
                <el-table-column
                  prop="FExectionStat"
                  show-overflow-tooltip
                  label="订单状态">
                </el-table-column>
                <el-table-column
                  prop="FMaterialNumber"
                  show-overflow-tooltip
                  label="商品编号">
                </el-table-column>
                <el-table-column
                  prop="FMaterialName"
                  show-overflow-tooltip
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="FUnitName"
                  show-overflow-tooltip
                  label="采购单位">
                </el-table-column>
                <el-table-column
                  prop="FQty"
                  show-overflow-tooltip
                  label="采购数量">
                </el-table-column>
                <el-table-column
                  prop="FPrice"
                  show-overflow-tooltip
                  label="单价">
                </el-table-column>
                <el-table-column
                  prop="FAmount"
                  show-overflow-tooltip
                  label="采购金额">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pagenav">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pagenum"
              @current-change="changepage"
              :total="allpage*pagenum">
            </el-pagination>
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
    components: {leftnav,topnav},
    data() {
      return {
        mincht:'',
        pagenum:5,
        nowpage:1,
        allpage:1,
        timeval:'',
        //禁用弹框参数
        userlist: [],
        multipleSelection:[],
      }
    },
    props: {},
    methods: {
      handleSelectionChange(val){
        console.log(val)
        this.multipleSelection = val
      },
      serchfn(){
        let _this = this
        var starttime = new Date().toISOString().split('T')[0]
        var endtime = new Date((new Date()).valueOf()-1000*3600*24*365).toISOString().split('T')[0]
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          FSDate:this.timeval?start2:starttime,
          FEDate:this.timeval?end2:endtime,
          FPageIndex: this.nowpage,
          FPageSize: this.pagenum,
          FCustID: localStorage.getItem('FCustId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/BackSearchOrders',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.userlist=  res.data.data
            _this.allpage = parseInt(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      daochu(){
        let _this = this
        var arr = []
        if(this.multipleSelection.length==0){
          return false
        }
        for(let i = 0;i<this.multipleSelection.length;i++){
          arr.push(this.multipleSelection[i].FBillNo)
        }
        var fbtype = '全部'
        var data = {
          params: {
            fBillNo:JSON.stringify(arr),
            fBillType:fbtype,
          }
        }
        window.location.href = this.apis+'/apix/Export/Export/ExportOrdersToExcel?FBillNo='+JSON.stringify(arr)+'&fBillType='+fbtype
      },
      changetime(e){
        console.log(e)
      },
      changepage(index){
        this.nowpage = index
        this.getdata()
      }, // 分页
      getdata(){
        let _this = this
        var data = {
          params:{
            fCustID: localStorage.getItem('FCustId'),
            fPageIndex: this.nowpage,
            fPageSize: this.pagenum,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Order/Order/BackShowOrder',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.userlist = res.data.data
            _this.allpage = parseInt(res.data.message)
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
      document.title = '订单列表'
      this.getdata()
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
          min-height: 500px;
          background-color: white;
          padding-bottom: 20px;
          .martial_table{
            width: 95.5%;
            margin-left: 2.5%;
            min-height: 300px;
            .table{
              border-collapse:collapse;
              .graythead{
                background-color: #f2f2f2;
              }
            }
            /*暂无数据*/
            .lodmore{
              padding: 20px 0;
              box-sizing: border-box;
              text-align: center;
              color: rgb(200,200,200);
              font-size: 14px;
            }
            .noimg{
              width: 100%;
              margin-bottom: 10px;
            }
            .noimg>img{
              width: 40px;
            }

            .imgdiv{
              display: flex;
            }
            .table_td{
              border-bottom: 1px solid #e6e6e6;
              td{
                padding-left: 9px;
              }
            }
            .sortEdit{
              line-height: 30px !important;
              padding: 5px 0;
              box-sizing: border-box;
              .btnbox{
                cursor: pointer;
              }
            }
            .sortEditimg{
              font-size: 0;padding: 5px 0;box-sizing: border-box
            }
            .table_td:hover{
              background-color: #f2f2f2;
            }
            .sortEdit>.imgdiv{
              display: flex;
            }
          }
          .pagenav{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          }
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
          }
          .listbox_do{
            /* display: flex;*/
            margin-top: 30px;
            min-height: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:auto;
              float: right;
              margin-right: 2%;
              display: flex;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              width: 30%;
              float: left;
              margin-left:2.5%;
              .shownum{
                font-size: 14px;
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
  .sortEdit>.imgdiv{
    display: flex;
  }
</style>
