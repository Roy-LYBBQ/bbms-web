<script>
import myStore from '@/store/myStore'
import {
  accountUpdate,
  accountGetById,
  accountGetCombo,
  accountCancelCombo,
  accountOrderList
} from '@/api/myApi/account'
import { Message } from 'element-ui'
import { uploadFile } from '@/api/myApi/file'
import myRouter from '@/router/myRouter'
import { workerGetById, workerUpdate } from '@/api/myApi/woker'

export default {
  name: 'userPage',
  methods: {
    init() {
      this.dialogForm.accountId = myStore.getters.account.getter.getId()
      this.dialogForm.businessPeopleId = myStore.getters.worker.getter.getId()
      this.dialogForm.phoneNumber = this.user.phoneNumber
      this.dialogForm.phonenumber = this.user.phonenumber
      this.dialogForm.longitude = this.user.longitude
      this.dialogForm.latitude = this.user.latitude
      this.dialogForm.userName = this.user.userName
      this.dialogForm.amount = this.user.amount
      this.dialogForm.email = this.user.email
      this.dialogForm.sex = this.user.sex
    },
    showDialog() {
      this.dialogFormVisible = true
      this.init()
    },
    showAddDialog() {
      this.addFormVisible = true
      this.addForm.add = 0
    },
    clickUpdate(data) {
      this.$refs.dialogForm.validate(res => {
        if (res) {
          this.updateInfo(data)
        }
      })
    },
    updateInfo(data) {
      this.dialogFormVisible = false
      // account
      if (myStore.getters.hasAccount()) {
        accountUpdate(data).then(res => {
          Message.success('修改成功')
          // 重新请求用户信息
          return accountGetById(myStore.getters.account.getter.getId())
        }).then(res => {
          myStore.getters.account.mutations.setUser(res.data)
          this.user = res.data
          return this.getCombo()
        }).catch(err => {
          Message.error(err.message || '操作失败')
        })
        // worker
      } else if (myStore.getters.hasWorker()) {
        workerUpdate(data).then(res => {
          Message.success('修改成功')
          // 重新请求用户信息
          return workerGetById(myStore.getters.worker.getter.getId())
        }).then(res => {
          myStore.getters.worker.mutations.setUser(res.data)
          this.user = res.data
          console.log('order')
          // return this.getOrder()
        }).catch(err => {
          Message.error(err.message || '操作失败')
        })
      }
    },
    getCombo(flag) {
      return accountGetCombo().then(res => {
        this.comboList = res.data
        if (flag) {
          if (this.comboList.status === '3') {
            let endTime = res.data.endTime.substring(0, 10)
            Message.success('套餐截止时间：' + endTime)
          }
        }
      })
    },
    getOrder() {
      return accountOrderList(this.orderSearchList).then(res => {
        this.orderList.rows = res.rows
        this.orderList.total = res.total
        console.log(res.rows)
      })
    },
    delCombo() {
      accountCancelCombo().then(res => {
        Message.success('取消订阅成功')
        // 重新请求用户信息
        return accountGetById(myStore.getters.account.getter.getId())
      }).then(res => {
        myStore.getters.account.mutations.setUser(res.data)
        this.user = res.data
        return this.getCombo(true)
      }).then(res => {
      })
    },
    addAmount(add) {
      this.$refs.addForm.validate(res => {
        if (res) {
          const data = {
            accountId: myStore.getters.account.getter.getId(),
            amount: (this.user.amount + add)
          }
          this.addForm.add = 0
          this.updateInfo(data)
          this.addFormVisible = false
        }
      })
    },
    // 处理文件上传
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadAvatar(file)
      }
    },
    uploadAvatar(file) {
      uploadFile(file).then(res => {
        console.log(res.data.url)
        return this.updateUserAvatar(res.data.url)
      }).then(res => {
        // 更新用户信息
        if (myStore.getters.hasAccount()) {
          accountGetById(myStore.getters.account.getter.getId()).then(res => {
            myStore.getters.account.mutations.setUser(res.data)
            this.user = res.data
            console.log(res.data)
          })
          // worker
        } else if (myStore.getters.hasWorker()) {
          workerGetById(myStore.getters.worker.getter.getId()).then(res => {
            myStore.getters.worker.mutations.setUser(res.data)
            this.user = res.data
          })
        }
      }).catch(err => {
        this.$message.error('上传失败')
        console.log(err)
      })
    },
    updateUserAvatar(newAvatarUrl) {
      // 调用更新用户头像的 API
      if (myStore.getters.hasAccount()) {
        accountUpdate({ accountId: myStore.getters.account.getter.getId(), avatar: newAvatarUrl }).then(() => {
          this.$message.success('头像更新成功')
        }).catch(err => {
          this.$message.error('更新头像失败')
          console.error(err)
        })
      } else if (myStore.getters.hasWorker()) {
        workerUpdate({ businessPeopleId: myStore.getters.worker.getter.getId(), avatar: newAvatarUrl }).then(() => {
          this.$message.success('头像更新成功')
        }).catch(err => {
          this.$message.error('更新头像失败')
          console.error(err)
        })
      }
    },
    logout() {
      // 清除登录态
      myStore.getters.account.getter.clear()
      myStore.getters.worker.getter.clear()
      myRouter.push('/')
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
      addFormVisible: false,
      addForm: { add: 0 },
      addFormRules: {
        add: [
          { type: 'number', required: true, message: '请填写数字', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value < 0) {
                callback(new Error('不能为负数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      dialogForm: {
        accountId: '',
        businessPeopleId: '',
        amount: 0,
        userName: '',
        phoneNumber: '',//account
        phonenumber: '',//worker
        longitude: 0,
        latitude: 0,
        email: '',
        sex: ''
      },
      dialogFormRules: {
        phonenumber: [
          {
            validator: (rule, value, callback) => {
              const phoneRegex = /^1[3-9]\d{9}$/ // 示例：中国大陆手机号格式
              if (value) {
                if (!phoneRegex.test(value)) {
                  callback(new Error('请输入合法的手机号'))
                } else {
                  callback()
                }
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
              if (value) {
                if (!emailRegex.test(value)) {
                  callback(new Error('请输入合法的邮箱地址'))
                } else {
                  callback()
                }
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        longitude: [
          { type: 'number', required: true, message: '请填写数字', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value < 0 || value > 180) {
                callback(new Error('经度范围：0-180'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        latitude: [
          { type: 'number', required: true, message: '请填写数字', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value < 0 || value > 90) {
                callback(new Error('纬度范围0-90'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
      },
      comboList: {
        comboId: '',
        comboName: '',
        unit: '',
        value: '',
        price: '',
        bandwidth: '',
        status: 0
      },
      orderSearchList: {
        pageSize: 3,
        pageNum: 1
      },
      orderList:{
        total: 0,
        rows: []
      }
    }
  },
  created() {
    this.user = myStore.getters.hasAccount() ?
      myStore.getters.account.getter.getUser() :
      myStore.getters.worker.getter.getUser()
    this.init()
    if (myStore.getters.hasAccount()) {
      this.getCombo()
      this.getOrder()
    }
  }
}
</script>

<template>
  <div id="container">
    <div style="width: 0">
      <!--添加余额-->
      <el-dialog title="添加余额" :visible.sync="addFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="数额" label-width="120px" prop="add">
            <el-input v-model.number="addForm.add" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAmount(addForm.add)">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改信息-->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules">
          <!--account-->
          <el-form-item v-if="myStore.getters.hasAccount()" label="手机号" label-width="120px">
            <el-input disabled v-model="dialogForm.phoneNumber"
                      autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="myStore.getters.hasAccount()" prop="longitude" label="经度" label-width="120px">
            <el-input v-model.number="dialogForm.longitude"
                      autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="myStore.getters.hasAccount()" prop="latitude" label="纬度" label-width="120px">
            <el-input v-model.number="dialogForm.latitude"
                      autocomplete="off"
            ></el-input>
          </el-form-item>
          <!--worker-->
          <el-form-item v-if="myStore.getters.hasWorker()" label="用户名" label-width="120px">
            <el-input disabled v-model="dialogForm.userName"
                      autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="myStore.getters.hasWorker()" label="手机号" prop="phonenumber" label-width="120px">
            <el-input v-model="dialogForm.phonenumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px" prop="email">
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
          <el-button type="primary" @click="clickUpdate(dialogForm)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!--头像+内容区-->
    <div class="left">
      <div class="avatar-box box">
        <div class="avatar">
          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
          <img
            width="90px"
            height="90px"
            :src="user.avatar === '' ? defaultAvatar : user.avatar"
            alt="avatar"
            @click="triggerFileUpload"
            style="cursor: pointer;"
          >
        </div>
        <div class="user-main-info">
          <div class="main-info">
            <h2 v-if="myStore.getters.hasAccount()">{{ user.phoneNumber }}</h2>
            <h2 v-if="myStore.getters.hasWorker()">{{ user.userName }}</h2>
            <p>性别：<i v-if="user.sex === '0'" class="el-icon-male"></i><i v-if="user.sex === '1'"
                                                                           class="el-icon-female"
            ></i></p>
            <p>加入日期：{{ user.createTime === null ? defaultInfo : user.createTime }}</p>
          </div>
          <!--修改个人信息-->
          <div class="setting">
            <el-button type="primary" plain @click="showDialog">修改信息</el-button>
            <el-button v-if="myStore.getters.hasAccount()" type="info" plain @click="showAddDialog">添加余额</el-button>
            <el-button type="success" plain @click="logout">登出</el-button>
          </div>
        </div>
      </div>
      <div class="main-box">
        <div v-if="myStore.getters.hasAccount()" class="combo box">
          <div class="my-combo">我的套餐</div>
          <div class="combo-name">{{ comboList.comboName }}
            <el-button v-if="comboList.status === '0'" type="warning" size="mini" plain @click="delCombo">取消订阅</el-button>
            <el-tag v-if="comboList.status === '1'" type="primary" size="mini" plain>已订阅</el-tag>
            <el-tag v-if="comboList.status === '2'" type="danger" size="mini" plain>已欠费</el-tag>
            <el-tag v-if="comboList.status === '3'" type="info" size="mini" plain>已取消订阅</el-tag>
          </div>
          <div class="combo-info">
            <div class="info">期限：{{ comboList.value }} {{ comboList.unit === 0 ? '月' : '年' }}</div>
            <div class="info">带宽：{{ comboList.bandwidth}}</div>
            <div class="info">价格：{{ comboList.price }} / {{ comboList.unit === 0 ? '月' : '年' }}</div>
          </div>
        </div>
        <div v-if="myStore.getters.hasAccount()" class="combo box">
          <div class="my-combo">我的订单</div>
          <div class="item" v-for="item in orderList.rows">
            <div class="combo-name">订单名：{{ item.workOrderName }}
              <el-tag v-if="item.state === 0" type="warning" size="mini" plain>未完成</el-tag>
              <el-tag v-if="item.state === 1" type="success" size="mini" plain>已完成</el-tag>
            </div>
            <div class="combo-info">
              <div class="info">服务名：{{ item.serviceName }}</div>
              <div class="info">负责人员工号：{{ item.businessPeopleId }}</div>
            </div>
          </div>
          <div style="padding: 5px">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="orderSearchList.pageSize"
              :total="orderList.total"
              :current-page="orderSearchList.pageNum"
              @current-change="getOrder"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--个人信息-->
    <div class="right">
      <div class="info-box box">
        <div id="title">个人信息</div>
        <p class="p">邮箱：{{ user.email === '' ? defaultInfo : user.email }}</p>
        <p v-if="myStore.getters.hasWorker()" class="p">
          电话：{{ user.phonenumber === '' ? defaultInfo : user.phonenumber }}</p>
        <p v-if="myStore.getters.hasAccount()" class="p">
          电话：{{ user.phoneNumber === '' ? defaultInfo : user.phoneNumber }}</p>
        <p v-if="myStore.getters.hasAccount()" class="p">余额（￥）：{{ user.amount }}</p>
        <p v-if="myStore.getters.hasAccount()" class="p">经度：{{
            user.longitude === null ? defaultInfo : user.longitude
          }}</p>
        <p v-if="myStore.getters.hasAccount()" class="p">纬度：{{
            user.latitude === null ? defaultInfo : user.latitude
          }}</p>
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
        border: 1px dotted #ccc;
        box-sizing: border-box;
        transition: all 0.7s ease;

        &:hover {
          transform: rotate(360deg) scale(1.1);
        }
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
        .my-combo {
          padding: 10px;
          color: black;
          font-weight: bold;
          font-size: 20px;
          border-bottom: 1px solid $border-line;
        }

        .item {
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
