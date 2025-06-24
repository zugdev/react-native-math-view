# HTML Rendering with react-native-math-view

This library now supports rendering HTML content alongside math expressions using `react-native-render-html`.

## Installation

Make sure you have `react-native-render-html` installed in your project:

```bash
npm install react-native-render-html
# or
yarn add react-native-render-html
```

## Usage

### 1. HtmlMathText Component

Use the `HtmlMathText` component for pure HTML content:

```tsx
import { HtmlMathText } from 'react-native-math-view';

const MyComponent = () => {
  const htmlContent = `
    <p>Um carro esportivo é financiado pelo Japão, projetado na Itália...</p>
    <p style="text-align:right;">
      <small>REICH, R. O trabalho das nações...</small>
    </p>
    <p>A viabilidade do processo de produção ilustrado pelo texto pressupõe o uso de</p>
  `;

  return (
    <HtmlMathText
      html={htmlContent}
      style={{ padding: 20 }}
      htmlStyle={{
        p: {
          fontSize: 16,
          lineHeight: 24,
          textAlign: 'justify',
          marginBottom: 12
        },
        small: {
          fontSize: 12,
          fontStyle: 'italic',
          color: '#666'
        }
      }}
    />
  );
};
```

### 2. Enhanced MathText Component

The existing `MathText` component now supports an `html` prop:

```tsx
import { MathText } from 'react-native-math-view';

const MyComponent = () => {
  const htmlWithMath = `
    <p>The quadratic formula is: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$</p>
    <p>For the equation $ax^2 + bx + c = 0$, where $a \\neq 0$.</p>
  `;

  return (
    <MathText
      html={htmlWithMath}
      style={{ padding: 20 }}
    />
  );
};
```

## Props

### HtmlMathText Props

| Prop | Type | Description |
|------|------|-------------|
| `html` | `string` | The HTML content to render |
| `style` | `StyleProp<ViewStyle>` | Container style |
| `mathProps` | `Partial<MathViewProps>` | Props to pass to MathView components |
| `htmlStyle` | `any` | Custom styles for HTML elements |

### MathText Props (Enhanced)

All existing props plus:

| Prop | Type | Description |
|------|------|-------------|
| `html` | `string` | HTML content to render (alternative to `value` and `math`) |
| `htmlStyle` | `StyleProp<ViewStyle>` | Additional styling for HTML content |

## HTML Styling

You can customize the appearance of HTML elements using the `htmlStyle` prop:

```tsx
<HtmlMathText
  html={htmlContent}
  htmlStyle={{
    p: {
      fontSize: 16,
      lineHeight: 24,
      color: '#333',
      marginBottom: 12
    },
    strong: {
      fontWeight: 'bold',
      color: '#000'
    },
    em: {
      fontStyle: 'italic',
      color: '#555'
    },
    small: {
      fontSize: 12,
      color: '#666'
    }
  }}
/>
```

## Supported HTML Elements

The library supports all standard HTML elements that `react-native-render-html` can handle, including:

- Text formatting: `<p>`, `<strong>`, `<em>`, `<small>`, `<span>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Containers: `<div>`
- And many more...

## Math Expression Support

When using the `html` prop with `MathText`, you can still include LaTeX math expressions:

- Inline math: `$expression$`
- Display math: `$$expression$$`

## Example

```tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { HtmlMathText } from 'react-native-math-view';

const ExampleContent = () => {
  const content = `
    <p>Um carro esportivo é financiado pelo Japão, projetado na Itália e montado em Indiana, México e França, usando os mais avançados componentes eletrônicos, que foram inventados em Nova Jérsei e fabricados na Coreia.</p>
    <p style="text-align:right;">
      <small>REICH, R. O trabalho das nações: preparando-nos para o capitalismo no século XXI. São Paulo: Educator, 1994 (adaptado).</small>
    </p>
    <p>A viabilidade do processo de produção ilustrado pelo texto pressupõe o uso de</p>
  `;

  return (
    <ScrollView>
      <HtmlMathText
        html={content}
        style={{ padding: 20 }}
        htmlStyle={{
          p: {
            fontSize: 16,
            lineHeight: 24,
            textAlign: 'justify',
            marginBottom: 12
          },
          small: {
            fontSize: 12,
            fontStyle: 'italic',
            color: '#666'
          }
        }}
      />
    </ScrollView>
  );
};

export default ExampleContent;
```
