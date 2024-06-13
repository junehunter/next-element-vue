<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['三色瓶', '大白瓶', '小白瓶', '杂色瓶', '玻璃', '铁']);
const list = ref<any>([
	{
		id: 1,
		imageSrc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
		labels: [
			{
				type: 3,
				startX: 87,
				startY: 72,
				rectWidth: 235,
				rectHeight: 323,
				canvasWidth: 750,
				canvasHeight: 500,
			},
			{
				startX: 120,
				startY: 108,
				rectWidth: 207,
				rectHeight: 221,
				canvasWidth: 750,
				canvasHeight: 500,
				type: 1,
			},
		],
	},
	{
		id: 2,
		imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
		labels: [
			{
				startX: 120,
				startY: 108,
				rectWidth: 207,
				rectHeight: 221,
				canvasWidth: 750,
				canvasHeight: 500,
				type: 1,
			},
		],
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
	console.log(rects);
	console.log(txt);
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
	// background-color: #f5f5f5;
	// height: 500px;
}
</style>
