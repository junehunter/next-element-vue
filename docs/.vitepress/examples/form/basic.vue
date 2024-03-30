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
		prop: 'url',
		label: '地址',
		type: 'input',
		span: 24,
		required: true,
	},
];

const onSubmitForm = (formParams: any, done: Function, error: Function) => {
	done();
};
const onReset = () => {};
</script>

<template>
	<NextForm ref="nextFormRef" :options="{ labelWidth: '8em' }" :formDatum="config" :columns="columns" @submit="onSubmitForm" @reset="onReset"> </NextForm>
</template>

<style lang="scss" scoped></style>
