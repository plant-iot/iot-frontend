<template>
  <div>
    <topBar></topBar>
    <div class="back">
      <div class="main">
        <div class="left-box">
          <leftBar></leftBar>
        </div>
        <div class="mask">

        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import topBar from '../components/topBar'
import leftBar from '../components/leftBar'
export default {
  name: 'mainPage',
  components: {topBar, leftBar},
  data() {
    return {
      
    }
  },
  methods: {
    
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
  }

  .mask {
    flex: 0 1 850px;
    height: 450px;
    background-color: white;
    opacity: 0.85;
    margin-top: 50px;
    margin-left: 80px;
  }

  .left-box {
    padding-top: 150px;
  }
</style>