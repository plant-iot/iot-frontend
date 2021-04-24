<template>
  <div style="padding: 20px; overflow: auto; position: relative">
    <div style="position:absolute;right:30px">
      <el-button type="success" plain icon="el-icon-plus" @click="create_device_modal">创建设备</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table
      :data="device_table"
      style="width: 100%"
      height="370">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="(item, index) in props.row.log" :key="index">
              <span>{{ item.action}}</span> <span>{{item.time}}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备类型"
        width="200">
        <template  slot-scope="scope" >
            <el-tag
              v-show="scope.row.state === '可使用'"
              :type="scope.row.type === '传感器' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
            <el-tag
              v-show="scope.row.state === '已禁用'"
              type="info"
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
        label="设备操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="change_device_state(scope.row.state, scope.$index)"
            ><span v-show="scope.row.state === '已禁用'">启用</span><span v-show="scope.row.state === '可使用'">禁用</span></el-button>
          <el-button
            size="mini"
            type="primary"
            :disabled="scope.row.state === '已禁用'"
            @click="operate(scope.row)">操作</el-button>
      </template>
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
              <el-radio v-model="device_form.type" label="传感器">传感器</el-radio>
              <el-radio v-model="device_form.type" label="执行器">执行器</el-radio>
            </el-form-item>
            <el-form-item label=物模型模板>
              <el-radio v-show="device_form.type === '传感器'" v-for="model in sensor_list" :key="model.modelId" v-model="device_form.thingModel" :label="model.modelId">{{model.name}}</el-radio>
              <el-radio v-show="device_form.type === '执行器'" v-for="model in executor_list" :key="model.modelId" v-model="device_form.thingModel" :label="model.modelId">{{model.name}}</el-radio>
            </el-form-item>
          </el-form> 
          <div v-show="isExecute">
            <div v-for="(item, index) in service_list" :key="index" style="margin: 10px">
               <span style="display:inline-block; width: 100px">{{item}}：</span><el-input-number size="mini"></el-input-number> <span class="unit" v-show="item === '浇水'">ml</span><span class="unit" v-show="item === '调高光照'">%</span><span class="unit" v-show="item === '调低光照'">%</span> <el-button @click="execute" size="mini">执行</el-button>
            </div>
           
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="info" plain @click="reset_form">取消</el-button>
        <el-button type="primary" plain @click="create_device">确定</el-button>
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
        type: '传感器',
        thingModel: 1,
      },
      sensor_list: [],
      executor_list: [],
      service_list: []
    }
  },
  methods: {
    async operate(device) {
      if(device.type === '传感器') {
        this.$message({
          message: '传感器信息采集成功！',
          type: 'success'
        });
      }else {
        await this.get_device_service(device.id);
        this.isModalVisible = true;
        this.isExecute = true;
        
      }
    },

    execute() {
      this.$message({
          message: '执行成功！',
          type: 'success'
        });
      this.reset_form();
    },

    get_device_service(device_id) {
      let self = this;
      this.$axios.get('/thingModel/getDeviceThingModel', {
        params: {
          deviceId: device_id
        }
      }).then(function(res) {
        console.log(res.data);
        self.service_list = res.data;
      }).catch(function(error) {
        console.error(error);
      })
    },

    get_thing_models() {
      let userId = parseInt(localStorage.userId);
      let self = this;
      this.$axios.get('/thingModel/getThingModel', {
        params: {
          userId: userId
        }
      }).then(function(res) {
        console.log(res.data);
        
        for(let data of res.data) {
          let model = {
            modelId: data.modelId,
            name: data.modelName,
            type: data.deviceType,
          };

          if(model.type === "传感器") {
            self.sensor_list.push(model);
          }else {
            self.executor_list.push(model);
          }
        }
      }).catch(function(error) {
        console.error(error);
      })
    },

    create_device() {
      let self = this;
      let userId = parseInt(localStorage.userId);
     

     
      this.$axios.post('/device/addDevice', {
        userId: userId,
        name: self.device_form.name,
        type: self.device_form.type,
        modelId: self.device_form.thingModel
      }).then(function(res) {

        let device = {
          id: res.data,
          name: self.device_form.name,
          type: self.device_form.type,
          state: '可使用',
          onOff: '在线',
        }

        self.$set(self.device_table, self.device_table.length, device);

        self.$message({
          message: '设备创建成功！',
          type: 'success'
        });
        self.reset_form();

      }).catch(function(error){
        console.log(error);
      })
    },
    change_device_state(state, index) {
      if(state === '可使用') {
        this.disable_device(index);
      } else{
        this.enable_device(index);
      }
    },
    disable_device(index) {
      let device = this.device_table[index];
      device.state = '已禁用';
      this.$set(this.device_table, index, device);
    },
    enable_device(index) {
      let device = this.device_table[index];
      device.state = '可使用';
      this.$set(this.device_table, index, device);
    },
    reset_form() { 
      this.device_form.name = "";
      this.device_form.type = "传感器";
      this.device_form.thingModel = 1;
      this.sensor_list = [];
      this.executor_list = [];
      this.isModalVisible = false;
      this.isCreate = false;
      this.isExecute = false;
    },
    async create_device_modal() {

      await this.get_thing_models();

      this.isModalVisible = true;
      this.isCreate = true;
    },
    close_modal:function() {
      this.reset_form();
    },
    
  }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .unit {
    display:inline-block;
    width: 30px;
  }
</style>