<template>
  <div class="aside_container">
    <el-menu
      class="nav_menu"
      default-active="/"
      background-color="#37474f"
      text-color="#ffffff"
      active-text-color="#64ffda"
      :collapse="isCollapse"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-s-order"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-upload"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-user-solid"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-s-tools"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  props: [
    'isCollapse' // 是否折叠侧边栏, 从父组件layout接收
  ]
}
</script>

<style scoped lang="less">
  .nav_menu {
    display: flex;
    flex-direction: column;
    .iconfont {
      margin-right: 10px;
      padding-left: 5px;
  }
  }
</style>
