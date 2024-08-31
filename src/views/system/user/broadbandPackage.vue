<script>
import FootNav from '@/components/FootNav/footNav.vue'

export default {
  name: 'broadbandPackage.Vue',
  components: { FootNav },
  data() {
    return {
      packageList: [{
        title: '套餐一',
        bandwidth: 'xxx',
        price: '100',
        chargeUnit: 'xx',
        chargeNum: '1'
      }, {
        title: '套餐二',
        bandwidth: 'xxx',
        price: '100',
        chargeUnit: 'xx',
        chargeNum: '1'
      }, {
        title: '套餐三',
        bandwidth: 'xxx',
        price: '100',
        chargeUnit: 'xx',
        chargeNum: '1'
      }]
    }
  }
}
</script>

<template>
  <div id="container">
    <el-row>
      <el-col :span="6">
        <h2></h2>
      </el-col>
      <el-col class="content-box" :span="12">
        <div class="card-list">
          <div class="box-card" v-for="item in packageList">
            <div class="card-info">
              <div class="img">
                <img src="http://img1.shop.10086.cn/goods/t45fdx7zxmkt8bwtuk_350x350.png" alt="">
              </div>
              <div class="des">
                <div class="title">{{ item.title }}</div>
                <div class="content">
                  <div class="info-box">
                    <div class="info">带宽：{{ item.bandwidth }}</div>
                    <div class="info">价格：{{ item.price }}</div>
                    <div class="info">计费单位：{{ item.chargeUnit }}</div>
                    <div class="info">计费数量：{{ item.chargeNum }}</div>
                  </div>
                  <div class="option">
                    <el-button type="primary" plain>op1</el-button>
                    <el-button type="info" plain>op2</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <div class="foot"><foot-nav></foot-nav></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
$bg-color: #F8F8F8;
@mixin flex() {
  display: flex;
}

#container {
  background-color: $bg-color;
  min-height: inherit;
  box-shadow: 0 0 10px 0 inset #ccc;
  padding: 20px 0 0;
  position: relative;

  .content-box {
    background-color: white;

    .card-list {
      .box-card {
        margin-bottom: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #ccc;
        transition: all 0.5s ease;

        &:hover {
          transform: scale(1.05);
        }

        &:last-of-type {
          margin-bottom: 0;
        }

        .card-info {
          @include flex;

          .img {
            width: 200px;
            height: 200px;
            overflow: hidden;

            img {
              transition: all 0.5s ease;
              width: inherit;
              height: auto;

              &:hover {
                transform: scale(1.05);
              }
            }
          }

          .des {
            width: calc(100% - 200px);
            margin: 20px 0;
            padding: 0 20px;
            color: #2F4873;

            .title {
              font-size: 20px;
              border-bottom: 1px solid #ccc;
              margin-bottom: 10px;
            }

            .content {
              display: flex;
              justify-content: space-between;

              .info-box {
                .info {
                  font-size: 16px;
                  line-height: 28px;
                }
              }

              .option {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px
              }
            }

          }
        }
      }
    }
  }

  //.foot {
  //  width: 100%;
  //  position: absolute;
  //  bottom: 0;
  //}
}
</style>
