---
title: Labelme
lang: zh-cn
---

# Labelme

在线标注图片

:::demo

labelme/basic

:::

## Labelimg 属性

| 属性名    | 说明                         | 类型                     | 可选值                             | 默认值 |
| --------- | ---------------------------- | ------------------------ | ---------------------------------- | ------ |
| className | 自定义样式类名               | string                   | -                                  | -      |
| style     | 自定义样式                   | `object` `CSSProperties` | -                                  | -      |
| classes   | 标注类型名称列表             | string[]                 | -                                  | -      |
| data      | 标注图片地址和标注的数据列表 | ImageItem[]              | -                                  | -      |
| options   | 全局配置                     | `object`                 | [options](./labelimg#options-配置) | -      |
