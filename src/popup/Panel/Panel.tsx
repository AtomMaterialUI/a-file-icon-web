import styled from '@emotion/styled';
import { Footer } from './Footer';
import Settings from '~popup/Settings/Settings';

const StyledPanel = styled.div`
  padding-top: 2.5rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: [content] 100% [footer] 32px;
  grid-template-areas:
        "content"
        "footer";
`;

const Panel = () => (
  <StyledPanel>
    <Settings />
    <Footer />
  </StyledPanel>
);

export default Panel;