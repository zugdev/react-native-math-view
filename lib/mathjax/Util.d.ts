import * as _ from "lodash";
import { LiteElement } from "mathjax-full/js/adaptors/lite/Element";
import * as matrixUtil from 'transformation-matrix';
export declare const compose: typeof matrixUtil.transform;
/**
 * fix mathjax output
 * @param svg
 */
export declare function parseSVG(svg: string): string;
/**
 * extract mainly the char of the path being used
 * based on mathjax id constructor: mathjax-full/ts/output/svg/FontCache.ts #cachePath
 * @param node
 */
export declare function extractDataFromMathjaxId(node: LiteElement): _.Dictionary<string>;
/**
 * extracts transform attribute and return as {Matrix}
 * @param node
 * @param attributeKey the key of the transform attribute to extract
 */
export declare function transformationToMatrix(node: LiteElement, attributeKey?: string): matrixUtil.Matrix;
/**
 * accumulate all transformations for this node and up the tree
 * makes it possible to draw the node in a shallow svg tree while preserving it's exact layout
 * @param node
 */
export declare function accTransformations(node: LiteElement): matrixUtil.Matrix;
export declare class Memoize {
    cache: any[];
    clearCache(): void;
}
//# sourceMappingURL=Util.d.ts.map