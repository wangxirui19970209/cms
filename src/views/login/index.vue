<template>
<div class="wrapper">
  <div class="bg">
    <div class="window-wrapper">
      <div class="window">
        <h2>SEA后台管理系统</h2>
        <div class="input-wrapper">
          <label for="login-name" class="label-words">用户名</label>
          <input id="login-name" type="text" v-model="form.name"/>
        </div>
        <div class="input-wrapper">
          <label for="login-password" class="label-words">密码</label>
          <input id="login-password" type="password" v-model="form.passwd"/>
        </div>
        <el-button class="login-btn" @click="submit">登录</el-button>
      </div>
    </div>
  </div>
  <footer class="footer">©{{new Date().getFullYear()}}瑞瑞大人有限公司</footer>
</div>
</template>
<script>
export default {
  name: 'SeaLogin',
  beforeCreate () {
    const shAdmin = window.localStorage['shAdmin'] ? JSON.parse(window.localStorage['shAdmin']) : null
    const isLogin = !!shAdmin
    if (isLogin) {
      this.$notify({
        title: '提示',
        message: '你已登录',
        type: 'success'
      })
      this.$router.push('/')
      this.$store.commit('SET_IS_LOGIN', true)
      this.$store.commit('SET_SHADMIN', shAdmin)
    } else {
      this.$store.commit('SET_IS_LOGIN', false)
    }
  },
  data () {
    return {
      form: {
        name: '',
        passwd: ''
      }
    }
  },
  methods: {
    submit () {
      if (!this.form.name || !this.form.passwd) {
        this.$message({
          type: 'warning',
          message: '用户名或密码不能为空'
        })
        return
      }
      const data = {
        userName: this.form.name,
        password: this.form.passwd
      }
      this.$api.login.submit(data).then((res) => {
        if (res.code === 0) {
          let data = res.data
          this.$store.commit('SET_SHADMIN', data)
          window.localStorage.setItem('shAdmin', JSON.stringify(data))
          this.$router.push('/')
        } else {
          this.$message({
          type: 'warning',
          message: res.msg
        })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
input:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 99999s ease-in-out 0s;
}
.wrapper {
  height: 100%;
  overflow: hidden;
  .bg {
    height: 100vh;
    background: url(./img/bg-login.jpg) no-repeat center center;
    background-size: cover;
  }
}
.window-wrapper {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  .window {
    padding-top: 40px;
    margin: 0 auto;
    z-index: 1;
    width: 420px;
    height: 360px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    text-align: center;
    h2 {
      font-weight: 400;
      font-size: 28px !important;
      color: #ffffff;
      letter-spacing: 4px;
      text-align: center;
      margin-top: 0 !important;
      margin-bottom: 60px !important;
    }
    .is-ldap {
      margin-bottom: 30px;
    }
    .input-wrapper {
      width: 300px;
      margin: 0 auto;
      border-bottom: 1px solid #ccc;
    }
    .label-words {
      color: white;
      display: inline-block;
      width: 75px;
      font-size: 14px;
      margin-left: -10px;
    }
    .input-wrapper + .input-wrapper {
      margin-top: 30px;
    }
    input[type="text"],
    input[type="password"],
    input[type="number"] {
      padding: 0;
      border: none;
      text-indent: 0.5em;
      background: none;
      outline: none;
      color: #ccc;
      line-height: 32px;
      height: 32px;
      box-sizing: border-box;
      font-size: 14px;
      width: 225px;
    }
    input[type="text"]:focus,
    input[type="password"]:focus,
    input[type="number"]:focus {
      border-bottom-color: #fff;
      color: #fff;
    }
    .login-btn {
      margin-top: 60px;
      display: inline-block;
      width: 300px;
      height: 50px;
      border-radius: 8px;
    }
    .to-signin {
      margin-top: 20px;
      font-size: 14px;
      color: #e6e6e6;
      a {
        cursor: pointer;
        color: #ffba00;
      }
    }
  }
}
footer {
  position: absolute;
  width: 100%;
  height: 46px;
  background-color: black;
  text-align: center;
  line-height: 46px;
  font-size: 10px;
  color: white;
  bottom: 0;
}
</style>
