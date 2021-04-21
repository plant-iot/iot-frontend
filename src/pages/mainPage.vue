<template>
  <div>
    <topBar></topBar>
    <div class="back">
      <div class="main">
        <div class="left-box">
          <leftBar></leftBar>
        </div>
        <div class="mask">
          <deviceList :device_table="device_table"></deviceList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../components/topBar'
import leftBar from '../components/leftBar'
import deviceList from '../components/deviceList'

export default {
  name: 'mainPage',
  components: {topBar, leftBar, deviceList},
  mounted() {
    // this.userId = this.$route.params.id;
    this.userId = parseInt(localStorage.userId);
    console.log("userId:" + this.userId);
    this.get_device_list();
  },
  data() {
    return {
      meun_index: 1,
      userId: 0,
      device_table: []
    }
  },
  methods: {

    get_device_list() {
      this.device_table = [];
      let userId = this.userId;
      let self = this;
      this.$axios.get('/deviceinfo/getDeviceInfoList', {
        params: {
          userId: userId
        }
      }).then(function(res) {
        for(let data of res.data) {
          let temp = {
            id:data.id,
            name: data.name,
            type: data.type,
            onOff: data.onOff,
            state: data.state,
          }
          console.log(data);
          self.device_table.push(temp);
        }
      }).catch(function(error) {
        console.log(error);
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