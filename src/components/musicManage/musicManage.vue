<template>
    <div id="musicManage">
        <table>
            <thead>
                <tr style="background:lightblue">
                    <th><span>名称</span></th>
                    <th><span>类型</span></th>
                    <th><span>图标</span></th>
                    <th><span>上传时间</span></th>
                    <th><span>操作</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in allMusic" :key="item._id+index">
                    <td>{{item.name}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.icon}}</td>
                    <td>{{item.pubDate}}</td>
                    <td>
                        <el-button type="danger" @click="deleteMusic(item._id)"><span>删除</span></el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <addNewMusic />
    </div>
</template>
<script>
import addNewMusic from "./addNewMusic"
import {mapGetters} from 'vuex'
export default {
    components:{addNewMusic},
    computed:{
        ...mapGetters(['allMusic'])
    },
    methods:{
        deleteMusic(id){
            console.log(id)
            let musicList = JSON.stringify([{_id:id}])
            var action = ()=>{
                this.post(this.$apis.deleteMusic,{musicList:musicList}).then((resp)=>{
                    this.$store.dispatch('findAllMusic')
                })
            }
            this.operatorConfirm("删除此音乐",action)
        }
    },
    mounted(){
        this.$store.dispatch('findAllMusic');
    }
}  
</script>
<style lang="scss" scoped>
    #musicManage{
        width: 100%;
        height: 100%;
        padding: 30px 0;
        box-sizing: border-box;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
        tr {
            height: 50px;
        }
        td,
        th {
            border-bottom: 1px solid #cad9ea;
            color: #666;
            height: 30px;
        }
    }
</style>
