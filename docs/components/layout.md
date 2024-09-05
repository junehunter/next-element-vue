---
title: Layout
lang: zh-cn
---

## Layout 多种布局方式


:::demo

layout/basic

:::

> App.vue
```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLanguage } from 'next-element-vue';

const { messages, locale } = useI18n();
const getGlobalI18n = computed(() => {
	const localeLang = messages.value[locale.value];
	useLanguage(localeLang, locale.value);
	return localeLang;
});
</script>

<template>
	<el-config-provider :locale="getGlobalI18n">
		<router-view></router-view>
	</el-config-provider>
</template>
```

## Layout 属性

| 属性名     | 说明                      | 类型           | 可选值                  | 默认值       |
| ---------- | ------------------------ | -------------- | ---------------------- | ------------ |
| className | 自定义样式类名 | string | - | - |
| style | 自定义样式 | `object` `CSSProperties` | - | - |
| layout | 布局方式 | string | `transverse`,`columns`,`classic`, `defaults` | `transverse` |
| options | 布局全局配置 | `object` | [options](./layout#options-配置) | - |


## Layout 事件

| 事件名             | 说明                                                              | 回调参数                               |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------- |
| - | - | - |

## Layout 插槽


| 插槽名    | 说明     | 子标签  |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------- |
| default | 自定义默认内容，主要用于路由容器 | - |
| headerMenu | 自定义头部中间位置菜单栏 |  `<NextMenu>` |
| headerToolsPrefix | 自定义头部右侧工具栏前侧 | `<li>` |
| headerToolsSuffix | 自定义头部右侧工具栏后侧 | `<li>` |

## options 配置


| 属性名     | 说明                      | 类型           | 可选值                  | 默认值       |
| ---------- | ------------------------ | -------------- | ---------------------- | ------------ |
| logo | 系统logo图片地址 | string | - | - |
| title | 系统名称 | string | - | - |