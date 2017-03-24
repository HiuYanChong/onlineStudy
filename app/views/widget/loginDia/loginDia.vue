<template>
  <div>
    <el-dialog title="登录" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item type="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import encrypt from '../../component/encryption';

  export default {
    data () {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          password: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      login() {
        const time = new Date() * 1;
        let pass = encrypt.encryptByMd5(this.form.password);
        pass += time;
        this.$http.post('/api/login', {
          username: this.form.name,
          password: pass,
          tid: time,
        }).then(response => {
          console.log(response);
          this.dialogFormVisible = false;
          if(response.body.data.id) {
            window.location.href = '/';
          }
        }, response => {
          console.log(response);
        });
      }
    }
  }
</script>