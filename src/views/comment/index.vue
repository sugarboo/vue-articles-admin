<template>
  <div class="comment_container">
    <el-card class="box_card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-table :data="articles" stripe style="width: 100%; margin-bottom: 20px;">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数据">
        </el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            <!-- 开关组件绑定的是一个布尔值, 它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisabled"
              @change="onStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getComments, changeCommentStatus } from '@/api/comment'
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [], // 文章列表
      currentPage: 1, // 当前页码, 默认值为1
      totalCount: 0, // 查询到的数据总条数, 默认为0
      pageSize: 10 // 每页显示的数据条数, 默认为10
    }
  },
  methods: {
    // 加载评论列表
    loadComments (page, pageSize) {
      getComments(page, pageSize).then((res) => {
        // console.log(res)
        // 将查询到的当前页码赋值给currentPage, 实现分页组件的页码高亮改变
        this.currentPage = page
        // 将响应结果保存到results中
        const { results } = res.data.data
        results.forEach(data => {
          data.statusDisabled = false
        })
        // 将results保存到articles中
        this.articles = results
        this.totalCount = res.data.data.total_count
      }).catch((err) => {
        console.log(err)
      })
    },
    // switch按钮状态改变时的点击事件监听
    onStatusChange (article) {
      // 开启loading
      article.statusDisabled = true
      changeCommentStatus(article.id, article.comment_status).then((res) => {
        // 响应成功, 关闭loading
        article.statusDisabled = false
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 每页显示数据条数改变时的事件监听
    handleSizeChange (size) {
      this.pageSize = size
      this.loadComments(1, size) // 当pageSize变化时, 加载第一页数据
    },
    // 当前页面改变时的时间监听
    handleCurrentChange (page) {
      this.currentPage = page
      this.loadComments(page, this.pageSize)
    }
  },

  // 当页面渲染完成后, 发起网络请求, 加载数据
  mounted () {
    // 加载第一页数据
    this.loadComments(1)
  }
}
</script>

<style scoped lang="less">

</style>
