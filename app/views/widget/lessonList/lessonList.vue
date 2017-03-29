<template>
  <div>
    <div class="lesson-list" v-show="lessonList">
      <el-row>
        <el-col :span="6" v-for="(item, index) in lessonList" :offset="1" >
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
      <el-row>
        <el-pagination
            layout="total, prev, pager, next"
            :total="totalCount"
            :page-count="5"
            @current-change="changePage"
            :page-size="pageSize">
        </el-pagination>
      </el-row>
    </div>
    <div class="no-lesson-list" v-show="!lessonList">
      还没有该类别课程哦~敬请期待
    </div>
  </div>
</template>

<style lang="sass">
  @import 'node_modules/reset-css/_reset';
  @import 'app/views/style/gobal';

  .no-lesson-list {
    box-sizing: border-box;
    font-size: 18px;
    height: 200px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    color: #99A9BF;
    padding-top: 90px;
  }

  .lesson-list {
    padding: 20px;
  }

  el-button {
    margin-top: 10px;
  }


  .lesson-card {
    margin-bottom: 20px;
    cursor: pointer;
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
    margin-top: 10px;
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

</style>

<script>
  //es6
  import Bus from '../../component/bus.vue';

  export default {
    components: {
    },
    data () {
      return {
        useRole: '',
        userId: '',
        userName: '',
        lessonType: '',
        lessonList: null,
        pageSize: 20,
        totalCount: null,
      }
    },
    mounted() {
      Bus.$on('CHECK_LOGIN_DONE', userInfo => {
        this.userRole = userInfo.role;
        this.userId = userInfo.id;
        this.userName = userInfo.name;
      });

      const Url = new URL(window.location.href);
      const searchParams = Url.searchParams;
      this.lessonType = searchParams.get('type') || '';
      console.log(this.lessonType);
      this.askForList(1);
    },
    methods: {
      changePage(currentPage) {
        this.askForList(currentPage);
      },
      askForList(currentPage) {
        this.lessonList = null;
        this.$http.post('/api/lessonList', {
          type: this.lessonType,
          pageSize: this.pageSize,
          page: currentPage,
        }).then(res => {
          if (res.body.data) {
            this.lessonList = res.body.data.lessonList;
            this.totalCount = res.body.data.totalCount;
          }
        })
      },
      toLessonPage(index) {
        const lessonId = this.lessonList[index]._id;
        window.location.href = `/lesson/${lessonId}`;
      },
    }
  }
</script>