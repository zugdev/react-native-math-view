import * as _ from 'lodash';
import { MathToSVGConfig } from './Config';
import MathjaxAdaptor from './MathjaxAdaptor';
/** MathjaxAdaptor Factory memoize */
export declare const FactoryMemoize: (((stringifiedOptions: string) => MathjaxAdaptor) & _.MemoizedFunction) | (((config: MathToSVGConfig) => MathjaxAdaptor) & _.MemoizedFunction);
export default function MathjaxFactory(config?: Partial<MathToSVGConfig>): MathjaxAdaptor;
/** call MathjaxFactory to create and cache an instance of @class {MathjaxAccessor} for future use */
export declare const mathjaxGlobal: MathjaxAdaptor;
//# sourceMappingURL=MathjaxFactory.d.ts.map