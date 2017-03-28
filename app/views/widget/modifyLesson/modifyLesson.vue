<template>
  <div>
    <el-dialog :title="name" v-model="dialogFormVisible">
      <el-form>
        <el-form-item label="已有课程视频" :label-width="formLabelWidth">
          <el-table
              :data="videoList"
              border
              style="width: 100%">
            <el-table-column
                label="视频"
                width="180">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="deleteLessonVideo(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        </el-form-item>
        <el-form-item label="增加课程视频" :label-width="formLabelWidth">
          <el-upload
              class="upload"
              drag
              action="/api/uploadVideo"
              :on-success="videoUploadSuccess"
              mutiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="删除课程" :label-width="formLabelWidth">
          <el-button type="primary" @click="deleteLesson">删除课程</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyLesson">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Bus from '../../component/bus.vue';
  export default {
    data() {
      return {
        _id: '',
        name: '',
        videoList: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
      }
    },
    mounted() {
      Bus.$on('MODIFY_LESSON', info => {
        this._id = info._id;
        this.name = info.name;
        this.videoList = info.videoList;
        this.dialogFormVisible = true;
      })
    },
    methods: {
      reset() {
        this._id = '';
        this.name = '';
        this.videoList = '';
        this.dialogFormVisible = false;
      },
      deleteLessonVideo(index, row) {
        if(this.videoList[index] === row) {
          this.videoList.splice(index, 1);
        }
      },
      videoUploadSuccess(res, file) {
        if (res.data.src) {
          this.videoList.push({
            src: res.data.src[0],
            name: file.name,
          });
        }
      },
      deleteLesson() {
        const self = this;
        this.$http.post('/api/deleteLesson', {
          lessonId: this._id,
        }).then(() => {
          self.reset();
        })
      },
      modifyLesson() {
        const self = this;
        this.$http.post('/api/modifyLesson', {
          lessonId: this._id,
          videoList: this.videoList,
        }).then(() => {
          self.reset();
        })
      },
    }
  }
</script>