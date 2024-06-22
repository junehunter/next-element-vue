<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['动物-马', '动物-鹿', '动物-狼', '动物-狐狸']);
</script>

<template>
	<div class="layout-container">
		<NextLabelimgPreview
			style="margin: 20px auto"
			:classes="classes"
			src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
			:labels="[
				{
					startX: 264.5,
					startY: 172,
					rectWidth: 207,
					rectHeight: 221,
					canvasWidth: 750,
					canvasHeight: 500,
					type: 0,
				},
			]"
		></NextLabelimgPreview>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	text-align: center;
	// background-color: #f5f5f5;
	// height: 700px;
}
</style>
