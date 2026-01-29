import { defineComponent, getCurrentInstance, inject, ref } from 'vue';
import NextMenu from 'packages/components/menu';
import { useLocale } from 'packages/hooks';
import type { RouteLocationRaw, Router } from 'vue-router';
import { NextTextEllipsis } from 'packages/components';
import type { TabInterface } from 'packages/components/tabs/src/interface';
import { ElScrollbar } from 'element-plus';

export default defineComponent({
	setup() {
		const instance = getCurrentInstance()!;
		const router = instance.appContext.config.globalProperties.$router as Router;
		const _config = inject('options', {} as any);
		const _ns = inject('ns', {} as any);
		const { t } = useLocale();
		const isCollapse = ref(true);
		const onSidebarCollapse = () => {
			isCollapse.value = !isCollapse.value;
		};
		const subMenuTree = ref([]);
		const onSkipRoute = (tab: TabInterface) => {
			let to: RouteLocationRaw = {
				path: tab.path,
				query: tab.query || {},
			};
			if (!tab.path && tab.name) {
				to = {
					name: tab.name,
					params: tab.params || {},
				};
			}
			router.push(to);
		};
		const onClickMenuItem = (item: any) => {
			if (item.children?.length) {
				subMenuTree.value = item.children;
				const firstItem = item.children[0];
				onSkipRoute(firstItem);
			} else {
				subMenuTree.value = [];
				onSkipRoute(item);
			}
		};
		const renderContent = () => {
			return (
				<>
					<div class={_ns.be('sidebar', 'content')}>
						<ElScrollbar class={_ns.be('sidebar', 'scrollbar')}>
							{isCollapse.value ? (
								<NextMenu mode="vertical" collapse={true} menuTree={_config.menuTree}></NextMenu>
							) : (
								<ul class={_ns.be('sidebar', 'menu')}>
									{_config.menuTree.map((item: any) => (
										<li key={item.path} class={_ns.be('sidebar', 'menu-item')} onClick={() => onClickMenuItem(item)}>
											<strong class={item.meta?.icon}></strong>
											<span class={[_ns.be('sidebar', 'menu-text'), 'text-ellipsis']}>
												<NextTextEllipsis content={t(item.meta?.title)}></NextTextEllipsis>
											</span>
										</li>
									))}
								</ul>
							)}
						</ElScrollbar>
						<div class={[_ns.be('sidebar', 'footer')]}>
							<svg
								class={isCollapse.value ? 'collapsed-svg' : ''}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
								onClick={onSidebarCollapse}
							>
								<path d="m11 17-5-5 5-5"></path>
								<path d="m18 17-5-5 5-5"></path>
							</svg>
						</div>
					</div>
					{!isCollapse.value && subMenuTree.value?.length > 0 ? (
						<div class={_ns.be('sidebar', 'subcontent')}>
							<NextMenu mode="vertical" collapse={false} menuTree={subMenuTree.value}></NextMenu>
						</div>
					) : null}
				</>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
