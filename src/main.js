import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import Clipboard from 'v-clipboard';
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';
import Elastos from "elastos-wallet-js";
import uuid from 'uuid/v1';
import _ from 'lodash';
Vue.config.productionTip = false;
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(Clipboard);
Vue.use(BootstrapVue);
Vue.prototype.$elastos = Elastos;
Vue.prototype.$uuid = uuid;
Vue.prototype.$lodsh = _;
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://dbs.westus2.cloudapp.azure.com:8080'), //options object is Optional
}));
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');