<template>
  <div class="real-time-talk">
    <div class="talk-title">实时讨论区</div>
    <div class="message-list" id="message-list">
      <div class="message" v-for="(item, index) in messageList">
        {{ item }}
      </div>
    </div>
    <el-row>
      <el-col :span="20">
        <el-input class="input" v-model="msg" placeholder="参与到实时讨论吧"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click.stop="sendMsg">发送消息</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="sass">
  .real-time-talk {
    margin: 30px 0 0 100px;
    width: 640px;
    backgound-color: #99A9BF;
    border: 4px solid #99A9BF;
    border-radius: 10px;
    box-sizing: border-box;

    .talk-title {
      font-size: 20px;
      padding:10px;
      border-bottom: 4px solid #99A9BF;
    }
    .message-list {
      height: 350px;
      overflow: auto;
    }
    .message {
      font-size: 18px;
      padding: 5px;
      border-bottom: 1px solid #99A9BF;
      color: #324057;
    }
  }
</style>

<script>
  import io from 'socket.io-client/dist/socket.io.js';

  export default {
    props: ['userName', 'lessonId'],
    mounted() {
      this.socket = io(`http://localhost:9000/${this.lessonId}`);
      this.socket.on('connect', ()=> {

      });
      this.socket.on('new message', (user, msg) => {
        this.messageList.push(`${user}:${msg}`);
        this.scrollToBottom();
      });
      this.messageListDom = document.getElementById('message-list');
    },
    data () {
      return {
        messageList: [],
        msg: null,
        messageListDom: null,
      }
    },
    methods: {
      sendMsg() {
        if (this.msg && this.userName) {
          this.socket.emit('message',this.userName, this.msg);
          this.msg = null;
        } else if (!this.userName) {

        }
      },
      scrollToBottom(){
        this.messageListDom.scrollTop = this.messageListDom.scrollHeight + 20;
      }
    },
  }
</script>