<script>
import { adminServiceTypeAdd, adminServiceTypeDel, adminServiceTypeList, adminServiceTypeUpdate } from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'serviceType',
  data() {
    return {
      name: '服务类型',
      total: 1,
      serviceTypeList: [],
      searchList: {
        typeName: ''
        // pageSize: 5,
        // pageNum: 1
      },
      addList: { typeName: '', parentId: '' },
      addVisible: false,
      addRules: {
        typeName: [
          { required: true, message: '请填写服务类型名', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父类型', trigger: 'blur' },
        ]
      },
      updateList: { typeId: '', typeName: '' },
      updateVisible: false,
      updateRules: {
        typeName: [
          { required: true, message: '请填写服务类型名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getServiceType(data) {
      return adminServiceTypeList(data).then(res => {
        // this.total = res.total
        this.serviceTypeList = res.data
      })
    },

    showAdd(item) {
      this.addVisible = true
      // 重置表单
      this.resetAddList()
      // 添加子节点
      if (item) {
        this.addList.parentId = item.id
      }
    },

    showUpdate(item) {
      this.updateVisible = true
      // 重置表单
      this.resetUpdateList()
      // 赋本项值
      this.updateList = {
        typeId: item.id, typeName: item.label
      }
    },

    resetAddList() {
      this.addList = { typeName: '', parentId: '0'  }
    },

    resetUpdateList() {
      this.updateList = { typeId: '', typeName: '' }
    },

    updateServiceType(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminServiceTypeUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getServiceType(this.searchList)
          })
        }
      })
    },

    delServiceType(id) {
      console.log(id)
      adminServiceTypeDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getServiceType(this.searchList)
      })
    },

    addServiceType(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminServiceTypeAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getServiceType(this.searchList)
          })
        }
      })
    }


    // 页数变动
    // handleCurrentChange(page) {
    //   this.searchList.pageNum = page
    //   this.getServiceType(this.searchList)
    // }
  },
  created() {
    this.getServiceType(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <el-dialog title="新增服务类型" :visible.sync="addVisible">
      <el-form ref="add" :rules="addRules" :model="addList">
        <el-form-item label="服务类型名称" label-width="120px" prop="typeName">
          <el-input v-model="addList.typeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addServiceType(addList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--updateForm-->
    <el-dialog title="修改服务类型" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="服务类型名" label-width="120px" prop="typeName">
          <el-input v-model="updateList.typeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateServiceType(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="服务类型名">
          <el-input v-model="searchList.typeName" placeholder="填写服务类型名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getServiceType(searchList)" plain>查询</el-button>
          <el-button type="success" @click="showAdd(null)" plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--table-->
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <el-table
            :data="serviceTypeList"
            row-key="id"
            stripe
            style="width: 100%"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              fixed
              prop="label"
              label="服务类型名"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="服务类型ID"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="400"
            >
              <template slot-scope="scope">
                <el-button @click="showUpdate(scope.row)" type="primary" plain
                           size="small"
                >
                  修改{{ name }}
                </el-button>
                <el-button @click="showAdd(scope.row)" type="warning" plain
                           size="small"
                >
                  增加子服务
                </el-button>
                <el-button @click="delServiceType(scope.row.id)" type="danger" plain
                           size="small"
                >
                  删除{{ name }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div style="">-->
          <!--  <el-pagination-->
          <!--    background-->
          <!--    layout="prev, pager, next"-->
          <!--    :page-size="searchList.pageSize"-->
          <!--    :total="total"-->
          <!--    :current-page="searchList.pageNum"-->
          <!--    @current-change="handleCurrentChange"-->
          <!--  >-->
          <!--  </el-pagination>-->
          <!--</div>-->
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
      .serviceType {
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
