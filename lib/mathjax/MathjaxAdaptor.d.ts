import _ from 'lodash';
import { LiteElement } from 'mathjax-full/js/adaptors/lite/Element';
import { MathDocument } from 'mathjax-full/js/core/MathDocument';
import { LayoutRectangle } from 'react-native';
import { MathToSVGConfig } from './Config';
import { Memoize } from './Util';
export interface MathFragmentResponse {
    node: LiteElement;
    svg: string;
    namespace: {
        ns: string;
        localCahceId: string;
        input: string;
        variant: string;
        charCode16: string;
        charCode: number;
        char: string;
    };
    viewBox: LayoutRectangle;
    index: number;
}
declare class ConvertMemoize extends Memoize {
    cache: Array<{
        math: string;
        options: MathToSVGConfig;
        mathElement: LiteElement;
    }>;
    covert(math: string, options: MathToSVGConfig, doc: MathDocument<any, any, any>): LiteElement;
    get(math: string, options: MathToSVGConfig): LiteElement | undefined;
    /**
     *
     * @param options
     * @returns https://docs.mathjax.org/en/latest/web/typeset.html#conversion-options
     */
    static getConvertOptions(options: MathToSVGConfig): {
        display: boolean;
        em: number;
        ex: number;
        containerWidth: number;
    };
}
export declare const converter: ConvertMemoize;
export default class MathjaxAdaptor {
    private html;
    private tex;
    private svg;
    /**
     * the css generated for the svg
     */
    private css;
    private styles;
    private styleQuery;
    options: MathToSVGConfig;
    key: string;
    static converter: ConvertMemoize;
    constructor(options: MathToSVGConfig);
    protected get adaptor(): import("mathjax-full/js/adaptors/liteAdaptor").LiteAdaptor;
    protected get mmlFactory(): import("mathjax-full/js/core/MmlTree/MmlFactory").MmlFactory;
    protected get parseOptions(): import("mathjax-full/js/input/tex/ParseOptions").default;
    convert: ((math: string) => LiteElement) & _.MemoizedFunction;
    splitMath: ((math: string) => string[]) & _.MemoizedFunction;
    parseSVG(svgNode: LiteElement, includeStyle?: boolean): string;
    private applyCSSRules;
    toSVG: ((math: string) => {
        svg: string;
        size: {
            width: number;
            height: number;
        };
    }) & _.MemoizedFunction;
    toSVGArray(math: string): MathFragmentResponse[];
    /**
     * doesn't seem to increase performance dramatically, maybe even the opposite
     * use at own risk
     * @param mathArray
     */
    preload(mathArray: string[]): void;
}
export {};
//# sourceMappingURL=MathjaxAdaptor.d.ts.map