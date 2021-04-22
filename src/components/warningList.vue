<template>
  <div style="padding: 20px; overflow: auto; position: relative">
    <div style="position:absolute;left:30px">
      <div style="font-weight: bolder">温度数据告警</div>
    </div>
    <div style="margin-top: 50px;margin-left: 50px">
<!--      <p>当前温度：35℃</p>-->
<!--      <p>告警：已超过30℃！</p>-->
<!--      <p>暂无告警</p>-->
      <p id="temp_warn_id"></p>
    </div>
    <div style="position:absolute;left:30px">
      <div style="font-weight: bolder">湿度数据告警</div>
    </div>
    <div style="margin-top: 50px;margin-left: 50px">
<!--      <p>当前湿度：9%</p>-->
<!--      <p>告警：已低于10%！</p>-->
      <p id="humi_warn_id"></p>
    </div>
    <div style="position:absolute;left:30px">
      <div style="font-weight: bolder">CO2含量数据告警</div>
    </div>
    <div style="margin-top: 50px;margin-left: 50px">
<!--      <p>暂无告警</p>-->
      <p id="co2_warn_id"></p>
    </div>
    <div style="position:absolute;left:30px">
      <div style="font-weight: bolder">光照强度数据告警</div>
    </div>
    <div style="margin-top: 50px;margin-left: 50px">
<!--      <p>暂无告警</p>-->
      <p id="light_warn_id"></p>
    </div>
  </div>
</template>
