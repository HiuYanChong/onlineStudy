<template>
  <div>
    <navigation></navigation>
    <lessonList></lessonList>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';
</style>

<script>
  //es6
  import navigation from '../../widget/navigation/navigation.vue';
  import lessonList from '../../widget/lessonList/lessonList.vue';

  export default {
    el:"#app",
    components: {
      navigation,
      lessonList,
    },
    data () {
      return {
        role: '',
        uid: '',
      }
    },
    mounted() {

    }
  }
</script>