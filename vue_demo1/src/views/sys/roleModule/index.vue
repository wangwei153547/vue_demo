<template>
  <div>
    <el-card>

      <el-table2  ref="table1" :tbdata="tbdata">
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
      <el-table2 @load="tbload" ref="table2" :tbdata="tbdata2">
      </el-table2>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "roleModule",
    data() {
      return {
        tbdata: {
          is_savebutton: true,
          is_selected: true,
          is_indexed: true,
          headerColumns: [{prop: 'roleCode', label: '角色编号', editor: 'el-input', sort: 'custom', readonly: false}
            , {prop: 'roleName', label: '角色名称', editor: 'el-input'}
            , {prop: 'isUse', label: '是否启用', editor: 'el-checkbox'}
            , {label: '操作', soltName: 'fpjs'}
          ],
          base_url: '/provider/sys/role',
          autoQuery: true,
          is_page: true,
          queryPara: [{prop: 'roleCode', label: '角色编号', editor: 'input'}, {
            prop: 'roleName',
            label: '角色名称',
            editor: 'el-input'
          }],
          is_querybutton: true
        },
        tbdata2: {

          is_selected: false,

          headerColumns: [{prop: 'moduleCode', label: '模块编号'}
            , {prop: 'moduleName', label: '模块名称'}
            , {prop: 'isHas', label: '是否启用',editor:'el-checkbox'  }

          ],
          base_url: '/provider/sys/role-module',
          queryUrl: '/provider/sys/role-module/getUserModule3',
          autoQuery: false,
          theaderPara: {
            treeProps: {children: 'childModule', hasChildren: 'hasChildren'},
            rowKey: "moduleId"
          },
          is_page: false,
          is_querybutton: false,
          queryPara3: {
          },
          tableButton:{
            insertButton:false,
            deleteButton:false,
            saveButton:true,
          }



        },

        dialogVisible: false


      }
    },
    created() {

    },
    methods: {
      handleClose(done) {
        done()
      },
      wdfp  (row) {
        this.dialogVisible = true
        this.tbdata2.queryPara3.roleId=row.row.roleId

      }
      ,
      diaopen(){
        this.$refs.table2.query()
      },
      tbload(records){


      }
    }
  }
</script>

<style scoped>

</style>
