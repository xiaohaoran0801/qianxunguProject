<template>
  <div id="navBar">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item 
            v-for="(item,index) in navBar" 
            :index="item.name" 
            :key="index"
        >
          <template slot="title">
            <span class="navList" @click="pushView({name:item.pathName})">
                <i class="el-icon-s-operation"></i>
                <span>{{item.name}}</span>
            </span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
    data(){
        return{
            navBar:[
                {name:'日历管理',pathName:'dailyManage'},
                {name:'类型管理',pathName:'typeManage'},
                {name:'音乐管理',pathName:'musicManage'},
                {name:'权限管理',pathName:'permissionManage'},
                {name:'角色管理',pathName:'roleManage'},
            ]
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
<style lang="scss" scoped>
    #navBar{
        width: 100%;
        height: 100%;
        .el-col{
            width: 100%;
            p: 1px solid #545c64;
            box-sizing: border-box;
        }
    }
    .navList{
        display: inline-block;
        height: 100%;
        width: 100%;
    }
</style>

