import { MathFragmentResponse } from '../../mathjax/MathjaxAdaptor';
import { Insets, LayoutRectangle } from 'react-native';
import Rect from './Rect';
export declare const defaultHitSlop: {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare class MathFragmentRect extends Rect {
    hitRect: Rect;
    hitSlop: Insets;
    setRect(layout: LayoutRectangle, viewBox: LayoutRectangle): this;
    setHitSlop(hitSlop?: number | Insets): this;
    clone(): MathFragmentRect;
    test(x: number, y: number): {
        x: number;
        y: number;
        hit: boolean;
    };
}
export default class HitRectUtil {
    private layout;
    private data;
    rects: MathFragmentRect[];
    hitSlop: number | Insets;
    setHitSlop(hitSlop?: number | Insets): this;
    set(layout: LayoutRectangle, data: MathFragmentResponse[]): this;
    test(x: number, y: number): ({
        hitResult: {
            x: number;
            y: number;
            hit: boolean;
        };
    } & MathFragmentResponse & {
        index: number;
    })[];
}
//# sourceMappingURL=HitRectUtil.d.ts.map