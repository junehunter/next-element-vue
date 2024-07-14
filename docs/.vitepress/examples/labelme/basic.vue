<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['动物-马', '动物-鹿', '动物-狼', '动物-狐狸']);
const list = ref<any>([
	{
		id: 3,
		imageSrc: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
		labels: [],
	},
	{
		id: 4,
		imageSrc: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
		labels: [],
	},
]);
</script>

<template>
	<div class="container">
		<NextLabelme :classes="classes" :data="list"></NextLabelme>
	</div>
</template>

<style lang="scss" scoped></style>
