<template>
  <div>
    <navigation></navigation>
    <div class="result-area" v-show="resultList[0]">
      <h1 class="result-title">搜索结果</h1>
      <el-row>
        <el-col :span="6" v-for="(item, index) in resultList" :offset="1" >
          <div class="lesson-card" @click="toLessonPage(index)">
            <el-card :body-style="{ padding: '10px' }" class="lesson">
              <img :src="'http://127.0.0.1:8080'+ item.coverImg" class="image" alt="课程图片">
              <div style="padding: 14px;">
                <span>{{ item.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.createAt }}</time>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="no-result" v-show="!resultList[0]">
      暂无匹配的搜索结果
    </div>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';

  .result-area {
    margin-top: 30px;

    .result-title {
      font-size: 20px;
      margin: 30px 0 30px 50px;
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
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

  .no-result {
    box-sizing: border-box;
    font-size: 18px;
    height: 200px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    color: #99A9BF;
    padding-top: 90px;
  }
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
        resultList: [],
        search: '',
      }
    },
    mounted() {
      const Url = new URL(window.location.href);
      const searchParams = Url.searchParams;
      this.search = searchParams.get('search') || '';
      console.log(this.search);
      this.$http.post('/api/searchLessonByName', {
        lessonName: this.search
      }).then(res => {
        if(res.body.data) {
          this.resultList = res.body.data.lesson;
        }
      })
    },
    methods: {
      toLessonPage(index) {
        const lessonId = this.resultList[index]._id;
        window.location.href = `/lesson/${lessonId}`;
      },
    }
  }
</script>