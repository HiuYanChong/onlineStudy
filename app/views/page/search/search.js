import Vue from 'vue';
import search from './search.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.debug = true;

new Vue(search);