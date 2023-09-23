import { defineComponent, inject } from 'vue';
import LogoView from '../../widgets/logo';
import HeaderTools from '../../widgets/header-tools';
import { slots_config } from '../../config';

export default defineComponent({
	setup(props, { slots }) {
		const _ns = inject('ns', {} as any);
		const renderContent = () => {
			return (
				<header class={_ns.b('header')}>
					<LogoView></LogoView>
					<div class={_ns.bf('header', 'menu')}>{slots[slots_config.headerMenu]?.()}</div>
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
