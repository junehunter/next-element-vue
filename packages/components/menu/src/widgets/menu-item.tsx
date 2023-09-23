import { defineComponent, computed, inject } from 'vue';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import type { MenuItemInterface } from '../interface';
import MenuItemTitle from './menu-item-title';

const NextMenuItem = defineComponent({
	name: 'NextMenuItem',
	props: {
		menuData: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const _ns = inject('ns', {} as any);
		const menuTree = computed(() => {
			return props.menuData;
		}).value as MenuItemInterface[];

		const renderContent = () => {
			return (
				<>
					{menuTree.map(item => {
						if (!item.children?.length) {
							return (
								<ElMenuItem index={item.path}>
									<MenuItemTitle meta={item.meta}></MenuItemTitle>
								</ElMenuItem>
							);
						} else {
							return (
								<ElSubMenu popper-class={_ns.b('popper')} index={item.path || item.id} teleported>
									{{
										title: () => <MenuItemTitle meta={item.meta}></MenuItemTitle>,
										default: () => <NextMenuItem menuData={item.children}></NextMenuItem>,
									}}
								</ElSubMenu>
							);
						}
					})}
				</>
			);
		};
		return () => <>{renderContent()}</>;
	},
});

export default NextMenuItem;
