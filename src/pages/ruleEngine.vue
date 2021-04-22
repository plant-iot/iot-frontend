<template>
  <div>
    <topBar></topBar>
    <div class="back">
      <div class="main">
        <div class="left-box">
          <leftBar></leftBar>
        </div>
        <div class="mask">
          <ruleList :rule_table="rule_table"></ruleList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../components/topBar'
import leftBar from '../components/leftBar'
import ruleList from "../components/ruleList";

export default {
  name: 'ruleEngine',
  components: {topBar, leftBar, ruleList},
  mounted() {
    // this.userId = this.$route.params.id;
    this.userId = parseInt(localStorage.userId);
    // console.log("userId:" + this.userId);
    console.log("welcome to ruleEngine page.");
    this.get_rule_list();
  },
  data() {
    return {
      meun_index: 3,
      userId: 0,
      rule_table: []
    }
  },
  methods: {
    get_rule_list() {
      this.rule_table = [];
      let userId = this.userId;
      let self = this;

      /*let temp = {
        name: "1",
        state: "已启用",
        description: "当温度超过30℃时告警",
      }
      self.rule_table.push(temp);*/

      this.$axios.get('/rule_engine/show_all_rules_info', {
        params: {
          userId: userId
        }
      }).then(function(res) {
        for(let data of res.data) {
          console.log(data)
          let temp = {
            name: data.name,
            state: data.state,
            description: data.description,
          }
          self.rule_table.push(temp);
        }

      }).catch(function(error) {
        console.log(error);
      })
    },

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
