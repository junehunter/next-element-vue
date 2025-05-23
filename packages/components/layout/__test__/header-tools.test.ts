import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NextLayoutHeaderTools from '../src/widgets/header-tools';
import { useNamespace } from 'packages/hooks';

const ns = useNamespace('layout');
describe('NextLayoutHeaderTools', () => {
	it('NextLayoutHeaderTools 渲染', async () => {
		const wrapper = mount(NextLayoutHeaderTools, {
			global: {
				provide: {
					__ns__: ns,
					options: {
						setting: {},
						languageDropdown: [],
					},
				},
			},
		});
		wrapper.vm.openSettingDrawer();
		expect(wrapper.vm.settingDrawer).toBe(true);
	});
});
