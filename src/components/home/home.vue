<template>
    <div id="Home">
        <div id="leftNavBar">
            <navbar />
            <div id="logOut">
                <el-button type="danger"
                    @click="logout"
                >退出</el-button>
            </div>
        </div>
        <div id="rightcontent">
            <router-view />
        </div>
    </div>
</template>
<script>
import navbar from './navbar'
export default {
    components:{navbar},
    methods:{
        logout() {
            localStorage.clear();
            this.$router.push({ name: "login" });
        },
    }
}
</script>
<style lang="scss" scoped>
    #Home{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        #leftNavBar{
            width: 20%;
            min-width: 200px;
            height: 100%;
            background: #545c64;
            position: relative;
            #logOut{
                position: absolute;
                bottom: 50px;
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
        #rightcontent{  
            width: 80%;
            height: 100%;
        }
    }
</style>
