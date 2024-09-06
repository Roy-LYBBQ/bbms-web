<script>
import { workerOrderFinish } from '@/api/myApi/woker'
import { Message } from 'element-ui'
import { orderInfoById, workerOrderList } from '@/api/myApi/order'

export default {
  name: 'orderPage',
  data() {
    return {
      total: 0,
      dialogVisible: false,
      searchList: {
        accountName: '',
        serviceName: '',
        pageSize: 5,
        pageNum: 1
      },
      tableData: [{
        workOrderName: '',
        workOrderId: ''
      }],
      orderInfos: {
        accountName: '',
        longitude: '',
        latitude: '',
        businessPeopleName: '',
        businessPhonenumber: '',
        businessNodeName: '',
        serviceName: '',
        serviceTypeName: '',
        workOrderName: '',
        workOrderId: '',
        state: -1
      }
    }
  },
  methods: {
    getOrder(data) {
      workerOrderList(data).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    // 查看详情
    checkOrderInfo(row) {
      // 调取订单详情接口
      orderInfoById(row.workOrderId).then(res => {
        this.orderInfos.accountName = row.accountName
        this.orderInfos.businessPeopleName = row.businessPeopleName
        this.orderInfos.serviceName = row.serviceName
        this.orderInfos.workOrderName = row.workOrderName
        this.orderInfos.workOrderId = row.workOrderId
        this.orderInfos.state = row.state
        this.orderInfos.businessPhonenumber = res.data.businessPeople.phonenumber
        this.orderInfos.businessNodeName = res.data.businessPeople.nodeName
        this.orderInfos.serviceTypeName = res.data.broadbandService.typeName
        this.orderInfos.longitude = res.data.broadbandAccount.longitude
        this.orderInfos.latitude = res.data.broadbandAccount.latitude
        this.dialogVisible = true
        this.openDialog()
      })
    },
    orderFinish(data) {
      workerOrderFinish(data.workOrderId).then(res => {
        Message.success('订单已完成')
        this.getOrder(this.searchList)
        console.log(res)
      })
    },
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getOrder(this.searchList)
    },
    // 打开对话框并初始化地图
    openDialog() {
      let lng = this.orderInfos.longitude
      let lat = this.orderInfos.latitude
      this.$nextTick(() => {
        if (!this.map) {
          // 创建地图实例
          this.map = new AMap.Map('map-container', {
            zoom: 13,
            center: [lng, lat], // 默认中心点
            resizeEnable: true
          })

          // 创建点标记
          this.marker = new AMap.Marker({
            map: this.map,
            position: new AMap.LngLat(lng, lat),
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: new AMap.Pixel(-13, -30)
          })
        }
      })
    },
    // 关闭对话框时清除地图和信息
    handleClose() {
      this.dialogVisible = false
      this.orderInfos = {
        accountName: '',
        longitude: '',
        latitude: '',
        businessPeopleName: '',
        businessPhonenumber: '',
        businessNodeName: '',
        serviceName: '',
        serviceTypeName: '',
        workOrderName: '',
        workOrderId: '',
        state: -1
      }
    }
  },
  created() {
    this.getOrder(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="服务名">
          <el-input v-model="searchList.serviceName" placeholder="填写服务名"></el-input>
        </el-form-item>
        <el-form-item label="创建用户">
          <el-input v-model="searchList.accountName" placeholder="填写创建用户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrder(searchList)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <!--table-->
      <div class="main-box box">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="workOrderId"
            label="订单号"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="workOrderName"
            label="订单名"
          ></el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button disabled v-if="scope.row.state === 0" type="info" size="mini">未完成</el-button>
              <el-button disabled v-if="scope.row.state === 1" type="success" size="mini">已完成</el-button>
              <el-button v-if="scope.row.state === 0" @click="orderFinish(scope.row)" type="primary" plain size="small">
                完成订单
              </el-button>
              <el-button @click="checkOrderInfo(scope.row)" type="success" plain size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
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
    <!--详情-->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="margin-bottom: 10px">
        <el-tag v-if="orderInfos.state === 0" type="info" size="mini">未完成</el-tag>
        <el-tag v-if="orderInfos.state === 1" type="success" size="mini">已完成</el-tag>
      </div>
      <div style="margin-bottom: 10px;font-weight: bold">
        <span>订单号：{{ orderInfos.workOrderId }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>订单名：{{ orderInfos.workOrderName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>创建用户：{{ orderInfos.accountName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>负责人员：{{ orderInfos.businessPeopleName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>负责人员电话：{{ orderInfos.businessPhonenumber }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>负责人员节点：{{ orderInfos.businessNodeName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>服务名：{{ orderInfos.serviceName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>服务类型名：{{ orderInfos.serviceTypeName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>用户位置：（{{ orderInfos.longitude }}/ {{ orderInfos.latitude }}）</span>
      </div>

      <!-- 地图容器 -->
      <div id="map-container" style="height: 300px; width: 100%; border: 1px solid #ccc"></div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
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
