<template>
  <div>
    <el-card>
      <el-form size="mini" :inline="true" :model="queryPara" class="demo-form-inline">
        <el-row>
          <el-col :span="18">
            <el-row :gutter="1">
              <el-col :span="6">
                <el-form-item label-width="80px" label="用户账号">
                  <el-input style="width: 100px" v-model="queryPara.userCode" placeholder="用户账号"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="6">

                <el-form-item label-width="80px" label="用户名称">
                  <el-input style="width: 100px" v-model="queryPara.userName" placeholder="用户名称"></el-input>
                </el-form-item>

              </el-col>

            </el-row>
            <el-row v-show="show_dispay" :gutter="1" class="my-inline-form"
                    style="position: absolute;z-index: 100;width: 801.25px;background-color: #FFFFFF;">
              <el-col :span="6">
                <el-form-item label-width="80px" label="用户账号">
                  <el-input style="width: 100px" placeholder="用户账号"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="6">

                <el-form-item label-width="80px" label="用户名称">
                  <el-input style="width: 100px" placeholder="用户名称"></el-input>
                </el-form-item>

              </el-col>

            </el-row>
          </el-col>

          <el-col :span="6">
            <div style="float:right">
              <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
              <el-button type="primary" size="mini" @click="oncz">重置</el-button>
              <el-button type="primary" size="mini" @click="ongd">更多</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-row :gutter="1">
              <el-button type="success" size="mini" @click="insert">新增</el-button>
              <el-button type="danger" size="mini" @click="delete2">删除</el-button>
              <el-button type="warning" size="mini" @click="save">保存</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-form>


      <el-table size="mini"
                ref="mytable"
                :data="userResult"
                border
                height="250"

                v-loading="queryPara.loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                highlight-current-row
                style="width: 100%">
        <el-table-column
          type="selection"
          width="55">

        </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="用户编号"
          width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.userCode" placeholder="请输入内容"
                      @change="handleEdit(scope.$index, scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.userName" placeholder="请输入内容"
                      @change="handleEdit(scope.$index, scope.row)"></el-input>
          </template>

        </el-table-column>
        <el-table-column
          prop="userPwd"
          label="用户密码" width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.userPwd" placeholder="请输入内容"
                      @change="handleEdit(scope.$index, scope.row)"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryPara.page"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="queryPara.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryPara.total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
  import Qs from 'qs'

  export default {

    name: "tablecc",
    data() {
      return {
        queryPara: {
          userCode: '',
          userName: '',
          page: 1,
          size: 10,
          total: 10,
          loading: false
        },
        userResult: [],
        show_dispay: false
      }
    },

    created() {
      this.pageUsers()
    },
    mounted() {
      // 获取需要绑定的table

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

    },
    methods: {
      onSubmit() {
        this.queryPara.size = 10
        this.queryPara.page = 1
        this.pageUsers();
      },
      async pageUsers() {
        this.show_dispay = false

        this.queryPara.loading = true
        console.log(this.queryPara)
        let res  = await this.$http.postFormData('/provider/sys/user/getAll',  this.queryPara )
        for(let i=0;i<res.records.length;i++){
          res.records[i].is_selected='N'
          res.records[i].is_update='N'
          res.records[i].is_new='N'
        }
        this.userResult = res.records
        this.queryPara.total = res.total
        this.queryPara.loading = false
        this.$refs.mytable.bodyWrapper.scrollTop =0

      },
      handleEdit(index, row) {
        if (this.userResult[index].is_update == null) {
          this.userResult[index].is_update = 'Y'
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
        this.queryPara.userName = ''
        this.queryPara.userCode = ''
      },
      async insert() {

        await this.userResult.push({is_update: 'X'})
        this.$refs.mytable.bodyWrapper.scrollTop = this.$refs.mytable.bodyWrapper.scrollHeight;
      },
      delete2() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selecteds=this.$refs.mytable.selection
          for(let i=0;i<selecteds.length;i++){
            selecteds[i].is_selected='Y'
          }
          console.log(this.userResult)
          for(let i=this.userResult.length-1;i>=0;i--){

            if(this.userResult[i].is_selected==='Y'){
            this.userResult.splice(i,1)
            }
          }


          let   res  =   this.$http.post('/provider/sys/user/deleteUser' ,  selecteds  )
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })


      },
      indexMethod(index) {
        return index +1;

      },
      async save() {
       // this.$refs.mytable.data.validate()


        let res = await this.$http.post('/provider/sys/user/saveUsers', this.userResult)

        if (res == true) {

          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.pageUsers()
        }
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
</style>
