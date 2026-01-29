import vuePlugin from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
// 压缩css文件插件cssnao
import cssnao from 'cssnano';
import postcssImport from 'postcss-import';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import path from 'path';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const packageJson = JSON.parse(JSON.stringify(pkg));
delete packageJson['scripts'];
delete packageJson['simple-git-hooks'];
delete packageJson['lint-staged'];
delete packageJson['devDependencies'];
const packageJsonContent = JSON.stringify(packageJson, null, 4);
const dirname = 'publish';
if (!fs.existsSync(path.resolve(dirname))) {
	fs.mkdirSync(dirname);
}
fs.writeFileSync(path.resolve(dirname, 'package.json'), packageJsonContent, 'utf-8');

const outputDir = path.resolve(dirname, 'dist');
const getDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
};
/* eslint-disable no-irregular-whitespace */
const banner = `
/**
 * 作　　者：${packageJson.author.name}
 * 邮　　箱：${packageJson.author.email}
 * 当前版本：${version} v
 * 发布日期：${getDate()}
 * 地　　址：https://www.npmjs.com/package/next-element-vue
 */
`;
const output = [
	{
		format: 'esm', // esm格式
		dir: outputDir,
		entryFileNames: '[name].js',
		assetFileNames: 'assets/[name].[hash][extname]', // 自定义构建结果中的静态资源名称，或者值为一个函数
		plugins: [
			terser({
				compress: {
					drop_console: true, // 移除console
					drop_debugger: true, // 移除debugger
					pure_funcs: ['console.log'], //移除console
					passes: 2, // 压缩次数
				},
				format: {
					comments: false, // true 保留注释 false 去掉注释
					beautify: false, // true 保存代码整洁
					preamble: banner, // 序言配置，可用于配置banner
				},
				mangle: true, // false 不混淆变量名称
			}),
		],
		banner, // 因为使用了terser，所有这里banner无效
	},
	// {
	// 	format: 'esm', // esm格式
	// 	dir: outputDir,
	// 	entryFileNames: '[name].min.js',
	// 	assetFileNames: 'assets/[name].[hash][extname]',
	// 	plugins: [
	// 		terser({
	// 			compress: {
	// 				warnings: false,
	// 				drop_console: true,
	// 				drop_debugger: true,
	// 				pure_funcs: ['console.log'], //移除console
	// 			},
	// 			format: {
	// 				comments: false, // 移除注释
	// 				preamble: banner,
	// 			},
	// 		}),
	// 	],
	// },
];
export default {
	input: {
		index: 'packages/index.ts',
	},
	output: output,
	plugins: [
		nodeResolve({
			mainFields: ['module', 'jsnext:main', 'main', 'browser'],
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		}),
		typescript({
			tsconfig: path.resolve('tsconfig.json'),
			tsconfigOverride: {
				compilerOptions: {
					declaration: true, // 打包后是否输出d.ts文件，设置为true则输出
					declarationDir: outputDir, // 输出类型声明文件的目录，与输出文件目录一致
					outDir: outputDir,
				},
				exclude: ['node_modules', 'packages/**/*.test.ts'], // 忽略文件输出d.ts文件
			},
		}),
		vuePlugin({
			target: 'browser',
			preprocessStyles: true,
			customBlocks: ['@vue/compiler-sfc'],
		}),
		postcss({
			extensions: ['.scss', '.css'],
			extract: true,
			plugins: [autoprefixer, cssnao(), postcssImport()],
		}),
		commonjs(),
		json(),
		babel({
			babelHelpers: 'bundled',
			// 只转换源代码，不运行外部依赖
			exclude: 'node_modules/**',
			// babel 默认不支持 ts 需要手动添加
			extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
			plugins: ['@vue/babel-plugin-jsx'],
		}),
		alias({
			entries: [{ find: 'packages', replacement: './packages' }],
		}),
		replace({
			values: {
				__version__: JSON.stringify(version),
			},
			preventAssignment: true,
		}),
		copy({
			targets: [
				{
					src: 'packages/assets/*',
					dest: path.resolve(outputDir, 'assets/'),
				},
				{
					src: 'packages/index.d.ts',
					dest: path.resolve(outputDir),
				},
				{
					src: 'README.md',
					dest: path.resolve(dirname),
				},
			],
		}),
		url({
			include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
			fileName: 'assets/[name][extname]',
			publicPath: './',
			emitFiles: true,
		}),
		// 监听打包完成后执行自定义操作
		{
			name: 'afterBuild',
			// 打包文件输出之前执行
			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			generateBundle: (options, bundle) => {},
			// 在打包完成后的钩子中监听输出文件的更改
			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			writeBundle: (options, bundle) => {},
		},
	],
	// 声明外部依赖，不会被打包进组件库
	external: [
		'vue',
		'@vueuse/core',
		'vue-router',
		'element-plus',
		'video.js',
		'video.js/dist/video-js.css',
		'video.js/dist/lang/zh-CN.json',
		'video.js/dist/lang/en.json',
		'video.js/dist/lang/zh-TW.json',
		'mpegts.js',
		'flv.js',
	],
	onwarn: (warning, warn) => {
		if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.exporter === 'vue') {
			if (warning.names.includes('resolveDirective')) {
				// 忽略关于 'vue' 模块的 'resolveDirective' 未使用导入的警告
				return;
			}
		}
		if (warning.code === 'CIRCULAR_DEPENDENCY') {
			// 忽略关于 '(!) Circular dependency' 的警告
			return;
		}
		warn(warning);
	},
};
