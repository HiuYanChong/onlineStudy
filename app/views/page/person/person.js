/**
 * Created by ucweb on 17/3/24.
 */
import Vue from 'vue';
import person from './person.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.debug = true;

new Vue(person);