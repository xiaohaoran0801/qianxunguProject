import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/myaxios'
import './apis/apis'
import './mixin'
Vue.use(ElementUI,{size:'mini'});

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
     next();
  }else{
    var token = localStorage.getItem("token");
    if(token){
       next();
    }else{
       next({path:'/login',query:{redirect:to.path}})
    }
  }
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
