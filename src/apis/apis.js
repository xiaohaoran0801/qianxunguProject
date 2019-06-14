import Vue from 'vue'
const apis = {
    findMusicTypes:'music/findMusicTypes',
    addNewMusicType:'music/addNewMusicType',
    deleteMusicType:'music/deleteMusicType',
    findDailyBackground:'daily/findDailyBackground',
    setDailyBackgroundLike:'daily/setDailyBackgroundLike',
    setDailyBackground:'daily/setDailyBackground',
    addNewMessage:'message/addNewMessage',
    updateMusicInfo:'music/updateMusicInfo',
    deleteMusic:'music/deleteMusic',
    findMusic:'music/findMusic',
    uploadMusic:'music/uploadMusic',
    signin:'signin',
    checkDynamicCode:'checkDynamicCode'
}
Vue.prototype.$apis = apis
export default apis