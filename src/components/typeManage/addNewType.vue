<template>
    <div id="addNewType">
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form label-width="80px" :model="typeInfo" ref="typeInfo" :rules="rules">
                <el-form-item label="类型" prop="type">
                    <el-input v-model="typeInfo.type"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <input type="file" @change="getFile($event)" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false,
            typeInfo:{
                
            },
            rules:{
                type:[
                    {required:true,message:'类型不能为空',trigger:'blur'},
                ]
            }
        }
    },
    methods:{
        getFile(e){
            this.typeInfo.icon = e.target.files[0]
        },
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewType(){
            this.$refs['typeInfo'].validate((valid)=>{
                if(valid){
                    let formData = new FormData();
                    formData.append("type",this.typeInfo.type)
                    formData.append("icon",this.typeInfo.icon)
                    let api = this.$apis.addNewMusicType
                    let message = '新增类型成功'
                    let actionName = 'findAllType'
                    let close = this.handleClose
                    this.formDatePost(formData,api,message,close,actionName)
                    this.$refs.typeInfo.resetFields()
                }else{
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #addNewType {
        width: 95%;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }
</style>
