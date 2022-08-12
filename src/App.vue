<template>
  <div id="app">
    <div class="aaa">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInput"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" :class="item.done ? 'textDecoration' : ''" @click="changeDoneById(item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{unDoneLength}}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey=='all' ? 'primary' : ''" @click="changeColor('all')">全部</a-button>
          <a-button :type="viewKey=='undone' ? 'primary' : ''" @click="changeColor('undone')">未完成</a-button>
          <a-button :type="viewKey=='done' ? 'primary' : ''" @click="changeColor('done')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations(['setInputValue', 'addItemToList', 'addItem', 'removeItem', 'changeDone']),
    // 监听文本框的变化
    handleInput(e) {
      // console.log(e.target.value)
      this.setInputValue(e.target.value)
    },
    // 向列表中新增item项
    addItemToList(state) {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('输入的内容不能为空')
      }
      this.addItem()
    },
    // 根据id删除任务事项
    removeItemById(id) {
      console.log(id)
      this.removeItem(id)
    },
    // 改变事项的勾选状态
    changeDoneById(id) {
      this.changeDone(id)
    },
    // 清除已完成的项目
    clean() {
      this.$store.commit('cleanDone')
    },
    // 更改当前按钮的颜色（高亮）
    changeColor(key) {
      this.$store.commit('changeViewKey', key)
    }

  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  created() {
    this.$store.dispatch('getList')
  }
}
</script>
<style scoped>
#app {
  padding: 10px;

}
.aaa{
  width: 600px;
  margin: 0 auto;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.textDecoration {
  text-decoration: line-through;
}
</style>
