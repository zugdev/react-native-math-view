import React, { useEffect, useMemo, useState } from "react";
import { MathViewInjectedProps, MathViewProps, ParserResponse } from "./common";
import { MathErrorBoundary } from "./Error";
import MathjaxFactory from "./mathjax/MathjaxFactory";

export function useDebug(debug: boolean | undefined, ...values: any[]) {
    useEffect(() => {
        __DEV__ && debug && console.log('react-native-math-view', ...values);
    }, [...values, debug]);
}

/**
 * Async Rendering
 * better performance
 * uses memoize to improve first draw:
 * if `math` prop didn't mount yet (no memoized value) revert to async rendering, otherwise use memoized value (prevents an unnecessary render and wait)
 */
export function useAsyncParser(props: MathViewProps) {
    const { math, config } = props;
    const mathjax = useMemo(() => MathjaxFactory(config), [config]);
    const func = mathjax.toSVG;
    const [result, setResult] = useState<ParserResponse | { error: Error } | undefined>(() =>
        func.cache.has(math) ? func.cache.get(math) as ParserResponse : undefined);
    useEffect(() => {
        try {
            setResult(func(math));
        } catch (error) {
            setResult({ error: error as Error });
        }
    }, [math, func]);
    return result;
}

/**
 * Sync Rendering
 * poor performance in first draw, causes js thread to hold for 2-3 seconds on initial mounts
 */
export function useSyncParser(props: MathViewProps) {
    const { math, config } = props;
    const mathjax = useMemo(() => MathjaxFactory(config), [config]);
    return useMemo(() => {
        try {
            return mathjax.toSVG(math);
        } catch (error) {
            return { error: error as Error };
        }
    }, [math, mathjax]);
}

export function mathViewAsyncRenderer<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>) {
    return React.forwardRef((props: MathViewProps, ref: React.Ref<R>) => {
        const resultProps = useAsyncParser(props);
        useDebug(props.debug, resultProps);
        if (resultProps && 'error' in resultProps) {
            return <MathErrorBoundary {...props} {...resultProps} />;
        } else if (resultProps) {
            return render({ ...props, ...resultProps } as unknown as T, ref);
        } else {
            //  noop
            return null;
        }
    });
}

export function mathViewSyncRenderer<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>) {
    return React.forwardRef((props: MathViewProps, ref: React.Ref<R>) => {
        const resultProps = useSyncParser(props);
        return ('error' in resultProps) ?
            <MathErrorBoundary {...props} {...resultProps} /> :
            render({ ...props, ...resultProps } as unknown as T, ref);
    });
}

export function mathViewRender<T extends MathViewInjectedProps, R extends any>(render: React.ForwardRefRenderFunction<R, T>, options: { async?: boolean } = {}) {
    return options.async ? mathViewAsyncRenderer(render) : mathViewSyncRenderer(render)
}
