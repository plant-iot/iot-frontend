<template>
  <div>
    <topBar></topBar>
    <div class="back">
      <div class="main">
        <div class="left-box">
          <leftBar></leftBar>
        </div>
        <div class="mask">
          <warningList></warningList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../components/topBar'
import leftBar from '../components/leftBar'
import ruleList from "../components/ruleList";
import warningList from "../components/warningList";

export default {
  name: 'ruleWarning',
  components: {topBar, leftBar, warningList},
  mounted() {
    this.userId = parseInt(localStorage.userId);
    // console.log("userId:" + this.userId);
    this.get_warning_list();
    // this.messageBox("向浇水设备发出启动信号！",'success');
  },
  data() {
    return {
      meun_index: 4,
      userId: 0,
    }
  },
  methods: {
    get_warning_list() {
      let userId = this.userId;
      let self = this;
      this.$axios.get('/rule_engine/check_and_warn', {
        params: {
          userId: userId
        }
      }).then((res) => {
        document.getElementById("temp_warn_id").innerHTML = res.data.temp_warn;
        document.getElementById("humi_warn_id").innerHTML = res.data.humi_warn;
        document.getElementById("co2_warn_id").innerHTML = res.data.co2_warn;
        document.getElementById("light_warn_id").innerHTML = res.data.light_warn;
        if(res.data.humi_warn != "暂无告警"){
          this.messageBox("向浇水设备发出启动信号！",'success');
        }

      }).catch(function(error) {
        console.log(error);
      })
    },
    messageBox(message,type,userHTML,showClose,duration){
      const msgInfo = message
      const msgType = type || 'warning'
      const msgUserHTML = userHTML || false
      const msgShowClose = showClose || false
      const msgDuration = duration || 4000
      this.$message({
        message: msgInfo,
        type:msgType,
        dangerouslyUseHTMLString:msgUserHTML,
        showClose:msgShowClose,
        duration:msgDuration
      })
    },
    confirmMessageBox(message,title, confirType, msgUserHTML){
      return new Promise((resolve,reject)=>{
        this.$confirm(message, title || '提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          dangerouslyUseHTMLString:msgUserHTML || false,
          type:confirType || 'warning'
        }).then(()=>{
          resolve()
        }).catch(()=>{
        })
      })
    }
  }
}
</script>

<style scoped>

  .back {
    background-image: url("/static/index-back.jpg");
    background-size: 100% 100%;
    height: 520px;
  }

  .main {
    display: flex;
    height: 100%;
  }

  .mask {
    flex: 0 1 850px;
    height: 450px;
    background: rgba(255, 255, 255, 0.85);
    /* opacity: 0.85; */
    margin-top: 50px;
    margin-left: 80px;
  }

  .left-box {
    /* align-items: center;
    min-height: 100px; */
    padding-top: 150px;
  }
</style>
