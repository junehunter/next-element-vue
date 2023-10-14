<script setup lang="ts">
const modelUrl = new URL('../assets/models/best_web_model/model.json', import.meta.url).href;
const onRecognition = (tf, video) => {};
</script>

<template>
	<div class="layout-container">
		<NextVideoPlayer :modelUrl="modelUrl" type="m3u8" src="http://220.161.87.62:8800/hls/0/index.m3u8" @recognition="onRecognition"></NextVideoPlayer>
		<!-- <NextVideoPlayer type="m3u8" src="http://220.161.87.62:8800/hls/1/index.m3u8"></NextVideoPlayer> -->
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	background-color: #f5f5f5;
	height: 350px;
}
</style>
