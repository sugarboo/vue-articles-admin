<template>
  <div class="login_container">
    <!-- el表单组件, 每个表单项都必须使用el-form-item包裹 -->
    <div class="login_form_wrap">
      <el-form class="login_form" ref="login_form" :rules="formRules" :model="user">
        <el-form-item prop='mobile'>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop='agree'>
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login_btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入接口: 部分引入
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        // mobile: '', // 手机号
        // code: '', // 验证码
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意用户协议
      },
      loginLoading: false, // 是否登录加载中的状态
      formRules: { // 表单验证规则配置
        // 要验证的数据名称, 规则列表
        mobile: [
          { require: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        code: [
          { require: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则: 验证通过: callback(); 验证失败: callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 点击登录按钮时的用户登录事件处理
     */
    onLogin () {
      // 表单验证
      // validate()是异步的
      this.$refs.login_form.validate(valid => {
        // 如果表单验证失败, 停止请求提交
        if (!valid) {
          return
        }
        // 验证通过, 请求登录
        this.login()
      })
    },

    /**
     * 封装用户登录请求
     */
    login () {
      // 开启登录中 loading...
      this.loginLoading = true

      // 获取表单数据(根据接口要求绑定数据), 调用login发起请求
      login(this.user).then(res => {
        // 登录成功, 提示用户
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 关闭loading
        this.loginLoading = false

        // 将用户信息存储到localStorage中
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 跳转到首页
        this.$router.push({ name: 'home' })
      }).catch(err => {
        console.log(err)

        // 登录失败, 提示用户
        this.$message({
          message: '登录失败, 手机号或验证码错误',
          type: 'error'
        })
        // 关闭loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login_container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;

    .login_form_wrap {
      min-width: 260px;
      padding: 30px 50px 10px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);

      .login_form {
        .login_btn {
          width: 100%;
        }
      }
    }
  }
</style>
