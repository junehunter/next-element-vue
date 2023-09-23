import { defineComponent, inject } from 'vue';
import { slots_config } from '../../config';
import LogoView from '../../widgets/logo';
import HeaderTools from '../../widgets/header-tools';
import NextMenu from 'packages/components/menu';

export default defineComponent({
	setup(props, { slots }) {
		const _ns = inject('ns', {} as any);
		const _config = inject('options', {} as any);
		const renderContent = () => {
			return (
				<header class={_ns.b('header')}>
					<LogoView></LogoView>
					<div class={_ns.bf('header', 'menu')}>{slots[slots_config.headerMenu] ? slots[slots_config.headerMenu]() : <NextMenu menuTree={_config.menuTree}></NextMenu>}</div>
					<div class={_ns.bf('header', 'right')}>
						<HeaderTools>
							{slots[slots_config.headerToolsPrefix]?.()}
							{slots[slots_config.headerToolsSuffix]?.()}
						</HeaderTools>
					</div>
				</header>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
