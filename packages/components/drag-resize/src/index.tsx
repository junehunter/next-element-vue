import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NextDragResize',
	props: {},
	setup() {
		const renderContent = () => {
			return <></>;
		};
		return () => <>{renderContent()}</>;
	},
});
