import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  mutations: {
    // 对数组进行赋值
    initList(state, list) {
      state.list = list
    },
    // 为state中的inputValue进行赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 向列表中新增item项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.unshift(obj)
      state.inputValue = ''
      state.nextId++
    },
    // 根据id删除对应事项
    removeItem(state, id) {
      console.log(1)

      state.list = state.list.filter(x => {
        console.log(3)
        return x.id !== id
      })

      console.log(2)
    },
    // 根据id修改对象事项的状态
    changeDone(state, id) {
      console.log(1)
      state.list.forEach((x) => {
        console.log(3)
        if (x.id === id) {
          x.done = !x.done
        }
      })
      console.log(2)
    },
    // 清除已完成的项目
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 更改按钮组件的颜色高亮
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
