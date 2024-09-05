<script>
import { adminAccountAdd, adminAccountDel, adminAccountList, adminAccountUpdate } from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'account',
  data() {
    return {
      name: '用户',
      total: 1,
      accountList: [],
      searchList: {
        phoneNumber: '',
        name: '',
        pageSize: 5,
        pageNum: 1
      },
      addList: { phoneNumber: '', password: '' },
      addVisible: false,
      addRules: {
        phoneNumber: [
          { required: true, trigger: 'blur', message: '请输入用户的手机号' },
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
          { required: true, trigger: 'blur', message: '请设置密码' }
        ]
      },
      updateList: { accountId: '', amount: 0, email: '', sex: '', status: '', latitude: 0, longitude: 0 },
      updateVisible: false,
      updateRules: {
        amount: [
          { required: true, message: '请填写余额', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
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
          { required: true, message: '请填写经度', trigger: 'blur' },
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
          { required: true, message: '请填写纬度', trigger: 'blur' },
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
        ]
      }
    }
  },
  methods: {
    getAccount(data) {
      return adminAccountList(data).then(res => {
        this.total = res.total
        this.accountList = res.rows
      })
    },

    showAdd() {
      this.addVisible = true
      // 重置表单
      this.resetAddList()
    },

    showUpdate(item) {
      this.updateVisible = true
      // 重置表单
      this.resetUpdateList()
      // 赋本项值
      this.updateList = {
        accountId: item.accountId,
        amount: item.amount,
        email: item.email,
        sex: item.sex,
        status: item.status,
        latitude: item.latitude,
        longitude: item.longitude
      }
    },

    resetAddList() {
      this.addList = { phoneNumber: '', password: ''  }
    },

    resetUpdateList() {
      this.updateList = { accountId: '', amount: null, email: '', sex: '', status: '', latitude: null, longitude: null }
    },

    updateAccount(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminAccountUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getAccount(this.searchList)
          })
        }
      })
    },

    delAccount(id) {
      adminAccountDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getAccount(this.searchList)
      })
    },

    addAccount(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminAccountAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getAccount(this.searchList)
          })
        }
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getAccount(this.searchList)
    }
  },
  created() {
    this.getAccount(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <!--<el-dialog title="新增用户" :visible.sync="addVisible">-->
    <!--  <el-form ref="add" :rules="addRules" :model="addList">-->
    <!--    <el-form-item label="用户名称" label-width="120px" prop="accountName">-->
    <!--      <el-input v-model="addList.accountName" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="期限单位" label-width="120px" prop="unit">-->
    <!--      <el-select v-model="addList.unit" placeholder="请选择期限单位">-->
    <!--        <el-option label="月" value="0"></el-option>-->
    <!--        <el-option label="年" value="1"></el-option>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="期限数" label-width="120px" prop="value">-->
    <!--      <el-input v-model.number="addList.value" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="价格" label-width="120px" prop="price">-->
    <!--      <el-input v-model="addList.price" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="带宽" label-width="120px" prop="bandwidth">-->
    <!--      <el-input v-model.number="addList.bandwidth" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--  </el-form>-->
    <!--  <div slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="addVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="addAccount(addList)">确 定</el-button>-->
    <!--  </div>-->
    <!--</el-dialog>-->
    <!--updateForm-->
    <el-dialog title="修改用户" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="余额" label-width="120px" prop="amount">
          <el-input v-model.number="updateList.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="updateList.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" label-width="120px" prop="longitude">
          <el-input v-model.number="updateList.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" label-width="120px" prop="latitude">
          <el-input v-model.number="updateList.latitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-select v-model="updateList.sex" placeholder="请选择性别">
            <el-option label="无" value=""></el-option>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px" prop="status">
          <el-select v-model="updateList.status" placeholder="请设置状态">
            <el-option label="无" value=""></el-option>
            <el-option label="未订阅套餐" value="0"></el-option>
            <el-option label="已订阅套餐" value="1"></el-option>
            <el-option label="已欠费" value="2"></el-option>
            <el-option label="已取消套餐" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAccount(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="searchList.phoneNumber" placeholder="填写用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchList.name" placeholder="填写姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAccount(searchList)" plain>查询</el-button>
          <!--<el-button type="success" @click="showAdd()" plain>新增</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <!--table-->
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <el-table
            :data="accountList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="phoneNumber"
              label="用户名"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="accountId"
              label="用户ID"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="150"
            ></el-table-column>
            <el-table-column
              label="性别"
              width="100"
            >
              <template slot-scope="scope">
                <i class="el-icon-male" v-if="scope.row.sex === '0'"></i>
                <i class="el-icon-female" v-if="scope.row.sex === '1'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              label="余额（元）"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="longitude"
              label="经度"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="latitude"
              label="纬度"
              width="150"
            ></el-table-column>
            <el-table-column
              label="状态"
              width="150"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === '0'" size="mini" type="info">未订套餐</el-tag>
                <el-tag v-if="scope.row.status === '1'" size="mini" type="primary">已订套餐</el-tag>
                <el-tag v-if="scope.row.status === '2'" size="mini" type="danger">已欠费</el-tag>
                <el-tag v-if="scope.row.status === '3'" size="mini" type="warning">已取消套餐</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button @click="showUpdate(scope.row)" type="primary" plain
                           size="small"
                >
                  修改{{ name }}
                </el-button>
                <el-button @click="delAccount(scope.row.accountId)" type="danger" plain
                           size="small"
                >
                  删除{{ name }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="searchList.pageSize"
              :total="total"
              :current-page="searchList.pageNum"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="info-box box">
        </div>
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
  margin: 0 10%;
  color: black;

  .search-box {
    width: 80%;
    padding: 20px;
  }

  .left {
    width: 80%;
    display: flex;
    flex-direction: column;

    .main-box {
      .account {
        padding: 30px;
        display: flex;
        justify-content: space-between;

        .pic {
          width: 150px;
          height: 150px;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid $border-line;
          margin-right: 20px;
        }

        .des {
          .name {
            color: $title-color;
            font-size: 18px;
            font-weight: bold;
          }

          .p {
            margin: 0;
            line-height: 24px;
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
