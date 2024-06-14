import { defineComponent, ref } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { useLocale, useNamespace } from 'packages/hooks';

const ns = useNamespace('spin-loading');
export default defineComponent({
	name: 'NextSpinLoading',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
		tip: {
			type: String,
			default: '',
		},
	},
	setup(props, { expose }) {
		const { t } = useLocale();
		const elementInstance = ref<HTMLElement>();
		expose({
			elementInstance,
		});
		return { t, elementInstance };
	},
	render() {
		const _t = this.t;
		const slots = this.$slots;
		const props = this.$props;
		const loadingText = props.tip || _t('next.loading');
		return (
			<div ref="elementInstance" class={[ns.b(), props.className]} style={props.style}>
				{slots.default?.()}
				{props.loading ? (
					<div class={ns.b('mask')}>
						<span class={ns.b('mask-dot')}>
							<i class={ns.be('mask', 'dot-item')}></i>
							<i class={ns.be('mask', 'dot-item')}></i>
							<i class={ns.be('mask', 'dot-item')}></i>
							<i class={ns.be('mask', 'dot-item')}></i>
						</span>
						<span class={ns.be('mask', 'text')}>{loadingText}</span>
					</div>
				) : null}
			</div>
		);
	},
});
