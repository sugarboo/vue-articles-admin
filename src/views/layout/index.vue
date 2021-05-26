<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="auto">
        <app-aside :isCollapse="isCollapse"></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header v-on:listenToIsCollapse="isCollapseHandler"></app-header>
        </el-header>
        <el-main class="main">
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
  },
  data () {
    return {
      isCollapse: false // 侧边栏的折叠状态, 默认为false, 即展开侧边栏
    }
  },
  methods: {
    /**
     * 接收并处理子组件header传过来的isCollapse值, 并通过赋值给data的isCollapse变量将其传递给子组件aside
     */
    isCollapseHandler (isCollapse) {
      this.isCollapse = isCollapse
    }
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
  }

  .main {
    background-color: #e9eef3;
  }
</style>
