<template>
    <div id="roleManage">
        <table>
            <thead>
                <tr style="background:lightblue">
                    <th><span>名称</span></th>
                    <th><span>描述</span></th>
                    <th><span>操作</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in allRoles" :key="index+item._id">
                    <td>{{item.roleName}}</td>
                    <td>{{item.roleDesc}}</td>
                    <td>
                        <!-- <el-button type="primary" @click="updateRoleInfo(item._id)"><span>删除</span></el-button> -->
                        <el-button type="danger" @click="deleteRole(item._id)"><span>删除</span></el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <addNewRole />
    </div>
</template>
<script>
import addNewRole from './addNewRole'
import {mapGetters} from 'vuex'
export default {
    components:{addNewRole},
    computed:{
        ...mapGetters(['allRoles'])
    },
    methods:{
        deleteRole(id){
            var action =()=>{
                this.post(this.$apis.deleteRole,{ _id: id }).then(() => {
                    this.$store.dispatch("findAllRoles");
                });
            };
            this.operatorConfirm("删除角色", action);
        }
    },
    mounted(){
        this.$store.dispatch('findAllRoles')
    }
}
</script>
<style lang="scss" scoped>
    #roleManage{
        width: 100%;
        height: 100%;
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
