<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
const emit = defineEmits(['update-formdatum']);
const props = defineProps({
	config: {
		type: Object,
		default: () => ({}),
	},
});
const columns = [
	{
		prop: 'num',
		label: '编号',
		type: 'input',
		disabled: true,
		span: 24,
		required: true,
		defaultValue: props.config.num,
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
const config = ref(props.config);

const onSubmitForm = (formParams: any, done: Function, error: Function) => {
	emit('update-formdatum');
	done();
};
watch(
	() => props.config,
	() => {
		Object.assign(config.value, props.config);
		console.log(config);
	}
);
</script>

<template>
	<NextForm ref="nextFormRef" :options="{ labelWidth: '8em' }" :formDatum="config" :columns="columns" @submit="onSubmitForm"> </NextForm>
</template>

<style lang="scss" scoped></style>
