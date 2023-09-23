<script setup lang="ts">
import { reactive } from 'vue';
import { useDateFormat, useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();
const nowTimestamp = new Date().getTime();
const startTime = useDateFormat(nowTimestamp - 1000 * 60 * 60 * 24, 'YYYY-MM-DD HH:mm:ss').value;
const endTime = useDateFormat(nowTimestamp, 'YYYY-MM-DD HH:mm:ss').value;
const options = reactive({
	searchLabelWidth: '4em',
	border: true,
	operationsWidth: 220,
	addBtn: true,
	editBtn: true,
	delBtn: true,
	viewBtn: true,
	batchDelBtn: true,
	searchColumn: [
		{
			type: 'datetimerange',
			prop: 'timeRange',
			label: '时间范围',
			defaultValue: [startTime, endTime],
		},
	],
	columns: [
		{
			prop: 'name',
			label: '姓名',
			type: 'input',
			searchType: 'input',
			align: 'left',
			sort: 2,
			onChangeForm: e => {
				console.log(e);
			},
		},
		{
			prop: 'email',
			label: '邮箱',
			searchType: 'input',
			minWidth: 200,
		},
		{
			prop: 'username',
			label: '登录账户名',
			type: 'input',
		},
		{
			prop: 'phone',
			label: '手机号',
			minWidth: '120px',
			searchType: 'inputInteger',
			formSort: 3,
			formRequired: true,
			sort: 1,
		},
		{
			prop: 'sex',
			label: '性别',
			sortable: true,
			formSort: 3,
			formType: 'select',
			dicData: [
				{
					value: '1',
					label: '男',
				},
				{
					value: '2',
					label: '女',
				},
			],
		},
		{
			prop: 'job',
			label: '职务',
			searchType: 'select',
			type: 'select',
			multiple: true,
			dicData: [
				{
					value: '1',
					label: '计算机/互联网/通信',
				},
				{
					value: '2',
					label: '生产/工艺/制造',
				},
			],
		},
		{
			prop: '权限角色',
			label: '权限角色',
			minWidth: '120px',
		},
		{
			prop: '创建用户',
			label: '创建用户',
			minWidth: '120px',
		},
		{
			prop: 'slelectUser',
			label: '绑定用户',
			type: 'input',
			sort: 8,
		},
		{
			label: '时间范围',
			type: 'datetimerange',
			formSort: 4,
		},
		{
			prop: 'data',
			label: '数据范围',
			type: 'numberRange',
			sort: 5,
		},
	],
});
const tableReactive = reactive({
	loading: false,
	page: {
		pageIndex: 1,
		pageSize: 10,
		total: 50,
	},
	data: [
		{
			id: 1,
			name: '张三',
			email: 'zhangsan@XXX.com',
			username: 'zhngsan',
			sex: '1',
			phone: '1888888888',
			job: '董事长',
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
			children: [
				{
					id: 2,
					name: '李四',
					email: 'zhangsan@XXX.com',
					username: 'zhngsan',
					sex: '1',
					phone: '1888888888',
					job: '董事',
					startDate: '2023-9-7 12:00:00',
					endDate: '2023-9-9 12:00:00',
				},
			],
		},
		{
			id: 3,
			name: '王五',
			email: 'zhangsan@XXX.com',
			username: 'zhngsan',
			sex: '1',
			phone: '1888888888',
			job: '普通员工',
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
		},
	],
});
const onConfirmSearch = searchParams => {
	tableReactive.loading = true;
	setTimeout(() => {
		tableReactive.loading = false;
	}, 500);
};
const onChangePagination = page => {
	console.log(page);
};
const onClickAddEdit = () => {};
const onDeleteRow = (scoped, done) => {
	console.log(scoped);
	setTimeout(() => {
		// 删除后刷新数据
		done();
	}, 200);
};
const onDeleteRows = (rows, done) => {
	console.log(rows);
	setTimeout(() => {
		// 删除后刷新数据
		done();
	}, 200);
};
const onsubmitForm = (fromParams: any, done: Function) => {
	console.log(fromParams);
	done();
};
</script>

<template>
	<div class="layout-container">
		<NextCrudTable
			:loading="tableReactive.loading"
			:data="tableReactive.data"
			:options="options"
			:page="tableReactive.page"
			@confirmSearch="onConfirmSearch"
			@changePagination="onChangePagination"
			@click-add-edit="onClickAddEdit"
			@delete-row="onDeleteRow"
			@delete-rows="onDeleteRows"
			@submit-form="onsubmitForm"
		>
			<template #form-name="{ row }">
				<div>自定义表单{{ row.name }}列</div>
			</template>
			<template #column-name="{ row }">
				<span>{{ row.name }}</span>
			</template>
		</NextCrudTable>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	width: 100%;
	height: 600px;
}
</style>
