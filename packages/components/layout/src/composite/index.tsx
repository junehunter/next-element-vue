import { defineComponent, provide, ref, inject, nextTick } from 'vue';
import { useNamespace } from 'packages/hooks';
import Header from './widgets/header';
import Sidebar from './widgets/sidebar';
import { NextTabs } from 'packages/components';
import { slots_config } from '../config';

const ns = useNamespace('layout-composite');
export default defineComponent({
	props: {},
	setup() {
		provide('ns', ns);
		const submenuTree = ref([]);
		provide('submenuTree', submenuTree);
		provide('updateSubmentTree', (val: any) => {
			submenuTree.value = [];
			nextTick(() => {
				submenuTree.value = val;
			});
		});
		return { ns, submenuTree };
	},
	render() {
		const slots = this.$slots;
		const _config = inject('options', {} as any);
		const _emit = inject('__emit__', {} as any);
		const __slots_header: any = {};
		if (slots.menu) __slots_header.menu = () => slots.menu();
		const __slots_header_tools: any = {};
		if (slots[slots_config.headerToolsPrefix]) __slots_header_tools[slots_config.headerToolsPrefix] = () => slots[slots_config.headerToolsPrefix]();
		if (slots[slots_config.headerToolsSuffix]) __slots_header_tools[slots_config.headerToolsSuffix] = () => slots[slots_config.headerToolsSuffix]();
		const isTabs = ref<boolean>(!!slots.tabs);
		if (slots.tabs === undefined && _config.showTabs) {
			isTabs.value = true;
		}
		return (
			<>
				<Header>{__slots_header_tools}</Header>
				<div class={[ns.b('content'), ns.is('layout-tabs', isTabs.value)]}>
					<Sidebar></Sidebar>
					<div class={ns.b('container')}>
						{_config.showTabs ? (
							slots.tabs ? (
								slots.tabs?.()
							) : (
								<NextTabs
									tabs={_config.tabs}
									activeTab={_config.activeTab}
									onChange={(...arg) => _emit('tabsChange', ...arg)}
									onSelect={(...arg) => _emit('tabsSelect', ...arg)}
									onClose={(...arg) => _emit('tabsClose', ...arg)}
								></NextTabs>
							)
						) : null}
						<main class={[ns.b('main')]}>{slots['default']?.()}</main>
					</div>
				</div>
			</>
		);
	},
});
