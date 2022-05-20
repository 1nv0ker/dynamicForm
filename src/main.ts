import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import 'ant-design-vue/dist/antd.css';
import 'element-plus/dist/index.css'
createApp(App).use(Antd).use(ElementPlus).use(store).use(router).mount('#app')
