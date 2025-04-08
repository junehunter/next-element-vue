import { defineComponent, inject, isRef, unref } from 'vue';
import { ElTableColumn } from 'element-plus';
// import { NextTextEllipsis } from 'packages/components';
// import { useLocale } from 'packages/hooks';
import { valueExist } from 'packages/hooks/global-hook';
import type { DictData } from '../config';
import { columnSlotName } from '../hook';

const TableColumnDynamic = defineComponent({
	name: 'TableColumnDynamic',
	props: {
		columnOption: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	setup(props, { slots }) {
		// const { t } = useLocale();
		const columnSlots = inject('columnSlots') as any;
		const column_slots = {};
		columnSlots.value.forEach(slotName => {
			column_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const columnOption = props.columnOption;
		// 自定义字典数据字段
		const _dicKey = valueExist(columnOption.dicKey, 'value');
		const _dicLabel = valueExist(columnOption.dicLabel, columnOption.treeSelectProps?.label, 'label');
		// 树级选择器 分隔符
		const _separator = valueExist(columnOption.treeSelectProps?.separator, ',');
		const _formatterColumnValue = (value: any, dicData: DictData[]) => {
			// 树级选择器 格式化显示
			if (Array.isArray(value)) {
				const temp = [];
				value.forEach(val => {
					temp.push(_formatterColumnValue(val, dicData));
				});
				return temp.join(_separator);
			}
			const item = dicData.find(o => o[_dicKey] == value);
			if (item) {
				return item[_dicLabel];
			} else {
				return value;
			}
		};
		const renderCustomItem = (row, $index) => {
			const prop = columnOption.prop;
			// 处理slot名称, 多层属性时 替换 . 为 -
			const _prop = prop?.replace(/\./g, '-');
			if (columnOption.children?.length > 0) {
				return (
					<>
						{columnOption.children.map(column => {
							return <TableColumnDynamic columnOption={column}>{column_slots}</TableColumnDynamic>;
						})}
					</>
				);
			} else if (slots[columnSlotName(_prop)]) {
				// 如果有传入slot，根据 #column-XXX-XXX 自定义显示内容
				return slots[columnSlotName(_prop)]({ row: row, index: $index, column: columnOption });
			} else if (columnOption.dicData?.length > 0) {
				const loopDicData = (list: any[]) => {
					const temp = [];
					list.forEach((node: any) => {
						const item = { ...node };
						if (item.children) {
							const child = loopDicData(item.children);
							temp.push(...child);
							delete item.children;
						}
						temp.push(item);
					});
					return temp;
				};
				const mergeDicData = loopDicData(columnOption.dicData);
				return <span>{_formatterColumnValue(row[prop], mergeDicData)}</span>;
			} else if (columnOption.cellUnit) {
				return (
					<>
						<span>{row[prop]}</span>
						<em class="cell-unit">{columnOption.cellUnit}</em>
					</>
				);
			} else if (columnOption.renderColumnCell) {
				// 通过配置项自定义单元项内容，主要用于处理嵌套表单crud-table组件时自定义内容
				return columnOption.renderColumnCell({ row: row, index: $index, column: columnOption });
			}
			return null;
		};
		const renderContent = () => {
			return (
				!columnOption.hide && (
					<ElTableColumn
						prop={columnOption.prop}
						label={columnOption.label}
						headerAlign={columnOption.headerAlign || options.headerAlign}
						align={columnOption.align || options.cellAlign}
						minWidth={columnOption.minWidth || options.columnMinWidth || 'auto'}
						width={columnOption.width || 'auto'}
						fixed={columnOption.fixed}
						sortable={columnOption.sortable || false}
						formatter={columnOption.formatter || null}
						showOverflowTooltip={valueExist(columnOption.showOverflowTooltip, true)}
					>
						{{
							// header: () => <NextTextEllipsis content={t(columnOption.label)}></NextTextEllipsis>,
							default: ({ row, $index }) => renderCustomItem(row, $index),
						}}
					</ElTableColumn>
				)
			);
		};
		return () => <>{renderContent()}</>;
	},
});

export default TableColumnDynamic;
