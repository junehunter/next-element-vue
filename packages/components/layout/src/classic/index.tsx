import { defineComponent, provide, ref, inject } from 'vue';
import { useNamespace } from 'packages/hooks';
import Header from './widgets/header';
import Sidebar from './widgets/sidebar';
import { NextTabs } from 'packages/components';

const ns = useNamespace('layout-classic');
export default defineComponent({
	props: {},
	setup() {
		provide('ns', ns);

		return { ns };
	},
	render() {
		const slots = this.$slots;
		const _config = inject('options', {} as any);
		const __slots_header: any = {};
		if (slots.menu) __slots_header.menu = () => slots.menu();
		const isTabs = ref<boolean>(!!slots.tabs);
		if (slots.tabs === undefined && _config.showTabs) {
			isTabs.value = true;
		}
		return (
			<>
				<Header></Header>
				<div class={[ns.b('content'), ns.is('layout-tabs', isTabs.value)]}>
					<Sidebar></Sidebar>
					<div class={ns.b('container')}>
						{_config.showTabs ? slots.tabs ? slots.tabs?.() : <NextTabs tabs={_config.tabs} activeTab={_config.activeTab}></NextTabs> : null}
						<main class={[ns.b('main')]}>{slots['default']?.()}</main>
					</div>
				</div>
			</>
		);
	},
});
