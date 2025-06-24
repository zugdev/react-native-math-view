import React from "react";
import { MathViewInjectedProps, MathViewProps, ParserResponse } from "./common";
export declare function useDebug(debug: boolean | undefined, ...values: any[]): void;
/**
 * Async Rendering
 * better performance
 * uses memoize to improve first draw:
 * if `math` prop didn't mount yet (no memoized value) revert to async rendering, otherwise use memoized value (prevents an unnecessary render and wait)
 */
export declare function useAsyncParser(props: MathViewProps): ParserResponse | {
    error: Error;
} | undefined;
/**
 * Sync Rendering
 * poor performance in first draw, causes js thread to hold for 2-3 seconds on initial mounts
 */
export declare function useSyncParser(props: MathViewProps): {
    svg: string;
    size: {
        width: number;
        height: number;
    };
} | {
    error: unknown;
};
export declare function mathViewAsyncRenderer<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>): React.ForwardRefExoticComponent<MathViewProps & React.RefAttributes<R>>;
export declare function mathViewSyncRenderer<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>): React.ForwardRefExoticComponent<MathViewProps & React.RefAttributes<R>>;
export declare function mathViewRender<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>, options?: {
    async?: boolean;
}): React.ForwardRefExoticComponent<MathViewProps & React.RefAttributes<R>>;
//# sourceMappingURL=hooks.d.ts.map