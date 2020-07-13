<template>
  <div>
    <el-container>
      <el-drawer
        :size="reversedMessage"
        :with-header="false"
        :visible.sync="drawer"
        direction="ttb"
        :modal="false"
      >
        <div   class="aaa">
          <div @click="drawer=true" class="nav_btn_icon2" >
            <div class="nav_btn_icon3">
              <el-image  class="my-image" fit="fill" :src="require('@/assets/nav_btn_icon.png')"></el-image>
            </div>
          </div>
          <div class="bbb">

            <el-button v-for="(user,index) in csbqs"  :key="index" class="el-icon-search mybq">我的按钮</el-button>
          </div>

        </div>
        <div   class="sss">
          <el-row :gutter="20">
            <el-col :span="3">
              <div class="grid-content bg-purple">ss</div>
              <div class="grid-content bg-purple">ss</div>
              <div class="grid-content bg-purple">ss</div>
              <div class="grid-content bg-purple">ss</div>
              <div class="grid-content bg-purple">ss</div>
              <div class="grid-content bg-purple">ss</div>


            </el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
        </div>
      </el-drawer>
      <el-header>
        <div @click="drawer=true" class="nav_btn_icon">

          <el-image class="my-image" fit="fill" :src="require('@/assets/nav_btn_icon.png')"></el-image>

        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        csbqs: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2 ],
        drawer: false,
        menuData: [],
        tags: [
          {name: '首页', type: '', moduleUrl: '/table', closable: false}
        ],
        nextUrl: 'table'
      }
    },
    created() {
      this.getMenu()
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例

        return ((Math.floor(this.csbqs.length / 10))*7+40)+'%'
      }
    },
    name: "index",
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push("/login")
      },
      async getMenu() {
        let res = await this.$http.post('/provider/sys/role-module/getUserModule')
        this.menuData = res
      },
      handleOpen() {

      },
      handleClose() {

      },
      tagClick(moduleUrl) {
        this.$router.push(moduleUrl)
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].type = ''
          if (this.tags[i].moduleUrl == moduleUrl) {
            this.tags[i].type = 'success'
          }

        }
      },
      tagClose(moduleUrl) {
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].type = ''
          if (this.tags[i].moduleUrl == moduleUrl) {
            this.tags.splice(i, 1)
          }

        }
        if (this.$route.path == ('/' + moduleUrl)) {
          this.$router.push(this.tags[this.tags.length - 1].moduleUrl)
          this.tags[this.tags.length - 1].type = 'success'
        }
      },
      moduleClick(item3) {
        let i = 0;
        for (let item of this.tags) {
          item.type = ''
          if (item.moduleUrl == item3.moduleUrl) {
            item.type = 'success'
            i = i + 1
          }
        }
        if (i == 0) {
          this.tags.push({
            name: item3.moduleName, type: 'success', moduleUrl: item3.moduleUrl, closable: true
          })
        }
      }

    }

  }
</script>

<style scoped>
  .el-header {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #bfcbd9;

  > div {
    align-items: center;
  }

  }
  .home-container {
    height: 100%;
  }

  .el-aside {
    background: #1f2d3d;
    padding: 0px;
  }

  .el-menu {
    height: 100%;
    width: 100%;

  }

  .nav_btn_icon {
    background: #5ecfc9;
    height: 100%;
    width: 5%;

  }
  .nav_btn_icon2 {
    display: inline-block;
    background: #272930;
    height: 100%;
    width: 5%;
    float:left;

  }
  .nav_btn_icon3 {
    height: 60px;
    float:left;
    margin: 0px;
    width: 100%;
    border:0px;
    padding:0px;
  }
  .my-image {


    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .aaa {
    background: #272930;
    width: 100%;
    height: auto;
  }
  .bbb {

    display: inline-block;
    width: 90%;
    height: 100%;
  }
  .ccc {

    display: inline-block;
    width: 5%;
    height: 100%;
  }
  .mybq{
    background: #272930;
    float:left;
    color: #fff;
    border: #272930;
    font-size: 15px;
    margin-top: 3px;
    margin-left: 0px;
  }
  .sss{
    background: #3e4149;
    width: 100%;
    height: 200px;

    margin: 0px;
    border:0px;
    padding:0px;
  }
</style>
