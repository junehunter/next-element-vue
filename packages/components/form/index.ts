import { withInstall } from '../../utils/install';
import Element from './src/index';
import './src/index.scss';
import treeSelect from './src/widgets/tree-select';
import treeCascader from './src/widgets/tree-cascader';

export const NextTreeSelect = withInstall(treeSelect);
export const NextTreeCascader = withInstall(treeCascader);
export const NextForm = withInstall(Element);
export default NextForm;
