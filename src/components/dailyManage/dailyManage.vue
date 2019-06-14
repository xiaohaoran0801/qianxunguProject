<template>
    <div id="dailyManage">
        <div id="top">
            <setDatlyBG />
        </div>
        <div id="bottom">
            <findDailyBG />
        </div>
    </div>
</template>
<script>
import setDatlyBG from './setDatlyBG'
import findDailyBG from './findDailyBG'
export default {
    components:{setDatlyBG,findDailyBG},
}
</script>
<style lang="scss" scoped>
    #dailyManage{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        #top,#bottom{
            width: 400px;
            height: 300px;
        }
    }
</style>
