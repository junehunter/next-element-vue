import { defineComponent, inject, reactive } from 'vue';
import { ElColorPicker, ElDivider, ElScrollbar, ElMessage, ElSwitch } from 'element-plus';
import { MoonNight, Sunny } from '@element-plus/icons-vue';
import { nextUseCssTheme, nextUseCssVar, useLocale } from 'packages/hooks';
import { isValueExist } from 'packages/hooks/global-hook';

export default defineComponent({
	setup() {
		const config = inject('options', {} as any);
		const { t } = useLocale();
		if (!isValueExist(config.setting.headerBarFontActiveColor)) {
			config.setting.headerBarFontActiveColor = config.setting.themeColor;
		}
		return { config, t };
	},
	render() {
		const _slots = inject('__slots__', {} as any);
		const _ns = inject('__ns__', {} as any);
		const _t = this.t;
		const _config = this.config;
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
		const _onChangeTextPrimary = (color: string) => {
			if (!color) {
				ElMessage({
					type: 'warning',
					message: '主文本颜色不能为空',
				});
				return false;
			}
			settingConfig.textPrimary = color;
			nextUseCssTheme('--el-text-color-primary', color);
			_changeUpdateOptions();
		};
		const _onChangeSwitchDark = () => {
			const body = document.documentElement as HTMLElement;
			if (settingConfig.isDark) {
				body.setAttribute('data-theme', 'dark');
				body.classList.add('dark');
			} else {
				body.setAttribute('data-theme', '');
				body.classList.remove('dark');
			}
			_changeUpdateOptions();
		};
		const _onChangeSwitchGlass = () => {
			const body = document.documentElement as HTMLElement;
			if (settingConfig.themeGlass) {
				body.setAttribute('theme-background', 'glass');
				body.classList.add('glass');
			} else {
				body.setAttribute('theme-background', '');
				body.classList.remove('glass');
			}
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
				<ElDivider border-style="dashed">{_t('next.layout.setting.globalTheme')}</ElDivider>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.themeColor')}</span>
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
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.textPrimary')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.textPrimary}
							predefine={['#606266', '#000000', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585', '#FB07A0']}
							show-alpha
							onChange={_onChangeTextPrimary}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.darkMode')}</span>
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
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.headerBackground')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.headerBarColor}
							predefine={['#282c34', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							show-alpha
							onChange={(color: string) => _onChangeColor(color, 'headerBarColor', '--next-layout-bg-color')}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.headerTextColor')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.headerBarFontColor}
							predefine={['#282c34', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							show-alpha
							onChange={(color: string) => _onChangeColor(color, 'headerBarFontColor', '--next-layout-font-color')}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.headerActiveTextColor')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElColorPicker
							v-model={settingConfig.headerBarFontActiveColor}
							predefine={['#282c34', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#FB07A0']}
							show-alpha
							onChange={(color: string) => _onChangeColor(color, 'headerBarFontActiveColor', '--next-layout-active-color')}
						></ElColorPicker>
					</div>
				</div>
				<div class={_ns.b('config-bar-item')}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.headerGradient')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<el-switch v-model={settingConfig.isHeaderBarColorGradual} onChange={_changeUpdateOptions} />
					</div>
				</div>
				<ElDivider border-style="dashed">{_t('next.layout.setting.layoutMode')}</ElDivider>
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
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.isShowTab')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElSwitch v-model={_config.showTabs} />
					</div>
				</div>
				<div class={_ns.b('config-bar-item')} style={{ 'margin-top': '20px' }}>
					<span class={_ns.be('config-bar-item', 'label')}>{_t('next.layout.setting.themeGlass')}</span>
					<div class={_ns.be('config-bar-item', 'value')}>
						<ElSwitch v-model={settingConfig.themeGlass} onChange={_onChangeSwitchGlass} />
					</div>
				</div>
				{_slots.setting?.({ config: settingConfig })}
			</ElScrollbar>
		);
	},
});
