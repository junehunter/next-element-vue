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
		const _dicKey = valueExist(columnOption.dicKey, 'value');
		const _formatterColumnValue = (value: any, dicData: DictData[]) => {
			const item = dicData.find(o => o[_dicKey] == value);
			if (item) {
				return item.label;
			} else {
				return value;
			}
		};
		const renderCustomItem = (row, $index) => {
			if (columnOption.children?.length > 0) {
				return (
					<>
						{columnOption.children.map(column => {
							return <TableColumnDynamic columnOption={column}>{column_slots}</TableColumnDynamic>;
						})}
					</>
				);
			} else if (slots[columnSlotName(columnOption.prop)]) {
				// 如果有传入slot，根据 #column-XXX 自定义显示内容
				return slots[columnSlotName(columnOption.prop)]({ row: row, index: $index });
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
				return <span>{_formatterColumnValue(row[columnOption.prop], mergeDicData)}</span>;
			} else if (columnOption.cellUnit) {
				return (
					<>
						<span>{row[columnOption.prop]}</span>
						<em class="cell-unit">{columnOption.cellUnit}</em>
					</>
				);
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
