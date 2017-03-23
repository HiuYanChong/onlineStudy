<template>
  <div id="navigation">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">课程分类</template>
        <el-menu-item index="2-1">移动开发</el-menu-item>
        <el-menu-item index="2-2">前端开发</el-menu-item>
        <el-menu-item index="2-3">后端开发</el-menu-item>
        <el-menu-item index="2-4">运维与测试</el-menu-item>
        <el-menu-item index="2-5">大数据</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="!isLogin" class="login">
        <template slot="title">登录/注册</template>
        <el-menu-item index="3-1">登录</el-menu-item>
        <el-menu-item index="3-2">注册</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="sass">
  #navigation {
   .login {
     float: right;
   }
  }
</style>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'

  Vue.use(ElementUI);

  export default {
    data() {
      return {
        activeIndex: '1',
        isLogin: false,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>