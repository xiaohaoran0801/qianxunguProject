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
    </div>
</template>
<script>
export default {
    data(){
        return{
            from:'',
            to:'',
        }
    },
    methods:{
        findBG(){
            this.$http.get(this.$apis.findDailyBackground,{from:this.from,to:this.to})
            .then((resp)=>{
                console.log(resp)
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
    }
</style>
