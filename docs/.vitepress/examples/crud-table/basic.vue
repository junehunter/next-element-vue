<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useDateFormat, useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();
let id = 0;
const nowTimestamp = new Date().getTime();
const startTime = useDateFormat(nowTimestamp - 1000 * 60 * 60 * 24, 'YYYY-MM-DD HH:mm:ss').value;
const endTime = useDateFormat(nowTimestamp, 'YYYY-MM-DD HH:mm:ss').value;
const options = reactive({
	searchLabelWidth: '4em',
	border: true,
	operationsWidth: 320,
	// formSpanFixed: 12,
	addBtn: true,
	editBtn: true,
	delBtn: true,
	viewBtn: true,
	batchDelBtn: true,
	loadFormDetail: (params, done) => {
		console.log('加载详情数据', params);
		setTimeout(() => {
			done({
				name: '张三',
				age: 20,
				email: 'zhangsan@example.com',
				username: 'zhangsan',
				phone: '13800000000',
				sex: '1',
				job: '1',
			});
		}, 3000);
	},
	searchColumns: [
		{
			type: 'datetimerange',
			prop: 'timeRange',
			label: '时间范围',
			defaultValue: [startTime, endTime],
			startPlaceholder: '自定义开始时间',
			endPlaceholder: '自定义结束时间',
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
			formHide: false,
			onChangeForm: e => {
				console.log(e);
			},
		},
		{
			prop: 'age',
			label: '年龄',
			type: 'input',
			sort: 8,
			cellUnit: '岁',
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
			clearable: false,
		},
		{
			prop: 'sex',
			label: '性别',
			sortable: true,
			formSort: 3,
			formType: 'radio',
			dicData: [],
			loadDicData: (col, done) => {
				setTimeout(() => {
					const dicData = [
						{
							value: '1',
							label: '男',
						},
						{
							value: '2',
							label: '女',
						},
					];
					done(dicData);
				}, 3000);
			},
		},
		{
			prop: 'job',
			label: '职务',
			searchType: 'select',
			type: 'select',
			multiple: false,
			editDisabled: true,
			dicData: [],
			sort: 5,
			formFilterable: true,
			formAllowCreate: true,
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
					console.log('更新了数据');
					done(dicData);
				}, 300);
			},
			onChange: (event: Event, col: any, formParams: any, formColumns: any[], formColumnsMap: Map<string, any>) => {
				formColumnsMap.get('name')!.label = '监听改变了姓名';
				console.log('onChange', event, col, formParams, formColumns, formColumnsMap);
			},
			onClear: (col: any, formParams: any, formColumns: any[], formColumnsMap: Map<string, any>) => {
				console.log('onClear', col, formParams, formColumns, formColumnsMap);
			},
		},
		{
			prop: '权限角色',
			label: '权限角色',
			minWidth: '120px',
		},
		{
			prop: 'deptId',
			label: '所属部门',
			minWidth: '120px',
			type: 'treeSelect',
			sort: 6,
			dicKey: 'id',
			// showCheckbox: true,
			// multiple: true,
			dicData: [
				{
					id: 1,
					parentId: 0,
					label: '某某科技有限公司',
					children: [
						{
							id: 2,
							parentId: 1,
							label: '研发部',
							children: [],
						},
						{
							id: 3,
							parentId: 1,
							label: '财务部',
							children: [],
						},
					],
				},
			],
			onClear: (col: any, formParams: any, formColumns: any[], formColumnsMap: Map<string, any>) => {
				console.log('onClear', col, formParams, formColumns, formColumnsMap);
			},
		},
		{
			prop: 'region',
			label: '地区',
			type: 'cascader',
			searchType: 'cascader',
			sort: 5,
			dicData: [],
			treeSelectProps: {
				value: 'id',
				label: 'name',
				separator: '/',
				lazy: true,
				lazyLoad: (node: any, resolve: (_data: any[]) => void, reject: () => void) => {
					const { level, config } = node;
					const region = config._formParams?.region || [];
					setTimeout(() => {
						const nodes = Array.from({ length: level + 1 }).map(item => ({
							id: ++id,
							name: `Option - ${id}`,
							leaf: level >= 2,
						}));
						resolve(nodes);
					}, 200);
				},
			},
			// loadDicData: (col, done) => {
			// 	setTimeout(() => {
			// 		const dicData = [
			// 			{
			// 				value: '1',
			// 				label: '广东省',
			// 				children: [
			// 					{
			// 						value: '11',
			// 						label: '广州市',
			// 						children: [
			// 							{
			// 								value: '111',
			// 								label: '天河区',
			// 							},
			// 							{
			// 								value: '112',
			// 								label: '天河区',
			// 							},
			// 						],
			// 					},
			// 					{
			// 						value: '12',
			// 						label: '番禺区',
			// 					},
			// 					{
			// 						value: '13',
			// 						label: '海珠区',
			// 					},
			// 				],
			// 			},
			// 		];
			// 		console.log('更新了数据');
			// 		done(dicData);
			// 	}, 300);
			// },
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
		pageNo: 1,
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
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
			age: 30,
			deptId: 2,
			region: ['1', '11', '111'],
			children: [
				{
					id: 2,
					name: '李四',
					email: 'zhangsan@XXX.com',
					username: 'zhngsan',
					sex: '1',
					phone: '1888888888',
					age: 30,
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
			age: 30,
			job: '2',
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
			region: ['1', '12'],
		},
		{
			id: 5,
			name: '王丽',
			email: 'zhangsan@XXX.com',
			username: 'zhngsan',
			sex: '2',
			phone: '1888888888',
			age: 30,
			job: '3',
			startDate: '2023-9-7 12:00:00',
			endDate: '2023-9-9 12:00:00',
		},
	],
});
const crudTable = ref<any>();
setTimeout(() => {
	options.columns[0].formHide = true;
	options.columns[0].label = '哈哈哈';
}, 5000);
const onConfirmSearch = searchParams => {
	tableReactive.loading = true;
	console.log(crudTable.value.getSearchFormParams());
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
const onRefresh = () => {
	crudTable.value.onRefresh();
};
</script>

<template>
	<div class="layout-container">
		<NextCrudTable
			ref="crudTable"
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
			<template #menu-left-prefix="{ size }">
				<el-button type="primary" :size="size" @click="onRefresh">
					<template #icon>
						<el-icon><RefreshLeft /></el-icon>
					</template>
					刷新
				</el-button>
			</template>
			<template #form-name="{ formParams }">
				<div>自定义表单{{ formParams.name }}列</div>
			</template>
			<template #column-name="{ row }">
				<span>{{ row.name }}</span>
			</template>
			<template #operation-column-prefix="{ scoped, btn }">
				<el-button :size="btn.size" type="primary" :text="btn.text" :plain="btn.plain">
					<template #icon>
						<el-icon><RefreshLeft /></el-icon>
					</template>
					刷新
				</el-button>
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
