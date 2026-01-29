<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';

const menuCatalog: { label: string; value: string }[] = [
	{
		label: '配置管理',
		value: '配置管理',
	},
	{
		label: '系统管理',
		value: '系统管理',
	},
];
const menuDict = [
	{
		value: '/',
		label: '首页',
		component: 'src/router/pages-dynamic/home.vue',
		title: 'router.home',
	},
	{
		value: '/system/dept',
		label: '部门管理',
		component: 'src/router/pages-dynamic/system/dept.vue',
		title: 'router.system.dept',
	},
	{
		value: '/system/dict',
		label: '字典管理',
		component: 'src/router/pages-dynamic/system/dict.vue',
		title: 'router.system.dict',
	},
	{
		value: '/system/menu',
		label: '菜单管理',
		component: 'src/router/pages-dynamic/system/menu.vue',
		title: 'router.system.menu',
	},
	{
		value: '/system/role',
		label: '角色管理',
		component: 'src/router/pages-dynamic/system/role.vue',
		title: 'router.system.role',
	},
	{
		value: '/system/tenant',
		label: '租户管理',
		component: 'src/router/pages-dynamic/system/tenant.vue',
		title: 'router.system.tenant',
	},
	{
		value: '/system/tlog',
		label: '操作日志',
		component: 'src/router/pages-dynamic/system/tlog.vue',
		title: 'router.system.tlog',
	},
	{
		value: '/system/user',
		label: '用户管理',
		component: 'src/router/pages-dynamic/system/user.vue',
		title: 'router.system.user',
	},
];
const haveTitles = ref<string[]>([]);
const havePaths = ref<string[]>([]);
const options = reactive({
	viewBtn: false,
	operationsWidth: 260,
	operationsColumnAlign: 'right',
	formColumns: [
		{
			prop: 'component',
			label: '组件路径',
			required: true,
			disabled: true,
			formHide: true,
			sort: 2,
		},
		{
			prop: 'isAffix',
			label: '导航栏固定',
			type: 'radio',
			sort: 7,
			formDefaultValue: 0,
			dicData: [
				{
					value: 1,
					label: '固定',
				},
				{
					value: 0,
					label: '不固定',
				},
			],
		},
		{
			prop: 'isCache',
			label: '是否缓存',
			type: 'radio',
			sort: 8,
			formDefaultValue: 0,
			dicData: [
				{
					value: 1,
					label: '是',
				},
				{
					value: 0,
					label: '否',
				},
			],
		},
	],
	columns: [
		{
			prop: 'title',
			label: '菜单名称',
			searchType: 'input',
			required: true,
			minWidth: 200,
			align: 'left',
			sort: 2,
			type: 'select',
			formFilterable: true,
			formAllowCreate: true,
			loadDicData: (_col: any, done: (_data: any[]) => void) => {
				const _menuCatalog = menuCatalog.filter(o => !haveTitles.value?.includes(o.value));
				done(_menuCatalog);
			},
			onClear: (col: any) => {
				const prevValue = col._defaultValue;
				const catalog = menuCatalog.find(o => o.value === prevValue);
				const index = col.dicData?.findIndex(o => o.value === prevValue);
				if (catalog && index === -1) {
					col.dicData?.push(catalog);
				}
			},
		},
		{
			prop: 'path',
			label: '菜单路由',
			align: 'left',
			required: true,
			minWidth: 200,
			sort: 2,
			type: 'select',
			loadDicData: (col: any, done: (data: any[]) => void) => {
				const _menuDict = menuDict.filter(o => !havePaths.value?.includes(o.value));
				done(_menuDict);
			},
			onChange: (val: any, _col: any, formParams: any) => {
				const current: any = menuDict.find(o => o.value === val);
				nextTick(() => {
					formParams.title = current.title;
					formParams.component = current.component;
				});
			},
			onClear: (col: any) => {
				const prevValue = col._defaultValue;
				const menu = menuDict.find(o => o.value === prevValue);
				const index = col.dicData?.findIndex(o => o.value === prevValue);
				if (menu && index === -1) {
					col.dicData?.push(menu);
				}
			},
		},
		{
			prop: 'menuType',
			label: '类型',
			type: 'radio',
			required: true,
			sort: 1,
			formDefaultValue: 1,
			span: 24,
			dicData: [
				{
					value: 1,
					label: '目录',
				},
				{
					value: 2,
					label: '菜单',
				},
			],
			onChange: (val: any, _col: any, formParams: any, _formColumns: any[], formColumnsMap: Map<string, any>) => {
				formColumnsMap.get('title').hide = val === 2;
				formColumnsMap.get('path').hide = val === 1;
				formColumnsMap.get('component').hide = val === 1;
				if (val === 1) {
					formParams['title'] = '';
					formParams['component'] = '';
					formColumnsMap.get('title').dicData = menuCatalog.filter(o => !haveTitles.value.includes(o.value));
					formColumnsMap.get('title').onClear(formColumnsMap.get('title'));
				} else if (val === 2) {
					formParams['path'] = '';
					formColumnsMap.get('path').dicData = menuDict.filter(o => !havePaths.value.includes(o.value));
					formColumnsMap.get('path').onClear(formColumnsMap.get('path'));
				}
			},
		},
		{
			prop: 'icon',
			label: '图标',
			required: true,
			width: 80,
			sort: 3,
			defaultValue: 'iconfont next-yuandian',
		},
		{
			prop: 'sortNum',
			label: '序号',
			type: 'inputInteger',
			required: true,
			sort: 5,
		},
		{
			prop: 'status',
			label: '菜单状态',
			type: 'radio',
			sort: 6,
			defaultValue: 1,
			dicData: [
				{
					value: 1,
					label: '显示',
				},
				{
					value: 0,
					label: '隐藏',
				},
			],
		},
		{
			prop: 'remark',
			label: '备注',
			type: 'textarea',
			span: 24,
			width: 180,
			sort: 20,
		},
	],
});

