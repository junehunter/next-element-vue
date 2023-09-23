import { defineComponent, inject } from 'vue';

export default defineComponent({
	setup() {
		const ns = inject('__ns__', {} as any);
		const _options = inject('options', {} as any);
		const renderContent = () => {
			return (
				<div class={ns.bf('header', 'logo')}>
					{_options.logo && <img class={ns.be('header-logo', 'img')} src={_options.logo} alt="logo" />}
					{_options.title && <p class={ns.be('header-logo', 'title')}>{_options.title}</p>}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
