---
title: Labelimg
lang: zh-cn
---

# Labelimg

在线标注图片

:::demo

labelimg/basic

:::
在线预览图片

:::demo

labelimg/preview

:::

## Labelimg 属性

| 属性名    | 说明                         | 类型                     | 可选值                             | 默认值 |
| --------- | ---------------------------- | ------------------------ | ---------------------------------- | ------ |
| className | 自定义样式类名               | string                   | -                                  | -      |
| style     | 自定义样式                   | `object` `CSSProperties` | -                                  | -      |
| classes   | 标注类型名称列表             | string[]                 | -                                  | -      |
| data      | 标注图片地址和标注的数据列表 | ImageItem[]              | -                                  | -      |
| options   | 全局配置                     | `object`                 | [options](./labelimg#options-配置) | -      |

#### ImageItem 属性

| 属性名   | 说明       | 类型        | 可选值 | 默认值 |
| -------- | ---------- | ----------- | ------ | ------ |
| imageSrc | 图片地址   | string      | -      | -      |
| labels   | 标注的数据 | RectProps[] | -      | -      |

##### RectProps 属性

| 属性名       | 说明     | 类型   | 可选值 | 默认值 |
| ------------ | -------- | ------ | ------ | ------ |
| type         | 标注类型 | number | -      | -      |
| startX       | 标注数据 | number | -      | -      |
| startY       | 标注数据 | number | -      | -      |
| rectWidth    | 标注数据 | number | -      | -      |
| rectHeight   | 标注数据 | number | -      | -      |
| canvasWidth  | 标注数据 | number | -      | -      |
| canvasHeight | 标注数据 | number | -      | -      |

## options 配置

| 属性名            | 说明         | 类型   | 可选值 | 默认值 |
| ----------------- | ------------ | ------ | ------ | ------ |
| mainContentHeight | 标注图片高度 | number | -      | -      |

## Labelimg 事件

| 事件名 | 说明                       | 回调参数                    |
| ------ | -------------------------- | --------------------------- |
| change | 标注数据更新会触发该事件   | rects, txt                  |
| save   | 处理标注数据保存触发该事件 | node, done 函数, error 函数 |

## Labelimg Exposes

| 名稱            | 说明                         | 类型                                                                                                    |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| convertToLabel  | canvas标注数据转yolo数据格式 | Function (rect: RectProps)， 函数返回yolo数据格式                                                       |
| canvertToCanvas | yolo数据格式转canvas标注数据 | Function (labelData: number[], canvasWidth: number, canvasHeight: number)， 函数返回RectProps，数据格式 |
