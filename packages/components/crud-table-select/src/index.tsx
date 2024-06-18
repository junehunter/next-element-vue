import { defineComponent } from 'vue';
import { useNamespace } from 'packages/hooks';

const ns = useNamespace('crudtable-select');

export default defineComponent({
	name: 'NextCrudTableSelect',
	props: {},
	setup() {
		const renderContent = () => {
			return <div class={ns.b()}></div>;
		};

		return () => renderContent();
	},
});
