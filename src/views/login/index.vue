<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
    </div>
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="user.checked">我已同意用户协议和隐私协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click="onSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import { login } from  '@/api/user'

  export default {
    name: 'LoginIndex',
    data () {
      return {
        user: {
          mobile: '13911111111',
          code: '246810',
          checked: true,
        },
        loading: false,
        formRules: {
          mobile: [
            { required: true ,message: '请输入手机号', trigger: 'blur'},
            { pattern: /^1[3|5|7|8|9]\d{9}$/,message: '请输入正确的手机号',trigger: 'change'  }
          ],
          code: [
            { required: true ,message: '验证码不能为空', trigger: 'blur'},
            {pattern: /^\d{6}$/, required: true ,message: '验证码不正确', trigger: 'blur'},
          ],
          checked: [
            {
                validator: (rule,value,callback) => {
                    if(value){
                      callback()
                    }else{
                      callback(new Error('必须同意用户协议'))
                    }

                },
              message: '请勾选同意用户协议',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {

      login() {
        this.loading = true
       login(this.user).then(res => {
          this.loading = false
          console.log(res)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
         window.localStorage.setItem('user',JSON.stringify(res.data.data))
          this.$router.push({
            name:'home'
          })
        }).catch(err => {
          this.loading = false
          this.$message.error('登录失败')
        })
      },
      onSubmit () {
        this.$refs['login-form'].validate((valid,err) => {
          if(valid){
            this.login();
          }
        });
      },
    }
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
  }

  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
  }

  .login-btn {
    width: 100%;
  }
</style>
