import { defineComponent, provide, ref, watch, getCurrentInstance } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { useNamespace } from 'packages/hooks';
import NextMenuItem from './widgets/menu-item';
import MenuItemTitle from './widgets/menu-item-title';
import type { MenuItemInterface } from './interface';
import type { Router } from 'vue-router';

const ns = useNamespace('menu');
export default defineComponent({
	name: 'NextMenu',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		router: {
			type: Boolean,
			default: true,
		},
		mode: {
			type: String as PropType<'horizontal' | 'vertical'>,
			values: ['horizontal', 'vertical'],
			default: 'horizontal',
		},
		menuTree: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	setup(props) {
		provide('ns', ns);
		const instance = getCurrentInstance()!;
		const router = instance.appContext.config.globalProperties.$router as Router;
		const _menuTree = props.menuTree as MenuItemInterface[];
		const currentPath = router.currentRoute?.value.fullPath;
		const activePath = ref(currentPath);
		watch(
			() => router.currentRoute?.value,
			to => {
				activePath.value = to.fullPath;
			}
		);
		const renderContent = () => {
			return (
				<ElMenu class={[ns.b(), props.className]} style={props.style} defaultActive={activePath.value} router={props.router} mode={props.mode} ellipsis>
					{/* 必须要先循环遍历一遍，直接调用递归组件NextMenuItem时ellipsis有bug */}
					<>
						{_menuTree.map(item => {
							if (!item.children?.length) {
								return (
									<ElMenuItem popper-class={ns.b('popper')} index={item.path}>
										<MenuItemTitle meta={item.meta}></MenuItemTitle>
									</ElMenuItem>
								);
							} else {
								return (
									<ElSubMenu popper-class={ns.b('popper')} index={item.path || item.id} teleported>
										{{
											title: () => <MenuItemTitle meta={item.meta}></MenuItemTitle>,
											default: () => <NextMenuItem menuData={item.children}></NextMenuItem>,
										}}
									</ElSubMenu>
								);
							}
						})}
					</>
				</ElMenu>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
