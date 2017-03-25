<template>
  <div>
    <el-dialog title="创建新课程" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="课程名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程分类" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择课程分类">
            <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频文件上传" :label-width="formLabelWidth">
          <el-upload
              class="upload"
              drag
              action="//jsonplaceholder.typicode.com/posts/"
              mutiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">请先上传课程视频,再点击创建课程</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        options: [{
          value: 'mobile',
          label: '移动开发'
        }, {
          value: 'FE',
          label: '前端开发'
        }, {
          value: 'server',
          label: '后端开发'
        }, {
          value: 'testing',
          label: '运维与测试'
        }, {
          value: 'bingData',
          label: '大数据'
        }, {
          value: 'other',
          label: '其他'
        }],
        form: {
          name: '',
          type: '',
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur'},
          ],
          type: [
            { required: true, message: '请选择课程分类', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      create() {

      }
    }
  }
</script>