---
title: CrudTable
lang: zh-cn
---

# CrudTable 表格

非常完善的表格组件，灵活配置完成数据的增删改查，用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

:::demo 

crud-table/basic

:::

## 高级表格

:::demo 

crud-table/advanced

:::


## CrudTable 属性

| 属性名    | 说明     | 类型     | 可选值      | 默认值                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| data | 显示的数据 | array | - | - |
| loading | 数据加载状态 | boolean | - | false |
| options | 表格配置 | `object` | [options](./crud-table#options-配置) | - |
| page | 表格分页参数 | `object` | object |  `{ pageIndex: 1, pageSize: 10, total: 0, }` |
| headerRowStyle | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style | function({ row, rowIndex }) / object | - |  - |
| style  | 组件style样式 | object | - | - |
| className  | 组件className样式 | string | - | - |
| rowStyle  | 行的style的回调方法，参考`element-plus` | function | - | - |
| rowClassName  | 行的className的回调方法，参考`element-plus` | function | - | - |
| cellStyle  | 单元格的style的回调方法，参考`element-plus` | function | - | - |
| cellClassName  | 单元格的className的回调方法，参考`element-plus` | function | - | - |
| headerRowStyle  | 表头style的回调方法，参考`element-plus` | function | - | - |
| headerRowClassName  | 表头className的回调方法，参考`element-plus` | function | - | - |
| headerCellStyle  | 表头单元格style的回调方法，参考`element-plus` | function | - | - |
| headerCellClassName  | 表头单元格className的回调方法，参考`element-plus` | function | - | - |
| spanMethod  | 合并行或列的计算方法，参考`element-plus` | function | - | - |


## CrudTable 事件

| 事件名    | 说明     | 回调参数 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| confirm-search | 数据查询方法，该方法中获取参数，调用接口查询数据 | searchParams |
| clear-search | 数据查询方法，与`confirm-search`类似，该方清空参数，恢复默认参数，自动调用接口查询数据 | - |
| change-pagination | 分页数据改变时，默认调用`confirm-search`方法查询数据 | page |
| selection-change | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection |
| row-click | 当某一行被点击时会触发该事件时触发的事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, event |
| cell-contextmenu | 当某个单元格被鼠标右键点击时会触发该事件 | row, column, event |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows | expanded) |

## options 配置


