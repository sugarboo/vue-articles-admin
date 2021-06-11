<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="auto">
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header></app-header>
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style scoped lang="less">
  .layout_container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    .el-container {
      height: 100%;
      .el-aside {
        height: 100%;
        width: 100%;
        background-color:#37474f;
      }
      .el-main {
        background-color: #e9eef3;
      }
    }
  }
</style>
