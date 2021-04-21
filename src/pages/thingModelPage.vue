<template>
  <div>
    <topBar></topBar>
    <div class="back">
      <div class="main">
        <div class="left-box">
          <leftBar></leftBar>
        </div>
        <div class="mask">
          <thingModelList></thingModelList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import topBar from '../components/topBar';
import leftBar from '../components/leftBar';
import thingModelList from '../components/thingmodelList';

export default {
  name: 'thingModelPage',
  components: {topBar, leftBar, thingModelList},
  data(){
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