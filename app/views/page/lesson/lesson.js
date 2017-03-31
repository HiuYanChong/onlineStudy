/**
 * Created by ucweb on 17/3/28.
 */
import Vue from 'vue';
import lesson from './lesson.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.debug = true;

new Vue(lesson);
