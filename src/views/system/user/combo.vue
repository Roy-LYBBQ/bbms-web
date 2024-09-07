<script>

import {
  adminComboAdd,
  adminComboAddImg,
  adminComboDel,
  adminComboList,
  adminComboUpdate,
  uploadFile
} from '@/api/forAdmin'
import { Message } from 'element-ui'

export default {
  name: 'combo',
  data() {
    return {
      name: '套餐',
      total: 1,
      defaultImg: require('@/assets/images/defaultImg.webp'),
      comboList: {},
      searchList: {
        comboName: '',
        unit: '',
        bandwidth: '',
        pageSize: 5,
        pageNum: 1
      },
      addList: { comboName: '', unit: 0, value: 0, price: '', bandwidth: 0 },
      addVisible: false,
      addRules: {
        comboName: [
          { required: true, message: '请填写服务名', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择期限单位', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请填写期限数值', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value <= 0 || !Number.isInteger(value)) {
                callback(new Error('请输入正整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
        price: [
          { required: true, message: '请填写价格（元）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const data = Number.parseFloat(value)
              if (Number.isNaN(data) && !Number.isFinite(data)) {
                callback(new Error('请输入合法的数字'))
              } else if (Math.abs(data - 0.01) < 1e-3) {
                callback(new Error('请输入合法价格'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        bandwidth: [
          { required: true, message: '请填写带宽（兆）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value <= 0) {
                callback(new Error('请输入正数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      updateList: { comboId: '', comboName: '', unit: 0, value: 0, price: '', bandwidth: 0 },
      updateVisible: false,
      updateRules: {
        comboName: [
          { required: true, message: '请填写服务名', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择期限单位', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请填写期限数值', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value <= 0 || !Number.isInteger(value)) {
                callback(new Error('请输入正整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
        price: [
          { required: true, message: '请填写价格（元）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const data = Number.parseFloat(value)
              if (Number.isNaN(data) && !Number.isFinite(data)) {
                callback(new Error('请输入合法的数字'))
              } else if (Math.abs(data - 0.01) < 1e-3) {
                callback(new Error('请输入合法价格'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        bandwidth: [
          { required: true, message: '请填写带宽（兆）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!Number.isFinite(value)) {
                callback(new Error('请输入合法的数字'))
              } else if (value <= 0) {
                callback(new Error('请输入正数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      curComboId: ''
    }
  },
  methods: {
    getCombo(data) {
      return adminComboList(data).then(res => {
        this.total = res.total
        this.comboList = res.rows
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
        comboId: item.comboId,
        comboName: item.comboName,
        unit: item.unit,
        value: item.value,
        price: item.price,
        bandwidth: item.bandwidth
      }
    },

    resetAddList() {
      this.addList = { comboName: '', unit: null, value: null, price: '', bandwidth: null }
    },

    resetUpdateList() {
      this.updateList = { comboId: '', comboName: '', unit: null, value: null, price: '', bandwidth: null }
    },

    updateCombo(data) {
      this.$refs.update.validate(res => {
        if (res) {
          adminComboUpdate(data).then(res => {
            Message.success(`修改${this.name}成功`)
            this.updateVisible = false
            return this.getCombo(this.searchList)
          })
        }
      })
    },

    delCombo(id) {
      adminComboDel(id).then(res => {
        Message.success(`删除${this.name}成功`)
        return this.getCombo(this.searchList)
      })
    },

    addCombo(data) {
      this.$refs.add.validate(res => {
        if (res) {
          adminComboAdd(data).then(res => {
            Message.success(`添加${this.name}成功`)
            this.addVisible = false
            return this.getCombo(this.searchList)
          })
        }
      })
    },

    // 页数变动
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getCombo(this.searchList)
    },
    // 上传图片
    handleFileChange(event, id) {
      console.log(id)
      this.curComboId = id
      const file = event.target.files[0]
      if (file) {
        uploadFile(file).then(res => {
          const comboImage = res.data.url
          const data = {
            comboId: this.curComboId,
            comboImage
          }
          // 更新套餐图片信息
          return adminComboAddImg(data)
        }).then(res => {
          Message.success('上传图片成功')
          // 重新获取套餐
          return this.getCombo(this.searchList)
        })
      }
    }
  },
  created() {
    this.getCombo(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <!--addForm-->
    <el-dialog title="新增套餐" :visible.sync="addVisible">
      <el-form ref="add" :rules="addRules" :model="addList">
        <el-form-item label="套餐名称" label-width="120px" prop="comboName">
          <el-input v-model="addList.comboName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="期限单位" label-width="120px" prop="unit">
          <el-select v-model="addList.unit" placeholder="请选择期限单位">
            <el-option label="月" value="0"></el-option>
            <el-option label="年" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期限数" label-width="120px" prop="value">
          <el-input v-model.number="addList.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="addList.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="带宽（兆）" label-width="120px" prop="bandwidth">
          <el-input v-model.number="addList.bandwidth" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCombo(addList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--updateForm-->
    <el-dialog title="修改套餐" :visible.sync="updateVisible">
      <el-form ref="update" :rules="updateRules" :model="updateList">
        <el-form-item label="套餐名称" label-width="120px" prop="comboName">
          <el-input v-model="updateList.comboName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="期限单位" label-width="120px" prop="unit">
          <el-select v-model="updateList.unit" placeholder="请选择期限单位">
            <el-option label="月" value="0"></el-option>
            <el-option label="年" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期限数" label-width="120px" prop="value">
          <el-input v-model.number="updateList.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="updateList.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="带宽（兆）" label-width="120px" prop="bandwidth">
          <el-input v-model.number="updateList.bandwidth" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCombo(updateList)">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索-->
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="套餐名">
          <el-input v-model="searchList.comboName" placeholder="填写套餐名"></el-input>
        </el-form-item>
        <el-form-item label="期限单位">
          <el-select v-model="searchList.unit" placeholder="选择期限单位">
            <el-option label="无" value=""></el-option>
            <el-option label="月" value="0"></el-option>
            <el-option label="年" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽（兆）">
          <el-input v-model="searchList.bandwidth" placeholder="填写带宽"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCombo(searchList)" plain>查询</el-button>
          <el-button type="success" @click="showAdd()" plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <div v-if="total === 0" style="padding: 20px; color: #bbb">暂无数据</div>
          <div v-for="(item, index) in comboList">
            <div class="combo box">
              <div style="display: flex">
                <div class="pic">
                  <img width="150px" height="150px" :src="item.comboImage === null ? defaultImg : item.comboImage"
                       alt="combo"
                  >
                </div>
                <div class="des">
                  <p class="name">套餐名称：{{ item.comboName }}</p>
                  <p class="p">期限：{{ item.value }} {{ item.unit === 0 ? '月' : '年' }}</p>
                  <p class="p">带宽：{{ item.bandwidth }} 兆</p>
                  <p class="p">价格：{{ item.price }} / {{ item.unit === 0 ? '月' : '年' }}</p>
                </div>
              </div>
              <div>
                <label :for="'fileInput_' + index" class="input-button" title="选择套餐图片进行上传"
                       style="display: inline-block;
                          padding: 6px 10px;
                          background-color: #1E9FFF;
                          border: 1px solid #1E9FFF;
                          border-radius: 3px;
                          cursor: pointer;
                          color: #fff;
                          font-size: 12px;
                          margin-right: 20px;
                          "
                >修改图片</label>
                <input :id="'fileInput_' + index" type="file" @change="handleFileChange($event, item.comboId)" style="display: none;">
                <el-button type="primary" plain @click="showUpdate(item)">修改</el-button>
                <el-button type="danger" plain @click="delCombo(item.comboId)">删除</el-button>
              </div>
            </div>
          </div>
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
          <!--<div id="title">个人信息</div>-->
          <!--<p class="p">电话：{{user.phoneNumber}}</p>-->
          <!--<p class="p">邮箱：{{user.email}}</p>-->
          <!--<p class="p">余额（￥）：{{user.amount}}</p>-->
          <!--<p class="p">经度：{{ user.longitude === null ? defaultInfo : user.longitude}}</p>-->
          <!--<p class="p">纬度：{{ user.latitude === null ? defaultInfo : user.latitude}}</p>-->
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
      .combo {
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
