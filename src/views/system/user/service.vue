<script>
import {
  adminServiceAdd,
  adminServiceDel,
  adminServiceList,
  adminServiceTypeList,
  adminServiceUpdate
} from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'service',
  data() {
    return {
      name: '服务',
      total: 1,
      serviceList: [],
      searchList: {
        broadbandServiceName: '',
        typeId: '',
        pageSize: 5,
        pageNum: 1
      },
      addList: { broadbandServiceName: '', typeId: '' },
      addVisible: false,
      addRules: {
        broadbandServiceName: [
          { required: true, message: '请填写服务名', trigger: 'blur' }
        ]
      },
      updateList: { broadbandServiceId: '', broadbandServiceName: '', typeId: '' },
      updateVisible: false,
      updateRules: {
        broadbandServiceName: [
          { required: true, message: '请填写服务名', trigger: 'blur' }
        ]
      },
      // 分类树属性
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      typeTree: [],
      // 当前树状态
      curTree: {
        typeId: '',
        label: ''
      }
    }
  },
  methods: {
    getService(data) {
      return adminServiceList(data).then(res => {
        this.total = res.total
        this.serviceList = res.rows
      })
    },

    showAdd() {
      if (this.curTree.typeId === '') {
        Message.warning('请先选择服务类型')
      } else {
        this.addVisible = true
        // 重置表单
        this.resetAddList()
        // 当前类型id
        this.addList.typeId = this.curTree.typeId
      }
    },

    showUpdate(item) {
      if (this.curTree.typeId === '') {
        Message.warning('请先选择服务类型')
      } else {
        this.updateVisible = true
        // 重置表单
        this.resetUpdateList()
        // 赋本项值
        this.updateList = {
          broadbandServiceId: item.broadbandServiceId,
          broadbandServiceName: item.broadbandServiceName,
          typeId: this.curTree.typeId
        }
      }
    },

    resetAddList() {
      this.addList = { broadbandServiceName: '', typeId: '' }
    },

    resetUpdateList() {
      this.updateList = { broadbandServiceId: '', broadbandServiceName: '', typeId: '' }
    },

    updateService(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminServiceUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getService(this.searchList)
          })
        }
      })
    },

    delService(id) {
      adminServiceDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getService(this.searchList)
      })
    },

    addService(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminServiceAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getService(this.searchList)
          })
        }
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getService(this.searchList)
    },

    // 获取服务类型树
    getServiceTree() {
      adminServiceTypeList({ typeName: '' }).then(res => {
        this.typeTree = res.data
      })
    },
    // 树服务选中
    handleNodeClick(data) {
      this.searchList.typeId = data.id
      this.curTree.typeId = data.id
      this.curTree.label = data.id
      this.getService(this.searchList)
    }
  }
  ,
  created() {
    this.getService(this.searchList)
    this.getServiceTree()
  }
}
</script>

<template>
  <div id="container">
    <!--tree-->
    <div class="tree box">
      <div style="padding: 10px; color: #737373">服务类别</div>
      <el-tree
        :data="typeTree"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
    <!--addForm-->
    <el-dialog title="新增服务" :visible.sync="addVisible">
      <el-form ref="add" :rules="addRules" :model="addList">
        <el-form-item label="服务名称" label-width="120px" prop="broadbandServiceName">
          <el-input v-model="addList.broadbandServiceName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addService(addList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--updateForm-->
    <el-dialog title="修改服务" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="服务名" label-width="120px" prop="broadbandServiceName">
          <el-input v-model="updateList.broadbandServiceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前服务类型" label-width="120px">
          <el-input disabled v-model="curTree.label" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateService(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <!--搜索-->
      <div class="search-box box">
        <el-form :inline="true" :model="searchList" class="demo-form-inline">
          <el-form-item label="服务名">
            <el-input v-model="searchList.broadbandServiceName" placeholder="填写服务名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getService(searchList)" plain>查询</el-button>
            <el-button type="success" @click="showAdd()" plain>新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--table-->
      <div style="display: flex">
        <div class="left">
          <div class="main-box">
            <el-table
              :data="serviceList"
              stripe
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="broadbandServiceName"
                label="服务名"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="broadbandServiceId"
                label="服务ID"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="typeId"
                label="服务类型ID"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="typeName"
                label="服务类型"
              ></el-table-column>
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
                  <el-button @click="delService(scope.row.broadbandServiceId)" type="danger" plain
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
  min-height: 100vh;
  color: black;
  display: flex;

  .tree {
    width: 10%;
    margin-right: 2%;
    box-shadow: none;
    border-left: 1px solid #eee;
  }

  .search-box {
    width: 100%;
    padding: 20px;
  }

  .left {
    width: 100%;
    display: flex;
    flex-direction: column;

    .main-box {
      .service {
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
