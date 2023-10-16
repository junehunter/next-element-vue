/**
 * 识别视频帧
 * @param video
 * @param model
 * @param ctx
 * @param tf
 * @param classNames
 */
export declare const detectVideoFrame: (video: HTMLVideoElement, model: any, ctx: CanvasRenderingContext2D, tf: any, classNames: any[]) => Promise<void>;
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
