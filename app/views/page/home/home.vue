<template>
  <div>
    <navigation></navigation>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';
</style>

<script>
  //es6
  import navigation from '../../widget/navigation/navigation.vue';

  export default {
    el:"#app",
    components: {
      navigation,
    },
    data () {
      return {
        role: '',
        uid: '',
      }
    },
    mounted() {
      /*this.$http.post('/api/addUser', {
        username: '111',
        password: '222',
      }).then(response => {
        console.log(response);
      }, response => {
        console.log(response);
      });*/
    }
  }
</script>