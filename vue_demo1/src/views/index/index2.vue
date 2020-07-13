<template>
  <!-- <div>
     <el-button type="info" @click="logout"  >退出</el-button>
   </div>-->
  <el-container class="home-container">
    <el-header>
      <div>
        <span>管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b">
          <el-submenu   v-for="item in  menuData" :key="item.moduleId" :index="item.moduleId+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.moduleName}}</span>
            </template>

            <el-submenu v-for="item2 in  item.childModule"  :index="item.moduleId+'-'+item2.moduleId" :key="item2.moduleId"  >
              <template slot="title">{{item2.moduleName}}</template>
              <el-menu-item v-for="item3 in  item2.childModule" :key="item3.moduleId" @click="moduleClick(item3)" :index= "'/'+item3.moduleUrl">{{item3.moduleName}}</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <el-tag
          v-for="tag in tags"

          :key="tag.name"
          :closable="tag.closable"
          @click="tagClick(tag.moduleUrl)"
          @close="tagClose(tag.moduleUrl)"
          :type="tag.type"
        >

         <span style="cursor:pointer">
          {{tag.name}}
          </span>
        </el-tag>

        <keep-alive>
          <router-view  />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menuData: [],
        tags: [
          { name: '首页', type: '' ,moduleUrl:'/table',closable:false }
        ],
        nextUrl:'table'
      }
    },
    created() {
      this.getMenu()
    },
    name: "index",
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push("/login")
      },
      async getMenu() {
        let res  = await this.$http.post('/provider/sys/role-module/getUserModule')
        this.menuData = res
      },
      handleOpen() {

      },
      handleClose() {

      },
      tagClick(moduleUrl){
        this.$router.push(moduleUrl)
        for(let i=0 ;i< this.tags.length;i++) {
          this.tags[i].type=''
          if(this.tags[i].moduleUrl==moduleUrl){
            this.tags[i].type='success'
          }

        }
      },
      tagClose(moduleUrl){
        for(let i=0 ;i< this.tags.length;i++) {
          this.tags[i].type=''
          if(this.tags[i].moduleUrl==moduleUrl){
            this.tags.splice(i,1)
          }

        }
        if  (this.$route.path==('/'+moduleUrl )){
          this.$router.push(this.tags[this.tags.length-1].moduleUrl)
          this.tags[this.tags.length-1].type='success'
        }
      },
      moduleClick(item3){
        let i = 0;
        for(let item of this.tags) {
          item.type=''
          if(item.moduleUrl==item3.moduleUrl){
            item.type='success'
            i =i+1
          }
        }
        if(i==0) {
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
    background: #0a76a4;
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
</style>
