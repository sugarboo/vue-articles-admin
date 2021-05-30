<template>
  <div class="article_container">
    <el-card class="filter_card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item to="/article">内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              label="全部"
              :value="null"
            ></el-option>
            <el-option
              v-for="(channel, index) in articleChannels"
              :key="index"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box_card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{ totalCount }}条结果:
      </div>
      <!-- 数据列表 -->
      <el-table
        class="list_table"
        :data="articlesData"
        v-loading="loading"
        stripe
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="cover" label="封面">
          <template slot-scope="scope">
            <el-image class="article_cover" :src="scope.row.cover.images[0]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="mini"
              circle
              type="primary"
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
            >
            </el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              circle
              type="danger"
              @click="onDeleteArticle(scope.row.id)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页器 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="currentPage"
        @current-change="onCurrentChange"
      >
      </el-pagination>
      <!-- /列表分页器 -->
    </el-card>
  </div>
</template>

<script>
// 引入article接口
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {

      },
      totalCount: 0, // 总数据条数
      currentPage: 1, // 当前页码数据, 默认为1
      pageSize: 10, // 每页大小
      status: null, // 查询文章的状态, null表示全部
      articlesData: [], // 存储查询到的文章数据
      articleStatus: [
        // 优化文章状态处理
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      articleChannels: [], // 文章频道列表, 默认为空
      channelId: null, // 文章频道id, 默认为空
      rangeDate: [], // 筛选的日期范围, 默认为空
      loading: false // 是否加载中, 默认为否
    }
  },
  methods: {
    /**
     * 调用article接口发送请求, 加载文章列表, 默认加载第一页
     */
    loadArticles () {
      // 发送请求之前, 开启加载中
      this.loading = true
      getArticles({
        page: this.currentPage,
        page_size: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then((res) => {
        // 将响应的文章内容数据赋值给articlesData
        this.articlesData = res.data.data.results

        // 将响应结果中查询到的文章总数赋值给totalCount
        this.totalCount = res.data.data.total_count

        // 请求成功响应, 关闭加载中
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },

    /**
     * 调用article接口发送请求, 加载频道列表
     */
    loadChannels () {
      getArticleChannels().then((res) => {
        // 将响应结果中查询到的频道列表赋值给channels
        this.articleChannels = res.data.data.channels
      }).catch((err) => {
        console.log(err)
      })
    },

    /**
     * 分页器页码改变时的监听事件处理
     */
    onCurrentChange (page) {
      // 根据页码改变后的当前页码, 重新加载当前页码的文章列表数据
      this.loadArticles(page)
    },

    /**
     * 点击删除文章按钮的监听事件处理
     */
    onDeleteArticle (articleId) {
      this.$confirm('确认删除此文章吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then((res) => {
          // 删除文章操作成功, 提示用户
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 更新当前页文章列表
          this.loadArticles(this.currentPage)
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          // 取消删除, 提示用户
          type: 'info',
          message: '已取消删除.'
        })
      })
    }
  },

  mounted () {
    // 页面渲染完成后, 加载文章列表, 默认加载第一页
    this.loadArticles()

    // 页面渲染完成后, 加载频道列表
    this.loadChannels()
  }
}
</script>

<style scoped lang="less">
  .filter_card {
    margin-bottom: 30px;
  }

  .list_table {
    margin-bottom: 20px;
    .article_cover {
      width: 60px;
      background-size: cover;
    }
  }
</style>
