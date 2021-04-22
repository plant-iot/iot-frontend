<template>
  <div style="padding: 20px; overflow: auto; position: relative">
    <div style="position:absolute;right:30px">
      <el-button type="success" plain icon="el-icon-plus" @click="create_rule_modal">创建规则</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table
      :data="rule_table"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="温度规则名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="state"
        label="规则状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="description"
        label="规则描述"
        width="200">
      </el-table-column>
        <el-table-column
        prop="operation"
        label="启用/禁用"
        width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyRuleState(scope.row.name, scope.row.state)">更改</el-button>
          </template>
      </el-table-column>
    </el-table>
    </div>
    <modal v-show="isModalVisible" @close="close_modal">
      <div slot="header" style="margin-top: 5px">{{title}}</div>
      <div slot="body">
        <div style="width:650px">
          <el-form v-show="isCreate" :model="rule_form" label-width="90px" style="width:400px">
            <el-form-item label="规则类别">
              <el-radio v-model="rule_form.type" label="TEMPERATURE_RULE">温度</el-radio>
              <el-radio v-model="rule_form.type" label="HUMIDITY_RULE">湿度</el-radio>
              <el-radio v-model="rule_form.type" label="CO2_RULE">CO2</el-radio>
              <el-radio v-model="rule_form.type" label="LIGHT_INTENSITY_RULE">光照强度</el-radio>
            </el-form-item>
            <el-form-item label="阈值设置">
              <el-input v-model="rule_form.data_num"></el-input>
            </el-form-item>
          </el-form>
<!--          <div v-show="isExecute">-->
<!--            浇水：<el-number></el-number> <el-button>执行</el-button>-->
<!--          </div>-->
        </div>
      </div>
      <div slot="footer">
        <el-button type="info" plain @click="reset_form">取消</el-button>
        <el-button type="primary" plain @click="create_rule">确定</el-button>
      </div>
    </modal>
  </div>
</template>

<script>

import modal from './modal';

export default {
  name:'ruleList',
  components: {modal},
  props:["rule_table"],
  data() {
    return {
      title: '创建规则',
      isModalVisible: false,
      isCreate: false,
      isExecute: false,
      rule_form: {
        type: '',
        data_num: '',
      }
    }
  },
  methods: {
    create_rule() {
      let self = this;
      // let userId = parseInt(localStorage.userId);
      let userId = parseInt(localStorage.userId);

      /*this.reset_form();
      let temp = {
        name: "2",
        state: "已启用",
        description: "当湿度低于10.0%时告警",

      }
      self.rule_table.push(temp);
      this.$router.push('ruleEngine');*/

      // console.log("data_num:" + self.rule_form.data_num);
      let type = self.rule_form.type;
      let data_num = self.rule_form.data_num;
      console.log("data_num:" + self.rule_form.data_num);

      this.$axios.post('/rule_engine/add_rule', {
         userId: userId,
         type: type,
         data_num: data_num
       }).then((res) => {
         console.log("ret_rule_id:" + res.data);
         // this.reset_form();
         location.reload();

       }).catch(function(error){
         console.log(error);
       })
    },
    reset_form() {
      this.rule_form.type = "";
      this.rule_form.data_num = "";
      this.isModalVisible = false;
      this.isCreate = false;
    },
    create_rule_modal() {
      this.isModalVisible = true;
      this.isCreate = true;
    },
    close_modal:function() {
      this.reset_form();
    },
    modifyRuleState(name, state){
      console.log("modity_id:" + name);
      localStorage.modify_id = name;
      localStorage.modify_state = state;
      this.confirmMessageBox('您确认要更改该规则的启用/禁用设置吗？', '提示', 'error').then(() => {
        // 点击确认后执行的操作
        // this.rule_table[0].state = '已禁用';

        let rule_id = parseInt(localStorage.modify_id);
        this.$axios.get('/rule_engine/modify_rule', {
          params: {
            id: rule_id,
          }
        }).then((res) => {
          console.log("modify_rule " + rule_id + ":" + res.data);
          // this.reset_form();
          location.reload();

        }).catch(function(error){
          console.log(error);
        })

      })
    },
    tip(){
      this.messageBox("成功",'success')
    },
    quetip() {
      this.confirmMessageBox('您确认要更改该规则的启用/禁用设置吗？', '提示', 'error').then(() => {
        // 点击确认后执行的操作
        this.rule_table[0].state = '已禁用';
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
    },
  }
}
</script>
