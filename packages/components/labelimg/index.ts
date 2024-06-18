import { withInstall } from '../../utils/install';
import Element from './src/index';
import './src/index.scss';
import preview from './src/preview';

export const NextLabelimg = withInstall(Element);
export const NextLabelimgPreview = withInstall(preview);
export default NextLabelimg;
