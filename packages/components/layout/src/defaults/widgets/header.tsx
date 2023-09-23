import { defineComponent, inject } from 'vue';
import LogoView from '../../widgets/logo';
import HeaderTools from '../../widgets/header-tools';
import { slots_config } from '../../config';

export default defineComponent({
	setup() {
		const ns = inject('ns', {} as any);

		return { ns };
	},
	render() {
		const slots = this.$slots;
		const _ns = this.ns;
		return (
			<header class={_ns.b('header')}>
				<LogoView></LogoView>
				<div class={_ns.bf('header', 'right')}>
					<HeaderTools>
						{slots[slots_config.headerToolsPrefix]?.()}
						{slots[slots_config.headerToolsSuffix]?.()}
					</HeaderTools>
				</div>
			</header>
		);
	},
});
