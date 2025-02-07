import vuePlugin from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcss from 'rollup-plugin-postcss';
import postcssScss from 'postcss-scss';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
// import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import path from 'path';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;

const outDir = './publish/dist';
const outputDir = path.resolve(outDir);
const output = [
	{
		format: 'esm', // esm格式
		dir: outputDir,
		entryFileNames: '[name].js',
		assetFileNames: 'assets/[name].[hash][extname]',
		plugins: [
			terser({
				format: {
					comments: false, // 去除注释
					beautify: true, // 保存代码整洁
				},
				mangle: false, // 不混淆变量名
			}),
		],
	},
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
					noUnusedLocals: false,
				},
				exclude: ['packages/**/*.test.ts'], // 忽略文件输出d.ts文件
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
			plugins: [autoprefixer(), postcssImport()],
			parser: postcssScss,
		}),
		commonjs(),
		json(),
		babel({
			babelHelpers: 'bundled',
			include: [],
			// 只转换源代码，不运行外部依赖
			exclude: 'node_modules/**',
			// babel 默认不支持 ts 需要手动添加
			extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
			plugins: ['@vue/babel-plugin-jsx'],
		}),
		alias({
			entries: [{ find: 'packages', replacement: './packages' }],
		}),
		copy({
			targets: [
				{
					src: 'packages/assets/*',
					dest: path.resolve(outDir, 'assets/'),
				},
				{
					src: 'packages/index.d.ts',
					dest: 'publish',
				},
			],
		}),
		replace({
			values: {
				__version__: JSON.stringify(version),
			},
			preventAssignment: true,
		}),
		url({
			include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
			fileName: 'assets/[name][extname]',
			publicPath: './',
			limit: 1024,
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
			writeBundle: (options, bundle) => {
				try {
					const inputPath = path.resolve(outDir, 'index.d.ts');
					for (let i = 0; i < output.length; i++) {
						const entryFileNames = output[i].entryFileNames;
						if (entryFileNames) {
							const pathFile = entryFileNames.replace(/\[name\]/g, 'index');
							const name = pathFile.replace(/\.[^.]+$/, '.d.ts');
							const outputPath = path.resolve(outDir, name);
							fs.copyFileSync(inputPath, outputPath);
						}
					}
					// eslint-disable-next-line no-empty
				} catch (error) {}
			},
		},
		// serve({
		// 	// open: true,
		// 	// openPage: '/examples', // 默认启动打开的页面
		// 	contentBase: ['dist'], // 提供服务的文件夹
		// 	// historyApiFallback: true, // 设置true返回index.html，而不是错误404
		// 	port: 10001, // 默认端口
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*',
		// 	},
		// }),
	],
	watch: {
		buildDelay: 1000,
		include: ['packages/**'],
		skipWrite: false,
	},
	cache: true,
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
		'@tensorflow/tfjs',
		'mpegts.js',
		'flv.js',
	],
	onwarn: (warning, warn) => {
		if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.exporter === 'vue') {
			if (warning.names.includes('resolveDirective')) {
				// 忽略关于 'vue' 模块的 'resolveDirective' 未使用导入的警告
				return;
			}
		} else if (warning.code === 'CIRCULAR_DEPENDENCY') {
			// 忽略关于 '(!) Circular dependency' 的警告
			return;
		}
		warn(warning);
	},
};
