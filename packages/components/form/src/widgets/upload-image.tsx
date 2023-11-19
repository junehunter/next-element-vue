import { defineComponent, ref, getCurrentInstance, createVNode, Teleport, h, render } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElButton, ElIcon, ElUpload, ElImageViewer, ElImage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { Picture, Plus } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';

const ns = useNamespace('form');
export default defineComponent({
	name: 'UploadImage',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		modelValue: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		listType: {
			type: String,
			values: ['text', 'picture', 'picture-card'],
			default: 'picture-card',
		},
		accept: {
			type: String,
			default: 'image/*',
		},
	},
	emits: ['change'],
	setup() {
		const { appContext } = getCurrentInstance()! as any;
		const { t } = useLocale();
		return { t, appContext };
	},
	render() {
		const slots = this.$slots;
		const props = this.$props;
		const emit = this.$emit;
		const _t = this.t;
		const _disabled = props.disabled;
		const uploadfilesPreview = ref<UploadUserFile[]>([]);
		const _onChange = (uploadfile, uploadfiles) => {
			uploadfilesPreview.value = uploadfiles;
			emit('change', uploadfile, uploadfiles);
		};
		const body = document.getElementsByTagName('body')[0];
		let previewImagesContainer: any = null;
		const _onPreview = uploadFile => {
			const initial = uploadfilesPreview.value.findIndex(file => file.url === uploadFile.url) || 0;
			if (previewImagesContainer) {
				render(null, previewImagesContainer);
				body.removeChild(previewImagesContainer);
			}
			previewImagesContainer = document.createElement('div');
			body.appendChild(previewImagesContainer);
			const previewComponent = createVNode({
				render() {
					return h(Teleport, { to: 'body' }, [
						h(ElImageViewer, {
							initialIndex: initial,
							'url-list': uploadfilesPreview.value.map(file => file.url),
							onClose: () => {
								render(null, previewImagesContainer);
							},
						}),
					]);
				},
			});
			previewImagesContainer.appContext = this.appContext;
			render(previewComponent, previewImagesContainer);
		};
		const renderUploadContent = () => {
			if (props.listType === 'picture-card') {
				return (
					<ElIcon>
						<Plus />
					</ElIcon>
				);
			}
			return (
				<ElButton link text type="primary">
					<ElIcon>
						<Plus />
					</ElIcon>
					<em>{_t('next.form.selectFile')}</em>
				</ElButton>
			);
		};
		return !_disabled ? (
			<ElUpload class={[ns.b('upload-image'), props.className]} style={props.style} list-type={props.listType} auto-upload={false} on-preview={_onPreview} onChange={_onChange}>
				{{
					trigger: () => (slots.default ? slots.default() : renderUploadContent()),
				}}
			</ElUpload>
		) : (
			<ElImage src={props.modelValue} previewSrcList={[props.modelValue]} preview-teleported fit="cover" style={{ width: '148px', height: '148px' }}>
				{{
					default: () => (
						<ElIcon>
							<Picture />
						</ElIcon>
					),
				}}
			</ElImage>
		);
	},
});
