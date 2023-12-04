import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code({ language , children }: { language: string, children: string }) {
  return (
    <SyntaxHighlighter wrapLongLines={true} className='overflow-y-hidden overflow-x-hidden break-all' language={language} style={monokai}>
      {children}
    </SyntaxHighlighter>
  );
};
