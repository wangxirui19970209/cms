
  

<template>
<section>
  <el-form class="form" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px">
    <el-form-item
      prop="name"
      label="工作室名称"
      :rules="[
        { required: true, message: '请输入工作室名称', trigger: 'blur' }
      ]"
    >
      <el-input v-model="dynamicValidateForm.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="phone"
      label="联系方式"
      :rules="[
        { required: true, message: '请输入工作室联系方式', trigger: 'blur' }
      ]"
    >
      <el-input v-model="dynamicValidateForm.phone"></el-input>
    </el-form-item>
    <el-form-item
      v-for="(slogan, index) in dynamicValidateForm.slogans"
      :label="'宣传口号' + index"
      :key="slogan.key"
      :prop="'slogans.' + index + '.value'"
      :rules="{
        required: true, message: '宣传口号不能为空', trigger: 'blur'
      }"
    >
      <el-input v-model="slogan.value">
        <template slot="append">
          <el-button v-if="index === 0" @click.prevent="addSlogan">新增</el-button>
          <el-button v-else @click.prevent="removeSlogan(slogan)">删除</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">点击修改工作室简介</el-button>
    </el-form-item>
  </el-form>
</section>
</template>
<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          slogans: [{
            value: ''
          }],
          name: '',
          phone: '',
        }
      };
    },
    mounted() {
      this.$api.introduction.getDetail().then((res)=>{
        this.dynamicValidateForm = res.data || {}
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否修改工作室简介?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$api.introduction.update({
                slogans: JSON.stringify(this.dynamicValidateForm.slogans),
                name: this.dynamicValidateForm.name,
                phone: this.dynamicValidateForm.phone,
              }).then((res)=>{
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                }
              })
            }).catch(() => {})
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeSlogan(item) {
        var index = this.dynamicValidateForm.slogans.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.slogans.splice(index, 1)
        }
      },
      addSlogan() {
        this.dynamicValidateForm.slogans.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.form {
  width: 40%;
  margin: 0 auto;
}
</style>
