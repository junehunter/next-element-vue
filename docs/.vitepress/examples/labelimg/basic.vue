<script setup lang="ts">
const classes = ['三色瓶', '大白瓶', '小白瓶', '杂色瓶'];
const options = {
	classes: classes,
	list: [
		{
			imageSrc: 'http://127.0.0.1:5000/detected/image/preview/images/2024-06-06/三色瓶_00001.jpg',
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
			imageSrc: 'http://127.0.0.1:5000/detected/image/preview/images/2024-06-06/大白瓶_00003.jpg',
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
const onChangeLabel = rects => {
	console.log(rects);
};
</script>

<template>
	<div class="layout-container">
		<NextLabelimg :options="options" @change="onChangeLabel"> </NextLabelimg>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	// background-color: #f5f5f5;
}
</style>
