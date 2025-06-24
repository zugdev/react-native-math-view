import React from 'react';
import { Insets } from 'react-native';
import { MathViewProps } from '../../common';
interface FragmentedMathViewProps extends MathViewProps {
    hitSlop: number | Insets;
    dev: boolean;
}
declare const FragmentedMathViewWrapper: React.ForwardRefExoticComponent<FragmentedMathViewProps & React.RefAttributes<unknown>>;
export default FragmentedMathViewWrapper;
//# sourceMappingURL=FragmentedMathView.d.ts.map