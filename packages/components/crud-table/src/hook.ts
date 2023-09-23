/**
 * 自定义table中column的slot name
 * @param prop
 * @returns
 */
export const columnSlotNamePrefix = 'column-';
export const columnSlotName = (prop: string): string => {
	return columnSlotNamePrefix + prop;
};
/**
 * 自定义搜索栏中form的slot name
 * @param prop
 * @returns
 */
export const searchFormSlotNamePrefix = 'search-';
export const searchFormSlotName = (prop: string): string => {
	return searchFormSlotNamePrefix + prop;
};
/**
 * 自定义新增编辑表单中form的slot name
 * @param prop
 * @returns
 */
export const formSlotNamePrefix = 'form-';
export const formSlotName = (prop: string): string => {
	return formSlotNamePrefix + prop;
};
export const vaildData = (val: boolean, dafult: any) => {
	if (typeof val === 'boolean') {
		return val;
	}
	return dafult;
};

export const getColumnProp = () => {};

/**
 * 将已'-'分割的字符串转换为驼峰
 * @param str
 * @returns
 */
export const toHump = (str: string): string => {
	const arr = str.split('-');
	let res = '';
	arr.forEach(v => {
		res += v.charAt(0).toUpperCase() + v.slice(1);
	});
	return res;
};
/**
 * 获取菜单树默认展开节点keys
 * @param treeData
 * @returns
 */
export const getDefaultExpandedKeys = (treeData: any): string[] => {
	const loopTreeLevle = (tree: any) => {
		let maxDepth = 0;
		function traverse(node: any, depth: number) {
			if (depth > maxDepth) {
				maxDepth = depth;
			}

			if (node.children && node.children.length > 0) {
				for (let child of node.children) {
					traverse(child, depth + 1);
				}
			}
		}

		for (let node of tree) {
			traverse(node, 1);
		}

		return maxDepth;
	};
	const level = loopTreeLevle(treeData);
	const getTreeDataLevel = (tree: any, levels: number) => {
		const result = [] as any;
		function traverse(node: any, depth: any) {
			if (depth <= levels) {
				result.push(node.id);

				if (node.children && node.children.length > 0) {
					for (let child of node.children) {
						traverse(child, depth + 1);
					}
				}
			}
		}
		for (let node of tree) {
			traverse(node, 1);
		}
		return result;
	};
	const checkNode = getTreeDataLevel(treeData, level > 3 ? 3 : level);
	return checkNode;
};
