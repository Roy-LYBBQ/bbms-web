<script>
import { adminNodeAdd, adminNodeDel, adminNodeList, adminNodeUpdate } from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'node',
  data() {
    return {
      name: '节点',
      total: 1,
      nodeList: [],
      searchList: {
        nodeName: '',
        pageSize: 5,
        pageNum: 1
      },
      addList: { nodeName: '', longitude: 0, latitude: 0 },
      addVisible: false,
      addRules: {
        nodeName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
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
      },
      updateList: { nodeId: '', nodeName: '', longitude: 0, latitude: 0 },
      updateVisible: false,
      updateRules: {
        nodeName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
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
    getNode(data) {
      return adminNodeList(data).then(res => {
        this.total = res.total
        this.nodeList = res.rows
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
        nodeId: item.nodeId, nodeName: item.nodeName, longitude: item.longitude, latitude: item.latitude
      }
    },

    resetAddList() {
      this.addList = { nodeName: '', longitude: null, latitude: null }
    },

    resetUpdateList() {
      this.updateList = { nodeId: '', nodeName: '', longitude: null, latitude: null }
    },

    updateNode(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminNodeUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getNode(this.searchList)
          })
        }
      })
    },

    delNode(id) {
      adminNodeDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getNode(this.searchList)
      })
    },

    addNode(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminNodeAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getNode(this.searchList)
          })
        }
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getNode(this.searchList)
    }
  },
  created() {
    this.getNode(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <el-dialog title="新增节点" :visible.sync="addVisible">
      <el-form ref="add" :rules="addRules" :model="addList">
        <el-form-item label="节点名称" label-width="120px" prop="nodeName">
          <el-input v-model="addList.nodeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" label-width="120px" prop="longitude">
          <el-input v-model.number="addList.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" label-width="120px" prop="latitude">
          <el-input v-model.number="addList.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNode(addList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--updateForm-->
    <el-dialog title="修改节点" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="节点名" label-width="120px" prop="nodeName">
          <el-input v-model="updateList.nodeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" label-width="120px" prop="longitude">
          <el-input v-model.number="updateList.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" label-width="120px" prop="latitude">
          <el-input v-model.number="updateList.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateNode(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="节点名">
          <el-input v-model="searchList.nodeName" placeholder="填写节点名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getNode(searchList)" plain>查询</el-button>
          <el-button type="success" @click="showAdd()" plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--table-->
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <el-table
            :data="nodeList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="nodeName"
              label="节点名"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="nodeId"
              label="节点ID"
              width="180"
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
              fixed="right"
              label="操作"
              width="300"
            >
              <template slot-scope="scope">
                <el-button @click="showUpdate(scope.row)" type="primary" plain
                           size="small"
                >
                  修改{{ name }}
                </el-button>
                <el-button @click="delNode(scope.row.nodeId)" type="danger" plain
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
      .node {
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
