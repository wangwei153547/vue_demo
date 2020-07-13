<template>
    <div>
      <el-card>

      <el-table2  cc="cc" :tbdata="tbdata" >

      </el-table2>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "zjcs",
      data() {
        return {
          tbdata:{
                is_savebutton:true,
                is_selected:true,
                is_indexed:true,
                headerColumns:[{prop: 'userCode' ,label:'用户编号',editor:'el-input',sort:'custom',required:true,readonly:false}
                ,{prop: 'userName' ,label:'用户名称',editor:'el-input'}
                ,{prop: 'userPwd' ,label:'用户密码',editor:'el-input'}
                ,{prop: 'isUse' ,label:'是否启用',editor:'el-checkbox'}
                ],
                 queryUrl:'/provider/sys/user/getAll',
                 saveUrl:'/provider/sys/user/saveUsers',
                 deleteUrl:'/provider/sys/user/deleteUser',
                 autoQuery:true,
                 is_page:true,
                 queryPara:[{prop: 'userCode' ,label:'用户编号',editor:'input'},{prop: 'userName' ,label:'用户名称',editor:'el-input'}],
                  is_querybutton:true
           }


        }

      }
    }
</script>

<style scoped>

</style>
