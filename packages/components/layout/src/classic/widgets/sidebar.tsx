import { defineComponent, inject } from 'vue';
import NextMenu from 'packages/components/menu';
import { slots_config } from '../../config';

export default defineComponent({
	setup() {
		const ns = inject('ns', {} as any);
		return { ns };
	},
	render() {
		const slots = this.$slots;
		const _ns = this.ns;
		const _config = inject('options', {} as any);
		return <aside class={_ns.b('sidebar')}>{slots[slots_config.headerMenu] ? slots[slots_config.headerMenu]() : <NextMenu mode="vertical" menuTree={_config.menuTree}></NextMenu>}</aside>;
	},
});
