<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">宽带业务管理系统</h3>
      <el-form-item prop="phoneNumber">
        <el-input v-model="loginForm.phoneNumber" type="text" auto-complete="off" placeholder="手机号">
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon"/>
          <el-button :disabled="isButtonDisabled" :msg="msg" slot="append" @click="sendCode">{{ msg }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" type="code" auto-complete="off" placeholder="验证码">
          <svg-icon slot="prefix" icon-class="code" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button size="medium" type="primary" style="width:100%;"
                   @click.native.prevent="register"
        >
          <span>注 册</span>
        </el-button>
        <div style="display: flex; justify-content: right; gap: 20px">
          <a class="link-type" @click="changeRouter">管理端登录</a>
          <router-link class="link-type" :to="'/'">返回登录</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Form Northwestern Polytechnical University *2024 🏳️‍🌈 ²⁰²⁴/₀₈.₂₇ᵕ̈.</span>
    </div>
  </div>
</template>

<script>

import { changeRouter } from '@/main'
import { accountRegister, sendCode } from '@/api/myApi/account'
import { Message } from 'element-ui'
import myRouter from '@/router/myRouter'

export default {
  name: 'myRegister',
  data() {
    return {
      loginForm: {},
      loginRuleList: {},
      // 校验
      loginRules: {},
      msg: '',
      countdown: 0,  // 添加倒计时的秒数
      timer: null,    // 用于存储定时器引用
      isButtonDisabled: false
    }
  },
  watch: {},
  created() {
    this.loginForm = {
      phoneNumber: '',
      password: '',
      code: ''
    }
    this.loginRuleList = {
      account: {
        phoneNumber: [
          { required: true, trigger: 'blur', message: '请输入您的手机号' },
          {
            validator: (rule, value, callback) => {
              const phoneRegex = /^1[3-9]\d{9}$/ // 示例：中国大陆手机号格式
              if (!value) {
                callback(new Error('请输入您的手机号'))
              } else if (!phoneRegex.test(value)) {
                callback(new Error('请输入合法的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' },
          {
            min: 4,
            max: 20,
            message: '密码长度必须在4到20个字符之间',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      phone: {
        phoneNumber: [
          { required: true, trigger: 'blur', message: '请输入您的手机号' },
          {
            validator: (rule, value, callback) => {
              const phoneRegex = /^1[3-9]\d{9}$/ // 示例：中国大陆手机号格式
              if (!value) {
                callback(new Error('请输入您的手机号'))
              } else if (!phoneRegex.test(value)) {
                callback(new Error('请输入合法的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: false, trigger: 'blur', message: '请输入您的密码' }
        ],
        code: [
          { required: false, trigger: 'blur', message: '请输入验证码' }
        ]
      }
    }
    this.loginRules = this.loginRuleList.account
    this.msg = '发送验证码'
  },
  methods: {
    changeRouter,
    register() {
      this.loginRules = this.loginRuleList.account
      this.$refs.loginForm.validate(res => {
        alert(res)
        if (res) {
          accountRegister(this.loginForm).then(res => {
            console.log(res.data)
            Message.success('注册成功')
            myRouter.push('/')
          })
        }
      })
    },
    sendCode() {
      this.loginRules = this.loginRuleList.phone
      console.log(this.loginRules)
      this.$refs.loginForm.validate(res => {
        if (res) {
          sendCode(this.loginForm.phoneNumber).then(res => {
            console.log(res.data)
            Message.success('发送成功')
            this.loginRules = this.loginRuleList.account

            // 开始倒计时
            this.countdown = 10  // 设置倒计时为10秒
            this.isButtonDisabled = true
            this.msg = `${this.countdown}秒后再次发送`
            this.timer = setInterval(() => {
              this.countdown--
              this.msg = `${this.countdown}秒后再次发送`

              if (this.countdown <= 0) {
                clearInterval(this.timer)  // 清除定时器
                this.isButtonDisabled = false
                this.msg = '发送验证码'  // 恢复初始值
              }
            }, 1000)
          })
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/images/login_bg.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffffcc;
  width: 400px;
  padding: 25px 25px 5px 25px;
  opacity: 0.8;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 5px 0 #fff;
  }

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
