<!-- markdownlint-disable MD033 -->
<h1 align="center">
   <b>
        <a href="https://junehunter.github.io/next-element-vue" target="_blank"><img height="100px" src="https://junehunter.github.io/next-element-vue/logo.svg" alt="next-element-vue" /></a><br>
    </b>
</h1>
<p align="center">🚀基于Element Plus封装的高级组件库，快速、灵活配置搭建你的应用</p>
<p align="center">
    <a href="https://www.npmjs.com/package/next-element-vue">
        <img src="https://img.shields.io/npm/v/next-element-vue?color=42b883&label=pnpm" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/next-element-vue">
        <img src="https://img.shields.io/npm/dm/next-element-vue.svg?style=flat" alt="downloads">
    </a>
    <a href="https://github.com/junehunter/next-element-vue/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="license">
    </a>
</p>
<p align="center">
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b> 🌐 Website</b></a>
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b> 📘 Documentation</b></a>
    <a href="https://github.com/junehunter/next-element-vue/issues" target="_blank"><b> 💬  Issues</b></a>
</p>

## ✨ 特性

- 📦 开箱即用：基于 Element Plus 二次封装，统一设计风格
- ⚡ 高效开发：丰富的业务组件，减少重复工作
- 🎨 灵活配置：支持按需加载、主题定制、多语言
- 🛠️ 最佳实践：内置 Vue Router / i18n / VueUse 支持
- 🤖 AI 标注支持：内置图片/文本/音视频标注工具，轻松集成到 AI 训练流程

## 📦 安装

> node 版本建议 >= 20
> pnpm 版本建议 >= 10.x

```shell

# pnpm
$ pnpm add next-element-vue
# Yarn
$ yarn add next-element-vue
# NPM
$ npm install next-element-vue --save
```

## 🚀 快速开始

### 完整引入

```typescript
import { createApp } from 'vue';
import App from './App/vue';
// 先安装导入依赖 Element Plus，@vueuse/core，vue-router，vue-i18n
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import NextElement from 'next-element-vue';
import 'next-element-vue/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(NextElement);
app.mount('#app');
```

---

🎬 AI视频识别

![视频识别](https://junehunter.github.io/next-element-vue/assets/images/video_00.png)

🖼️ labelimg标注

![labelimg标注](https://junehunter.github.io/next-element-vue/assets/images/labelimg_00.png)

🖼️ labelme标注

![labelimg标注](https://junehunter.github.io/next-element-vue/assets/images/labelme_00.png)

---

## 📚 文档

👉 [完整文档](https://junehunter.github.io/next-element-vue)

## 🧩 生态支持

- ✅ Element Plus: UI 基础组件
- ✅ Vue Router: 内置路由支持
- ✅ Vue I18n: 国际化解决方案
- ✅ VueUse: 常用 hooks 工具库
- ✅ AI 工具集成: 内置图片/文本/音视频标注能力

## 📄 License

[MIT](https://github.com/junehunter/next-element-vue/blob/main/LICENSE)
