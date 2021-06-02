<template>
  <div class="upload_cover" @click="dialogVisible = true">
    <div class="cover_wrap">
      <img src="./pic_bg.png" alt="">
    </div>
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="dialogVisible"
      width="30%"
      center
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          素材库的内容
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false, // 文章封面弹出层的显示状态, 默认为false, 不弹出
      activeName: 'first' // 弹出层默认显示的标签页, 默认为first, 即显示第一个标签页
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .cover_wrap {
    width: 150px;
    height: 150px;
    border: 1px solid #000000;
    img {
      width: 150px;
      height: 150px
    }
  }
</style>
