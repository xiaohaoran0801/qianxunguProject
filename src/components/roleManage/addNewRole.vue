<template>
     <div id="addBTN">
        <el-button type='primary' @click="handleClose">
            <i class="el-icon-plus"></i>
            新增
        </el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <template>
                <el-form label-width="80px" 
                    :model="roleInfo" 
                    :rules="rules" 
                    ref="roleInfo">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="roleInfo.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="roleInfo.roleDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="角色权限">
                        <el-checkbox-group v-model="permissions">
                            <el-checkbox 
                            v-for="(item,index) in allPermissions"
                            :key="index+item._id"
                            :label="item.permissionName"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewRole">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            permissions: [],
            roleInfo: {},
            rules: {
                roleName: [
                    { required: true, message: "角色名称不能为空", trigger: "blur" }
                ],
                roleDesc: [
                    { required: true, message: "角色描述不能为空", trigger: "blur" }
                ]
            }
        }
    },
    computed:{
        ...mapGetters(['allPermissions'])
    },
    methods:{
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewRole() {
            var arr = this.permissions.map((item,index)=>{
                var length = this.allPermissions.length
                for(var i=0;i<length;i++){
                    if(item === this.allPermissions[i].permissionName){
                        item = this.allPermissions[i]._id
                        return item
                    }
                }
            })
            this.permissions = arr
            this.$refs['roleInfo'].validate((valid) => {
                if (valid) {
                    this.roleInfo.permissions = JSON.stringify(this.permissions);
                    this.handleClose();
                    this.post(this.$apis.addNewRole, this.roleInfo)
                    .then(() => {
                        this.permissions = [];
                        this.$store.dispatch("findAllRoles");
                        this.$refs.roleInfo.resetFields()
                    });
                }else{
                    return false;
                }
            });
        },
    },
    mounted(){
        this.$store.dispatch("findAllPermissions");
  }
}
</script>
<style lang="scss" scoped>
    #addBTN {
        width: 95%;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }   
</style>
