<template>
  <div>
    <section>
      <el-form ref="formsearch" :inline="true">
        <el-form-item label="套餐ID">
          <el-input v-model="search.offerId" placeholder="请输入订单ID"></el-input>
        </el-form-item>
        <el-form-item label="套餐名">
          <el-input v-model="search.name" placeholder="请输入套餐名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOffers">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="offers/detail?type=add">
            <el-button type="primary">新增</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </section>
    <section>
      <el-table :data="tableData">
        <el-table-column prop="offerId" label="套餐ID" />
        <el-table-column prop="name" label="套餐名" />
        <el-table-column prop="detail" label="套餐描述" />
        <el-table-column prop="people" label="预定人数" />
        <el-table-column prop="time" label="发布时间">
          <template slot-scope="scope">
            {{ scope.row.time ? $moment(scope.row.time).format('YYYY-MM-DD hh:mm:ss') : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="number" label="拍摄套数" />
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            <a href="javascript:;" @click="deleteOffer(scope.row.offerId)">删除</a>
            <router-link :to="`offers/detail?offerId=${scope.row.offerId}`">编辑</router-link>
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
        offerId: ''
      },
      pageSize: 5,
      count: 1,
      total: 0,
    }
  },
  mounted() {
    this.getOffers()
  },
  methods: {
    getOffers() {
      this.tableData = []
      const searchData = {}
      if (this.search.name) {
        searchData.name = this.search.name
      }
      if (this.search.offerId) {
        searchData.offerId = this.search.offerId
      }
      this.$api.listManagement.offerPage({
        search: JSON.stringify(searchData),
        pageSize: this.pageSize,
        count: this.count
      }).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.page
          this.total = res.data.total
        }
      })
    },
    deleteOffer(offerId) {
      this.$confirm('是否删除此套餐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$api.listManagement.offerRemove({
          offerId,
        }).then((res) => {
          if (res.code === 0) {
            this.getOffers()
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
      this.getOffers()
    },
    handleCurrentChange(val) {
      this.count = val
      this.getOffers()
    }
  }
}
</script>

<style scoped>

</style>