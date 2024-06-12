<script setup lang="ts">
const options = {
	classes: ['三色瓶', '大白瓶', '小白瓶', '杂色瓶', '玻璃', '铁'],
	list: [
		{
			imageSrc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
			labels: [
				{
					type: 3,
					startX: 87,
					startY: 72,
					rectWidth: 235,
					rectHeight: 323,
					canvasWidth: 375,
					canvasHeight: 500,
				},
				{
					startX: 120,
					startY: 108,
					rectWidth: 207,
					rectHeight: 221,
					canvasWidth: 375,
					canvasHeight: 500,
					type: 1,
				},
				{
					startX: 25,
					startY: 115,
					rectWidth: 176,
					rectHeight: 263,
					canvasWidth: 375,
					canvasHeight: 500,
					type: 2,
				},
			],
		},
		{
			imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
			labels: [
				{
					startX: 120,
					startY: 108,
					rectWidth: 207,
					rectHeight: 221,
					canvasWidth: 375,
					canvasHeight: 500,
					type: 1,
				},
			],
		},
	],
};
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
		<NextLabelimg :options="options" @change="onChangeLabel" @save="onSave"> </NextLabelimg>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	// background-color: #f5f5f5;
	// height: 500px;
}
</style>
