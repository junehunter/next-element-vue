import './src/index.scss';
export declare const NextCrudTableVirtualized: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    page: {
        type: ObjectConstructor;
        default: () => {
            pageIndex: number;
            pageSize: number;
            total: number;
        };
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any[], any, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    page: {
        type: ObjectConstructor;
        default: () => {
            pageIndex: number;
            pageSize: number;
            total: number;
        };
    };
}>> & {
    [x: `on${Capitalize<any>}`]: (...args: any[]) => any;
}, {
    data: unknown[];
    style: import("vue").CSSProperties;
    className: string;
    options: Record<string, any>;
    loading: boolean;
    page: Record<string, any>;
}, {}>> & Record<string, any>;
export default NextCrudTableVirtualized;