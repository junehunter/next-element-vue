declare const _default: import("vue").DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("confirm-search" | "clear-search" | "change-pagination" | "selection-change" | "row-click" | "row-contextmenu" | "row-dblclick" | "cell-click" | "cell-dblclick" | "cell-contextmenu" | "cell-mouse-enter" | "cell-mouse-leave" | "expand-change" | "click-add-edit" | "close-add-edit" | "view-add-edit" | "delete-rows" | "delete-row" | "submit-form")[], "confirm-search" | "clear-search" | "change-pagination" | "selection-change" | "row-click" | "row-contextmenu" | "row-dblclick" | "cell-click" | "cell-dblclick" | "cell-contextmenu" | "cell-mouse-enter" | "cell-mouse-leave" | "expand-change" | "click-add-edit" | "close-add-edit" | "view-add-edit" | "delete-rows" | "delete-row" | "submit-form", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & {
    "onConfirm-search"?: (...args: any[]) => any;
    "onClear-search"?: (...args: any[]) => any;
    "onChange-pagination"?: (...args: any[]) => any;
    "onSelection-change"?: (...args: any[]) => any;
    "onRow-click"?: (...args: any[]) => any;
    "onRow-contextmenu"?: (...args: any[]) => any;
    "onRow-dblclick"?: (...args: any[]) => any;
    "onCell-click"?: (...args: any[]) => any;
    "onCell-dblclick"?: (...args: any[]) => any;
    "onCell-contextmenu"?: (...args: any[]) => any;
    "onCell-mouse-enter"?: (...args: any[]) => any;
    "onCell-mouse-leave"?: (...args: any[]) => any;
    "onExpand-change"?: (...args: any[]) => any;
    "onClick-add-edit"?: (...args: any[]) => any;
    "onClose-add-edit"?: (...args: any[]) => any;
    "onView-add-edit"?: (...args: any[]) => any;
    "onDelete-rows"?: (...args: any[]) => any;
    "onDelete-row"?: (...args: any[]) => any;
    "onSubmit-form"?: (...args: any[]) => any;
}, {
    data: unknown[];
    className: string;
    style: import("vue").CSSProperties;
    options: Record<string, any>;
    loading: boolean;
    page: Record<string, any>;
    rowStyle: Function;
    rowClassName: Function;
    cellStyle: Function;
    cellClassName: Function;
    headerRowStyle: Function;
    headerRowClassName: Function;
    headerCellStyle: Function;
    headerCellClassName: Function;
    spanMethod: Function;
}, {}>;
export default _default;
