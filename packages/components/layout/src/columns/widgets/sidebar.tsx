import { defineComponent, inject } from 'vue';
import SideMenu from './side-menu';
import { slots_config } from '../../config';

export default defineComponent({
	setup() {
		const ns = inject('ns', {} as any);
		return { ns };
	},
	render() {
		const slots = this.$slots;
		const _ns = this.ns;
		return <aside class={_ns.b('sidebar')}>{slots[slots_config.sidebarMenu] ? slots[slots_config.sidebarMenu]() : <SideMenu></SideMenu>}</aside>;
	},
});
