import React from 'react';
import { MathViewInjectedProps } from '../common';
export type TConstants = {
    "PreserveAspectRatio": {
        "Alignment": {
            "none": "none";
            "xMaxYMax": "xMaxYMax";
            "xMaxYMid": "xMaxYMid";
            "xMaxYMin": "xMaxYMin";
            "xMidYMax": "xMidYMax";
            "xMidYMid": "xMidYMid";
            "xMidYMin": "xMidYMin";
            "xMinYMax": "xMinYMax";
            "xMinYMid": "xMinYMid";
            "xMinYMin": "xMinYMin";
        };
        "BOTTOM": "xMidYMax meet";
        "END": "xMaxYMax meet";
        "FULLSCREEN": "xMidYMid slice";
        "FULLSCREEN_START": "xMinYMin slice";
        "LETTERBOX": "xMidYMid meet";
        "START": "xMinYMin meet";
        "STRETCH": "none null";
        "Scale": {
            "meet": "meet";
            "slice": "slice";
        };
        "TOP": "xMidYMin meet";
        "UNSCALED": "null null";
    };
    "ScaleType": {
        "CENTER": "CENTER";
        "CENTER_CROP": "CENTER_CROP";
        "CENTER_INSIDE": "CENTER_INSIDE";
        "FIT_CENTER": "FIT_CENTER";
        "FIT_END": "FIT_END";
        "FIT_START": "FIT_START";
        "FIT_XY": "FIT_XY";
        "MATRIX": "MATRIX";
    };
};
export declare const Constants: any;
/**
 * *****    CAUTION: use at own risk    ****
 * use only for custom use cases
 * MUST pass a valid `svg` prop
 *
 * @param props
 * @param ref
 */
declare const MathBaseView: React.ForwardRefExoticComponent<MathViewInjectedProps & React.RefAttributes<any>>;
export { MathBaseView as default };
//# sourceMappingURL=MathBaseView.d.ts.map