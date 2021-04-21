@@ -0,0 +1,97 @@
<template>
  <div style="padding: 20px; overflow: auto; position: relative">
    <div style="position:absolute;right:30px">
      <el-button type="success" plain icon="el-icon-plus" @click="create_model_modal">创建物模型</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table
      :data="model_table"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="物模型名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="物模型类型"
        width="200">
         <template  slot-scope="scope" >
            <el-tag
              :type="scope.row.type === '传感器' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="onOff"
        label="设备状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="服务"
        width="200">
        
      </el-table-column>
      
    </el-table>
    </div>
    <modal v-show="isModalVisible" @close="close_modal">
      <div slot="header" style="margin-top: 5px">{{title}}</div>
      <div slot="body">
        <div style="width:650px">
          <el-form :model="model_form" label-width="90px" style="width:400px">
            <el-form-item label="物模型名称">
              <el-input v-model="model_form.name"></el-input>
            </el-form-item>
            <el-form-item label="物模型类型">
              <el-radio v-model="device_form.type" label="sensor">传感器</el-radio>
              <el-radio v-model="device_form.type" label="executor">执行器</el-radio>
            </el-form-item>
            <el-form-item label="物模型服务">
              
            </el-form-item>
          </el-form>
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
  name: 'thingModelList',
  components: {modal},
  props: ['model_table'],
  data() {
    return {
      model_form: {
        name: '',
        type: '',
        service: []
      },
      isModalVisible: false,
      title: '创建物模型',
    }
  },
  methods: {
    reset_form() { 
      this.isModalVisible = false;
      this.isCreate = false;
    },
    create_model_modal() {
      this.isModalVisible = true;
      this.isCreate = true;
    },
    close_modal:function() {
      this.reset_form();
    },
  }
}
</script>