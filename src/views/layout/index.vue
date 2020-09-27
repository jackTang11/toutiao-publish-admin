<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu"
                 :is-collapse="isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
          }"
             @click="isCollapse = !isCollapse"></i>
          <span>牛逼的管理系统</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo"
                 alt="">
            <span>{{ user.name}} </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppAside from './components/aside'
  import { getUserInfo } from '@/api/user'

  export default {
    name: 'LayoutIndex',
    components: { AppAside },
    data(){
      return {
        user:{},
        isCollapse: true
      };
    },
    methods:{
      loadUserProfile(){
        getUserInfo().then(value => {
          console.log(value)
          this.user = value.data.data;
        });
      },

      onLogout(){
        this.$confirm('确认退出吗？','退出提示',{
          confirmButtonText:'确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
          window.localStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(()=>{
        })
      }
    },
    created () {
        this.loadUserProfile();
    },
  }
</script>

<style scoped lang="less">

  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .aside {
    background-color: #d3dce6;
  }

  .aside-menu {
    height: 100%;
  }

  .header {
    /*background-color: #b3c0d1;*/
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    align-items: center;
  }

  .main {
    background-color: #e9eef3;
  }

  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      padding-top: 10px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
</style>
