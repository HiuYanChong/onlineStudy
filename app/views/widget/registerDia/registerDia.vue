<template>
  <div>
    <el-dialog title="注册" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="老师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">注 册</el-button>
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
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          password: '',
          confirmPassword: '',
          role: '',
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, trigger: 'blur', validator: validatePass },

          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      register() {
        const pass = encrypt.encryptByMd5(this.form.password);
        this.$http.post('/api/addUser', {
          username: this.form.name,
          role: this.form.role,
          password: pass,
        }).then(response => {
          this.dialogFormVisible = false;
          if (response.body.data.id) {
            window.location.href = '/';
          }
        }, error => {
          console.error(error);
        });
      }
    }
  }
</script>