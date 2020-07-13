<template>
  <el-table-column
    prop="userCode"
    label="用户编号"
    width="180">
    <template slot-scope="scope">
      <el-input size="small" v-model="scope.row.userCode" placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"></el-input>
    </template>
  </el-table-column>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'el-table-column2',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {


  }
}
</script>

<style scoped>

</style>
