---
title: 快速开始
lang: zh-cn
---

## 快速开始
**完整引入**
```typescript
import { createApp } from 'vue';
import App from './App/vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import NextElement from 'next-element-vue';
import 'next-element-vue/dist/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.use(NextElement)
app.mount('#app')
```
:::tip

本组件库依赖于Element Plus，@vueuse/core等。先安装导入依赖 Element Plus和@vueuse/core...
```shell
$ pnpm add element-plus @vueuse/core vue-router vue-i18n
```

:::

## 示例

