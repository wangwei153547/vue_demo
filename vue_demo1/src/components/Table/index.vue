<template>
  <div>

    <el-form size="mini" :inline="true" :model="queryPara" class="demo-form-inline">
      <el-row v-if="tbdata2.is_querybutton" >
        <el-col :span="18">
          <el-row :gutter="1">
            <el-col v-for="(user,index) in tbdata2.queryPara" :key="index" :span="6">
              <el-form-item label-width="80px" :label="user.label">
                <el-input style="width: 100px" v-model="queryPara[user.prop]" :placeholder="user.label"></el-input>
              </el-form-item>

            </el-col>


          </el-row>
          <div style="position: absolute;z-index: 100;width: 801.25px;background-color: #FFFFFF;" v-show="show_dispay">
            <el-row v-for="(user2,index) in tbdata2.queryPara2" :key="index" :gutter="1" class="my-inline-form"
            >
              <el-col v-for="(user,index) in user2" :key="index" :span="6">
                <el-form-item label-width="80px" :label="user.label">
                  <el-input style="width: 100px" v-model="queryPara[user.prop]" :placeholder="user.label"></el-input>
                </el-form-item>

              </el-col>


            </el-row>
          </div>
        </el-col>

        <el-col :span="6">
          <div style="float:right">
            <el-button v-if="tbdata2.is_querybutton" type="primary" size="mini" @click="onSubmit">查询</el-button>
            <el-button v-if="tbdata2.is_querybutton" type="primary" size="mini" @click="oncz">重置</el-button>
            <el-button v-if="tbdata2.is_querybutton" type="primary" size="mini" @click="ongd">更多</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-row :gutter="1">
            <el-button v-if="tbdata2.is_savebutton" type="success" size="mini" @click="insert">新增</el-button>
            <el-button v-if="tbdata2.is_savebutton" type="danger" size="mini" @click="delete2">删除</el-button>
            <el-button v-if="tbdata2.is_savebutton" type="warning" size="mini" @click="save">保存</el-button>
            <el-button v-if="tbdata2.tableButton.insertButton" type="success" size="mini" @click="insert">新增</el-button>
            <el-button v-if="tbdata2.tableButton.deleteButton" type="danger" size="mini" @click="delete2">删除</el-button>
            <el-button v-if="tbdata2.tableButton.saveButton" type="warning" size="mini" @click="save">保存</el-button>

          </el-row>
        </el-col>
      </el-row>
    </el-form>


    <el-table size="mini"
              ref="mytable"
              :data="userResult"
              border
              height="250"
              @sort-change="sortChange"
              v-loading="queryPara.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
               v-bind="tbdata3"
              highlight-current-row
              @row-click="rowClick"
              style="width: 100%">
      <el-table-column
        v-if="tbdata2.is_selected"
        type="selection"
        width="55">

      </el-table-column>
      <el-table-column
        v-if="tbdata2.is_indexed"
        type="index"
        :index="indexMethod">
      </el-table-column>
      <template  v-for="(user,index) in tbdata2.headerColumns"  >
      <el-table-column
         v-if="user.soltName==undefined"

        :prop="user.prop"
        :label="user.label"
        :sortable="user.sort"

        width="180">
        <template   slot-scope="scope">
        <el-input    :class=" scope.row['_required-'+user.prop]&&(scope.row[user.prop]==null||scope.row[user.prop]=='') ? 'is-required-o' : 'aa'" :readonly="scope.row['_readonly-'+user.prop]" v-if="user.editor==='el-input'" size="small" v-model="scope.row[user.prop]" placeholder="请输入内容"
                    @change="handleEdit(scope.$index, scope.row)"></el-input>
          <el-lov   :tbdata="user.initData" :prop="user.prop"    :class=" scope.row['_required-'+user.prop]&&(scope.row[user.prop]==null||scope.row[user.prop]=='') ? 'is-required-o' : 'aa'" :readonly="scope.row['_readonly-'+user.prop]" v-if="user.editor==='el-lov'" size="small" v-model="scope.row"  placeholder="请输入内容"
                       ></el-lov>
          <el-checkbox v-if="user.editor==='el-checkbox'" true-label="Y" false-label="N" v-model="scope.row[user.prop]"
                       @change="handleEdit(scope.$index, scope.row)"></el-checkbox>
         <span v-if="user.editor==null||user.editor==''||user.editor==undefined">{{scope.row[user.prop]}}</span>

        </template>


      </el-table-column>
      <el-table-column
          v-if="user.soltName!=undefined"

          :prop="user.prop"
          :label="user.label"
          :sortable="user.sort"

          width="180">
          <template   slot-scope="scope">
            <slot :name="user.soltName" :data="scope"> </slot>
          </template>


        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="tbdata2.is_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryPara.page"
      :page-sizes="[10, 200, 300, 400]"
      :page-size="queryPara.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryPara.total">
    </el-pagination>


  </div>
