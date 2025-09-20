import { defineComponent, inject, reactive, ref, toRef, unref } from 'vue';
import type { PropType, Ref } from 'vue';
import { ElIcon, ElPopconfirm, ElEmpty } from 'element-plus';
import { Delete, Edit } from '@element-plus/icons-vue';
import { NextDialog, NextForm } from 'packages/components';
import { useLocale } from 'packages/hooks';
import { deepClone } from 'packages/hooks/global-hook';
import type { ShapesProps } from '../config';
import { colors, defaultColor, ToolsHandleType } from '../config';

export default defineComponent({
	props: {
		shapes: {
			type: Array as PropType<ShapesProps[]>,
			default: () => [],
		},
	},
	emits: ['delete', 'update', 'select'],
	setup(props, { emit }) {
		const { t } = useLocale();
		const _ns = inject('ns', {} as any);
		const classes = inject('classes', ref<string[]>([]));
		const _classes = unref(classes);
		const toolsActive = inject('toolsActive', {} as Ref<string>);
		const activeShape = inject('activeShape', ref<ShapesProps | null>(null));
		const formatlabelColor = (lebel: string) => {
			const index = _classes.findIndex(item => item === lebel);
			if (index === -1) return defaultColor;
			return colors[index];
		};
		const shapes = toRef(props, 'shapes');
		const onDeleteLabelNode = (shape: ShapesProps) => {
			emit('delete', shape);
		};
		const formColumns = [
			{
				prop: 'group_id',
				label: t('next.labelme.labelGroupId'),
				type: 'input',
			},
			{
				prop: 'description',
				label: t('next.labelme.labelDescription'),
				type: 'textarea',
			},
		];
		const shapeEditDialog = reactive({
			visible: false,
			title: '',
			shapeInfo: {},
		});
		const onCloseShapeEditDialog = () => {
			shapeEditDialog.visible = false;
			shapeEditDialog.title = '';
			shapeEditDialog.shapeInfo = {};
		};
		const onOpenShapeEditDialog = (shape: ShapesProps) => {
			shapeEditDialog.visible = true;
			shapeEditDialog.title = shape.label;
			shapeEditDialog.shapeInfo = shape;
		};
		const onSubmitShapeChange = (shape: ShapesProps, done: Function) => {
			emit('update', deepClone(shape));
			done();
			onCloseShapeEditDialog();
		};
		const onSelectLabelShape = (shape: ShapesProps) => {
			if (toolsActive.value !== ToolsHandleType.EDIT_SHAPE) return;
			emit('select', shape);
		};
		const renderContent = () => {
			return (
				<div class={[_ns.be('main', 'right-label')]}>
					{shapes.value.length ? (
						<ul>
							{shapes.value.map((shape, index) => {
								return (
									<li
										class={[_ns.be('right-label', 'label-item'), activeShape.value?.id === shape.id ? _ns.be('label-item', 'active') : '']}
										key={index}
										onClick={() => onSelectLabelShape(shape)}
									>
										<div class={[_ns.be('right-label', 'label-content')]}>
											<span class="label-line" style={{ backgroundColor: formatlabelColor(shape.label) }}></span>
											<span>
												{shape.label}
												{shape.group_id ? ` ( ${shape.group_id} )` : null}
											</span>
										</div>
										<div class={[_ns.be('right-label', 'label-btns')]}>
											<ElIcon
												size={16}
												style={{ marginRight: '6px' }}
												color="#303133"
												onClick={(event: Event) => {
													event.preventDefault();
													event.stopPropagation();
													onOpenShapeEditDialog(shape);
												}}
											>
												<Edit />
											</ElIcon>
											<ElPopconfirm
												title={t('next.labelme.confirmDeleteLabel')}
												width={200}
												v-slots={{
													reference: () => (
														<ElIcon
															size={16}
															color="#ff0000"
															onClick={(event: Event) => {
																event.preventDefault();
																event.stopPropagation();
															}}
														>
															<Delete />
														</ElIcon>
													),
												}}
												onConfirm={() => onDeleteLabelNode(shape)}
											></ElPopconfirm>
										</div>
									</li>
								);
							})}
						</ul>
					) : (
						<ElEmpty image-size={100} description={t('next.labelme.emptyLabelText')}></ElEmpty>
					)}
					<NextDialog
						v-model={shapeEditDialog.visible}
						title={shapeEditDialog.title}
						width={350}
						fullscreen={false}
						fullscreenBtn={false}
						closeOnClickModal={true}
						onClose={onCloseShapeEditDialog}
					>
						<NextForm options={{ labelPosition: 'top', colSpanFixed: 24 }} columns={formColumns} formDatum={shapeEditDialog.shapeInfo} onSubmit={onSubmitShapeChange}></NextForm>
					</NextDialog>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
