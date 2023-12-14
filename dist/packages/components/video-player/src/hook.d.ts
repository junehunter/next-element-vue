/**
 * 识别视频帧
 * @param video
 * @param model
 * @param ctx
 * @param tf
 * @param classNames
 */
interface ClassInputInterface {
    cls: number;
    score: number;
}
interface ClassInterfacce {
    value: number;
    label: string;
}
export declare const detectVideoFrame: (video: HTMLVideoElement, model: any, ctx: CanvasRenderingContext2D, tf: any, classNames: ClassInterfacce[], classInput: ClassInputInterface[], detect_ctx: CanvasRenderingContext2D, success?: Function) => Promise<void>;
/**
 * 普通视频截图
 * @param player
 */
export declare const screenshotVideo: (player: any) => void;
/**
 * AI识别标识视频截图
 * @param player
 * @param detectFrameCanvas
 */
export declare const screenshotVideoDetectFrame: (player: any, detectFrameCanvas?: HTMLCanvasElement) => void;
export declare const drawVideoFrame: (videoElement: HTMLVideoElement, ctx: CanvasRenderingContext2D) => CanvasRenderingContext2D;
interface DetectVideoOptions {
    container?: HTMLElement;
    video: HTMLVideoElement;
    modelUrl: string;
    classNames: ClassInterfacce[];
    classInput: ClassInputInterface[];
}
export declare const useDetectVideo: () => {
    detectVideoFrameImage: ({ container, video, modelUrl, classNames, classInput }: DetectVideoOptions, success: Function, error: Function) => boolean;
};
export {};
