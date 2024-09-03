<script>
import { serviceList } from '@/api/myApi/service'

export default {
  name: 'servicePage',
  data() {
    return {
      total: 0,
      searchList: {
        broadbandServiceName: '',
        typeId: '',
        pageSize: 5,
        pageNum: 1
      },
      tableData: [{
        broadbandServiceName: '',
        typeName: ''
      }]
    }
  },
  methods: {
    getService(data) {
      serviceList(data).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.total = res.total
      })
    }
  },
  created() {
    this.getService(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <div class="search-box box">
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
            width="200"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" plain size="small">选择服务</el-button>
              <el-button @click="handleClick(scope.row)" type="success" plain size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="searchList.pageSize"
        :total="total"
      >
      </el-pagination>
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
    flex-direction: column;

    .main-box {
      padding: 20px;
      border: 1px solid #eee;
    }
  }
}

</style>
