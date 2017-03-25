<template>
  <div>
    <navigation></navigation>
    <div class="personal-board">
      <el-row class="class-title">
        <el-col :span="3"><div class="grid-content title">{{ this.titleText }}</div></el-col>
        <el-col :span="2" v-if="role === '1'">
          <el-button type="primary" icon="plus" @click="createLesson">创建课程</el-button>
        </el-col>
      </el-row>
      <div class="class-area">
        <!-- 有课程 -->
        <el-row v-show="classes[0]">
          <el-col :span="6" v-for="(index, item) in classes" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="" class="image" alt="课程图片">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">11111111111</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 无课程 -->
        <el-row class="no-class">
          <div v-if="role === '1' && !classes[0]">
            您还没开授任何课程,快点点击创建课程按钮开创新课程吧~
          </div>
          <div v-if="role === '2' && !classes[0]">
            您还没参与任何课程,快点参与您感兴趣的课程吧~
          </div>
        </el-row>
      </div>
    </div>

    <!-- 课程创建弹窗 -->
    <lessonCreation ref="lessonCreation"></lessonCreation>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';

  .personal-board {
    padding: 20px;
    .class-title {
      margin-bottom:10px;
    }

    .title {
      font-size: 20px;
      color: #475669;
      padding:8px 0;
    }

    .class-area {
      border: 3px solid #EFF2F7;
      border-radius: 30px;
    }

    .no-class {
      div {
        box-sizing: border-box;
        font-size: 18px;
        height: 200px;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        color: #99A9BF;
        padding-top: 90px;
      }
    }

    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }

  }
</style>

<script>
  //es6
  import navigation from '../../widget/navigation/navigation.vue';
  import lessonCreation from '../../widget/lessonCreation/lessonCreation.vue';
  import Bus from '../../component/bus.vue';

  export default {
    el:"#app",
    components: {
      navigation,
      lessonCreation,
    },
    data () {
      return {
        role: '',
        id: '',
        classes: [],
      }
    },
    mounted() {
      Bus.$on('CHECK_LOGIN_DONE', (userInfo) => {
        this.role = userInfo.role;
        this.id = userInfo.id;
      });
    },
    computed: {
      titleText() {
        return this.role === '1' ? '我的开授课程' : '我参与的课程';
      }
    },
    methods: {
      createLesson() {
        this.$refs.lessonCreation.dialogFormVisible = true;
      }
    }
  }
</script>