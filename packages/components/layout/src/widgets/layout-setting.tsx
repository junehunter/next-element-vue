import { defineComponent, inject, reactive } from 'vue';
import { ElColorPicker, ElDivider, ElScrollbar, ElMessage, ElSwitch } from 'element-plus';
import { MoonNight, Sunny } from '@element-plus/icons-vue';
import { nextUseCssTheme, nextUseCssVar } from 'packages/hooks';

export default defineComponent({
	setup() {},
	render() {
		const _slots = inject('__slots__', {} as any);
		const _ns = inject('__ns__', {} as any);
		const _config = inject('options', {} as any);
		const _updateOptions = inject('updateOptions', null as any);
		const settingConfig = reactive({
			..._config.setting,
		});
		const _changeUpdateOptions = () => {
			const options = {
				..._config,
				setting: {
					...settingConfig,
				},
			};
			_updateOptions(options);
		};
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
			_changeUpdateOptions();
		};
		const _onChangeSwitchDark = () => {
			const body = document.documentElement as HTMLElement;
			if (settingConfig.isDark) body.setAttribute('data-theme', 'dark');
			else body.setAttribute('data-theme', '');
			_changeUpdateOptions();
		};
		const _onChangeColor = (color: string, key: string, cssvar: string) => {
			settingConfig[key] = color;
			nextUseCssVar(cssvar, color);
			_changeUpdateOptions();
		};
		interface LayoutItem {
			type: string;
			text: string;
		}
		const layouts: LayoutItem[] = [
			{
				type: 'defaults',
				text: '默认',
			},
			{
				type: 'classic',
				text: '经典',
			},
			{
				type: 'transverse',
				text: '横向',
			},
			{
				type: 'columns',
				text: '分栏',
			},
			{
				type: 'composite',
				text: '综合',
			},
		];
		const _onChangeLayout = (event: MouseEvent, layout: LayoutItem) => {
			event.stopPropagation();
			settingConfig.layout = layout.type;
			_changeUpdateOptions();
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
							show-alpha
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
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>顶栏背景颜色</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.headerBarColor}
							predefine={['#282c34', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							show-alpha
							onChange={color => _onChangeColor(color, 'headerBarColor', '--next-layout-bg-color')}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>顶栏字体颜色</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.headerBarFontColor}
							predefine={['#282c34', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							show-alpha
							onChange={color => _onChangeColor(color, 'headerBarFontColor', '--next-layout-font-color')}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>顶栏背景渐变</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<el-switch v-model={settingConfig.isHeaderBarColorGradual} onChange={_changeUpdateOptions} />
					</div>
				</div>
				<ElDivider border-style="dashed">布局方式</ElDivider>
				<ul class={_ns.b('config-bar-layout')}>
					{layouts.map(item => {
						return (
							<li class={[_ns.be('config-bar-layout', item.type), _ns.is('active', settingConfig.layout === item.type)]} onClick={event => _onChangeLayout(event, item)}>
								<div class="layout-wrap">
									<div class="layout-box">
										<p class="layout-text">{item.text}</p>
									</div>
								</div>
								<aside></aside>
							</li>
						);
					})}
				</ul>
				<div class={_ns.b('config-bar-item')} style={{ 'margin-top': '20px' }}>
					<span class={_ns.be('config-bar-item', 'label')}>是否显示标签栏</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElSwitch v-model={_config.showTabs} />
					</div>
				</div>
				{_slots.setting?.({ config: settingConfig })}
			</ElScrollbar>
		);
	},
});
