import { defineComponent, inject, ref } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElIcon, ElButton } from 'element-plus';
import { Close, Delete } from '@element-plus/icons-vue';
import { isValueExist } from 'packages/hooks/global-hook';
import { colors } from '../hooks/canvas-context-hook';

export default defineComponent({
	name: 'NextCanvasContextMenuLabel',
	props: {
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		classes: {
			type: Array,
			default: () => [],
		},
		activateType: {
			type: Number || null,
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
			emit('delete', props.activateType);
		};
		const activateIndex = ref<number>(props.activateType);
		const onSelectLabelItem = (index: number) => {
			activateIndex.value = index;
			emit('select', index);
		};
		const renderContent = () => {
			return (
				<div class={[ns.b('contextmenu-label')]} style={props.style}>
					<div class="label-head">
						<span style="padding-right: 30px">标签选择</span>
						<ElIcon size={16} onClick={onClose}>
							<Close />
						</ElIcon>
					</div>
					<div class="label-main">
						{props.classes.map((name, index) => {
							return (
								<li key={index} onClick={() => onSelectLabelItem(index)} class={{ 'activate-label': props.activateType === index }}>
									<span style={{ 'background-color': colors[index] }} class="label-line"></span>
									<span>{name}</span>
								</li>
							);
						})}
						{isValueExist(props.activateType) ? (
							<div style="margin: 10px auto 0">
								<ElButton icon={Delete} plain size="small" type="danger" onClick={onDelete}>
									删除标注框
								</ElButton>
							</div>
						) : null}
					</div>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
