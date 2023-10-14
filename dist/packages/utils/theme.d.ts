/**
 * 颜色转换函数
 * @method hexToRgb hex 颜色转 rgb 颜色
 * @method rgbToHex rgb 颜色转 Hex 颜色
 * @method getDarkColor 加深颜色值
 * @method getLightColor 变浅颜色值
 */
export declare function useChangeColor(): {
    hexToRgb: (str: string) => any;
    rgbToHex: (r: any, g: any, b: any) => string;
    getDarkColor: (color: string, level: number) => string;
    getLightColor: (color: string, level: number) => string;
};
export declare function randomColor16(): string;
