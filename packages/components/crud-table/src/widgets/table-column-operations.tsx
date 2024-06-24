import { defineComponent, inject, computed, isRef, unref } from 'vue';
import { ElTableColumn, ElTooltip, ElButton, ElIcon, ElMessageBox, ElMessage } from 'element-plus';
import { EditPen, View, Delete } from '@element-plus/icons-vue';
import { useLocale } from 'packages/hooks';
import { valueExist } from 'packages/hooks/global-hook';

export default defineComponent({
	name: 'TableColumnOperations',
	emits: ['editRow', 'viewRow', 'deleteRow'],
	setup(props, { emit, slots }) {
		const _options = inject('options') as any;
		const options = isRef(_options) ? unref(_options) : _options;
		const { t } = useLocale();
		const operationsShowText = computed(() => {
			const { operationsBtnPlain, operationsBtnText } = options;
			return operationsBtnText || operationsBtnPlain;
		});
		const onClickRowEdit = (scoped: any) => {
			emit('editRow', scoped);
		};
		const onClickRowView = (scoped: any) => {
			emit('viewRow', scoped);
		};
		const onClickRowDel = (scoped: any) => {
			ElMessageBox.confirm(t('next.table.message.deleteTip'), t('next.table.message.tip'), {
				type: 'warning',
				showClose: false,
				center: false,
				confirmButtonText: t('next.table.message.confirmButtonText'),
				cancelButtonText: t('next.table.message.cancelButtonText'),
			})
				.then(() => {
					emit('deleteRow', scoped);
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: t('next.table.message.cancelDelete'),
					});
				});
		};
		const renderContent = () => {
			const btnText = options.operationsBtnText;
			const btnPlain = options.operationsBtnPlain;
			const btnSize = options.operationsBtnSize;
			return (
				<ElTableColumn
					fixed="right"
					label={t('next.table.operation')}
					width={options.operationsWidth}
					headerAlign={valueExist(options.operationsHeaderAlign, options.headerAlign)}
					align={valueExist(options.operationsColumnAlign, options.cellAlign)}
				>
					{{
						default: scoped => (
							<>
								{slots['operation-column-prefix']?.(scoped, { text: btnText, plain: btnPlain, size: btnSize })}
								{options.editBtn ? (
									<ElTooltip enterable={false} effect="dark" content={t('next.table.edit')} placement="top" disabled={operationsShowText.value}>
										<ElButton
											text={btnText}
											plain={btnPlain}
											class={!operationsShowText.value ? 'operations-btn' : ''}
											size={btnSize}
											type="primary"
											onClick={() => onClickRowEdit(scoped)}
										>
											{{
												icon: () => (
													<ElIcon>
														<EditPen />
													</ElIcon>
												),
												default: () => t('next.table.edit'),
											}}
										</ElButton>
									</ElTooltip>
								) : null}
								{options.viewBtn ? (
									<ElTooltip enterable={false} effect="dark" content={t('next.table.view')} placement="top" disabled={operationsShowText.value}>
										<ElButton
											text={btnText}
											plain={btnPlain}
											class={!operationsShowText.value ? 'operations-btn' : ''}
											size={btnSize}
											type="primary"
											onClick={() => onClickRowView(scoped)}
										>
											{{
												icon: () => (
													<ElIcon>
														<View />
													</ElIcon>
												),
												default: () => t('next.table.view'),
											}}
										</ElButton>
									</ElTooltip>
								) : null}
								{options.delBtn ? (
									<ElTooltip enterable={false} effect="dark" content={t('next.table.delete')} placement="top" disabled={operationsShowText.value}>
										<ElButton
											text={btnText}
											plain={btnPlain}
											class={!operationsShowText.value ? 'operations-btn' : ''}
											size={btnSize}
											type="danger"
											onClick={() => onClickRowDel(scoped)}
										>
											{{
												icon: () => (
													<ElIcon>
														<Delete />
													</ElIcon>
												),
												default: () => t('next.table.delete'),
											}}
										</ElButton>
									</ElTooltip>
								) : null}
								{slots['operation-column-suffix']?.(scoped, { text: btnText, plain: btnPlain, size: btnSize })}
							</>
						),
					}}
				</ElTableColumn>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
