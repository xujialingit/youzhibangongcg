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
          <div class="listbox_title">
            商城后台管理系统首页
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <p class="shownum">合计：<span>3</span>条</p>
            </div>
            <div class="list_inputs">
              <!--选择框-->
              <el-select size="small" clearable v-model="selectvalue" placeholder="请选择">
                <el-option
                  v-for="item in selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--输入框-->
              <el-input size="small" clearable class="topinput" v-model="topInput" placeholder="输入关键字查找"></el-input>
              <!--按钮-->
              <el-button size="small" type="primary" @click="findfn">查找</el-button>
            </div>
          </div>
          <div class="martial_table" >

          </div>
          <!--分页-->
          <div style="margin-top: 30px;display: flex;align-items: center;" v-if="pageobj!=''">
            <pagesnav @clickpage="clickpage" :pageobj="pageobj" :tabliearr="tableobj.allarr"></pagesnav>
          </div>
        </div>
      </div>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import pagesnav from '@/components/sanpages/pages'
  import popup from '@/components/sanpopup/sanpopup'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,pagesnav,popup},
    data() {
      return {
        mincht:'',
        showpage:true,
        pageobj:{
          pagenum:15,
          nowindex:1,
        },
        selectData: [
          {
            value: '1',
            label: '用户名'
          },{
            value: '2',
            label: '手机号码'
          },{
            value: '3',
            label: '单位'
          },{
            value: '4',
            label: '职业'
          },{
            value: '5',
            label: '所在城市'
          }],
        topInput:'',
        selectvalue:'',
        //表格数据
        tableobj:{
          tharr:[{width:'17%',val:'用户名'},{width:'8%',val:'性别'},{width:'10%',val:'手机号码'},{width:'10%',val:'单位'},{width:'13%',val:'职业'},{width:'10%',val:'所在城市'},{width:'17%',val:'加入时间'},{width:'15%',val:'操作'}],
          tabliearr:[],
          allarr:[],
          roleeditshow:true,
        },
        //禁用弹框参数
        alertobj:{
          delalert:false,
          alertitle:'禁用提示',
          content:'确定要禁用这个用户吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 禁用列表id
        deleteid:'',
        queobj:{},
        numcount:'',
        rolebox:''
      }
    },
    props: {},
    methods: {
      clickpage(index){
        let _this = this
        _this.pageobj = _cloneDeep({
          pagenum:15,
          nowindex:index,
        })
        var objdata = _this.tableobj.allarr
        var nowarr = []
        if(objdata.length>_this.pageobj.pagenum*index){
          for(let i =(index-1)*_this.pageobj.pagenum;i<_this.pageobj.pagenum*index;i++){
            nowarr.push(objdata[i])
          }
        }else {
          for(let i =(index-1)*_this.pageobj.pagenum;i<objdata.length;i++){
            nowarr.push(objdata[i])
          }
        }
        _this.tableobj.tabliearr = _cloneDeep(nowarr)
        bus.$emit('checknav',{
          nowindex:index,
          tabarr:_this.tableobj.allarr,
        });
      },
      // 分页
      findfn(){},
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '用户列表'
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
          .martial_table{
            width: 95.5%;
            margin-left: 2.5%;
            min-height: 300px;
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
