<script>
import { adminWorkOrderDel, adminWorkOrderInfoById, adminWorkOrderList } from '@/api/forAdmin'
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
      },
      orderInfos: {
        workOrder:{},
        broadbandAccount:{},
        businessPeople:{},
        broadbandService:{}
      },
      /**
       * 地图选点相关
       */
      dialogVisible: false, // 控制对话框显示
      map: null, // 高德地图实例
      marker: null, // 地图标记
      tempLocation: { lng: null, lat: null }, // 临时保存经纬度
      location: null // 选定的经纬度
    }
  },
  methods: {
    getWorkOrder(data) {
      return adminWorkOrderList(data).then(res => {
        this.total = res.total
        this.workOrderList = res.rows
      })
    },

    delWorkOrder(id) {
      adminWorkOrderDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getWorkOrder(this.searchList)
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getWorkOrder(this.searchList)
    },

    // 查看详情（调用详情接口+高德api）
    checkInfo(item) {
      // 调用订单详情接口
      adminWorkOrderInfoById(item.workOrderId).then(res => {
        this.orderInfos = res.data
        this.openDialog()
      })
    },
    /**
     * 地图选点相关方法
     */
    // 打开对话框并初始化地图
    openDialog() {
      this.dialogVisible = true
      let lng = this.orderInfos.broadbandAccount.longitude
      let lat = this.orderInfos.broadbandAccount.latitude
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
        workOrder:{},
        broadbandAccount:{},
        businessPeople:{},
        broadbandService:{}
      }
    }
  },
  created() {
    this.getWorkOrder(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!-- 地图选择对话框 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="40%" @close="handleClose">
      <div style="margin-bottom: 10px">
        <span style="font-weight: bold">订单ID：{{ orderInfos.workOrder.workOrderId }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>订单名：{{ orderInfos.workOrder.workOrderName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>服务名：{{ orderInfos.broadbandService.broadbandServiceName }} / 服务类型：{{ orderInfos.broadbandService.typeName }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>负责人员姓名：{{orderInfos.businessPeople.name}}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>负责人员电话：{{orderInfos.businessPeople.phonenumber}}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>创建用户：{{orderInfos.broadbandAccount.phoneNumber}}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span>用户位置：（{{orderInfos.broadbandAccount.longitude}}，{{orderInfos.broadbandAccount.latitude}}）</span>
      </div>
      <!-- 地图容器 -->
      <div id="map-container" style="height: 300px; width: 100%; border: 1px solid #ccc"></div>

      <!-- 对话框底部的按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>

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
              prop="businessPeopleName"
              label="对接业务人员"
              width="150"
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
                <el-button @click="checkInfo(scope.row)" type="primary" plain
                           size="small"
                >
                  查看详情
                </el-button>
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
