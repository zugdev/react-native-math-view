import React from 'react';
import { StyleProp, TextProps, ViewStyle } from 'react-native';
import { MathViewProps } from './common';
import MathView from './MathView';
type ElementOrRenderer<T = {}> = ((props: T) => JSX.Element) | JSX.Element;
export type Direction = 'ltr' | 'rtl' | 'auto';
export type MathTextRowRenderingProps = {
    value: string;
    isMath: boolean;
    index: number;
};
export type MathTextItemRenderingProps = MathTextRowRenderingProps & {
    rowIndex: number;
    inline: boolean;
};
export type MathTextItemProps<T extends boolean = boolean> = (T extends true ? Omit<MathViewProps, 'math'> : TextProps) & {
    value: string;
    isMath: T;
    isHtml?: boolean;
    Component?: MathView;
    CellRendererComponent?: ElementOrRenderer;
    inline?: boolean;
};
export type MathTextRowProps = MathTextItemProps & {
    direction?: Direction;
    containerStyle?: StyleProp<ViewStyle>;
    index: number;
    renderItem?: (props: MathTextItemRenderingProps) => JSX.Element;
};
export type MathTextProps = Pick<MathTextRowProps, 'direction' | 'containerStyle' | 'renderItem' | 'CellRendererComponent' | 'Component'> & {
    value?: string;
    math?: string;
    html?: string;
    style?: StyleProp<ViewStyle>;
    renderRow?: (props: MathTextRowRenderingProps) => JSX.Element;
    htmlStyle?: StyleProp<ViewStyle>;
};
export declare const InlineMathItem: React.MemoExoticComponent<({ value, isMath, isHtml, CellRendererComponent, Component, inline, style, ...props }: MathTextItemProps) => React.FunctionComponentElement<any> | null>;
export declare const MathTextRow: React.MemoExoticComponent<({ value, isMath, direction, containerStyle, CellRendererComponent, renderItem, index, ...props }: MathTextRowProps) => React.JSX.Element>;
export declare const MathText: React.MemoExoticComponent<({ value, renderRow, style, math, html, htmlStyle, ...props }: MathTextProps) => React.JSX.Element | null>;
export default MathText;
//# sourceMappingURL=MathText.d.ts.map