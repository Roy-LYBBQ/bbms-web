<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h1>本项目介绍</h1>
        <h2>宽带业务管理系统</h2>
        <p>
          宽带业务管理系统，基于vue+springCloud的前后端分离微服务系统，提供管理员、业务员、用户三个端的操作服务。具有用户管理、套餐管理、订单管理、节点管理等功能，能完成基本的宽带业务流程。项目管理部分基于开源项目<span style="font-weight: bold">若依管理系统</span>实现，其特点是技术栈丰富、通过动态路由实现的界面快速搭建、权限系统等。但考虑到时间、工期和技术力等因素，本项目只复用了若依系统的部分已搭建完善的功能、接口和模块，其他部分均为自行实现。同时，由于若依系统的繁复性和相对独立的体系，项目本身可能存在一些微小的瑕疵，还望不吝赐教。
          最后，本项目的闪光点在于微服务架构的搭建和高德API的调用。
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>SpringCloud</li>
              <li>Nacos</li>
              <li>Redis</li>
              <li>RabbitMQ</li>
              <li>Redisson</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="3">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="8">
            <h4>其他技术</h4>
            <ul>
              <li>异步调用：线程池</li>
              <li>云服务：阿里云短信服务</li>
              <li>网关：Spring Cloud Gateway</li>
              <li>云服务：阿里云短信服务</li>
              <li>容器管理：Docker</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="8">
            <h4>项目开发环境</h4>
            <ul>
              <li>后端开发工具：IntelliJ IDEA</li>
              <li>前端开发工具：WebStorm</li>
              <li>Java版本：JDK 8</li>
              <li>虚拟机：VirtualBox</li>
              <li>Linux操作工具：MobaXterm</li>
              <li>MySQL版本：8.0</li>
              <li>Redis版本：3.2.x</li>
              <li>Nginx版本：1.20.1或更高</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          本项目后端地址：
          <el-link
            href="https://github.com/moonseeker1/broadband-system"
            type="primary"
            target="_blank"
            >https://github.com/moonseeker1/broadband-system</el-link
          >
          <br />
          本项目前端地址：
          <el-link
            href="https://github.com/Roy-LYBBQ/bbms-web"
            type="primary"
            target="_blank"
            >https://github.com/Roy-LYBBQ/bbms-web</el-link
          >
          <br />
          若依分布式系统框架地址：
          <el-link
            href="https://gitee.com/zhangmrit/ruoyi-cloud"
            type="primary"
            target="_blank"
            >https://gitee.com/zhangmrit/ruoyi-cloud</el-link
          >
          <br />
          若依官网地址：
          <el-link
            href="https://ruoyi.vip/"
            type="primary"
            target="_blank"
            >https://ruoyi.vip/</el-link
          >
        </blockquote>

        <hr />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>若依后台管理框架介绍</h2>
        <p>
          若依管理系统，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对她进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。同时支持移动客户端访问。系统会陆续更新一些实用功能。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">免费开源</el-tag>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>SpringCloud</li>
              <li>Nacos</li>
              <li>Sentinel</li>
              <li>Seata</li>
              <li>Minio</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Echarts</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.6.4",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

