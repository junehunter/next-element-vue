<script setup lang="ts"></script>

<template>
	<div class="layout-container">
		<NextContainer>
			<div class="main"></div>
		</NextContainer>
		<NextContainer scrollbar padding="0">
			<div class="main"></div>
		</NextContainer>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	background-color: #f5f5f5;
	.main {
		background-color: #c8c9cc;
		height: 300px;
	}
}
</style>
