<script setup lang="ts">
import { reactive, ref } from 'vue';
import ChildForm from './child-form.vue';

const config = reactive({
	num: '001',
	name: 'next element',
	url: 'xxx',
});
const list = [
	{
		num: '001',
		name: 'next element',
		url: 'xxx',
	},
	{
		num: '002',
		name: 'next element vue',
		url: 'xxxxx',
	},
];
const key = ref<number>(0);
const updateFormdatum = () => {
	key.value++;
	if (key.value > 1) key.value = 0;
	Object.assign(config, list[key.value]);
};
const onReset = () => {
	Object.assign(config, { num: '000', name: '重置' });
};
</script>

<template>
	<div class="container">
		<ChildForm :config="config" @update-formdatum="updateFormdatum" @reset="onReset"></ChildForm>
	</div>
</template>

<style lang="scss" scoped></style>
