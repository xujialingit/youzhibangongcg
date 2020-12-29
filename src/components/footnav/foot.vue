<template>
  <div class="footbox">
    <div class="foottop">
      <div class="ft_left">
        <div class="aboutus">关于我们</div>
        <div class="aboutustext">公司零售兼批发办公用品、文具用品、体育用品、日用品、电子产品、纸制品、玩具。</div>
      </div>
      <div class="ft_right">
        <div class="talkus">联系我们</div>
        <div class="talkustext">
          <div>微信：youzhi</div>
          <div style="margin: 0 30px">QQ: 999999</div>
          <div>邮箱：youzhi@youzhi.com</div>
        </div>
      </div>
    </div>
    <div class="footunder">
      <span>Copyright© 2019 | Powered by</span>
      <span class="yzbgurl">优志办公</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        //动态列表回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'提示',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        username:'',
        userpwd:'',
        mincht:'',
        img:'http://dongwu.siantest.com/san/Login/capcha',
        showforget:false,
      }
    },
    props: {},
    methods: {
    },
    mounted(){
    },
    created() {
      this.mincht = (this.docheight )+'px'
    },
  }
</script>

<style scoped lang="less">
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
</style>
