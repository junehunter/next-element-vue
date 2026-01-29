import { defineComponent, ref, getCurrentInstance, createVNode, Teleport, h, render } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElButton, ElIcon, ElUpload, ElImageViewer, ElImage, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { Picture, Plus } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone } from 'packages/hooks/global-hook';

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
		multiple: {
			type: Boolean,
			default: false,
		},
		limit: {
			type: Number,
			default: 1,
		},
		accept: {
			type: String,
			default: 'image/*',
		},
	},
	emits: ['change', 'exceed'],
	setup(props) {
		const { appContext } = getCurrentInstance()! as any;
		const { t } = useLocale();
		const defaultPreviewSrcList = deepClone(props.modelValue);
		const uploadfilesPreview = ref<UploadUserFile[]>([]);
		return { t, appContext, defaultPreviewSrcList, uploadfilesPreview };
	},
	render() {
		const slots = this.$slots;
		const props = this.$props;
		const emit = this.$emit;
		const _t = this.t;
		const _disabled = props.disabled;
		const uploadfilesPreview = this.uploadfilesPreview;
		const _onChange = (uploadfile, uploadfiles) => {
			uploadfilesPreview.value = uploadfiles;
			emit('change', uploadfile, uploadfiles);
		};
		const _onExceed = (uploadfile, uploadfiles) => {
			ElMessage({
				type: 'info',
				message: _t('next.table.uploadfileExceed'),
			});
			emit('exceed', uploadfile, uploadfiles);
		};
		let previewImagesContainer: any = null;
		const _onPreview = uploadFile => {
			const body = document.getElementsByTagName('body')[0];
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
		const renderPreviewImageContent = () => {
			const value = this.defaultPreviewSrcList;
			let urls = [];
			if (typeof value === 'string') {
				urls = [value];
			} else if (Object.prototype.toString.call(value) === '[object Array]') {
				urls = value;
			}
			urls = urls.filter(url => !!url);
			if (!urls.length) return null;
			return (
				<ElImage class={ns.e('preview-image')} src={urls[0]} previewSrcList={urls} preview-teleported fit="cover" style={{ width: '146px', height: '146px' }}>
					{{
						default: () => (
							<ElIcon>
								<Picture />
							</ElIcon>
						),
					}}
				</ElImage>
			);
		};
		return (
			<>
				{renderPreviewImageContent()}
				{!_disabled ? (
					<ElUpload
						class={[ns.b('upload-image'), props.className]}
						style={props.style}
						list-type={props.listType}
						multiple={props.multiple}
						limit={props.limit}
						accept={props.accept}
						auto-upload={false}
						on-preview={_onPreview}
						on-change={_onChange}
						on-exceed={_onExceed}
					>
						{{
							trigger: () => (slots.default ? slots.default() : renderUploadContent()),
						}}
					</ElUpload>
				) : null}
			</>
		);
	},
});
