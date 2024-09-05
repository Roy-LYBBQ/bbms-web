<script>
import { serviceList } from '@/api/myApi/service'
import { typeTree } from '@/api/myApi/serviceType'
import { genOrder } from '@/api/myApi/order'
import { Message } from 'element-ui'

export default {
  name: 'servicePage',
  data() {
    return {
      total: 0,
      dialogVisible: false,
      searchList: {
        broadbandServiceName: '',
        typeId: '',
        pageSize: 5,
        pageNum: 1
      },
      tableData: [{
        broadbandServiceName: '',
        typeName: ''
      }],
      serviceInfos: {
        broadbandServiceName: '',
        typeName: ''
      },
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      typeTree: []
    }
  },
  methods: {
    getService(data) {
      serviceList(data).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    getServiceTree() {
      typeTree().then(res => {
        this.typeTree = res.data
      })
    },
    // tree节点选择处理
    handleNodeClick(data) {
      this.searchList.typeId = data.id
      this.getService(this.searchList)
    },
    selectService(data) {
      let serviceId = data.broadbandServiceId
      genOrder(serviceId).then(res => {
        console.log(res.data)
        Message.success('订单添加成功')
      })
    },
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getService(this.searchList)
    },
    // checkServiceInfo(row) {
    //   this.serviceInfos.broadbandServiceName = row.broadbandServiceName
    //   this.serviceInfos.typeName = row.typeName
    //   this.dialogVisible = true
    // }
  },
  created() {
    this.getService(this.searchList)
    this.getServiceTree()
  }
}
</script>

<template>
  <div id="container">
    <!--搜索--none-->
    <div style="display: none" class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="服务名">
          <el-input v-model="searchList.broadbandServiceName" placeholder="填写服务名"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchList.typeId" placeholder="选择类型">
            <el-option label="服务1" value="0"></el-option>
            <el-option label="服务2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getService(searchList)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main">
      <!--tree-->
      <div class="tree box">
        <div style="padding: 10px; color: #aaa">服务类别</div>
        <el-tree
          :data="typeTree"
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <!--表格-->
      <div class="main-box box">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="broadbandServiceName"
            label="服务名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="服务类型"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button @click="selectService(scope.row)" type="primary" plain size="small">选择服务</el-button>
              <!--<el-button @click="checkServiceInfo(scope.row)" type="success" plain size="small">查看详情</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
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
        <el-dialog
          title="服务详情"
          :visible.sync="dialogVisible"
          width="30%">
          <div style="margin-bottom: 10px">
            <span>服务名：{{serviceInfos.broadbandServiceName}}</span>
          </div>
          <div>
            <span>服务类型：{{serviceInfos.typeName}}</span>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
        </el-dialog>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
$border-line: #ededed;

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

  .main {
    width: 80%;
    display: flex;

    .tree {
      width: 20%;
    }

    .main-box {
      width: 80%;
      padding: 20px;
      border: 1px solid #eee;
    }
  }
}

</style>
