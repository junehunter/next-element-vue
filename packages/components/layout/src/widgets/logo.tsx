import { defineComponent, inject } from 'vue';
import { useLocale } from 'packages/hooks';
import { NextTextEllipsis } from 'packages/components/text-ellipsis';

export default defineComponent({
	setup() {
		const ns = inject('__ns__', {} as any);
		const _options = inject('options', {} as any);
		const { t } = useLocale();
		const onClickLogo = () => {
			_options.onClickLogo?.(_options);
		};
		const onClickTitle = () => {
			_options.onClickTitle?.(_options);
		};
		const renderContent = () => {
			return (
				<div class={ns.bf('header', 'logo')}>
					{_options.logo && <img class={ns.be('header-logo', 'img')} src={_options.logo} alt="logo" onClick={onClickLogo} />}
					{_options.title && (
						<p class={ns.be('header-logo', 'title')} onClick={onClickTitle}>
							<NextTextEllipsis content={t(_options.title)}></NextTextEllipsis>
						</p>
					)}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
