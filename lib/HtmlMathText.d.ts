import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MathViewProps } from './common';
export interface HtmlMathTextProps {
    html: string;
    style?: StyleProp<ViewStyle>;
    mathProps?: Partial<MathViewProps>;
    htmlStyle?: any;
}
/**
 * Component that renders HTML content with support for LaTeX math expressions.
 * Math expressions should be wrapped in $ for inline math or $$ for display math.
 *
 * Example usage:
 * <HtmlMathText
 *   html="<p>The area of a circle is $A = \pi r^2$</p>"
 * />
 */
export declare const HtmlMathText: React.FC<HtmlMathTextProps>;
export default HtmlMathText;
//# sourceMappingURL=HtmlMathText.d.ts.map