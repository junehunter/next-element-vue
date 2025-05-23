import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import NextLayout from '../index';

describe('NextLayout', () => {
	it('NextLayout 渲染', async () => {
		const { container } = render(NextLayout, {
			props: {
				options: {
					setting: {},
				},
			},
		});
		const root = container.querySelector('.next-layout');
		expect(root).toBeTruthy();
	});
});
