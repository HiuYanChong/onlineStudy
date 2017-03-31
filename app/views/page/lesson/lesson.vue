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
            controls preload="auto" width="640" height="400"
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
        <div class="teacher">
          授课老师: {{ lessonInfo.userName }}
        </div>
        <div class="attend-class">
          <el-button type="primary" class="button"
                     v-show="!isAttended"
                     @click.stop="attendLesson()">参加课程</el-button>
          <el-button type="primary" class="button"
                     v-show="isAttended"
                     @click.stop="quitLesson()">退出课程</el-button>
        </div>
      </div>
    </div>
    <realTimeTalk :userName="userName" :lessonId="lessonId"></realTimeTalk>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';

  .lesson-area {
    width: 900px;
    margin: 0 auto 0 100px;
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

    .info-area {
      margin-top: 30px;
      width: 640px;
      position: relative;

      .teacher {
        font-size: 18px;
      }

      .attend-class {
        position: absolute;
        top: -10px;
        right: 10px;
      }
    }
  }


</style>

<script>
  //es6
  import navigation from '../../widget/navigation/navigation.vue';
  import realTimeTalk from '../../widget/realTimeTalk/realTimeTalk.vue';
  import Video from 'video.js';
  import Bus from '../../component/bus.vue';

  export default {
    el:"#app",
    components: {
      navigation,
      realTimeTalk,
    },
    data () {
      return {
        userRole: '',
        userId: '',
        userName: '',
        lessonId: '',
        lessonInfo: null,
        staticServer: 'http://127.0.0.1:8080',
        onPlay: 0,
        attendLessonList: null,
        socket: null,
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
      },
      isAttended() {
        if (this.attendLessonList) {
          const result = this.attendLessonList.indexOf(this.lessonId);
          return result !== -1;
        } else {
          return false;
        }
      }
    },
    mounted() {
      Bus.$on('CHECK_LOGIN_DONE', userInfo => {
        this.userRole = userInfo.role;
        this.userId = userInfo.id;
        this.userName = userInfo.name;
        this.$http.post('/api/getAttendLesson', {
          userId: this.userId,
        }).then(res => {
          if (res.body.data) {
            this.attendLessonList = res.body.data.lesson;
          }
        })
      });

      this.lessonId = document.getElementById('lesson-id').innerHTML;
      this.$http.post('/api/searchLessonByLessonId', {
        lessonId: this.lessonId,
      }).then(res => {
        if (res.body.data.lesson) {
          this.lessonInfo = res.body.data.lesson[0];
        }
      });
    },
    methods: {
      play(index) {
        if (index === this.onPlay) {
          return 'on-play';
        }
      },
      changePlay(index) {
        this.onPlay = index;
      },
      attendLesson() {
        const lessonId = this.lessonId;
        const userId = this.userId;
        if (userId) {
          this.$http.post('/api/attendLesson', {
            lessonId,
            userId,
          }).then(res => {
            // 更新attendLessonList
            if (res.body.data && res.body.data.attend) {
              this.attendLessonList.push(res.body.data.lessonId);
            }
          })
        } else {
          //TODO
          // 提醒登录
        }
      },
      quitLesson() {
        const lessonId = this.lessonId;
        const userId = this.userId;
        if (userId) {
          this.$http.post('/api/quitLesson', {
            lessonId,
            userId,
          }).then(res => {
            if (res.body.data && res.body.data.quit) {
              const index = this.attendLessonList.indexOf(res.body.data.lessonId);
              console.log(index);
              this.attendLessonList.splice(index, 1);
            }
          })
        } else {
          //TODO
          // 提醒登录
        }
      },
    }
  }
</script>