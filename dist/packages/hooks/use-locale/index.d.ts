import type { InjectionKey, Ref } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import type { Language } from 'packages/locale';
export declare const localeLang: {
    [x: string]: {
        name: string;
        next: {
            loading: string;
            table: {
                search: string;
                clear: string;
                add: string;
                delete: string;
                batchDelete: string;
                export: string;
                edit: string;
                view: string;
                unfoldSearch: string;
                foldSearch: string;
                notData: string;
                operation: string;
                selection: string;
                selectionAll: string;
                setting: {
                    title: string;
                    label: string;
                    hide: string;
                    filter: string;
                    sort: string;
                };
                message: {
                    tip: string;
                    batchDeleteTip: string;
                    cancelBatchDelete: string;
                    deleteTip: string;
                    cancelDelete: string;
                    confirmButtonText: string;
                    cancelButtonText: string;
                };
            };
            form: {
                input: string;
                select: string;
                requiredInput: string;
                requiredSelect: string;
                submit: string;
                cancel: string;
                reset: string;
                confirm: string;
                tableSelect: string;
                selectFile: string;
            };
            date: {
                oneWeekAge: string;
                oneMonthAge: string;
                threeMonthsAge: string;
                oneYearAge: string;
                threeYearsAge: string;
                rangeSeparator: string;
                startPlaceholder: string;
                endPlaceholder: string;
            };
            layout: {
                home: string;
                personal: string;
                logOut: string;
                tabsOther: string;
                tabsLeft: string;
                tabsRight: string;
                tabsAll: string;
                systemSetting: string;
            };
        };
    };
};
export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
    locale: Ref<Language>;
    lang: Ref<string>;
    t: Translator;
};
export declare const translate: (path: string, option: undefined | TranslatorOption, locale: Language) => string;
export declare const buildTranslator: (locale: MaybeRef<Language>) => Translator;
export declare const buildLocaleContext: (locale: MaybeRef<Language>) => LocaleContext;
export declare const localeContextKey: InjectionKey<Ref<Language | undefined>>;
export declare const useLocale: (localeOverrides?: Ref<Language | undefined>) => LocaleContext;
export declare const onChangeLanguage: (locale: MaybeRef<Language>, lang: string) => void;
