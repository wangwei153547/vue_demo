<template>
  <el-table
            :data="showData"
            border

            @sort-change="sortChange"
            v-loading="defaultConfig.loadFlag"
            v-bind="defaultConfig"
            highlight-current-row
            @row-click="rowClick"
            style="width: 100%">
    <el-table-column
      v-if="defaultConfig.selectFlag"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-if="defaultConfig.indexFlag"
      type="index"
      :index="indexMethod">
    </el-table-column>
    <template  v-for="(record,index) in columnData"  >
    <el-table-column
      v-if="record.soltName==undefined"
      v-bind="record"
       >
      <template   slot-scope="scope">
        <el-input        v-if="record.editor==='el-input'" :size="defaultConfig.size" v-model="scope.row[record.prop]" placeholder="请输入内容"
                     @change="handleEdit(scope.$index, scope.row)"></el-input>
        <span v-if="record.editor==null||record.editor==''||record.editor==undefined">{{scope.row[user.prop]}}</span>
      </template>


    </el-table-column>
    </template>
  </el-table>

</template>

<script>
  export default {
    name: "form-table",
    data() {
      return {
        defaultConfig:{
          ref:'table',
          size:'mini',
          height:'500',
          loadFlag:false,
          elementLoadingText: '拼命加载中' ,
          elementLoadingSpinner: 'el-icon-loading',
          elementLoadingBackground:'rgba(0, 0, 0, 0.8)',
          selectFlag:false,
          indexFlag:false,
          pageFlag:true
        },
        defaultColumnConfig:{

        },
        tableData:[],
        queryData:{},
        columnData: [],
        pageData:{
          page: 1,
          size: 10,
          total: 10,
          loading: false,
          direction:'asc',
          order:'',
        }
      }
    },
    methods:{
      indexMethod(index) {
        return index + 1;
     },
      async query(queryDate) {
        if(queryDate!=undefined){
          this.queryData=queryData
        }else{
          queryDate={}
        }

        this.defaultConfig.loadFlag = true
        let queryUrl=''
        if(this.defaultConfig.baseUrl!=''&&this.tbdata2.baseUrl!=null){
          queryUrl=this.defaultConfig.base_url+'/getAll'
        }
        if(this.defaultConfig.queryUrl!=''&&this.defaultConfig.queryUrl!=null){
          queryUrl=this.defaultConfig.queryUrl
        }

        let res = await this.$http.postFormData(queryUrl, this.queryData)
        let records
        if(this.defaultConfig.pageFlag==true){
          records=res.records
          this.pageData.total = res.total
        }else{
          records=res
        }
       // this.xhtw(records)
        this.loadData(records)
        this.queryPara.loading = false

        this.$refs.mytable.bodyWrapper.scrollTop = 0
        this.$emit('load',this.tableData)
      },
      loadData(datas){
        let recods=[]
        for(let data of datas){
          let record= new Object()
          record.data=data
          record.fields={}
          record.isUpdate='N'
          record.isNew='N'
          for (let col of this.columnData){
              record.fields[col.prop]=col
          }
          record.set=function (key1,value1) {
            this.isUpdate='Y'
            this.data[key1]=value1
          }
          record.get=function (key1) {
            return this.data[key1]
          }
          recods.push(record)
        }
        this.tableData=recods
        this.$emit('load',this.tableData)
      },
      handleEdit(index, row) {
        this.tableData[index].isUpdate='Y'
        this.$emit('update',this.tableData[index])
      },
      handleSizeChange(val) {

        this.pageData.size = val
        this.query()
      },
      handleCurrentChange(val) {
        this.pageData.page = val
        this.query()
      },
    },
    computed:{
      showData:function () {
        let datas=[]
         this.tableData.forEach(rec=>{
           datas.push(rec.data)
         })
        return datas
      }
    }
  }
</script>

<style scoped>

</style>
