<script>
import { adminWorkOrderDel, adminWorkOrderList } from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'workOrder',
  data() {
    return {
      name: '订单',
      total: 1,
      workOrderList: [],
      searchList: {
        serviceName: '',
        businessPeopleName: '',
        accountName: '',
        workOrderName: '',
        pageSize: 5,
        pageNum: 1
      }
      // addList: { workOrderName: '', longitude: 0, latitude: 0 },
      // addVisible: false,
      // addRules: {
      //   workOrderName: [
      //     { required: true, message: '请填写用户名', trigger: 'blur' }
      //   ],
      //   longitude: [
      //     { required: true, message: '请填写经度', trigger: 'blur' },
      //     {
      //       validator: (rule, value, callback) => {
      //         if (!Number.isFinite(value)) {
      //           callback(new Error('请输入合法的数字'))
      //         } else if (value < 0 || value > 180) {
      //           callback(new Error('经度范围：0-180'))
      //         } else {
      //           callback()
      //         }
      //       },
      //       trigger: 'blur'
      //     }
      //   ],
      //   latitude: [
      //     { required: true, message: '请填写纬度', trigger: 'blur' },
      //     {
      //       validator: (rule, value, callback) => {
      //         if (!Number.isFinite(value)) {
      //           callback(new Error('请输入合法的数字'))
      //         } else if (value < 0 || value > 90) {
      //           callback(new Error('纬度范围0-90'))
      //         } else {
      //           callback()
      //         }
      //       },
      //       trigger: 'blur'
      //     }
      //   ]
      // },
      // updateList: { workOrderId: '', workOrderName: '', longitude: 0, latitude: 0 },
      // updateVisible: false,
      // updateRules: {
      //   workOrderName: [
      //     { required: true, message: '请填写用户名', trigger: 'blur' }
      //   ],
      //   longitude: [
      //     { required: true, message: '请填写经度', trigger: 'blur' },
      //     {
      //       validator: (rule, value, callback) => {
      //         if (!Number.isFinite(value)) {
      //           callback(new Error('请输入合法的数字'))
      //         } else if (value < 0 || value > 180) {
      //           callback(new Error('经度范围：0-180'))
      //         } else {
      //           callback()
      //         }
      //       },
      //       trigger: 'blur'
      //     }
      //   ],
      //   latitude: [
      //     { required: true, message: '请填写纬度', trigger: 'blur' },
      //     {
      //       validator: (rule, value, callback) => {
      //         if (!Number.isFinite(value)) {
      //           callback(new Error('请输入合法的数字'))
      //         } else if (value < 0 || value > 90) {
      //           callback(new Error('纬度范围0-90'))
      //         } else {
      //           callback()
      //         }
      //       },
      //       trigger: 'blur'
      //     }
      //   ]
      // }
    }
  },
  methods: {
    getWorkOrder(data) {
      return adminWorkOrderList(data).then(res => {
        this.total = res.total
        this.workOrderList = res.rows
      })
    },

    // showAdd() {
    //   this.addVisible = true
    //   // 重置表单
    //   this.resetAddList()
    // },

    // showUpdate(item) {
    //   this.updateVisible = true
    //   // 重置表单
    //   this.resetUpdateList()
    //   // 赋本项值
    //   this.updateList = {
    //     workOrderId: item.workOrderId, workOrderName: item.workOrderName, longitude: item.longitude, latitude: item.latitude
    //   }
    // },

    // resetAddList() {
    //   this.addList = { workOrderName: '', longitude: null, latitude: null }
    // },
    //
    // resetUpdateList() {
    //   this.updateList = { workOrderId: '', workOrderName: '', longitude: null, latitude: null }
    // },

    // updateWorkOrder(data) {
    //   this.$refs.update.validate(res => {
    //     if (res) {
    //       adminWorkOrderUpdate(data).then(res => {
    //         Message.success(`修改${this.name}成功`)
    //         this.updateVisible = false
    //         return this.getWorkOrder(this.searchList)
    //       })
    //     }
    //   })
    // },

    delWorkOrder(id) {
      adminWorkOrderDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getWorkOrder(this.searchList)
      })
    },

    // addWorkOrder(data) {
    //   this.$refs.add.validate(res => {
    //     if (res) {
    //       adminWorkOrderAdd(data).then(res => {
    //         Message.success(`添加${this.name}成功`)
    //         this.addVisible = false
    //         return this.getWorkOrder(this.searchList)
    //       })
    //     }
    //   })
    // },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getWorkOrder(this.searchList)
    }
  },
  created() {
    this.getWorkOrder(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <!--<el-dialog title="新增节点" :visible.sync="addVisible">-->
    <!--  <el-form ref="add" :rules="addRules" :model="addList">-->
    <!--    <el-form-item label="节点名称" label-width="120px" prop="workOrderName">-->
    <!--      <el-input v-model="addList.workOrderName" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="经度" label-width="120px" prop="longitude">-->
    <!--      <el-input v-model.number="addList.longitude" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="纬度" label-width="120px" prop="latitude">-->
    <!--      <el-input v-model.number="addList.latitude" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--  </el-form>-->
    <!--  <div slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="addVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="addWorkOrder(addList)">确 定</el-button>-->
    <!--  </div>-->
    <!--</el-dialog>-->
    <!--updateForm-->
    <!--<el-dialog title="修改节点" :visible.sync="updateVisible">-->
    <!--  <el-form ref="update" :rules="updateRules" :model="updateList">-->
    <!--    <el-form-item label="节点名" label-width="120px" prop="workOrderName">-->
    <!--      <el-input v-model="updateList.workOrderName" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="经度" label-width="120px" prop="longitude">-->
    <!--      <el-input v-model.number="updateList.longitude" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="纬度" label-width="120px" prop="latitude">-->
    <!--      <el-input v-model.number="updateList.latitude" autocomplete="off"></el-input>-->
    <!--    </el-form-item>-->
    <!--  </el-form>-->
    <!--  <div slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="updateVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="updateWorkOrder(updateList)">确 定</el-button>-->
    <!--  </div>-->
    <!--</el-dialog>-->
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="订单名">
          <el-input size="mini" v-model="searchList.workOrderName" placeholder="填写订单名"></el-input>
        </el-form-item>
        <el-form-item label="服务名">
          <el-input size="mini" v-model="searchList.serviceName" placeholder="填写服务名"></el-input>
        </el-form-item>
        <el-form-item label="业务员名称">
          <el-input size="mini" v-model="searchList.businessPeopleName" placeholder="填写业务员名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input size="mini" v-model="searchList.accountName" placeholder="填写用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="getWorkOrder(searchList)" plain>查询</el-button>
          <!--<el-button type="success" @click="showAdd()" plain>新增</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <!--table-->
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <el-table
            :data="workOrderList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="workOrderName"
              label="订单名"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="workOrderId"
              label="订单ID"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="serviceName"
              label="包含服务"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="businessPeopleId"
              label="对接业务人员ID"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="businessPeopleName"
              label="对接业务人员"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="accountId"
              label="创建用户ID"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="accountName"
              label="创建用户"
              width="200"
            ></el-table-column>
            <el-table-column
              label="状态"
              width="200"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.state === 0" size="mini" type="info">未完成</el-tag>
                <el-tag v-if="scope.row.state === 1" size="mini" type="success">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <!--<el-button @click="showUpdate(scope.row)" type="primary" plain-->
                <!--           size="small"-->
                <!--&gt;-->
                <!--  修改{{ name }}-->
                <!--</el-button>-->
                <el-button @click="delWorkOrder(scope.row.workOrderId)" type="danger" plain
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
      .workOrder {
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
