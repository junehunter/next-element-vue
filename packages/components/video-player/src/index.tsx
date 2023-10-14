/**
 * 中文文档
 * https://videojs.moyutime.cn/
 */
import { defineComponent, ref, toRaw, onMounted, onUnmounted, render, nextTick } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import zhCN from 'video.js/dist/lang/zh-CN.json';
import En from 'video.js/dist/lang/en.json';
import zhTW from 'video.js/dist/lang/zh-TW.json';
import { useNamespace, useLocale } from 'packages/hooks';
import { randomColor16 } from 'packages/utils/theme';
import * as tf from '@tensorflow/tfjs';

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
			values: ['mp4', 'm3u8', 'flv'],
		},
		src: {
			type: String,
			default: '',
			required: true,
		},
		tensorflow: {
			type: Object,
			default: () => {
				return {
					modelUrl: '',
					classNames: [],
					tf: null,
				};
			},
		},
	},
	emits: ['play', 'detector'],
	setup(props, { emit }) {
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
		const player = ref<any>();
		const playerFlv = ref<any>();
		const modelRef = ref(null);
		const loadVideo_mp4 = (url: string) => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
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
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(container, video);
			});
		};
		const loadVideo_m3u8 = (url: string) => {
			const container = videoBoxRef.value as HTMLElement;
			const video = document.createElement('video');
			video.className = 'video-js vjs-default-skin';
			video.setAttribute('autoplay', 'true');
			video.setAttribute('muted', 'true');
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
			player.value.on('play', () => {
				emit('play', video, container);
				_loadModelDetectFrame(container, video);
			});
		};
		const loadVideo_flv = (url: string) => {
			const mediaDataSource = {
				type: 'flv',
				cors: true,
				isLive: true,
				hasVideo: true,
				hasAudio: false,
				autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
				url: url,
			};
			return mediaDataSource;
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
			tf.loadGraphModel(modelUrl).then(model => {
				const canvas = document.createElement('canvas') as HTMLCanvasElement;
				canvas.className = ns.b('recongition');
				const palyerContainer = container.children[0];
				palyerContainer.appendChild(canvas);
				const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
				video.ontimeupdate = () => {
					const { videoWidth, videoHeight, offsetTop, offsetLeft } = video;
					canvas.width = videoWidth;
					canvas.height = videoHeight;
					canvas.style.top = offsetTop + 'px';
					canvas.style.left = offsetLeft + 'px';
					_detectFrame(video, model, ctx, tf, classNames);
				};
				modelRef.value = model;
			});
		};
		const _destroyPlayer = () => {
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
			if (modelRef.value) {
				modelRef.value.dispose();
				modelRef.value = null;
			}
		};
		const _detectFrame = async (video: HTMLVideoElement, model: any, ctx: CanvasRenderingContext2D, tf: any, classNames: any[]) => {
			const { videoWidth, videoHeight } = video;
			let [modelWeight, modelHeight] = (model as any).inputs[0].shape.slice(1, 3);
			let input = tf.tidy(() => tf.image.resizeBilinear(tf.browser.fromPixels(video), [modelWeight, modelHeight]).div(255.0).expandDims(0));
			ctx.clearRect(0, 0, videoWidth, videoHeight);
			await model.executeAsync(input).then((res: any) => {
				let [boxes, scores, classes, valid_detections] = res;
				for (let i = 0; i < valid_detections.dataSync()[0]; ++i) {
					let [x0, y0, x1, y1] = boxes.dataSync().slice(i * 4, (i + 1) * 4);
					x0 = x0 < 0 || x0 > 1 ? parseInt(x0) : x0;
					x1 = x1 < 0 || x1 > 1 ? parseInt(x1) : x1;
					y0 = y0 < 0 || y0 > 1 ? parseInt(y0) : y0;
					y1 = y1 < 0 || y1 > 1 ? parseInt(y1) : y1;
					x0 = Math.round(Math.abs(x0) * videoWidth);
					x1 = Math.round(Math.abs(x1) * videoWidth);
					y0 = Math.round(Math.abs(y0) * videoHeight);
					y1 = Math.round(Math.abs(y1) * videoHeight);
					const width = x1 - x0;
					const height = y1 - y0;
					const left = x0;
					const top = y0;
					let cls = classes.dataSync()[i]; // 类别
					let score = scores.dataSync()[i].toFixed(2); // 置信度
					if (score > 0.5) {
						const color = randomColor16();
						ctx.strokeStyle = color;
						ctx.lineWidth = 3;
						ctx.beginPath();
						ctx.rect(left, top, width, height);
						ctx.stroke();
						const name = classNames[cls];
						ctx.font = 'bold 20px Arial';
						ctx.fillStyle = color;
						ctx.fillText(`${name} 相似度：${(score * 100).toFixed(2)}%`, left + 10, top < 20 ? 20 : top - 10);
					}
				}
				boxes.dispose();
				scores.dispose();
				classes.dispose();
				valid_detections.dispose();
				input.dispose();
				tf.dispose(res);
			});
		};
		onUnmounted(() => {
			_destroyPlayer();
			if (videoBoxRef.value) {
				render(null, videoBoxRef.value as HTMLElement);
			}
		});
		const switchVideo = (url: string) => {
			const type = props.type;
			if (type === 'm3u8') {
				loadVideo_m3u8(url);
			} else if (type === 'mp4') {
				loadVideo_mp4(url);
			} else {
				loadVideo_flv(url);
			}
		};
		onMounted(() => {
			nextTick(() => {
				switchVideo(videoSrc);
			});
		});
		const renderContent = () => {
			return <div ref={videoBoxRef} class={[ns.b(), props.className]} style={props.style}></div>;
		};
		return () => <>{renderContent()}</>;
	},
});
