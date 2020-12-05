<template>
  <div>
    <el-image :src="require('@/assets/logo.png')"></el-image>
    <el-card class="box-card yue">
      <div slot="header" class="clearfix">
        <span>小岳正在听从您的吩咐</span>
        <el-button style="float: right; padding: 3px 0" @click="closeWindow" type="text">取消</el-button>
      </div>
      <div v-loading="loading">
        <div class="bg-color-sub">
          <div v-show="vol>=0" class="bg-blue-sub-item" style="height: 12.5%;background: rgb(217, 236, 255);"></div>
          <div v-show="vol>=10" class="bg-blue-sub-item" style="height: 25%;background: rgb(198, 226, 255);"></div>
          <div v-show="vol>=20" class="bg-blue-sub-item" style="height: 37.5%;background: rgb(179, 216, 255);"></div>
          <div v-show="vol>=30" class="bg-blue-sub-item" style="height: 50%;background: rgb(160, 207, 255);"></div>
          <div v-show="vol>=40" class="bg-blue-sub-item" style="height: 62.5%;background: rgb(140, 197, 255);"></div>
          <div v-show="vol>=50" class="bg-blue-sub-item" style="height: 75%;background: rgb(121, 187, 255);"></div>
          <div v-show="vol>=60" class="bg-blue-sub-item" style="height: 87.5%;background: rgb(102, 177, 255);"></div>
          <div v-show="vol>=70" class="bg-blue-sub-item" style="height: 100%;background: rgb(83, 168, 255);"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import {axios} from "@/utils/request";

export default {
name: "command",
  data () {
    return {
      recorder:{},
      loading: false,
      vol:0,
      result: ''
    }
  },
  mounted() {
    this.recorder=new Recorder({
      sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
  },
  methods: {
    start () {
      // 开启录音 -->
      this.recorder.start()
      var _this=this
      var flag=0
      var flag1=0
      var si =setInterval(()=>{
        flag++
        flag1++
      },1000)
      this.recorder.onprogress= function(params) {
        _this.vol=params.vol
        if (flag>=3||flag1>6){
          clearInterval(si)
          _this.recorder.stop()
          _this.loading=true
          var mp3Blob = _this.recorder.getWAVBlob()
          var form = new FormData()
          form.append('file', mp3Blob)
          axios({
            method: 'post',
            url: '/test/rec',
            data: form
          }).then(response => {
            console.log(response.result.join(''))
            _this.$notify({
              title: '识别结果',
              message: response.result.join(''),
              position: 'top-right',
              duration: 2000
            })
            _this.loading=false
            _this.closeWindow()
          })
        }
        if (params.vol>10){
          flag=0
        }
      }
    },
    closeWindow(){
      this.recorder.stop()
      this.$emit('changeYue',false)
    }
  }
}
</script>

<style scoped>
.bg-color-sub {
  width: 100%;
  height: 80px;
  left: 0;
  bottom: 0;
  line-height: 80px;
}
.bg-blue-sub-item {
  width: 10px;
  border-radius: 3px;
  margin: auto 15px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.yue{
  position: absolute;
  width: 400px;
  top: 30%;
  left: 50%;
  margin-left: -200px;
  background-color: #54789c;
}
.el-card /deep/ .el-card__header{
  border-bottom:1px solid grey;
  color: white;
}
.el-card /deep/ .el-loading-mask{
  background-color: #54789c;
}
.el-image{
  height: 160px;
  width: 160px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -75px;
  margin-top: -280px;
}
</style>