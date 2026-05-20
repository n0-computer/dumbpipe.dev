import React from 'react';
import { render, screen } from '@testing-library/react';
import Code from './Code';

// Mock the styles module
jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  monokai: {}
}));

// Mock the react-syntax-highlighter module
jest.mock('react-syntax-highlighter', () => {
  const SyntaxHighlighterMock = (props: any) => {
    return (
      <pre
        data-language={props.language}
        className={props.className}
        data-wrap-long-lines={props.wrapLongLines || false}
      >
        {props.children}
      </pre>
    );
  };

  return SyntaxHighlighterMock;
});

describe('Code Component', () => {
  it('should render the children as code with the specified language', () => {
    const codeContent = 'console.log("hello world");';
    const language = 'javascript';

    render(<Code language={language}>{codeContent}</Code>);

    // Check if the code content is present in the document
    expect(screen.getByText(codeContent)).toBeInTheDocument();

    // Check if the language attribute is applied
    const codeElement = screen.getByText(codeContent).closest('pre');
    expect(codeElement).toHaveAttribute('data-language', language);
  });

  it('should apply the correct styles and classes', () => {
    const codeContent = 'const x = 5;';
    const language = 'typescript';

    render(<Code language={language}>{codeContent}</Code>);

    const codeElement = screen.getByText(codeContent).closest('pre');
    expect(codeElement).toHaveClass('overflow-y-hidden', 'overflow-x-hidden', 'break-all');
  });

  it('should pass the wrapLongLines prop as true', () => {
    const codeContent = 'const x = 5;';
    const language = 'typescript';

    render(<Code language={language}>{codeContent}</Code>);

    const codeElement = screen.getByText(codeContent).closest('pre');
    expect(codeElement).toHaveAttribute('data-wrap-long-lines', 'true');
  });

  it('should handle different programming languages', () => {
    const testCases = [
      { language: 'javascript', code: 'let a = 1;' },
      { language: 'python', code: 'print("hello")' },
      { language: 'java', code: 'System.out.println("hello");' },
      { language: 'cpp', code: '#include <iostream>' },
    ];

    testCases.forEach(({ language, code }) => {
      render(<Code key={language} language={language}>{code}</Code>);

      expect(screen.getByText(code)).toBeInTheDocument();
      expect(screen.getByText(code).closest('pre')).toHaveAttribute('data-language', language);
    });
  });

  it('should handle empty code content', () => {
    const { container } = render(<Code language="javascript">{''}</Code>);

    // Check that the pre element exists even with empty content
    const preElement = container.querySelector('pre');
    expect(preElement).toBeInTheDocument();
  });

  it('should handle code with special characters', () => {
    const codeWithSpecialChars = 'console.log("Hello & welcome to <my> code!");';

    render(<Code language="javascript">{codeWithSpecialChars}</Code>);

    expect(screen.getByText(codeWithSpecialChars)).toBeInTheDocument();
  });

  it('should wrap long lines', () => {
    const longCodeLine = 'const veryLongVariableNameThatShouldBeWrappedForReadability = "this is a very long line of code that should be wrapped";';

    render(<Code language="javascript">{longCodeLine}</Code>);

    expect(screen.getByText(longCodeLine)).toBeInTheDocument();
  });
});