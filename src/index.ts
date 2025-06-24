import { Platform } from 'react-native';

// Platform-specific exports
if (Platform.OS === 'android') {
  module.exports = require('./index.android');
} else {
  module.exports = require('./index.ios');
}

// Re-export common types and utilities
export type { MathViewProps } from './common';
export { default as MathText } from './MathText';
export * from './MathText';
export { default as HtmlMathText } from './HtmlMathText';
export * from './HtmlMathText';
export { default as MathjaxFactory } from './mathjax';
