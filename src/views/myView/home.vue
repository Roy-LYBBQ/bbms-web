<script>
import { accountGetById, accountGetInfo } from '@/api/myApi/account'
import myStore from '@/store/myStore'
import myRouter from '@/router/myRouter'
import { workerGetById } from '@/api/myApi/woker'

export default {
  name: 'home',
  computed: {
    myStore() {
      return myStore
    }
  },
  data() {
    return {
      active: 'active',
      userInfo: {},
      userId: '',
      defaultAvatar: require('@/assets/images/defaultAvatar.png'), // 使用 require 引入默认头像
      activeIndex: 1 // 用于跟踪当前活动的 li
    }
  },
  methods: {
    handleClick(event) {
      this.cleanActive()
      // 给当前点击的元素添加 'active' 类
      event.target.classList.add('active')
    },
    cleanActive() {
      // 清除所有li元素的 'active' 类
      const children = document.getElementsByClassName('li')
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('active')
      }
    },
    getUserInfo() {
      if (myStore.getters.hasAccount()) {
        accountGetById(myStore.getters.account.getter.getId()).then(res => {
          if (res.data) {
            myStore.getters.account.mutations.setUser(res.data)
            this.userInfo = res.data
          }
        })
      } else if (myStore.getters.hasWorker()) {
        workerGetById(myStore.getters.worker.getter.getId()).then(res => {
          if (res.data) {
            myStore.getters.worker.mutations.setUser(res.data)
            this.userInfo = res.data
          }
        })
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/user') {
      this.cleanActive()
      this.getUserInfo()
    }
    next()
  }
}
</script>

<template>
  <div id="container">
    <div class="top-nav">
      <div class="top-left">
        <div class="top-log"><img height="40px" src="@/assets/logo/logo-dark.png" alt="logo"></div>
        <div class="nav">
          <ul id="nav-ul">
            <router-link v-if="myStore.getters.hasAccount()" to="/combo">
              <li :class="active" class="li" @click="handleClick">套餐</li>
            </router-link>
            <router-link v-if="myStore.getters.hasAccount()" to="/service">
              <li class="li" @click="handleClick">服务</li>
            </router-link>
            <router-link v-if="myStore.getters.hasWorker()" to="/order">
              <li class="li" @click="handleClick">订单</li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="top-right">
        <div class="user-info">
          <div class="avatar">
            <router-link to="/user">
              <img v-if="myStore.getters.hasAccount()" width="40px" height="40px"
                   :src="myStore.getters.account.getter.getUser().avatar === '' ? defaultAvatar : myStore.getters.account.getter.getUser().avatar" alt="ava"
              >
              <img v-if="myStore.getters.hasWorker()" width="40px" height="40px"
                   :src="myStore.getters.worker.getter.getUser().avatar === '' ? defaultAvatar : myStore.getters.worker.getter.getUser().avatar" alt="ava"
              >
            </router-link>
          </div>
          <div>欢迎您，</div>
          <router-link to="user">
            <div v-if="userInfo.userName" class="nickName">
              {{ userInfo.userName }}
            </div>
            <div v-if="userInfo.phoneNumber" class="nickName">
              {{ userInfo.phoneNumber }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
$main-blue: #397FFD;
$font-color: #525767;

#container {
  min-height: 100vh;
  color: $font-color;

  .top-nav {
    background-color: white;
    height: 60px;
    margin: 0 45px;
    display: flex;
    justify-content: space-between;

    .top-left {
      display: flex;
      align-items: center;
      height: inherit;

      .top-log {
        padding: 10px 0;
      }

      .nav {
        height: inherit;

        ul {
          height: inherit;
          margin: 0;
          display: flex;
          gap: 10px;
          list-style: none;
          text-align: center;

          li {
            height: 100%;
            font-size: 16px;
            line-height: 60px;
            margin: 0 10px;
            color: $font-color;

            &:hover {
              border-bottom: 2px solid $main-blue;
              cursor: pointer;
            }
          }

          .active {
            color: $main-blue;
          }
        }
      }
    }

    .top-right {
      height: inherit;

      .user-info {
        display: flex;
        height: inherit;
        align-items: center;

        .avatar {
          margin: 0 10px;
          width: 40px;
          height: 40px;

          img {
            border-radius: 50px;
            border: 1px solid $main-blue;
            transition: all 0.3s ease;

            &:hover {
              cursor: pointer;
              border: 2px dotted $main-blue;
            }
          }
        }

        .nickName {
          color: $main-blue;

          &:hover {
            cursor: pointer;
            border-bottom: 1px solid $main-blue;
          }
        }
      }
    }
  }

  .content {
    min-height: calc(100vh - 60px);
    background-color: #F2F3F5;
    padding: 30px 15%;

    .side-nav {

    }
  }
}
</style>
