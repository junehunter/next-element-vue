<script setup lang="ts">
const config = {};
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
