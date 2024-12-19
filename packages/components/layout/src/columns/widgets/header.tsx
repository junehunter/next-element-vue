import { defineComponent, inject, computed } from 'vue';
import LogoView from '../../widgets/logo';
import HeaderTools from '../../widgets/header-tools';
import { slots_config } from '../../config';
import { useChangeColor } from 'packages/utils/theme';

const { getLightColor } = useChangeColor();
export default defineComponent({
	setup(props, { slots }) {
		const _ns = inject('ns', {} as any);
		const _config = inject('options', {} as any);
		const headerStyle = computed(() => {
			const { isHeaderBarColorGradual, headerBarColor: color } = _config.setting;
			if (isHeaderBarColorGradual) {
				return {
					background: `linear-gradient(to bottom , ${color}, ${getLightColor(color, 0.5)})`,
				};
			} else {
				return '';
			}
		});
		const __slots_header_tools: any = {};
		if (slots[slots_config.headerToolsPrefix]) __slots_header_tools[slots_config.headerToolsPrefix] = () => slots[slots_config.headerToolsPrefix]();
		if (slots[slots_config.headerToolsSuffix]) __slots_header_tools[slots_config.headerToolsSuffix] = () => slots[slots_config.headerToolsSuffix]();
		const renderContent = () => {
			return (
				<header class={_ns.b('header')} style={headerStyle.value}>
					<LogoView></LogoView>
					<div class={_ns.bf('header', 'menu')}></div>
					<div class={_ns.bf('header', 'right')}>
						<HeaderTools>{__slots_header_tools}</HeaderTools>
					</div>
				</header>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
