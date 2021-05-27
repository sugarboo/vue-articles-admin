/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个axios实例, 通过这个实例去发请求, 把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 最新接口地址

  // 处理后端返回的原始数据
  transformResponse: [function (data) {
    try {
      // 如果转换成功, 直接返回转换结果
      return JSONbig.parse(data)
    } catch (error) {
      // 当后端返回的数据不是JSON字符串时, JSONbig.parse会报错, 所以当转换失败时, 把原始数据返回给后端
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求都会经过拦截器, config是当前请求相关的配置对象, 可以修改
  function (config) {
    // 从localStorage中获取登录用户信息
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登录用户信息, 则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}` // ES6语法, 拼接
    }

    // 可在允许请求发出之前定制统一业务功能处理

    // 执行return config后, 才可以发送请求
    return config
  },

  // 请求失败时
  function (err) {
    return Promise.reject(err)
  }
)

// 响应拦截器

// 导出请求方法

export default request
