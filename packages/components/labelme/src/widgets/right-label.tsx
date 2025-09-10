import { defineComponent, inject, ref, unref } from 'vue';
import type { PropType } from 'vue';
import { ElIcon, ElPopconfirm, ElEmpty } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { useLocale } from 'packages/hooks';
import type { ShapesProps } from '../config';
import { colors, defaultColor } from '../hooks/canvas-content-hook';

export default defineComponent({
	props: {
		shapes: {
			type: Array as PropType<ShapesProps[]>,
			default: () => [],
		},
	},
	emits: [],
	setup(props, { emit }) {
		const { t } = useLocale();
		const _ns = inject('ns', {} as any);
		const classes = inject('classes', ref<string[]>([]));
		const _classes = unref(classes);
		const formatlabelColor = (lebel: string) => {
			const index = _classes.findIndex(item => item === lebel);
			if (index === -1) return defaultColor;
			return colors[index];
		};
		const shapes = props.shapes;
		const onDeleteLabelNode = (item: any) => {
			emit('delete', item);
		};
		const renderContent = () => {
			return (
				<div class={[_ns.be('main', 'right-label')]}>
					{shapes.length ? (
						<ul>
							{shapes.map((item, index) => {
								return (
									<li class="label-item" key={index}>
										<div>
											<span class="label-line" style={{ backgroundColor: formatlabelColor(item.label) }}></span>
											<span>
												{item.label}
												{item.group_id ? ` ( ${item.group_id} )` : null}
											</span>
										</div>
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
											onConfirm={() => onDeleteLabelNode(item)}
										></ElPopconfirm>
									</li>
								);
							})}
						</ul>
					) : (
						<ElEmpty image-size={100} description={t('next.labelme.emptyLabelText')}></ElEmpty>
					)}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
