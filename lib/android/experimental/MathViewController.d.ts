import React from 'react';
import { MathViewProps } from '../../common';
export interface MathViewControllerProps extends MathViewProps {
    action: 'edit' | 'none';
}
/**
 * a controller that renders {MathView} or {} depending on `editable` state
 * @param props
 * @param ref
 */
declare const MathViewController: React.ForwardRefExoticComponent<MathViewControllerProps & React.RefAttributes<unknown>>;
export default MathViewController;
//# sourceMappingURL=MathViewController.d.ts.map