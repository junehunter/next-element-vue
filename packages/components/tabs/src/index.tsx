import { defineComponent, computed, ref, reactive, watch } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElScrollbar } from 'element-plus';
import { Close, Back, Right } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { useRouter } from 'vue-router';

interface TabInterface {
	name?: string;
	title: string;
	path: string;
	meta: any;
	query?: any;
	params?: any;
}
const ns = useNamespace('tabs');
export default defineComponent({
	name: 'NextTabs',
	props: {
		activeTab: {
			type: [String, Number],
			default: '/',
		},
		tabs: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	emits: ['change', 'select', 'close'],
	setup(props, { emit }) {
		const router = useRouter();
		const { t } = useLocale();
		const _activeTab = computed(() => router.currentRoute.value.fullPath);
		const _tabs = computed(() => props.tabs);
		const defaultIndex = _tabs.value?.findIndex((v: any) => v.path === _activeTab.value);
		if (defaultIndex < 0) {
			const tab = _tabs.value[0] as TabInterface;
			if (tab && tab.path) {
				router.replace({ path: tab.path });
			}
		}
		const activeIndex = ref(defaultIndex);
		let tabsView = reactive(_tabs.value);
		const onChange = command => {
			const active = _activeTab.value;
			const len = tabsView.length;
			const i = tabsView.findIndex((v: any) => v.path === active);
			switch (command) {
				case 'other':
					if (i > -1) {
						activeIndex.value = 1;
						tabsView = [tabsView[0], tabsView[i]];
					}
					break;
				case 'left':
					if (i > -1) {
						const rightTags = tabsView.slice(i);
						rightTags.unshift(tabsView[0]);
						tabsView = rightTags;
						activeIndex.value = 1;
					}
					break;
				case 'right':
					if (i > -1 && i < len - 1) {
						const leftTags = tabsView.slice(0, i + 1);
						tabsView = leftTags;
					}
					break;
				case 'all':
					const homeTag = tabsView[0] as TabInterface;
					activeIndex.value = 0;
					tabsView = [homeTag];
					onClickTabItem(null, homeTag, activeIndex.value);
					break;
				default:
					break;
			}
			emit('change', activeIndex.value, tabsView, command);
		};
		const onClickTabItem = (event: MouseEvent, tab: TabInterface, index: number) => {
			event?.stopPropagation();
			activeIndex.value = index;
			let to = {
				path: tab.path,
				query: tab.query,
				params: tab.params,
			};
			router.push(to);
		};
		const onCloseTab = (event: MouseEvent, tab: TabInterface, index: number) => {
			event.stopPropagation();
			const active = _activeTab.value;
			if (active === tab.path) {
				const prevTag = tabsView[index - 1] as TabInterface;
				router.push({
					path: prevTag.path,
					query: prevTag.query || {},
					params: prevTag.params || {},
				});
				emit('close', prevTag, tabsView);
			}
			tabsView.splice(index, 1);
			const i = tabsView.findIndex((v: any) => v.path === active) || 0;
			if (i > -1) {
				activeIndex.value = i;
			} else {
				activeIndex.value = 0;
			}
		};
		watch(
			() => router.currentRoute.value,
			(to: any) => {
				const { tagTitle } = to.query;
				const activeRoute = {
					name: to.name,
					title: tagTitle || to.meta.title,
					path: to.path,
					meta: to.meta,
					params: to.params,
					query: to.query,
				};
				const i = tabsView.findIndex((v: any) => v.path === to.path);
				if (i > -1) {
					activeIndex.value = i;
					tabsView[i] = activeRoute;
				} else {
					activeIndex.value = tabsView.length;
					tabsView.push(activeRoute);
				}
			}
		);
		const renderContent = () => {
			return (
				<nav class={ns.b()}>
					<ElScrollbar>
						<ul class={ns.b('list')}>
							{(tabsView as any[]).map((tab, index) => {
								return (
									<li class={['tab-item', ns.is('active', activeIndex.value === index)]} onClick={event => onClickTabItem(event, tab, index)}>
										<i class={['tab-icon', tab.meta.icon]}></i>
										<span>{t(tab.title)}</span>
										{!tab.meta.isAffix && tab.path !== '/' ? (
											<span onClick={event => onCloseTab(event, tab, index)}>
												<ElIcon class={'tab-close'}>
													<Close />
												</ElIcon>
											</span>
										) : null}
									</li>
								);
							})}
						</ul>
					</ElScrollbar>
					<ElDropdown show-timeout={80} hide-timeout={80} onCommand={onChange}>
						{{
							default: () => (
								<span class={ns.b('tab-more')}>
									<i class={[ns.be('tab-more', 'box'), ns.be('tab-more', 'top')]}></i>
									<i class={[ns.be('tab-more', 'box'), ns.be('tab-more', 'bottom')]}></i>
								</span>
							),
							dropdown: () => (
								<ElDropdownMenu>
									<ElDropdownItem command={'other'}>
										<ElIcon>
											<Close />
										</ElIcon>
										<span>{t('next.layout.tabsOther')}</span>
									</ElDropdownItem>
									<ElDropdownItem command={'left'}>
										<ElIcon>
											<Back />
										</ElIcon>
										<span>{t('next.layout.tabsLeft')}</span>
									</ElDropdownItem>
									<ElDropdownItem command={'right'}>
										<ElIcon>
											<Right />
										</ElIcon>
										<span>{t('next.layout.tabsRight')}</span>
									</ElDropdownItem>
									<ElDropdownItem command={'all'}>
										<ElIcon>
											<Close />
										</ElIcon>
										<span>{t('next.layout.tabsAll')}</span>
									</ElDropdownItem>
								</ElDropdownMenu>
							),
						}}
					</ElDropdown>
				</nav>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
