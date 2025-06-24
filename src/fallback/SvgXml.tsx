'use strict';

import React, { Ref } from 'react';
import { SvgFromXml } from 'react-native-svg';
import { MathViewInjectedProps, MathViewProps, styles } from '../common';
import { ErrorComponent } from '../Error';
import { mathViewRender } from '../hooks';

const FallbackMathView = mathViewRender((props: MathViewInjectedProps, ref: Ref<any>) => {
    const { size, svg, hitSlop, ...passProps } = props;
    // Only pass hitSlop if it is not null
    const svgProps = hitSlop === null
        ? passProps
        : { ...passProps, hitSlop };

    return (
        <SvgFromXml
            {...svgProps}
            xml={svg}
            {...size}
            style={[props.resizeMode === 'contain' && styles.contain, props.style]}
            ref={ref}
        />
    )
});

FallbackMathView.defaultProps = {
    color: 'black',
    resizeMode: 'cover',
    renderError: ErrorComponent
} as Partial<MathViewProps>;

export default FallbackMathView;
