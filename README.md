<h1 align="center">
   <b>
        <a href="https://junehunter.github.io/next-element-vue" target="_blank"><img height="100px" src="https://junehunter.github.io/next-element-vue/logo.svg" /></a><br>
    </b>
</h1>
<p align="center">基于Element Plus封装的高级组件库，快速、灵活配置搭建你的应用</p>
<p align="center">
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b>Website</b></a> •
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b>Documentation</b></a>
</p>

## 安装

```shell
# node版本建议>=16 pnpm >= 8.X.X
# pnpm
$ pnpm add next-element-vue

# Yarn
$ yarn add next-element-vue

# NPM
$ npm install next-element-vue --save
```

## 快速开始
**完整引入**
```typescript
import { createApp } from 'vue';
import App from './App/vue';
// 先安装导入依赖 Element Plus，@vueuse/core，vue-router，vue-i18n
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import NextElement from 'next-element-vue';
import 'next-element-vue/dist/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.use(NextElement)
app.mount('#app')
```



****
**持续更新中...**