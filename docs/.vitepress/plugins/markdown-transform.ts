import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import type { Plugin } from 'vite';
const REPO_PATH = 'next-element-vue';
const docRoot = path.resolve('../');
const docsDirName = 'docs';
const projRoot = path.resolve();
const footerLocale = {
	'en-US': {
		source: 'Source',
		contributors: 'Contributors',
		component: 'Component',
		docs: 'Docs',
	},
};

const ensureLang = (lang: string) => `/${lang}`;

const getLang = (id: string) => path.relative(docRoot, id).split(path.sep)[0];

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>;

let compPaths: string[];

export function MarkdownTransform(): Plugin {
	return {
		name: 'next-element-md-transform',

		enforce: 'pre',

		async buildStart() {
			const pattern = `${projRoot}/components`;
			compPaths = await glob(pattern, {
				cwd: docRoot,
				absolute: true,
				onlyDirectories: true,
			});
		},

		async transform(code, id) {
			if (!id.endsWith('.md')) return;
			// 首页不做转换
			if (id.includes('/docs/index')) return;

			const componentId = path.basename(id, '.md');
			const append: Append = {
				headers: [],
				footers: [],
				scriptSetups: [`const demos = import.meta.globEager('../examples/${componentId}/*.vue')`],
			};
			code = transformVpScriptSetup(code, append);

			if (compPaths.some(compPath => id.startsWith(compPath))) {
				code = transformComponentMarkdown(id, componentId, code, append);
			}

			return combineMarkdown(code, [combineScriptSetup(append.scriptSetups), ...append.headers], append.footers);
		},
	};
}

const combineScriptSetup = (codes: string[]) =>
	`\n<script setup>
${codes.join('\n')}
</script>
`;

const combineMarkdown = (code: string, headers: string[], footers: string[]) => {
	const frontmatterEnds = code.indexOf('---\n\n');
	const firstHeader = code.search(/\n#{1,6}\s.+/);
	const sliceIndex = firstHeader < 0 ? (frontmatterEnds < 0 ? 0 : frontmatterEnds + 4) : firstHeader;

	if (headers.length > 0) code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex);
	code += footers.join('\n');

	return `${code}\n`;
};

const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/;

const transformVpScriptSetup = (code: string, append: Append) => {
	const matches = code.match(vpScriptSetupRE);
	if (matches) code = code.replace(matches[0], '');
	const scriptSetup = matches?.[3] ?? '';
	if (scriptSetup) append.scriptSetups.push(scriptSetup);
	return code;
};

const GITHUB_BLOB_URL = `https://github.com/${REPO_PATH}`;
const GITHUB_TREE_URL = `https://github.com/${REPO_PATH}`;
const transformComponentMarkdown = (id: string, componentId: string, code: string, append: Append) => {
	const lang = getLang(id);
	const docUrl = `${GITHUB_BLOB_URL}/${docsDirName}/en-US/component/${componentId}.md`;
	const componentUrl = `${GITHUB_TREE_URL}/packages/components/${componentId}`;
	const componentPath = path.resolve(projRoot, `packages/components/${componentId}`);
	const isComponent = fs.existsSync(componentPath);

	const links = [[footerLocale[lang].docs, docUrl]];
	if (isComponent) links.unshift([footerLocale[lang].component, componentUrl]);
	const linksText = links
		.filter(i => i)
		.map(([text, link]) => `[${text}](${link})`)
		.join(' • ');

	const sourceSection = `
## ${footerLocale[lang].source}

${linksText}`;

	const contributorsSection = `
## ${footerLocale[lang].contributors}

<Contributors id="${componentId}" />`;

	append.footers.push(sourceSection, isComponent ? contributorsSection : '');

	return code;
};
