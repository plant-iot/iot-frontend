<template>
  <div>
    <topBar></topBar> 
    <div class="back">
      <div style="height: 100px">
        <!-- 智能家用植物养护 IoT 平台 前端 -->
      </div>
      <div class="flex_box">
        <div class="flex_child">
          <!-- <div align="center">登录</div> -->
          <el-form :model="login_form" label-width="80px" :label-position="labelPosition">
            <el-form-item label="用户ID">
              <el-input v-model="login_form.id"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="login_form.password"></el-input>
            </el-form-item>
            <el-form-item align="center">
              <div align="center" class="login_btn" @click="login">
                ✔
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import topBar from '../components/topBar'
    export default {
      name: "index",
      components: {topBar},
      data() {
        return {
          labelPosition: "top",
          login_form: {
            id: "",
            password: "",
          }       
        }
      },
      methods: {
        login() {

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

  .flex_box {
    display: flex;
    flex-direction: row-reverse;
  }


  .flex_child {
    flex: 0 1 27%;
    background-color: white;
    height: 270px;
    margin-right: 90px;
    opacity: 0.8;
    padding: 20px 50px;
  }

  .login_title {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;

  }

  .login_btn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    border: 1px solid gray;
  }
  
  .login_btn:hover {
    cursor: pointer;
    border: 1px solid teal;
    color: teal;
  }
  
</style>
