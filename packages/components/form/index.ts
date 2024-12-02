import { withInstall } from '../../utils/install';
import Element from './src/index';
import './src/index.scss';
import treeSelect from './src/widgets/tree-select';
import treeCascader from './src/widgets/tree-cascader';
import inputTableSelect from './src/widgets/input-table-select';

export const NextTreeSelect = withInstall(treeSelect);
export const NextTreeCascader = withInstall(treeCascader);
export const NextInputTableSelect = withInstall(inputTableSelect);
export const NextForm = withInstall(Element);
export default NextForm;
