<template>
  <div class="header_container">
    <div class="title_wrap">
    <i :class="{
      'el-icon-s-fold': isCollapse,
      'el-icon-s-unfold': !isCollapse,
    }" @click="onCollapse"></i>
    <span>文章发布管理系统</span>
    </div>
    <el-dropdown>
        <div class="avatar_wrap">
          <span>{{ user.name }}</span>
          <img class="avatar" :src="user.photo" alt="">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push('/setting')">设置</el-dropdown-item>
        <el-dropdown-item @click.native="onLogOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 引入user接口中的getUserProfile
import { getUserProfile } from '@/api/user'
// 引入global-bus
import globalBus from '@/utils/global-bus'

export default {
  name: 'AppHeader',
  data () {
    return {
      user: {
        name: '',
        photo: ''
      },
      isCollapse: false // 侧边栏折叠状态, 默认为false, 即展开侧边栏
    }
  },
  methods: {
    async loadUserProfile () {
      const res = await getUserProfile()
      this.user = res.data.data
    },
    /**
     * 点击折叠侧边栏图标时, 切换图标以及侧边栏折叠状态
     */
    onCollapse () {
      // 使用globalBus将点击侧边栏事件传递给aside组件
      globalBus.$emit('changeCollapse')
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
    this.loadUserProfile()
    // global-bus事件监听
    globalBus.$on('updatedUserProfile', (name, photo) => {
      // 用户已在个人设置页面中更新用户信息, header中数据须同步更新
      this.user.name = name
      this.user.photo = photo
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
    .router-link, .router-link-exact-active, .router-link-active {
      text-decoration: none;
    }
  }
</style>
