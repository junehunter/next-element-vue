import { defineComponent, ref, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { ElTooltip } from 'element-plus';
import { useNamespace } from 'packages/hooks';

const ns = useNamespace('text-ellipsis');
export default defineComponent({
	name: 'NextTextEllipsis',
	props: {
		content: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		width: {
			type: [String, Number],
			default: '',
		},
		placement: {
			type: String,
			default: 'top',
		},
		textAlign: {
			type: String,
			default: 'left',
		},
		class: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const isTip = ref(false);
		const setWidth = computed(() => {
			const width = props.width;
			let style: CSSProperties = {
				textAlign: props.textAlign as CSSProperties['textAlign'],
			};
			if (width) {
				if (typeof width === 'string') {
					style.width = width;
				} else if (typeof width === 'number') {
					style.width = width + 'px';
				}
			}
			return style;
		});
		const ellipsisRef = ref<HTMLDivElement>();
		const onMouseenter = () => {
			try {
				const dom = ellipsisRef.value as HTMLDivElement;
				if (dom && dom.scrollWidth && dom.scrollWidth > dom.offsetWidth) {
					isTip.value = true;
				} else {
					isTip.value = false;
				}
			} catch (err) {
				isTip.value = false;
			}
		};
		const renderContent = () => {
			return (
				<div class={[ns.b(), props.class]} style={setWidth.value} onMouseenter={onMouseenter}>
					{isTip.value ? (
						<ElTooltip effect="dark" content={props.content} placement={props.placement as any} disabled={props.disabled}>
							<span class={ns.e('text')} ref={ellipsisRef}>
								{slots.default ? slots.default() : props.content}
							</span>
						</ElTooltip>
					) : (
						<span class={ns.e('text')} ref={ellipsisRef}>
							{slots.default ? slots.default() : props.content}
						</span>
					)}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
