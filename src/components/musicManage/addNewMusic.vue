<template>
  <div id="addNewMusic">
    <el-button type="primary" @click="handleClose">新增</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="类型">
          <el-radio-group v-model="musicInfo.musicType">
            <el-radio
              v-for="(item,index) in allType"
              :key="index+item.type"
              :label="item.type"
            >{{item.type}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="音乐">
          <input type="file" @change="getFile" />
        </el-form-item>
        <el-form-item label="图标">
          <input type="file" @change="getIcon"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addNewMusic">确 定</el-button>
      </span>
      <el-progress :text-inside="true" :stroke-width="16" :percentage="percent"></el-progress>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import SparkMD5 from 'spark-md5'
import {mapGetters} from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      width: 0,
      chunkSize: 1 * 1024 * 1024,
      musicInfo: {},
      fileSize: 0,
      files:null,
      file: null,
      hasUploaded: 0,
      chunks: 0,
      iconInput:null,
      percent:0,
    };
  },
  computed: {
    ...mapGetters(["allType"])
  },
  methods: {
    getFile(e){
      this.files = e.target.files
    },
    getIcon(e){
      this.iconInput = e.target.files[0]
    },
    addNewMusic() {
      let files = this.files
      if (!files.length) {
        alert("当前没有选择文件");
        return false;
      }
      this.file = files[0];
      this.fileSize = this.file.size;
      this.startUpload(this.file, this.musicInfo.musicType);
    },
    async startUpload(file, musicType) {
      let fileMd5Value = await this.md5File(file);
      let result = await this.checkFile(file.name, fileMd5Value);
      if (result.file) {
        alert("文件已秒传成功");
        return false;
      }
      await this.checkAndUploadChunk(
        fileMd5Value,
        result.chunkList,
        file.name,
        musicType
      );
    },
    md5File(file) {
      let _this = this;
      return new Promise((resolve, reject) => {
        var blobSlice = File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice,
          chunkSize = file.size / 100,
          chunks = 100,
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

        fileReader.onload = function(e) {
          spark.append(this.result);
          currentChunk++;

          if (currentChunk < chunks) {
            loadNext();
          } else {
            resolve(spark.end());
          }
        };

        function loadNext() {
          let start = currentChunk * _this.chunkSize,
            end =
              start + _this.chunkSize >= file.size ? file.size : start + _this.chunkSize;

          fileReader.readAsArrayBuffer(blobSlice.apply(file, [start, end]));
         
        }

        loadNext();
      });
    },
    checkFile(fileName, fileMd5Value) {
      let _this = this
      let baseUrl = "http://localhost:3000";
      return new Promise((resolve, reject) => {
        let url = `${baseUrl}/music/checkFile?fileName=${fileName}&fileMd5Value=${fileMd5Value}&musicType=${_this.musicInfo.musicType}`;
        _this.$http.get(url).then((resp)=>{
          resolve(resp.data);
        })
      });
    },
    async checkAndUploadChunk(fileMd5Value, chunkList, filename, musicType) {
      this.chunks = Math.ceil(this.fileSize/this.chunkSize);
      this.hasUploaded = chunkList.length;
      for (let i = 0; i < this.chunks; i++) {
        let existChunk = chunkList.indexOf(i + "") > -1;
        //存在则不再上传
        if (!existChunk) {
          await this.uploadChunk(i, fileMd5Value, this.chunks, filename, musicType);
          this.hasUploaded++;
          //计算百分比
          this.percent = Math.floor((this.hasUploaded/this.chunks)*100);
          if(this.percent===100){
            this.handleClose()
          }
        }
      }
    },
    uploadChunk(i, fileMd5Value, chunks, filename, musicType) {
      let _this = this;
      return new Promise((resolve, reject) => {
        let end =
          (i + 1) * this.chunkSize >= _this.file.size ? _this.file.size : (i + 1) * this.chunkSize;
        //构建一个表单
        let form = new FormData();
        form.append("vedio", _this.file.slice(i * _this.chunkSize, end));
        form.append("totalChunks", chunks);
        form.append("currChunk", i);
        form.append("fileMd5Value", fileMd5Value);
        form.append("filename", filename);
        form.append("musicType", _this.musicInfo.musicType);
        if ((i + 1) == chunks) {
          let iconInput = _this.iconInput
          form.append("iconInput", iconInput);
        }
        var api = _this.$apis.uploadMusic;
        let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
        axios.post(api,form,config).then((resp)=>{
          _this.$store.dispatch("findAllMusic")
          resolve(resp)
        })
      });
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  mounted() {
    this.$store.dispatch("findAllType");
  }
};
</script>
<style lang="scss" scoped>
#addNewMusic {
  width: 95%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
</style>
