<template>
  <div class="menu">

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :router="routerBool"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/mainPage">
        <i class="el-icon-menu"></i>
        <span slot="title">设备列表</span>

      </el-menu-item>
      <el-menu-item index="/thingModelPage">
        <i class="el-icon-document"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/ruleEngine">
        <i class="el-icon-setting"></i>
        <span slot="title">规则设置</span>
      </el-menu-item>
      <el-menu-item index="/ruleWarning">
        <i class="el-icon-warning"></i>
        <span slot="title">数据告警</span>
      </el-menu-item>
      <el-menu-item @click="dataAnalysis">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'leftBar',
  data(){
    return {
      routerBool:true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      this.$emit("menuChange", key);
    }
    dataAnalysis() {
      window.location.href = "../../static/data_analysis.html"
    }
  }
}
</script>

<style scoped>
  .menu {
    width: 170px;
    /* height: 600px; */
  }
</style>
