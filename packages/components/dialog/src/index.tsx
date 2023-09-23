import { defineComponent, watch, ref } from 'vue';
import { ElDialog, ElIcon } from 'element-plus';
import { FullScreen, Close } from '@element-plus/icons-vue';
import { useNamespace } from 'packages/hooks/use-namespace/index';

const ns = useNamespace('dialog');
export default defineComponent({
	name: 'Dialog',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
		fullscreen: {
			type: Boolean,
			default: false,
		},
		fullscreenBtn: {
			type: Boolean,
			default: true,
		},
		width: {
			type: [String, Number],
			default: '50%',
		},
		closeOnClickModal: {
			type: Boolean,
			default: true,
		},
		appendToBody: {
			type: Boolean,
			default: false,
		},
		draggable: {
			type: Boolean,
			default: true,
		},
		zoomSize: {
			type: Boolean,
			default: true,
		},
		destroyOnClose: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['close'],
	setup(props, { emit, slots }) {
		const visible = ref<boolean>(props.modelValue);
		watch(
			() => props.modelValue,
			value => {
				visible.value = value;
			}
		);
		const onClose = () => {
			visible.value = false;
			emit('close');
		};
		const isFullscreen = ref<boolean>(props.fullscreen);
		const renderContent = () => {
			return (
				<ElDialog
					v-model={visible.value}
					class={ns.b()}
					title={props.title}
					appendToBody={props.appendToBody}
					destroy-on-close
					fullscreen={isFullscreen.value}
					lock-scroll={true}
					modal={true}
					show-close={false}
					closeOnClickModal={props.closeOnClickModal}
					width={props.width}
					draggable={props.draggable}
					destroyOnClose={props.destroyOnClose}
					onClose={onClose}
					v-slots={{
						header: ({ close, titleId, titleClass }) => (
							<div class={ns.b('header')}>
								<h4 id={titleId} class={titleClass}>
									{props.title}
								</h4>
								<div class={ns.e('header-right')}>
									{props.fullscreenBtn && (
										<span class="icon-fullscreen" onClick={() => (isFullscreen.value = !isFullscreen.value)}>
											<ElIcon>
												<FullScreen />
											</ElIcon>
										</span>
									)}
									<span class="icon-close" onClick={close}>
										<ElIcon size="18">
											<Close />
										</ElIcon>
									</span>
								</div>
							</div>
						),
						// footer: () => <span class={[ns.be('footer', 'zoom'), 'dialog-zoom']}></span>,
					}}
				>
					{slots.default?.()}
				</ElDialog>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
