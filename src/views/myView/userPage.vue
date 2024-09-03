<script>
import myStore from '@/store/myStore'
import { accountUpdate, accountGetById, accountGetCombo } from '@/api/myApi/account'
import { Message } from 'element-ui'
import { changeRouter } from '@/main'

export default {
  name: 'userPage',
  methods: {
    init() {
      this.dialogForm.accountId = myStore.getters.curId
      this.dialogForm.phoneNumber = this.user.phoneNumber
      this.dialogForm.amount = this.user.amount
      this.dialogForm.email = this.user.email
      this.dialogForm.sex = this.user.sex
    },
    showDialog() {
      this.dialogFormVisible = true
      this.init()
    },
    updateInfo() {
      this.dialogFormVisible = false
      accountUpdate(this.dialogForm).then(res => {
        Message.success('修改成功')
      }).catch(err => {
        Message.error(err.massage)
      })
      // 重新请求用户信息
      accountGetById(myStore.getters.curId).then(res => {
        if (myStore.getters.curType === 'account') {
          myStore.getters.account.mutations.setUser(res.data)
          this.user = res.data
        }
        // TODO
      }).catch(err => {
        Message.error(err.massage)
      })
    },
    getCombo() {
      accountGetCombo().then(res => {
        this.comboList = res.data
      })
    },
    logout() {
      // 清除登录态
      myStore.getters.account.getter.clear()
      myStore.getters.worker.getter.clear()
      changeRouter()
      Message.success('登出成功')
    }
  },
  computed: {
    myStore() {
      return myStore
    }
  },
  data() {
    return {
      user: {},
      defaultAvatar: require('@/assets/images/defaultAvatar.png'),
      defaultInfo: '暂无信息',
      dialogFormVisible: false,
      dialogForm: {
        accountId: '',
        amount: 0,
        phoneNumber:'',
        email: '',
        sex: ''
      },
      comboList: {
        comboName: '',
        unit: '',
        value: '',
        price: '',
        bandwidth: ''
      }
    }
  },
  created() {
    this.user = myStore.getters.curUser
    this.init()
    this.getCombo()
  }
}
</script>

<template>
  <div id="container">
    <div style="width: 0">
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <!--<el-form-item label="余额" label-width="120px">-->
          <!--  <el-input v-model="dialogForm.amount" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="手机号" label-width="120px">
            <el-input :disabled="myStore.getters.curType === 'account'" v-model="dialogForm.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px">
            <el-input v-model="dialogForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="120px">
            <el-select v-model="dialogForm.sex" placeholder="请选择性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="left">
      <div class="avatar-box box">
        <div class="avatar">
          <img width="90px" height="90px" :src="user.avatar === '' ? defaultAvatar : user.avatar" alt="avatar">
        </div>
        <div class="user-main-info">
          <div class="main-info">
            <h2 v-if="myStore.getters.curType === 'account'">{{ user.phoneNumber }}</h2>
            <h2 v-if="myStore.getters.curType === 'worker'">{{ user.username }}</h2>
            <p>性别：<i v-if="user.sex === '0'" class="el-icon-male"></i><i v-if="user.sex === '1'" class="el-icon-female"></i></p>
            <p>加入日期：{{ user.createTime === null ? defaultInfo : user.createTime }}</p>
          </div>
          <div class="setting">
            <el-button type="primary" plain @click="showDialog">修改信息</el-button>
            <el-button type="success" plain @click="logout">登出</el-button>
          </div>
        </div>
      </div>
      <div class="main-box">
        <div v-if="myStore.getters.curType === 'account'" class="combo box">
          <div class="my-combo">我的套餐</div>
          <div class="combo-name">{{comboList.comboName}} >></div>
          <div class="combo-info">
            <div class="info">量值：{{comboList.value}}</div>
            <!--<div class="info">带宽：{{comboList.bandwidth}}</div>-->
            <div class="info">价格：{{comboList.price}} / {{ comboList.unit === 0 ? '月' : '年'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="info-box box">
        <div id="title">个人信息</div>
        <p class="p">电话：{{user.phoneNumber}}</p>
        <p class="p">邮箱：{{user.email}}</p>
        <p class="p">余额（￥）：{{user.amount}}</p>
        <p class="p">经度：{{ user.longitude === null ? defaultInfo : user.longitude}}</p>
        <p class="p">纬度：{{ user.latitude === null ? defaultInfo : user.latitude}}</p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
$border-line: #ededed;
$title-color: #31445b;

.box {
  width: 100%;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px #F2F3F5;
  margin-bottom: 20px;
}

#container {
  width: 100%;
  display: flex;
  gap: 20px;
  margin: 0 10%;
  color: black;

  .left {
    width: 60%;
    display: flex;
    flex-direction: column;

    .avatar-box {
      width: 100%;
      padding: 30px;
      display: flex;

      .avatar {
        width: 90px;
        height: 90px;
        margin-right: 20px;
        border-radius: 50px;
        overflow: hidden;
        box-sizing: border-box;
      }

      .user-main-info {
        width: calc(100% - 90px);
        display: flex;
        justify-content: space-between;

        .main-info {
          h2 {
            margin: 0;
            font-weight: bold;
          }

          p {
            color: #4F68AC;
          }
        }
      }
    }

    .main-box {
      .combo {
        .my-combo{
          padding: 10px;
          color: black;
          font-weight: bold;
          font-size: 20px;
          border-bottom: 1px solid $border-line;
        }
        .combo-name {
          padding: 20px 20px 0;
          color: $title-color;
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        .combo-info {
          padding: 0 20px 20px;
          display: flex;
          color: #bbb;

          .info {
            padding: 0 5px;
            border-right: 1px dotted #bbb;

            &:last-of-type {
              border: none;
            }
          }
        }
      }

    }
  }

  .right {
    width: 20%;

    .info-box {

      #title {
        color: #31445b;
        margin: 0 0 10px;
        padding: 20px;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid $border-line;
      }

      .p {
        margin: 0;
        padding: 0 20px 10px;
        font-size: 13px;
      }
    }
  }
}

</style>
