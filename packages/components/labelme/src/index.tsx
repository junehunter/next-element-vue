import { defineComponent, ref, provide, watch, computed, unref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { merge } from 'lodash-unified';
import { deepClone } from 'packages/hooks/global-hook';
import CanvasContext from './widgets/canvas-context';
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
	setup(props) {
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('ns', ns);
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
		const mainContentHeight = ref(options.minContentHeight);
		const mainRef = ref<HTMLElement>();
		const isFullscreen = ref<boolean>(false);
		const renderContent = () => {
			return (
				<div class={[ns.b(), props.className, isFullscreen.value ? ns.b('fullscreen') : '']} style={{ ...props.style }}>
					<div ref={mainRef} class={[ns.b('main')]}>
						<div class={[ns.be('main', 'content')]} style={{ height: mainContentHeight.value + 'px' }}>
							<CanvasContext rowInfo={currentNode.value}></CanvasContext>
						</div>
					</div>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
