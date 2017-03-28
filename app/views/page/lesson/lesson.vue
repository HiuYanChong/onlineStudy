<template>
  <div>
    <navigation></navigation>
    <div class="lesson-area" v-if="lessonInfo">
      <h1 class="lesson-name">{{ lessonInfo.name }}</h1>
      <div class="video-area">
        <video
            :src="playAddr"
            id="my-player"
            class="video-js"
            controls preload="auto" width="960" height="600"
            :poster="poster"
            data-setup='{}'>
        </video>
        <div class="lesson-ul">
          <h2>课程视频列表</h2>
          <ul>
            <li v-for="(item, index) in lessonInfo.videoList"
                :class="play(index)"
                @click="changePlay(index)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="info-area">
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';

  .lesson-area {
    width: 1200px;
    margin: 0 auto;
    .lesson-name {
      font-size: 20px;
      margin:10px 0;
    }

    .video-area {
      position: relative;
    }

    #my-player {
      overflow: hidden;
    }

    .lesson-ul {
      box-sizing: border-box;
      background: #475669;
      padding: 20px;
      position: absolute;
      right: 20px;
      top: 0px;
      width: 200px;
      max-height: 600px;
      overflow: hidden;

      h2 {
        font-size: 15px;
        padding: 20px;
        color: #fff;
      }
      li {
        font-size: 10px;
        color: #EFF2F7;
        padding: 15px;
        cursor: pointer;
        border-bottom: 1px solid #fff;
      }

      li.on-play {
        color: black;
      }
    }
  }


</style>

<script>
  //es6
  import navigation from '../../widget/navigation/navigation.vue';
  import Video from 'video.js';
  import Bus from '../../component/bus.vue';

  export default {
    el:"#app",
    components: {
      navigation,
    },
    data () {
      return {
        userRole: '',
        userId: '',
        lessonId: '',
        lessonInfo: null,
        staticServer: 'http://127.0.0.1:8080',
        onPlay: 0,
      }
    },
    computed: {
      poster() {
        return this.staticServer + this.lessonInfo.coverImg;
      },
      videoList() {
        const list = [];
        this.lessonInfo.videoList.forEach((item) => {
          list.push(this.staticServer + item.src);
        });
        return list;
      },
      playAddr() {
        return this.videoList[this.onPlay];
      }
    },
    mounted() {
      Bus.$on('CHECK_LOGIN_DONE', userInfo => {
        this.userRole = userInfo.role;
        this.userId = userInfo.id;
      });

      this.lessonId = document.getElementById('lesson-id').innerHTML;
      this.$http.post('/api/searchLessonByLessonId', {
        lessonId: this.lessonId,
      }).then(res => {
        if (res.body.data.lesson) {
          this.lessonInfo = res.body.data.lesson[0];
        }
      })
    },
    methods: {
      play(index) {
        if (index === this.onPlay) {
          return 'on-play';
        }
      },
      changePlay(index) {
        this.onPlay = index;
      }
    }
  }
</script>