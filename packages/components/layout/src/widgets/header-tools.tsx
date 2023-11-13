import { computed, defineComponent, inject, ref, Teleport } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElDrawer } from 'element-plus';
import { ArrowDown, Setting } from '@element-plus/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { useLocale, localeContextKey } from 'packages/hooks';
import { slots_config } from '../config';
import LayoutSetting from './layout-setting';

export default defineComponent({
	setup() {
		const locale = inject(localeContextKey, ref())!;
		const config = inject('options', {} as any);
		const { t } = useLocale();
		const { toggle, isFullscreen } = useFullscreen();
		const language = ref<string>(computed(() => config.language).value);
		const settingDrawer = ref<boolean>(false);
		return { locale, config, t, toggle, isFullscreen, language, settingDrawer };
	},
	render() {
		const _ns = inject('__ns__', {} as any);
		const _config = this.config;
		const _emit = inject('__emit__', {} as any);
		const slots = this.$slots;
		const _t = this.t;
		const isFullscreen = this.isFullscreen;
		const profile_url = _config.profile;
		const _userDropdown = _config.userDropdown;
		const _languageDropdown = _config.languageDropdown;
		const _onChangeLanguage = command => {
			this.language = command;
			_emit('changeLanguage', command);
			if (_config.onChangeLanguage) {
				_config.onChangeLanguage(command);
			}
		};
		const onChangeUserDropdown = command => {
			_emit('changeUserDropdown', command);
			if (_config.onChangeUserDropdown) {
				_config.onChangeUserDropdown(command);
			}
		};
		const _openSettingDrawer = () => {
			this.settingDrawer = true;
		};
		const _closeSettingDrawer = () => {
			this.settingDrawer = false;
		};
		return (
			<>
				<ul class={_ns.b('header-tools')}>
					{slots[slots_config.headerToolsPrefix]?.()}
					<li>
						<ElDropdown show-timeout={70} hide-timeout={50} trigger="click" onCommand={_onChangeLanguage}>
							{{
								default: () => (
									<div>
										<ElIcon size={16}>
											<svg class="icon" viewBox="0 0 1070 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1855" width="128" height="128">
												<path
													d="M232.58156522 358.13286957C244.86956522 394.4626087 265.17147826 425.984 293.48730435 453.76556522c24.04173913-26.17878261 42.2066087-58.23443478 53.96034782-95.63269565H232.58156522z"
													p-id="1856"
												></path>
												<path
													d="M981.61530435 143.36h-448.77913044L507.19165217 6.05495652h-416.72347826c-45.94643478 0-83.34469565 37.39826087-83.34469565 83.34469565v708.42991305c0 45.94643478 37.39826087 83.34469565 83.34469565 83.34469565h379.85947826l-30.45286956 137.30504348h541.74052174c45.94643478 0 83.34469565-37.39826087 83.34469565-83.34469565V226.70469565c0-45.94643478-37.39826087-83.34469565-83.34469565-83.34469565zM415.83304348 564.35756522c-49.152-18.16486957-89.75582609-41.13808696-122.34573913-67.85113044-34.19269565 30.45286957-76.93356522 52.89182609-126.61982609 66.7826087l-17.09634783-28.31582609c48.61773913-12.82226087 89.22156522-32.05565217 121.2772174-59.30295652-33.12417391-33.65843478-56.0973913-72.65947826-68.91965218-117.00313044h-46.48069565v-32.05565217H276.92521739c-7.47965217-13.89078261-17.09634783-27.24730435-28.31582609-40.06956522l32.05565218-11.75373913c11.21947826 14.42504348 21.37043478 31.5213913 30.45286956 51.28904348h115.9346087v32.05565218h-46.48069565c-14.95930435 45.94643478-36.32973913 84.41321739-64.64556522 115.40034782 31.5213913 25.11026087 71.05669565 45.94643478 117.5373913 63.04278261l-17.63060869 27.78156522z m607.45460869 370.24278261c0 22.97321739-18.69913043 41.67234783-41.67234782 41.67234782H492.23234783l20.83617391-95.63269565h156.53843478l-89.22156522-497.39686957-0.53426087 2.67130435-3.73982608-19.76765217 1.06852174 0.53426087-32.58991305-181.64869565H982.14956522c22.97321739 0 41.67234783 18.69913043 41.67234782 41.67234782v707.89565218z"
													p-id="1857"
												></path>
												<path
													d="M684.56626087 541.38434783h114.86608696v-30.45286957h-114.86608696V450.02573913h122.34573913v-30.45286956h-158.14121739v219.04695652h162.94956522V608.16695652h-127.15408696v-66.78260869z m239.88313043-65.71408696c-9.61669565 0-18.16486957 1.60278261-26.1787826 5.87686956-7.47965217 3.73982609-14.95930435 9.61669565-20.83617392 17.09634783V479.94434783h-34.72695652v158.67547826h34.72695652v-95.63269566c1.06852174-12.82226087 5.3426087-22.43895652 12.82226087-29.38434782 6.41113043-5.87686957 13.89078261-9.08243478 22.43895652-9.08243478 24.04173913 0 35.79547826 12.82226087 35.79547826 39.00104347v94.56417392h34.72695653v-97.76973913c1.06852174-43.27513043-19.2333913-64.64556522-58.76869566-64.64556522z"
													p-id="1858"
												></path>
											</svg>
										</ElIcon>
									</div>
								),
								dropdown: () => (
									<ElDropdownMenu>
										{_languageDropdown.map(item => {
											return (
												<ElDropdownItem command={item.value} disabled={this.language === item.value}>
													{item.label}
												</ElDropdownItem>
											);
										})}
									</ElDropdownMenu>
								),
							}}
						</ElDropdown>
					</li>
					<li>
						<span style={{ display: 'inline-block', lineHeight: 1 }} onClick={this.toggle}>
							<ElIcon size={16}>
								{isFullscreen ? (
									<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2676" width="128" height="128">
										<path
											d="M749.248 704H864a32 32 0 1 0 0-64H672a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L749.248 704zM320 749.248V864a32 32 0 1 0 64 0V672a32 32 0 0 0-32-32H160a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L320 749.248zM749.248 320H864a32 32 0 1 1 0 64H672a32 32 0 0 1-32-32V160a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L749.248 320zM320 274.752V160a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H160a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L320 274.752z"
											p-id="2677"
										></path>
									</svg>
								) : (
									<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2522" width="128" height="128">
										<path
											d="M237.248 192H352a32 32 0 1 0 0-64H160a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L237.248 192zM832 237.248V352a32 32 0 1 0 64 0V160a32 32 0 0 0-32-32H672a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L832 237.248zM237.248 832H352a32 32 0 1 1 0 64H160a32 32 0 0 1-32-32V672a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L237.248 832zM832 786.752V672a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H672a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L832 786.752z"
											p-id="2523"
										></path>
									</svg>
								)}
							</ElIcon>
						</span>
					</li>
					{slots[slots_config.headerToolsSuffix]?.()}
					<li>
						<ElDropdown show-timeout={70} hide-timeout={80} onCommand={onChangeUserDropdown}>
							{{
								default: () => (
									<span class={_ns.be('header-tools', 'user')}>
										{profile_url ? <img class="user-photo" src={profile_url} /> : null}
										<span>Admin</span>
										<ElIcon class="el-icon--right">
											<ArrowDown />
										</ElIcon>
									</span>
								),
								dropdown: () => (
									<ElDropdownMenu>
										{_userDropdown?.map(item => {
											return (
												<ElDropdownItem command={item.value} divided={!!item.divided}>
													{_t(item.label)}
												</ElDropdownItem>
											);
										})}
									</ElDropdownMenu>
								),
							}}
						</ElDropdown>
					</li>
					<li>
						<span style={{ display: 'inline-block', lineHeight: 1 }} onClick={_openSettingDrawer}>
							<ElIcon size={16}>
								<Setting />
							</ElIcon>
						</span>
					</li>
				</ul>
				<Teleport to="body">
					<ElDrawer
						v-model={this.settingDrawer}
						title={this.t('next.layout.systemSetting')}
						direction="rtl"
						size="380px"
						class={_ns.be('drawer', 'setting')}
						destroy-on-close
						beforeClose={_closeSettingDrawer}
					>
						<LayoutSetting></LayoutSetting>
					</ElDrawer>
				</Teleport>
			</>
		);
	},
});