</template>

<script>
  import Qs from 'qs'

  export default {
    props: {
      tbdata: {
        type: Object
      }
    },
    name: "tablecc",
    data() {
      return {
        tbdata3:{

        },
        tbdata2: {

          is_selected: false,
          is_indexed: false,
          is_savebutton: false,
          queryUrl: '',
          saveUrl: '',
          deleteUrl: '',
          headerColumns: [],
          autoQuery: true,
          is_page: true,
          queryPara: [],
          queryPara2: [],
          is_querybutton: true,
          base_url:'',
          tableButton:{
            insertButton:false,
            deleteButton:false,
            saveButton:false,
          }


          //sort:false,
          // required:false,
          // readonly:false
        },
        queryPara: {

          page: 1,
          size: 10,
          total: 10,
          loading: false,
          direction:'asc',
          order:'',
        },
        userResult: [],
        show_dispay: false,
        clickRow:''
      }
    },

    created() {
      this.inittb()
      if(this.tbdata2.autoQuery){
      this.pageUsers()
      }
    },
    mounted() {
      // 获取需要绑定的table
      if(this.tbdata2.is_page==true) {
        this.dom = this.$refs.mytable.bodyWrapper
        let aa = 0

        this.dom.addEventListener('mousewheel', (e) => {
          // 滚动距离

          if (this.queryPara.loading == false) {
            let scrollTop = this.dom.scrollTop
            // 变量windowHeight是可视区的高度
            let windowHeight = this.dom.clientHeight || this.dom.clientHeight
            // if(aa>=scrollTop + windowHeight){
            //   aa= aa+scrollTop + windowHeight
            // }else{
            //   aa= scrollTop + windowHeight
            //  }
            let wheelDelta = e.wheelDelta
            // 变量scrollHeight是滚动条的总高度
            let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
            if (wheelDelta < 0) {
              if (scrollTop + windowHeight === scrollHeight && this.queryPara.page != Math.ceil(this.queryPara.total / this.queryPara.size)) {
                aa += scrollHeight
                if (aa > (3 * scrollHeight)) {

                  // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                  //  if (!this.allData) this.getMoreLog()
                  this.queryPara.page = parseInt(this.queryPara.page) + 1
                  this.pageUsers()

                  aa = 0
                  this.dom.scrollTop = 0

                }
              } else {
                aa = 0;
              }
            } else {
              if (scrollTop == 0 && this.queryPara.page != 1) {
                aa += scrollHeight
                if (aa > (3 * scrollHeight)) {

                  // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                  //  if (!this.allData) this.getMoreLog()
                  this.queryPara.page = parseInt(this.queryPara.page) - 1
                  this.pageUsers()
                  aa = 0
                  this.dom.scrollTop = 0
                  //  console.log('scrollTop', scrollTop + 'windowHeight', windowHeight + 'scrollHeight', scrollHeight)
                }
              } else {
                aa = 0;
              }
            }
          } else {
            this.dom.scrollTop = 0
          }

        })
      }
    },
    methods: {
      async inittb() {

        for (let key in this.tbdata) {

          if (key == 'theaderPara') {

            this.tbdata3 = this.tbdata[key]
          } else {

            this.tbdata2[key] = this.tbdata[key]
          }
          if (key == 'queryPara3') {
            for (let key2 in this.tbdata[key]) {
                this.queryPara[key2]=this.tbdata[key][key2]
            }
          }

        }

      },
      onSubmit() {
        this.queryPara.size = 10
        this.queryPara.page = 1
        this.pageUsers();
      },
      async query() {
        this.pageUsers()

      },
      async pageUsers() {
        this.show_dispay = false

        this.queryPara.loading = true
        let myurl=''
        if(this.tbdata2.base_url!=''&&this.tbdata2.base_url!=null){
          myurl=this.tbdata2.base_url+'/getAll'
        }
        if(this.tbdata2.queryUrl!=''&&this.tbdata2.queryUrl!=null){
          myurl=this.tbdata2.queryUrl
        }

        let res = await this.$http.postFormData(myurl, this.queryPara)
        let records
        if(this.tbdata2.is_page==true){
          records=res.records
        }else{
          records=res
        }
        this.xhtw(records)
        this.userResult =  records
        this.queryPara.total = res.total
        this.queryPara.loading = false
        for(let aa of this.tbdata2.headerColumns){

          if(aa.required==true){

            for(let bb of this.userResult){
              bb['_required-'+aa.prop]=true
            }
          }else{
            for(let bb of this.userResult){
              bb['_required-'+aa.prop]=false
            }
          }

          if(aa.readonly==true){

            for(let bb of this.userResult){
              bb['_readonly-'+aa.prop]=true
            }
          }else{
            for(let bb of this.userResult){
              bb['_readonly-'+aa.prop]=false
            }
          }

        }
        this.$refs.mytable.bodyWrapper.scrollTop = 0
        this.$emit('load',this.userResult)
      },
      xhtw(records){

        if(this.tbdata3.treeProps==undefined){

        for (let i = 0; i < records.length; i++) {
          records[i].is_selected = 'N'
          records[i]._is_update = 'N'
          records[i].is_new = 'N'
        }
        }else {

          for (let i = 0; i < records.length; i++) {
            records[i].is_selected = 'N'
            records[i]._is_update = 'N'
            records[i].is_new = 'N'
            if(records[i][this.tbdata3.treeProps]!=undefined){
              this.xhtw(records[i][this.tbdata3.treeProps.children])

            }
          }
        }
      },
      handleEdit(index, row) {

        if (row._is_update != 'X') {
          row._is_update = 'Y'
        }
      },
      handleSizeChange(val) {

        this.queryPara.size = val
        this.pageUsers();
      },
      handleCurrentChange(val) {

        this.queryPara.page = val
        this.pageUsers();
      },
      ongd() {
        this.show_dispay = !this.show_dispay

      },
      oncz() {
         for (let key in this.queryPara){
           if(key!='page'&&key!='size'&&key!='total'&&key!='loading'&&key!='direction'&&key!='order' ){
             this.queryPara[key]=null
           }
         }

       /* page: 1,
          size: 10,
          total: 10,
          loading: false,
          direction:'asc',
          order:'',*/

      },
      async insert() {
        let record={_is_update: 'X'}
        for(let aa of this.tbdata2.headerColumns){

          if(aa.required==true){

            for(let bb of this.userResult){
              record['_required-'+aa.prop]=true
            }
          }else{
            for(let bb of this.userResult){
              record['_required-'+aa.prop]=false
            }
          }
          if(aa.readonly==true){

            for(let bb of this.userResult){
              record['_readonly-'+aa.prop]=true
            }
          }else{
            for(let bb of this.userResult){
              record['_readonly-'+aa.prop]=false
            }
          }
        }
        this.$emit('insert',record)

         if(this.tbdata3.treeProps!=undefined&&this.clickRow!=''){

            this.clickRow[this.tbdata3.treeProps.children].push(record)

         }else{
           await this.userResult.push(record)
           this.$refs.mytable.bodyWrapper.scrollTop = this.$refs.mytable.bodyWrapper.scrollHeight
         }
        console.log(record)
      },
      delete2() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selecteds = this.$refs.mytable.selection
          for (let i = 0; i < selecteds.length; i++) {
            selecteds[i].is_selected = 'Y'
          }

          for (let i = this.userResult.length - 1; i >= 0; i--) {

            if (this.userResult[i].is_selected === 'Y') {
              this.userResult.splice(i, 1)
            }
          }
          let myurl='';
          if(this.tbdata2.base_url!=''&&this.tbdata2.base_url!=null){
            myurl=this.tbdata2.base_url+'/delete'
          }
          if(this.tbdata2.deleteUrl!=''&&this.tbdata2.deleteUrl!=null){
            myurl=this.tbdata2.deleteUrl
          }
          let res = this.$http.post(myurl, selecteds)

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })


      },
      indexMethod(index) {
        return index + 1;

      },
      async save() {
        // this.$refs.mytable.data.validate()
           let result=this.userResult
           console.log(result)
           if(this.tbdata3.treeProps!=undefined){
              result=this.fktw(this.userResult)
            }


        let isok= this.checkTable()
        if(!isok){
          return;
        }
        let myurl=''
        if(this.tbdata2.base_url!=''&&this.tbdata2.base_url!=null){
          myurl=this.tbdata2.base_url+'/save'
        }
        if(this.tbdata2.saveUrl!=''&&this.tbdata2.saveUrl!=null){
          myurl=this.tbdata2.saveUrl
        }
        let  obj=JSON.parse(JSON.stringify(result))
        if(this.tbdata3.treeProps!=undefined){
        for(let rec of  obj){
          if(rec._is_update=='X'){
            rec[this.tbdata3.rowKey]=null
          }
          if(rec[this.tbdata3.treeProps.children]!=undefined){
          rec[this.tbdata3.treeProps.children]=null
          }
        }
        }
        console.log(result)
        console.log(obj)
        let res = await this.$http.post(myurl, obj)

        if (res == true) {

          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.pageUsers()
        }
      },
      fktw(records){
        let myrecord=[]
        for(let record of records){

          myrecord.push(record)

          if(record[this.tbdata3.treeProps.children]!= undefined){
          if(record[this.tbdata3.treeProps.children].length>0){

            myrecord=  myrecord.concat(this.fktw(record[this.tbdata3.treeProps.children]))
            }
          }
        }
        return myrecord
      },
      sortChange(aa) {
        //this.queryPara
        if(aa.order=="descending"){
        this.queryPara.direction='desc'
        }else{
          this.queryPara.direction='asc'
        }
        this.queryPara.order=aa.prop
        this.pageUsers()

      },
      rowClick(aa){
        this.clickRow=aa
      },
      addQueryPara(record){
        for(let key in record){
          this.queryPara[key]=record[key]
        }
      },
     checkTable(){

       for(let bb of this.userResult){
         for(let key in bb){

           if(key.startsWith('_required-')){

             if(bb[key]==true&&(bb[key.replace('_required-','')]==''||bb[key.replace('_required-','')]==null||bb[key.replace('_required-','')]==undefined)){
               for(let cc of this.tbdata2.headerColumns){
                 if(cc.prop==key.replace('_required-','')){
                   this.$message({
                     message: cc.label+'不能为空',
                     type: 'warning'
                   })
                   return false
                 }
               }
             }
           }
         }

       }
       return true
     }
      /* rowClick(row, column, event){
         this.$refs.mytable.toggleRowSelection(row);

       },
       tableRowClassName({row,rowIndex}){
           if(row.isgl==true){

           }
       }*/
    }
  }
</script>

<style scoped>
  /* 用来设置当前页面element全局table的内间距 */

  /* 用来设置当前页面element全局table 选中某行时的背景色*/
  .el-table__body tr.current-row > td {
    background-color: #fbffff !important;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

  .el-form-item_label2 {
    font-size: 5px
  }
  .is-required-o{
    border: 1px solid red;
  }
</style>
