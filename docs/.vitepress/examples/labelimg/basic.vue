<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['动物-马', '动物-鹿', '动物-狼', '动物-狐狸']);
const list = ref<any>([
	{
		id: 1,
		imageSrc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
		labels: [
			{
				type: 3,
				startX: 182,
				startY: 28,
				rectWidth: 418,
				rectHeight: 288,
				canvasWidth: 750,
				canvasHeight: 500,
			},
			{
				type: 1,
				startX: 216,
				startY: 163,
				rectWidth: 344,
				rectHeight: 302,
				canvasWidth: 750,
				canvasHeight: 500,
			},
		],
	},
	{
		id: 2,
		imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
		labels: [
			{
				startX: 264,
				startY: 172,
				rectWidth: 207,
				rectHeight: 221,
				canvasWidth: 750,
				canvasHeight: 500,
				type: 0,
			},
		],
	},
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
// setTimeout(() => {
// 	list.value = [
// 		{
// 			imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
// 			labels: [
// 				{
// 					startX: 120,
// 					startY: 108,
// 					rectWidth: 207,
// 					rectHeight: 221,
// 					canvasWidth: 375,
// 					canvasHeight: 500,
// 					type: 1,
// 				},
// 			],
// 		},
// 	];
// 	classes.value = [];
// 	console.log('数据更新了');
// }, 3000);
const onChangeLabel = (rects, txt) => {
	// console.log(rects);
	// console.log(txt);
};
const onSave = (node, done) => {
	console.log(node);
	setTimeout(() => {
		done();
	}, 500);
};
</script>

<template>
	<div class="layout-container">
		<NextLabelimg :classes="classes" :data="list" @change="onChangeLabel" @save="onSave"> </NextLabelimg>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	text-align: center;
	// background-color: #f5f5f5;
	// height: 700px;
}
</style>
