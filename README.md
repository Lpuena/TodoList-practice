# demo2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

# TodoList案例

## vuex

**vuex** 有 **State**、**Getters**、**Mutations**、**Actions** 四个模块。State 和 Getters 是两个计算属性，数据存储在 state 中，getters 只是数据的包装器，用来修饰数据。数据的更改只能在 mutaions 中，异步的处理放在 actions中。只要是数据的更改必须写在mutaions中。

### 组件弹出警告栏 （Message 全局提示）

```javascript
this.$message.error('错误红色')
this.$message.warning('警告黄色')
```

### 向数组中，添加对象

> 先定义一个对象出来，再用push() 或 unshift() 方法来添加进数组

```javascript
const obj ={
	id:'',
	info:'',
	done:''
}
state.list.push(obj)
```

### 给元素绑定动态class样式

> 利用三元表达式 和v-bind 来动态绑定

```vue
<a-checkbox :checked="item.done" :class="item.done ? 'textDecoration' : ''" @click="changeDoneById(item.id)">{{ item.info }}</a-checkbox>
```


See [Configuration Reference](https://cli.vuejs.org/config/).
