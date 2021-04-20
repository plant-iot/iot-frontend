<template>
  <div style="padding: 20px; overflow: auto; position: relative">
    <div style="position:absolute;right:30px">
      <el-button type="success" plain icon="el-icon-plus" @click="create_device_modal">创建设备</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table
      :data="device_table"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="设备名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备类型"
        width="200">
      </el-table-column>
      <el-table-column
        prop="state"
        label="设备状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="设备操作"
        width="200">
      </el-table-column>
      
    </el-table>
    </div>
    <modal v-show="isModalVisible" @close="close_modal">
      <div slot="header" style="margin-top: 5px">{{title}}</div>
      <div slot="body">
        <div style="width:650px">
          <el-form v-show="isCreate" :model="device_form" label-width="90px" style="width:400px">
            <el-form-item label="设备名称">
              <el-input v-model="device_form.name"></el-input>
            </el-form-item>
            <el-form-item label="设备类别">
              <el-radio v-model="device_form.type" label="sensor">传感器</el-radio>
              <el-radio v-model="device_form.type" label="executor">执行器</el-radio>
            </el-form-item>
            <el-form-item label=物模型模板>
            </el-form-item>
          </el-form> 
          <div v-show="isExecute">
            浇水：<el-number></el-number> <el-button>执行</el-button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="info" plain @click="reset_form">取消</el-button>
        <el-button type="primary" plain>确定</el-button>
      </div>
    </modal>
  </div>
</template>

<script>

import modal from './modal';

export default {
  name:'deviceList',
  components: {modal},
  props:["device_table"],
  data() {
    return {
      title: '创建设备',
      isModalVisible: false,
      isCreate: false,
      isExecute: false,
      device_form: {
        name: '',
        type: '',
        thingModelId: '',
      }
    }
  },
  methods: {
    create_device() {
      let self = this;
      let userId = parseInt(localStorage.userId);
      this.$axios.post('/device/addDevice', {
        userId: userId,
        type: self.device_form.type,

      }).then(function(res) {

      }).catch(function(error){
        console.log(error);
      })
    },
    reset_form() { 
      this.device_form.name = "";
      this.device_form.type = "";
      this.isModalVisible = false;
      this.isCreate = false;
    },
    create_device_modal() {
      this.isModalVisible = true;
      this.isCreate = true;
    },
    close_modal:function() {
      this.reset_form();
    },
    
  }
}
</script>