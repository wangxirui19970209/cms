
  

<template>
<section>
  <el-form class="form" :model="offer" ref="offer" label-width="100px">
    <el-form-item
      prop="offerId"
      label="套餐ID"
      :rules="[
        { required: true, message: '请输入套餐ID', trigger: 'blur' }
      ]"
    >
      <el-input :disabled="type !== 'add'" v-model="offer.offerId"></el-input>
    </el-form-item>
    <el-form-item
      prop="name"
      label="套餐名称"
      :rules="[
        { required: true, message: '请输入套餐名称', trigger: 'blur' }
      ]"
    >
      <el-input v-model="offer.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="number"
      label="拍摄套数"
      :rules="[
        { required: true, message: '请输入拍摄套数', trigger: 'blur' }
      ]"
    >
      <el-input v-model="offer.number"></el-input>
    </el-form-item>
    <el-form-item
      prop="detail"
      label="套餐描述"
      :rules="[
        { required: true, message: '请输入套餐描述', trigger: 'blur' }
      ]"
    >
      <el-input type="textarea" :rows="3" v-model="offer.detail"></el-input>
    </el-form-item>
    <el-form-item
      prop="minPrice"
      label="套餐最低价"
      :rules="[
        { required: true, message: '请输入套餐最低价', trigger: 'blur' }
      ]"
    >
      <el-input v-model="offer.minPrice"></el-input>
    </el-form-item>
    <el-form-item
      prop="maxPrice"
      label="套餐最高价"
      :rules="[
        { required: true, message: '请输入套餐最高价', trigger: 'blur' }
      ]"
    >
      <el-input v-model="offer.maxPrice"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="type === 'add'" @click="resetForm('offer')">重置</el-button>
      <el-button type="primary" @click="submitForm('offer')">确定</el-button>
    </el-form-item>
  </el-form>
</section>
</template>
<script>
  export default {
    data() {
      return {
        type: this.$route.query.type || '',
        offer: {
          detail: '',
          maxPrice: '',
          minPrice: '',
          name: '',
          number: '',
          offerId: ''
        }
      };
    },
    mounted() {
      if (this.type !== 'add') {
        this.getOffer(this.$route.query.offerId)
      }
    },
    methods: {
      getOffer(offerId) {
        this.$api.listManagement.offer({
          search: JSON.stringify({offerId}),
        }).then((res)=>{
          this.offer = res.data.offers[0] || {}
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm(`是否确认${this.type === 'add' ? '增加' : '编辑'}?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              if (this.type === 'add'){
                if (!this.offer.time) {
                  this.offer.time = new Date().getTime()
                }
                this.offer.people = 0
                this.$api.listManagement.offerAdd(this.offer).then((res)=>{
                  if (res.code === 0) {
                    this.$message({
                      type: 'success',
                      message: '操作成功!'
                    })
                    this.$router.push('/offers')
                  } else {
                    this.$message({
                      type: 'error',
                      message: res.data
                    })
                  }
                })
              } else {
                this.$api.listManagement.offerUpdate(this.offer).then((res)=>{
                  if (res.code === 0) {
                    this.$message({
                      type: 'success',
                      message: '操作成功!'
                    })
                    this.$router.push('/offers')
                  }
                })
              }
            }).catch(() => {})
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
