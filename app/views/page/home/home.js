import Vue from 'vue';
import home from './home.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.debug = true;

new Vue(home);

