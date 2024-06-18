import { defineComponent, onMounted, ref } from 'vue';
import { ElInputNumber } from 'element-plus';
import { elementResize } from 'packages/hooks/global-hook';
import { useNamespace, useLocale } from 'packages/hooks';

const ns = useNamespace('form');
export default defineComponent({
	name: 'NumberRangePicker',
	props: {
		modelValue: {
			type: [Array, String, Number, Boolean, Object],
			default: function () {
				return [null, null];
			},
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 100,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['change'],
	setup(props, { emit }) {
		const disabled = props.disabled;
		const { t } = useLocale();
		const startNumber = ref(Array.isArray(props.modelValue) ? props.modelValue[0] || 0 : 0);
		const endNumber = ref(Array.isArray(props.modelValue) ? props.modelValue[1] || 0 : 0);
		const minNumber = ref(props.min);
		const maxNumber = ref(props.max);
		const onChangeStart = (num: Number) => {
			startNumber.value = num;
			emit('change', [startNumber.value, endNumber.value]);
		};
		const onChangeEnd = (num: number) => {
			endNumber.value = num;
			emit('change', [startNumber.value, endNumber.value]);
		};
		const controls = ref<boolean>(true);
		const numberRangeRef = ref<HTMLElement>();
		onMounted(() => {
			const element = numberRangeRef.value as HTMLElement;
			// 根据宽度判断是否隐藏加减控制按钮
			elementResize(element, (el: HTMLElement) => {
				const width = el.clientWidth;
				controls.value = width > 200;
			});
		});
		const renderContent = () => {
			return (
				<div ref={numberRangeRef} class={ns.e('number-range')}>
					<ElInputNumber v-model={startNumber.value} min={minNumber.value} max={maxNumber.value} controls={controls.value} disabled={disabled} onChange={onChangeStart}></ElInputNumber>
					<span class={ns.em('number-range', 'division')}>{t('next.date.rangeSeparator')}</span>
					<ElInputNumber v-model={endNumber.value} min={minNumber.value} max={maxNumber.value} controls={controls.value} disabled={disabled} onChange={onChangeEnd}></ElInputNumber>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