const tableReactive = reactive({
	loading: false,
	page: {
		pageNo: 1,
		pageSize: 10,
		total: 10,
	},
	data: [] as any[],
});
const crudTable = ref<any>(null);
const loadTableData = searchParams => {
	const menuTree = [
		{
			id: 1,
			title: '首页',
			menuType: 2,
			path: '/',
		},
		{
			id: 2,
			title: '系统管理',
			menuType: 1,
			path: '',
			children: [
				{
					id: 21,
					title: '部门管理',
					menuType: 2,
					path: '/system/dept',
				},
				{
					id: 22,
					title: '菜单管理',
					menuType: 2,
					path: '/system/menu',
				},
			],
		},
	];
	tableReactive.data = menuTree;
	haveTitles.value = ['系统管理'];
	havePaths.value = ['/', '/system/dept', '/system/menu'];
};
const onConfirmSearch = (searchParams: any) => {
	loadTableData(searchParams);
};
const onDeleteRow = () => {};
const onDeleteRows = () => {};
const onsubmitForm = () => {};
const onClickAddEdit = ({ row, formColumnsMap }) => {
	const menuType = row.menuType || 1;
	formColumnsMap.get('title').hide = menuType === 2;
	formColumnsMap.get('path').hide = menuType === 1;
	formColumnsMap.get('component').hide = menuType === 1;
	if (menuType === 1) {
		formColumnsMap.get('title').dicData = menuCatalog.filter(o => !haveTitles.value.includes(o.value));
		formColumnsMap.get('title').onClear(formColumnsMap.get('title'));
	} else if (menuType === 2) {
		formColumnsMap.get('path').dicData = menuDict.filter(o => !havePaths.value.includes(o.value));
		formColumnsMap.get('path').onClear(formColumnsMap.get('path'));
	}
};
const openRowAddEdit = (row: any) => {
	crudTable.value.onClickRowAdd({
		parentId: row.id,
	});
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
			@confirm-search="onConfirmSearch"
			@click-add-edit="onClickAddEdit"
			@delete-row="onDeleteRow"
			@delete-rows="onDeleteRows"
			@submit-form="onsubmitForm"
		>
			<template #column-path="{ row }">
				<span v-if="row.path">{{ row.path }}</span>
				<div v-else style="text-align: center">-</div>
			</template>
			<template #operation-column-prefix="{ scoped, btn }">
				<el-button v-if="scoped.row.menuType === 1" :size="btn.size" type="primary" :text="btn.text" :plain="btn.plain" @click="openRowAddEdit(scoped.row)">
					<template #icon>
						<Plus />
					</template>
					新增子菜单
				</el-button>
			</template>
		</NextCrudTable>
	</div>
</template>

<style lang="scss" scoped></style>
