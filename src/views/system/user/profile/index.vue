<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24"><h2></h2></el-col>
      <el-col :span="12" :xs="24">
        <div class="content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div>
              <div class="text-center">
                <userAvatar />
              </div>
              <ul class="list-group list-group-striped">
                <li class="list-group-item">
                  <svg-icon icon-class="user" /> 用户名称
                  <div class="pull-right">{{ user.userName }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="phone" /> 手机号码
                  <div class="pull-right">{{ user.phonenumber }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="email" /> 用户邮箱
                  <div class="pull-right">{{ user.email }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="tree" /> 所属部门
                  <div class="pull-right" v-if="user.dept">{{ user.dept.deptName }} / {{ postGroup }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="peoples" /> 所属角色
                  <div class="pull-right">{{ roleGroup }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="date" /> 创建日期
                  <div class="pull-right">{{ user.createTime }}</div>
                </li>
              </ul>
            </div>
          </el-card>
          <el-card class="r-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基本资料" name="userinfo">
                <userInfo :user="user" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="resetPwd">
                <resetPwd />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6"><div></div></el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo"
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.app-container {
  background-color: #eeeeee;
  .content {
    display: flex;
    flex-direction: column;

    .el-card {
      margin-bottom: 20px;

      &:hover {
        border: 1px solid #00afff;
        box-shadow: 0 0 2px 0 #ccc;
        transform: scale(1.05);
      }
    }
  }
}
</style>
