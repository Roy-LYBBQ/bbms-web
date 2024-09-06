<script>
import { adminNodeAdd, adminNodeDel, adminNodeList, adminNodeUpdate } from '@/api/forAdmin'
import { Message } from 'element-ui'
import myStore from '@/store/myStore'

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
      addList: null,
      tempAddList: { nodeName: '', lng: null, lat: null },
      addVisible: false,
      addRules: {
        nodeName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ]
      },
      updateList: { nodeId: '', nodeName: '' },
      updateVisible: false,
      updateRules: {
        nodeName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ]
      },
      /**
       * 地图选点相关
       */
      dialogVisible: false, // 控制对话框显示
      map: null, // 高德地图实例
      marker: null, // 地图标记
      tempLocation: { nodeName: null, lng: null, lat: null }, // 临时保存经纬度
      location: null, // 选定的经纬度
      curNodeId: '',// 当前选中nodeId
      opType: ''// 当前操作类型
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
        nodeId: item.nodeId, nodeName: item.nodeName
      }
    },

    resetAddList() {
      this.addList = { nodeName: '', longitude: null, latitude: null }
    },

    resetUpdateList() {
      this.updateList = { nodeId: '', nodeName: '' }
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
    },
    /**
     * 地图选点相关方法
     */
    // 打开对话框并初始化地图
    openDialog(node) {
      // 判断操作类型
      this.dialogVisible = true
      // 当前节点坐标（默认116.39, 39.92）
      let lng = 116.39
      let lat = 39.92
      if (node) {
        this.curNodeId = node.nodeId
        lng = node.longitude
        lat = node.latitude
      }
      this.tempLocation = { nodeName: '', lng, lat }
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

          // 地图点击事件，更新标记位置并显示经纬度
          this.map.on('click', this.handleMapClick)
        } else {
          this.map.setCenter([lng, lat])
          this.marker.setPosition([lng, lat])
        }
      })
    },
    // 地图点击事件处理，获取点击的经纬度
    handleMapClick(e) {
      // 更新临时经纬度
      this.tempLocation.lng = e.lnglat.getLng()
      this.tempLocation.lat = e.lnglat.getLat()
      // 移动标记到点击位置
      this.marker.setPosition(e.lnglat)
      // 提示用户所选位置的经纬度
      this.$message.success(`您选择了经纬度：${e.lnglat.getLng()}, ${e.lnglat.getLat()}`)
    },
    // 提交选定的位置并关闭对话框
    submitLocation() {
      this.location = { ...this.tempLocation }
      this.dialogVisible = false
      // 判断操作类型

      let data = {}
      if (this.opType === 'add') {
        data = {
          nodeName: this.location.nodeName,
          longitude: this.location.lng,
          latitude: this.location.lat
        }
        // 新建节点
        this.$refs.add.validate(res => {
          if (res) {
            adminNodeAdd(data).then(res => {
              Message.success('添加成功')
              this.getNode(this.searchList)
            })
          }
        })
      } else {
        data = {
          nodeId: this.curNodeId,
          longitude: this.location.lng,
          latitude: this.location.lat
        }
        // 更新节点信息
        adminNodeUpdate(data).then(res => {
          Message.success('更新成功')
          this.getNode(this.searchList)
        })
      }
    },
    // 关闭对话框时清除状态信息
    handleClose() {
      this.dialogVisible = false
      // 取消地图点击事件的绑定
      // this.map.off('click', this.handleMapClick)
      this.curNodeId = ''
      this.opType = ''
    }
  },
  created() {
    this.getNode(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!-- 地图选择对话框 -->
    <el-dialog title="选择经纬度" :visible.sync="dialogVisible" width="50%" @close="handleClose">
      <!-- 地图容器 -->
      <div id="map-container" style="height: 500px; width: 100%"></div>

      <!-- 显示选定的经纬度 -->
      <!--add-->
      <el-form v-if="opType==='add'" :model="tempLocation" ref="add" :rules="addRules" label-width="100px"
               style="margin-top: 20px;"
      >
        <el-form-item label="节点名" prop="nodeName">
          <el-input v-model="tempLocation.nodeName"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="tempLocation.lng" readonly></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="tempLocation.lat" readonly></el-input>
        </el-form-item>
      </el-form>
      <!--update-->
      <el-form v-else :model="tempLocation" label-width="100px" style="margin-top: 20px;">
        <el-form-item label="经度">
          <el-input v-model="tempLocation.lng" readonly></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="tempLocation.lat" readonly></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部的按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitLocation">确认</el-button>
      </span>
    </el-dialog>

    <!--updateForm-->
    <el-dialog title="修改节点名" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="节点名" label-width="120px" prop="nodeName">
          <el-input v-model="updateList.nodeName" autocomplete="off"></el-input>
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
          <el-button type="success" @click="() => {opType = 'add';openDialog(null)}" plain>新增</el-button>
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
              prop="businessPeopleCount"
              label="节点下业务员数量"
              width="150"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="330"
            >
              <template slot-scope="scope">
                <el-button @click="showUpdate(scope.row)" type="primary" plain
                           size="small"
                >
                  修改{{ name }}名
                </el-button>
                <el-button @click="openDialog(scope.row, false)" type="success" plain
                           size="small"
                >
                  修改{{ name }}坐标
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
