<script setup lang="ts">
import { NextSpinLoading } from 'next-element-vue';
</script>

<template>
	<div class="layout-container">
		<NextSpinLoading :loading="true">
			<div style="height: 200px; background-color: #f5f5f5"></div>
		</NextSpinLoading>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
}
</style>
