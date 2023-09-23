import { PropType, CSSProperties } from 'vue';
declare const _default: {
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
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
    rowStyle: {
        type: FunctionConstructor;
        default: any;
    };
    rowClassName: {
        type: FunctionConstructor;
        default: any;
    };
    headerRowStyle: {
        type: FunctionConstructor;
        default: any;
    };
    spanMethod: {
        type: FunctionConstructor;
        default: any;
    };
};
export default _default;
