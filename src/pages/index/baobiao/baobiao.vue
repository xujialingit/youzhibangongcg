<template>
  <div class="container" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="ordercont">
          <div class="topnavbox">
            <div class="topnavitem">
              <span :class="item.active?'navspan2':'navspan'" v-for="item in navarr" style="margin: 0 10px" @click="clicknav(item)">{{item.val}}</span>
            </div>
          </div>
          <div class="serchcont">
            <div class="block">
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
            <el-button size="small" type="primary"@click="daochufn">导出</el-button>
          </div>
          <div class="yusuanbox">
            <div class="first">
              <div class="echart" id="main"></div>
              <div class="tablebox">
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column
                    label="序号">
                    <template slot-scope="scope">
                      {{ scope.$index+1}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="FTopName"
                    show-overflow-tooltip
                    label="商品类别">
                  </el-table-column>
                  <el-table-column
                    prop="FAmount"
                    label="采购金额"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="FRate"
                    label="占比(此类别/全部类别)"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </div>
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
        timeval:'',
        navarr:[
          {val:'商品类别分布',active:true,id:0},
          {val:'部门费用走势',active:false,id:1},
          {val:'采购排行',active:false,id:2},
        ],
        tableData: [],
      }
    },
    props: {},
    methods:{
      daochufn(){
        var starttime = new Date().toISOString().split('T')[0]
        var endtime = new Date((new Date()).valueOf()-1000*3600*24*365).toISOString().split('T')[0]
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          FUserID:localStorage.getItem('FId'),
          // FUserID:'10110',
          FType:1,
        }
        window.location.href = this.apis+ '/apix/Export/Export/ExportProductCateGoryToExcel?BeginDate='+data.BeginDate+'&EndDate='+data.EndDate+'&FUserID='+data.FUserID+'&FType='+data.FType
      },
      serchfn(){
        this.getdata()
      },
      clicknav(item){
        if(item.id==1){
          this.$router.push({path:'/baobiao1'})
        }else if(item.id==2){
          this.$router.push({path:'/baobiao2'})
        }
      },
      changetime(){},
      changepage(){},
      echart1(data){
        var arr = []
        var arrtitle = []
        if(data.length>0){
          for(let i = 0;i<data.length;i++){
            arr.push({value:data[i].FAmount,name:data[i].FTopName})
            arrtitle.push(data[i].FTopName)
          }
        }
        var echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
          title: {
            text: '费用分布',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: arrtitle
          },
          series: [
            {
              name: '商品类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: arr,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option,true)
      },
      getdata(){
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
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          FUserID:localStorage.getItem('FId'),
          // BeginDate:'2019-03-01',
          // EndDate:'2020-03-01',
          // FUserID:'10146',
          FType:1,
        }
        var url = '/apix/Export/Export/RptProductCategory'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          this.axios.post(this.apis+url,data).then((res)=>{
            if(res.data.statuscode==200){
              _this.echart1(res.data.data)
              _this.tableData = res.data.data
            }
          }).catch((res)=>{
          })
      },
    },
    mounted(){
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      this.getdata()
      this.mincht = (this.docheight )  +'px'
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
        .ordercont{
          width: 90%;
          margin-left: 5%;
          position: relative;
          margin-top: 20px;
          background-color: #fff;
          padding: 15px;
          box-sizing: border-box;
          .topnavbox{
            width: 100%;
            padding: 0px 0 15px;
            padding-bottom: 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            border-bottom: 1px solid #eee;
            .topnavitem{
              .navspan:hover{
                color: red;
                text-decoration: underline;
                cursor: pointer;
              }
              .navspan2{
                color: red;
              }
            }
          }
          .serchcont{
            width: 100%;
            display: flex;
            margin: 20px 0 10px;
          }
          .yusuanbox{
            width: 100%;
            .first{
              width: 100%;
              .echart{
                width: 80%;
                height: 500px;
                margin: 30px auto;
              }
              .tablebox{
                width: 90%;
                margin: 0px auto;
                margin-top: 30px;
                box-shadow: 0 0 5px rgb(150,150,150);
                padding: 10px;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }
  }
</style>
<style>
  .echart>div{
    width: auto!important;
  }
</style>