| 属性名    | 说明     | 类型     | 可选值      | 默认值    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------|
| columns | 表单列数据 | array | [columns](./crud-table#columns-配置) | - |
| initLoadData | 初始是否默认加载数据 | boolen | - | true |
| defaultContentHeight | 默认表格内容高度 | number | - | 300 |
| fullscreenchangeContentHeight | 是否开启监听全屏改变是动态设置table内容高度，默认关闭 | boolen | - | false |
| rowKey | 行数据的 Key，用来优化 Table 的渲染 | string | - | `id` |
| size | 尺寸大小 | string | `large` `default` `small` | `default` |
| fit | 列的宽度是否自撑开 | boolen | - | true |
| stripe | 是否为斑马纹 table | boolen | - | true |
| border | 是否带有纵向边框 | boolen | - | true |
| index | 是否显示序号 | boolen | - | true |
| selection | 是否显示选项框 | boolen | - | true |
| headerAlign | 表头对齐方式， 若不设置该项，则使用表格的对齐方式 | string | left / center / right | center |
| cellAlign | 单元项对齐方式 | string | left / center / right | center|
| columnMinWidth | 表格列默认宽度 | string | string | `100px`|
| addBtn | 是否显示新增按钮 | boolen | - | true |
| viewBtn | 是否显示查看按钮 | boolen | - | true |
| editBtn | 是否显示编辑按钮 | boolen | - | true |
| delBtn | 是否显示删除按钮 | boolen | - | true |
| batchDelBtn | 是否显示批量删除按钮 | boolen | - | true |
| refreshBtn | 是否显示table刷新按钮 | boolen | - | true |
| settingBtn | 是否显示table设置按钮 | boolen | - | true |
| operations | 是否显示table操作栏 | boolen | - | true |
| operationsWidth | table操作栏默认宽度 | number | - | 260 |
| operationsBtnPlain | table操作栏按钮设置plain | boolen | - | false |
| operationsBtnText | table操作栏按钮设置text | boolen | - | true |
| operationsBtnSize | table操作栏按钮大小 | string | large / default / small | small |
| addBtnText | 自定义新增按钮名称 | string | - | 新增 |
| showSearchForm | 是否显示table搜索栏 | boolen | - | true |
| showHeaderMenu | 是否显示table菜单栏 | boolen | - | true |
| showSearchLabel | 是否显示table搜索栏label | boolen | - | true |
| searchSpan | 表格搜索栏列span设置 | number | - | 4 |
| searchGutter | 表格搜索栏列间隔设置 | number | - | 4 |
| searchLabelWidth | 表格搜索栏列label宽度 | number | - | 5em |
| searchColumnMinWidth | 表格搜索栏列最小宽度 | number | - | 300 |
| searchColumns | 表格搜索栏列配置 | array | [SearchColumnProps](./crud-table#SearchColumnProps-配置) | - |
| isPagination | 是否显示分页 | boolen | - | true |
| dialogTitle | 新增/编辑/详情 弹框title | string | - | - |
| dialogWidth | 新增/编辑/详情 弹框宽度 | string | - | 60% |
| dialogFullscreen | 新增/编辑/详情 弹框是否全屏 | boolen | - | false |
| closeOnClickModal | 新增/编辑/详情 是否可以通过点击 modal 关闭窗口 | boolen | - | false |
| formLabelWidth | 新增/编辑/详情 表单label宽度 | string | - | 5em |
| formColumnMinWidth | 新增/编辑/详情 表单列默认最小宽度 | number | - | 350 |
| formSpan | 新增/编辑/详情 表单列比例span | number | - | 12 |
| formColumns | 新增/编辑/详情 表单列比例span | array | [FormColunmProps](./crud-table#FormColunmProps-配置) | - |



## columns 配置
| 属性名    | 说明     | 类型     | 可选值      | 默认值    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------|
| prop | 字段名称 对应列内容的字段名 | string | - | - |
| label | 显示的标题 | string | - | - |
| width | 表格列宽度 | string，number | - | - |
| minWidth | 表格列最小宽度 | string，number | - | - |
| fixed | 表格列固定 | string | `left` `right` | - |
| formatter | 用来格式化内容 | function | function(row, column, cellValue, index) | - |
| showOverflowTooltip | 单元格文本溢出显示提示框 | boolen | - | true |
| headerAlign | 表头列对齐方式 | string |  `center`  `left` `right` | `center` |
| align | 单元格对齐方式 | string |  `center`  `left` `right` | `center` |
| sortable | 是否开启排序 | boolen | - | false |
| children | 子集 | array | `columns` | - |
| type | 搜索栏或表单类型列显示 | string | `input` `inputInteger` `inputNumber` `textarea` `select` `radio` `checkbox` `date` `time` `datetime` `datetimerange` `numberRange` `inputTableSelect` `uploadImage` | input |
| placeholder | 显示的placeholder | string | - | - |
| dicData | 当type是类型选择时设置的选项字典 | array | [{value: '', label: ''}] | - |
| loadDicData | 动态加载选项字段方法 | function | 回调参数 （`col` `done`）， `done`回调函数传入dicData数据 | - |
| disabled | 是否禁用 | boolen | - | false |
| readonly | 是否只读 | boolen | - | false |
| defaultValue | 表单默认值 | any | - | - |
| labelWidth | 表格列宽度 | string, numner | - | - |
| multiple | 是否可以多选 | boolen | - | - |
| prefix | 表单前缀 | function | 返回对应前缀显示内容 | - |
| suffix | 表单后缀 | function | 返回对应后缀显示内容 | - |
| prepend | 表单前置 | function | 返回对应前置显示内容 | - |
| append | 表单后置 | function | 返回对应后置显示内容 | - |
| sort | 表单列表排序 | number | - | - |
| required | 表单列表必填 | boolen | - | - |
| hide | 表格是否显示列 | boolen | - | - |
| span | 表单列span | number | - | 12 |
| tableSelect | 表单列table弹框选择 | any | - | - |
| onChange | 表单列change事件 | function | - | - |


## SearchColumnProps 配置
| 属性名    | 说明     | 类型     | 可选值      | 默认值    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------|
| searchType | 搜索栏类型列显示 | string | - | - |
| searchSort | - | number | - | - |
| searchLabel | - | string | - | - |
| searchPlaceholder | - | string | - | - |
| searchLabelWidth | - | string number | - | - |
| searchDefaultValue | - | any | - | - |
| searchDisabled | - | boolean | - | - |
| searchReadonly | - | boolean | - | - |
| searchHide | - | boolean | - | - |
| searchMultiple | - | boolean | - | - |
| searchFormat | - | string | - | - |
| searchDisabledDate | - | string | - | - |
| searchEditable | - | boolen | - | - |
| searchShortcuts | - | any | - | - |
| searchMin | - | number | - | - |
| searchMax | - | number | - | - |
| searchPrefix | - | function | - | - |
| searchSuffix | - | function | - | - |
| searchPrepend | - | function | - | - |
| searchAppend | - | function | - | - |
| searchDicData | - | array | - | - |
| searchLoadDicData | - | function | - | - |
| onChangeSearch | - | function | - | - |


## FormColunmProps 配置
| 属性名    | 说明     | 类型     | 可选值      | 默认值    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------|
| formType | 表单类型列显示 | string | - | - |
| formSort | - | number | - | - |
| formLabel | - | string | - | - |
| formPlaceholder | - | string | - | - |
| formLabelWidth | - | string number | - | - |
| formDefaultValue | - | any | - | - |
| formRequired | - | boolean | - | - |
| formDisabled | - | boolean | - | - |
| formReadonly | - | boolean | - | - |
| formHide | - | boolean | - | - |
| formMultiple | - | boolean | - | - |
| formFormat | - | string | - | - |
| formRemark | - | string | - | - |
| formDivider | - | boolen | - | - |
| formPrefix | - | function | - | - |
| formSuffix | - | function | - | - |
| formPrepend | - | function | - | - |
| formAppend | - | function | - | - |
| formRules | - | array | - | - |
| formDicData | - | array | - | - |
| searchLoadDicData | - | function | - | - |
| onChangeForm | - | function | - | - |

****
