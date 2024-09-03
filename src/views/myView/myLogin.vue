<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">宽带业务管理系统</h3>
      <el-form-item v-if="curType === types.worker" prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item v-if="curType === types.account" prop="phoneNumber">
        <el-input v-model="loginForm.phoneNumber" type="text" auto-complete="off" placeholder="手机号">
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                  @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button size="medium" type="primary" style="width:100%;"
                   @click.native.prevent="login"
        >
          <span >登 录</span>
        </el-button>
        <div style="display: flex; justify-content: right; gap: 20px">
          <a class="link-type" @click="changeRouter">管理端登录</a>
          <a class="link-type" v-if="curType === types.account" @click="curType = types.worker">业务端登录</a>
          <a class="link-type" v-if="curType === types.worker" @click="curType = types.account">用户端登录</a>
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
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
import { accountLogin, accountGetInfo } from '@/api/myApi/account'
import account from '@/store/modules/account'
import myStore from '@/store/myStore'
import { Message } from 'element-ui'
import myRouter from '@/router/myRouter'

export default {
  name: 'myLogin',
  data() {
    return {
      types: {},
      curType: '',
      loginForm: {},
      loginRuleList: {},
      // 校验
      loginRules: '',
    }
  },
  watch: {
    curType(val) {
      if (val === this.types.account) {
        this.loginForm = {
          phoneNumber: '13364444556',
          password: '20030730'
        }
        this.loginRules = this.loginRuleList.account
      } else if (val === this.types.worker) {
        this.loginForm = {
          username: '卢刚',
          password: '20030730'
        }
        this.loginRules = this.loginRuleList.worker
      }
    }
  },
  created() {
    this.types = {
      account: 'account',
      worker: 'worker'
    }
    this.curType = this.types.account
    this.loginForm = {
      phoneNumber: '13364444556',
      password: '20030730'
    }
    this.loginRuleList = {
      account: {
        phoneNumber: [
          { required: true, trigger: 'blur', message: '请输入您的手机号' },
          {
            validator: (rule, value, callback) => {
              const phoneRegex = /^1[3-9]\d{9}$/; // 示例：中国大陆手机号格式
              if (!value) {
                callback(new Error("请输入您的手机号"));
              } else if (!phoneRegex.test(value)) {
                callback(new Error("请输入合法的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ]
      },
      worker: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ]
      }
    }
    this.loginRules = this.loginRuleList.account
  },
  methods: {
    changeRouter,
    login() {
      this.$refs.loginForm.validate(res => {
        if (res) {
          if (this.curType === this.types.account) {
            accountLogin(this.loginForm).then(res => {
              Message.success('登录成功')
              myStore.getters.account.mutations.setToken(res.data.access_token)
              myRouter.push('/home')
            })
          }
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    accountGetInfo().then(res => {
      console.log(res.data)
      if (this.curType === this.types.account) {
        myStore.getters.account.mutations.setId(res.data.userId)
      } else {
        myStore.getters.worker.mutations.setId(res.data.userId)
      }
      next()
    })
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
