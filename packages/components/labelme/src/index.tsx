import { defineComponent, ref, provide, watch, computed, onMounted, onUnmounted, unref, nextTick } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { ElScrollbar, ElIcon, ElImage, ElMessage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { merge } from 'lodash-unified';
import { deepClone, elementResize } from 'packages/hooks/global-hook';
import NextSpinLoading from 'packages/components/spin-loading';
import CanvasContext from './widgets/canvas-context';
import HeaderTool from './widgets/header-tool';
import defaultConfig from './config';

const ns = useNamespace('labelme');
export default defineComponent({
	name: 'NextLabelme',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		classes: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array as PropType<any[]>,
			default: () => [],
		},
	},
	emits: ['change', 'save', 'edit-polygon', 'prev-click', 'next-click'],
	setup(props, { emit, slots }) {
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('ns', ns);
		const { t } = useLocale();
		const activateNodeIndex = ref<number>(0);
		const classes = ref<any>(props.classes);
		const labelImages = ref<any>(deepClone(props.data));
		watch(
			() => props.data,
			data => {
				labelImages.value = deepClone(data);
			},
			{
				deep: true,
			}
		);
		watch(
			() => props.data.length,
			() => {
				activateNodeIndex.value = 0;
			}
		);
		watch(
			() => props.classes,
			val => {
				classes.value = val;
			},
			{
				deep: true,
			}
		);
		const currentNode = computed(() => {
			if (!labelImages.value) return {};
			const node = labelImages.value[activateNodeIndex.value] || {};
			return deepClone(node);
		});
		const loading = ref<boolean>(false);
		const mainContentHeight = ref(options.minContentHeight);
		const canvasContextRef = ref<any>();
		const layoutLabelRef = ref<HTMLElement>();
		const headerRef = ref<HTMLElement>();
		const mainRef = ref<HTMLElement>();
		const footerRef = ref<HTMLDivElement>();

		const updateMainContentHeight = () => {
			nextTick(() => {
				const layoutCrudHeight = (layoutLabelRef.value as HTMLDivElement)?.clientHeight || 0;
				const headerHeight = (headerRef.value as HTMLDivElement)?.clientHeight || 0;
				const footerHeight = (footerRef.value as HTMLDivElement)?.clientHeight || 0;
				const contentHeight = layoutCrudHeight - (headerHeight + footerHeight);
				mainContentHeight.value = contentHeight;
			});
		};
		onMounted(() => {
			document.addEventListener('keydown', onKeydownPrevNext);
			elementResize(layoutLabelRef.value.parentElement as HTMLElement, () => {
				updateMainContentHeight();
			});
			window.addEventListener('resize', updateMainContentHeight);
		});
		onUnmounted(() => {
			document.removeEventListener('keydown', onKeydownPrevNext);
			window.removeEventListener('resize', updateMainContentHeight);
		});
		const onKeydownPrevNext = () => {};
		const onPaginationPrev = () => {
			const imageLength = labelImages.value.length;
			let i = activateNodeIndex.value - 1;
			if (i < 0) i = imageLength - 1;
			onChangeActivateNode(i);
			emit('prev-click');
		};
		const onPaginationNext = () => {
			const imageLength = labelImages.value.length;
			let i = activateNodeIndex.value + 1;
			if (i >= imageLength) i = 0;
			onChangeActivateNode(i);
			emit('next-click');
		};
		const onChangeActivateNode = (index: number) => {
			if (loading.value) return;
			loading.value = true;
			const node = currentNode.value;
			emit(
				'save',
				{ node },
				(imageItem?: any) => {
					labelImages.value[activateNodeIndex.value] = imageItem ? imageItem : node;
					activateNodeIndex.value = index;
					loading.value = false;
				},
				() => {
					loading.value = false;
				}
			);
			return true;
		};
		const isFullscreen = ref<boolean>(false);
		const onSwitchFillscreen = (val: boolean) => {
			isFullscreen.value = val;
			updateMainContentHeight();
			nextTick(() => {
				canvasContextRef.value.rerenderImage();
			});
		};
		const onEditPlygonChange = (plygon: any) => {
			currentNode.value.labels = plygon;
			emit('edit-polygon', plygon);
		};
		const onToolHeaderSave = () => {
			const status = onChangeActivateNode(activateNodeIndex.value);
			if (!status) {
				ElMessage({
					type: 'info',
					message: t('next.labelimg.labelNoUpdate'),
				});
			}
		};
		const renderContent = () => {
			return (
				<div ref={layoutLabelRef} class={[ns.b(), props.className, isFullscreen.value ? ns.b('fullscreen') : '']} style={{ ...props.style }}>
					<NextSpinLoading loading={loading.value} tip={t('next.labelimg.saveTxt')} class={[ns.b('loading')]}>
						<ElScrollbar>
							<header ref={headerRef} class={[ns.b('header')]}>
								{slots['header'] ? (
									slots['header']()
								) : (
									<HeaderTool
										isFullscreen={isFullscreen.value}
										imageIndex={activateNodeIndex.value}
										imageLength={labelImages.value.length}
										onFullscreen={onSwitchFillscreen}
										onSave={onToolHeaderSave}
									></HeaderTool>
								)}
							</header>
							<div ref={mainRef} class={[ns.b('main')]}>
								<div class={[ns.be('main', 'content')]} style={{ height: mainContentHeight.value + 'px' }}>
									<CanvasContext ref={canvasContextRef} rowInfo={currentNode.value} onEditPolygon={onEditPlygonChange}></CanvasContext>
								</div>
							</div>
							<footer ref={footerRef} class={[ns.b('footer')]}>
								<div class={[ns.be('footer', 'left')]}>
									<ElIcon size={24} color="#797979" onClick={onPaginationPrev}>
										<ArrowLeft />
									</ElIcon>
								</div>
								<div class={[ns.be('footer', 'center')]}>
									<ElScrollbar>
										<ul class={[ns.bem('footer', 'center', 'list')]}>
											{labelImages.value.map((item, index) => {
												return (
													<li key={index} onClick={() => onChangeActivateNode(index)} class={{ 'is-activate': activateNodeIndex.value === index }}>
														<ElImage style="height: 100%" src={item.imageSrc} zoom-rate={1.2} max-scale={2} min-scale={0.2} fit="cover" />
													</li>
												);
											})}
										</ul>
									</ElScrollbar>
								</div>
								<div class={[ns.be('footer', 'right')]}>
									<ElIcon size={24} color="#797979" onClick={onPaginationNext}>
										<ArrowRight />
									</ElIcon>
								</div>
							</footer>
						</ElScrollbar>
					</NextSpinLoading>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
