import snarkdown from 'snarkdown';
import styled from 'styled-components';

const parseMarkdown = (source = '') => snarkdown(source);

const MarkdownPreview = ({ className, children }) => {
  return <div className={className} dangerouslySetInnerHTML={{
    __html: parseMarkdown(children)
  }} />
}

export default styled(MarkdownPreview)`
 * {
  font-size: 1rem;
 }
 pre {
  background: #efefef;
  padding: 1rem;
  border-radius: 0.2rem;
 }
`;
