<template>
    <div id="login">
        <div id="usersInfo">
            <h1>千寻谷</h1>
            <el-form :model="userInfo" :rules="rules" status-icon ref="userInfo">
                <el-form-item prop="username" style="width:250px">
                    <el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="userInfo.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="CheckDynamicCodeText">
                    <el-input type="text" v-model="userInfo.CheckDynamicCodeText" placeholder="请输入下图中的验证码" ></el-input>
                </el-form-item>
            </el-form>
            <div ref="verification" @click="refresh"></div>
            <el-button type="primary" @click="login">登录</el-button>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            checkDynamicCode:{},
            userInfo:{},
            rules:{
                username:[
                    {required:true,message:"账号不能为空",trigger:'blur'}
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:'blur'},
                    {min:5,max:12,message:"密码应为5-12个字符",trigger:'blur'}
                ],
                CheckDynamicCodeText:[
                    {required:true,message:"验证码不能为空",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        getVerification(){
            this.$http.get(this.$apis.checkDynamicCode).then((resp)=>{
                resp = resp.data
                this.$refs.verification.innerHTML = resp.data.data
                this.checkDynamicCode = resp.data
            })
        },
        refresh(){
            this.getVerification()
        },
        login(){
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    let verification = this.userInfo.CheckDynamicCodeText
                    if(verification.toLowerCase()===this.checkDynamicCode.text.toLowerCase()){
                        this.$http.post(this.$apis.signin,this.userInfo)
                        .then((resp)=>{
                            resp = resp.data
                            console.log(resp)
                            var token = resp.token
                            localStorage.setItem("token",token);
                            var response = JSON.stringify(resp.response)
                            localStorage.setItem("response",response);
                            if(resp.success){
                                var query = this.$route.query
                                if(!query.redirect){
                                    this.$router.push({path:"/home"})
                                }else{
                                    this.$router.push({path:query.redirect})
                                }
                            }else{
                                this.$message.error('账号密码错误');
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }else{
                        this.$message.error('验证码错误');
                    }
                }else{
                    console.log("验证失败")
                }
            })
        }
    },
    created(){
        this.getVerification()
    },
}
</script>
<style lang="scss" scoped>
    #login{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: lightblue;
        #usersInfo{
            width: 20%;
            min-width: 300px;
            position: absolute;
            right: 0;
            top:0;
            bottom: 0;
            background: rgba($color: #000, $alpha: .6);
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h1{
                margin-bottom: 100px;
            }
            button{
                margin-top: 50px;
            }
        }
    }
</style>

