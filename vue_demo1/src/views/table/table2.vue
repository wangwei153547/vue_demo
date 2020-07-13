<template>
  <div>
    <h2>asdasda</h2>
  <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
    export default {
      mounted() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://files.cnblogs.com/files/liuzhou1/L2Dwidget.0.min.js';
        document.body.appendChild(s);
        const s2 = document.createElement('script');
        s2.type = 'text/javascript';
        s2.src = 'https://files.cnblogs.com/files/liuzhou1/L2Dwidget.min.js';
        document.body.appendChild(s2);
      },
      created() {

      //  L2Dwidget.init({"display": {
       //     "superSample": 2,
       //     "width": 200,
       //     "height": 400,
        //    "position": "right",
        //    "hOffset": 0,
        //    "vOffset": 0
       //   }
      //  })
      },
      data() {

        return {
          input: ''
        }
      },
        name: "table2"
    }
</script>

<style scoped>
  #live2dcanvas {
    border: 0 !important;
  }
</style>
