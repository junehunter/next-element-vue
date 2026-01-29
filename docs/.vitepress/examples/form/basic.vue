<script setup lang="ts">
import { ElDivider } from 'element-plus';
import { h } from 'vue';

const config = {
	slelectUserTags: '',
};
const columns = [
	{
		prop: 'num',
		label: '编号',
		type: 'input',
		disabled: true,
		span: 24,
		required: true,
		defaultValue: '这是一个默认值',
	},
	{
		prop: 'name',
		label: '名称',
		type: 'input',
		span: 24,
		required: true,
		renderDivider: () => {
			return h(
				ElDivider,
				{
					vertical: true,
					contentPosition: 'left',
				},
				{
					default: '这里是分割线了',
				}
			);
		},
	},
	{
		prop: 'number',
		label: '浮点数',
		type: 'inputNumber',
		span: 24,
		required: true,
		tip: '请输入浮点数',
	},
	{
		prop: 'code',
		label: '行政区域code',
		type: 'cascader',
		span: 24,
		required: true,
		dicData: [
			{
				label: '广东省',
				value: 'gd',
				children: [
					{
						label: '广州市',
						value: 'gz',
						center: [113.234, 23.123],
						children: [
							{
								label: '天河区',
								value: 'gt',
								center: [113.234, 23.123],
							},
							{
								label: '越秀区',
								value: 'yg',
								center: [113.234, 23.123],
							},
						],
					},
				],
			},
		],
	},
	{
		prop: 'url',
		label: '地址',
		type: 'input',
		span: 24,
		required: true,
	},
	{
		label: '用户名称',
		prop: 'slelectUserTags',
		type: 'inputTableSelect',
		required: true,
		tableSelectDefaultValue: (row, col, done) => {
			const tags = row.slelectUserTags;
			done([{ id: 1, name: 'zhangs' }]);
		},
		onTableSelect: (formParams, rows, col) => {
			console.log(formParams, rows, col);
		},
		tableSelect: {
			selectType: 'radio',
			addBtn: true,
			columns: [
				{
					prop: 'name',
					label: '用户名称',
					searchType: 'input',
				},
				{
					prop: 'type',
					label: '用户类型',
				},
				{
					prop: 'createDate',
					label: '创建时间',
				},
			],
			loadData: (formParams: any, { pageNo, pageSize }: any, resolve: Function) => {
				setTimeout(() => {
					const res = {
						data: [
							{
								id: 1,
								name: '张三',
								type: '测试1',
								createDate: '2023-9-7 12:00:00',
							},
							{
								id: 2,
								name: '李四',
								type: '测试2',
								createDate: '2023-9-7 12:20:00',
							},
							{
								id: 3,
								name: '王五',
								type: '测试1',
								createDate: '2023-9-7 12:00:00',
							},
							{
								id: 4,
								name: '李丽',
								type: '测试1',
								createDate: '2023-9-7 12:00:00',
							},
							{
								id: 5,
								name: '昊天',
								type: '测试1',
								createDate: '2023-9-7 12:00:00',
							},
						],
						total: 3,
					};
					resolve(res);
				}, 1000);
			},
		},
	},
];

const onSubmitForm = (formParams: any, done: Function, error: Function) => {
	console.log(formParams);
	done();
};
const onReset = () => {};
</script>

<template>
	<NextForm ref="nextFormRef" :options="{ labelWidth: '3em' }" :formDatum="config" :columns="columns" @submit="onSubmitForm" @reset="onReset"> </NextForm>
</template>

<style lang="scss" scoped></style>
