import { defineComponent, inject, isRef, unref } from 'vue';
import { ElTableColumn } from 'element-plus';
// import { NextTextEllipsis } from 'packages/components';
// import { useLocale } from 'packages/hooks';
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
		const _formatterColumnValue = (value: any, dicData: DictData[]) => {
			const item = dicData.find(o => o.value == value);
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
				return <span>{_formatterColumnValue(row[columnOption.prop], columnOption.dicData)}</span>;
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
						showOverflowTooltip
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
