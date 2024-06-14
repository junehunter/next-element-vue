import { defineComponent, inject } from 'vue';

export default defineComponent({
	props: {},
	setup() {
		const ns = inject('ns', {} as any);
		const renderContent = () => {
			return <div class={[ns.b('right')]}></div>;
		};
		return () => <>{renderContent()}</>;
	},
});
