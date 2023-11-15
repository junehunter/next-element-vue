import { defineComponent, provide, ref, inject } from 'vue';
import { useNamespace } from 'packages/hooks';
import Header from './widgets/header';
import { NextTabs } from 'packages/components';
import { slots_config } from '../config';

const ns = useNamespace('layout-transverse');

export default defineComponent({
	props: {},
	setup() {
		provide('ns', ns);
		return {};
	},
	render() {
		const slots = this.$slots;
		const _config = inject('options', {} as any);
		const _emit = inject('__emit__', {} as any);
		const __slots_header: any = {};
		if (slots[slots_config.headerMenu]) __slots_header[slots_config.headerMenu] = () => slots[slots_config.headerMenu]();
		if (slots[slots_config.headerToolsPrefix]) __slots_header[slots_config.headerToolsPrefix] = () => slots[slots_config.headerToolsPrefix]();
		if (slots[slots_config.headerToolsSuffix]) __slots_header[slots_config.headerToolsSuffix] = () => slots[slots_config.headerToolsSuffix]();
		const isTabs = ref<boolean>(!!slots.tabs);
		if (slots.tabs === undefined && _config.showTabs) {
			isTabs.value = true;
		}
		return (
			<>
				<Header>{__slots_header}</Header>
				{_config.showTabs ? (
					slots.tabs ? (
						slots.tabs?.()
					) : (
						<NextTabs
							tabs={_config.tabs}
							activeTab={_config.activeTab}
							onChange={(...arg) => _emit('tabs-change', ...arg)}
							onSelect={(...arg) => _emit('tabs-select', ...arg)}
							onClose={(...arg) => _emit('tabs-close', ...arg)}
						></NextTabs>
					)
				) : null}
				<main class={[ns.b('main'), ns.is('layout-tabs', isTabs.value)]}>{slots['default']?.()}</main>
			</>
		);
	},
});
