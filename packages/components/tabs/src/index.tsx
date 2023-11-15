import { defineComponent, computed, ref, watch, getCurrentInstance } from 'vue';
import type { PropType } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElScrollbar } from 'element-plus';
import { Close, Back, Right } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import type { Router } from 'vue-router';
import type { TabInterface } from './interface';

const ns = useNamespace('tabs');
export default defineComponent({
	name: 'NextTabs',
	props: {
		activeTab: {
			type: [String, Number],
			default: '/',
		},
		tabs: {
			type: Array as PropType<TabInterface[]>,
			default: () => {
				return [];
			},
		},
	},
	emits: ['change', 'select', 'close'],
	setup(props, { emit }) {
		const { t } = useLocale();
		const instance = getCurrentInstance()!;
		const router = instance.appContext.config.globalProperties.$router as Router;
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
		const tabsView = ref<TabInterface[]>(_tabs.value);
		const onChange = command => {
			const active = _activeTab.value;
			const len = tabsView.value.length;
			const i = tabsView.value.findIndex((v: any) => v.path === active);
			switch (command) {
				case 'other':
					if (i > -1) {
						activeIndex.value = 1;
						tabsView.value = [tabsView.value[0], tabsView.value[i]];
					}
					break;
				case 'left':
					if (i > -1) {
						const rightTags = tabsView.value.slice(i);
						rightTags.unshift(tabsView.value[0]);
						tabsView.value = rightTags;
						activeIndex.value = 1;
					}
					break;
				case 'right':
					if (i > -1 && i < len - 1) {
						const leftTags = tabsView.value.slice(0, i + 1);
						tabsView.value = leftTags;
					}
					break;
				case 'all':
					const homeTag = tabsView.value[0] as TabInterface;
					activeIndex.value = 0;
					tabsView.value = [homeTag];
					onClickTabItem(null, homeTag, activeIndex.value);
					break;
				default:
					break;
			}
			emit('change', activeIndex.value, tabsView.value, command);
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
			emit('select', tab, index);
		};
		const onCloseTab = (event: MouseEvent, tab: TabInterface, index: number) => {
			event.stopPropagation();
			const active = _activeTab.value;
			if (active === tab.path) {
				const prevTag = tabsView.value[index - 1] as TabInterface;
				router.push({
					path: prevTag.path,
					query: prevTag.query || {},
					params: prevTag.params || {},
				});
				emit('close', prevTag, tabsView.value);
			}
			tabsView.value.splice(index, 1);
			const i = tabsView.value.findIndex((v: any) => v.path === active) || 0;
			if (i > -1) {
				activeIndex.value = i;
			} else {
				activeIndex.value = 0;
			}
			emit('change', activeIndex.value, tabsView.value, 'close');
		};
		watch(
			() => router.currentRoute?.value,
			(to: any) => {
				const { tagTitle } = to.query;
				const activeRoute = {
					name: to.name,
					title: tagTitle || to.meta?.title,
					path: to.path,
					meta: to.meta,
					params: to.params,
					query: to.query,
				};
				const i = tabsView.value.findIndex((v: any) => v.path === to.path);
				if (i > -1) {
					activeIndex.value = i;
					tabsView.value[i] = activeRoute;
				} else {
					activeIndex.value = tabsView.value.length;
					tabsView.value.push(activeRoute);
				}
				emit('change', activeIndex.value, tabsView.value, 'add');
			}
		);
		const renderContent = () => {
			return (
				<nav class={ns.b()}>
					<ElScrollbar>
						<ul class={ns.b('list')}>
							{(tabsView.value as TabInterface[]).map((tab, index) => {
								return tab ? (
									<li class={['tab-item', ns.is('active', activeIndex.value === index)]} onClick={event => onClickTabItem(event, tab, index)}>
										<i class={['tab-icon', tab.meta?.icon]}></i>
										<span>{t(tab.title)}</span>
										{!tab.meta?.isAffix && tab.path !== '/' ? (
											<span onClick={event => onCloseTab(event, tab, index)}>
												<ElIcon class={'tab-close'}>
													<Close />
												</ElIcon>
											</span>
										) : null}
									</li>
								) : null;
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
