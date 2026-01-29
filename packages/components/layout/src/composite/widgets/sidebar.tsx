import { defineComponent, inject } from 'vue';
import NextMenu from 'packages/components/menu';
import { slots_config } from '../../config';
import { ElScrollbar } from 'element-plus';

export default defineComponent({
	setup(props, { slots }) {
		const ns = inject('ns', {} as any);
		const submenuTree = inject('submenuTree', [] as any);
		const renderContent = () => {
			if (submenuTree.value?.length === 0) return null;
			return (
				<aside class={ns.b('sidebar')}>
					<ElScrollbar>{slots[slots_config.headerMenu] ? slots[slots_config.headerMenu]() : <NextMenu mode="vertical" menuTree={submenuTree.value}></NextMenu>}</ElScrollbar>
				</aside>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
