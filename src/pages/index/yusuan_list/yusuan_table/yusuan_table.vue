<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
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
          <div class="listbox_title">
            <div>预算执行情况表</div>
          </div>
          <div class="martial_table" >
            <div class="tablebox">
              <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
                <thead class="graythead">
                <tr class='grayTr'>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">序号</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">采购员</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">年度</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">预算金额</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">采购金额</td>
                </tr>
                </thead>
                <tbody >
                <tr v-for="(item,index) in yusuanlist" class="table_td">
                  <td class="sortEdit" >{{index+1}}</td>
                  <td class="sortEdit" >{{item.FUserName}}</td>
                  <td class="sortEdit" >{{item.FSYear}}</td>
                  <td class="sortEdit" >{{item.FAmountPrice}}</td>
                  <td class="sortEdit" >{{item.FPurAmount}}</td>
                </tr>
                <tr class="table_td">
                  <td class="sortEdit" colspan="3" style="text-align: center;border-right: 1px solid #eee">合计</td>
                  <td class="sortEdit" >{{allyusuan}}</td>
                  <td class="sortEdit" >{{allcaigou}}</td>
                </tr>
                </tbody>
              </table>
              <div v-if="false" class="lodmore" style="width: 100%;height:auto">
                <div class="noimg"><img src="/static/img/nodata.png" alt=""></div>
                <div>暂无相关信息</div>
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
  import popup from '@/components/sanpopup/sanpopup'
  export default {
    components: {leftnav,topnav,popup},
    data() {
      return {
        mincht:'',
        showpage:true,
        //禁用弹框参数
        yusuanlist:[],
        gongsiname:localStorage.getItem('FCompanyName'),
        allyusuan:0,
        allcaigou:0,
      }
    },
    props: {},
    methods: {
      changepage(index){
        console.log(index)
        console.log(222)
      }, // 分页
      finduser(){

      },
      todetail(){
        this.$router.push({path:'/yusuan_detail',})
      },
      findfn(){},
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
            _this.yusuanlist = res.data.data
            for(let i = 0;i<res.data.data.length;i++){
              _this.allyusuan+=res.data.data[i].FAmountPrice
              _this.allcaigou+=res.data.data[i].FPurAmount
            }
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
      document.title = '预算报表'
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
