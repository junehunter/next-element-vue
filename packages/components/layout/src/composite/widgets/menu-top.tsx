import { defineComponent, provide, ref, watch, getCurrentInstance, inject } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import type { MenuItemInterface } from 'packages/components/menu/src/interface';
import MenuItemTitle from 'packages/components/menu/src/widgets/menu-item-title';
import { ElMenu, ElMenuItem } from 'element-plus';
import { useNamespace } from 'packages/hooks';
import type { Router } from 'vue-router';
import { valueExist } from 'packages/hooks/global-hook';

const findParentNode = (path: string, tree: MenuItemInterface[]) => {
	for (const node of tree) {
		if (node.children?.some(child => child.path === path)) {
			return node;
		}
		if (node.children) {
			const parent = findParentNode(path, node.children);
			if (parent) {
				return parent;
			}
		}
	}
	return null;
};
const ns = useNamespace('menu');
export default defineComponent({
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		menuTree: {
			type: Array as PropType<MenuItemInterface[]>,
			default: () => {
				return [];
			},
		},
	},
	setup(props) {
		provide('ns', ns);
		const updateSubmentTree = inject('updateSubmentTree') as Function;
		const instance = getCurrentInstance()!;
		const router = instance.appContext.config.globalProperties.$router as Router;
		const currentPath = router.currentRoute?.value.fullPath;
		const parentNode = findParentNode(currentPath, props.menuTree);
		const activeMenuId = ref(parentNode?.id);
		if (parentNode?.id) {
			updateSubmentTree(parentNode.children);
		}
		watch(
			() => router.currentRoute?.value,
			to => {
				const parentNode = findParentNode(to.fullPath, props.menuTree);
				activeMenuId.value = parentNode?.id;
				// 必须是一级菜单菜更新左侧子菜单
				if (parentNode?.id && parentNode.meta?.level === 1) {
					updateSubmentTree(parentNode.children);
				}
			}
		);
		const findTreeFirst = (tree: MenuItemInterface[]) => {
			let result: MenuItemInterface | undefined = tree[0];
			for (let i = 0; i < tree.length; i++) {
				const node = tree[i];
				if (node.children?.length) {
					result = findTreeFirst(node.children);
					if (result) break;
				}
			}
			return result;
		};
		const onClickMenuItem = (val: string, item: MenuItemInterface) => {
			updateSubmentTree(item.children);
			if (item.children?.length) {
				const firstNode = findTreeFirst(item.children);
				router.push(firstNode.path);
				return;
			}
			router.push(item.path);
		};
		const renderContent = () => {
			return (
				<ElMenu class={[ns.b(), props.className]} style={props.style} popper-class={ns.b('popper')} defaultActive={activeMenuId.value} mode="horizontal" ellipsis>
					<>
						{props.menuTree.map(item => {
							return !valueExist(item.meta?.isHide, false) ? (
								<ElMenuItem index={item.id} onClick={(val: string) => onClickMenuItem(val, item)}>
									<MenuItemTitle meta={item.meta}></MenuItemTitle>
								</ElMenuItem>
							) : null;
						})}
					</>
				</ElMenu>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
