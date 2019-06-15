import Vue from 'vue'
const apis = {
    findMusicTypes:'music/findMusicTypes',
    addNewMusicType:'music/addNewMusicType',
    deleteMusicType:'music/deleteMusicType',
    findDailyBackground:'webapp/findDailyBackground',
    setDailyBackgroundLike:'daily/setDailyBackgroundLike',
    setDailyBackground:'daily/setDailyBackground',
    addNewMessage:'message/addNewMessage',
    updateMusicInfo:'music/updateMusicInfo',
    deleteMusic:'music/deleteMusic',
    findMusic:'music/findMusic',
    uploadMusic:'music/uploadMusic',
    signin:'signin',
    checkDynamicCode:'checkDynamicCode',
    findRoles:'system/role/findRoles',
    findPermission:'system/permission/findPermission',
    deleteRole:'system/role/deleteRole',
    addNewRole:'system/role/addNewRole',
    addNewPermission:'system/permission/addNewPermission',
    deletePermission:'system/permission/deletePermission'

}
Vue.prototype.$apis = apis
export default apis