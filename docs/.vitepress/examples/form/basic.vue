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
	key.value = 1;
	console.log(list[key.value]);
};
</script>

<template>
	<div class="container">
		<ChildForm :config="list[key]" @update-formdatum="updateFormdatum"></ChildForm>
	</div>
</template>

<style lang="scss" scoped></style>
