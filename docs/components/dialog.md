---
title: Dialog
lang: zh-cn
---
# Dialog

## 基础Dialog使用
:::demo

dialog/basic

:::


## Dialog 属性

| 属性名    | 说明                         | 类型                     | 可选值                             | 默认值 |
| --------- | ---------------------------- | ------------------------ | ---------------------------------- | ------ |
| className | 自定义样式类名               | string                   | -                                  | -      |
| style     | 自定义样式                   | `object` `CSSProperties` | -                                  | -      |
| modelValue / v-model      | 是否显示 Dialog | boolean              | -                                  | -      |
| title   | 对话框 Dialog 的标题                     | `string`                 | - | -      |
| fullscreen   | 是否全屏显示                     | `boolean`                 | - | false      |
| fullscreenBtn   | 是否显示全屏按钮                     | `boolean`                 | - | false      |
| width   | 弹框宽度                     | `string` `number`                 | - | 50%      |
| closeOnClickModal   | 是否可以通过点击 modal 关闭 Dialog                     | `boolean`               | - | true      |
| showClose   | 是否显示关闭按钮                     | `boolean`               | - | true      |
| appendToBody   | Dialog 自身是否插入至 body 元素上                    | `boolean`               | - | false      |
| draggable   | 为 Dialog 启用可拖拽功能                    | `boolean`               | - | false      |
| destroyOnClose   | 当关闭 Dialog 时，销毁其中的元素                   | `boolean`               | - | true      |
| modal   | 是否需要遮罩层                   | `boolean`               | - | true      |
| top   | dialog CSS 中的 margin-top 值，默认为 15vh                   | `string`               | - | 15vh      |
| nofill   | content内容是否使用padding                  | `boolean`               | - | false      |