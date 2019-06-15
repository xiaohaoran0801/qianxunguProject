<template>
    <div id="findDailyBG">
        <div>
            <div class="block">
                <span class="demonstration">from:</span>
                <el-date-picker
                v-model="from"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">to:</span>
                <el-date-picker
                v-model="to"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
        </div>
        <div id="findBGBTN">
            <el-button type='primary' @click="findBG">查询</el-button>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <ul>
                <li v-for="(item,index) in data" :key="index+item._id">
                    <img :src="item.imgURL" alt="">
                    <p>{{item.daily}}</p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            from:'',
            to:'',
            data:{}
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        changeTime(time){
            var date = new Date(Number(time)),
            Y = date.getFullYear() + '-',
            M = (date.getMonth()+1) + '-',
            D = date.getDate() + ' ';
            M = M<10?"0"+M : M
            D = D<10?"0"+D : D 
            return Y+M+D;
        },
        changeAddr(payload){
            var baseUrl = "http://localhost:3000"
            var dataArr = payload.data
            var newDataArr = dataArr.map((item,index)=>{ 
            var imgURL = baseUrl+item.imgURL.replace(/\\/g,'/');
                item.imgURL = imgURL
                item.daily = this.changeTime(item.daily)
                return item
            })
            return newDataArr
        },
        findBG(){
            this.$http.get(this.$apis.findDailyBackground,{from:this.from,to:this.to})
            .then((resp)=>{
                resp = resp.data
                this.handleClose()
                this.data = this.changeAddr(resp)
                console.log(this.data)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #findDailyBG{
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        div{
            margin: 5px;
        }
        .block{
            display: flex;
            .demonstration{
                display: inline-block;
                width: 80px;
            }
        }
        #findBGBTN{
            display: flex;
            justify-content: center;
        }
        ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li{
                height: 150px;
                list-style: none;
                margin: 0 5px;
                p{
                    text-align: center
                }
            }
        }
        img{
            width: 150px;
            height: 150px;
        }
    }
</style>
