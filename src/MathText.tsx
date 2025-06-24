
import _ from 'lodash';
import React, { useMemo } from 'react';
import { I18nManager, StyleProp, StyleSheet, Text, TextProps, View, ViewStyle, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { MathViewProps } from './common';
//@ts-ignore
import MathView from './MathView';

type ElementOrRenderer<T = {}> = ((props: T) => JSX.Element) | JSX.Element

export type Direction = 'ltr' | 'rtl' | 'auto';

export type MathTextRowRenderingProps = {
    value: string,
    isMath: boolean,
    index: number
};

export type MathTextItemRenderingProps = MathTextRowRenderingProps & { rowIndex: number, inline: boolean };

export type MathTextItemProps<T extends boolean = boolean> = (T extends true ? Omit<MathViewProps, 'math'> : TextProps) & {
    value: string,
    isMath: T,
    isHtml?: boolean,
    Component?: typeof MathView,
    CellRendererComponent?: ElementOrRenderer,
    inline?: boolean
}

export type MathTextRowProps = MathTextItemProps & {
    direction?: Direction,
    containerStyle?: StyleProp<ViewStyle>,
    index: number,
    renderItem?: (props: MathTextItemRenderingProps) => JSX.Element
}

export type MathTextProps = Pick<MathTextRowProps, 'direction' | 'containerStyle' | 'renderItem' | 'CellRendererComponent' | 'Component'> & {
    value?: string,
    math?: string,
    html?: string,
    style?: StyleProp<ViewStyle>,
    renderRow?: (props: MathTextRowRenderingProps) => JSX.Element,
    htmlStyle?: StyleProp<ViewStyle>,
    allowMixedContent?: boolean, // Allow HTML content to contain math expressions
    mathInHtml?: boolean, // Parse math expressions within HTML content
    customHtmlTagStyles?: Record<string, any>, // Custom styles for HTML tags
    selectableText?: boolean // Whether text should be selectable
}

// Utility function to parse HTML content and extract math expressions
const parseHtmlWithMath = (html: string): Array<{ content: string, isMath: boolean, isHtml: boolean }> => {
    const segments: Array<{ content: string, isMath: boolean, isHtml: boolean }> = [];
    
    // Split by inline math expressions ($...$) and display math expressions ($$...$$)
    const mathRegex = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    let lastIndex = 0;
    let match;
    
    while ((match = mathRegex.exec(html)) !== null) {
        // Add HTML content before the math expression
        if (match.index > lastIndex) {
            const htmlContent = html.slice(lastIndex, match.index);
            if (htmlContent.trim()) {
                segments.push({ content: htmlContent, isMath: false, isHtml: true });
            }
        }
        
        // Add the math expression (remove the $ delimiters)
        const mathContent = match[0].replace(/^\$+|\$+$/g, '');
        if (mathContent.trim()) {
            segments.push({ content: mathContent, isMath: true, isHtml: false });
        }
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add remaining HTML content
    if (lastIndex < html.length) {
        const remainingContent = html.slice(lastIndex);
        if (remainingContent.trim()) {
            segments.push({ content: remainingContent, isMath: false, isHtml: true });
        }
    }
    
    // If no math expressions were found, return the entire content as HTML
    if (segments.length === 0) {
        segments.push({ content: html, isMath: false, isHtml: true });
    }
    
    return segments;
};

export const InlineMathItem = React.memo(({ value, isMath, isHtml, CellRendererComponent, Component, inline, style, ...props }: MathTextItemProps) => {
    if (value === '') return null;
    const config = useMemo(() => ({ inline }), [inline]);
    const Renderer = Component || MathView;
    const { width } = useWindowDimensions();
    
    // Enhanced HTML tag styles
    const htmlTagsStyles = useMemo(() => ({
        p: { 
            marginVertical: 8,
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
        },
        small: { 
            fontSize: 12,
            color: '#666'
        },
        strong: {
            fontWeight: 'bold' as const
        },
        b: {
            fontWeight: 'bold' as const
        },
        em: {
            fontStyle: 'italic' as const
        },
        i: {
            fontStyle: 'italic' as const
        },
        h1: {
            fontSize: 24,
            fontWeight: 'bold' as const,
            marginVertical: 12
        },
        h2: {
            fontSize: 20,
            fontWeight: 'bold' as const,
            marginVertical: 10
        },
        h3: {
            fontSize: 18,
            fontWeight: 'bold' as const,
            marginVertical: 8
        },
        h4: {
            fontSize: 16,
            fontWeight: 'bold' as const,
            marginVertical: 6
        },
        h5: {
            fontSize: 14,
            fontWeight: 'bold' as const,
            marginVertical: 4
        },
        h6: {
            fontSize: 12,
            fontWeight: 'bold' as const,
            marginVertical: 4
        },
        ul: {
            marginVertical: 8
        },
        ol: {
            marginVertical: 8
        },
        li: {
            marginVertical: 2
        },
        blockquote: {
            marginVertical: 8,
            marginHorizontal: 16,
            paddingLeft: 16,
            borderLeftWidth: 2,
            borderLeftColor: '#ccc',
            fontStyle: 'italic' as const
        },
        code: {
            fontFamily: 'monospace',
            backgroundColor: '#f5f5f5',
            padding: 2,
            borderRadius: 3
        },
        pre: {
            fontFamily: 'monospace',
            backgroundColor: '#f5f5f5',
            padding: 12,
            borderRadius: 6,
            marginVertical: 8
        },
        a: {
            color: '#0066cc',
            textDecorationLine: 'underline' as const
        },
        body: { 
            margin: 0,
            padding: 0
        }
    }), []);
    
    let el;
    if (isMath) {
        el = <Renderer
            {...props}
            math={value}
            resizeMode='contain'
            config={config}
        />;
    } else if (isHtml) {
        el = <RenderHtml
            contentWidth={width}
            source={{ html: value }}
            tagsStyles={htmlTagsStyles}
            defaultTextProps={{
                selectable: true
            }}
        />;
    } else {
        el = <Text
            {...props}
            style={styles.textMiddle}
        >
            {value}
        </Text>;
    }
    
    const container = typeof CellRendererComponent === 'function' ? <CellRendererComponent /> : CellRendererComponent || <></>;
    return React.cloneElement(container, {}, el);
});

export const MathTextRow = React.memo(({ value, isMath, direction, containerStyle, CellRendererComponent, renderItem, index, ...props }: MathTextRowProps) => {
    const parts = useMemo(() => _.flatten(_.map(_.split(value, /\$+/g), (value, i) => {
        if (isMath || i % 2 === 1) {
            return [{ value, isMath: true, inline: !isMath }];
        } else {
            return _.map(_.split(_.trim(value), ' '), value => ({ value, isMath: false, inline: true }));
        }
    })), [value, isMath]);
    const Renderer = renderItem || InlineMathItem;
    return (
        <View
            style={[
                styles.diverseContainer,
                direction === 'ltr' ? styles.flexLeft : direction === 'rtl' ? styles.flexRight : null,
                containerStyle
            ]}
        >
            {
                _.map(parts, ({ value, isMath, inline }, i) => {
                    const el = <Renderer
                        {...props}
                        value={value}
                        isMath={isMath}
                        inline={inline || false}
                        CellRendererComponent={CellRendererComponent}
                        index={i}
                        rowIndex={index}
                    />;
                    return React.cloneElement(i === parts.length - 1 ? el : <>{el}<Text> </Text></>, { key: `InlineMath.${value}.${i}` });
                })
            }
        </View>
    )
});

export const MathText = React.memo(({ 
    value, 
    renderRow, 
    style, 
    math, 
    html, 
    htmlStyle, 
    allowMixedContent = false,
    mathInHtml = false,
    customHtmlTagStyles = {},
    selectableText = true,
    ...props 
}: MathTextProps) => {
    if (__DEV__ && value && math) {
        console.warn('MathText has received both `value` and `math` props');
    } else if (__DEV__ && value && html) {
        console.warn('MathText has received both `value` and `html` props');
    } else if (__DEV__ && math && html) {
        console.warn('MathText has received both `math` and `html` props');
    } else if (!value && !math && !html) {
        __DEV__ && console.warn('MathText: please provide `value`, `math`, or `html` prop');
        return null;
    }

    const { width } = useWindowDimensions();
    
    // Enhanced HTML tag styles for better rendering
    const htmlTagsStyles = useMemo(() => ({
        p: { 
            marginVertical: 8,
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
        },
        small: { 
            fontSize: 12,
            color: '#666'
        },
        strong: {
            fontWeight: 'bold' as const
        },
        b: {
            fontWeight: 'bold' as const
        },
        em: {
            fontStyle: 'italic' as const
        },
        i: {
            fontStyle: 'italic' as const
        },
        h1: {
            fontSize: 24,
            fontWeight: 'bold' as const,
            marginVertical: 12,
            color: '#000'
        },
        h2: {
            fontSize: 20,
            fontWeight: 'bold' as const,
            marginVertical: 10,
            color: '#000'
        },
        h3: {
            fontSize: 18,
            fontWeight: 'bold' as const,
            marginVertical: 8,
            color: '#000'
        },
        h4: {
            fontSize: 16,
            fontWeight: 'bold' as const,
            marginVertical: 6,
            color: '#000'
        },
        h5: {
            fontSize: 14,
            fontWeight: 'bold' as const,
            marginVertical: 4,
            color: '#000'
        },
        h6: {
            fontSize: 12,
            fontWeight: 'bold' as const,
            marginVertical: 4,
            color: '#000'
        },
        ul: {
            marginVertical: 8,
            paddingLeft: 20
        },
        ol: {
            marginVertical: 8,
            paddingLeft: 20
        },
        li: {
            marginVertical: 2
        },
        blockquote: {
            marginVertical: 8,
            marginHorizontal: 16,
            paddingLeft: 16,
            borderLeftWidth: 3,
            borderLeftColor: '#007acc',
            fontStyle: 'italic' as const,
            backgroundColor: '#f8f9fa',
            padding: 12,
            borderRadius: 4
        },
        code: {
            fontFamily: 'monospace',
            backgroundColor: '#f1f3f4',
            padding: 4,
            borderRadius: 4,
            fontSize: 14,
            color: '#d73a49'
        },
        pre: {
            fontFamily: 'monospace',
            backgroundColor: '#f6f8fa',
            padding: 16,
            borderRadius: 6,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: '#e1e4e8'
        },
        a: {
            color: '#0066cc',
            textDecorationLine: 'underline' as const
        },
        table: {
            borderWidth: 1,
            borderColor: '#e1e4e8',
            marginVertical: 8
        },
        th: {
            backgroundColor: '#f6f8fa',
            padding: 8,
            borderWidth: 1,
            borderColor: '#e1e4e8',
            fontWeight: 'bold' as const
        },
        td: {
            padding: 8,
            borderWidth: 1,
            borderColor: '#e1e4e8'
        },
        body: { 
            margin: 0,
            padding: 0
        },
        ...customHtmlTagStyles
    }), [customHtmlTagStyles]);
    
    // If HTML is provided, handle it based on mathInHtml flag
    if (html) {
        if (mathInHtml || allowMixedContent) {
            // Parse HTML content that may contain math expressions
            const segments = parseHtmlWithMath(html);
            
            return (
                <View style={[style, htmlStyle]}>
                    {segments.map((segment, index) => {
                        if (segment.isMath) {
                            const Renderer = props.Component || MathView;
                            return (
                                <Renderer
                                    key={`math-${index}`}
                                    {...props}
                                    math={segment.content}
                                    resizeMode='contain'
                                    config={{ inline: false }}
                                />
                            );
                        } else {
                            return (
                                <RenderHtml
                                    key={`html-${index}`}
                                    contentWidth={width}
                                    source={{ html: segment.content }}
                                    tagsStyles={htmlTagsStyles}
                                    defaultTextProps={{
                                        selectable: selectableText
                                    }}
                                    systemFonts={['monospace']}
                                />
                            );
                        }
                    })}
                </View>
            );
        } else {
            // Render HTML directly without math parsing
            return (
                <View style={[style, htmlStyle]}>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html }}
                        tagsStyles={htmlTagsStyles}
                        defaultTextProps={{
                            selectable: selectableText
                        }}
                        systemFonts={['monospace']}
                    />
                </View>
            );
        }
    }

    // Original logic for value/math props
    const statements = useMemo(() => _.split(_.replace(value || `$${math}$`, /\\(\(|\))/g, '$'), /\$\$/g), [value, math]);
    const Container = renderRow || MathTextRow;

    return (
        <View style={style}>
            {
                _.map(statements, (value, i) => {
                    if (value === '') return null;
                    const isMath = i % 2 === 1;
                    return _.map(_.split(value, /\n/g), (val, index) =>
                        <Container
                            {...props}
                            key={`${value}.${i}.${index}`}
                            value={val}
                            isMath={isMath}
                            index={i}
                        />
                    )
                })
            }
        </View>
    );
});

export default MathText;

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexLeft: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
    },
    flexRight: {
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    diverseContainer: {
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10
    },
    textMiddle: {
        textAlignVertical: 'center'
    }
});