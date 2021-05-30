<template>
  <div class="image_container">
    <el-card class="box_card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <div class="header_buttons">
        <el-radio-group v-model="collect" @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="dialogUploadVisible = true">添加素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col class="image_item" :xs="12" :sm="6" :lg="4" v-for="(image, index) in images" :key="index">
          <el-image :src="image.url" lazy></el-image>
          <div class="image_operation">
            <el-button
              type="success"
              :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              :loading="image.loading"
              @click="onCollect(image)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              :loading="image.loading"
              @click="onDelete(image)"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
      <!-- 列表分页器 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :current-page.sync="currentPage"
        @current-change="onCurrentChange"
      >
      </el-pagination>
      <!-- /列表分页器 -->
      <!-- 上传素材对话框 -->
      <el-dialog title="添加素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
        <el-upload class="upload_image_dialog"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          drag
          multiple
          :show-file-list="false"
          :on-success="onUploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
      <!-- /上传素材对话框 -->
    </el-card>
  </div>
</template>

<script>
// 引入接口
import { getImages, collectImage, deleteImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 全部/收藏单选框选中状态, 默认为false, 即全部
      result: {}, // 用于保存响应结果
      images: [], // 用于保存获取的素材列表
      dialogUploadVisible: false, // 添加素材对话框的可见性, 默认为false
      uploadHeaders: { // 添加素材的请求头
        Authorization: `Bearer ${user.token}`
      },
      currentPage: 1, // 当前页码数据, 默认为1
      totalCount: 0 // 素材总数, 默认为1
    }
  },
  methods: {
    /**
     * 加载素材列表
     */
    loadImages (currentPage) {
      getImages({
        collect: this.collect,
        page: currentPage
      }).then((res) => {
        // 将响应结果中的数据保存在result中
        this.result = res.data.data
        this.totalCount = this.result.total_count
        this.images = this.result.results
        // image对象没有loading数据, 手动添加
        this.images.forEach(image => {
          image.loading = false
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 添加素材成功时的事件处理
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(1, false)
    },
    // 监听页码改变时的事件处理
    onCurrentChange (page) {
      this.currentPage = page
      this.loadImages(page)
    },
    // 点击收藏素材按钮时的监听事件处理
    onCollect (image) {
      // 开启loading
      image.loading = true
      collectImage(image.id, !image.is_collected).then((res) => {
        // 提示用户操作成功
        this.$message({
          type: 'success',
          message: `${image.is_collected ? '取消收藏' : '收藏'}成功`
        })
        // 重新加载素材列表
        this.loadImages(this.currentPage)
        // 关闭loading
        image.loading = false
      })
    },
    // 点击删除素材按钮时的监听事件处理
    onDelete (image) {
      // 开启loading
      image.loading = true
      deleteImage(image.id).then((res) => {
        // 删除成功, 提示用户
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 重新加载素材列表
        this.loadImages(this.currentPage)
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'danger',
          message: '删除失败'
        })
      })
    }
  },
  // 页面渲染完成后再进行网络请求, 获取响应数据
  mounted () {
    this.loadImages(1)
  }
}
</script>

<style scoped lang="less">
  .header_buttons {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .image_item {
    position: relative;
    .image_operation {
      height: 40px;
      background-color: rgba(128, 128, 128, 0.4);
      position: absolute;
      bottom: 4px;
      left: 5px;
      right: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
</style>
