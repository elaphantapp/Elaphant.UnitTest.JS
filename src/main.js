import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import Clipboard from 'v-clipboard';
Vue.config.productionTip = false;
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(Clipboard);
Vue.use(BootstrapVue);
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');