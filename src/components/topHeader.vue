<template>
  <div class="header-bg">
    <span class="header-left">欢迎登陆管理系统 . <a href="javascript:;" @click="accountLogout">退出</a></span>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        工作室简介
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">订单管理</el-menu-item>
        <el-menu-item index="2-2">用户管理</el-menu-item>
        <el-menu-item index="2-3">套餐管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "topHeader",
    data() {
      return {
        activeIndex: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key == '1') {
          this.$router.push('/')
        }
        if (key == '2-1') {
          this.$router.push('/orders')
        }
        if (key == '2-2') {
          this.$router.push('/users')
        }
        if (key == '2-3') {
          this.$router.push('/offers')
        }
      },
      accountLogout() {
        const shAdmin = window.localStorage['shAdmin'] ? JSON.parse(window.localStorage['shAdmin']) : null
        this.$api.login.accountLogout().then(() => {
          this.$store.commit('SET_IS_LOGIN', false)
          this.$store.commit('SET_SHADMIN', {})
          window.localStorage.removeItem('shAdmin')
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .header-bg {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    color: #fff;
    border-bottom: solid 1px #e6e6e6;
  }

</style>