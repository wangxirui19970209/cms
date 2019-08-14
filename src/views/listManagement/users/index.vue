<template>
  <div>
    <section>
      <el-form ref="formsearch" :inline="true">
        <el-form-item label="身份证号">
          <el-input v-model="search.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="search.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="search.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">搜索</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section>
      <el-table :data="tableData">
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="name" label="套餐名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="deleteUser(scope.row.idCard)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="count"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: {
        name: '',
        idCard: '',
        phone: '',
      },
      pageSize: 5,
      count: 1,
      total: 0,
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.tableData = []
      this.$api.listManagement.pageUser({
        ...this.search,
        pageSize: this.pageSize,
        count: this.count
      }).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.page
          this.total = res.data.total
        }
      })
    },
    deleteUser(idCard) {
      this.$confirm('是否删除用户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$api.listManagement.userRemove({
          idCard,
        }).then((res) => {
          if (res.code === 0) {
            this.getUsers()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.count = val
      this.getUsers()
    }
  }
}
</script>

<style scoped>

</style>