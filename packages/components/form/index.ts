import { withInstall } from '../../utils/install';
import Element from './src/index';
import './src/index.scss';
import treeSelect from './src/widgets/tree-select';

export const NextTreeSelect = withInstall(treeSelect);
export const NextForm = withInstall(Element);
export default NextForm;
