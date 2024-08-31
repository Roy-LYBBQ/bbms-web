<script>
export default {
  name: 'footNav'
}
</script>

<template>
  <el-footer>
    <div id="footer">
      <el-row style="border-bottom: 1px solid #8c8c8c">
        <el-col :span="12">
          <div class="left nav">
            <ul class="nav-ul">
              <li><a href="#">nav1</a></li>
              <li><a href="#">nav2</a></li>
              <li><a href="#">nav3</a></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right nav">
            <ul class="nav-ul">
              <li><a href="#">nav1</a></li>
              <li><a href="#">nav2</a></li>
              <li><a href="#">nav3</a></li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="copyright">
            <div class="des">Copyright©2024-20xx NWPU 版权所有</div>
            <div class="des">Form Northwestern Polytechnical University *2024 🏳️‍🌈 ²⁰²⁴/₀₈.₂₇ᵕ̈.</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-footer>

</template>

<style scoped lang="scss">
$bg-color-light: #eee;
$bg-color-dark: #ddd;

#footer {
  background-image: linear-gradient($bg-color-light, $bg-color-dark);
  height: 300px;
  margin: 0 200px;
  padding: 20px 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #707070;

  .nav {
    text-align: center;

    .nav-ul {
      list-style: none;

      li {
        margin-bottom: 10px;

        a {
          &:hover {
            color: #2e44bb;
            text-decoration: underline #2e44bb;
          }
        }
      }
    }
  }

  .copyright {
    margin-top: 10px;
    text-align: center;
    .des {
      line-height: 24px;
    }
  }
}

</style>
