import { defineComponent, inject, computed, isRef, unref, ref, toRaw } from 'vue';
import { ElButton, ElIcon, ElMessageBox, ElMessage } from 'element-plus';
import { Plus, Delete, Refresh, Tools } from '@element-plus/icons-vue';
import { useLocale } from 'packages/hooks';
import DrawerSetting from './widgets/drawer-setting';

export default defineComponent({
	name: 'HeaderMenu',
	setup() {
		return {};
	},
	emits: ['clickAdd', 'clickRefresh', 'deleteRows'],
	render() {
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const { t } = useLocale();
		const ns = inject('ns', {} as any);
		const multipleSelection = inject('multipleSelection') as any;
		const multipleSelectionLength = computed(() => {
			return multipleSelection.value.length;
		});
		const onClickAdd = () => {
			this.$emit('clickAdd');
		};
		const onClickBatchDelete = () => {
			const selection = unref(toRaw(multipleSelection.value.map((row: any) => toRaw(row))));
			ElMessageBox.confirm(t('next.table.message.batchDeleteTip'), t('next.table.message.tip'), {
				type: 'warning',
				showClose: false,
				center: false,
				confirmButtonText: t('next.table.message.confirmButtonText'),
				cancelButtonText: t('next.table.message.cancelButtonText'),
			})
				.then(() => {
					this.$emit('deleteRows', selection);
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: t('next.table.message.cancelBatchDelete'),
					});
				});
		};
		const onClickRefresh = () => {
			this.$emit('clickRefresh');
		};
		const drawerSettingRef = ref<InstanceType<typeof DrawerSetting>>();
		const onClickSetting = () => {
			drawerSettingRef.value!.visible = true;
		};
		const slotProps = { size: options.size, refresh: onClickRefresh };
		return (
			<div class={ns.b('header-menu')}>
				<div class={ns.b('header-menu-left')}>
					{this.$slots['menu-left-prefix']?.(slotProps)}
					{options.addBtn && (
						<ElButton type="primary" size={options.size} onClick={onClickAdd}>
							{{
								icon: () => (
									<ElIcon>
										<Plus />
									</ElIcon>
								),
								default: () => t('next.table.add'),
							}}
						</ElButton>
					)}
					{options.batchDelBtn && (
						<ElButton type="danger" size={options.size} disabled={!multipleSelectionLength.value} onClick={onClickBatchDelete}>
							{{
								icon: () => (
									<ElIcon>
										<Delete />
									</ElIcon>
								),
								default: () => t('next.table.batchDelete'),
							}}
						</ElButton>
					)}
					{this.$slots['menu-left-suffix']?.(slotProps)}
				</div>
				<div class={ns.b('header-menu-right')}>
					{this.$slots['menu-right-prefix']?.(slotProps)}
					{options.refreshBtn && (
						<ElButton circle size={options.size} onClick={onClickRefresh}>
							{{
								icon: () => (
									<ElIcon>
										<Refresh />
									</ElIcon>
								),
							}}
						</ElButton>
					)}
					{options.settingBtn && (
						<ElButton circle size={options.size} onClick={onClickSetting}>
							{{
								icon: () => (
									<ElIcon>
										<Tools />
									</ElIcon>
								),
							}}
						</ElButton>
					)}
					{this.$slots['menu-right-suffix']?.(slotProps)}
				</div>
				<DrawerSetting ref={drawerSettingRef}></DrawerSetting>
			</div>
		);
	},
});
