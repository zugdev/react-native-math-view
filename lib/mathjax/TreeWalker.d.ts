import { LiteElement, LiteNode } from 'mathjax-full/js/adaptors/lite/Element';
export type TreeWalkerCallback<N, T> = (node: N, level: number, accum: T[], quit: () => void) => T;
export type Child<T = {}> = {
    parent?: Child<T>;
} & T;
export type Parent<T = {}> = {
    children?: Parent<T>[];
} & T;
/**
 * walk up the tree starting at {node}
 * @param node the node to start climbing from
 * @param callback
 * @returns accumulated array of {callback} responses
 */
export declare function walkUp<N extends Child | LiteElement = LiteElement, T = LiteElement>(node: N, callback: TreeWalkerCallback<N, T>): T[];
/**
 * walk down the tree starting at {node}
 * @param node the node to start descending from
 * @param callback
 * @returns accumulated array of {callback} responses
 */
export declare function walkDown<N extends Parent | LiteElement = LiteElement, T = LiteElement>(node: N, callback: TreeWalkerCallback<N, T>): T[];
export declare function reject(node: LiteNode): boolean;
//# sourceMappingURL=TreeWalker.d.ts.map