import { defineComponent, inject, ref, watch, toRaw } from 'vue';
import type { PropType } from 'vue';
import { ElIcon, ElPopconfirm, ElEmpty } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { useLocale } from 'packages/hooks';
import type { RectProps } from '../hooks/canvas-context-hook';
import { colors } from '../hooks/canvas-context-hook';

export default defineComponent({
	props: {
		contentHeight: {
			type: Number,
		},
		classes: {
			type: Array,
			default: () => [],
		},
		labels: {
			type: Array as PropType<RectProps[]>,
			default: () => [],
		},
	},
	emits: ['delete', 'select'],
	setup(props, { emit }) {
		const { t } = useLocale();
		const ns = inject('ns', {} as any);
		const labels = ref<RectProps[]>([]);
		const formatLabelsTypeName = (labels: any) => {
			if (!labels.length) return [];
			return labels.map((rect: RectProps) => {
				const typeName = props.classes[rect.type] as string;
				if (typeName) {
					rect.typeName = typeName;
				}
				return rect;
			});
		};
		watch(
			() => props.labels,
			rects => {
				const _rects = toRaw(rects);
				labels.value = formatLabelsTypeName(_rects);
			},
			{
				deep: true,
				immediate: true,
			}
		);
		const onClickLabelNode = (rect: RectProps, index: number) => {
			emit('select', rect, index);
		};
		const onDeleteLabelNode = (rect: RectProps) => {
			emit('delete', rect);
		};
		const renderContent = () => {
			return (
				<div class={[ns.b('right')]} style={{ height: props.contentHeight + 'px' }}>
					{labels.value.length ? (
						<ul>
							{labels.value.map((rect: RectProps, index: number) => {
								return (
									<li key={index} onClick={() => onClickLabelNode(rect, index)}>
										<div>
											<span style={{ 'background-color': colors[rect.type] }} class="label-line"></span>
											<span>{rect.typeName}</span>
										</div>
										<ElPopconfirm
											title={t('next.labelimg.confirmDeleteLabel')}
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
											onConfirm={() => onDeleteLabelNode(rect)}
										></ElPopconfirm>
									</li>
								);
							})}
						</ul>
					) : (
						<ElEmpty image-size={120} description={t('next.labelimg.emptyLabelText')}></ElEmpty>
					)}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
