import type { PropType, CSSProperties } from 'vue';
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
    cellStyle: {
        type: FunctionConstructor;
        default: any;
    };
    cellClassName: {
        type: FunctionConstructor;
        default: any;
    };
    headerRowStyle: {
        type: FunctionConstructor;
        default: any;
    };
    headerRowClassName: {
        type: FunctionConstructor;
        default: any;
    };
    headerCellStyle: {
        type: FunctionConstructor;
        default: any;
    };
    headerCellClassName: {
        type: FunctionConstructor;
        default: any;
    };
    spanMethod: {
        type: FunctionConstructor;
        default: any;
    };
};
export default _default;
