import { defineComponent, inject, onMounted, ref, computed, watch } from 'vue';
import type { PropType } from 'vue';
import { ElIcon, ElButton, ElEmpty } from 'element-plus';
import { Close, Delete } from '@element-plus/icons-vue';
import { isValueExist } from 'packages/hooks/global-hook';
import { useLocale } from 'packages/hooks';
import { colors } from '../config';
import type { ShapesProps } from '../config';

export default defineComponent({
	props: {
		fixed: {
			type: Object,
			default: () => ({}),
		},
		classes: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		activateShape: {
			type: Object as PropType<ShapesProps>,
			default: null,
		},
	},
	emits: ['close', 'select', 'delete'],
	setup(props, { emit }) {
		const { t } = useLocale();
		const ns = inject('ns', {} as any);
		const onClose = () => {
			emit('close');
		};
		const onDelete = () => {
			emit('delete', props.activateShape);
		};
		const activateIndex = ref<string>();
		const onSelectLabelItem = (label: string) => {
			activateIndex.value = label;
			emit('select', label);
		};
		watch(
			() => props.activateShape,
			() => {
				const { label } = props.activateShape;
				activateIndex.value = isValueExist(label) ? label : null;
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
			const { left, top } = props.fixed;
			const clientHeight = labelRectWidthHeight.value.height;
			// 根据整个窗口设置定位
			const height_diff = top + clientHeight - window.innerHeight;
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
						<span style="padding-right: 30px">{t('next.labelme.selectClasses')}</span>
						<ElIcon size={16} onClick={onClose}>
							<Close />
						</ElIcon>
					</div>
					{props.classes.length ? (
						<ul class="label-main">
							{props.classes.map((name, index) => {
								return (
									<li key={index} onClick={() => onSelectLabelItem(name)} class={{ 'activate-label': activateIndex.value === name }}>
										<span style={{ 'background-color': colors[index % colors.length] }} class="label-line"></span>
										<span>{name}</span>
									</li>
								);
							})}
						</ul>
					) : (
						<ElEmpty image-size={50} description={t('next.labelme.emptyClassesText')} style={{ padding: 0 }}></ElEmpty>
					)}
					{isValueExist(activateIndex.value) ? (
						<div style="margin: 10px auto 0">
							<ElButton icon={Delete} plain size="small" type="danger" onClick={onDelete}>
								{t('next.labelme.deleteClasses')}
							</ElButton>
						</div>
					) : null}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
