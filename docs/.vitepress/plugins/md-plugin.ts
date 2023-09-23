import path from 'path';
import fs from 'fs';
import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import type Renderer from 'markdown-it/lib/renderer';
import type Token from 'markdown-it/lib/token';
import tag from './tag';
import { highlight } from './highlight';

const localMd = MarkdownIt().use(tag);
interface ContainerOpts {
	marker?: string | undefined;
	validate?(params: string): boolean;
	render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
}
const externalLinkIcon = (md: MarkdownIt): void => {
	const renderToken: Renderer.RenderRule = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
	const defaultLinkOpenRenderer = md.renderer.rules.link_open || renderToken;
	const defaultLinkCloseRenderer = md.renderer.rules.link_close || renderToken;
	let isExternalLink = false;

	md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		const href = token.attrGet('href');

		if (href) {
			token.attrJoin('class', 'vp-link');
			if (/^((ht|f)tps?):\/\/?/.test(href)) {
				isExternalLink = true;
			}
		}

		return defaultLinkOpenRenderer(tokens, idx, options, env, self);
	};

	md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
		if (isExternalLink) {
			isExternalLink = false;
			return `<i class="link-icon" />${self.renderToken(tokens, idx, options)}`;
		}

		return defaultLinkCloseRenderer(tokens, idx, options, env, self);
	};
};
const tableWrapper = (md: MarkdownIt): void => {
	md.renderer.rules.table_open = () => '<div class="vp-table"><table>';
	md.renderer.rules.table_close = () => '</table></div>';
};
const tooltip = (md: MarkdownIt): void => {
	md.renderer.rules.tooltip = (tokens, idx) => {
		const token = tokens[idx];

		return `<api-typing type="${token.content}" details="${token.info}" />`;
	};

	md.inline.ruler.before('emphasis', 'tooltip', (state, silent) => {
		const tooltipRegExp = /^\^\[([^\]]*)\](`[^`]*`)?/;
		const str = state.src.slice(state.pos, state.posMax);

		if (!tooltipRegExp.test(str)) return false;
		if (silent) return true;

		const result = str.match(tooltipRegExp);

		if (!result) return false;

		const token = state.push('tooltip', 'tooltip', 0);
		token.content = result[1].replace(/\\\|/g, '|');
		token.info = (result[2] || '').replace(/^`(.*)`$/, '$1');
		token.level = state.level;
		state.pos += result[0].length;

		return true;
	});
};
const ApiMd = new MarkdownIt();
const ApiTableContainer = (md: MarkdownIt) => {
	const fence = md.renderer.rules.fence!;

	ApiMd.renderer.rules = md.renderer.rules;
	md.renderer.rules.fence = (...args) => {
		const [tokens, idx, ...rest] = args;
		const [options, env] = rest;
		const token = tokens[idx];
		if (token.info === 'api') {
			const newTokens = md.parse(token.content, env);

			let result = '';
			const { rules } = md.renderer;
			newTokens.forEach((newToken, idx) => {
				const { type } = newToken;
				if (type === 'inline') {
					result += md.renderer.renderInline(newToken.children!, options, env);
				} else if (typeof rules[type] !== 'undefined') {
					result += rules[newToken.type]!(newTokens, idx, options, env, md.renderer);
				} else {
					result += md.renderer.renderToken(newTokens, idx, options);
				}
			});
			return result;
		}
		return fence.call(md, ...args);
	};
};
export const mdPlugin = (md: MarkdownIt) => {
	md.use(externalLinkIcon);
	md.use(tableWrapper);
	md.use(tooltip);
	md.use(tag);
	md.use(mdContainer, 'demo', {
		validate(params) {
			return !!params.trim().match(/^demo\s*(.*)$/);
		},
		render(tokens, idx) {
			const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
			if (tokens[idx].nesting === 1 /* means the tag is opening */) {
				const description = m && m.length > 1 ? m[1] : '';
				const sourceFileToken = tokens[idx + 2];
				let source = '';
				const sourceFile = sourceFileToken.children?.[0].content ?? '';

				if (sourceFileToken.type === 'inline') {
					source = fs.readFileSync(path.resolve('./.vitepress/examples', `${sourceFile}.vue`), 'utf-8');
				}
				if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

				return `<Demo :demos="demos" source="${encodeURIComponent(highlight(source, 'vue'))}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(
					localMd.render(description)
				)}">`;
			} else {
				return '</Demo>';
			}
		},
	} as ContainerOpts);

	md.use(ApiTableContainer);
};
