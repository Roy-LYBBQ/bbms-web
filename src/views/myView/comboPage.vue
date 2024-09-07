<script>
import { comboList } from '@/api/myApi/combo'
import { accountAddCombo, accountGetCombo } from '@/api/myApi/account'
import { Message } from 'element-ui'

export default {
  name: 'comboPage',
  data() {
    return {
      total: 1,
      comboList: {},
      defaultImg: require('@/assets/images/defaultImg.webp'),
      searchList: {
        comboName: '',
        unit: '',
        bandwidth: '',
        pageSize: 5,
        pageNum: 1
      }
    }
  },
  methods: {
    getCombo(data) {
      comboList(data).then(res => {
        this.total = res.total
        this.comboList = res.rows
      })
    },
    bookCombo(id) {
      accountAddCombo(id).then(res => {
        Message.success('订阅成功')
      })
    },
    handleCurrentChange(page) {
      this.searchList.pageNum = page
      this.getCombo(this.searchList)
    },
  },
  created() {
    this.getCombo(this.searchList)
  }
}
</script>

<template>
  <div id="container">
    <div class="search-box box">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="套餐名">
          <el-input v-model="searchList.comboName" placeholder="填写套餐名"></el-input>
        </el-form-item>
        <el-form-item label="周期">
          <el-select v-model="searchList.unit" placeholder="选择周期">
            <el-option label="月" value="0"></el-option>
            <el-option label="年" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽（兆）">
          <el-input v-model="searchList.bandwidth" placeholder="填写带宽"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCombo(searchList)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex">
      <div class="left">
        <div class="main-box">
          <div v-if="total === 0" style="padding: 20px; color: #bbb">暂无数据</div>
          <div v-for="item in comboList">
            <div class="combo box">
              <div style="display: flex">
                <div class="pic">
                  <img width="150px" height="150px" :src="item.comboImage === null ? defaultImg : item.comboImage"
                       alt="combo"
                  >
                </div>
                <div class="des">
                  <p class="name">套餐名称：{{ item.comboName}}</p>
                  <p class="p">期限：{{ item.value}} {{ item.unit === 0 ? '月' : '年'}}</p>
                  <p class="p">带宽：{{ item.bandwidth}} 兆</p>
                  <p class="p">价格：{{ item.price}} / {{ item.unit === 0 ? '月' : '年'}}</p>
                </div>
              </div>
              <div>
                <el-button type="primary" plain @click="bookCombo(item.comboId)">订阅</el-button>
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
