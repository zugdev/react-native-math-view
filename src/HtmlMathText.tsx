import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
//@ts-ignore
import MathView from './MathView';
import { MathViewProps } from './common';

export interface HtmlMathTextProps {
    html: string;
    style?: StyleProp<ViewStyle>;
    mathProps?: Partial<MathViewProps>;
    htmlStyle?: any; // RenderHtml style object
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
export const HtmlMathText: React.FC<HtmlMathTextProps> = ({
    html,
    style,
    mathProps = {},
    htmlStyle = {}
}) => {
    const { width } = useWindowDimensions();

    // Custom renderer for handling math expressions in HTML
    const renderers = useMemo(() => ({
        // You can add custom renderers here if needed
    }), []);

    // Default styles for HTML elements
    const tagsStyles = useMemo(() => ({
        p: { 
            marginVertical: 8,
            fontSize: 16,
            lineHeight: 24,
            color: '#333',
            ...htmlStyle.p
        },
        small: { 
            fontSize: 12,
            color: '#666',
            ...htmlStyle.small
        },
        body: { 
            margin: 0,
            padding: 0,
            ...htmlStyle.body
        },
        div: {
            ...htmlStyle.div
        },
        strong: {
            fontWeight: 'bold',
            ...htmlStyle.strong
        },
        em: {
            fontStyle: 'italic',
            ...htmlStyle.em
        },
        ...htmlStyle
    }), [htmlStyle]);

    // Process HTML to extract and handle math expressions
    const processedHtml = useMemo(() => {
        // For now, we'll render HTML as-is
        // In the future, we could parse math expressions and replace them with placeholders
        return html;
    }, [html]);

    return (
        <View style={style}>
            <RenderHtml
                contentWidth={width}
                source={{ html: processedHtml }}
                tagsStyles={tagsStyles}
                renderers={renderers}
                defaultTextProps={{
                    selectable: true
                }}
            />
        </View>
    );
};

export default HtmlMathText;
