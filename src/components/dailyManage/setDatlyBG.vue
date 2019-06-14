<template>
    <div id="setBG">
        <el-form label-width="80px" :model="description" ref="description" :rules="rules">
            <el-form-item label="图片">
                <input type="file" @change="getFile($event)" />
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="description.author"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="description.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="description.content"></el-input>
            </el-form-item>
        </el-form>
        <div class="block">
            <el-date-picker
            v-model="daily"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </div>
        <div id="button">
            <el-button type='primary' @click="setBG">确定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dailyIMG:'',
            daily:'',
            liked:0,
            description:{},
            rules:{
                author:[
                    {required:true,message:'作者名不能为空',trigger:'blur'}
                ],
                content:[
                    {required:true,message:'内容不能为空',trigger:'blur'}
                ],
                title:[
                    {required:true,message:'标题不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        getFile(e){
            this.dailyIMG = e.target.files[0]
        },
        setBG(){
            this.$refs['description'].validate((valid)=>{
                if(valid){
                    let form = new FormData();
                    let api = this.$apis.setDailyBackground
                    let message = '设置背景成功'
                    form.append("dailyIMG",this.dailyIMG)
                    form.append("daily",this.daily)
                    form.append("liked",this.liked)
                    form.append("description",JSON.stringify(this.description))
                    this.formDatePost(form,api,message)
                }else{
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #setBG{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .block{
            width: 100%;
            height: 50px;
            padding-left: 80px;
            box-sizing: border-box;
        }
        #button{
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
</style>
