import { defineComponent, inject, onMounted, ref, computed, watch } from 'vue';
import type { PropType } from 'vue';
import { ElIcon, ElButton } from 'element-plus';
import { Close, Delete } from '@element-plus/icons-vue';
import { isValueExist } from 'packages/hooks/global-hook';
import { colors } from '../hooks/canvas-context-hook';
import type { RectProps } from '../hooks/canvas-context-hook';

export default defineComponent({
	props: {
		labelRect: {
			type: Object,
			default: () => ({}),
		},
		classes: {
			type: Array,
			default: () => [],
		},
		activateRect: {
			type: Object as PropType<RectProps>,
			default: null,
		},
	},
	emits: ['close', 'select', 'delete'],
	setup(props, { emit }) {
		const ns = inject('ns', {} as any);
		const onClose = () => {
			emit('close');
		};
		const onDelete = () => {
			emit('delete', props.activateRect);
		};
		const activateIndex = ref<number>();
		const onSelectLabelItem = (index: number) => {
			activateIndex.value = index;
			emit('select', index);
		};
		watch(
			() => props.activateRect,
			() => {
				const { type } = props.activateRect;
				activateIndex.value = isValueExist(type) ? type : null;
			},
			{
				deep: true,
				immediate: true,
			}
		);
		const labelRectWidthHeight = ref<any>({
			width: 0,
			height: 0,
		});
		onMounted(() => {
			const { clientWidth, clientHeight } = labelMenuRef.value!;
			labelRectWidthHeight.value.width = clientWidth;
			labelRectWidthHeight.value.height = clientHeight;
		});
		const labelMenuRef = ref<HTMLElement>();
		const labelStyleFixed = computed(() => {
			const { left, top, canvasHeight } = props.labelRect;
			const clientHeight = labelRectWidthHeight.value.height;
			const height_diff = top + clientHeight - canvasHeight;
			let y = top;
			if (height_diff > 0) {
				y = y - height_diff;
			}
			return {
				top: y + 'px',
				left: left + 'px',
			};
		});
		const renderContent = () => {
			return (
				<div ref={labelMenuRef} class={[ns.b('contextmenu-label')]} style={labelStyleFixed.value}>
					<div class="label-head">
						<span style="padding-right: 30px">标签选择</span>
						<ElIcon size={16} onClick={onClose}>
							<Close />
						</ElIcon>
					</div>
					<ul class="label-main">
						{props.classes.map((name, index) => {
							return (
								<li key={index} onClick={() => onSelectLabelItem(index)} class={{ 'activate-label': activateIndex.value === index }}>
									<span style={{ 'background-color': colors[index] }} class="label-line"></span>
									<span>{name}</span>
								</li>
							);
						})}
					</ul>
					{isValueExist(activateIndex.value) ? (
						<div style="margin: 10px auto 0">
							<ElButton icon={Delete} plain size="small" type="danger" onClick={onDelete}>
								删除标注框
							</ElButton>
						</div>
					) : null}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
