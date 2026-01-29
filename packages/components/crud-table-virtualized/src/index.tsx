import { defineComponent, computed, unref, provide, reactive } from 'vue';
import { NextSpinLoading, NextDialog } from 'packages/components';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone } from 'packages/hooks/global-hook';
import { merge } from 'lodash-unified';
import propsConfig from './props-config';
import defaultConfig from './default-config';

const ns = useNamespace('crud-table-virtualized');
export default defineComponent({
	name: 'NextCrudTableVirtualized',
	props: propsConfig,
	setup(props, { emit }) {
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('options', computed(() => _options.value)); // prettier-ignore
		const { t } = useLocale();
		const addEditDialog = reactive({
			visible: false,
			title: t('next.table.add'),
			rowInfo: {} as any,
			isEditing: true,
		});

		const onCloseAddEditDialog = () => {
			addEditDialog.visible = false;
			addEditDialog.title = '';
			addEditDialog.rowInfo = {};
			emit('close-add-edit');
		};
		const renderContent = () => {
			return (
				<div class={[ns.b(), props.className]}>
					<NextSpinLoading></NextSpinLoading>

					<NextDialog
						v-model={addEditDialog.visible}
						title={addEditDialog.title}
						width={options.dialogWidth}
						fullscreen={options.dialogFullscreen}
						closeOnClickModal={options.dialogCloseOnClickModal}
						onClose={onCloseAddEditDialog}
					></NextDialog>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
