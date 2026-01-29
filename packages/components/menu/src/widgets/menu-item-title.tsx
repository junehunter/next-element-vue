import { defineComponent, inject } from 'vue';
import { useLocale } from 'packages/hooks';
import { NextTextEllipsis } from 'packages/components';

export default defineComponent({
	props: {
		meta: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	setup(props) {
		const _ns = inject('ns', {} as any);
		const { t } = useLocale();
		const meta = props.meta;
		const renderItemIcon = () => {
			if (meta.icon) {
				return <i class={meta.icon}></i>;
			}
			return (
				<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19771" width="32" height="32">
					<path
						d="M512 958.8C265.6 958.8 65.2 758.4 65.2 512S265.6 65.2 512 65.2 958.8 265.6 958.8 512 758.4 958.8 512 958.8z m0-832c-212.4 0-385.2 172.8-385.2 385.2S299.6 897.2 512 897.2 897.2 724.4 897.2 512 724.4 126.8 512 126.8z"
						p-id="19772"
					></path>
					<path d="M512 512m-169.5 0a169.5 169.5 0 1 0 339 0 169.5 169.5 0 1 0-339 0Z" p-id="19773"></path>
				</svg>
			);
		};
		return () => (
			<>
				<strong class={_ns.be('item', 'icon')}>{renderItemIcon()}</strong>
				{/* <span class={_ns.be('item', 'title')}>{t(meta.title)}</span> */}
				<span class={_ns.be('item', 'title')}>
					<NextTextEllipsis content={t(meta.title)} placement="right"></NextTextEllipsis>
				</span>
			</>
		);
	},
});
