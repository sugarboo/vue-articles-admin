<template>
  <div class="publish_container">
    <el-card class="box_card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="article" :rules="formRules" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap class="richtext_tiptap" v-model="article.content" :extensions="extensions"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <upload-cover
              v-for="cover in article.cover.type"
              :key="cover"
            >
            </upload-cover>
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(channel, index) in articleChannels"
              :key="index"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入接口
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
// 引入子组件uploadCover
import UploadCover from './components/uploadCover'
// 引入富文本编辑器Element-tiptap
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    'upload-cover': UploadCover
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型, -1: 自动, 0: 无图, 1: 1张, 3: 三张, 默认为0, 即无图
          images: [] // 封面图片的地址
        },
        channel_id: null // 当前选中的频道id, 默认为null
      },
      articleChannels: [], // 文章频道
      extensions: [ // Element-tiptap富文本编辑器配置
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest (file) {
            const formData = new FormData()
            formData.append('image', file)
            return uploadImage(formData).then((res) => {
              return res.data.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ],
      formRules: { // 表单验证规则
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '标题长度应为5到30个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取所有文章频道
     */
    async loadChannels () {
      const res = await getArticleChannels()
      // 将响应结果存储在articleChannels中
      this.articleChannels = res.data.data.channels
    },

    /**
     * 获取指定文章
     */
    async loadArticle () {
      const articleId = this.$route.query.id
      if (articleId) {
        const res = await getArticle(articleId)
        // 请求成功响应, 将响应结果渲染到页面中
        this.article = res.data.data
      }
    },

    /**
     * 发布文章
     */
    async onPublish (draft) {
      // 如果是修改文章, 则执行修改操作, 否则执行添加操作
      const articleId = this.$route.query.id
      if (articleId) {
        // 请求参数中存在articleId, 执行修改操作
        try {
          const res = await updateArticle(articleId, this.article, draft)
          console.log(res)
          this.$message({
            // 请求成功响应, 发布成功, 提示用户
            type: 'success',
            message: `${draft ? '存入草稿' : '编辑'}成功`
          })
          // 跳转回内容管理页面
          this.$router.push('/article')
        } catch (err) {
          console.log(err)
          this.$message({
            type: 'error',
            message: `${draft ? '存入草稿' : '编辑'}失败`
          })
        }
      } else {
        // 请求参数中不存在articleId, 执行发布操作
        try {
          const res = addArticle(this.article, draft)
          console.log(res)
          this.$message({
            // 请求成功响应, 发布成功, 提示用户
            type: 'success',
            message: `${draft ? '存入草稿' : '发布'}成功`
          })
        } catch (err) {
          console.log(err)
          // 请求响应失败, 发布失败, 提示用户
          this.$message({
            type: 'error',
            message: `${draft ? '存入草稿' : '发布'}失败`
          })
        }
      }
    }
  },

  // 页面渲染完毕后, 开始调用响应方法, 进行网络请求
  mounted () {
    // 加载所有文章频道
    this.loadChannels()

    // 加载指定文章
    const articleId = this.$route.query.id
    if (articleId) {
      this.loadArticle()
    }
  }
}
</script>

<style scoped lang="less">
  .el-tiptap-editor {
    height: 400px;
  }
</style>
