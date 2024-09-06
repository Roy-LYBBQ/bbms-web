<script>
import { adminNodeList, adminWorkerAdd, adminWorkerDel, adminWorkerList, adminWorkerUpdate } from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'worker',
  data() {
    return {
      name: '业务员',
      total: 1,
      workerList: [],
      searchList: {
        userName: '',
        name: '',
        nodeName: '',
        pageSize: 5,
        pageNum: 1
      },
      addList: { username: '', password: '' },
      addVisible: false,
      addRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请设置密码' }
        ]
      },
      updateList: { businessPeopleId: '', userName: '', name: '', phonenumber: '', email: '', sex: '', nodeName: '' },
      updateVisible: false,
      updateRules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        phonenumber: [
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
          }],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
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
        nodeName: [
          { required: true, message: '请填写节点', trigger: 'blur' }
        ]
      },
      nodeList: []
    }
  },
  methods: {
    getWorker(data) {
      return adminWorkerList(data).then(res => {
        this.total = res.total
        this.workerList = res.rows
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
        businessPeopleId: item.businessPeopleId,
        userName: item.userName,
        name: item.name,
        phonenumber: item.phonenumber,
        email: item.email,
        sex: item.sex,
        nodeName: item.nodeName
      }
    },

    resetAddList() {
      this.addList = { username: '', password: '' }
    },

    resetUpdateList() {
      this.updateList = {
        businessPeopleId: '',
        userName: '',
        name: '',
        phonenumber: '',
        email: '',
        sex: '',
        nodeName: ''
      }
    },

    updateWorker(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminWorkerUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getWorker(this.searchList)
          })
        }
      })
    },

    delWorker(id) {
      adminWorkerDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getWorker(this.searchList)
      })
    },

    addWorker(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminWorkerAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getWorker(this.searchList)
          })
        }
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getWorker(this.searchList)
    },

    // 获取节点
    getNode() {
      adminNodeList({ nodeName: '', pageNum: 1, pageSize: 9999 }).then(res => {
        this.nodeList = res.rows
      })
    }
  },
  created() {
    this.getWorker(this.searchList)
    this.getNode()
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <el-dialog title="新增业务员" :visible.sync="addVisible">
      <el-form ref="add" :rules="addRules" :model="addList">
        <el-form-item label="业务员名称" label-width="120px" prop="username">
          <el-input v-model="addList.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addList.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWorker(addList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--updateForm-->
    <el-dialog title="修改业务员" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="用户名" label-width="120px" prop="userName">
          <el-input v-model="updateList.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px" prop="name">
          <el-input v-model="updateList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="updateList.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phonenumber">
          <el-input v-model="updateList.phonenumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点名" label-width="120px" prop="nodeName">
          <el-select v-model="updateList.nodeName" placeholder="请选择节点">
            <el-option v-for="item in nodeList" :label="item.nodeName" :value="item.nodeName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-select v-model="updateList.sex" placeholder="请选择性别">
            <el-option label="无" value=""></el-option>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateWorker(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="业务员名">
          <el-input v-model="searchList.userName" placeholder="填写业务员名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchList.name" placeholder="填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="节点名">
          <el-select v-model="searchList.nodeName" placeholder="请选择节点">
            <el-option  label="无" value=""></el-option>
            <el-option v-for="item in nodeList" :label="item.nodeName" :value="item.nodeName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getWorker(searchList)" plain>查询</el-button>
          <el-button type="success" @click="showAdd()" plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--table-->
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <el-table
            :data="workerList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="userName"
              label="业务员"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="businessPeopleId"
              label="业务员ID"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="phonenumber"
              label="手机号"
              width="150"
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
              prop="nodeName"
              label="节点名"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="orderCount"
              label="负责订单数"
              width="150"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="240"
            >
              <template slot-scope="scope">
                <el-button @click="showUpdate(scope.row)" type="primary" plain
                           size="small"
                >
                  修改{{ name }}
                </el-button>
                <el-button @click="delWorker(scope.row.businessPeopleId)" type="danger" plain
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
      .worker {
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
