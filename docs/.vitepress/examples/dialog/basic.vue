<script setup lang="ts">
import { reactive } from 'vue';

const dialog = reactive({
	visible: false,
});
</script>

<template>
	<div class="container">
		<el-button type="primary" @click="dialog.visible = true">打开</el-button>
		<NextDialog v-model="dialog.visible" title="弹框">
			<div>自定义插槽内容</div>
		</NextDialog>
	</div>
</template>

<style lang="scss" scoped></style>
