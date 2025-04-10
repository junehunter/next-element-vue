<script setup lang="ts">
import { reactive } from 'vue';
const options = {
	label: '用户名称',
	prop: 'slelectUserTags',
	tableSelectDefaultValue: (row, col, done) => {
		const tags = row.slelectUserTags;
		done([{ id: 1, name: 'zhangs' }]);
	},
	tableSelect: {
		selectType: 'radio',
		addBtn: true,
		columns: [
			{
				prop: 'name',
				label: '用户名称',
				searchType: 'input',
			},
			{
				prop: 'type',
				label: '用户类型',
			},
			{
				prop: 'createDate',
				label: '创建时间',
			},
		],
		onTableSelect: (formParams, rows, col) => {
			console.log(formParams, rows, col);
		},
		loadData: (formParams: any, { pageIndex, pageSize }: any, resolve: Function) => {
			setTimeout(() => {
				const res = {
					data: [
						{
							id: 1,
							name: '张三',
							type: '测试1',
							createDate: '2023-9-7 12:00:00',
						},
						{
							id: 2,
							name: '李四',
							type: '测试2',
							createDate: '2023-9-7 12:20:00',
						},
						{
							id: 3,
							name: '王五',
							type: '测试1',
							createDate: '2023-9-7 12:00:00',
						},
						{
							id: 4,
							name: '李丽',
							type: '测试1',
							createDate: '2023-9-7 12:00:00',
						},
						{
							id: 5,
							name: '昊天',
							type: '测试1',
							createDate: '2023-9-7 12:00:00',
						},
					],
					total: 3,
				};
				resolve(res);
			}, 1000);
		},
	},
};
const formParams = reactive({
	name: '张三',
	type: '测试1',
	createDate: '2023-9-7 12:00:00',
	slelectUserTags: 1,
});
const onSelectTable = rows => {
	console.log(rows);
};
</script>

<template>
	<div class="container">
		<NextInputTableSelect :column="options" closable :formParams="formParams" @select="onSelectTable"></NextInputTableSelect>
	</div>
</template>

<style lang="scss" scoped></style>
