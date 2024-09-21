<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['动物-马', '动物-鹿', '动物-狼', '动物-狐狸']);
const list = ref<any>([
	{
		id: 3,
		imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
		labels: [
			{
				path: [
					[84, 248],
					[154, 265],
					[161, 367],
					[101, 388],
					[63, 358],
					[51, 265],
					[51, 265],
				],
			},
		],
	},
	{
		id: 4,
		imageSrc: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
		labels: {},
	},
]);
const onEditPolygon = (arg: any) => {
	// console.log(arg);
};
const onSave = (node, done) => {
	console.log(node);
	setTimeout(() => {
		done();
	}, 500);
};
</script>

<template>
	<div class="container">
		<NextLabelme :classes="classes" :data="list" @edit-polygon="onEditPolygon" @save="onSave"></NextLabelme>
	</div>
</template>

<style lang="scss" scoped></style>
