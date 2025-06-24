import { Insets, LayoutRectangle } from 'react-native';
export default class Rect implements LayoutRectangle, Insets {
    left: number;
    top: number;
    right: number;
    bottom: number;
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get centerX(): number;
    get centerY(): number;
    protected set(left: number, top: number, right: number, bottom: number): this;
    protected fromInsetsRect(rect: Insets): this;
    protected fromLayout(x: number, y: number, width: number, height: number): this;
    protected fromLayoutRect(rect: LayoutRectangle): this;
    protected fromRect(rect: LayoutRectangle | Insets): this;
    inset(left: number, top: number, right: number, bottom: number): this;
    insetRect(rect: Insets): this;
    clone(): Rect;
    test(x: number, y: number): boolean;
}
//# sourceMappingURL=Rect.d.ts.map