<template>
  <div>
    <div class="editor-title">
      <span>共享编辑器</span>
      <span>
          <el-select v-model="mode"
                     @change="modeChange"
                     placeholder="请选择代码语言">
          <el-option
              v-for="item in languageOptions"
              :label="item.label"
              :value="item.value"
              >
          </el-option>
        </el-select>
        </span>
    </div>
    <codemirror class="myEditor"
                ref="myEditor"
                :code="code"
                @change="codeChange"
                :options="editorOptions"
    ></codemirror>
  </div>
</template>

<style lang="sass">
  .editor-title {
    font-size: 18px;
    position: absolute;
    top: 0;
    right: 200px;
  }
  .CodeMirror {
    width: 500px!important;
    height: 350px!important;
    position: absolute!important;
    top: 50px!important;
    right: 100px;
  }
</style>
<script>
  import io from 'socket.io-client/dist/socket.io.js';
  import { codemirror, CodeMirror } from 'vue-codemirror';

  export default {
    props: ['lessonId'],
    data () {
      return {
        socket: null,
        codeTimer: null,
        code: 'var a = 10;',
        mode: 'text/javascript',
        editor: null,
        editorOptions: {
          tabSize: 2,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          styleSelectedText: true,
        },
        languageOptions: [{
          value: 'text/x-csrc',
          label: 'C'
        }, {
          value: 'text/x-c++src',
          label: 'C++'
        }, {
          value: 'text/x-java',
          label: 'Java'
        }, {
          value: 'text/javascript',
          label: 'Javascript'
        }, {
          value: 'text/x-php',
          label: 'PHP'
        }, {
          value: 'text/x-python',
          label: 'Python'
        }],
      }
    },
    mounted() {
      this.socket = io(`http://localhost:9000/${this.lessonId}`);
      this.socket.on('new code', (code) => {
        this.code = code;
      });
    },
    methods: {
      codeChange(code) {
        clearTimeout(this.codeTimer);
        this.codeTimer = setTimeout((code) => {
          this.socket.emit('code', code);
        }, 800, code);
      },
      modeChange(){
        this.$refs.myEditor.editor.setOption("mode", this.mode);
      }
    },
    components: {
      codemirror,
    },
  }
</script>