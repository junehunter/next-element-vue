import { nextTick } from 'vue';
import type { App } from 'vue';
import { isString } from 'lodash-es';

export const zoomDialog = (app: App) => {
	app.directive('zoom', {
		mounted(el, binding) {
			if (!binding.value) return false;
			const zoomDomBindData = isString(binding.value) ? [binding.value, '.el-dialog__body', false, true] : binding.value;
			zoomDomBindData[1] = zoomDomBindData[1] ? zoomDomBindData[1] : '.el-dialog__body';
			zoomDomBindData[2] = typeof zoomDomBindData[2] == 'undefined' ? false : zoomDomBindData[2];
			zoomDomBindData[3] = typeof zoomDomBindData[3] == 'undefined' ? true : zoomDomBindData[3];

			nextTick(() => {
				const zoomDom = document.querySelector(zoomDomBindData[1]) as HTMLElement;
				const zoomDomBox = document.querySelector(zoomDomBindData[0]) as HTMLElement;
				const zoomHandleEl = document.createElement('div');
				zoomHandleEl.className = 'dialog-zoom';
				zoomHandleEl.onmouseenter = () => {
					zoomHandleEl.onmousedown = (e: MouseEvent) => {
						const x = e.clientX;
						const y = e.clientY;
						const zoomDomWidth = zoomDom.offsetWidth;
						const zoomDomHeight = zoomDom.offsetHeight;
						const zoomDomBoxWidth = zoomDomBox.offsetWidth;
						const zoomDomBoxHeight = zoomDomBox.offsetHeight;
						document.onmousemove = (e: MouseEvent) => {
							e.preventDefault(); // 移动时禁用默认事件
							const w = zoomDomWidth + (e.clientX - x) * 2;
							const h = zoomDomHeight + (e.clientY - y);

							zoomDom.style.width = `${w}px`;
							zoomDom.style.height = `${h}px`;

							if (zoomDomBindData[2]) {
								const boxH = zoomDomBoxHeight + (e.clientY - y);
								zoomDomBox.style.height = `${boxH}px`;
							}
							if (zoomDomBindData[3]) {
								const boxW = zoomDomBoxWidth + (e.clientX - x) * 2;
								zoomDomBox.style.width = `${boxW}px`;
							}
						};

						document.onmouseup = function () {
							document.onmousemove = null;
							document.onmouseup = null;
						};
					};
				};

				zoomDomBox.appendChild(zoomHandleEl);
			});
		},
	});
};
const directives = (app: App) => {
	zoomDialog(app);
};
export default directives;
