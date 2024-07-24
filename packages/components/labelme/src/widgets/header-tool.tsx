import { defineComponent, inject } from 'vue'
import { ElIcon, ElTooltip, ElPopover } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { useLocale } from 'packages/hooks';

export default defineComponent({
    props: {
        isFullscreen: {
            type: Boolean,
            default: false,
        },
        imageIndex: {
            type: Number,
            default: 0,
        },
        imageLength: {
            type: Number,
            default: 0,
        },
    },
    emits: ['fullscreen', 'save'],
    setup(props, { emit }) {
        const _ns = inject('ns', {} as any);
        const { t } = useLocale();
        const switchFillscreen = (val: boolean) => {
            emit('fullscreen', val);
        };
        const renderContent = () => {
            return <>
                <ul class={[_ns.be('header', 'tool')]}>
                    <li class="hover" onClick={() => emit('save')}>
                        <svg t="1719034799379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4272" width="18" height="18">
                            <path
                                d="M831.4 252.2L711.5 132.4c-10.3-10.3-24.2-16.1-38.8-16.1h-450c-23.3 0-42.2 18.9-42.2 42.2v709.4c0 23.3 18.9 42.2 42.2 42.2h582.6c23.3 0 42.2-18.9 42.2-42.2V291c-0.1-14.5-5.8-28.5-16.1-38.8zM619.6 159v159.8c0 4-3.3 7.3-7.3 7.3H387.2c-4 0-7.3-3.3-7.3-7.3V159h239.7z m67.7 708.4H340.8v-292c0-3.9 3.2-7.1 7.1-7.1h332.4c3.9 0 7.1 3.2 7.1 7.1v292z m117.4 0H730v-292c0-27.5-22.3-49.8-49.8-49.8H347.8c-27.5 0-49.8 22.3-49.8 49.8v292h-74.7V159.1h113.9v159.8c0 27.6 22.4 50.1 50.1 50.1h225.1c27.6 0 50.1-22.4 50.1-50.1V159h10.4c3.2 0 6.3 1.3 8.6 3.6l119.9 119.9c2.3 2.3 3.6 5.3 3.6 8.6l-0.3 576.3z"
                                p-id="4273"
                            ></path>
                            <path d="M536 196.3h42.7v87.2H536zM368.7 641.2h220.7v42.7H368.7zM368.7 744h170.9v42.7H368.7z" p-id="4274"></path>
                        </svg>
                        <span style="padding-left: 3px">{t('next.labelimg.saveLabel')}</span>
                    </li>
                </ul>
                <ul class={[_ns.be('header', 'tool')]}>
                    {props.imageLength ? (
                        <li>
                            <span>第 {props.imageIndex + 1} 张</span>
                            <em style="padding: 0 5px;">/</em>
                            <span>共 {props.imageLength} 张</span>
                        </li>
                    ) : null}
                    <li style="margin-right: 30px;" class="hover">
                        <ElPopover trigger="hover" placement="bottom" width="none">
                            {{
                                reference: () => (
                                    <div class="flex-center">
                                        <span style="padding-right: 3px">{t('next.labelimg.instructions')}</span>
                                        <ElIcon size={14}>
                                            <Warning />
                                        </ElIcon>
                                    </div>
                                ),
                                default: () => (
                                    <ul style="font-size: 12px;white-space: nowrap;">
                                        <li>
                                            <span>W：</span>
                                            <span>鼠标移入图片中，长按W键，鼠标按下左键，移动鼠标开始绘制，鼠标抬起结束绘制</span>
                                        </li>
                                        <li>
                                            <span>A：</span>
                                            <span>A键进入上一张图片进行标注</span>
                                        </li>
                                        <li>
                                            <span>D：</span>
                                            <span>D键进入下一张图片进行标注</span>
                                        </li>
                                    </ul>
                                ),
                            }}
                        </ElPopover>
                    </li>
                    {props.isFullscreen ? (
                        <li class="hover" onClick={() => switchFillscreen(false)}>
                            <ElTooltip placement="top" content="取消全屏">
                                <svg t="1719035442027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5388" width="18" height="18">
                                    <path
                                        d="M354.133333 682.666667H256v-42.666667h170.666667v170.666667H384v-98.133334L243.2 853.333333l-29.866667-29.866666L354.133333 682.666667z m358.4 0l140.8 140.8-29.866666 29.866666-140.8-140.8V810.666667h-42.666667v-170.666667h170.666667v42.666667h-98.133334zM354.133333 384L213.333333 243.2l29.866667-29.866667L384 354.133333V256h42.666667v170.666667H256V384h98.133333z m358.4 0H810.666667v42.666667h-170.666667V256h42.666667v98.133333L823.466667 213.333333l29.866666 29.866667L712.533333 384z"
                                        p-id="5389"
                                    ></path>
                                </svg>
                            </ElTooltip>
                        </li>
                    ) : (
                        <li class="hover" onClick={() => switchFillscreen(true)}>
                            <ElTooltip placement="top" content="全屏">
                                <svg t="1719035375323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5241" width="18" height="18">
                                    <path
                                        d="M285.866667 810.666667H384v42.666666H213.333333v-170.666666h42.666667v98.133333l128-128 29.866667 29.866667-128 128z m494.933333 0l-128-128 29.866667-29.866667 128 128V682.666667h42.666666v170.666666h-170.666666v-42.666666h98.133333zM285.866667 256l128 128-29.866667 29.866667-128-128V384H213.333333V213.333333h170.666667v42.666667H285.866667z m494.933333 0H682.666667V213.333333h170.666666v170.666667h-42.666666V285.866667l-128 128-29.866667-29.866667 128-128z"
                                        p-id="5242"
                                    ></path>
                                </svg>
                            </ElTooltip>
                        </li>
                    )}
                </ul>
            </>
        }
        return () => <>{renderContent()}</>
    }
})