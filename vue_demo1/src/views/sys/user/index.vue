<template>
  <div>
    <el-card>

      <el-table2 ref="table1" :tbdata="tbdata">
        <template v-slot:fpjs="slotProps">
          <el-button @click="wdfp(slotProps.data)" size="mini" type="success"> 分配角色</el-button>
        </template>
      </el-table2>

    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @opened="diaopen"
      :before-close="handleClose">
      <el-table2 ref="table2" @load="tableLoad" @insert="tableInsert" :tbdata="tbdata2">

      </el-table2>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "moduleMenu",
    data() {
      return {

        tbdata: {
          is_savebutton: true,
          is_selected: true,
          is_indexed: true,
          headerColumns: [
            {prop: 'userCode', label: '用户编码', editor: 'el-input', sort: 'custom', required: true, readonly: false}
            , {prop: 'userName', label: '用户名称', editor: 'el-input', required: true, readonly: false}
            , {prop: 'userPwd', label: '用户密码', editor: 'el-input', required: true, readonly: false}
            , {prop: 'isUse', label: '是否启用', editor: 'el-checkbox', required: true, readonly: false}
            , {label: '操作', soltName: 'fpjs'}
          ],

          autoQuery: true,
          is_page: true,
          queryPara: [{prop: 'userCode', label: '用户编码', editor: 'input'}, {
            prop: 'userName',
            label: '用户名称',
            editor: 'el-input'
          }],
          is_querybutton: true,
          base_url: '/provider/sys/user',
        },
        tbdata2: {

          is_selected: false,

          headerColumns: [{prop: 'roleCode', label: '角色编号'},
            {
              prop: 'roleName', label: '角色名称', editor: 'el-lov', initData: {
                headerColumns: [{prop: 'roleCode', label: '角色编号'}
                  , {prop: 'roleName', label: '角色名称'}
                ],
                base_url: '/provider/sys/role',
                queryPara: [[{prop: 'roleCode', label: '角色编号'}, {prop: 'roleName', label: '角色名称'}]],
                queryPara3 :{
                  isUse:'Y'
                },
                mapping:{
                  roleCode:'roleCode',
                  roleName:'roleName',
                  roleId:'roleId'
                }
              },

            },
            {prop: 'isUse', label: '是否启用', editor: 'el-checkbox'}

          ],
          base_url: '/provider/sys/user-role',
          autoQuery: false,
          is_page: false,
          is_querybutton: false,
          queryPara3: {},
          tableButton: {
            insertButton: true,
            deleteButton: true,
            saveButton: true,
          }
        },
        dialogVisible: false

      }

    },
    methods: {
      wdfp(row) {
        this.dialogVisible = true
        this.tbdata2.queryPara3.userId = row.row.userId

      },
      diaopen() {
        this.$refs.table2.query()
      },
      handleClose(done) {
        done()
      },
      tableLoad(records){
        for(let record of records){
           record['userId']=this.tbdata2.queryPara3.userId
        }
      },
      tableInsert(record){
        record['userId']=this.tbdata2.queryPara3.userId
      }
    }
  }
</script>

<style scoped>

</style>
