<template>
  <div class="header_container">
    <div class="title_wrap">
    <i :class="{
      'el-icon-s-fold': isCollapse,
      'el-icon-s-unfold': !isCollapse,
    }" @click="onCollapse"></i>
    <span>今日头条后台管理系统</span>
    </div>
    <el-dropdown>
        <div class="avatar_wrap">
          <span>{{ username }}</span>
          <img class="avatar" :src="avatarSrc" alt="">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="onLogOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 引入user接口中的getUserProfile
import { getUserProfile } from '@/api/user'

// 引入用户头像图片
const avatarSrc = require('../../../assets/images/avatar2.jpg')

export default {
  name: 'AppHeader',
  data () {
    return {
      username: '', // 用户名
      avatarSrc: avatarSrc, // 用户头像路径
      isCollapse: false // 侧边栏折叠状态, 默认为false, 即展开侧边栏
    }
  },
  methods: {
    /**
     * 点击折叠侧边栏图标时, 切换图标以及侧边栏折叠状态
     */
    onCollapse () {
      this.isCollapse = !this.isCollapse // 取反
      this.$emit('listenToIsCollapse', this.isCollapse) // 向父组件layout传递当前isCollapse的值
    },

    /**
     * 点击退出按钮时的用户退出事件处理
     */
    onLogOut () {
      // 弹出确认消息框
      this.$confirm('确认退出?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

        // 当用户点击确认按钮
      }).then(() => {
        // 清除localStorage中的登录用户信息
        window.localStorage.removeItem('user')

        // 页面跳转至登录页面
        this.$router.push('/login')

        // 成功退出, 提示用户
        this.$message({
          type: 'success',
          message: '您已成功退出!'
        })

        // 当用户点击取消按钮
      }).catch(() => {
        // 取消退出, 提示用户
        this.$message({
          type: 'info',
          message: '您已取消退出.'
        })
      })
    }
  },
  mounted () {
    // 当组件渲染完成时, 发送请求, 获取username
    getUserProfile().then((res) => {
      this.username = res.data.data.name // 从响应中获取用户名, 保存到data的username变量中
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="less">
  .header_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .title_wrap{
      font-size: 20px;
      font-weight: bold;
      i {
        cursor: pointer;
      }
    }
    .avatar_wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
</style>
