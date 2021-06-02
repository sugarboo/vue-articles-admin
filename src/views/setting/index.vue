<template>
  <div class="setting_container">
    <el-card class="box_card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
        <!-- 个人设置表单 -->
      <el-form ref="form" :model="user" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-form-item label="用户昵称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存修改</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item @click.native="dialogVisible=true">
              <img :src="user.photo" class="avatar">
              <p>点击修改头像</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-dialog
          title="修改头像"
          append-to-body
          :visible.sync="dialogVisible"
          @opened="onDialogOpened"
        >
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :on-change="onUploadChange"
            :auto-upload="false"
            :http-request="onUpload"
          >
            <div class="preview_image_wrap">
              <img
                class="avatar"
                :src="previewImage"
                ref="previewImage"
                v-if="previewImage"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
        <!-- /个人设置表单 -->
    </el-card>
  </div>
</template>

<script>
// 引入接口
import { getUserProfile, updateUserProfile, updateUserPhoto } from '@/api/user'
// 引入global-bus
import globalBus from '@/utils/global-bus'
// 引入cropperjs
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'SettingIndex',
  data () {
    return {
      // 保存用户信息, 初始化
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      dialogVisible: false, // 修改头像对话框的弹出状态, 默认为false, 即不弹出
      previewImage: '', // 上传头像的预览
      cropper: null
    }
  },
  methods: {
    // 调用接口, 加载用户信息
    async loadUserProfile () {
      const res = await getUserProfile()
      // 将响应结果保存到user中
      this.user = res.data.data
      this.previewImage = res.data.data.photo
    },

    // 点击保存修改按钮的监听事件处理
    async onSubmit () {
      // user对象解构
      const { name, email, photo } = this.user
      try {
        await updateUserProfile(name, email, photo)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // 使用global-bus更新header数据
        globalBus.$emit('updatedUserProfile', this.user.name, this.user.photo)
      } catch (err) {
        console.log(err)
        this.$message({
          type: 'danger',
          message: '修改失败'
        })
      }
    },
    onUploadChange (file) {
      if (file.raw.type !== 'image/jpeg' && file.raw.type !== 'image/png') {
        this.$message.error('上传文件必须为.jpg或.png格式')
        return
      }
      this.previewImage = window.URL.createObjectURL(file.raw)
    },
    // 自定义el-upload的上传请求方法
    async onUpload (params) {
      const formData = new FormData()
      formData.append('photo', params.file)
      try {
        // 调用updateUserPhoto接口, 执行修改头像操作
        const res = await updateUserPhoto(formData)
        // 更新图片地址
        this.user.photo = res.data.data.photo
        // 关闭对话框
        this.dialogVisible = false
        // 上传成功, 提示用户
        this.$message.success('上传成功')
        // 使用global-bus更新header数据
        globalBus.$emit('updatedUserProfile', this.user.name, this.user.photo)
      } catch (err) {
        console.log(err)
        // 上传失败, 提示用户
        this.$message.error('上传失败')
      }
    },
    // 确定上传按钮的点击事件监听
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 修改头像对话框弹出完毕后的事件监听
    onDialogOpened () {
      const previewImage = this.$refs.previewImage
      console.log(previewImage)
      this.cropper = new Cropper(previewImage, {
        aspectRatio: 1 / 1,
        crop (event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        }
      })
    }
  },
  // 当页面渲染完成后, 发送网络请求, 获取数据
  mounted () {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    display: block;
    max-width: 100%;
    height: 200px;
  }
</style>
