import { defineComponent, inject, computed } from 'vue';
import { slots_config } from '../../config';
import LogoView from '../../widgets/logo';
import HeaderTools from '../../widgets/header-tools';
import NextMenu from 'packages/components/menu';
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
		const renderContent = () => {
			return (
				<header class={_ns.b('header')} style={headerStyle.value}>
					<LogoView></LogoView>
					<div class={_ns.bf('header', 'menu')}>
						{slots[slots_config.headerMenu] ? slots[slots_config.headerMenu]() : <NextMenu menuTree={_config.menuTree} router={_config.menuRouter} mode={_config.menuMode}></NextMenu>}
					</div>
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
