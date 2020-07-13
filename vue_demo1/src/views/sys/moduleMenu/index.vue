<template>
    <div>
      <el-card>

      <el-table2 ref="table1" @insert="insert"  :tbdata="tbdata" >

      </el-table2>

      </el-card>
    </div>
</template>

<script>
    export default {
        name: "moduleMenu",
      data() {
        return {

          tbdata:{
                is_savebutton:true,
                is_selected:true,
                is_indexed:true,
                headerColumns:[{prop: 'moduleId' ,label:'ID' }
                  ,{prop: 'moduleCode' ,label:'菜单编码' ,editor:'el-input' ,sort:'custom',required:true,readonly:false}
                ,{prop: 'moduleName' ,label:'菜单名称',editor:'el-input'}
                  ,{prop: 'parentModuleId' ,label:'上级ID',editor:'el-input'}
                  ,{prop: 'moduleLevl' ,label:'级次',editor:'el-input'}
                  ,{prop: 'moduleUrl' ,label:'地址',editor:'el-input'}
                  ,{prop:  'sortNumber' ,label:'排序号',editor:'el-input',sort:'custom'}
                  ,{prop: 'isUse' ,label:'是否启用',editor:'el-checkbox'}
                ],

                 autoQuery:true,
                 is_page:false,
                 queryPara:[{prop: 'moduleCode' ,label:'菜单编号',editor:'input'},{prop: 'moduleName' ,label:'菜单名称',editor:'el-input'}],
                 is_querybutton:true,
                 base_url:'/provider/sys/module-menu',
                 queryUrl:'/provider/sys/role-module/getUserModule2',
                 theaderPara:{
                  treeProps :{children: 'childModule', hasChildren: 'hasChildren' },
                  rowKey:"moduleId"
                },

           }


        }

      },
      methods:{
          insert(record){
             let parentRow=this.$refs.table1.clickRow
             record.parentModuleId=parentRow.moduleId
             record.moduleLevl=parentRow.moduleLevl+1
             record.moduleId=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
          }
      }
    }
</script>

<style scoped>

</style>
