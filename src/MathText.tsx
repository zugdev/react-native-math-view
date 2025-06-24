
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
    Component?: MathView,
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
    htmlStyle?: StyleProp<ViewStyle>
}

export const InlineMathItem = React.memo(({ value, isMath, isHtml, CellRendererComponent, Component, inline, style, ...props }: MathTextItemProps) => {
    if (value === '') return null;
    const config = useMemo(() => ({ inline }), [inline]);
    const Renderer = Component || MathView;
    const { width } = useWindowDimensions();
    
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
            tagsStyles={{
                p: { marginVertical: 8 },
                small: { fontSize: 12 }
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

export const MathText = React.memo(({ value, renderRow, style, math, html, htmlStyle, ...props }: MathTextProps) => {
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
    
    // If HTML is provided, render it directly with RenderHtml
    if (html) {
        return (
            <View style={[style, htmlStyle]}>
                <RenderHtml
                    contentWidth={width}
                    source={{ html }}
                    tagsStyles={{
                        p: { marginVertical: 8 },
                        small: { fontSize: 12 },
                        body: { margin: 0 }
                    }}
                />
            </View>
        );
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