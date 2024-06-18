import { defineComponent, ref, inject, isRef, unref } from 'vue';
import { ElDrawer, ElScrollbar, ElTable, ElTableColumn, ElCheckbox } from 'element-plus';
import { useLocale } from 'packages/hooks';
import type { TableColumnProps } from '../config';
import { NextTextEllipsis } from 'packages/components/text-ellipsis';

export default defineComponent({
	name: 'DrawerSetting',
	setup() {
		const visible = ref<boolean>(false);
		return { visible };
	},
	render() {
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const columns = ref<TableColumnProps[]>(options.columns);
		const { t } = useLocale();
		const ns = inject('ns', {} as any);

		return (
			<ElDrawer v-model={this.visible} title={t('next.table.setting.title')} append-to-body size="450px" class={ns.b('setting-drawer')}>
				<ElScrollbar class={ns.be('setting-drawer', 'container')}>
					<ElTable data={columns.value} border style={{ width: '100%' }}>
						<ElTableColumn prop="label" label={t('next.table.setting.label')} align="center">
							{({ row }) => <NextTextEllipsis content={t(row.label)}></NextTextEllipsis>}
						</ElTableColumn>
						<ElTableColumn prop="hide" label={t('next.table.setting.hide')} align="center" width={'70px'}>
							{({ row }) => <ElCheckbox v-model={row.hide}></ElCheckbox>}
						</ElTableColumn>
						<ElTableColumn prop="filter" label={t('next.table.setting.filter')} align="center" width={'70px'}>
							{({ row }) => <ElCheckbox v-model={row.filter}></ElCheckbox>}
						</ElTableColumn>
						<ElTableColumn prop="sort" label={t('next.table.setting.sort')} align="center" width={'70px'}>
							{({ row }) => <ElCheckbox v-model={row.sortable}></ElCheckbox>}
						</ElTableColumn>
					</ElTable>
				</ElScrollbar>
			</ElDrawer>
		);
	},
});
