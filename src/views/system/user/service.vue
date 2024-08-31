<script>
import FootNav from '@/components/FootNav/footNav.vue'

export default {
  name: 'service',
  components: { FootNav },
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
        label: '服务分类',
        children: [{
          label: '服务1'
        }, {
          label: '服务2'
        }, {
          label: '服务3'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchInput: ''
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
            placeholder="请输入服务名"
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
              label="服务名"
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
              label="详情"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
            >
              <div style="display:flex;">
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
