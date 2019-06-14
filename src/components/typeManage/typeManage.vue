<template>
    <div id="typeManage">
        <table>
            <thead>
                <tr style="background:lightblue">
                    <th><span>类型</span></th>
                    <th><span>图标</span></th>
                    <th><span>操作</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in allType" :key="item.type+index">
                    <td>{{item.type}}</td>
                    <td>
                        <img class="icon" :src="item.icon" alt="">
                    </td>
                    <td>
                        <el-button type="danger" @click="deleteType(item)"><span>删除</span></el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <addNewType />
    </div>
</template>
<script>
import addNewType from './addNewType'
import {mapGetters} from 'vuex'
export default {
    components:{addNewType},
    computed:{
        ...mapGetters(['allType'])
    },
    methods:{
        deleteType(item){
            var action = ()=>{
                this.post(this.$apis.deleteMusicType,{_id:item._id}).then((resp)=>{
                    this.$store.dispatch('findAllType')
                })
            }
            this.operatorConfirm("删除此类型",action)
        }
    },
    mounted(){
        this.$store.dispatch('findAllType')
    }
}
</script>
<style lang="scss" scoped>
    #typeManage{
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
        .icon{
            width: 30px;
            height: 30px;
        }
    }
</style>
