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
        <el-menu-item index="2-6">其他</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-show="!isLogin" class="login">
        <template slot="title">登录/注册</template>
        <el-menu-item index="3-1">注册</el-menu-item>
        <el-menu-item index="3-2">登录</el-menu-item>
      </el-submenu>
      <el-submenu index="4" v-show="isLogin" class="login">
        <template slot="title">你好, {{ this.name }}</template>
        <el-menu-item index="4-1">个人中心</el-menu-item>
        <el-menu-item index="4-2">登出</el-menu-item>
      </el-submenu>
    </el-menu>


    <loginDia ref="loginDia"></loginDia>

    <registerDia ref="registerDia"></registerDia>

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
  import loginDia from '../loginDia/loginDia.vue'
  import registerDia from '../registerDia/registerDia.vue'
  import Bus from '../../component/bus.vue';

  Vue.use(ElementUI);

  export default {
    data() {
      return {
        activeIndex: '1',
        isLogin: false,
        name: '',
        role: '', // 1:老师 2:学生
        id: '',
      };
    },
    components: {
      loginDia,
      registerDia,
    },
    mounted() {
      this.$http.get('/api/checkLogin').then(res => {
        const data = res.body.data;
        if (data && data.isLogin === true) {
          this.isLogin = true;
          this.name = data.name;
          this.role = data.role;
          this.id = data.id;
          Bus.$emit('CHECK_LOGIN_DONE', {
            name: data.name,
            role: data.role,
            id: data.id,
          });
        }
      }, error => {
        console.error(error);
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key.toString()) {
          case '1':
            window.location.href = '/';
            break;
          case '2-1':
            window.location.href = `/home?type=mobile`;
            break;
          case '2-2':
            window.location.href = `/home?type=FE`;
            break;
          case '2-3':
            window.location.href = `/home?type=server`;
            break;
          case '2-4':
            window.location.href = `/home?type=testing`;
            break;
          case '2-5':
            window.location.href = `/home?type=bigData`;
            break;
          case '2-6':
            window.location.href = `/home?type=other`;
            break;
          case '3-1':
            this.$refs.registerDia.dialogFormVisible = true;
            break;
          case '3-2':
            this.$refs.loginDia.dialogFormVisible = true;
            break;
          case '4-1':
            window.location.href = `/person/${this.id}`;
            break;
          case '4-2':
            this.logout();
            break;
          default: break;
        }
      },
      logout() {
        this.$http.get('/api/logout').then(res => {
          if (res.body.data.isLogout) {
            window.location.href = '/';
          }
        });
      }
    },
  }
</script>