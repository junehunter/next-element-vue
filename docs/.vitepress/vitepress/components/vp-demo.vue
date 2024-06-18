<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue';
import { isClient, useClipboard, useToggle } from '@vueuse/core';
const files = import.meta.glob('../../examples/**/*.vue', { eager: true }) as any;

const props = defineProps<{
	demos: object;
	source: string;
	path: string;
	rawSource: string;
	description?: string;
}>();
const vm = getCurrentInstance()!;
const [sourceVisible, toggleSourceVisible] = useToggle();

const { copy, isSupported } = useClipboard({
	source: decodeURIComponent(props.rawSource),
	read: false,
});

const formatPathDemos = computed(() => {
	const demos = {};
	Object.keys(files).forEach(key => {
		demos[key.replace('../../examples/', '').replace('.vue', '')] = files[key].default;
	});
	return demos;
});

const demo = formatPathDemos.value[props.path];
const demoBlockLocale = {
	'en-US': {
		'view-source': 'View source',
		'hide-source': 'Hide source',
		'edit-in-editor': 'Edit in Playground',
		'edit-on-github': 'Edit on GitHub',
		'edit-in-codepen': 'Edit in Codepen.io',
		'copy-code': 'Copy code',
		'switch-button-option-text': 'Switch to Options API',
		'switch-button-setup-text': 'Switch to Composition API',
		'copy-success': 'Copied!',
		'copy-error': 'This browser does not support automatic copy！',
	},
};
const lang = ref<string>('en-US');
const locale = computed(() => demoBlockLocale[lang.value]);
const copyCode = async () => {
	const { $message } = vm.appContext.config.globalProperties;
	if (!isSupported) {
		$message.error(locale.value['copy-error']);
	}
	try {
		await copy();
		$message.success(locale.value['copy-success']);
	} catch (e: any) {
		$message.error(e.message);
	}
};
</script>

<template>
	<ClientOnly>
		<div class="next-element-demo">
			<div class="example-showcase">
				<component :is="demo" v-if="demo" v-bind="$attrs" />
			</div>
			<ElDivider class="m-0" />
			<div class="operation-btns">
				<ElTooltip :content="locale['copy-code']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
					<ElIcon
						:size="16"
						:aria-label="locale['copy-code']"
						class="opt-btn"
						tabindex="0"
						role="button"
						@click="copyCode"
						@keydown.prevent.enter="copyCode"
						@keydown.prevent.space="copyCode"
					>
						<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-707a7f8d="">
							<path
								fill="currentColor"
								d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
				<ElTooltip :content="locale['view-source']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
					<button ref="sourceCodeRef" :aria-label="sourceVisible ? locale['hide-source'] : locale['view-source']" class="reset-btn el-icon op-btn" @click="toggleSourceVisible()">
						<ElIcon :size="16">
							<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-707a7f8d="">
								<path
									fill="currentColor"
									d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
								></path>
							</svg>
						</ElIcon>
					</button>
				</ElTooltip>
			</div>
			<ElCollapseTransition>
				<div v-show="sourceVisible" class="example-source-wrapper">
					<div class="example-source language-vue" v-html="decodeURIComponent(source)"></div>
				</div>
			</ElCollapseTransition>
		</div>
	</ClientOnly>
</template>

<style lang="scss" scoped>
.next-element-demo {
	border: 1px solid #dcdfe6;
	border-radius: var(--el-border-radius-base);
	.example-showcase {
		padding: 15px;
		width: 100%;
		box-sizing: border-box;
	}
	.operation-btns {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 2.5rem;

		.el-icon {
			&:hover {
				color: var(--text-color);
			}
		}

		.opt-btn {
			margin: 0 0.5rem;
			cursor: pointer;
			color: var(--text-color-lighter);
			transition: 0.2s;

			&.github a {
				transition: 0.2s;
				color: var(--text-color-lighter);

				&:hover {
					color: var(--text-color);
				}
			}
		}
	}
	.language-vue {
		margin: 0;
		border-radius: 0;
	}
}
</style>
