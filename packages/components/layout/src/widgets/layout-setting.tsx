import { defineComponent, inject, reactive } from 'vue';
import { ElColorPicker, ElDivider, ElScrollbar, ElMessage, ElSwitch } from 'element-plus';
import { MoonNight, Sunny } from '@element-plus/icons-vue';
import { nextUseCssTheme } from 'packages/hooks';

export default defineComponent({
	setup() {},
	render() {
		const _ns = inject('__ns__', {} as any);
		const _config = inject('options', {} as any);
		const settingConfig = reactive({
			..._config.setting,
		});
		const _onChangeThemeColor = (color: string) => {
			if (!color) {
				ElMessage({
					type: 'warning',
					message: '主题颜色不能为空',
				});
				return false;
			}
			settingConfig.themeColor = color;
			nextUseCssTheme('--el-color-primary', color);
		};
		const _onChangeSwitchDark = () => {
			const body = document.documentElement as HTMLElement;
			if (settingConfig.isDark) body.setAttribute('data-theme', 'dark');
			else body.setAttribute('data-theme', '');
		};
		return (
			<ElScrollbar>
				<ElDivider border-style="dashed">全局主题</ElDivider>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>主题颜色</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.themeColor}
							predefine={['#409eff', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							onChange={_onChangeThemeColor}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>暗黑模式</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElSwitch
							v-model={settingConfig.isDark}
							inline-prompt
							size="large"
							active-icon={MoonNight}
							inactive-icon={Sunny}
							active-color="#1f1f1f"
							inactive-color="#dcdfe6"
							onChange={_onChangeSwitchDark}
						></ElSwitch>
					</div>
				</div>
			</ElScrollbar>
		);
	},
});
