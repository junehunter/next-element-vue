import { computed, unref, ref, isRef, inject } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import type { Language } from 'packages/locale';
import { get } from 'lodash-unified';
// element-plus中localeContextKey是Symbol数据类型，所以一定要引对位置
import { localeContextKey as localeKey } from 'element-plus';
import zhcnLocale from 'packages/locale/lang/zh-cn';
import enLocale from 'packages/locale/lang/en';
import zhtwLocale from 'packages/locale/lang/zh-tw';

export const localeLang = {
	[zhcnLocale.name]: {
		...zhcnLocale,
	},
	[enLocale.name]: {
		...enLocale,
	},
	[zhtwLocale.name]: {
		...zhtwLocale,
	},
};
export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
	locale: Ref<Language>;
	lang: Ref<string>;
	t: Translator;
};
export const translate = (path: string, option: undefined | TranslatorOption, locale: Language): string =>
	(get(locale, path, path) as string)?.replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);

export const buildTranslator =
	(locale: MaybeRef<Language>): Translator =>
	(path, option) =>
		translate(path, option, unref(locale));

export const buildLocaleContext = (locale: MaybeRef<Language>): LocaleContext => {
	const lang = computed(() => unref(locale).name);
	const localeRef = isRef(locale) ? locale : ref(locale);
	const nextLang = localeLang[lang.value] || localeLang['zh-cn'];
	localeRef.value.next = nextLang.next;
	return {
		lang,
		locale: localeRef,
		t: buildTranslator(locale),
	};
};

export const localeContextKey: InjectionKey<Ref<Language | undefined>> = localeKey;

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
	const locale = localeOverrides || inject(localeContextKey, ref())!;
	return buildLocaleContext(computed(() => locale?.value || zhcnLocale));
};

export const useLanguage = (locale: MaybeRef<Language>, lang: string) => {
	const localeRef = isRef(locale) ? locale : ref(locale);
	const nextLang = localeLang[lang] || localeLang['zh-cn'];
	localeRef.value.name = lang;
	localeRef.value.next = nextLang.next;
};
