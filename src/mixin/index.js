import Vue from 'vue'
import axios from 'axios'
Vue.mixin({
    methods: {
        pushView(item) {
            var name = item.name
            this.$router.push({name:name,query:item.query,params:item.params})
        },
        post(url, params) {
            return this.$http.post(url, params)
                .then((resp) => {
                    this.$message({
                        type: resp.data.success ? "success" : "info",
                        message: resp.data.message,
                    });
                })
        },
        operatorConfirm(message, action) {
            return this.$confirm('确定' + message + '么?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return action();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消' + message
                });
            });
        },
        formDatePost(formData,api,message,close,actionName){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post(api,formData,config,actionName).then(()=>{
                close()
                this.$message.success(message);
                this.$store.dispatch(actionName)
            })
        }
    }
})