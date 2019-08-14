<template>
  <div>
    <section>
      <el-form ref="formsearch" :inline="true">
        <el-form-item label="订单状态">
          <el-select v-model="search.status" placeholder="请选择订单状态" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="套餐ID">
          <el-input v-model="search.offerId" placeholder="请输入订单ID"></el-input>
        </el-form-item>
        <el-form-item label="用户身份证号">
          <el-input v-model="search.idCard" placeholder="请输入用户身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrders">搜索</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section>
      <el-table :data="tableData">
        <el-table-column prop="offerId" label="套餐ID" />
        <el-table-column prop="offerName" label="套餐名" />
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            {{statusMap[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" class="link" v-if="scope.row.status === 1" @click="lookUser(scope.row)">处理订单</a>
            <a href="javascript:;" class="link" v-if="[2, 3].includes(scope.row.status)" @click="closeOrder(scope.row)">关闭订单</a>
          </template>
        </el-table-column>
        <el-table-column prop="reservationTime" label="预定时间" />
        <el-table-column prop="time" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.time ? $moment(scope.row.time).format('YYYY-MM-DD hh:mm:ss') : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="idCard" label="身份证号" />
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
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="400px">
      <el-form ref="form" :model="userInfo" label-width="80px">
        <el-form-item label="姓名">
          {{ userInfo.name }}
        </el-form-item>
        <el-form-item label="年龄">
          {{ userInfo.age }}
        </el-form-item>
        <el-form-item label="身份证号">
          {{ userInfo.idCard }}
        </el-form-item>
        <el-form-item label="手机号">
          {{ userInfo.phone }}
        </el-form-item>
        <el-form-item label="预定时间">
          <el-input v-model="reservationTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="operation(2)">确认预约</el-button>
        <el-button type="primary" @click="operation(3)">取消预约</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageSize: 5,
      count: 1,
      total: 0,
      statusOptions: [
        { value: 1, label: '待处理' },
        { value: 2, label: '预约成功' },
        { value: 3, label: '预约失败' },
        { value: 4, label: '已关单' }
      ],
      statusMap: {
        1: '待处理',
        2: '预约成功',
        3: '预约失败',
        4: '已关单',
      },
      search: {
        status: '',
        offerId: '',
        idCard: '',
      },
      userInfo: {},
      dialogVisible: false,
      order: {},
      reservationTime: ''
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.tableData = []
      this.$api.listManagement.getOrders({
          ...this.search,
          count: this.count,
          pageSize: this.pageSize
        }).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.page
          this.total = res.data.total
        }
      })
    },
    lookUser(row) {
      this.dialogVisible = true
      this.userInfo = {}
      this.$api.listManagement.getUser({idCard: row.idCard}).then((res) => {
        if (res.code === 0) {
          this.order = row
          if (!res.data) {
            this.$message({
              type: 'error',
              message: '该用户不存在'
            })
            return
          }
          this.userInfo = res.data || {}
        }
      })
    },
    closeOrder(row) {
      this.$confirm('是否关闭此订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.order = row
        this.reservationTime = row.reservationTime
        this.operation(4)
      })
    },
    operation(status) {
      if (status === 2 && !this.reservationTime) {
        this.$message({
          type: 'error',
          message: '请填写预定时间!'
        })
        return
      }
      this.$api.listManagement.updateOrders({
        order: JSON.stringify(this.order),
        status,
        reservationTime: this.reservationTime
      }).then((res) => {
        if (res.code === 0) {
          this.dialogVisible = false
          this.getOrders()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrders()
    },
    handleCurrentChange(val) {
      this.count = val
      this.getOrders()
    }
  }
}
</script>

<style scoped>

</style>