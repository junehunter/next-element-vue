import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { h } from 'vue';
import NextSpinLoading from '../index';

describe('NextSpinLoading', () => {
	it('自定义插槽', async () => {
		const { getByText } = render(NextSpinLoading, {
			slots: {
				default: () => h('div', { class: 'test' }, '测试'),
			},
		});
		expect(getByText('测试')).toBeTruthy();
	});
});
