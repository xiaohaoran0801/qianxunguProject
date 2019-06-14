import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/myaxios'
import apis from '@/apis/apis'

Vue.use(Vuex)
const loadAction = (commit,payload,mutationName)=>{
  axios.get(payload.api,{pageNo:payload.pageNo,pageSize:payload.pageSize})
  .then((resp)=>{
    resp = resp.data;
    commit(mutationName,resp)
  })
}
export default new Vuex.Store({
  state: {
    allType:[],
    allMusic:[],
    checkDynamicCode:[]
  },
  getters:{
    allType(state){
      return state.allType
    },
    allMusic(state){
      return state.allMusic
    },
  },
  mutations: {
    FINDALLTYPE(state,payload){
      state.allType = payload.data
    },
    FINDALLMUSIC(state,payload){
      state.allMusic = payload.data
    },
  
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
  
  }
})
