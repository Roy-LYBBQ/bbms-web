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
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                   @click.native.prevent="login"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
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
import { accountLogin } from '@/api/myApi/account'
import { setExpiresIn, setToken } from '@/utils/auth'
import data from '@/views/system/dict/data.vue'
import account from '@/store/modules/account'
import myStore from '@/store/myStore'
import { Message } from 'element-ui'

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
      loading: false
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
          { required: true, trigger: 'blur', message: '请输入您的手机号' }
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
              console.log(res.data)
              Message.success('登录成功')
              myStore.getters.account.mutations.setToken(res.data.access_token)
              console.log(myStore.getters.account.getter.getToken())
            })
          }
        }
      })
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
