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
        width="250">
      </el-table-column>
      <el-table-column
        prop="type"
        label="物模型类型"
        width="250">
         <template  slot-scope="scope" >
            <el-tag
              :type="scope.row.type === '传感器' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="service_list"
        label="服务"
        width="300">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.service_list" :key="index">{{item}}</p>
        </template> 
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
              <el-radio v-model="model_form.type" label="executor">执行器</el-radio>
            </el-form-item>
            <el-form-item label="物模型服务">
              <el-checkbox-group v-model="result_service_list" size="small">
                <el-checkbox-button v-for="service in model_list" :label="service.name" :key="service.service_id">{{service.name}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button type="info" plain @click="reset_form">取消</el-button>
        <el-button type="primary" plain @click="create_thing_model">确定</el-button>
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
        type: 'executor',
        service: []
      },
      model_list: [
        {
          name: '浇水',
          service_id: '0'
        },
        {
          name: '调高光照',
          service_id: '1'
        },
        {
          name: '调低光照',
          service_id: '2'
        }],
      result_service_list: [],
      isModalVisible: false,
      title: '创建物模型',
    }
  },
  methods: {
    create_thing_model() {

      console.log(this.result_service_list);

      let id = parseInt(localStorage.userId);
      let self = this;
      // this.$axios.post('/thingModel/addThingModel', {

      // }).then(function(res) {
      //   self.result_service_list = [];
      // }).catch(function(error) {
      //   console.error(error);
      // })
      this.$message({
          message: '创建成功！',
          type: 'success'
        });
      this.reset_form();
    },
    reset_form() { 
      this.result_service_list = [];
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