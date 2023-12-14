/**
 * 中文文档
 * https://videojs.moyutime.cn/
 */
import { defineComponent, ref, toRaw, onMounted, onUnmounted, render, nextTick, createVNode, h } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import zhCN from 'video.js/dist/lang/zh-CN.json';
import En from 'video.js/dist/lang/en.json';
import zhTW from 'video.js/dist/lang/zh-TW.json';
import Mpegts from 'packages/assets/plugins/mpegts/mpegts.js';
import { useNamespace, useLocale } from 'packages/hooks';
import * as tf from '@tensorflow/tfjs';
import { screenshotVideoDetectFrame, detectVideoFrame } from './hook';
import { ElIcon } from 'element-plus';
import { Camera } from '@element-plus/icons-vue';

const ns = useNamespace('video-player');
// const enum VideoType {
// 	mp4 = 'video/mp4',
// 	flv = 'video/x-flv',
// 	m3u8 = 'application/x-mpegURL',
// }
export default defineComponent({
	name: 'NextVideoPlayer',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		type: {
			type: String,
			default: 'mp4',
			values: ['mp4', 'm3u8', 'flv', 'mpegts'],
		},
		src: {
			type: String,
			default: '',
		},
		tensorflow: {
			type: Object,
			// default: () => {
			// 	return {
			// 		modelUrl: '',
			// 		classNames: [],
			// 	};
			// },
		},
	},
	emits: ['play', 'error', 'detector'],
	setup(props, { emit, expose }) {
		const { lang } = useLocale();
		const localeLang = {
			'zh-cn': zhCN,
			en: En,
			'zh-tw': zhTW,
		};
		if (localeLang[lang.value]) {
			videojs.addLanguage('zh-CN', localeLang[lang.value]);
		} else {
			videojs.addLanguage('zh-CN', zhCN);
		}
		const videoSrc = toRaw(props.src);
		const videoBoxRef = ref<HTMLElement>();
		const videoElement = ref<HTMLVideoElement>();
		const player = ref<any>();
		const playerFlv = ref<any>();
		const playerMpgets = ref<any>();
		const modelRef = ref(null);
		const detectFrameCanvas = ref<HTMLCanvasElement>(null);
		// 创建截图按钮
		const _createScreenshotBtn = (container: HTMLElement) => {
			const screenshotBtn = createVNode({
				render() {
					return h('span', { class: 'screemshot-btn', onClick: () => screenshotVideoDetectFrame(player.value, detectFrameCanvas.value) }, [
						h(ElIcon, { color: '#FFFFFF', size: '22px' }, { default: () => h(Camera) }),
					]);
				},
			});
			player.value.on('loadedmetadata', () => {
				render(screenshotBtn, container);
			});
		};
		const loadVideo_mp4 = (url: string) => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
			videoElement.value = video;
			container.appendChild(video);
			const options = {
				techOrder: ['html5'],
				controls: true,
				fluid: true, // 自适应宽高
				preload: 'auto',
				language: 'zh-CN',
				sources: [
					{
						src: url,
						type: 'video/mp4',
					},
				],
			};
			player.value = videojs(video, options);
			const canvasContainer = document.createElement('div');
			const palyerContainer = container.children[0];
			palyerContainer.appendChild(canvasContainer);
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(canvasContainer, video);
			});
			_createScreenshotBtn(container);
		};
		const loadVideo_m3u8 = (url: string) => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
			videoElement.value = video;
			container.appendChild(video);
			const options = {
				techOrder: ['html5'],
				flvjs: {
					mediaDataSource: {
						cors: true,
						withCredentials: false,
					},
				},
				controls: true,
				fluid: true, // 自适应宽高
				preload: 'auto',
				language: 'zh-CN',
				sources: [
					{
						src: url,
						type: 'application/x-mpegURL',
					},
				],
			};
			player.value = videojs(video, options);
			const canvasContainer = document.createElement('div');
			const palyerContainer = container.children[0];
			palyerContainer.appendChild(canvasContainer);
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(canvasContainer, video);
			});
			_createScreenshotBtn(container);
		};
		const loadVideo_flv = (url: string) => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
			videoElement.value = video;
			container.appendChild(video);
			const options = {
				techOrder: ['html5'],
				flvjs: {
					mediaDataSource: {
						cors: true,
						withCredentials: false,
					},
				},
				controls: true,
				fluid: true, // 自适应宽高
				preload: 'auto',
				language: 'zh-CN',
				sources: [
					{
						src: url,
						type: 'video/x-flv',
					},
				],
			};
			player.value = videojs(video, options);
			const canvasContainer = document.createElement('div');
			const palyerContainer = container.children[0];
			palyerContainer.appendChild(canvasContainer);
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(canvasContainer, video);
			});
			_createScreenshotBtn(container);
		};
		const loadVideo_mpegts = (url: string) => {
			const mpegts = (window as any).mpegts || Mpegts;
			if (mpegts && mpegts.getFeatureList().mseLivePlayback) {
				const container = videoBoxRef.value as HTMLElement;
				const video = document.createElement('video');
				video.className = 'video-js vjs-default-skin';
				video.setAttribute('autoplay', 'true');
				video.setAttribute('muted', 'true');
				videoElement.value = video;
				container.appendChild(video);
				const defaultOptions = {
					controls: true, // 显示控制栏
					autoplay: true, // 自动播放
					fluid: true, // 自适应宽高
					muted: true, // 禁音播放
					liveui: true,
					preload: 'auto',
					language: 'zh-CN', // 语言设置
				};
				player.value = videojs(video, defaultOptions);
				playerMpgets.value = mpegts.createPlayer({
					enableWorker: true,
					type: 'flv', // could also be mpegts, m2ts, flv
					isLive: true,
					url: url,
				});
				playerMpgets.value.attachMediaElement(video as HTMLVideoElement);
				playerMpgets.value.load();
				playerMpgets.value.play();
				playerMpgets.value.on('error', () => {
					emit('error', video);
				});
				_createScreenshotBtn(container);
				// 创建一个canvas画布，并将画布放置播放器前面，防止遮挡播放器上面其他功能按钮
				const canvasContainer = document.createElement('div');
				const palyerContainer = container.children[0];
				palyerContainer.appendChild(canvasContainer);
				playerMpgets.value.on('metadata_arrived', () => {
					emit('play', video, container);
					_loadModelDetectFrame(canvasContainer, video);
				});
			}
		};
		const loadVideo_empty = () => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
			videoElement.value = video;
			container.appendChild(video);
			const options = {
				techOrder: ['html5'],
				controls: true,
				fluid: true, // 自适应宽高
				preload: 'auto',
				language: 'zh-CN',
				sources: [],
			};
			player.value = videojs(video, options);
			const canvasContainer = document.createElement('div');
			const palyerContainer = container.children[0];
			palyerContainer.appendChild(canvasContainer);
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(canvasContainer, video);
			});
			_createScreenshotBtn(container);
		};
		const _loadModelDetectFrame = (container: HTMLElement, video: HTMLVideoElement) => {
			if (!props.tensorflow) return;
			const { modelUrl, classNames } = props.tensorflow;
			if (!modelUrl) {
				throw new Error('模型文件地址不能未空！');
			}
			if (!classNames || !classNames.length) {
				throw new Error('模型类别不能未空！');
			}
			container.innerHTML = '';
			tf.loadGraphModel(modelUrl).then(model => {
				const canvas = document.createElement('canvas') as HTMLCanvasElement;
				canvas.className = ns.b('recongition');
				container.appendChild(canvas);
				const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
				const detectCanvas = document.createElement('canvas') as HTMLCanvasElement;
				const detect_ctx = detectCanvas.getContext('2d') as CanvasRenderingContext2D;
				video.ontimeupdate = () => {
					const { videoWidth, videoHeight, offsetTop, offsetLeft } = video;
					canvas.width = videoWidth;
					canvas.height = videoHeight;
					canvas.style.top = offsetTop + 'px';
					canvas.style.left = offsetLeft + 'px';
					detectVideoFrame(video, model, ctx, tf, classNames, [], detect_ctx);
				};
				modelRef.value = model;
				detectFrameCanvas.value = canvas;
			});
		};
		const _destroyPlayer = () => {
			if (modelRef.value) {
				tf.dispose();
				modelRef.value.dispose();
				modelRef.value = null;
			}
			if (player.value) {
				if (player.value.mse) {
					player.value.mse.endOfStream();
					player.value.mse.unload();
					player.value.mse = null;
				}
				player.value.pause();
				player.value.dispose();
				player.value = null;
			}
			if (playerFlv.value) {
				playerFlv.value.pause();
				playerFlv.value.unload();
				playerFlv.value.detachMediaElement();
				playerFlv.value.destroy();
				playerFlv.value = null;
			}
			if (playerMpgets.value) {
				playerMpgets.value.pause();
				playerMpgets.value.unload();
				playerMpgets.value.detachMediaElement();
				playerMpgets.value.destroy();
				playerMpgets.value = null;
			}
		};
		onUnmounted(() => {
			_destroyPlayer();
			if (videoBoxRef.value) {
				render(null, videoBoxRef.value as HTMLElement);
			}
		});
		const switchVideo = (url: string) => {
			if (!url) {
				loadVideo_empty();
				return false;
			}
			const type = props.type;
			if (type === 'm3u8') {
				loadVideo_m3u8(url);
			} else if (type === 'mp4') {
				loadVideo_mp4(url);
			} else if (type === 'mpegts') {
				loadVideo_mpegts(url);
			} else if (type === 'flv') {
				loadVideo_flv(url);
			}
		};
		onMounted(() => {
			nextTick(() => {
				switchVideo(videoSrc);
			});
		});
		const getElement = () => {
			const container = videoBoxRef.value;
			const palyerContainer = container.children[0];
			return {
				videoElement: videoElement.value,
				container,
				palyerContainer,
			};
		};

		expose({
			getElement,
		});
		const renderContent = () => {
			return <div ref={videoBoxRef} class={[ns.b(), props.className]} style={props.style}></div>;
		};
		return () => <>{renderContent()}</>;
	},
});
