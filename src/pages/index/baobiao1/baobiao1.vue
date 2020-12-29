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
            <el-button size="small" type="primary" @click="daochufn">导出</el-button>
          </div>
          <div class="yusuanbox">
            <div class="two">
              <div class="echart" id="main2"></div>
              <div class="tablebox">
                <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
                  <thead class="graythead">
                  <tr class='grayTr'>
                    <td style="padding: 15px 0;text-indent: 9px" v-for="item in timedata">{{item}}</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in tableData" class="table_td">
                    <td style="padding: 10px 0;text-indent: 10px" class="sortEdit" v-for="item2 in item">{{item2}}</td>
                  </tr>
                  </tbody>
                </table>
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
        timeval:'',
        navarr:[
          {val:'商品类别分布',active:false,id:0},
          {val:'部门费用走势',active:true,id:1},
          {val:'采购排行',active:false,id:2},
        ],
        tableData: [],
        timedata:[],
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
        data = {
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          FUserID:localStorage.getItem('FId'),
          // FUserID:'10110',
          FType:1,
        }
        window.location.href = this.apis+ '/apix/Export/Export/ExportDepCostToExcel?BeginDate='+data.BeginDate+'&EndDate='+data.EndDate+'&FUserID='+data.FUserID+'&FType='+data.FType
      },
      serchfn(){
        this.getdata()
      },
      clicknav(item){
        if(item.id==0){
          this.$router.push({path:'/baobiao'})
        }else if(item.id==2){
          this.$router.push({path:'/baobiao2'})
        }
      },
      changetime(){},
      changepage(){},
      echart2(data){
        var echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('main2'));
        var option = {
          legend: {},
          tooltip: {},
          dataset: {
            source: data
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
          ]
        };
        myChart.setOption(option,true)
      },
      getdata(daochu){
        var starttime = new Date().toISOString().split('T')[0]
        var endtime = new Date((new Date()).valueOf()-1000*3600*24*365).toISOString().split('T')[0]
        let _this = this
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          // BeginDate:'2019-03-01',
          // EndDate:'2020-03-01',
          FUserID:localStorage.getItem('FId'),
          // FUserID:'10110',
          FType:1,
        }
        var url = '/apix/Export/Export/RptDepCost'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          this.axios.post(this.apis+url,data).then((res)=>{
            if(res.data.statuscode==200){
              if(res.data.data.table.datetime.length>0){
                _this.timedata = res.data.data.table.datetime[0]
              }
              _this.tableData = res.data.data.table.data
              _this.echart2(res.data.data.data)
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
          position: relative;
          margin-top: 20px;
          background-color: #fff;
          padding: 15px;
          box-sizing: border-box;
          margin-left: 5%;
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
            .two{
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
                .table{
                  border-collapse:collapse;
                  .graythead{
                  }
                  .table_td{
                    td{
                      padding-left: 9px;
                    }
                    .sortEditimg{
                      display: flex;
                      .sortimg{
                        height: 40px;
                        font-size: 0px;
                        margin-right: 10px;
                        img{
                          height: 100%;
                        }
                      }
                      .goodsname{
                        height: 40px;
                        line-height: 40px;
                      }
                    }
                    .sortEdit{
                      .numjisuan{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        .numbtn{
                          width: 30px;
                          height: 30px;
                          border: 1px solid #eee;
                          text-align: center;
                          line-height: 30px;
                          font-size: 20px;
                          cursor: pointer;
                        }
                        .numinput{
                          width: 100px;
                          height: 30px;
                          border-top: 1px solid #eee;
                          border-bottom: 1px solid #eee;
                          input{
                            width: 95%;
                            height: 28px;
                            border: none;
                            outline: none;
                            text-align: center;
                          }
                          input::-webkit-outer-spin-button,
                          input::-webkit-inner-spin-button{
                            -webkit-appearance: none !important;
                            margin: 0;
                          }
                        }
                      }
                      .btnbox:hover{
                        text-decoration: underline;
                        color: red;
                        cursor: pointer;
                      }
                    }
                  }
                  .table_td:hover{
                    background-color: #f2f2f2;
                  }
                }
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
