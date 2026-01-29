import { defineComponent, provide, ref, watch, getCurrentInstance } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { useNamespace } from 'packages/hooks';
import NextMenuItem from './widgets/menu-item';
import MenuItemTitle from './widgets/menu-item-title';
import type { MenuItemInterface } from './interface';
import type { Router } from 'vue-router';
import { valueExist } from 'packages/hooks/global-hook';

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
			type: Array as PropType<MenuItemInterface[]>,
			default: () => {
				return [];
			},
		},
		collapse: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		provide('ns', ns);
		const instance = getCurrentInstance()!;
		const router = instance.appContext.config.globalProperties.$router as Router;
		const currentPath = router.currentRoute?.value.fullPath;
		const activePath = ref(currentPath);
		watch(
			() => router.currentRoute?.value,
			to => {
				activePath.value = to.fullPath;
			}
		);
		const menuKey = ref(0);
		watch(
			() => props.menuTree,
			() => {
				menuKey.value++;
			},
			{
				deep: true,
			}
		);
		const renderContent = () => {
			return (
				<ElMenu
					key={menuKey.value}
					class={[ns.b(), props.className]}
					style={props.style}
					popper-class={ns.b('popper')}
					defaultActive={activePath.value}
					router={props.router}
					mode={props.mode}
					collapse={props.collapse}
					ellipsis
				>
					{/* 必须要先循环遍历一遍，直接调用递归组件NextMenuItem时ellipsis有bug */}
					<>
						{props.menuTree.map(item => {
							if (!item.children?.length) {
								return !valueExist(item.meta?.isHide, false) ? (
									<ElMenuItem popper-class={ns.b('popper')} index={item.path}>
										<MenuItemTitle meta={item.meta}></MenuItemTitle>
									</ElMenuItem>
								) : null;
							} else {
								return !valueExist(item.meta?.isHide, false) ? (
									<ElSubMenu popper-class={ns.b('popper')} index={item.path || item.id} teleported>
										{{
											title: () => <MenuItemTitle meta={item.meta}></MenuItemTitle>,
											default: () => <NextMenuItem menuData={item.children}></NextMenuItem>,
										}}
									</ElSubMenu>
								) : null;
							}
						})}
					</>
				</ElMenu>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
