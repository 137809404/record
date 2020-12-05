<template>
    <div>
      <command-com v-show="showYue" @changeYue="changeYue" ref="son"></command-com>
    </div>
</template>
<script>
import commandCom from "@/components/command";
import Recorder from 'js-audio-recorder'
// api
import { axios } from '@/utils/request'
export default {
  components:{
    commandCom
  },
  data () {
    return {
      recorder:{},
      recorder1:{},
      showYue: false,
      result: '',
      url: ''
    }
  },
  mounted () {
    this.recorder=new Recorder({
      sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
    this.recorder1=new Recorder({
      sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
    this.getPermission()
    this.listen()
  },
  methods: {
    // listen(){
    //   let _this=this
    //   var flag=false
    //   var flag1=false
    //   this.recorder.stop()
    //   this.recorder1.stop()
    //   this.recorder.start()
    //   setTimeout(()=>{
    //     this.recorder1.start()
    //   },1000)
    //   let form = new FormData()
    //   let form1 = new FormData()
    //   this.recorder.onprogress = function(params) {
    //     console.log("第一录音机",params.duration)
    //       if (!flag&&params.duration>=2){
    //         _this.recorder.stop()
    //         _this.recorder.start()
    //       }
    //       if (flag&&params.duration>=2){
    //         var mp3Blob = _this.recorder.getWAVBlob()
    //         console.log(URL.createObjectURL(mp3Blob))
    //         form = new FormData()
    //         form.append('file', mp3Blob)
    //         axios({
    //           method: 'post',
    //           url: '/test/speech',
    //           data: form
    //         }).then(response => {
    //           console.log(response.result.join(''))
    //           _this.$notify({
    //             title: '识别结果',
    //             message: response.result.join(''),
    //             position: 'top-right',
    //             duration: 2000
    //           })
    //           if ((response.result.join('').indexOf('小岳小岳')>=0)||(response.result.join('').indexOf('小玥小玥')>=0)){
    //             console.log('识别成功')
    //             _this.recorder.stop()
    //             _this.recorder1.stop()
    //             _this.showYue=true
    //             _this.$refs.son.start()
    //           }else{
    //             flag=false
    //             _this.recorder.start()
    //           }
    //         })
    //       }
    //       if (params.vol>20){
    //         flag=true
    //       }
    //       // if ((flag&&params.vol<10)||params.duration>=6){
    //       //
    //       // }
    //     }
    //   this.recorder1.onprogress = function(params) {
    //     console.log("第二录音机",params.duration)
    //     if (!flag1&&params.duration>=2){
    //       _this.recorder1.stop()
    //       _this.recorder1.start()
    //     }
    //     if (flag1&&params.duration>=2){
    //       var mp3Blob = _this.recorder1.getWAVBlob()
    //       console.log(URL.createObjectURL(mp3Blob))
    //       form1 = new FormData()
    //       form1.append('file', mp3Blob)
    //       axios({
    //         method: 'post',
    //         url: '/test/speech',
    //         data: form1
    //       }).then(response => {
    //         console.log(response.result.join(''))
    //         _this.$notify({
    //           title: '识别结果',
    //           message: response.result.join(''),
    //           position: 'top-right',
    //           duration: 2000
    //         })
    //       if ((response.result.join('').indexOf('小岳小岳')>=0)||(response.result.join('').indexOf('小玥小玥')>=0)){
    //           console.log('识别成功')
    //           _this.recorder.stop()
    //           _this.recorder1.stop()
    //           _this.showYue=true
    //           _this.$refs.son.start()
    //         }else{
    //           flag=false
    //           _this.recorder1.start()
    //         }
    //       })
    //     }
    //     if (params.vol>20){
    //       flag=true
    //     }
    //     // if ((flag&&params.vol<10)||params.duration>=6){
    //     //
    //     // }
    //   }
    // },
    listen(){
      let _this=this
      var flag=false
      var connected=false
      this.recorder.stop()
      this.recorder.start()
      let form = new FormData()
      this.recorder.onprogress = function(params) {
        if (!flag&&params.duration>=5){
          _this.recorder.stop()
          _this.recorder.start()
        }
        if (params.vol>10){
          flag=true
        }
        if (!connected&&((flag&&params.vol<10)||params.duration>=6)){
          connected=true
          setTimeout(()=>{
            var mp3Blob = _this.recorder.getWAVBlob()
            _this.recorder.start()
            console.log(URL.createObjectURL(mp3Blob))
            form = new FormData()
            form.append('file', mp3Blob)
            axios({
              method: 'post',
              url: '/test/speech',
              data: form
            }).then(response => {
              console.log(response.result.join(''))
              // _this.$notify({
              //   title: '识别结果',
              //   message: response.result.join(''),
              //   position: 'top-right',
              //   duration: 2000
              // })
              var result=response.result.join('')
              if ((result.indexOf('小岳小岳')>=0)||(result.indexOf('小玥小玥')>=0)||(result.indexOf('小院小院')>=0)){
                console.log('识别成功')
                _this.recorder.stop()
                _this.showYue=true
                _this.$refs.son.start()
              }else{
                flag=false
              }
              connected=false
            })
          },500)
        }
      }
    },
    recognize(form){
      axios({
        method: 'post',
        url: '/test/speech',
        data: form
      })
          .then(response => {
            this.$notify({
              title: '识别结果',
              message: response.result.join(''),
              position: 'bottom-right',
              duration: 2000
            })
            loading.close()
          })
      return response.result.join('')
    },
    getPermission(){
      var _that=this
      Recorder.getPermission().then(() => {
        _that.$message(
          '获取权限成功'
        )
      }, (error) => {
        console.log(`${error.name} : ${error.message}`);
      });
    },
    changeYue(params){
      this.showYue=params
      this.listen()
    }

  }
}
</script>
<style scoped>
  .recordbutton /deep/ .el-loading-mask{
    border-radius: 50%;
    background-color: #409EFF;
  }
  .recordbutton /deep/ .el-loading-spinner .path{
    stroke-width: 5;
    stroke: white;
  }
  .recordbutton{
    width: 80px;
    height: 80px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background-color: #409EFF;
  }
  .el-button{
    width: 80px;
    height: 80px;
    /*position: fixed;*/
    /*right: 20px;*/
    /*bottom: 20px;*/
    border-radius: 50%;
  }
  .el-button /deep/ i{
    font-size: 45px;
  }
</style>
