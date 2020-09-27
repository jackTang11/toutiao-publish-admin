<template>
  <div class="article">
    <el-card class="filter-card">
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              :value="null"
              label="全部"/>
            <el-option
              v-for="(channel,index) in channels"
              :key="index"
              :value="channel.id"
              :label="channel.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="rangDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading"  type="primary" @click="loadArticles">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        根据筛选条件查询到 {{totalCount}} 条结果：
      </div>
      <el-table
        :data="articles"
        stripe
        size="mini"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" class="article-cover">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit" circle
              type="primary"
            ></el-button>
            <el-button
              type="danger" icon="el-icon-delete" circle @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        />
    </el-card>

  </div>
</template>

<script>
  import { getArticles,getArticleChannels,deleteArticle } from '@/api/articles'

  export default {
    name: 'ArticleIndex',
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        articles: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        page:1,
        totalCount:1,
        pageSize:20,
        status: null,
        channels: [],
        rangDate: null,
        channelId: null,
        loading: true
      }
    },
    created () {
      this.loadArticles()
      this.loadArticleChannel();
    },
    methods: {
      onSubmit () {
        console.log('submit!')
        this.loadArticles();

      },

      loadArticles () {
        this.loading = true;
        getArticles({page: this.page,
          per_page:this.pageSize,
          status:this.status,
          channel_id: this.channelId,
          begin_pubdate: this.rangDate? this.rangDate[0] : null,
          end_pubdate: this.rangDate? this.rangDate[1] : null,
        }).then(res => {
          this.loading = false;
          const { results , total_count : totalCount} = res.data.data;
          this.articles = results
          this.totalCount = totalCount;
          console.log(this.totalCount)
        }).catch(e => {
          this.loading = false;
        })
      },

      loadArticleChannel(){
          getArticleChannels().then(res => {
            this.channels = res.data.data.channels
          })
      },

      onCurrentChange(page){
        this.page = page;
        this.loadArticles();
      },

      onDeleteArticle(id){
        this.$confirm('确认要删除吗？','提示',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteArticle(id).then(res => {
            console.log(res)
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 20px;
  }

  .article-cover {
    width: 60px;
    background-size: cover;
  }
</style>
