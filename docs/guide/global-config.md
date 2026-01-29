---
title: 全局配置
lang: zh-cn
---
## 全局配置

```typescript
import NextElement from 'next-element-vue';
app.use(NextElement, {
    size: 'small', // 全局大小
    crudTable: {
        btnText: false, // 表格组件操作按钮是否显示文本
        btnPlain: false, // 表格组件操作按钮是否为朴素按钮
        btnSize: 'small', // 表格组件操作按钮大小
    },
});

```