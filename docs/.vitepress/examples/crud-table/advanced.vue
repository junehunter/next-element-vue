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
	searchColumn: [],
	formLabelWidth: '6em',
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
			disabled: true,
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
			dicData: [],
			formSort: 6,
			loadDicData: (col, done) => {
				setTimeout(() => {
					const dicData = [
						{
							value: '1',
							label: '董事长',
						},
						{
							value: '2',
							label: '总经理',
						},
						{
							value: '3',
							label: '财务总监',
						},
					];
					done(dicData);
				}, 3000);
			},
		},
		{
			prop: 'industry',
			label: '行业',
			minWidth: '120px',
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
			type: 'inputTableSelect',
			sort: 8,
			tableSelectProps: {
				value: 'id',
				label: 'name',
			},
			onTableSelect: (formParams, rows, col) => {
				console.log(formParams, rows, col);
			},
			tableSelectDefaultValue: (row, col, done) => {
				const tags = row.slelectUserTags;
				done(tags);
			},
			tableSelect: {
				selectType: 'checkbox',
				loadData: (searchParams, resolve) => {
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
			},
		},
		{
			prop: 'image',
			label: '上传图片',
			type: 'uploadImage',
			sort: 20,
			span: 24,
			tip: '限制上传一张图片',
			onChangeForm: (file: any, files: any[], formParams: any) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.raw);
				reader.onload = (event: any) => {
					const res = event.target.result;
					formParams.image = res;
				};
			},
		},
		{
			prop: 'datetimerange',
			label: '开始结束时间',
			searchType: 'datetimerange',
			searchSort: 4,
			defaultValue: [startTime, endTime],
			children: [
				{
					prop: 'startDate',
					label: '开始时间',
					minWidth: 160,
				},
				{
					prop: 'endDate',
					label: '结束时间',
					minWidth: 160,
				},
			],
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
			job: '1',
			industry: '1',
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
					job: '3',
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
			job: '2',
			industry: '2',
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
			image: new URL('/logo.svg', import.meta.url).href,
			slelectUser: [3, 4],
			slelectUserTags: [
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
					id: 2,
					name: '李四',
					type: '测试1',
					createDate: '2023-9-7 12:00:00',
				},
			],
		},
	],
});
const onConfirmSearch = searchParams => {
	console.log(searchParams);
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
			<template #menu-left-suffix="{ size }">
				<el-button type="primary" :size="size">
					<template #icon>
						<el-icon><Upload /></el-icon>
					</template>
					<span>批量上传</span>
				</el-button>
			</template>
			<template #form-name="{ formParams }">
				<div>自定义表单{{ formParams.name }}列</div>
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
