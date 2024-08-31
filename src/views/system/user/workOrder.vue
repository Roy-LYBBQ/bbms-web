<script>
export default {
  name: 'workOrder',
  data() {
    return {
      tableData: [{
        title: 's1',
        type: 't1',
        des: 'xxx'
      }, {
        title: 's1',
        type: 't1',
        des: 'xxx'
      }, {
        title: 's1',
        type: 't2',
        des: 'xxx'
      }, {
        title: 's1',
        type: 't1',
        des: 'xxx'
      }, {
        title: 's1',
        type: 't1',
        des: 'xxx'
      }], multipleSelection: [],
      data: [{
        label: '工单分类',
        children: [{
          label: '工单1'
        }, {
          label: '工单2'
        }, {
          label: '工单3'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchInput: '',
      gridData: [{
        a: 'aaa',
        b: 'bbb',
        c: 'ccc'
      }],
      dialogTableVisible: false
    }
  },

  methods: {
    scoped() {
      return scoped
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}


</script>

<template>
  <div id="container">
    <div class="left">
      <div class="nav-tree">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <div class="search">
          <el-input
            placeholder="请输入工单号"
            prefix-icon="el-icon-search"
            v-model="searchInput"
          >
          </el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="title"
              label="工单号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              width="120"
            >
              <template slot-scope="scope">
                <el-tag :type="scope.row.type === 't1' ? 'primary' : 'success'">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="des"
              label="信息"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
            >
              <div style="display:flex;">
                <el-button @click="dialogTableVisible = true" type="success" size="small">查看详情</el-button>
                <el-button @click="handleClick(scope.row)" type="primary" size="small">op1</el-button>
                <el-button type="danger" size="small">op2</el-button>
              </div>
            </el-table-column>
          </el-table>
          <div class="block" style="display:flex; justify-content: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="20"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="a" label="信息1" width="150"></el-table-column>
        <el-table-column property="b" label="信息2" width="200"></el-table-column>
        <el-table-column property="c" label="信息3"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

#container {
  width: inherit;
  min-height: inherit;
  position: relative;
  display: flex;

  .left {
    width: 10%;
    margin-top: 10px;
    border-right: 1px solid #DFE6EC;
  }

  .right {
    width: 90%;
    background-color: #f8f8f8;

    .content {
      margin: 0 20px;
      padding-top: 10px;;

      .search {
        margin-bottom: 10px;
        display: flex;
        gap: 20px;
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 0 2px 0 #ccc;
        padding: 20px;
      }

      .table {
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 0 2px 0 #ccc;
        padding: 20px;
      }
    }
  }
}
</style>
