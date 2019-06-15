import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/myaxios'
import apis from '@/apis/apis'

Vue.use(Vuex)
const loadAction = (commit,payload,mutationName)=>{
  axios.get(payload.api,{pageNo:payload.pageNo,pageSize:payload.pageSize})
  .then((resp)=>{
    resp = resp.data;
    console.log(resp)
    commit(mutationName,resp)
  })
}
const spacilAction = (commit,payload,mutationName)=>{
  axios.post(payload.api,{pageNo:payload.pageNo,pageSize:payload.pageSize})
  .then((resp)=>{
    resp = resp.data;
    console.log(resp)
    commit(mutationName,resp)
  })
}
const changeTime = (time) =>{
  var date = new Date(Number(time)),
  Y = date.getFullYear() + '-',
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
  D = date.getDate() + ' ',
  h = date.getHours() + ':',
  m = date.getMinutes() + ':',
  s = date.getSeconds();
  return Y+M+D+h+m+s;
}
const changeData = (payload)=>{
  var baseUrl = "http://localhost:3000"
  var dataArr = payload.data
    var newDataArr = dataArr.map((item,index)=>{ 
      var iconStr = baseUrl+item.icon.replace(/\\/g,'/');
      item.icon = iconStr
      item.pubDate = changeTime(item.pubDate)
      return item
    })
  return newDataArr
}
export default new Vuex.Store({
  state: {
    allType:[],
    allMusic:[],
    allRoles:[],
    allPermissions:[],
  },
  getters:{
    allType(state){
      return state.allType
    },
    allMusic(state){
      return state.allMusic
    },
    allRoles(state){
      return state.allRoles
    },
    allPermissions(state){
      return state.allPermissions
    }
  },
  mutations: {
    FINDALLTYPE(state,payload){
      state.allType = changeData(payload)
    },
    FINDALLMUSIC(state,payload){
      state.allMusic = changeData(payload)
    },
    FINDALLROLES(state,payload){
      state.allRoles = payload.data
    },
    FINDALLPERMISSIONS(state,payload){
      state.allPermissions = payload.data
    }
  },
  actions: {
    findAllType({commit},payload={}){
      payload.api = apis.findMusicTypes
      loadAction(commit,payload,'FINDALLTYPE')
    },
    findAllMusic({commit},payload={}){
      payload.api = apis.findMusic
      loadAction(commit,payload,'FINDALLMUSIC')
    },
    findAllRoles({commit},payload={}){
      payload.api = apis.findRoles
      loadAction(commit,payload,'FINDALLROLES')
    },
    findAllPermissions({commit},payload={}){
      payload.api = apis.findPermission
      spacilAction(commit,payload,'FINDALLPERMISSIONS')
    },
  }
})
